type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result[];
  }
  
type Result = {
    id: number;
    client: Client;
    magasin: Magasin;
    livreur: Livreur;
    total_price: string;
    created_at: string;
    delivery_price: string;
    valide_payment: boolean;
    paye_par_livreur: boolean;
    status: string;
    emp_val: number;
    selected: boolean;
  }
  
type Client = {
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
  
type Magasin = {
    id: number;
    cataloguqe: Catalogue;
    descprition: string;
    name: string;
    address: string;
    contact: string;
    is_active: boolean;
    wilaya: string;
    image_url: string | null;
    owner: number;
  }
  
type Catalogue = {
    id: number;
    name: string;
    description: string;
  }
  
type Livreur = {
    id: number;
    partenneur: Partenaire;
    is_available: boolean;
    wilaya: string;
  }
  
type Partenaire = {
    id: number;
    user: User;
    nom_de_magasin: string | null;
    adresse: string | null;
    NRC: string | null;
    Nif: string | null;
    numero_act: string | null;
    tax_a_payer: string | null;
    tax_global: string | null;
    chiffre_affaires: string | null;
    consement: string | null;
    randement: string | null;
    card_number: string | null;
    num_commerce: string | null;
    latitude: string | null;
    longitude: string | null;
    pre_en_charge: boolean;
    is_available: boolean;
    type_partener: string | null;
    type_compte: number;
  }

  type User = {
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
};