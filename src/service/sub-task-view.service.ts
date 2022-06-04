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
      'http://localhost:9000/project-service/api/v1.0/project-tracker/create/user-story/' +
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
      'http://localhost:9000/project-service/api/v1.0/project-tracker/create/user-story/' +
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
      'http://localhost:9000/project-service/api/v1.0/project-tracker/get-details/sub-task/' +
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
