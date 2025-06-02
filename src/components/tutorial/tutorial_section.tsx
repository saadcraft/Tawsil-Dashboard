"use client"

import { useState } from "react"
import Image from "next/image"
import { IoPlayOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import ShowVideo from "../windows/show_video";


export default function VideoTutorials({ tutorials, categories }: { tutorials: Video[], categories: Categories[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

    // console.log(categories)

    const modifiedCategories = [
        {
            id: categories.length + 1,
            name: "All",
        },
        ...categories
    ]

    const filteredTutorials =
        selectedCategory === "All" ? tutorials : tutorials.filter((tutorial) => tutorial.cataloguevideo.name === selectedCategory)

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Video Tutorials</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {modifiedCategories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.name
                            ? "bg-third text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl cursor-pointer"
                        onClick={() => setSelectedVideo(tutorial)}
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={process.env.NEXT_PUBLIC_IMGS_DOMAIN + tutorial.image || "/placeholder.svg"}
                                alt={tutorial.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="bg-third text-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <IoPlayOutline className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                <LuClock4 className="h-3 w-3 mr-1" />
                                {tutorial.time}
                            </div>
                            <div className="absolute top-2 right-2 bg-third text-white text-xs px-2 py-1 rounded-md">
                                {tutorial.cataloguevideo.name}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold mb-2 line-clamp-1">{tutorial.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{tutorial.description}</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                {/* <User className="h-4 w-4 mr-1" /> */}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedVideo &&

                <ShowVideo selectedVideo={selectedVideo} onClose={setSelectedVideo} />

            }
        </div>
    )
}
