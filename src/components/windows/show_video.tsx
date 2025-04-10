import React from 'react'
import { FaRegCircleXmark } from "react-icons/fa6";

export default function ShowVideo({ selectedVideo, onClose }: { selectedVideo: Video, onClose: (value: null) => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity">
            <div
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold truncate pr-4">{selectedVideo.name}</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose(null)
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FaRegCircleXmark className='text-2xl' />
                    </button>
                </div>

                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.lien}?autoplay=1`}
                        title={selectedVideo.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-4 overflow-y-auto">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">

                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{selectedVideo.description}</p>
                </div>
            </div>
        </div>
    )
}
