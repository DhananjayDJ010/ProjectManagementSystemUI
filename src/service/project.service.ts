import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubTask } from 'src/model/SubTask';
import { UserStory } from 'src/model/UserStory';

@Injectable()
export default class ProjectService {
  constructor(private http: HttpClient) {}
  createUserStory(userStory: UserStory[], projectId: string) {
    let createUserStoryResponse = this.http.post(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/create/user-stories',
      userStory,
      {
        observe: 'response',
        headers: { projectIds: projectId, 'Content-Type': 'application/json' },
      }
    );
    return createUserStoryResponse;
  }

  getStoriesInBacklog(projectId: string) {
    let getStoriesInBacklogResponse = this.http.get(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/backlog/user-story/' +
        projectId,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'Content-Type': 'application/json',
        },
      }
    );
    return getStoriesInBacklogResponse;
  }

  updateUserStory(
    userStory: UserStory,
    projectId: string,
    userStoryId: string
  ) {
    let updateUserStoryResponse = this.http.post(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/update/user-stories' +
        userStoryId,
      userStory,
      {
        observe: 'response',
        headers: { projectId, 'Content-Type': 'application/json' },
      }
    );
    return updateUserStoryResponse;
  }

  crateSubTask(subTask: SubTask, projectId: string, userStoryId: string) {
    let crateSubTaskResponse = this.http.post(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/create/user-story/' +
        userStoryId +
        '/sub-task',
      subTask,
      {
        observe: 'response',
        headers: { projectId, 'Content-Type': 'application/json' },
      }
    );
    return crateSubTaskResponse;
  }

  updateSubTask(
    subTask: SubTask,
    projectId: string,
    userStoryId: string,
    subTaskId: string
  ) {
    let updateSubTaskResponse = this.http.post(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/create/user-story/' +
        userStoryId +
        '/sub-task' +
        subTaskId,
      subTask,
      {
        observe: 'response',
        headers: { projectId, 'Content-Type': 'application/json' },
      }
    );
    return updateSubTaskResponse;
  }
}
