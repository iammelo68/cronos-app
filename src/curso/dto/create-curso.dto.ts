import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
    idCurso?: number;

    @IsString()
    @IsNotEmpty()
    nomeCurso: string;

    @IsString()
    @IsOptional()
    siglaCurso?: string;
}