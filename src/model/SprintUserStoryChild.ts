import { SprintUserStory } from "./sprintUserstory";

export class SprintUserStoryChild {
  acceptanceCriteria!: string;
  consumedEfforts!: number;
  estimatedEfforts!: number;
  remainingEfforts!: number;

  constructor(sprint:SprintUserStory){
      this.acceptanceCriteria = sprint.acceptanceCriteria;
      this.consumedEfforts = sprint.consumedEfforts;
      this.estimatedEfforts = sprint.estimatedEfforts;
      this.remainingEfforts = sprint.remainingEfforts;
  }
}