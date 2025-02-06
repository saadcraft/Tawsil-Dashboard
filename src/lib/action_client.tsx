// "use server"

import { Result } from "./type_module/casses_type"
import { apiRequest } from "./request";
import { DateTime } from "next-auth/providers/kakao";
import { toast } from "react-hot-toast";

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

type apiCasses = {
    result: Result[];
    totalAct: number;
}

export async function AddAgent(Data: Data) {

    const { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, pass, password } = Data

    const loadingToastId = toast.loading('Adding agent...');

    if (pass !== password) {
        toast.error('Le mot de passe ne correspond pas', { id: loadingToastId })
        return false;
    }

    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/users/chef_bureux/agent/create",
            data: { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, password }
        });
        if (response.code == 201) {
            toast.success("L’utilisateur a été créé avec succès", { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId })
            return false
        }
    } catch {
        toast.error("Problem de connection", { id: loadingToastId });
        return false
    }
}

export async function SubmitCommande({ id }: { id: number[] }) {
    const loadingToastId = toast.loading('Submite Commande...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/user/commandes/valider",
            data: { id }
        });
        if (response.code == 200) {
            toast.success('valider Succesfully', { id: loadingToastId });
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

export async function CloseCasses(Data: { [key: string]: unknown }) {
    const loadingToastId = toast.loading('Opening casse...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/chefbureux/arretcasse",
            data: Data
        });
        if (response.code == 200) {
            toast.success("Caisse closed successfully!", { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }

    } catch {
        toast.error("problem connection", { id: loadingToastId });
        return false;
    }
}

export async function OpenCasses() {
    const loadingToastId = toast.loading('Opening casse...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/cassie/chef/ouvrir",
        });
        if (response.code == 200) {
            toast.success("Caisse opened successfully!", { id: loadingToastId });
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

export async function getCasses({ page, search_date }: { page: string, search_date: string }): Promise<apiCasses | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chef/cassies",
            params: { page, search_date }
        });

        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            };
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getTotalDemande() {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/centre_appel/enattends",
        })

        if (response.code == 200) {
            return response.data.number
        } else {
            return null;
        }
    } catch {
        return null
    }
}