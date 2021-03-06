import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export default class ManageUserService {
  constructor(private http: HttpClient) {}

  manageUsers(usersList: any, currentProjectId: any) {
    let body = {
      projectAccessRequests: [
        {
          userId: '61f7d153-67ff-4ea1-ae56-f051ab1d3ca1',
          projectRoles: [
            {
              projectId: 'ea132cf0-9701-476a-89a5-de15201b8f78',
              collaborationRole: 'MEMBER',
            },
          ],
        },
      ],
    };

    let manageUsers = this.http.post(
      'http://localhost:9000/user-service/api/v1.0/project-tracker/manager/manage-user',
      usersList,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
          projectIds: currentProjectId,
          'create-project': 'false',
        },
      }
    );
    return manageUsers;
  }

  getUsersForProject(projectId: string) {
    let getUsersInProj = this.http.get(
      'http://localhost:9000/registration-service/api/v1.0/project-tracker/get-users',
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
          projectIds: projectId,
        },
      }
    );
    return getUsersInProj;
  }

  getAllUsers() {
    let getAllUsers = this.http.get(
      'http://localhost:9000/registration-service/api/v1.0/project-tracker/get-all-users',
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return getAllUsers;
  }

  getProjectDetailsFromProjectIds(projectIds: string) {
    let getProjectDetails = this.http.post(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/get-details/project',
      projectIds,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return getProjectDetails;
  }
}
