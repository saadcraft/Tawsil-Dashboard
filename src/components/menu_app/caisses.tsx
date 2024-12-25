import React from 'react'
import Link from 'next/link'
export default function Caisses() {
  
  return (
    <div className='py-5 px-5 sm:px-16'>
        <div className='flex items-center gap-2 px-5 pb-5'>
            <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
            <h1 className='font-bold text-xl'>Les caisse</h1>
        </div>
        <div className='p-10 bg-white w-full mx-auto grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
        <table className=''>
          <thead className='bg-slate-300'>
              <tr>
                  <th>#</th>
                  <th>Caisse Name</th>
                  <th>Balance</th>
                  <th>Last Update</th>
                  <th>Details</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>General Fund</td>
                  <td>$10,000</td>
                  <td>2024-12-15</td>
                  <td>Main operating budget</td>
              </tr>
              <tr>
                  <td>2</td>
                  <td>Reserve Fund</td>
                  <td>$5,000</td>
                  <td>2024-12-18</td>
                  <td>Emergency reserve</td>
              </tr>
          </tbody>
      </table>
        </div>
    </div>
  )
}