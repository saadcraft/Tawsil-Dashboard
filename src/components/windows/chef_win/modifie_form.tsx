import { toast } from "react-hot-toast"
import { UpdateUser } from '@/lib/call_action';
import { useRouter } from 'next/navigation'

export default function ModifieForm({ user, onsub }: { user: Users, onsub: (value: null) => void }) {

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const formObject = Object.fromEntries(formData.entries())

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;


    const filteredData = Object.fromEntries(
      Object.entries(formObject).filter(([, value]) => value !== "")
    );

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    delete filteredData.confirm_password;

    if (Object.keys(filteredData).length === 0) {
      toast.error('No fields to update.');
      return;
    }

    const updatedUser = { id: user.id.toString(), ...filteredData };

    const res = await UpdateUser(updatedUser)
    if (res) {
      router.refresh()
      onsub(null)
    }
  }

  return (
    <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 mt-10 bg-white'>
        <h1 className='mb-5 text-2xl font-bold text-center'>Modifie profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <p>Le nom et le prénom</p>
          <div className='flex gap-5'>
            <input type='text' name='last_name' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Nom' defaultValue={user.last_name} />
            <input type='text' name='first_name' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le prénom' defaultValue={user.first_name} />
          </div>
          <p>Le Numéro de Télephone</p>
          <input type='text' name='phone_number_1' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le numéro de téléphone' defaultValue={user.phone_number_1} />
          <p>Email</p>
          <input type='email' name='email' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le email' defaultValue={user.email} />
          <p>Date de naissance</p>
          <input type="date" name="date_de_naissance" id="date_de_naissance" className='p-3 border border-slate-300 rounded-md' defaultValue={user.date_de_naissance ? new Date(user.date_de_naissance).toISOString().split('T')[0] : ""} />
          <p>Lieux de naissance</p>
          <input type="Text" name="lieux" id="lieux" placeholder='Lieux de naissance' className='p-3 border border-slate-300 rounded-md' defaultValue={user.lieux!} />
          <p>Le mot de passe</p>
          <input type="password" name="password" className='p-2 border border-slate-300 rounded-md' placeholder='Entre nouvel password' />
          <p>Confirmé le mot de passe</p>
          <input type="password" name="confirm_password" className='p-2 border border-slate-300 rounded-md' placeholder='Entre verifé password' />
          <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
        </form>
      </div>
    </div>
  )
}
