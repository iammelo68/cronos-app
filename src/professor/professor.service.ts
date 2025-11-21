import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProfessorCreateDto } from './dto/professor-create-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessorService {
    constructor(private readonly prisma: PrismaService) {}
     async create(data: ProfessorCreateDto) {
        const professor = await this.prisma.professor.create({data});
        return professor;
    }

    async findAll() {
        const allProfessors = await this.prisma.professor.findMany();
        return allProfessors;
    }
    async update(id: number, data: Partial<ProfessorCreateDto>) {
        const professorExists = await this.prisma.professor.findUnique({where: {id}});
        if (!professorExists) {
            throw new Error("Professor not found");
        }   

        const updatedProfessor = await this.prisma.professor.update({
            data,
            where: {id},
        });
        return updatedProfessor;
    }
    async delete(id: number) {
        const professorExists = await this.prisma.professor.findUnique({where: {id}});

        if (!professorExists) {
            throw new Error("Professor not found");
        }

        return await this.prisma.professor.delete({
            where: { id }
        });
    }
}
