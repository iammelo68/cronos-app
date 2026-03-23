import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) {}

    async cadastrar(data: CreateUsuarioDto) {
        const existe = await this.prisma.usuario.findFirst({
            where: { OR: [{ username: data.username }, { email: data.email }] }
        })
        if (existe) {
            if (existe.username === data.username) throw new BadRequestException('Nome de usuário já está em uso')
            throw new BadRequestException('E-mail já cadastrado')
        }

        const senhaHash = await bcrypt.hash(data.senha, 10)

        const usuario = await this.prisma.usuario.create({
            data: {
                nome:         data.nome,
                email:        data.email,
                username:     data.username,
                senhaHash,
                papel:        data.papel,
                status:       'pendente',
                matricula:    data.matricula    || null,
                curso:        data.curso        || null,
                siape:        data.siape        || null,
                departamento: data.departamento || null,
            }
        })

        const { senhaHash: _, ...resultado } = usuario
        return resultado
    }

    async login(username: string, senha: string) {
        const usuario = await this.prisma.usuario.findUnique({ where: { username } })

        if (!usuario) throw new UnauthorizedException('Usuário ou senha incorretos')
        if (usuario.status === 'pendente')
            throw new UnauthorizedException('Sua conta ainda não foi aprovada pelo administrador')
        if (usuario.status === 'recusado')
            throw new UnauthorizedException('Sua conta foi recusada. Entre em contato com a administração')

        const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash)
        if (!senhaCorreta) throw new UnauthorizedException('Usuário ou senha incorretos')

        const { senhaHash: _, ...resultado } = usuario
        return resultado
    }

    async findAll() {
        const usuarios = await this.prisma.usuario.findMany({
            orderBy: { criadoEm: 'desc' }
        })
        return usuarios.map(({ senhaHash, ...u }) => u)
    }

    async aprovar(id: number) {
        const usuario = await this.prisma.usuario.findUnique({ where: { idUsuario: id } })
        if (!usuario) throw new NotFoundException('Usuário não encontrado')
        const atualizado = await this.prisma.usuario.update({
            where: { idUsuario: id },
            data: { status: 'aprovado' }
        })
        const { senhaHash: _, ...resultado } = atualizado
        return resultado
    }

    async recusar(id: number) {
        const usuario = await this.prisma.usuario.findUnique({ where: { idUsuario: id } })
        if (!usuario) throw new NotFoundException('Usuário não encontrado')
        const atualizado = await this.prisma.usuario.update({
            where: { idUsuario: id },
            data: { status: 'recusado' }
        })
        const { senhaHash: _, ...resultado } = atualizado
        return resultado
    }

    async delete(id: number) {
        const usuario = await this.prisma.usuario.findUnique({ where: { idUsuario: id } })
        if (!usuario) throw new NotFoundException('Usuário não encontrado')
        return await this.prisma.usuario.delete({ where: { idUsuario: id } })
    }
}