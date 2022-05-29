import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserStory } from 'src/model/UserStory';
import ManageUserService from 'src/service/manage.users.service';
import ProjectService from 'src/service/project.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {
  newUserStory = new UserStory();
  backlogStories: any;
  @Input() projectId: any;
  currentUserstoryId: any;
  showCreateUserStoryPopup = false;
  showManageUserStoryPopup = false;
  userRole: any;
  priorities = ['HIGH', 'MEDIUM', 'LOW'];
  usersList: any = [];
  selectedUserId!: any;

  selectedUserStory = new UserStory();
  selectedRowNumber = -1;

  constructor(
    private projectService: ProjectService,
    private manageUsers: ManageUserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let userRole: any = localStorage.getItem('loggedInUserRole');
    this.userRole = userRole;

    this.projectService
      .getStoriesInBacklog(this.projectId)
      .subscribe((response) => {
        console.log('getStoriesInBacklog call success');
        console.log(response.body);
        this.backlogStories = response.body;
      });
  }

  createUserStory() {
    console.log(this.newUserStory.priority);
    let formattedUS = {
      ...this.newUserStory,
      assignedUser: this.selectedUserId.userId,
      projectId: this.projectId,
    };
    console.log([formattedUS]);
    this.projectService
      .createUserStory([formattedUS], this.projectId)
      .subscribe((response) => console.log(response.body));
  }

  showCreateUserStoryModal() {
    this.getUsersForProject();
    this.showCreateUserStoryPopup = true;
  }
  showManageUserStoryPopUp(userstory: UserStory) {
    this.showManageUserStoryPopup = true;
  }
  rowSelected(rowIndex: number, selectedUserStory: UserStory) {
    this.selectedUserStory = selectedUserStory;
    if (this.selectedRowNumber === rowIndex) {
      this.selectedRowNumber = -1;
    } else {
      this.selectedRowNumber = rowIndex;
    }
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
        console.log(this.usersList);
      });
  }

  showViaService() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
}
