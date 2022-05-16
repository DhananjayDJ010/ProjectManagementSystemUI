import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogComponent } from './components/backlog/backlog/backlog.component';
import { HomeComponent } from './components/home/home.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { SprintUserstoryComponent } from './components/sprint-userstory/sprint-userstory.component';
import { SprintComponent } from './components/sprint/sprint.component';

const routes: Routes = [
  {'path': 'hello', component: RegistrationLoginComponent},
  {'path': 'home', component: HomeComponent},
  {'path': 'sprintboard/:projectId/:sprintId', component: KanbanBoardComponent},
  { 'path': 'projectView/:id', component: ProjectViewComponent},
  { 'path': 'sprint/:projectId', component: SprintComponent, children:[
    {'path':'sprint-user-story/:sprintId', component:SprintUserstoryComponent}
  ] },
  {'path': 'backlog', component: BacklogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
