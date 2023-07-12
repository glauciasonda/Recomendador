import  express  from "express"
import { GraphController } from "../Controller/GraphController"
import { GraphBusiness } from "../Business/GraphBusiness"
 
export const graphRouter = express.Router()

const graphController = new GraphController( new GraphBusiness())

 graphRouter.post("/person", graphController.createPerson)
 graphRouter.post("/relationship", graphController.createRelationship)
 graphRouter.get("/person/:CPF", graphController.getPerson)
 graphRouter.get("/recommendations/:CPF", graphController.getRecommendations)
 graphRouter.delete("/clean", graphController.clean )
 
 graphRouter.get("/person", graphController.getNetwork)

 