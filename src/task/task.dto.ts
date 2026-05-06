import { IsOptional, IsString } from "class-validator";

export class NewTaskDTO{
    @IsString()
    title!: string;
}

export class UpdateTaskDTO{
    @IsString()
    @IsOptional()
    title?:string
}