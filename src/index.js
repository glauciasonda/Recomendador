import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Graph } from "./model/Graph.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})  

const pessoa1 =  {cpf: "02593568917", name: "Glaucia"}
const pessoa2 = { cpf: "01708018964", name: "Anderson"}    
const pessoa3 = { cpf: "14911552535", name: "Tomas"} 
const pessoa4 = { cpf: "01234567890", name: "fulano"} 
const pessoa5 = { cpf: "98745632105", name: "ciclano"} 

const node1 = { person: pessoa1, relationship: []}
const node2 = { person: pessoa2, relationship: []}
const node3 = { person: pessoa3, relationship: []}
const node4 = { person: pessoa4, relationship: [] } 
const node5 = { person: pessoa5, relationship: [] } 

const rede = new Graph()

console.log(rede)

rede.addNode(node1)
rede.addNode(node2)
rede.addEdge(node1, node2)
rede.addNode(node3)
rede.addEdge(node2, node3)
rede.addNode(node4)
rede.addEdge(node2, node4)
rede.addNode(node5)
rede.addEdge(node3, node5)
rede.addEdge(node2, node5)

console.log(rede.adjList) 
console.log(rede.findRelationship("02593568917")) 

