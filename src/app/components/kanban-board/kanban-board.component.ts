import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

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
  todo: Task[] = [];
  constructor(
  ) {
  }
  started: Task[] = [];
  inprogress: Task[] = [];
  completed: Task[] = [];
  accepted: Task[] = [];
  movingTask: any = {
    id: '',
    title: '',
    description: '',
    status: '',
  };
  ngOnInit(): void {
    this.filterSets();
    this.statuses = [
      { name: 'Started', code: 'started' },
      { name: 'In Progress', code: 'inprogress' },
      { name: 'Completed', code: 'completed' },
      { name: 'Accepted', code: 'accepted' },
    ];
  }

  public generateId() {
    return 'id' + Math.random().toString(16).slice(2);
  }
  private addNewCard(task: Task) {
    // this.itemsCollection?.add(task);
    //no need to add to corresponding listsince subscription is working
    //this.addToSpecificGroup(task);
  }
  private addToSpecificGroup(task: Task) {
    if (task.status === 'started') {
      this.started.push(task);
    }
    if (task.status === 'inprogress') {
      this.inprogress.push(task);
    }
    if (task.status === 'completed') {
      this.completed.push(task);
    }
    if (task.status === 'accepted') {
      this.accepted.push(task);
    }
  }
  private resetGroups() {
    this.started = [];
    this.inprogress = [];
    this.completed = [];
    this.accepted = [];
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
    if (startStatus === 'started') {
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'inprogress') {
      console.log(this.inprogress);
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'completed') {
      console.log(this.completed);
      pos = this[startStatus].findIndex((x) => this.movingTask.id === x.id);
      this[startStatus].splice(pos, 1);
    }
    if (startStatus === 'accepted') {
      console.log(this.accepted);
      pos = 0;
      this[startStatus].splice(pos, 1);
    }
  }
  private endMoving(endStatus: string) {
    this.movingTask.status = endStatus;
    console.log(this.movingTask);
    if (endStatus === 'started') {
      this.started.push(this.movingTask);
    }
    if (endStatus === 'inprogress') {
      this.inprogress.push(this.movingTask);
    }
    if (endStatus === 'completed') {
      this.completed.push(this.movingTask);
    }
    if (endStatus === 'accepted') {
      this.accepted.push(this.movingTask);
    }
    // this.itemDoc = this.afs.doc<Task>(
    //   'task-list/' + this.movingTask.trackingId
    // );
    // this.itemDoc.update(this.movingTask);
  }
  cardDetailsToRemove(event: any) {
    console.log(event);
    // this.itemDoc = this.afs.doc<Task>('task-list/' + event.trackingId);
    // this.itemDoc.delete();
  }

  createCard() {
    const temptask = {
      title: this.title,
      description: this.description,
      status: this.selectedStatus.code,
      id: this.generateId()
    };
    this.todo.push(temptask);
    this.filterSets()
  }
}
