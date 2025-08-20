import app from "../../index.js";

//arquivo server esta executando a aplicação e definindo a rota principal ou rota raiz ".../blusablusas/". Apesar de ser o arquivo que está executando a aplicação não é o arquivo principal.

const port = 8080;

app.listen(port, () => {
   console.log();
   console.log(`> API ON http://localhost:${port}/blusablusas/`)
});

