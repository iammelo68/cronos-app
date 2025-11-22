import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';

@Injectable()
export class PeriodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePeriodoDto) {
    return await this.prisma.periodo.create({ data });
  }

  async findAll() {
    return await this.prisma.periodo.findMany();
  }

  async update(id: number, data: any) {
    const { id: idDescartavel, ...dadosLimpos } = data;

    const periodoExists = await this.prisma.periodo.findUnique({
        where: { idPeriodo: id }
    });

    if (!periodoExists) throw new Error("Periodo not found");

    return await this.prisma.periodo.update({
        where: { idPeriodo: id },
        data: dadosLimpos,
    });
  }

  async delete(id: number) {
    const periodoExists = await this.prisma.periodo.findUnique({
        where: { idPeriodo: id }
    });

    if (!periodoExists) throw new Error("Periodo not found");

    return await this.prisma.periodo.delete({
        where: { idPeriodo: id }
    });
  }
}