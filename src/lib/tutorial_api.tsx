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