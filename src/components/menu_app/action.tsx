import React from 'react'
import Link from 'next/link'

export default function Action() {
  return (
    <div className='py-5 px-5 sm:px-16'>
        <div className='flex items-center gap-2 px-5 pb-5'>
            <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
            <h1 className='font-bold text-xl'>Les actions</h1>
        </div>
        <div className='p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
        <table>
          <thead className='bg-slate-300'>
              <tr>
                  <th>#</th>
                  <th>Action Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody className=''>
              <tr>
                  <td>1</td>
                  <td>Buy Stock</td>
                  <td>Purchase 100 shares of XYZ</td>
                  <td>Investment</td>
                  <td>2024-12-20</td>
              </tr>
              <tr>
                  <td>2</td>
                  <td>Sell Stock</td>
                  <td>Sell 50 shares of ABC</td>
                  <td>Divestment</td>
                  <td>2024-12-21</td>
              </tr>
          </tbody>
      </table>
        </div>
    </div>
  )
}