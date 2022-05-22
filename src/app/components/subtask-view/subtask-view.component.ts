import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CollabRoleService from 'src/service/collabrole.service';

@Component({
  selector: 'app-subtask-view',
  templateUrl: './subtask-view.component.html',
  styleUrls: ['./subtask-view.component.css'],
})
export class SubtaskViewComponent implements OnInit {
  projectId!: string;
  sprintId!: string;
  userStoryId!: string;
  userRole!: string;
  constructor(
    private route: ActivatedRoute,
    private collabRoleService: CollabRoleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'];
      this.sprintId = params['sprintId'];
      this.userStoryId = params['userStoryId'];
      console.log(this.projectId, this.sprintId, this.userStoryId);
    });
  }

  checkIfUserCanCreateSprint() {
    this.userRole = this.collabRoleService.getCollabRole(this.projectId);
  }
}
