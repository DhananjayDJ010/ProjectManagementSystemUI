import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Project } from 'src/model/Project';
import HomePageService from 'src/service/homepage.service';
import ManageUserService from 'src/service/manage.users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userRole: any;
  emailId: any;
  managedProjects: any;
  involvedProjects: any;
  filteredInvolvedProjectIds: any;
  filteredInvolvedProjects: any;
  showUsersPopupCheck = false;
  showViewUsersPopupCheck = false;
  usersList: any = [];
  allUsers: any = [];
  processedUser: any;
  userPresentError = false;
  selectedRole: any;
  currentProjectId: any;
  showCreateProjectPopup = false;
  managerUserAfterCreateProject = false;
  newProjectDetails = new Project();
  manageUsersPopupTitle = 'Manage Users';
  viewUsersPopupTitle = 'View Users';
  userCollabRole = [
    'SCRUM_MASTER',
    'MEMBER',
    'EXTERNAL',
    'NO_ACCESS',
    'PROJECT_MANAGER',
  ];
  projectTypes = ['BUSINESS', 'SUPPORT'];
  loadDataFlag = false;

  constructor(
    private home: HomePageService,
    private manageUsers: ManageUserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let userId: any = localStorage.getItem('loggedInUserId');
    let emailId: any = localStorage.getItem('loggedInEmailId');
    let userRole: any = localStorage.getItem('loggedInUserRole');
    this.home.getInvolvedProjects(emailId).subscribe((response) => {
      console.log('Involved projects call success');
      console.log(response.body);
      this.involvedProjects = response.body;
      this.filterInvolvedProjects();
    });
    if (userRole === 'MANAGER') {
      this.home.getManagedProjects(userId).subscribe((response) => {
        console.log('Managed projects call success');
        console.log(response.body);
        this.managedProjects = response.body;
      });

      this.userRole = userRole;
      this.emailId = emailId;
    }
  }
  manageUsersForProjects() {
    this.manageUsers
      .manageUsers(
        { projectAccessRequests: this.usersList },
        this.currentProjectId
      )
      .subscribe((response) => {
        console.log(response.body);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project team modified',
        });
      });
  }

  showUsersPopup(projectId: string, projectName: string, manageUsers: boolean) {
    this.currentProjectId = projectId;
    this.showCreateProjectPopup = false;
    this.manageUsers.getUsersForProject(projectId).subscribe((response) => {
      this.usersList = response.body;
      this.usersList = this.usersList.map((user: any) => {
        const mainRole = user.projectRoles.filter(
          (role: any) => role.projectId === projectId
        );
        return { ...user, mainRole };
      });
      console.log('List for sending request');
      console.log(this.usersList);
      this.getAllUsers();
      this.manageUsersPopupTitle = 'Manage Users - ';
      this.manageUsersPopupTitle += projectName;
      this.viewUsersPopupTitle = 'View Users - ';
      this.viewUsersPopupTitle += projectName;
      if (manageUsers) {
        this.showUsersPopupCheck = true;
      } else {
        this.showViewUsersPopupCheck = true;
      }
    });
  }

  getAllUsers() {
    this.manageUsers.getAllUsers().subscribe((response) => {
      console.log(response.body);
      this.allUsers = response.body;
    });
  }

  checkUserAlreadyPresent() {
    const emailList = this.usersList.map((user: any) => user.emailId);
    this.userPresentError = emailList.includes(this.processedUser.emailId);
  }

  addUserToList() {
    const t1 = {
      collaborationRole: this.selectedRole,
      projectId: this.currentProjectId,
    };
    this.processedUser.projectRoles.push(t1);
    const tempUser = {
      ...this.processedUser,
      mainRole: [
        {
          collaborationRole: this.selectedRole,
        },
      ],
    };
    this.usersList.push(tempUser);
    this.checkUserAlreadyPresent();
    console.log(this.usersList);
  }

  modifyUser() {
    const emailList = this.usersList.map((user: any) => user.emailId);
    const pos = emailList.indexOf(this.processedUser.emailId);
    const t1 = {
      collaborationRole: this.selectedRole,
      projectId: this.currentProjectId,
    };
    this.processedUser.projectRoles.push(t1);
    const tempUser = {
      ...this.processedUser,
      mainRole: [
        {
          collaborationRole: this.selectedRole,
        },
      ],
    };
    this.usersList[pos] = tempUser;
    this.checkUserAlreadyPresent();
    console.log(this.usersList);
  }

  showCreateProjectModal() {
    this.showCreateProjectPopup = true;
  }

  createProject() {
    this.home.createProject(this.newProjectDetails).subscribe(
      (response) => {
        let creationResponse: any = response.body;
        this.currentProjectId = creationResponse.projectData.projectId;
        this.managerUserAfterCreateProject = true;
        this.loadData();
        this.loadDataFlag = true;
        if (this.loadDataFlag) {
          this.updateRoleList();
          this.loadDataFlag = false;
        }
      },
      (err) => {
        console.log('Error while creating project');
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Project creation failed',
        });
      }
    );
  }

  navigateToProjectView(projectId: string) {
    this.router.navigate(['/projectView', projectId]);
  }

  filterInvolvedProjects() {
    let filteredInvolvedProjectIds = this.involvedProjects.projectRoles
      .filter((project: any) => project.collaborationRole !== 'PROJECT_MANAGER')
      .map((project: any) => project.projectId);
    this.filteredInvolvedProjectIds = filteredInvolvedProjectIds.join(',');
    console.log(this.filteredInvolvedProjectIds);
    this.manageUsers
      .getProjectDetailsFromProjectIds(this.filteredInvolvedProjectIds)
      .subscribe((response) => {
        this.filteredInvolvedProjects = response.body;
        console.log(
          'Involved projects filtered',
          this.filteredInvolvedProjects
        );
      });
  }

  updateRoleList() {
    this.home.getInvolvedProjects(this.emailId).subscribe((response) => {
      console.log('Update roles after creating project', response.body);
      let res: any = response.body;
      localStorage.setItem(
        'loggedInProjectRoles',
        JSON.stringify(res.projectRoles)
      );
    });
  }
}
