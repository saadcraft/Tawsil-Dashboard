import React from 'react'
import { RiLoader3Fill } from 'react-icons/ri'

export default function Notification() {

    return (
        <div>
            <div className="p-4 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center  gap-4">
                    <div className="flex-shrink-0">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <RiLoader3Fill className='animate-spin mt-0.5' />
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">You have a new message from Sarah.</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">5 minutes ago</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
