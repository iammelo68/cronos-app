import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';

@Injectable()
export class AdministradorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAdministradorDto) {
    const admin = await this.prisma.administrador.create({ data });
    return admin;
  }

  async findAll() {
    const admins = await this.prisma.administrador.findMany();
    return admins;
  }

  async update(id: number, data: any) {
    const { id: idDescartavel, ...dadosLimpos } = data;

    const adminExists = await this.prisma.administrador.findUnique({
        where: { idAdm: id }
    });

    if (!adminExists) {
        throw new Error("Administrador not found");
    }

    const updatedAdmin = await this.prisma.administrador.update({
        where: { idAdm: id },
        data: dadosLimpos,
    });
    return updatedAdmin;
  }

  async delete(id: number) {
    const adminExists = await this.prisma.administrador.findUnique({
        where: { idAdm: id }
    });

    if (!adminExists) {
        throw new Error("Administrador not found");
    }

    return await this.prisma.administrador.delete({
        where: { idAdm: id }
    });
  }
}