import { UserRole } from "./userRole";

export class ChefRole extends UserRole {
    public getRole() {
        return "chef_bureau"
    }

    public getUrl(): Array<string> {
        return ["/actions", "/agent_administratif", "/ajoute_agent", "/apple_centre", "/caisses", "/delivers"]
    }

}