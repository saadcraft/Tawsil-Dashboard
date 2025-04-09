import { toast } from "react-hot-toast"
import { UpdateDocument } from '@/lib/call_action';
import { useRouter } from 'next/navigation';

type Vehicle = {
  modele?: string;
  matricule?: string;
  num_assurance?: string;
  num_scanner?: string;
  Date_expiration_assurance?: string;
  Date_expiration_scanner?: string;
  type_vehicule?: string;
};

type UserData = {
  id: string;
  adresse?: string;
  RC?: string;
  Nif?: string;
  numero_act?: string;
  card_number?: string;
  vihucule?: Vehicle;
};

export default function ComplitDocument({ user, onsub }: { user: Partenaire, onsub: (value: null) => void }) {

  const TypeChoices = ['Moto', 'Classique', 'Comfort', 'Black', 'Utilitaire', 'XXL', 'Harim']


  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    // const formObject = Object.fromEntries(formData.entries())

    const filterEmptyValues = (obj: UserData | Vehicle): Partial<UserData | Vehicle> => {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
          // Check if value is not empty, null, or undefined
          if (value && value !== "" && value !== null && value !== undefined) {
            // Recursively filter nested objects (like 'vihucule')
            if (typeof value === "object" && !Array.isArray(value)) {
              return [key, filterEmptyValues(value)];
            }
            return true; // Keep the key-value pair if value is valid
          }
          return false; // Remove the key-value pair if the value is empty
        })
      );
    };

    const data = {
      id: user.user.id.toString(),
      partener_id: user.id,
      adresse: formData.get('adresse')?.toString() || undefined,
      RC: formData.get('RC')?.toString() || undefined,
      Nif: formData.get('Nif')?.toString() || undefined,
      numero_act: formData.get('numero_act')?.toString() || undefined,
      card_number: formData.get('card_number')?.toString() || undefined,
      type_id: user.type_compte?.id,
      vihucule: {
        modele: formData.get('modele')?.toString() || undefined,
        matricule: formData.get('matricule')?.toString() || undefined,
        num_assurance: formData.get('num_assurance')?.toString() || undefined,
        num_scanner: formData.get('num_scanner')?.toString() || undefined,
        Date_expiration_assurance: formData.get('Date_expiration_assurance')?.toString() || undefined,
        Date_expiration_scanner: formData.get('Date_expiration_scanner')?.toString() || undefined,
        type_vehicule: formData.get('type_vehicule')?.toString() || undefined,
      },
    }

    if (data.card_number?.length != 18) {
      toast.error('Le numéro de carte doit avoir 18 caractères');
      return;
    }

    const filteredData = { id: data.id, ...filterEmptyValues(data) };

    // console.log(filteredData)


    // const filteredData = Object.fromEntries(
    //   Object.entries(formObject).filter(([, value]) => value !== "")
    // );

    if (Object.keys(filteredData).length === 0) {
      toast.error('No fields to update.');
      return;
    }

    // const updatedUser = { id: user.id.toString(), ...filteredData };
    const res = await UpdateDocument(filteredData)
    if (res) {
      router.refresh()
      onsub(null)
    }
  }

  return (
    <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='xl:w-2/3 w-full mx-auto rounded-xl p-10 mt-10 bg-white'>
        <h1 className='mb-5 text-xl text-center font-bold'>Completé le dossie</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <p className="flex items-center">Adress <span className='text-red-600 text-2xl'>*</span></p>
          <input type='text' name='adresse' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Adress' defaultValue={user.adresse || ''} />
          <p className="flex items-center">RC <span className='text-red-600 text-2xl'>*</span></p>
          <input type='text' name='RC' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le NRC' defaultValue={user.RC || ''} />
          <p className="flex items-center">Nif <span className='text-red-600 text-2xl'>*</span></p>
          <input type='text' name='Nif' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le numéro de Nif' defaultValue={user.Nif || ''} />
          <p className="flex items-center">Numero Act <span className='text-red-600 text-2xl'>*</span></p>
          <input type='text' name='numero_act' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Numéro Act' defaultValue={user.numero_act || ''} />
          <p className="flex items-center">Numéro de la carte national <span className='text-red-600 text-2xl'>*</span></p>
          <input type="text" name="card_number" className='p-2 border border-slate-300 rounded-md' placeholder='Entre ID cart' defaultValue={user.card_number || ''} />
          {user.vihucule?.type_vehicule &&
            <>
              <p className="flex items-center">type Vihucule <span className='text-red-600 text-2xl'>*</span></p>
              <select name="type_vehicule" className='p-2 border border-slate-300 rounded-md' >
                <option value={user.vihucule?.type_vehicule || ''} >{user.vihucule?.type_vehicule ? user.vihucule?.type_vehicule : 'Sélecte vihucule'}</option>
                {TypeChoices.map((pre, index) => {
                  if (user.vihucule?.type_vehicule != pre) {
                    return (
                      <option key={index} value={pre}>{pre}</option>
                    )
                  }
                })}
              </select>
              <p className="flex items-center">Vihucule <span className='text-red-600 text-2xl'>*</span></p>
              <input type="text" name="modele" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.modele || ''} />
              <p className="flex items-center">Numéro et date {`d'assurance`} <span className='text-red-600 text-2xl'>*</span></p>
              <div className="flex gap-3">
                <input type="text" name="num_assurance" className='p-2 border border-slate-300 rounded-md w-full' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.num_assurance || ''} />
                <input type="date" name="Date_expiration_assurance" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.Date_expiration_assurance ? new Date(user.vihucule.Date_expiration_assurance).toISOString().split('T')[0] : ""} />
              </div>
              <p className="flex items-center">Numéro et date scanner <span className='text-red-600 text-2xl'>*</span></p>
              <div className="flex gap-3">
                <input type="text" name="num_scanner" className='p-2 border border-slate-300 rounded-md w-full' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.num_scanner || ''} />
                <input type="date" name="Date_expiration_scanner" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.Date_expiration_scanner ? new Date(user.vihucule?.Date_expiration_scanner).toISOString().split('T')[0] : ""} />
              </div>
              <p className="flex items-center">Numéro de matricule <span className='text-red-600 text-2xl'>*</span></p>
              <input type="text" name="matricule" className='p-2 border border-slate-300 rounded-md' placeholder='Entre Le Num commerce' defaultValue={user.vihucule?.matricule || ''} />
            </>
          }
          <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
        </form>
      </div>
    </div>
  )
}
