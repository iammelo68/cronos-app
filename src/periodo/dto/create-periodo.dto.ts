import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePeriodoDto {
    idPeriodo?: number;

    @IsString()
    @IsNotEmpty()
    semestre: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @Type(() => Date)
    @IsDate()
    dataInicio: Date;

    @Type(() => Date)
    @IsDate()
    dataFim: Date;
}