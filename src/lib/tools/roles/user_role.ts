export function Role(role: string) {
    switch (role.toLowerCase()) {
        case "admin":
            return "Administrator";
        case "chef_bureau":
            return ["/dashboard", "/dashboard/profile", "/dashboard/actions", "/dashboard/agent_administratif", "/dashboard/ajoute_agent", "/dashboard/apple_center", "/dashboard/caisses", "/dashboard/deliveries"];
        case "centre_appel":
            return ["/dashboard", "/dashboard/profile", "/dashboard/apple_center"];
        case "agent_administratif":
            return ["/dashboard", "/dashboard/profile", "/dashboard/apple_center", "/dashboard/deliveries"];
        case "superviseur":
            return ["/dashboard", "/dashboard/profile", "/dashboard/rapports", "/dashboard/validation"];
        case "gestion_commercial":
            return ["/dashboard", "/dashboard/profile", "/dashboard/modifie_superviseur", "/dashboard/agent_administratif", "/dashboard/ajoute_superviseur", "/dashboard/magasin", "/dashboard/partenaire"];
        case "validation_vtc":
            return ["/dashboard", "/dashboard/profile", "/dashboard/courses"];
        case "comptable":
            return ["/dashboard", "/dashboard/profile", "/dashboard/comptable"];
        // Add more roles as needed
        default:
            return "Guest"; // Default fallback
    }

}