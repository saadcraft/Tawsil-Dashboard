"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Replace with your actual Mapbox access token
mapboxgl.accessToken =
    "pk.eyJ1Ijoic2tpbGx6ZGV2IiwiYSI6ImNsbm9ndHlsYzBlZzcyanBiNXVxM2EyMXAifQ.QGsfF_dMW7vRo6XLWOvkFA"

let isRTLPluginInitialized = false;

interface MapProps {
    onMapClick: (lng: number, lat: number) => void
    localisation: number[]
    onSub: ({ latitude, longitude }: { latitude: number, longitude: number }) => void
}

export default function MapGl({ onMapClick, localisation, onSub }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    // const [mapLoaded, setMapLoaded] = useState(false)
    const marker = useRef<mapboxgl.Marker | null>(null); // To track the current marker
    const [isClient, setIsClient] = useState(false)

    // Ensure the map and RTL plugin are only initialized on the client-side
    useEffect(() => {
        // This check is necessary to make sure this runs only once after the component mounts on the client-side
        if (typeof window !== "undefined") {
            setIsClient(true)
        }
    }, [])

    useEffect(() => {
        // Only call setRTLTextPlugin once throughout the entire app
        if (isClient && !isRTLPluginInitialized) {
            mapboxgl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js',
                null,
                true
            )
            isRTLPluginInitialized = true // Flag to track initialization globally
        }
    }, [isClient]) // This effect will only run when `isClient` is true

    useEffect(() => {
        if (map.current) return // Initialize map only once

        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                language: "fr",
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [localisation[0], localisation[1]], // Default center (New York)
                zoom: 9,
            });

            map.current.on("load", () => {

            });

            // Handle map click to add a marker
            map.current.on("click", (e) => {
                const { lng, lat } = e.lngLat
                onMapClick(lng, lat) // Pass coordinates to the parent component if needed
                updateMarker(lng, lat) // Add a marker on the map
            });

            marker.current = new mapboxgl.Marker()
                .setLngLat([localisation[0], localisation[1]])
                .addTo(map.current!) // Add marker to the map
        }

        // Clean up map on component unmount
        return () => {
            if (map.current) {
                map.current.remove()
                map.current = null
            }
        }
    }, [localisation, isClient])

    // Function to update the marker
    const updateMarker = (lng: number, lat: number) => {
        if (marker.current) {
            // If a marker already exists, remove it before adding a new one
            marker.current.remove()
        }

        // Create a new marker and set its position
        marker.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current!) // Add marker to the map
    }
    if (!isClient) {
        return null; // Render nothing on the server-side
    }

    const handleButtonClick = () => {
        if (marker.current) {
            const { lng, lat } = marker.current.getLngLat()
            console.log(lng, lat)
            onSub({ latitude: lat, longitude: lng })

        } else {
            // Fallback if marker doesn't exist yet, use default location
            onMapClick(localisation[0], localisation[1])
        }
    }

    return (
        <div className="absolute inset-0 rounded-lg"> {/* Set map height here */}
            <div ref={mapContainer} className="w-full h-full rounded-lg" /> {/* Full height for map */}
            <button onClick={handleButtonClick} className="absolute right-3 bottom-5 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">définir la localisation</button>
        </div>
    )
}
// // src/MapboxMap.tsx
// "use client"

// import { useState } from "react"
// import { Marker } from 'react-map-gl' // Corrected imports
// import mapboxgl from "mapbox-gl"
// import "mapbox-gl/dist/mapbox-gl.css"

// interface MapProps {
//     onMapClick: (lng: number, lat: number) => void
// }

// export default function MapGl({ onMapClick }: MapProps) {
//     const [viewport, setViewport] = useState({
//         latitude: 40,
//         longitude: -74.5,
//         zoom: 9,
//     })
//     const [pin, setPin] = useState<{ latitude: number; longitude: number } | null>(null)

//     const handleMapClick = (event: any) => {
//         const [longitude, latitude] = event.lngLat
//         setPin({ latitude, longitude })
//         onMapClick(longitude, latitude)
//     }

//     return (
//         <div className="relative w-full h-screen">
//             <MapGL
//                 {...viewport}
//                 width="100%"
//                 height="100%"
//                 onViewportChange={setViewport}
//                 onClick={handleMapClick}
//                 mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN" // Replace with your Mapbox token
//             >
//                 {pin && (
//                     <Marker longitude={pin.longitude} latitude={pin.latitude}>
//                         <div className="w-6 h-6 bg-red-500 rounded-full" />
//                     </Marker>
//                 )}
//             </MapGL>
//         </div>
//     )
// }
