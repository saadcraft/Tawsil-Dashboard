import { staticCommande } from '@/lib/comptable_action';
import YearSelector from '@/lib/tools/selection';
import { Utils, UtilsDay } from '@/lib/tools/tools';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { TbLoader3 } from 'react-icons/tb';

export default function Livraison({ user }: { user: Users }) {

    const [livraison, setLivraison] = useState<Chart[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCourses = async () => {
            if (user?.role === "admin") {
                const StaticCommande = await staticCommande({ month: "", anne: "", paye: "" })
                if (!StaticCommande) {
                    setIsLoading(false);
                } else {
                    setLivraison(StaticCommande);
                    setIsLoading(false);
                }
            }
        }
        fetchCourses();
    }, [user])

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
        setIsLoading(true)

        const month = formData.get("month") as string
        const year = formData.get("anne") as string
        const statue = formData.get("statue") as string
        const response = await staticCommande({ month: month, anne: year, paye: statue })

        if (response) {
            setLivraison(response)
            setIsLoading(false)
        }
    }
    return (
        <div className='relative'>
            <form onChange={statisLiv} className='absolute px-2 flex justify-between w-full'>
                <span className='text-xl font-bold text-gray-700'>Livraison</span>
                <div className='flex gap-2'>
                    <YearSelector />
                    <select name='month' className='outline-none border-b text-sm bg-white' defaultValue={new Date().getMonth() + 1}>
                        {Utils.months({ count: 12 }).map((pre, index) => {
                            return (
                                <option key={index} value={index + 1}>{pre}</option>
                            )
                        })

                        }
                    </select>
                    <select name='statue' className='outline-none border-b text-sm bg-white'>
                        <option value=''>All</option>
                        <option value="true">Payé</option>
                        <option value="false">No payé</option>
                    </select>
                </div>
            </form>
            <LineChart />
            {isLoading &&

                <div className='absolute inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center gap-3'>
                    <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                </div>

            }
        </div>
    )
}
