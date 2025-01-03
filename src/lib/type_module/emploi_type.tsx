export type Employer = {
    id: number;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_de_naissance: string | null; // Using string to represent dates; you may use Date if parsed.
    role: string;
    lieux: string;
    sexe: string | null;
    phone_number_1: string;
    phone_number_2: string | null;
    image_url: string | null;
    wilaya: string;
    groupe: string;
    rendement: number;
    point: number;
    rating: number;
    permission_vlider: boolean;
  }
  
export type EmployersResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Employer[];
  }