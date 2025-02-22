"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { StatsCard } from './carte'
import { useRouter } from "next/navigation"
import {
  MdOutlineDesktopMac,
  MdSupportAgent,
  MdOutlineDeliveryDining,
  MdOutlineStorefront,
  MdOutlineLocalTaxi,
  MdSupervisorAccount,
  MdMap,
  MdOutlineFactCheck,
  MdOutlineFileUpload,
  MdModeEditOutline,
  MdClose
} from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { UpdateMagasin } from '@/lib/stores_api';
import toast from 'react-hot-toast';
import PictureMagasin from '../windows/dashboard_win/upload_win'
import ModifieMagasin from '../windows/magasin_win/modifie_magasin'
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


export default function Dashboard({ magasin, data, user, cate }: { magasin: Magasin | null, data: Context, user: Users, cate: Catalogue[] }) {

  const router = useRouter()

  const [types, setTypes] = useState<"background" | "profile" | null>(null)
  const [mody, setMody] = useState<boolean>(false)

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

  const handleStatusChange = async (magasin_id: number, EtatOuverture: boolean) => {
    const loadingToastId = toast.loading('Submite update...');

    const updateStatus = await UpdateMagasin({ magasin_id, EtatOuverture })

    if (updateStatus.code == 200) {
      toast.success(EtatOuverture ? "Ouvert" : "Farmé", { id: loadingToastId });
      router.refresh();
    } else {
      toast.error(updateStatus, { id: loadingToastId });
    }
  }


  return (
    <div className="flex flex-col items-center justify-between">
      {user.role == "gestion_commercial" ?
        <div className='py-5 px-5 sm:px-16 w-full'>
          <h1 className="text-2xl font-bold mb-5 text-gray-600">Tableau de bord</h1>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 w-full mx-auto'>
            <StatsCard title='Chef bureux' value={data.total_users_chef_bureux.toString()} icon={<MdOutlineDesktopMac />} />
            <StatsCard title='Agent administratif' value={data.tolat_users_agents.toString()} icon={<GrUserWorker />} />
            <StatsCard title='Centre d&apos;appel' value={data.total_users_centre_appel.toString()} icon={<MdSupportAgent />} />
            <StatsCard title='Livreur' value={data.total_partners__livreur.toString()} icon={<MdOutlineDeliveryDining />} />
            <StatsCard title='Magasin' value={data.total_partners__magasin.toString()} icon={<MdOutlineStorefront />} />
            <StatsCard title='Choffeur' value={data.total_partners__choffeur.toString()} icon={<MdOutlineLocalTaxi />} />
            <StatsCard title='Superviseurs' value={data.total_users_superviseurs.toString()} icon={<MdSupervisorAccount />} />
            <StatsCard title='Courses' value={data.total_courses.toString()} icon={<MdMap />} />
            <StatsCard title='Validation' value={data.total_users_validation.toString()} icon={<MdOutlineFactCheck />} />
          </div>
        </div>
        :
        user.role == "partener" ?
          <div className='w-full'>
            <div className='relative w-full'>
              <div className='w-full h-52 overflow-hidden'>
                {magasin?.image_background ?
                  <Image width={500} height={500} src={`${process.env.IMGS_DOMAIN}${magasin.image_background}`} alt='image cover' className='object-cover w-full h-full' />
                  :
                  <Image width={500} height={500} src="/background.png" alt='image cover' className='object-cover w-full h-full' />
                }
              </div>
              <div className='absolute left-12 top-36 md:top-24'>
                {magasin?.image ?
                  <Image width={150} height={150} src={`${process.env.IMGS_DOMAIN}${magasin.image}`} alt="image profile" className=' w-24 h-24 md:w-36 md:h-36 border-2 border-[#10c5f1] rounded-full object-cover bg-white shadow-md' />
                  :
                  <Image width={150} height={150} src={`/dash.svg`} alt="image profile" className=' w-24 h-24 md:w-36 md:h-36 border-2 border-[#10c5f1] rounded-full bg-white shadow-md' />
                }
                <span onClick={() => setTypes("profile")} className='absolute right-3 bottom-1 md:text-3xl text-2xl text-gray-600 bg-slate-200 rounded-full drop-shadow-lg cursor-pointer'>
                  <MdOutlineFileUpload />
                </span>
              </div>
              <span onClick={() => setTypes("background")} className='absolute text-3xl text-gray-600 right-3 top-3 bg-slate-400 bg-opacity-50 rounded-full p-1 cursor-pointer hover:bg-opacity-60 hover:text-gray-900'>
                <MdModeEditOutline />
              </span>
              <p className='absolute md:top-36 bottom-2 md:left-52 left-40 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white bg-slate-600 p-2 rounded-xl bg-opacity-30 font-bold md:text-3xl text-xl'>{magasin?.name}</p>
            </div>
            <div className='relative'>
              <div className="absolute md:right-20 right-5 top-3 flex items-center space-x-3">
                <span className="font-bold">Status:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={magasin?.EtatOuverture || false} // Set from database
                    onChange={(e) => magasin?.id !== undefined && handleStatusChange(magasin.id, e.target.checked)} // Function to update status
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {magasin?.EtatOuverture ?
                      <span className='text-green-700 font-bold'>Ouvert</span>
                      :
                      <span className='text-red-700 font-bold'>Farmé</span>
                    }
                  </span>
                </label>
              </div>
            </div>
            <div className='py-5 px-5 sm:px-16'>
              <div className='relative top-10 p-3 pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <div className='relative md:-top-5 flex items-center justify-between'>
                  <h1 className='font-bold text-xl'>Information</h1>
                  <span onClick={() => setMody(true)} className='text-3xl text-gray-600 right-3 bg-slate-400 bg-opacity-50 rounded-full p-1 cursor-pointer hover:bg-opacity-60 hover:text-gray-900'>
                    <MdModeEditOutline />
                  </span>
                </div>
                <div className="h-5/6 rounded-lg flex justify-around flex-col lg:flex-row text-xs md:text-lg">
                  <table className='max-w-xl'>
                    <tbody className='text-left'>
                      <tr className='border-b'>
                        <th className='p-2'>Address : </th>
                        <td className='text-nowrap'>{magasin?.address || "/"}</td>
                      </tr>
                      <tr className='border-b p-2'>
                        <th className='p-2'>Télephone : </th>
                        <td>{magasin?.contact || "/"}</td>
                      </tr>
                      <tr className='border-b'>
                        <th className='p-2'>Wilaya: </th>
                        <td>{magasin?.wilaya || "/"}</td>
                      </tr>
                      <tr className='border-b'>
                        <th className='p-2'>Discreption: </th>
                        <td>{magasin?.descprition || "/"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-medium">Categologe</h3>
                    <div className="flex flex-wrap gap-2">
                      {magasin?.cataloguqe?.map((category) => (
                        <span key={category.id} className="rounded-full font-semibold bg-slate-300  px-3 py-1 text-sm text-primary">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      {types &&
        <>
          <button onClick={() => setTypes(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <PictureMagasin onsub={setTypes} type={types} maga={magasin} />
        </>
      }
      {mody &&
        <>
          <button onClick={() => setMody(false)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <ModifieMagasin option={cate} maga={magasin!} onsub={setMody} />
        </>
      }
    </div>
  )
}
