export class CreateSolicitacaoDto {
    solicitante:   string
    email:         string
    matricula:     string
    papel:         string
    motivo:        string
    descricao:     string
    observacoes?:  string
    participantes?: number
    diaSemana:     string
    dataEvento?:   string
    horarioInicio: string
    horarioFim:    string
    salaId:        number
}