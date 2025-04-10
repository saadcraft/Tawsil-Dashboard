import VideoTutorials from '@/components/tutorial/tutorial_section'
import { tutorialCatégorie, tutorialVideo } from '@/lib/tutorial_api'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function PageTutorial() {

    const videos = await tutorialVideo()

    const categiry = await tutorialCatégorie()

    if (!videos) notFound()


    return (
        <div>
            <VideoTutorials tutorials={videos} categories={categiry!} />
        </div>
    )
}
