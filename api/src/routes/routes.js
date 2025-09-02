import { Router } from "express";
import Root from "../controllers/root.js";
import Adm from "../controllers/admin.js";
import Usuario from "../controllers/usuario.js";
import Produtos from "../controllers/produto.js";
import Vendas from "../controllers/vendas.js";

// arquivo que cria e administra os endpoints, "rotas", da API. recebe as classes e seus metodos que vao permitir atualização e interação do banco via front-end

const router = Router();

// Rota Raiz di projeto
router.get("/blusablusas/", Root.raiz);

// Rotas crud para os dados dos ADM
router.get("/blusablusas/admins", Adm.get);
router.post("/blusablusas/admins", Adm.post);
router.put("/blusablusas/admins", Adm.put);

// Rotas CRUD para os dados de Users
router.get("/blusablusas/users", Usuario.getUsers);
router.post("/blusablusas/users", Usuario.setNewUser);
router.put("/blusablusas/users", Usuario.setUser);
router.delete("/blusablusas/users", Usuario.deleteUser);

// Rotas de filtro dos Users
router.patch("/blusablusas/users/filter", Usuario.searchUsers);
router.put("/blusablusas/users/filter", Usuario.filterUsers);

// Rota de vizualização para os dados de desrcrição do usuario
router.get(`/blusablusas/users/:id_pessoa/:id_usuario`, Usuario.getUser);

// Rotas crud para dados telefonicos users
router.patch("/blusablusas/fone", Usuario.getFone);
router.post("/blusablusas/fone", Usuario.setNewFone);
router.put("/blusablusas/fone", Usuario.setFone);
router.delete("/blusablusas/fone", Usuario.deleteFone);

//Rotas crud para dados de endereços users
router.patch("/blusablusas/endereco", Usuario.getEndereco);
router.post("/blusablusas/endereco", Usuario.setNewEndereco);
router.put("/blusablusas/endereco", Usuario.setEndereco);
router.delete("/blusablusas/endereco", Usuario.deleteEndereco);

// Rotas crud para os produtos
router.get("/blusablusas/produtos", Produtos.getProd);
router.post("/blusablusas/produtos", Produtos.setNewProd);
router.put("/blusablusas/produtos", Produtos.setProd);
router.delete("/blusablusas/produtos", Produtos.deleteProd);

//Rotas de busca e filtro para os produtos
router.patch("/blusablusas/produtos/search", Produtos.searchProds);
router.put("/blusablusas/produtos/search", Produtos.filterProds);

// Rotas para os dados de vendas
router.get("/blusablusas/vendas", Vendas.get);
//router.put("/blusablusas/vendas", Vendas.put);

//Rota para adicionar varios dados em massa, em arr-json, apenas para desenvolvedores
router.post("/teste", Produtos.massPost);

export default router;