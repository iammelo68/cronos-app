import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdministradorDto {
    idAdm?: number;

    @IsString()
    @IsNotEmpty()
    nomeAdm: string;

    @IsEmail()
    emailAdm: string;

    @IsString()
    @MinLength(6) // Senha com no mínimo 6 caracteres
    senhaAdm: string;
}