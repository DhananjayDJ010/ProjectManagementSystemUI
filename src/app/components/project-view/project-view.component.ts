import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }
  projectId!: string
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    })
  }

}
