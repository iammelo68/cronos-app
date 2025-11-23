import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';

@Injectable()
export class AlocacaoService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkConflict(data: Partial<CreateAlocacaoDto>, ignoreId?: number) {
    const { professorId, salaId, diaSemana, horarioInicio, horarioFim, periodoId } = data;

    const conflito = await this.prisma.alocacao.findFirst({
      where: {
        periodoId: periodoId, 
        diaSemana: diaSemana, 
        idAlocacao: ignoreId ? { not: ignoreId } : undefined, 
        
        AND: [
          { horarioInicio: { lt: horarioFim } }, 
          { horarioFim: { gt: horarioInicio } }  
        ],
        
        OR: [
          { professorId: professorId }, 
          { salaId: salaId }            
        ]
      },
      include: { professor: true, sala: true } 
    });

    if (conflito) {
      if (conflito.professorId === professorId) {
        throw new BadRequestException(
          `Conflito: O Professor(a) ${conflito.professor.nomeProf} já está dando aula das ${conflito.horarioInicio} às ${conflito.horarioFim}!`
        );
      }
      if (conflito.salaId === salaId) {
        throw new BadRequestException(
          `Conflito: A sala ${conflito.sala.nomeSala} já está ocupada das ${conflito.horarioInicio} às ${conflito.horarioFim}!`
        );
      }
    }
  }

  async create(data: CreateAlocacaoDto) {
    await this.checkConflict(data);
    return await this.prisma.alocacao.create({ data });
  }

  async findAll() {
    return await this.prisma.alocacao.findMany({
      include: {
        professor: true, disciplina: true, sala: true, curso: true, periodo: true,
      },
    });
  }

  async update(id: number, data: any) {
    const { id: idDescartavel, ...dadosLimpos } = data;

    const atual = await this.prisma.alocacao.findUnique({ where: { idAlocacao: id } });
    if (!atual) throw new Error("Alocacao not found");

    const dadosParaValidar = { ...atual, ...dadosLimpos };

    await this.checkConflict(dadosParaValidar, id);

    return await this.prisma.alocacao.update({
        where: { idAlocacao: id },
        data: dadosLimpos,
    });
  }

  async delete(id: number) {
    return await this.prisma.alocacao.delete({ where: { idAlocacao: id } });
  }
}