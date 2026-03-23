import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('cadastro')
    async cadastrar(@Body() data: CreateUsuarioDto) {
        return await this.usuarioService.cadastrar(data)
    }

    @Post('login')
    async login(@Body() body: { username: string; senha: string }) {
        return await this.usuarioService.login(body.username, body.senha)
    }

    @Get('all')
    async findAll() {
        return await this.usuarioService.findAll()
    }

    @Patch('aprovar/:id')
    async aprovar(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.aprovar(id)
    }

    @Patch('recusar/:id')
    async recusar(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.recusar(id)
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.delete(id)
    }
}