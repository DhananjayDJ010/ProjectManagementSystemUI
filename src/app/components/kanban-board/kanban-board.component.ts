import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SprintUserStory } from 'src/model/sprintUserstory';
import { SprintUserStoryChild } from 'src/model/SprintUserStoryChild';
import SprintService from 'src/service/sprint.service';

interface status {
  name: string;
  code: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent implements OnInit {
  items: Observable<any[]> | undefined;
  item: Observable<any> | undefined;
  public statuses: status[] = [];
  public title: string = '';
  public description: string = '';
  public selectedStatus: status = { name: '', code: '' };
  projectId!: string;
  sprintId!: string;
  sprintUserStories: SprintUserStory[] = [];

  todo: SprintUserStory[] = [];
  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService
  ) {}
  DEFINED: SprintUserStory[] = [];
  IN_PROGRESS: SprintUserStory[] = [];
  DONE: SprintUserStory[] = [];
  ACCEPTED: SprintUserStory[] = [];
  movingTask: SprintUserStory = new SprintUserStory();
  // movingTask: any = {
  //   id: '',
  //   title: '',
  //   description: '',
  //   status: '',
  // };
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'];
      this.sprintId = params['sprintId'];
      console.log(this.projectId, this.sprintId);
      this.getUserStoriesForSprint(this.sprintId);
    });
    this.filterSets();
    this.statuses = [
      { name: 'Defined', code: 'DEFINED' },
      { name: 'In Progress', code: 'IN_PROGRESS' },
      { name: 'Done', code: 'DONE' },
      { name: 'ACCEPTED', code: 'ACCEPTED' },
    ];
  }

  getUserStoriesForSprint(sprintId: string) {
    this.sprintService
      .getUserStoriesForSprint(parseInt(sprintId, 10))
      .subscribe((response) => {
        console.log(response.body);
        this.sprintUserStories = <SprintUserStory[]>response.body;
        this.todo = this.sprintUserStories;
        this.filterSets();
        console.log(this.sprintUserStories);
        // this.sprintUserStories = sprintUserStories.map((story) => {
        //   let child = new SprintUserStoryChild(story);
        //   return {
        //     ...story,
        //     data: [child],
        //   };
        // });
      });
  }
  public generateId() {
    return 'id' + Math.random().toString(16).slice(2);
  }
  private addNewCard(task: Task) {
    // this.itemsCollection?.add(task);
    //no need to add to corresponding listsince subscription is working
    //this.addToSpecificGroup(task);
  }
  private addToSpecificGroup(task: SprintUserStory) {
    if (task.status === 'DEFINED') {
      this.DEFINED.push(task);
    }
    if (task.status === 'IN_PROGRESS') {
      this.IN_PROGRESS.push(task);
    }
    if (task.status === 'DONE') {
      this.DONE.push(task);
    }
    if (task.status === 'ACCEPTED') {
      this.ACCEPTED.push(task);
    }
  }
  private resetGroups() {
    this.DEFINED = [];
    this.IN_PROGRESS = [];
    this.DONE = [];
    this.ACCEPTED = [];
  }
  private filterSets() {
    this.resetGroups();
    this.todo.forEach((task) => {
      this.addToSpecificGroup(task);
    });
  }
  public dragStart(dd: any) {
    console.log(dd);
    this.movingTask = { ...dd };
  }

  public drop(event: any) {
    const startStatus = this.movingTask.status;
    const endStatus = event.currentTarget.id;
    this.startMoving(startStatus);
    this.endMoving(endStatus);
  }
  private startMoving(startStatus: string) {
    let pos = -1;
    if (startStatus === 'DEFINED') {
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'IN_PROGRESS') {
      console.log(this.IN_PROGRESS);
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'DONE') {
      console.log(this.DONE);
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'ACCEPTED') {
      console.log(this.ACCEPTED);
      pos = 0;
      this[startStatus].splice(pos, 1);
    }
  }
  private endMoving(endStatus: string) {
    this.movingTask.status = endStatus;
    console.log(this.movingTask);
    if (endStatus === 'DEFINED') {
      this.DEFINED.push(this.movingTask);
    }
    if (endStatus === 'IN_PROGRESS') {
      this.IN_PROGRESS.push(this.movingTask);
    }
    if (endStatus === 'DONE') {
      this.DONE.push(this.movingTask);
    }
    if (endStatus === 'ACCEPTED') {
      this.ACCEPTED.push(this.movingTask);
    }
    this.updateCardStatus();
    // this.itemDoc = this.afs.doc<Task>(
    //   'task-list/' + this.movingTask.trackingId
    // );
    // this.itemDoc.update(this.movingTask);
  }

  updateCardStatus() {
    this.sprintService
      .updateSprintUserStory(this.projectId,this.movingTask.id, this.movingTask)
      .subscribe((response) => {
        console.log(response.body);
      });
  }

  cardDetailsToRemove(event: any) {
    console.log(event);
    // this.itemDoc = this.afs.doc<Task>('task-list/' + event.trackingId);
    // this.itemDoc.delete();
  }

  createCard() {
    // const temptask = {
    //   title: this.title,
    //   description: this.description,
    //   status: this.selectedStatus.code,
    //   id: this.generateId(),
    // };
    // this.todo.push(temptask);
    // this.filterSets();
  }
}
