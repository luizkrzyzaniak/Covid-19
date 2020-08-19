import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function( tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [{
            type: "time",
            time:  {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
            },
        },
        ],
        yAxes: [{
            gridLines: {
                display: false,
            },
            ticks: {
                callback: function(value, index, values) {
                    return numeral(value).format("0a");
                },
            }, 
        },
    ],
    },
};

const criarChartData = (data, casesType="cases") => {
    const chartData = [];
    let ultimoDataPoint;

    for(let date in data.cases){
        if (ultimoDataPoint) {
            const novoDataPoint = {
                x: date,
                y: data[casesType][date] - ultimoDataPoint,
            }
            chartData.push(novoDataPoint);
        }
        ultimoDataPoint = data[casesType][date];
    }
    return chartData;
};

function Grafico({ casesType="cases" }) {
    const [data, setData] = useState({});
    const URL_LASTDAYS = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

    useEffect(() => {
        const fetchData = async () => {
            await fetch(URL_LASTDAYS)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let chartData = criarChartData(data, casesType);
                setData(chartData);
            });
        };
        fetchData();
    }, []);
        


    return (
        <div>
            {data?.length > 0 && (
                <Line 
                    options={options}
                    data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        color: "#CC1034",
                        data: data,
                    }]
                    }}
                />
            )}
        </div>

    )
}

export default Grafico
