import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import ManageUserService from 'src/service/manage.users.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent implements OnInit {
  items: MenuItem[] = [];
  pageString = 'Sprint details for project: ';

  constructor(
    private route: ActivatedRoute,
    private manageUserService: ManageUserService
  ) {}
  projectId!: string;
  selectedItem = 'Sprint';
  currentProjectpageDetails: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      this.manageUserService
        .getProjectDetailsFromProjectIds(this.projectId)
        .subscribe((response) => {
          this.currentProjectpageDetails = response.body;
          this.currentProjectpageDetails = this.currentProjectpageDetails[0];
        });
    });

    this.items = [
      {
        label: 'Sprint',
        icon: 'pi pi-credit-card',
        command: (event) => {
          //event.originalEvent: Browser event
          console.log(event.item);
          this.selectedItem = event.item.label;
          this.pageString = 'Sprint details for project: ';
        },
      },
      {
        label: 'Backlog',
        icon: 'pi pi-calendar',
        command: (event) => {
          //event.originalEvent: Browser event
          console.log(event.item);
          this.selectedItem = event.item.label;
          this.pageString = 'Backlog details for project: ';
        },
      },
    ];
  }
}
