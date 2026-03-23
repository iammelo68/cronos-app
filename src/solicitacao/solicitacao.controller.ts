import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query } from '@nestjs/common'
import { SolicitacaoService } from './solicitacao.service'
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto'

@Controller('solicitacao')
export class SolicitacaoController {
    constructor(private readonly solicitacaoService: SolicitacaoService) {}

    @Post('create')
    async create(@Body() data: CreateSolicitacaoDto) {
        return await this.solicitacaoService.create(data)
    }

    @Get('all')
    async findAll() {
        return await this.solicitacaoService.findAll()
    }

    // Busca solicitações de um usuário pelo email (para o UserView)
    @Get('minhas')
    async findByEmail(@Query('email') email: string) {
        return await this.solicitacaoService.findByEmail(email)
    }

    @Patch('aprovar/:id')
    async aprovar(@Param('id', ParseIntPipe) id: number) {
        return await this.solicitacaoService.aprovar(id)
    }

    @Patch('recusar/:id')
    async recusar(
        @Param('id', ParseIntPipe) id: number,
        @Body('motivoRecusa') motivoRecusa?: string,
    ) {
        return await this.solicitacaoService.recusar(id, motivoRecusa)
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.solicitacaoService.delete(id)
    }
}