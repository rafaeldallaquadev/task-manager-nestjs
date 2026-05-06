import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserLoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signin')
    login(@Body() data: UserLoginDTO){
        return this.authService.login(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req) {
    return req.user;
}
}
