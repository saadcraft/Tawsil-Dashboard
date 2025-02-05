type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

type Result = {
  id: number;
  client: Users;
  magasin: Magasin;
  livreur: Livreur;
  total_price: string;
  created_at: string;
  delivery_price: number;
  valide_payment: boolean;
  prix_de_tax: number;
  paye_par_livreur: boolean;
  status: string;
  emp_val: number;
  selected: boolean;
}

type Courses = {
  id: number;
  client: Users;
  partener: Partenaire;
  km: number;
  point_gbs_localisation_aller: string;
  point_gbs_localisation_arrive: string;
  latitude_depart: string | null;
  longitude_depart: string | null;
  latitude_arrive: string | null;
  longitude_arrive: string | null;
  etat: string;
  paye: boolean;
  paye_par_partener: boolean;
  prix: number;
  wilaya: string;
  facteur_bonus: number;
  tax_tawsile: number;
  date_creation: string;
  agent: Users | null;
  selected: boolean;
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

type Vehicule = {
  id: number;
  modele: string | null;
  marque: string | null;
  matricule: string | null;
  num_assurance: string | null;
  num_scanner: string | null;
  Date_expiration_assurance: Date;
  Date_expiration_scanner: Date;
  type_vehicule: string | null;
}

type typeCompte = {
  descprtion: string;
  id: number;
  name: string
  tax_tawsile: number;
}

type Partenaire = {
  id: number;
  user: Users;
  vihucule: Vehicule;
  adresse: string | null;
  RC: string | null;
  Nif: string | null;
  numero_act: string | null;
  tax_a_payer: string | null;
  tax_global: string | null;
  chiffre_affaires: string | null;
  consement: string | null;
  randement: string | null;
  card_number: string | null;
  latitude: string | null;
  longitude: string | null;
  pre_en_charge: boolean;
  is_available: boolean;
  type_partener: string | null;
  type_compte: typeCompte;
}

type Users = {
  id: number;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  bloquer: boolean;
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
  is_superuser: boolean;
  date_joined: string;
};

type actionData = {
  count: number;
  next: boolean;
  previous: boolean;
  results: Actions[];
};

type Actions = {
  id: number;
  agent: Users;
  date_action: string;
  total_amount: string;
  livreur: Livreur;
};

type MagasinType = {
  id: number
  name: string;
  description: string;
  tax_tawsile: number;
}

type DataType = {
  [key: string | number]: unknown
}

type Caisses = {
  id: number;
  chef_bu: Users;
  resut: number;
  date_creationn: string;
  etat: boolean;
  prix_reale: number;
  approuve: boolean;
  a_compte: number | null;
  manque: number | null;
}

type Context = {
  total_courses: number;
  total_users_chef_bureux: number;
  tolat_users_agents: number; // Note: Typo in the key name (should be "total_users_agents")
  total_users_centre_appel: number;
  total_users_superviseurs: number;
  total_users_validation: number;
  total_users_with_group: number;
  total_partners__choffeur: number;
  total_partners__magasin: number;
  total_partners__livreur: number; // Note: Double underscore in the key name
};

type Demande = {
  id: number,
  superviseur: Users,
  date_de_creation: string,
  somme: number,
  wilaya: string,
  etat: "en_attente" | "refuse" | "accepte" | "annuler";
  appouvie_par_super_v: boolean;
}