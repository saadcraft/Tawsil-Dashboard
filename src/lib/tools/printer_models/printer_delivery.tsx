import React from 'react';
import Image from 'next/image';
import { FormatDate } from '@/lib/tools/tools';

type PrintableModelProps = {
    command: Result[];
    user: Users;
    tax: number;
}

const chunkArray = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const PrintableModel = ({ command, user, tax }: PrintableModelProps) => {
    return (
        <div className="p-5">
            {/* Header Section */}
            <div className="text-center mb-5">
                <div className='flex items-center gap-10'>
                    <Image height={100} width={100} src="/tawsil-start.png" alt="Logo" className="w-40 rounded-xl bg-six" />
                    <h1 className='font-bold text-5xl'>Tawsil-Star</h1>
                </div>
                <h1 className="text-2xl font-bold">Bon de livreur</h1>
                <p className="text-gray-500">La date creation: {FormatDate(new Date().toISOString())}</p>
                <p className="text-gray-500">Agent: {user.first_name} {user.last_name}</p>
            </div>

            {/* Table Section */}
            <div className="relative overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Client</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="text-right px-6 py-3">Somme course</th>
                            <th scope="col" className="text-right px-6 py-3">Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {command.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {index}
                                </th>
                                <td className="px-6 py-4">
                                    {item.client.first_name}{' '}
                                    {item.client.last_name}
                                </td>
                                <td className="px-6 py-4">
                                    {FormatDate(item.created_at)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.delivery_price}DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {(item.delivery_price * item.livreur.partenneur.type_compte.tax_tawsile / 100)}DA
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h1 className="text-right p-2 font-semibold text-xl">Total: {tax.toFixed(2)} DA</h1>
            </div>
            <p className='absolute bottom-3 text-center w-full '>1/1</p>
        </div>
    );
};

// const PrintableModel = ({ command, user, tax }: PrintableModelProps) => {
//     const ROWS_PER_PAGE = 20;
//     const pages = chunkArray(command, 1);

//     return (
//         <div className="p-5">
//             {pages.map((pageCommands, pageIndex) => (
//                 <div key={pageIndex} className="page-section">
//                     {/* Header - Full for first page, simplified for others */}
//                     <div className="text-center mb-5">
//                         {pageIndex === 0 &&
//                             <>
//                                 <div className='flex items-center gap-10 w-full h-full'>
//                                     <Image className='w-80' src="/logo_horizontal.svg" alt="Description" width={240} height={120} />
//                                 </div>
//                                 <div className="bg-cyan-400 max-w-5xl p-5 rounded-r-3xl flex text-left gap-3">
//                                     <span>
//                                         <h1><span>Nom :</span> {command[0].livreur.partenneur.user.last_name} {command[0].livreur.partenneur.user.first_name}</h1>
//                                         <h1><span>Num Tel :</span> {command[0].livreur.partenneur.user.phone_number_1}</h1>
//                                     </span>
//                                     <span>
//                                         <h1><span>Agent :</span> {user.last_name} {user.first_name}</h1>
//                                         <h1><span>Nom :</span> {user.groupe}</h1>
//                                     </span>
//                                 </div>
//                                 <p className="text-gray-500">La date creation: {FormatDate(new Date().toISOString())}</p>
//                             </>
//                         }
//                     </div>

//                     {/* Table Section */}
//                     <div className="relative overflow-auto">
//                         <table className="w-full text-sm text-left rtl:text-right">
//                             <thead className="text-xs uppercase bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3">ID</th>
//                                     <th scope="col" className="px-6 py-3">Client</th>
//                                     <th scope="col" className="px-6 py-3">Date</th>
//                                     <th scope="col" className="text-right px-6 py-3">Somme course</th>
//                                     <th scope="col" className="text-right px-6 py-3">Tax</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {pageCommands.map((item, index) => (
//                                     <tr key={`${pageIndex}-${index}`} className="bg-white border-b">
//                                         <td className="px-6 py-4">{(pageIndex * ROWS_PER_PAGE) + index + 1}</td>
//                                         <td className="px-6 py-4">
//                                             {item.client.first_name} {item.client.last_name}
//                                         </td>
//                                         <td className="px-6 py-4">{FormatDate(item.created_at)}</td>
//                                         <td className="px-6 py-4 text-right">{item.delivery_price} DA</td>
//                                         <td className="px-6 py-4 text-right">
//                                             {(item.delivery_price * item.livreur.partenneur.type_compte.tax_tawsile / 100).toFixed(2)} DA
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Footer - Show totals only on last page */}
//                     {pageIndex === pages.length - 1 && (
//                         <div className="mt-4">
//                             <h1 className="text-right p-2 font-semibold text-xl">Total: {tax.toFixed(2)} DA</h1>
//                         </div>
//                     )}

//                     {/* Page counter */}
//                     <p className="absolute bottom-3 text-center w-full">
//                         Page {pageIndex + 1} of {pages.length}
//                     </p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const PrintableInvoice = ({
//     clientName = "Nom Prenom",
//     phoneNumber = "0555555555",
//     agentName = "Nom Prenom",
//     partnerName = "Nom Prenom",
//     total = 415.00
//   }) => {
//     return (
//       <div style={{
//         width: '210mm', // A4 paper width
//         minHeight: '297mm', // A4 paper height
//         margin: '20px auto',
//         padding: '30px',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '12pt',
//         lineHeight: '1.5'
//       }}>
//         {/* Header Section */}
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: 0 }}>
//             TAWSIL STAR
//           </h1>
//           <h2 style={{ fontSize: '18pt', margin: '5px 0' }}>
//             DELIVERY & SERVICES
//           </h2>
//         </div>

//         {/* Client Information */}
//         <div style={{ marginBottom: '15px' }}>
//           <p style={{ margin: '5px 0' }}><strong>Nom :</strong> {clientName}</p>
//           <p style={{ margin: '5px 0' }}><strong>Num Tel:</strong> {phoneNumber}</p>
//           <p style={{ margin: '5px 0' }}><strong>Agent:</strong> {agentName}</p>
//           <p style={{ margin: '5px 0' }}><strong>Partenaire:</strong> {partnerName}</p>
//         </div>

//         <hr style={{ border: '1px solid #000', margin: '20px 0' }} />

//         {/* Commands Section */}
//         <div style={{ 
//           display: 'grid',
//           gridTemplateColumns: 'repeat(2, 1fr)',
//           gap: '15px',
//           marginBottom: '20px'
//         }}>
//           {/* Left Column */}
//           <div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Retour</span>
//               <span style={{ float: 'right' }}>Alt+Gauche</span>
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Avancer</span>
//               <span style={{ float: 'right' }}>Alt+Droite</span>
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Actualiser</span>
//               <span style={{ float: 'right' }}>Ctrl+R</span>
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>TAX</span>
//               <span style={{ float: 'right' }}>Ctrl+A</span>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Enregistrer sous...</span>
//               <span style={{ float: 'right' }}>Ctrl+S</span>
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Imprimer...</span>
//               <span style={{ float: 'right' }}>Ctrl+P</span>
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ marginRight: '10px' }}>Caster...</span>
//               <span style={{ float: 'right' }}>Ctrl+J</span>
//             </div>
//           </div>
//         </div>

//         {/* Additional Options */}
//         <div style={{ marginBottom: '20px' }}>
//           <p style={{ margin: '5px 0' }}>Rechercher avec Google Lens</p>
//           <p style={{ margin: '5px 0' }}>Ouvrir en mode Lecture</p>
//           <p style={{ margin: '5px 0' }}>Traduire en français</p>
//         </div>

//         {/* Rotation Section */}
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span>Rotation dans le sens des aiguilles d'une montre</span>
//             <span>Ctrl+A</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span>Rotation antihoraire</span>
//             <span>Ctrl+J</span>
//           </div>
//         </div>

//         <hr style={{ border: '1px solid #000', margin: '20px 0' }} />

//         {/* Footer Section */}
//         <div style={{ textAlign: 'center' }}>
//           <h2 style={{ fontSize: '16pt', margin: '20px 0' }}>
//             THANK YOU FOR YOUR BUSINESS
//           </h2>
//           <div style={{ 
//             textAlign: 'right',
//             marginRight: '50px',
//             fontSize: '14pt'
//           }}>
//             <p style={{ margin: '5px 0' }}>TOTAL {total.toFixed(2)} DA</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Usage example:
//   // <PrintableInvoice 
//   //   clientName="John Doe"
//   //   phoneNumber="0551234567"
//   //   agentName="Jane Smith"
//   //   partnerName="Partner Corp"
//   //   total={415.00}
//   // />

export default PrintableModel;