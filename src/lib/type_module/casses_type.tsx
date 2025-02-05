// Interface for a single result
export type Result = {
    id: number;
    chef_bu: Users;
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