import { apiRequest } from "./request";


export async function tutorialVideo(): Promise<Video[] | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/videototos",
        })
        if (response.code == 200) {
            return response.data.data
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export async function tutorialCatégorie(): Promise<Categories[] | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/cataloguevideo",
        })
        if (response.code == 200) {
            return response.data.data
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export async function getCity({ latitude, longitude }: { latitude: number, longitude: number }): Promise<{ city: string, code: string } | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    // const geocoder = new window.google.maps.Geocoder();

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.address && data.address.city) {
            return {
                city: data.address.city,
                code: data.address.postcode
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}