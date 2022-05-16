import { SprintUserStoryChild } from "./SprintUserStoryChild";

export class SprintUserStory {
  acceptanceCriteria!:string;
  assignedUser!:string;
  backlog!:boolean;
  consumedEfforts!:number
  estimatedEfforts!:number;
  id!:number;
  name!:string;
  priority!:string;
  remainingEfforts!:number;
  sprintId!:number;
  status!:string;
  storyPoints!:number;
  data:SprintUserStoryChild[]= new Array();
}