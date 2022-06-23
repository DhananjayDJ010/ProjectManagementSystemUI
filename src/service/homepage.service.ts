import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'src/model/Project';

@Injectable()
export default class HomePageService {
  constructor(private http: HttpClient) {}
  getManagedProjects(managerId: string) {
    let managedProjects = this.http.get(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/project/managed/' +
        managerId,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return managedProjects;
  }

  getInvolvedProjects(emailId: string) {
    let involvedProjects = this.http.get(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/user/get-details/' +
        emailId,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return involvedProjects;
  }

  createProject(project: Project) {
    let createProjectResponse = this.http.post(
      'https://u1vcnuupy5.execute-api.us-west-2.amazonaws.com/dev/api/v1.0/project-tracker/manager/create-project',
      project,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return createProjectResponse;
  }
}
