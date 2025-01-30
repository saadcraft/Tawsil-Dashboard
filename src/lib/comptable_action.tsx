import { apiRequest } from "./request"


type apiCasses = {
    result: Caisses[],
    totalAct: number
}

export async function GetAllCasses({ page, search, date, chef }: { page: string, search: string, date: string, chef: string }): Promise<apiCasses | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/comtable/cassies",
            params: { page, search, date, chef }
        })
        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            };
        } else {
            return null;
        }
    } catch {
        return null;
    }
}