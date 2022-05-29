import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SprintUserStory } from 'src/model/sprintUserstory';
import { SprintUserStoryChild } from 'src/model/SprintUserStoryChild';
import CollabRoleService from 'src/service/collabrole.service';
import ManageUserService from 'src/service/manage.users.service';
import SprintService from 'src/service/sprint.service';

@Component({
  selector: 'app-sprint-userstory',
  templateUrl: './sprint-userstory.component.html',
  styleUrls: ['./sprint-userstory.component.css'],
})
export class SprintUserstoryComponent implements OnInit {
  @Input() sprintId: any;
  @Input() sprintName: any;
  @Input() projectId: any;
  @Output() backtoSprint: EventEmitter<any> = new EventEmitter();
  sprintUserStories: SprintUserStory[] = [];
  selectedUserStory: SprintUserStory = new SprintUserStory();
  selectedRowNumber = -1;
  showEditUserstoryPopupCheck = false;
  usersList: any = [];
  selectedUserId!: any;
  priorities = ['HIGH', 'MEDIUM', 'LOW'];
  statusArray = ['DEFINED', 'IN_PROGRESS', 'DONE', 'ACCEPTED'];
  selectedStatus!: any;
  userRole!: string;

  constructor(
    private sprintService: SprintService,
    private manageUsers: ManageUserService,
    private collabRoleService: CollabRoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserStoriesForSprint(this.sprintId);
    this.checkIfUserCanCreateSubtask();
  }

  goToSprint() {
    this.backtoSprint.emit(null);
  }

  getUserStoriesForSprint(sprintId: number) {
    this.sprintService
      .getUserStoriesForSprint(sprintId)
      .subscribe((response) => {
        console.log(response.body);
        const sprintUserStories = <SprintUserStory[]>response.body;
        this.sprintUserStories = sprintUserStories.map((story) => {
          let child = new SprintUserStoryChild(story);
          return {
            ...story,
            data: [child],
          };
        });
      });
  }

  rowSelected(rowIndex: number, selectedUserStory: SprintUserStory) {
    this.selectedUserStory = { ...selectedUserStory };
    if (this.selectedRowNumber === rowIndex) {
      this.selectedRowNumber = -1;
    } else {
      this.selectedRowNumber = rowIndex;
    }
    console.log(this.selectedUserStory);
  }

  getUsersForProject() {
    this.manageUsers
      .getUsersForProject(this.projectId)
      .subscribe((response) => {
        this.usersList = response.body;
        this.usersList = this.usersList.map((user: any) => {
          const mainRole = user.projectRoles.filter(
            (role: any) => role.projectId === this.projectId
          );
          return { ...user, mainRole };
        });
        console.log('List for sending request');
        this.showEditUserstoryPopupCheck = true;
        console.log(this.usersList);
      });
  }

  editUserStory() {
    this.selectedUserStory.assignedUser = this.selectedUserId.userId;
    this.selectedUserStory.status = this.selectedStatus;
    this.selectedUserStory.remainingEfforts =
      this.selectedUserStory.estimatedEfforts -
      this.selectedUserStory.consumedEfforts;
    console.log(this.selectedUserStory);

    this.sprintService
      .updateSprintUserStory(
        this.projectId,
        this.selectedUserStory.id,
        this.selectedUserStory
      )
      .subscribe((response) => {
        console.log(response.body);
      });
  }

  showEditUserstoryPopup() {
    this.getUsersForProject();
  }

  moveToBacklog() {
    this.selectedUserStory.sprintId = 0;
    this.sprintService
      .updateSprintUserStory(
        this.projectId,
        this.selectedUserStory.id,
        this.selectedUserStory
      )
      .subscribe((response) => {
        console.log(response.body);
      });
  }

  checkIfUserCanCreateSubtask() {
    this.userRole = this.collabRoleService.getCollabRole(this.projectId);
  }

  goToSubtaskView() {
    this.router.navigate([
      'subtasks',
      this.projectId,
      this.sprintId,
      this.selectedUserStory.id,
    ]);
  }
}
