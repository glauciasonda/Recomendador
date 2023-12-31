import express from "express"
import corss from "cors"
import { graphRouter } from "./Router/GraphRouter"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(corss())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use("/", graphRouter)




