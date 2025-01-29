import { UpdateDocument } from '@/lib/call_action';
import { Wilaya } from '@/lib/tools/named'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function ModifyUser({ user, magasine, onsub }: { user: Partenaire, magasine: MagasinType[], onsub: (value: null) => void }) {

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())


        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
        );

        if (Object.keys(filteredData).length === 0) {
            toast.error('No fields to update.');
            return;
        }

        const updatedUser = { id: user.user.id.toString(), partener_id: user.id.toString(), ...filteredData };

        console.log(updatedUser)

        const res = await UpdateDocument(updatedUser)
        if (res) {
            router.refresh()
            onsub(null)
        }
    }

    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='xl:w-2/3 w-full mx-auto rounded-xl p-10 mt-10 bg-white'>
                <h1 className='mb-5 text-xl text-center font-bold'>Modifie User</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <p>Nom et prénome</p>
                    <div className='flex gap-3'>
                        <input type='text' name='last_name' className='p-2 border w-full border-slate-300 rounded-md' placeholder='Entre le nom' defaultValue={user.user.last_name || ''} />
                        <input type='text' name='first_name' className='p-2 border w-full border-slate-300 rounded-md' placeholder='Entre le prénom' defaultValue={user.user.first_name || ''} />
                    </div>
                    <p>type de compte</p>
                    <select name="type_id" className='p-2 border border-slate-300 rounded-md' >
                        <option value={user.type_compte.id || ''} >{user.type_compte.name || 'Sélecte Type'}</option>
                        {magasine.map((pre, index) => {
                            return (
                                <option key={index} value={pre.id}>{pre.name}</option>
                            )
                        })}
                    </select>
                    <p>Email</p>
                    <input type="email" name="email" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Email' defaultValue={user.user.email || ''} />
                    <p>Sexe</p>
                    <select name="sexe" className='p-2 border border-slate-300 rounded-md' >
                        <option value={user.user.sexe || ''} >Sélecte sexe</option>
                        <option value="homme" >Homme</option>
                        <option value="femme" >Femme</option>
                    </select>
                    <p>Wilaya</p>
                    <select name="wilaya" className='p-2 border border-slate-300 rounded-md' >
                        <option value={user.user.wilaya || ''} >{user.user.wilaya || 'Sélecte Type'}</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    <p>Lieux</p>
                    <input type="text" name="lieux" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Lieux' defaultValue={user.user.lieux || ''} />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}
