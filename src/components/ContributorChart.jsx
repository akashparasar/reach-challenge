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

            if (response?.data && response?.data.length > 0) {
                if (activityType == 'commit') {
                    var series = [];
                    response.data.forEach(function (item) {
                        var dates = item.weeks.map(data => new Date(data.w * 1000));
                        var commits = item.weeks.map(data => data.c);
                        var author = item.author.login;
                        series.push({
                            contributor: author,
                            data: commits,
                            dates: dates
                        });
                    });
                    setSeriesData(series);
                } else if (activityType == 'addition') {
                    var series = [];
                    response.data.forEach(function (item) {
                        var dates = item.weeks.map(data => new Date(data.w * 1000));
                        var additions = item.weeks.map(data => data.a);
                        var author = item.author.login;
                        series.push({
                            contributor: author,
                            data: additions,
                            dates: dates
                        });
                    });
                    setSeriesData(series);
                } else if (activityType == 'deletion') {
                    var series = [];
                    response.data.forEach(function (item) {
                        var dates = item.weeks.map(data => new Date(data.w * 1000));
                        var deletions = item.weeks.map(data => data.d);
                        var author = item.author.login;
                        series.push({
                            contributor: author,
                            data: deletions,
                            dates: dates
                        });
                    });
                    setSeriesData(series);
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
                    {seriesData.length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    ) : (
                        <div className='m-6'>
                              Contributor commits no record found.
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default ContributorChart;
