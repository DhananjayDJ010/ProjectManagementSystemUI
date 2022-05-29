export class UserStory{
    id!:number;
    name!: string;
    sprintId!: number;
    assignedUser!: string;
    acceptanceCriteria!: string;
    storyPoints!: number;
    estimatedEfforts!: number;
    consumedEfforts!: number;
    remainingEfforts!: number;
    status!:string;
    priority!:string;
    isBacklog!:boolean;
    projectId!:string;
}