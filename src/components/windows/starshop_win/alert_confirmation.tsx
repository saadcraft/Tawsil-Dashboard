import React from 'react'
import { GoAlertFill } from "react-icons/go";

export default function ConfirmationReminder({ closeDelet, confirmation, handleSubmit }:
    {
        closeDelet: () => void,
        handleSubmit: (value: number) => void,
        confirmation: {
            isOpen: boolean
            orderId: number | null
            orderUser: string
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
                        <div className="flex items-center gap-3 mb-4">
                            <GoAlertFill className="h-6 w-6" />
                            <h3 className="text-lg font-medium">Confirmer la commande</h3>
                        </div>

                        <p className="text-gray-700 dark:text-white mb-6">
                            Êtes-vous sûr de vouloir confirmer cette commande pour{" "}
                            <span className="font-semibold">{confirmation.orderUser}</span>? Cette action ne peut pas être annulée.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeDelet}
                                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                No, Quitter
                            </button>
                            <button
                                onClick={() => confirmation.orderId && handleSubmit(confirmation.orderId)}
                                className="px-4 py-2 rounded-md border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Oui, confirmé
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}