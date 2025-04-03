import React from 'react'

export default function update_groupe_name({ id, onEvent, onClose }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void, onClose: (value: null) => void }) {
    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5'>Ajouté un commentaire</h1>
                <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
                    <input name='name' className='p-3 border-2 rounded-md' placeholder='Entre le nom de groupe' />
                    <button
                        type="button"
                        onClick={() => onClose(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    </button>
                </form>
            </div>
        </div>
    )
}
