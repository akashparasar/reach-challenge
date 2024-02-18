import axios from "axios";
import Highcharts from 'highcharts';
import Loading from "../components/Loading";
import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';

const TotalChangesChart = ({ repository, activityType }) => {
    const [seriesData, setSeriesData] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getCommitActivity = async () => {
        setLoading(true);
        try {
            let url = `https://api.github.com/repos/${repository?.full_name}/stats/${activityType == 'commit' ? 'commit_activity' : 'code_frequency '}`;
            const response = await axios.get(url);

            if (response?.data && response?.data?.length > 0) {
                let weeks;
                let seriesData = [];
                if (activityType == 'commit') {
                    weeks = response.data.map(entry => new Date(entry.week * 1000));
                    seriesData = response.data.map(entry => entry.total);
                } else if (activityType == 'addition') {
                    weeks = response?.data.map(entry => new Date(entry[0] * 1000));
                    seriesData = response?.data.map(entry => entry[1]);
                } else if (activityType == 'deletion') {
                    weeks = response?.data.map(entry => new Date(entry[0] * 1000));
                    seriesData = response?.data.map(entry => entry[2]);
                }
                setSeriesData(seriesData);
                setWeekDates(weeks);
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
                    {seriesData?.length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    ) : (
                        <div className='m-6'>
                            No total commits found for this repository.
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default TotalChangesChart;
