
import { Injectable } from "@angular/core";

@Injectable()
export default class CollabRoleService {
    constructor() { }
    getCollabRole(projectId:string) {
        let loggedInCollabRoles:any = localStorage.getItem("loggedInProjectRoles");
        if(loggedInCollabRoles !== null){
            loggedInCollabRoles = JSON.parse(loggedInCollabRoles);
            console.log(loggedInCollabRoles);
            let role = loggedInCollabRoles.find((roleList:any) => roleList.projectId === projectId);
            return role.collaborationRole;
        }
    }
}