import React from 'react'
import { GoAlertFill } from "react-icons/go";

export default function DeleteReminder({ closeDelet, deleteConfirmation, handleDelete }:
    {
        closeDelet: () => void,
        handleDelete: (value: number) => void,
        deleteConfirmation: {
            isOpen: boolean
            userId: number | null
            userName: string
        }
    }) {
    // console.log(deleteConfirmation)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-9999" aria-modal="true" role="dialog">
            <div className="fixed inset-0 bg-gray-700/60 z-9998" aria-hidden="true" onClick={closeDelet}></div>

            {/* Modal dialog */}
            <div className="relative bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md w-full mx-4 z-9999">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <GoAlertFill className="h-6 w-6" />
                            <h3 className="text-lg font-medium">Confirm Deletion</h3>
                        </div>

                        <p className="text-gray-700 dark:text-white mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">{deleteConfirmation.userName}</span>? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeDelet}
                                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => deleteConfirmation.userId && handleDelete(deleteConfirmation.userId)}
                                className="px-4 py-2 rounded-md border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}