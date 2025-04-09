import React from 'react'
import { Pie } from 'react-chartjs-2';
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

import Livraison from './charts/livraison';
import Courses from './charts/courses';

export default function Chart({ data, staticLiv, staticVtc }: { data: Context | null, staticLiv: Chart[] | null, staticVtc: Chart[] | null }) {

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

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
                <span className='absolute text-xl top-2 left-2 font-bold text-gray-700'>Centre d'appel</span>
                <PieChart />
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <Courses staticVtc={staticVtc} />
                <Livraison staticLiv={staticLiv} />
            </div>
        </div>
    )
}
