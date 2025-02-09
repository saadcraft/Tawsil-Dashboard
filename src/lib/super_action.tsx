import { DateTime } from "next-auth/providers/kakao";
import { apiRequest } from "./request";
import { Report } from '@/lib/type_module/center_type'
import { toast } from "react-hot-toast"

type apiRequestT = {
    result: Users[];
    totalAct: number;
}
type apiRaport = {
    result: Report[];
    totalAct: number;
}
type apiParteneur = {
    result: Partenaire[];
    totalAct: number;
}

type apiDemande = {
    result: Demande[];
    totalAct: number;
}

export type Data = {
    last_name: string;
    first_name: string;
    username: string;
    date_de_naissance: DateTime;
    lieux: string;
    email: string;
    sexe: string;
    phone_number_1: string;
    phone_number_2: string;
    pass: string;
    password: string;
}

export async function getSuperviseur({ page, search }: { page: string, search: string }): Promise<apiRequestT | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/commerciale/supperviseurs",
            params: { page, search }
        })
        return {
            result: response.data.results,
            totalAct: response.data.count
        };
    } catch (error) {
        if (error instanceof Error) {
            // Handle 404 errors explicitly
            if (error.message.includes("404")) {
                return null
            }

            // For other errors, rethrow them
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function AddSuperViseur(Data: Data) {

    const { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, pass, password } = Data

    const loadingToastId = toast.loading('Submite Updating...');

    if (pass !== password) {
        toast.error('Le mot de passe ne correspond pas', { id: loadingToastId })
        return false;
    }

    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/commerciale/superviseur/create",
            data: { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, password }
        })

        if (response.code == 201) {
            toast.success('L’utilisateur a été créé avec succès', { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error("Problem connection", { id: loadingToastId });
        return false;
    }
}

export async function getValidation({ page, search, wilaya, is_active, groupe }:
    { page: string, search: string, wilaya: string, is_active: string, groupe: string }
): Promise<apiParteneur | null> {
    try {
        const data = await apiRequest({
            method: "GET",
            url: "/api/v1/supervisseur/pertenneurs",
            params: { page, search, wilaya, is_active, groupe }
        })
        return {
            result: data.data.results,
            totalAct: data.data.count
        };
    } catch (error) {
        if (error instanceof Error) {
            // Handle 404 errors explicitly
            if (error.message.includes("404")) {
                return null
            }

            // For other errors, rethrow them
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function AddReport({ id, message }: { id: number, message: string }) {
    const loadingToastId = toast.loading('Submite Report...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/suppervisseur/rapport/create",
            data: { "parteneur": { id }, message }
        })
        if (response.code == 201) {
            toast.success('Rapport crée avec succès', { id: loadingToastId });
            return true
        } else {
            toast.success(response.message, { id: loadingToastId });
            return false
        }
    } catch {
        toast.success("Problem connection", { id: loadingToastId });
        return false
    }
}

export async function ShowReport({ page }: { page: string }): Promise<apiRaport> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/superviseur/rapports",
            params: { page }
        })
        return {
            result: response.data.results,
            totalAct: response.data.count
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function DemandePerSuper({ page }: { page: string }): Promise<apiDemande | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/superviseur/demmandes/flixsy",
            params: { page }
        });

        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function addDemande({ somme }: { somme: number }) {
    const loadingToastId = toast.loading('Submite Demande...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "api/v1/superviseur/demande/flyxsi",
            data: { somme }
        })

        if (response.code == 201) {
            toast.success('La demande crée avec succès', { id: loadingToastId });
            return true
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false
        }
    } catch {
        toast.error("Problem connction", { id: loadingToastId });
        return false
    }
}

export async function allDemandes({ page, date, etat, search }: { page: string, date: string, etat: string, search: string }): Promise<apiDemande | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/centreappel/demendesflyxsy",
            params: { page, date, etat, search }
        });

        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function AproveDm({ flixy_id }: { flixy_id: number }) {
    const loadingToastId = toast.loading('Submite Demande...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/superviseur/apprpvie/flyxy",
            data: { flixy_id }
        })
        if (response.code == 200) {
            toast.success('Cette operation a éte', { id: loadingToastId });
            return true
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false
        }
    } catch {
        toast.error("Problem connection", { id: loadingToastId });
        return false
    }
}