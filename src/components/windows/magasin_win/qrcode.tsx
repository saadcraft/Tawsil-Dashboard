import React from 'react'
import { useQRCode } from 'next-qrcode';

export default function QRcode({ id }: { id: number }) {

    const { SVG } = useQRCode();

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
                <h1 className='mb-5 font-bold text-xl text-center'>Code QR magasine</h1>
                <SVG
                    text={"id magasine : " + id.toString()}
                    options={{
                        margin: 2,
                        width: 200,
                        color: {
                            dark: '#000',
                            light: '#FFF',
                        },
                    }}
                />
            </div>
        </div>
    )
}