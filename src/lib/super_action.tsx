import { DateTime } from "next-auth/providers/kakao";
import { apiRequest } from "./request";
import { Report } from '@/lib/type_module/center_type'

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
            result: response.results,
            totalAct: response.count
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

    if (pass !== password) {
        throw new Error("Password and confirm password are not the same");
    }

    try {
        const response = await apiRequest({
            method: "POST",
            url: "api/v1/commerciale/superviseur/create",
            data: { last_name, first_name, username, email, date_de_naissance, lieux, sexe, phone_number_1, phone_number_2, password }
        })

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
            result: data.results,
            totalAct: data.count
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
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/suppervisseur/rapport/create",
            data: { "parteneur": { id }, message }
        })
        if (response) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
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
            result: response.results,
            totalAct: response.count
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}