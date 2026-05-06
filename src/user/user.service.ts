import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDTO, UserUpdateDTO } from './user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: UserRegisterDTO){
        const hash = await bcrypt.hash(data.password, 10)
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hash,
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        })

        return user
    }

    async findAll(){
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email:true,
                createdAt:true,
            }
        })
        return users
    }

    async findById(id:number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id:true,
                email:true,
                createdAt:true
            }
        })

        if (!user){
            throw new NotFoundException("User not found")
        }

        return user
    }

    async update(id: number, data:UserUpdateDTO){
        const updatedData: any = {...data}

        if (data.password){
            updatedData.password = await bcrypt.hash(data.password, 10);
        }

        try {
            const user = await this.prisma.user.update({
            data: updatedData,
            where: {id},
            select: {
                id:true,
                email:true,
            }
            })

            return user
        } catch (error:any) {
            if (error.code === 'P2025') {
                throw new NotFoundException('User not found');
            }
            throw error
        }        
    }

    async delete(id:number){
        try {
            const user = await this.prisma.user.delete({
                where: {id},
                select: {
                    id:true,
                    email:true,
                }
            })
    
            return user
            
        } catch (error:any) {
            if (error.code === 'P2025') {
                throw new NotFoundException('User not found');
            }
            throw error
        }
    }

}
