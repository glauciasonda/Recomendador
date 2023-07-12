import { Request, Response } from "express";
import { BaseError } from "../Errors/BaseError";
import { GraphBusiness } from "../Business/GraphBusiness";
import { Tnode, Tperson } from "../Types";
import { send } from "process";

export class GraphController {
    constructor(
        private graphBusiness: GraphBusiness
    ){}

    public createPerson = async (req: Request, res: Response) => {
        try{
            const person: Tperson  = {
                cpf: req.body.cpf, 
                name: req.body.name
            } 
            const node: Tnode = {person, relationship: []}
            await this.graphBusiness.addNode(node)
            res.status(200).send("Usuário Criado", )
 
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    } 

    public getPerson = async (req: Request, res: Response)  => {
        try{
            const cpf: string = req.params.CPF
            const person: Tperson = await this.graphBusiness.getPerson(cpf)
            res.status(200).send(person)

        } catch (error) {
            console.log("erro no getperson... ", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public clean =async (req: Request, res: Response) => {
        try{
            this.graphBusiness.clean()
            res.status(200).send()

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    } 

    public createRelationship = async (req: Request, res: Response) => {
        try{
            const cpf1: string = req.body.cpf1
            const cpf2: string = req.body.cpf2
            await this.graphBusiness.addEdge(cpf1, cpf2)
            res.status(200).send()

        } catch (error) {
                if (error instanceof BaseError) {
                    res.status(error.statusCode).send(error.message)
                } else {
                    res.status(500).send("Erro inesperado")
                }
        }
    }

    public getRecommendations =async (req: Request, res: Response) => {
        try{
            const cpf: string = req.params.CPF
            const recommendations: string[] = await this.graphBusiness.findRelationship(cpf)
            res.status(200).send(recommendations)
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    
    public getNetwork = async (req: Request, res: Response) => {
        try{

            const rede = await this.graphBusiness.getNetwork()
            res.status(201).send(rede)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}
