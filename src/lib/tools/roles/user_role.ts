export function Role(role: string) {
    switch (role.toLowerCase()) {
        case "admin":
            return ["/dashboard", "/dashboard/profile", "/dashboard/tutorial"];
        case "chef_bureau":
            return ["/dashboard", "/dashboard/profile", "/dashboard/actions", "/dashboard/agent_administratif", "/dashboard/ajoute_agent", "/dashboard/apple_center", "/dashboard/caisses", "/dashboard/deliveries", "/dashboard/tutorial"];
        case "centre_appel":
            return ["/dashboard", "/dashboard/profile", "/dashboard/apple_center", "/dashboard/groupes", "/dashboard/confirmation", "/dashboard/validation", "/dashboard/tutorial"];
        case "agent_administratif":
            return ["/dashboard", "/dashboard/profile", "/dashboard/apple_center", "/dashboard/deliveries", "/dashboard/tutorial"];
        case "superviseur":
            return ["/dashboard", "/dashboard/profile", "/dashboard/rapports", "/dashboard/validation", "/dashboard/recharge"];
        case "gestion_commercial":
            return ["/dashboard", "/dashboard/profile", "/dashboard/modifie_superviseur", "/dashboard/agent_administratif", "/dashboard/ajoute_superviseur", "/dashboard/magasin", "/dashboard/partenaire"];
        case "validation_vtc":
            return ["/dashboard", "/dashboard/profile", "/dashboard/courses", "/dashboard/vtc_rapide", "/dashboard/demande", "/dashboard/center_actions"];
        case "comptable":
            return ["/dashboard", "/dashboard/profile", "/dashboard/comptable", "/dashboard/group_actions"];
        case "partener":
            return ["/dashboard", "/dashboard/profile", "/dashboard/product_management", "/dashboard/commandes"];
        case "aide_comptable":
            return ["/dashboard", "/dashboard/profile"];
        // Add more roles as needed
        default:
            return null
    }
}