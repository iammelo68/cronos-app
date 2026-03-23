import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto'

@Injectable()
export class SolicitacaoService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateSolicitacaoDto) {
        return await this.prisma.solicitacao.create({
            data,
            include: { sala: true },
        })
    }

    async findAll() {
        return await this.prisma.solicitacao.findMany({
            include: { sala: true },
            orderBy: { criadoEm: 'desc' },
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.solicitacao.findMany({
            where: { email },
            include: { sala: true },
            orderBy: { criadoEm: 'desc' },
        })
    }

    async aprovar(id: number) {
        const sol = await this.prisma.solicitacao.findUnique({ where: { idSolicitacao: id } })
        if (!sol) throw new NotFoundException('Solicitação não encontrada')
        if (sol.status !== 'pendente') throw new BadRequestException('Solicitação já foi processada')

        return await this.prisma.solicitacao.update({
            where: { idSolicitacao: id },
            data: { status: 'aprovado' },
            include: { sala: true },
        })
    }

    async recusar(id: number, motivoRecusa?: string) {
        const sol = await this.prisma.solicitacao.findUnique({ where: { idSolicitacao: id } })
        if (!sol) throw new NotFoundException('Solicitação não encontrada')
        if (sol.status !== 'pendente') throw new BadRequestException('Solicitação já foi processada')

        return await this.prisma.solicitacao.update({
            where: { idSolicitacao: id },
            data: { status: 'recusado', motivoRecusa: motivoRecusa || null },
            include: { sala: true },
        })
    }

    async delete(id: number) {
        const sol = await this.prisma.solicitacao.findUnique({ where: { idSolicitacao: id } })
        if (!sol) throw new NotFoundException('Solicitação não encontrada')
        return await this.prisma.solicitacao.delete({ where: { idSolicitacao: id } })
    }
}