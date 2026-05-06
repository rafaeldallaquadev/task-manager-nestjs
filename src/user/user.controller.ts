import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req} from '@nestjs/common';
import { UserRegisterDTO, UserUpdateDTO } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthUser } from 'src/auth/types/auth-user.type';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('signup')
    create(@Body() data: UserRegisterDTO){
        return this.userService.create(data)
    }

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string){
        return this.userService.findById(+id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    update(@CurrentUser() user: AuthUser, @Body() data: UserUpdateDTO){
        return this.userService.update(user.userId, data)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    delete(@CurrentUser() user: AuthUser){
        return this.userService.delete(user.userId)
    }

}
