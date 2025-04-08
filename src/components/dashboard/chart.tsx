import React from 'react'
import {
    Pie,
    Bar,
    Line
} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
} from 'chart.js';

import YearSelector from "@/lib/tools/selection"

const Utils = {
    months: ({ count }: { count: number }) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames.slice(0, count); // Return the first `count` months
    }
};

export default function Chart({ data }: { data: Context | null }) {

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

    const BarChart = () => {
        const labels = Utils.months({ count: 12 });
        const data = {
            labels: labels,
            datasets: [{
                label: 'Courses',
                data: [65, 59, 80, 81, 56, 55, 40, 60, 50, 20, 15, 85],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        };
        return <Bar data={data} className='bg-white p-5 rounded-xl' />;
    }

    const LineChart = () => {
        const labels = Utils.months({ count: 7 });
        const data = {
            labels: labels,
            datasets: [{
                label: 'Livraison',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        return <Line data={data} className='bg-white p-5 rounded-xl' />
    }




    const PieChart = () => {
        const dataPi = {
            labels: ['En attent', 'Groupé', 'Commenté', 'Activé'],
            datasets: [
                {
                    label: 'Users',
                    data: [data?.paretnneur_en_attend, data?.partennneur_groupe, data?.partenneur_commente, data?.partenneur_active],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(66, 245, 105)'
                    ],
                    hoverOffset: 4,
                },
            ],
        };
        return <Pie data={dataPi} className='bg-white p-5 rounded-xl pt-10 cursor-pointer' />;
    };


    return (
        <div className='relative grid lg:grid-cols-2 gap-3 grid-cols-1'>
            <div className='relative'>
                <span className='absolute text-xl top-2 left-2 font-bold text-gray-700'>Partenaires</span>
                <PieChart />
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <div className='relative'>
                    <form className='absolute px-2 flex justify-between w-full'>
                        <span className='text-xl font-bold text-gray-700'>Courses</span>
                        <div className='flex gap-2'>
                            <YearSelector />
                            <select className='outline-none border-b'>
                                <option>Payé</option>
                                <option>No payé</option>
                            </select>
                        </div>
                    </form>
                    <BarChart />
                </div>
                <div className='relative'>
                    <form className='absolute px-2 flex justify-between w-full'>
                        <span className='text-xl font-bold text-gray-700'>Livraison</span>
                        <div className='flex gap-2'>
                            <YearSelector />
                            <select className='outline-none border-b'>
                                <option>Payé</option>
                                <option>No payé</option>
                            </select>
                        </div>
                    </form>
                    <LineChart />
                </div>
            </div>
        </div>
    )
}
