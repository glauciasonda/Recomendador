import { GraphBusiness } from "../../src/Business/GraphBusiness";
import { Tperson, Tnode } from "../../src/Types";

describe("GetRecommendations", () => {
const graphBusiness = new GraphBusiness()    

const node1: Tnode = {"person": {"cpf": "02593568917", "name": "A" }, "relationship": [] }
const node2: Tnode = {"person": {"cpf": "01708018964", "name": "B" }, "relationship": [] }
const node3: Tnode = {"person": {"cpf": "14952511935", "name": "C" }, "relationship": [] }
const node4: Tnode = {"person": {"cpf": "12345678912", "name": "D" }, "relationship": [] }
const node5: Tnode = {"person": {"cpf": "98765432198", "name": "E" }, "relationship": [] }

graphBusiness.addNode(node1)
graphBusiness.addNode(node2)
graphBusiness.addNode(node3)
graphBusiness.addNode(node4)
graphBusiness.addNode(node5)
graphBusiness.addEdge("02593568917", "01708018964")
graphBusiness.addEdge("02593568917", "14952511935")
graphBusiness.addEdge("01708018964", "12345678912")
graphBusiness.addEdge("14952511935", "12345678912")
graphBusiness.addEdge("14952511935", "98765432198")
    test("Retorna array de sugestão de amizades para A",async () => {
        const cpf: string = "02593568917"
        const sugestao: string[] = await graphBusiness.findRelationship(cpf)
        expect(sugestao).toEqual(["12345678912", "98765432198"])
        
    })
})