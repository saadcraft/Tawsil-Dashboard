import Link from 'next/link'
import React from 'react'

export default function Profile({ user }: { user: Users }) {
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
                <h1 className='font-bold text-xl'>Profile</h1>
            </div>
            <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
                <div className='flex gap-3'>
                    <div className='font-bold text-xl p-2 border-r-2'>
                        <p >Nom et prénom : </p>
                        <p>email :</p>
                        <p>Télephone :</p>
                        <p>Role:</p>
                        <p>La date de naissaance :</p>
                        <p>Wilaya :</p>
                        <p>Lieux :</p>
                    </div>
                    <div className='text-xl p-2'>
                        <p >{user.last_name + " " + user.first_name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone_number_1}</p>
                        <p>{user.role}</p>
                        <p>{user.date_de_naissance || "?"}</p>
                        <p>{user.wilaya}</p>
                        <p>{user.lieux || "?"}</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
