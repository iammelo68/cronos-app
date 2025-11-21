import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';

@Injectable()
export class SalaService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateSalaDto) {
        const sala = await this.prisma.sala.create({ data });
        return sala;
    }

    async findAll() {
        const allSalas = await this.prisma.sala.findMany();
        return allSalas;
    }

async update(id: number, data: any) {
    const { id: idDescartavel, ...dadosLimpos } = data;

    const salaExists = await this.prisma.sala.findUnique({
        where: { idSala: id }
    });

    if (!salaExists) {
        throw new Error("Sala not found");
    }

    const updatedSala = await this.prisma.sala.update({
        where: { idSala: id },
        data: dadosLimpos, 
    });
    return updatedSala;
  }

    async delete(id: number) {
        const salaExists = await this.prisma.sala.findUnique({
            where: { idSala: id }
        });

        if (!salaExists) {
            throw new Error("Sala not found");
        }

        return await this.prisma.sala.delete({
            where: { idSala: id }
        });
    }
}