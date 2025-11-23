import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlocacaoDto {
    idAlocacao?: number;

    @IsString()
    @IsNotEmpty()
    diaSemana: string;  

    @IsString()
    @IsNotEmpty()
    horarioInicio: string; 

    @IsString()
    @IsNotEmpty()
    horarioFim: string; 

    @IsNumber()
    professorId: number;

    @IsNumber()
    disciplinaId: number;

    @IsNumber()
    salaId: number;

    @IsNumber()
    cursoId: number;

    @IsNumber()
    periodoId: number;

    @Type(() => Date)
    @IsDate()
    dataInicio: Date;

    @Type(() => Date)
    @IsDate()
    dataFim: Date;
}