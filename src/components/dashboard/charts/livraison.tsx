import { staticCommande } from '@/lib/comptable_action';
import YearSelector from '@/lib/tools/selection';
import { Utils, UtilsDay } from '@/lib/tools/tools';
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';

export default function Livraison({ staticLiv }: { staticLiv: Chart[] | null }) {

    const [livraison, setLivraison] = useState<Chart[] | null>(staticLiv)

    const LineChart = () => {
        const labels = UtilsDay.months({ count: 30 });
        const data = {
            labels: labels,
            datasets: [{
                label: 'Livraison',
                data: livraison?.map(item => {
                    const itemDate = new Date(item.day); // Convert the string to a Date object
                    return Date.now() > itemDate.getTime() ? item.count : null; // Check if current date is greater than item date
                }).filter(value => value !== null) || [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        const options = {
            scales: {
                y: {
                    min: 0,
                    ticks: {
                        stepSize: 1, // This ensures that the ticks on the Y-axis are in whole numbers
                        beginAtZero: true // Ensures that the Y-axis starts from 0

                    }
                }
            }
        };

        return <Line data={data} options={options} className='bg-white p-5 rounded-xl pt-6' />
    }

    const statisLiv = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const month = formData.get("month") as string
        const year = formData.get("anne") as string
        const statue = formData.get("statue") as string
        const response = await staticCommande({ month: month, anne: year, paye: statue })

        if (response) {
            setLivraison(response)
        }
    }
    return (
        <div className='relative'>
            <form onChange={statisLiv} className='absolute px-2 flex justify-between w-full'>
                <span className='text-xl font-bold text-gray-700'>Livraison</span>
                <div className='flex gap-2'>
                    <YearSelector />
                    <select name='month' className='outline-none border-b text-sm'>
                        {Utils.months({ count: 12 }).map((pre, index) => {
                            return (
                                <option key={index} value={index + 1}>{pre}</option>
                            )
                        })

                        }
                    </select>
                    <select name='statue' className='outline-none border-b text-sm'>
                        <option>All</option>
                        <option>Payé</option>
                        <option>No payé</option>
                    </select>
                </div>
            </form>
            <LineChart />
        </div>
    )
}
