import { Component, OnInit } from '@angular/core';
import { UserStory } from 'src/model/UserStory';
import ProjectService from 'src/service/project.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  newUserStory = new UserStory();
  backlogStories : any;
  projectId : any;
  currentUserstoryId : any;
  showCreateUserStoryPopup = false;
  showManageUserStoryPopup = false;
  userRole: any;
 

  constructor(private projectService : ProjectService) { }

  ngOnInit(): void {
    let userId: any = localStorage.getItem("loggedInUserId");
    let emailId: any = localStorage.getItem("loggedInEmailId");
    let userRole: any = localStorage.getItem("loggedInUserRole");
     this.projectId   = localStorage.getItem("selectedProject");
    this.projectService.getStoriesInBacklog(this.projectId).subscribe(response => {
      console.log("getStoriesInBacklog call success");
      console.log(response.body);
      this.backlogStories = response.body;
    });
  }

  createUserStory(){
    this.projectService.createUserStory(this.newUserStory,this.projectId).subscribe(response => {
      let creationResponse:any = response.body;
      
      
    }, err => {
      console.log("Error while creating userstory");
    })

  }

  showCreateUserStoryModal(){
    this.showCreateUserStoryPopup=true;

  }
  showManageUserStoryPopUp(userstory:UserStory){
    this.showManageUserStoryPopup =true;

  }

}
