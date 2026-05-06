import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLoginDTO } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ){}

    async login(data: UserLoginDTO){
        const {email, password} = data
        const user = await this.prisma.user.findUnique({
            where:{email},
            select: {
                id:true, 
                email:true, 
                password:true
            }
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Invalid credentials")
        }

        return {
            access_token: this.jwt.sign({sub: String(user.id), email: String(user.email)}) 
        }

    }
}
