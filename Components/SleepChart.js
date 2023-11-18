import React from 'react';
import { calcDuration, convertTo12HourFormat } from '../Helper/Helper'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const SleepChart = ({ sleepData }) => {

    const flattenedData = sleepData.flatMap(item => item.slots.map(slot => ({ day: item.day, ...slot })));

    const data = {
        labels: sleepData.map((night) => night.day),
        datasets: [{
            label: 'Sleep Time Range',
            data: sleepData.flatMap((night) => night.slots.map((slot) => ({
                x: night.day,
                y: calcDuration(slot.sleepStart, slot.sleepEnd),
            }))),
            backgroundColor: 'rgba(0, 127, 255, 0.5)',
            borderColor: 'rgba(0, 127, 255, 1)',
        }],
    };


    const footer = (tooltipItems) => {
        const index = tooltipItems?.[0]?.dataIndex;
        const { sleepStart, sleepEnd } = flattenedData?.[index] || {};

        if (sleepStart && sleepEnd) {
            let start = new Date(`2000-01-01T${sleepStart}`).getTime();
            let end = new Date(`2000-01-01T${sleepEnd}`).getTime();


            if (end < start) {
                end = new Date(`2000-01-02T${sleepEnd}`).getTime();
            }

            if (!isNaN(start) && !isNaN(end)) {
                const durationInMinutes = (end - start) / (1000 * 60);
                const hours = Math.floor(durationInMinutes / 60);
                const minutes = Math.floor(durationInMinutes % 60);

                return `Duration: ${hours} hr ${minutes} min`;
            }
        }

        return 'Invalid Duration';
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sleep Time Chart',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItems) => {
                        console.log(tooltipItems);
                        const index = tooltipItems.dataIndex;
                        const { sleepStart, sleepEnd } = flattenedData[index];
                        const start = convertTo12HourFormat(sleepStart);
                        const end = convertTo12HourFormat(sleepEnd);

                        return `From ${start} - To ${end}`;
                    },
                    footer: footer,
                },
            },
        },
        scales: {
            x: {
                type: 'category',
                stacked: true,
            },
            y: {
                min: 0,
                max: 24,
                stacked: true,
                ticks: {
                    stepSize: 3,
                    callback: function (value) {
                        const hours = (value + 6) % 24;
                        const amPm = hours < 12 ? 'PM' : 'AM';
                        const displayHours = hours % 12 || 12;
                        return `${displayHours} ${amPm}`;
                    },
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SleepChart;
