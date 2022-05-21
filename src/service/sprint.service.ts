import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from 'src/model/sprint';
import { SprintUserStory } from 'src/model/sprintUserstory';

@Injectable()
export default class SprintService {
  constructor(private http: HttpClient) {}
  createSprint(newSprint: Sprint, projectId: string) {
    let newSprintDetails = this.http.post(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/add/sprint',
      newSprint,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    return newSprintDetails;
  }

  getAllSprintDetails(projectId: string) {
    let sprintDetails = this.http.get(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/get-details/sprints/' +
        projectId,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return sprintDetails;
  }

  getUserStoriesForSprint(sprintId: number) {
    let userStories = this.http.get(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/get-details/user-story/' +
        sprintId,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return userStories;
  }

  updateSprint(projectId: string, sprintId: number, newSprint: Sprint) {
    let updateSprintRes = this.http.put(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/add/sprint/' +
        sprintId,
      newSprint,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    console.log(updateSprintRes);
    return updateSprintRes;
  }

  getUserStoriesInBacklog(projectId: string) {
    let userStories = this.http.get(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/backlog/user-story/' +
        projectId,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
          projectIds: projectId,
        },
      }
    );
    return userStories;
  }

  addFromBacklog(projectId: string) {
    let userStories = this.http.get(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/backlog/user-story/' +
        projectId,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
          projectIds: projectId,
        },
      }
    );
    return userStories;
  }

  updateSprintUserStory(
    projectId: string,
    sprintId: number,
    newSprint: SprintUserStory
  ) {
    let updateSprintRes = this.http.put(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/update/user-story/' +
        sprintId,
      newSprint,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    console.log(updateSprintRes);
    return updateSprintRes;
  }

  addUserStoriesToSprint(
    projectId: string,
    sprintId: number,
    userstoryIds: string
  ) {
    let addSprintRes = this.http.post(
      'http://localhost:9000/project-service/api/v1.0/project-tracker/add/sprint/' + sprintId + '/user-stories',
      userstoryIds,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    console.log(addSprintRes);
    return addSprintRes;
  }
}

