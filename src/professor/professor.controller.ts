import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorCreateDto } from './dto/professor-create-dto';

@Controller('professor')
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}
    @Post("create")
    async createProfessor(@Body() data: ProfessorCreateDto) {
      const createdProfessor = await this.professorService.create(data);  
      return createdProfessor;
    }

    @Get("all")
    async getAllProfessors() {
        const professors = await this.professorService.findAll();
        return professors;
    }

    @Put("update")
    async updateProfessor(@Body('id') id: number, @Body() data: Partial<ProfessorCreateDto>) {
        const updatedProfessor = await this.professorService.update(id, data);
        return updatedProfessor;
    }

    @Delete("delete")
    async deleteProfessor(@Body('id') id: number) {
        const result = await this.professorService.delete(id);
        return result;
    }
}
