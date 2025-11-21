import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';

@Controller('disciplina')
export class DisciplinaController {
    constructor(private readonly disciplinaService: DisciplinaService) {}

    @Post("create")
    async createDisciplina(@Body() data: CreateDisciplinaDto) {
        const createdDisciplina = await this.disciplinaService.create(data);
        return createdDisciplina;
    }

    @Get("all")
    async getAllDisciplinas() {
        const disciplinas = await this.disciplinaService.findAll();
        return disciplinas;
    }

    @Put("update")
    async updateDisciplina(@Body('id') id: number, @Body() data: Partial<CreateDisciplinaDto>) {
        const updatedDisciplina = await this.disciplinaService.update(id, data);
        return updatedDisciplina;
    }

    @Delete("delete")
    async deleteDisciplina(@Body('id') id: number) {
        const result = await this.disciplinaService.delete(id);
        return result;
    }
}