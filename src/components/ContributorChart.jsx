import axios from "axios";
import Highcharts from 'highcharts';
import Loading from "../components/Loading";
import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';

const ContributorChart = ({ repository, activityType }) => {
    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getCommitActivity = async () => {
        setLoading(true);
        try {
            let url = `https://api.github.com/repos/${repository?.full_name}/stats/contributors`;
            const response = await axios.get(url);

            if (response?.data && response?.data?.length > 0) {
                var series = [];

                response.data.forEach(function (item) {
                    var dates = item.weeks.map(data => new Date(data.w * 1000));
                    var author = item.author.login;
                    var data;

                    if (activityType == 'commit') {
                        data = item.weeks.map(data => data.c);
                    } else if (activityType == 'addition') {
                        data = item.weeks.map(data => data.a);
                    } else if (activityType == 'deletion') {
                        data = item.weeks.map(data => data.d);
                    }

                    series.push({
                        contributor: author,
                        data: data,
                        dates: dates
                    });
                });

                setSeriesData(series);
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
            text: 'Contributor Changes'
        },
        tooltip: {
            formatter: function () {
                var index = this.point.index;
                var tooltip = '<b>Week:</b> ' + seriesData[this.series.index].dates[index].toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + '<br/>';
                tooltip += '<b>Changes:</b> ' + this.y + '<br/>';
                tooltip += '<b>Contributor:</b> ' + seriesData[this.series.index].contributor;
                return tooltip;
            }
        },
        series: seriesData
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
                            No contributor commits found for this repository.
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default ContributorChart;
