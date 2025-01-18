import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';


export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-between py-5 px-5 sm:px-16">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'Series A', color: '#ff6384' },
              { id: 1, value: 15, label: 'Series B', color: '#36a2eb' },
              { id: 2, value: 20, label: 'Series C', color: '#cc65fe' },
            ],
          },
        ]}
        width={300}
        height={300}
      />
    </div>
  )
}
