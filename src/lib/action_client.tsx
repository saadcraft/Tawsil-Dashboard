"use server"

import { Result } from "./type_module/casses_type"
import { apiRequest } from "./request";
import { DateTime } from "next-auth/providers/kakao";

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

    if (pass !== password) {
        throw new Error("Password and confirm password are not the same");
    }

    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/users/chef_bureux/agent/create",
            data: { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, password }
        });
        if (response) {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unexpected error");
    }
}

export async function SubmitCommande({ id }: { id: number[] }) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/user/commandes/valider",
            data: { id }
        });

        return response;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function CloseCasses({ prix }: { prix: string }) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/chefbureux/arretcasse",
            data: { prix }
        });
        if (response) {
            return true;
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function OpenCasses() {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/cassie/chef/ouvrir",
        });
        if (response) {
            return true;
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function getCasses({ page, search_date }: { page: string, search_date: string }): Promise<apiCasses> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chef/cassies",
            params: { page, search_date }
        });

        return {
            result: response.results,
            totalAct: response.count
        };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}