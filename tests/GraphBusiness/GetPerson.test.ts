import { GraphBusiness }  from "../../src/Business/GraphBusiness"
import { Tnode, Tperson } from "../../src/Types"

describe("GetPerson", () => {
    const graphBusiness = new GraphBusiness()
    const node: Tnode = {
        "person": {
            "cpf": "02593568917",
            "name": "A"
        },
        "relationship": []
    }
    graphBusiness.addNode(node)

    test("Retorna os dados do usuário", async () => {
        const cpf: string = "02593568917"
        const person: Tperson = await graphBusiness.getPerson(cpf)
        expect(person).toEqual( {"cpf": "02593568917", "name": "A" }) 

    })
})