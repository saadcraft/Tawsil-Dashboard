import { Partner } from '@/lib/type_module/center_type';
import { toast } from "react-hot-toast"
import { UpdateDocument } from '@/lib/call_action';
import { useRouter } from 'next/navigation'

export default function ComplitDocument({ user, onsub } : {user : Partner, onsub: (value: null) => void }) {

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Submite Documment...');

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())


        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
          );

          if (Object.keys(filteredData).length === 0) {
            toast.error('No fields to update.', { id: loadingToastId });
            return;
          }

          const updatedUser = { id: user.id.toString(), ...filteredData };

          try {
            const res = await UpdateDocument(updatedUser)
            if(res){
                    toast.success('Updated with Succesfully', { id: loadingToastId });
                    router.refresh()
                    onsub(null)
                  }
          }catch(error){
            if (error instanceof Error) {
                toast.error(error.message, { id: loadingToastId });
            } else {
                toast.error('An unknown error occurred', { id: loadingToastId });
            }
          }

    }

  return (
    <div className='fixed overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
        <div className='max-w-5xl mx-auto rounded-xl p-10 mt-10 bg-white'>
          <h1 className='mb-5 text-xl text-center font-bold'>Completé le dossie</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <p>Adress</p>
            <input type='text' name='adresse' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Adress' defaultValue={user.adresse || ''}/>
            <p>NRC</p>
            <input type='text' name='NRC' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le NRC' defaultValue={user.NRC || ''}/>
            <p>Nif</p>
            <input type='text' name='Nif' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le numéro de Nif' defaultValue={user.Nif || ''}/>
            <p>Numero Act</p>
            <input type='text' name='numero_act' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Numéro Act' defaultValue={user.numero_act || ''}/>
            <p>Numéro de la carte national</p>
            <input type="text" name="card_number" className='p-2 border border-slate-300 rounded-md' placeholder='Entre ID cart' defaultValue={user.card_number || ''}/>
            <p>Numéro de la régister de commerce</p>
            <input type="text" name="num_commerce" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Num commerce' defaultValue={user.num_commerce || ''}/>
            <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
          </form>
      </div>
    </div>
  )
}
