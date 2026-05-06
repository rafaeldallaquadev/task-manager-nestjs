import { Controller, Post, Body, UseGuards, Get, Patch, Param, Delete} from '@nestjs/common';
import { TaskService } from './task.service';
import { NewTaskDTO, UpdateTaskDTO } from './task.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthUser } from 'src/auth/types/auth-user.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}


    @UseGuards(JwtAuthGuard)
    @Post('add')
    createTask(@CurrentUser() user: AuthUser, @Body() data: NewTaskDTO){
        return this.taskService.createTask(user, data);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(@CurrentUser() user: AuthUser){
        return this.taskService.getTasks(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/complete')
    completeTask(@CurrentUser() user:AuthUser,@Param('id')  taskId: string){
        return this.taskService.completeTask(user.userId, +taskId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTaskTitle(
        @CurrentUser() user:AuthUser,
        @Param('id')  taskId: string, 
        @Body() data: UpdateTaskDTO){
        return this.taskService.updateTaskTitle(user.userId, +taskId, data)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTask(@CurrentUser() user:AuthUser ,@Param('id') taskId:string){
        return this.taskService.deleteTask(user.userId, +taskId)
    }

}
