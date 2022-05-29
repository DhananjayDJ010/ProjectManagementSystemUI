import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubTask } from 'src/model/SubTask';
import CollabRoleService from 'src/service/collabrole.service';
import ManageUserService from 'src/service/manage.users.service';
import SubTaskViewService from 'src/service/sub-task.service';

@Component({
  selector: 'app-subtask-view',
  templateUrl: './subtask-view.component.html',
  styleUrls: ['./subtask-view.component.css'],
})
export class SubtaskViewComponent implements OnInit {
  
  userRole!: string;
  constructor(public service: SubTaskViewService,
    private route: ActivatedRoute,private getUsers : ManageUserService,
    private collabRoleService: CollabRoleService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'];
      this.sprintId = params['sprintId'];
      this.userStoryId = params['userStoryId'];
      this.getSubTasks(this.userStoryId);
      console.log(this.projectId, this.sprintId, this.userStoryId);
      this.getUsersForProject(this.projectId);
    });
  }

  checkIfUserCanCreateSprint() {
    this.userRole = this.collabRoleService.getCollabRole(this.projectId);
  }

  subTaskDetails : SubTask[]=[];
  status=["DEFINED","IN_PROGRESS","COMPLETED","ACCEPTED"];
  showCreateSubTaskPoup=false;
  showUpdateSubTaskPoup=false;
  projectId!: string;
  sprintId!: string;
  userStoryId!: number;
  usersList:any=[];
   newSubTaskDetails :SubTask = new SubTask();
   users:string[]=[];

  createSubTask(subTask : SubTask,userStoryId:number,projectId:string){
    
    this.service.createSubTask(subTask,userStoryId, projectId).subscribe((response)=>{
      console.log(response.body);
    });
  }

  updateSubTask(subTask : SubTask,userStoryId:number,subTaskId:number,projectId:string){
   
    this.service.updateSubTask(subTask,userStoryId, subTaskId,projectId).subscribe((response)=>{
      console.log(response.body);
    });

  }

  getSubTasks(userStoryId:number){

    this.service.getSubTasks(userStoryId).subscribe((response)=>{
      console.log(response.body);
      this.subTaskDetails= <SubTask[]>response.body;
      console.log(this.subTaskDetails);
    })
  }

  createSubTaskPopupModal(){
   this.showCreateSubTaskPoup= true;
  }

  updateSubTaskPopupModal(){
    this.showUpdateSubTaskPoup = true;
  }

 getUsersForProject(projectId : string){
  this.getUsers
  .getUsersForProject(this.projectId)
  .subscribe((response) => {
    this.usersList = response.body;
    //users=this.usersList[1]+" "+this.usersList[2];
    this.users = this.usersList.map((user: any) => {
      return user.firstName +" "+user.lastName;
      
    });
    console.log('List for sending request');
    
    console.log(this.users);
  });

 }
 onRowEditInit(s1:SubTask){
   console.log(s1);
   console.log('Edit Init Event Called')
 }

 onRowEditSave(s1:SubTask){
  console.log(s1);
  this.updateSubTask(s1,this.userStoryId,s1.id,this.projectId);
  console.log('Edit Save Event Called');
}

onRowEditCancel(s1:SubTask,index:number){
  console.log(s1);
  console.log(this.subTaskDetails[index]);
  console.log('Edit Init Event Called');
}

}
