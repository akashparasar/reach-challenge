import axios from "axios";
import Highcharts from 'highcharts';
import Loading from "../components/Loading";
import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';

const TotalChangesChart = ({ repository, activityType }) => {
    console.log('activityType', activityType);
    const [seriesData, setSeriesData] = useState([]);
    const [weekDates, setWeekDates] = useState([]);

    const [loading, setLoading] = useState(false);
    const getCommitActivity = async () => {
        setLoading(true);
        try {
            let url = `https://api.github.com/repos/${repository?.full_name}/stats/${activityType == 'commit' ? 'commit_activity' : 'code_frequency '}`;
            const response = await axios.get(url);

            if (response?.data && response?.data.length > 0) {
                if (activityType == 'commit') {
                    const weeks = response.data.map(entry => new Date(entry.week * 1000));
                    const counts = response.data.map(entry => entry.total);
                    setSeriesData(counts);
                    setWeekDates(weeks);
                } else if (activityType == 'addition') {
                    const weeks = response?.data.map(entry => new Date(entry[0] * 1000));
                    const Addition = response?.data.map(entry => entry[1]);
                    setSeriesData(Addition);
                    setWeekDates(weeks);
                } else if (activityType == 'deletion') {
                    const weeks = response?.data.map(entry => new Date(entry[0] * 1000));
                    const Deletion = response?.data.map(entry => entry[2]);
                    setSeriesData(Deletion);
                    setWeekDates(weeks);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getCommitActivity();
    }, [activityType]);

    const options = {
        title: {
            text: 'Total Changes'
        },
        series: [
            {
                name: 'Changes',
                data: seriesData,
            }
        ],
        tooltip: {
            formatter: function () {
                const weekStartDate = weekDates[this.point.x].toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                return `<b>${this.x}</b><br/>Week: ${weekStartDate}<br/>${this.series.name}: ${this.y}`;
            }
        },
    }

    return (
        <>
            {loading ?
                <Loading />
                :
                <>
                    {seriesData.length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    ) : (
                        <div className='m-6'>
                            Total commits no record found.
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default TotalChangesChart;
