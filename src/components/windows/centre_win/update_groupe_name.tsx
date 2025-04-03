import React from 'react'

export default function UpdateGroupeName({ id, onEvent, onClose }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void, onClose: (value: null) => void }) {
    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h3 className="text-lg font-semibold text-gray-900">Modifie nom de groupe</h3>
                <form onSubmit={(event) => onEvent(id, event)}>
                    <div className="py-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Group Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Entre le nom de groupe"
                                    name='groupe'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-end gap-2">
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
                            Update Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
