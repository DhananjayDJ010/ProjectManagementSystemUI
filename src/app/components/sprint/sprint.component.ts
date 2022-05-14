import { Component, Input, OnInit } from '@angular/core';
import { Sprint } from 'src/model/sprint';
import CollabRoleService from 'src/service/collabrole.service';
import SprintService from 'src/service/sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent implements OnInit {
  constructor(
    private sprintService: SprintService,
    private collabRoleService: CollabRoleService
  ) {}
  @Input() projectId!: string;
  sprintDetails: Sprint[] = [];
  userRole!: string;
  newSprint: Sprint = new Sprint();
  selectedSprint = -1;
  sprintStatus: any = [
    { label: 'ACTIVE', value: true },
    { label: 'INACTIVE', value: false },
  ];
  selectedStatusObj: any = this.sprintStatus[1];
  ngOnInit() {
    this.getAllSprintDetails();
    this.checkIfUserCanCreateSprint();
    this.getSprintStatus();
  }

  getAllSprintDetails() {
    this.sprintService
      .getAllSprintDetails(this.projectId)
      .subscribe((response) => {
        console.log(response.body);
        this.sprintDetails = <Sprint[]>response.body;
      });
  }

  checkIfUserCanCreateSprint() {
    this.userRole = this.collabRoleService.getCollabRole(this.projectId);
  }

  getSprintStatus() {
    this.newSprint.sprintActive = this.selectedStatusObj.value;
  }

  createNewSprint() {
    if (this.validateSprintDetails()) {
      this.newSprint.projectId = this.projectId;
      this.sprintService
        .createSprint(this.newSprint, this.projectId)
        .subscribe((response) => {
          console.log(response.body);
        });
    }
  }

  validateSprintDetails() {
    return (
      this.newSprint.name !== '' &&
      this.newSprint.name !== undefined &&
      this.newSprint.name !== null &&
      this.newSprint.startDate < this.newSprint.endDate
    );
  }

  checkActiveStatus(sprintData: Sprint) {
    const currentDate = new Date();
    const startDate = new Date(sprintData.startDate);
    const endDate = new Date(sprintData.endDate);
    if (currentDate >= startDate && currentDate <= endDate) {
      // return !sprintData.sprintActive;
      if (sprintData.sprintActive) {
        return 0;
        //0 returned when date is in range and sprint is currently running
      }
      return 1;
      //0 returned when date is in range and sprint is currently inactive
    }
    //-1 returned if date is out of range
    return -1;
  }

  toggleSprintStatus(sprintId:number, sprintData:Sprint){
    let newSprintData = {...sprintData}
    newSprintData.sprintActive = !newSprintData.sprintActive;
    this.sprintService
      .updateSprint(this.projectId, sprintId, newSprintData)
      .subscribe((response) => {
        console.log(response.body);
      });
  }

  updateSprintDetails(sprintData:Sprint){
    console.log(sprintData);
  }
}
