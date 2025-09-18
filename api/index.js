import express from "express";
import cors from "cors";
import router from "./src/routes/routes.js";

//arquivo indice, chama a lib Express, define o tipo de arquivos utilizado pelo projeto como JSON, habilita cors, e modula e chama as rotas do arquivo ./src/routes/routes.js para o express() executar, alem de exportar o express atraves da const app para o arquivo server executar a aplicação.;

const app = express();
app.use(express.json());

app.use(cors({
   origin: '*'
}));

app.use(router);

export default app;
