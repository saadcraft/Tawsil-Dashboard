

export default function Named(role: string) {
    switch (role.toLowerCase()) {
        case "admin":
            return "Administrator";
        case "chef_bureau":
            return "Partenaire";
        case "centre_appel":
            return "centre d'appel";
        case "agent_administratif":
            return "agent administratif";
        case "superviseur":
            return "superviseur";
        // Add more roles as needed
        default:
            return "Guest"; // Default fallback
    }
}
