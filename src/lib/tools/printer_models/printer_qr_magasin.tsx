import React from 'react'

// Define a functional component that accepts another component as a prop
interface PrinterQrMagasinProps {
    qrCode: React.ReactNode;  // Accepts a React component
}

const PrinterQrMagasin: React.FC<PrinterQrMagasinProps> = ({ qrCode: QrCodeComponent }) => {
    return (
        <div className="qr-style flex w-full items-center justify-between p-6 border rounded-lg bg-white">
            {/* Left Side: Logo & Info */}
            <div className="w-full">
                <div className="logo-qr mb-4"></div>
                <div className="text-lg space-y-3">
                    <ul className="list-none space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="font-bold">Tel:</span>
                            <ul className="text-gray-700 font-semibold">
                                <li>+213 670 221 986</li>
                                <li>+213 670 234 564</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side: QR Code */}
            <div className="w-1/2 bg-white flex justify-center">
                <div className="qr_code p-4 border bg-gray-100">
                    {QrCodeComponent}
                </div>
            </div>
        </div>
    );
};

export default PrinterQrMagasin;
