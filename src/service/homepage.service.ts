import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "src/model/Project";

@Injectable()
export default class HomePageService{
    constructor(private http:HttpClient){}
    getManagedProjects(managerId: string){
        let managedProjects = this.http.get("http://localhost:9000/user-service/api/v1.0/project-tracker/project/managed/" + managerId, {
        observe:'response',    
        headers:{
                "content-type":"application/json"
            }
        });
        return managedProjects;
    }

    getInvolvedProjects(emailId: string){
        let involvedProjects = this.http.get("http://localhost:9000/registration-service/api/v1.0/project-tracker/user/get-details/" + emailId, {
        observe:'response',
        headers:{
                "content-type":"application/json"
            }
        });
        return involvedProjects;
    }

    createProject(project: Project) {
        let createProjectResponse = this.http.post("http://localhost:9000/user-service/api/v1.0/project-tracker/manager/create-project", project, {
            observe: 'response',
            headers: {
                "content-type": "application/json"
            }
        });
        return createProjectResponse;
    }

}