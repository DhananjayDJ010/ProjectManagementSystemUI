import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubTask } from 'src/model/SubTask';

@Injectable({
  providedIn: 'root',
})
export class SubTaskViewService {
  constructor(private http: HttpClient) {}

  createSubTask(
    createSubTask: SubTask,
    userStoryId: number,
    projectId: string
  ) {
    let newSubTaskDetails = this.http.post(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/create/user-story/' +
        userStoryId +
        '/' +
        'sub-task',
      createSubTask,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    return newSubTaskDetails;
  }

  updateSubTask(
    updateSubTask: SubTask,
    userStoryId: number,
    subTaskId: number,
    projectId: string
  ) {
    let updatedSubTask = this.http.put(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/create/user-story/' +
        userStoryId +
        '/sub-task/' +
        subTaskId,
      updateSubTask,
      {
        observe: 'response',
        headers: {
          projectIds: projectId,
          'content-type': 'application/json',
        },
      }
    );
    return updatedSubTask;
  }

  getSubTasks(userStoryId: number) {
    let subTaskDetails = this.http.get(
      'https://u0bqod1gs3.execute-api.ap-south-1.amazonaws.com/dev/api/v1.0/project-tracker/get-details/sub-task/' +
        userStoryId,
      {
        observe: 'response',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return subTaskDetails;
  }
}
