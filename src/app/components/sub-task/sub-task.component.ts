import { Component, OnInit } from '@angular/core';
import { SubTask } from 'src/model/SubTask';
import SubTaskService from 'src/service/sub-task.service';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {

  constructor(private service: SubTaskService, public newSubTaskDetails : SubTask) { }

  ngOnInit(): void {
  }

  subTaskDetails : SubTask[]=[];
  status=["NEW","DEFINED","TO_DO","IN_PROGRESS","DONE","ACCEPTED","DEPLOYED"];
  showCreateSubTaskPoup=false;
  

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
    })
  }

  createSubTaskPopupModal(){
   this.showCreateSubTaskPoup= true;
  }

}
