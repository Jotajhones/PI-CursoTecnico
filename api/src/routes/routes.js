import { Router } from "express";
import Root from "../controllers/root.js";
import Adm from "../controllers/admin.js";
import Usuario from "../controllers/usuario.js";
import Produtos from "../controllers/produto.js";

// arquivo que cria e administra os endpoints, "rotas", da API. recebe as classes e seus metodos que vao permitir atualização e interação do banco via front-end

const router = Router();

// Rota Raiz di projeto
router.get("/blusablusas/", Root.raiz);

// Rotas crud para os dados dos ADM
router.get("/blusablusas/admins", Adm.get);
router.post("/blusablusas/admins", Adm.post);
router.put("/blusablusas/admins", Adm.put);

// Rotas CRUD para os dados de Users
router.get("/blusablusas/users", Usuario.get);
router.post("/blusablusas/users", Usuario.post);
router.put("/blusablusas/users", Usuario.put);
router.delete("/blusablusas/users", Usuario.delete);

// Rotas de filtro dos Users
router.patch("/blusablusas/users/filter", Usuario.search);
router.put("/blusablusas/users/filter", Usuario.filter);

// Rota de vizualização para os dados de desrcrição do usuario
router.patch("/blusablusas/users/descricao", Usuario.descricao);

// Rotas crud para dados telefonicos users
router.patch("/blusablusas/fone", Usuario.getFone);
router.post("/blusablusas/fone", Usuario.postFone);
router.put("/blusablusas/fone", Usuario.updateFone);
router.delete("/blusablusas/fone", Usuario.deleteFone);

//Rotas crud para dados de endereços users
router.patch("/blusablusas/endereco", Usuario.getEndereco);
router.post("/blusablusas/endereco", Usuario.postEndereco);
router.put("/blusablusas/endereco", Usuario.updateEndereco);
router.delete("/blusablusas/endereco", Usuario.deleteEndereco);

// Rotas crud para os produtos
router.get("/blusablusas/produtos", Produtos.get);
router.post("/blusablusas/produtos", Produtos.post);
router.put("/blusablusas/produtos", Produtos.put);
router.delete("/blusablusas/produtos", Produtos.delete);

//Rotas de busca e filtro para os produtos
router.patch("/blusablusas/produtos/search", Produtos.search);
router.put("/blusablusas/produtos/search", Produtos.filter);

//Rota para adicionar varios dados em massa, em arr-json, apenas para desenvolvedores
router.post("/teste", Usuario.massPost);

export default router;