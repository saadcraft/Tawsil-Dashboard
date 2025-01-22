import { UserRole } from "./userRole";

export class ChefRole extends UserRole {
    public getRole() {
        return "chef_bureau"
    }

    public getUrl(): Array<string> {
        return ["/role" ,"/role/actions", "/role/agent_administratif", "/role/ajoute_agent", "/role/apple_centre", "/role/caisses", "/role/deliveries"]
    }

}