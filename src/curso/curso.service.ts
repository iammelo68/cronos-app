import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCursoDto) {
    const curso = await this.prisma.curso.create({ data });
    return curso;
  }

  async findAll() {
    const allCursos = await this.prisma.curso.findMany();
    return allCursos;
  }

  async update(id: number, data: any) {
    const { id: idDescartavel, ...dadosLimpos } = data;

    const cursoExists = await this.prisma.curso.findUnique({
        where: { idCurso: id }
    });

    if (!cursoExists) {
        throw new Error("Curso not found");
    }

    const updatedCurso = await this.prisma.curso.update({
        where: { idCurso: id },
        data: dadosLimpos,
    });
    return updatedCurso;
  }

  async delete(id: number) {
    const cursoExists = await this.prisma.curso.findUnique({
        where: { idCurso: id }
    });

    if (!cursoExists) {
        throw new Error("Curso not found");
    }

    return await this.prisma.curso.delete({
        where: { idCurso: id }
    });
  }
}