import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ id, name, data, labels }) => {

    // CSS
    const chartContainerStyle = {
        width: '500px', // Set the width of the container
        height: '300px', // Set the height of the container
        margin: '20px', // Add margin if needed
        border: '1px solid #ccc', // Add border for visualization
        padding: '10px', // Add padding if needed
    };

    const chartRef = useRef(null);

    useEffect(() => {
        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            const chartInstance = chartRef.current;
            chartInstance && chartInstance.destroy();
        };
    }, []);


    const chartData = {
        labels: labels,
        datasets: [
            {
                label: name,
                data: data,
                fill: false,
                borderColor: 'rgba(95,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: [
                {
                    type: 'linear',
                    position: 'bottom',
                },
            ],
        },
    };

    return (
        <div style={chartContainerStyle}>
            <h3>{name}</h3>
            <Line key={id} ref={chartRef} data={chartData} options={options} />
        </div>
    );
};
export default LineChart;
