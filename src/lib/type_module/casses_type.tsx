export type ChefBU = {
    id: number;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_de_naissance: string | null;
    role: string;
    lieux: string | null;
    sexe: string;
    phone_number_1: string;
    phone_number_2: string | null;
    image_url: string | null;
    wilaya: string;
    groupe: string | null;
    rendement: number;
    point: number;
    rating: number;
    permission_vlider: boolean;
}

// Interface for a single result
export type Result = {
    id: number;
    chef_bu: ChefBU;
    resut: number;
    date_creationn: string;
    etat: boolean;
    prix_reale: number;
    a_compte: number;
}

// Interface for the paginated response
export type PaginatedResponse = {
    count: number;
    total_pages: number;
    current_page: number;
    results: Result[];
}