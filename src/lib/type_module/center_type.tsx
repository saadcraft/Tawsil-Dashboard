export type User = {
    id: number;
    password: string | null;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_de_naissance: string | null;
    role: "partener" | "client" | string; // Adjust as needed
    lieux: string | null;
    sexe: "homme" | "femme" | null;
    phone_number_1: string;
    phone_number_2: string | null;
    image_url: string | null;
    wilaya: string | null;
    groupe: string | null;
    rendement: number;
    point: number;
    rating: number;
    permission_vlider: boolean;
};

export type Partner = {
    id: number;
    user: User;
    nom_de_magasin: string | null;
    adresse: string | null;
    NRC: string | null;
    Nif: string | null;
    numero_act: string | null;
    tax_a_payer: number | null;
    tax_global: number | null;
    chiffre_affaires: number | null;
    consement: number | null;
    randement: number | null;
    card_number: string | null;
    num_commerce: string | null;
    latitude: string | null;
    longitude: string | null;
    pre_en_charge: boolean;
    is_available: boolean;
    type_partener: string | null;
    type_compte: number;
};

export type PartnersResponse = Partner[];