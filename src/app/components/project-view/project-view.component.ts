import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private route: ActivatedRoute) {
  }
  projectId!: string
  selectedItem="Sprint"
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    })

    this.items = [
      {
        label: 'Sprint', icon: 'pi pi-credit-card',command: (event) => {
          //event.originalEvent: Browser event
          console.log(event.item);
          this.selectedItem = event.item.label;
        }},
      {
        label: 'Backlog', icon: 'pi pi-calendar', command: (event) => {
          //event.originalEvent: Browser event
          console.log(event.item);
          this.selectedItem = event.item.label;
        }
      }
    ]
  }

}
