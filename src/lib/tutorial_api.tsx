import { apiRequest } from "./request";

type apiCommand = {
    result: Order[];
    totalAct: number;
}


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

export async function getCity({
    latitude,
    longitude,
}: {
    latitude: number;
    longitude: number;
}): Promise<{ city: string; code: string | null } | null> {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&types=place`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Mapbox request failed");
        }

        const data = await response.json();

        // console.log(data)

        const city = data?.features?.[0]?.context?.[0]?.text || null;
        const context = data?.features?.[0]?.context?.[0]?.short_code;
        // const postcode = context.find((c: any) => c.id.startsWith("postcode"))?.text || null;
        // console.log(context)

        if (city) {
            return {
                city,
                code: context,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Mapbox reverse geocoding error:", error);
        return null;
    }
}

export async function centreAppelConfirmation({ page, confirmation, search }: { page: string, confirmation: string, search: string }): Promise<apiCommand | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/centre/centreappel/commande",
            params: { page, confirmation, search }
        })
        if (response.code == 200) {
            return {
                result: response.data.data,
                totalAct: response.data.total_pages
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getTotalNoConfirmed() {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/commande/starshop/noconfimated",
        })

        if (response.code == 200) {
            return response.data.count
        } else {
            return null;
        }
    } catch {
        return null
    }
}