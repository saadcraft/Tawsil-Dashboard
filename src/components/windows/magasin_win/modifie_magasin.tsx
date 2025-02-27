import { UpdateMagasin } from '@/lib/stores_api';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function ModifieMagasin({ maga, onsub }: { maga: Magasin, onsub: (value: false) => void }) {

    const router = useRouter()

    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Submite update...');

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
        );

        // const updatedProduct = { magasin_id: maga.id, catalogue: storeCat.map(cat => cat.id), ...filteredData };
        const updatedProduct = { magasin_id: maga.id, ...filteredData };

        console.log(updatedProduct)

        const res = await UpdateMagasin(updatedProduct)

        if (res.code == 200) {
            toast.success(res.data.message, { id: loadingToastId });
            router.refresh();
            onsub(false)
        } else {
            toast.error(res.message, { id: loadingToastId });
        }
    }

    // const handleAddCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedId = event.target.value;
    //     if (!selectedId) return; // Do nothing if no option is selected

    //     // Find the selected category from the `option` array
    //     const selectedCategory = option.find((cat) => cat.id === Number(selectedId));
    //     if (!selectedCategory) return; // Do nothing if the category is not found

    //     // Check if the category already exists in `storeCat`
    //     const isCategoryExists = storeCat.some((cat) => cat.id === Number(selectedId));
    //     if (isCategoryExists) return; // Do nothing if the category already exists

    //     // Add the new category to `storeCat`
    //     setStoreCat((prev) => [...prev, selectedCategory]);
    // };

    // const handleRemoveCategory = (id: number) => {
    //     setStoreCat((prev) => prev.filter((cat) => cat.id !== Number(id)));
    // };

    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='md:max-w-2xl w-full mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5 text-2xl font-bold text-center'>Modifie Magasin</h1>
                <form onSubmit={handleChange} className='flex flex-col gap-4' encType="multipart/form-data">
                    <p>Le nom de magasin</p>
                    <input type='text' name='name' className='p-2 w-full border border-slate-300 rounded-md' placeholder='Entre le Nom de magasin' defaultValue={maga?.name} />
                    <p>address</p>
                    <input type='text' name='address' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le address' defaultValue={maga?.address} />
                    <p>Contact</p>
                    <input type='text' name='contact' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le contact' defaultValue={maga?.contact} />
                    <p>Description</p>
                    <textarea name='descprition' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le description' defaultValue={maga?.descprition} />
                    <p>Categories</p>
                    <div className="flex flex-wrap gap-2">
                        {maga?.cataloguqe.map((category) => (
                            <div
                                key={category?.id}
                                className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-primary"
                            >
                                {category?.name}
                                {/* <span
                                    // onClick={() => handleRemoveCategory(category.id)}
                                    className="ml-1 text-center cursor-pointer rounded-full p-1 hover:bg-gray-300"
                                >
                                    <p className="w-5 h-5 font-semibold" >x</p>
                                </span> */}
                            </div>
                        ))}
                    </div>
                    {/* <div className='flex items-center gap-2'>
                        <p>Ajouté:</p>
                        <select value={selectedCategoryId} onChange={handleAddCategory} name='catalogue_id' className='p-2 w-full border border-gray-300 rounded-md'>
                            <option value="">Sélectionné catégorie</option>
                            {option.map((pre, index) => {
                                if (!storeCat.map(cat => cat.id).includes(pre.id)) {
                                    return (
                                        <option key={index} value={pre.id}>{pre.name}</option>
                                    )
                                }

                            })}
                        </select>
                    </div> */}
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}
