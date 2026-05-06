import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewTaskDTO, UpdateTaskDTO } from './task.dto';
import { AuthUser } from 'src/auth/types/auth-user.type';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService){}

    async createTask(user: AuthUser, data: NewTaskDTO){
        const task = await this.prisma.task.create({
            data: {
                userId: user.userId,
                title: data.title
            }
        })

        return task
    }

    async getTasks(userId:number){
        const tasks = await this.prisma.task.findMany({
            where:{
                userId
            }
        })

        return tasks
    }

    async completeTask(userId:number, taskId:number){
        const task_user = await this.prisma.task.findFirst({
            where:{
                userId,
                id:taskId
            }
        })

        if (!task_user) {
            throw new NotFoundException("Task not found")
        }

        const task = await this.prisma.task.update({
            data: {
                status: 'COMPLETED' 
            },
            where: {
                id:taskId
            }
        })

        return task
    }

    async updateTaskTitle(userId:number, taskId:number, data: UpdateTaskDTO){
        const task_user = await this.prisma.task.findFirst({
            where:{
                userId,
                id:taskId
            }
        })

        if (!task_user) {
            throw new NotFoundException("Task not found")
        }

        const task = await this.prisma.task.update({
            data,
            where:{
                id: taskId
            }
        })

        return task
    }

    async deleteTask(userId:number, taskId:number){
        const task_user = await this.prisma.task.findFirst({
            where:{
                userId,
                id:taskId
            }
        })

        if (!task_user) {
            throw new NotFoundException("Task not found")
        }

        const task = await this.prisma.task.delete({
            where: {
                id: taskId
            }
        })

        return task
    }
}
