import React, { useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import PrinterQrMagasin from '@/lib/tools/printer_models/printer_qr_magasin';
import { userInformation } from '@/lib/tools/store/web_socket';
// import { FormatDate } from '@/lib/tools/tools';

export default function QRcode({ id }: { id: number }) {

    const { user } = userInformation()

    const { SVG } = useQRCode();

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    const qrData = {
        magasin_id: id,
        // message: "QRcode magasine",
        // timestamp: FormatDate(new Date().toISOString()),
    };

    const PrintQR = () => {
        handlePrint();
    }

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(qrData);

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
                <div className='text-center mx-auto'>
                    <h1 className='mb-5 font-bold text-xl'>Code QR magasine</h1>
                    <div className='flex justify-center items-center p-1 border-2 rounded-xl'>
                        <SVG
                            text={jsonData}
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
                {user?.role === "superviseur" &&
                    <span onClick={PrintQR} className='mt-2 text-xl border rounded-xl p-1 hover:border-third cursor-pointer flex justify-center items-center gap-2'><FiPrinter /> Imprimer</span>
                }
            </div>
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <PrinterQrMagasin qrCode={<SVG
                        text={jsonData}

                        options={{
                            margin: 2,
                            width: 250,
                            color: {
                                dark: '#000',
                                light: '#FFF',
                            },

                        }}
                    />} />
                </div>
            </div>
        </div>
    )
}