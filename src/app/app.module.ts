import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { FormsModule } from '@angular/forms';
import RegistrationService from 'src/service/registration.service';
import { AppHttpInterceptor } from 'src/service/interceptor.service';
import { HomeComponent } from './components/home/home.component';
import HomePageService from 'src/service/homepage.service';
import ManageUserService from 'src/service/manage.users.service';
import ProjectService from 'src/service/project.service';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { TaskCardComponent } from './components/kanban-board/task-card/task-card.component';
import { BacklogComponent } from './components/backlog/backlog/backlog.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationLoginComponent,
    HomeComponent,
    KanbanBoardComponent,
    TaskCardComponent,
    BacklogComponent,
    ProjectViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectButtonModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    HttpClientModule,
    AccordionModule,
    TableModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    CardModule,
    DragDropModule
  ],
  providers: [
    RegistrationService,
    HomePageService,
    ManageUserService,
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
