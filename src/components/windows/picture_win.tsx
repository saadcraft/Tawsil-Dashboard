import { UpdatePic } from '@/lib/auth'
// import { UpdateUser } from '@/lib/call_action'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function PictureWin({ user, onsub }: { user: number, onsub: (value: null) => void }) {

    const router = useRouter()

    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onsub(null);

        const loadingToastId = toast.loading('Submite update...');

        // Create a new FormData object from the form
        const formData = new FormData(e.currentTarget);

        // Get the file from the form data (with name="image_url")
        const image_url = formData.get("image_url") as File | null;


        // Check if an image is selected
        if (!image_url || image_url.size === 0) {
            toast.error("Image requise", { id: loadingToastId });
            return;
        }
        if (image_url.size > 5242880) {
            toast.error("L'image est grande, maximum 5mb", { id: loadingToastId });
            return;
        }


        // Prepare the user data
        const updatedUser = { id: user.toString(), image_url };

        // Send the data to the UpdateUser function
        const res = await UpdatePic(updatedUser);

        // If the response is successful, refresh the page or perform your other actions
        if (res.success) {
            toast.success(res.message, { id: loadingToastId });
            router.refresh();
        } else {
            toast.error(res.message, { id: loadingToastId });
        }
    };

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5 text-center'>upload une image</h1>
                <form onSubmit={handleChange} className='flex flex-col gap-10' encType="multipart/form-data">
                    <input type='file' name='image_url' className='p-2' placeholder='Entre le commentaire' accept="image/*" />
                    <button type="submit" className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Sauvegarder</button>
                </form>
            </div>
        </div>
    )
}

// export function ModifyProfile({ modify, user, onsub }: { modify: string, user: Users, onsub: (value: null) => void }) {
//     const router = useRouter()

//     const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();



//         const formData = new FormData(e.currentTarget)
//         const formObject = Object.fromEntries(formData.entries())

//         const filteredData = Object.fromEntries(
//             Object.entries(formObject).filter(([, value]) => value !== "")
//         );
//         if (Object.keys(filteredData).length === 0) {
//             toast.error('No fields to update.');
//             return;
//         }

//         const updatedUser = { id: user.id.toString(), ...filteredData };

//         const res = await UpdateUser(updatedUser);

//         // If the response is successful, refresh the page or perform your other actions
//         if (res) {
//             router.refresh();
//             onsub(null);
//         };
//     }

//     return (
//         <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
//             <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
//                 <h1 className='mb-5 text-center'>upload une image</h1>
//                 <form onSubmit={handleChange} className='flex flex-col gap-10' encType="multipart/form-data">
//                     {modify == "nom" &&
//                         <>
//                             <input type='text' name='last_name' className='p-2 border w-full border-slate-300 rounded-md' placeholder='Entre le nom' defaultValue={user.last_name || ''} />
//                             <input type='text' name='first_name' className='p-2 border w-full border-slate-300 rounded-md' placeholder='Entre le prénom' defaultValue={user.first_name || ''} />
//                         </>
//                     }
//                     <button type="submit" className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Sauvegarder</button>
//                 </form>
//             </div>
//         </div >
//     )
// }
