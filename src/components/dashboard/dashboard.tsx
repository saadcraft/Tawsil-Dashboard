"use client"

import React from 'react'
import Image from 'next/image'
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// } from 'chart.js';

// const Utils = {
//   months: ({ count }: { count: number }) => {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June', 'July',
//       'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames.slice(0, count); // Return the first `count` months
//   }
// };


export default function Dashboard({ data, user }: { data: Context, user: Users }) {


  // ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

  // const PieChart = () => {
  //   const data = {
  //     labels: ['Red', 'Blue', 'Yellow'],
  //     datasets: [
  //       {
  //         label: 'My First Dataset',
  //         data: [300, 50, 100],
  //         backgroundColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(54, 162, 235)',
  //           'rgb(255, 205, 86)',
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   };
  //   return <Pie data={data} className='bg-white p-5 rounded-xl' />;
  // };


  // const BarChart = () => {
  //   const labels = Utils.months({ count: 7 });
  //   const data = {
  //     labels: labels,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   };
  //   return <Bar data={data} className='bg-white p-5 rounded-xl' />;
  // }

  // const LineChart = () => {
  //   const labels = Utils.months({ count: 7 });
  //   const data = {
  //     labels: labels,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1
  //     }]
  //   };
  //   return <Line data={data} className='bg-white p-5 rounded-xl' />
  // }


  return (
    <div className="flex flex-col items-center justify-between py-5 px-5 sm:px-16">
      {user.role == "gestion_commercial" ?
        <>
          <h1 className="text-2xl font-bold mb-5">Tableau de bord</h1>
          <div className='grid grid-cols-3 gap-3 w-full'>
            <div className='bg-white w-full flex flex-col justify-center items-center py-5 rounded-xl'>
              <h1 className='font-bold'>Chef bureux</h1>
              <p>{data.total_users_chef_bureux}</p>
            </div>
            <div className='bg-white w-full flex flex-col justify-center items-center py-5 rounded-xl'>
              <h1>Agent administratif</h1>
              <p>{data.tolat_users_agents}</p>
            </div>
            <div className='bg-white w-full flex flex-col justify-center items-center py-5 rounded-xl'>
              <h1>Centre d&apos;appel</h1>
              <p>{data.total_users_centre_appel}</p>
            </div>
          </div>
        </>
        :
        <div className='fixed bottom-0 top-0 right-0 left-0 md:left-80 flex items-center justify-center'>
          <Image height={300} width={300} src={`/dash.svg`} alt='' />
        </div>
      }
      {/* <div className="grid grid-cols-2 gap-5 w-full">
        <div className='py-1'>
          <PieChart />
        </div>
        <div className='flex flex-col gap-2'>
          <BarChart />
          <LineChart />
        </div>
      </div> */}
    </div>
  )
}
