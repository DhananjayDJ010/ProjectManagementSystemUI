import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SprintUserStory } from 'src/model/sprintUserstory';
import { SprintUserStoryChild } from 'src/model/SprintUserStoryChild';
import SprintService from 'src/service/sprint.service';

@Component({
  selector: 'app-sprint-userstory',
  templateUrl: './sprint-userstory.component.html',
  styleUrls: ['./sprint-userstory.component.css'],
})
export class SprintUserstoryComponent implements OnInit {
  @Input() sprintId: any;
  @Output() backtoSprint: EventEmitter<any> = new EventEmitter();
  sprintUserStories: SprintUserStory[] = [];
  selectedUserStory: SprintUserStory = new SprintUserStory();
  selectedRowNumber = -1;
  constructor(private sprintService: SprintService) {}

  ngOnInit(): void {
    this.getUserStoriesForSprint(this.sprintId);
  }

  goToSprint(){
    this.backtoSprint.emit(null);
  }

  getUserStoriesForSprint(sprintId: number) {
    this.sprintService
      .getUserStoriesForSprint(sprintId)
      .subscribe((response) => {
        console.log(response.body);
        const sprintUserStories = <SprintUserStory[]>response.body;
        this.sprintUserStories = sprintUserStories.map((story) => {
          let child = new SprintUserStoryChild(story);
          return {
            ...story,
            data: [child],
          };
        });
      });
  }

  rowSelected(rowIndex: number, selectedUserStory: SprintUserStory) {
    this.selectedUserStory = selectedUserStory;
    if (this.selectedRowNumber === rowIndex) {
      this.selectedRowNumber = -1;
    } else {
      this.selectedRowNumber = rowIndex;
    }
  }
}
