export type Tperson = {
    cpf: string,
    name: string
}

export type Tnode = {
    person: Tperson,
    relationship: string[]
}