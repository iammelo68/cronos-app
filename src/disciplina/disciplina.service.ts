import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
// import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinaService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateDisciplinaDto) {
        const disciplina = await this.prisma.disciplina.create({ data });
        return disciplina;
    }

    async findAll() {
        const allDisciplinas = await this.prisma.disciplina.findMany();
        return allDisciplinas;
    }

async update(id: number, data: any) {
        const { id: idDescartavel, ...dadosLimpos } = data;

        const disciplinaExists = await this.prisma.disciplina.findUnique({
            where: { idDisciplina: id } 
        });

        if (!disciplinaExists) {
            throw new Error("Disciplina not found");
        }

        const updatedDisciplina = await this.prisma.disciplina.update({
            where: { idDisciplina: id },
            data: dadosLimpos,
        });
        return updatedDisciplina;
    }

    async delete(id: number) {
        const disciplinaExists = await this.prisma.disciplina.findUnique({
            where: { idDisciplina: id }
        });

        if (!disciplinaExists) {
            throw new Error("Disciplina not found");
        }

        return await this.prisma.disciplina.delete({
            where: { idDisciplina: id }
        });
    }
}