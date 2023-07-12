import { Tnode, Tperson } from "../Types"
import { BadRequestError } from "../Errors/BadRequestError"
import { NotFoundError } from "../Errors/NotFoundError"

export class GraphBusiness{
    private adjList: Tnode[] 

    constructor(){ 
        this.adjList = []
     }

     private findPerson(cpf: string): number{
        let isPerson: boolean = false
        let i: number = 0
        let node: number = -1
        
        while (i < this.adjList.length && !isPerson){
            if(this.adjList[i].person.cpf === cpf && !isPerson){
                isPerson = true
                node = i
            } else {
                i++
            }
        }
        return node
    }
    
    public addNode(node: Tnode): void {
        const regex = /^\d+$/
        const position: number = this.findPerson(node.person.cpf)
        
        if(regex.test(node.person.cpf) && node.person.cpf.length === 11){
            if(position === -1){
                this.adjList.push(node) 
            } else {
                throw new BadRequestError("Usuário já cadastrado")
            }
        } else {
            throw new BadRequestError("CPF inválido")
        }
    }

    public addEdge(cpf1: string, cpf2: string): void {
        const indexNode1: number = this.findPerson(cpf1)
        const indexNode2: number = this.findPerson(cpf2)
        
        if(indexNode1 >= 0 && indexNode2 >= 0){
            this.adjList[indexNode1].relationship.push(cpf2)
            this.adjList[indexNode2].relationship.push(cpf1)
        } else {
            throw new NotFoundError("Usuário não encontrado")
        }
    }

    public getPerson(cpf: string): Tperson {
        let person: Tperson = {cpf: "", name: ""}
        const node: number = this.findPerson(cpf)

        if(node >= 0){
            person.cpf = this.adjList[node].person.cpf
            person.name = this.adjList[node].person.name

        } else {
            throw new NotFoundError("Usuário não encontrado")
        }
        return person
    }

    public clean(): void {
        while (this.adjList.length > 0){
            this.adjList.pop()
        }
    }

    public findRelationship(cpf: string): string[]{
        const regex = /^\d+$/
        let friends: string[] = []
        let network: string[] = []
        const node: number = this.findPerson(cpf)

        if(regex.test(cpf) || cpf.length === 11){
            if(node >= 0){
                friends = [...this.adjList[node].relationship]
                for (let i=0; i < this.adjList.length; i++){
                    for(let j=0; j < friends.length; j++ ){
                        if(this.adjList[i].person.cpf === friends[j]) {
                            for(let k=0; k < this.adjList[i].relationship.length; k++){
                                if(this.adjList[i].relationship[k] !== friends[j]){
                                    network.push(this.adjList[i].relationship[k])
                                }
                            }
                        }
                    }
                }
            } else {
                throw new NotFoundError("Usuário não encontrado")
            }
        } else {
            throw new BadRequestError("CPF inválido")
        } 
        return (network.filter((element) => element !== cpf).filter((element, index, sugestion) => sugestion.indexOf(element) === index))
    }

    public getNetwork() {
        return this.adjList
    }
}