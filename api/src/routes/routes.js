import { Router } from "express";
import Root from "../controllers/root.js";
import Adm from "../controllers/admin.js";
import Usuario from "../controllers/usuario.js";
import Produtos from "../controllers/produto.js";
import Vendas from "../controllers/vendas.js";
import LogPessoas from "../controllers/logPessoas.js";
import autenticacaoJWT from '../middleware/autenticacaoJWT.js';
import verificarTokenRecuperacao from '../middleware/verificarTokenRecuperacao.js';
import comentarios from "../controllers/comentarios.js";

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
router.patch("/blusablusas/users", Usuario.setNewUsers);
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
router.post("/blusablusas/fone/id", Usuario.getIdFone);

//Rotas crud para dados de endereços users
router.patch("/blusablusas/endereco", Usuario.getEndereco);
router.post("/blusablusas/endereco", Usuario.setNewEndereco);
router.put("/blusablusas/endereco", Usuario.setEndereco);
router.delete("/blusablusas/endereco", Usuario.deleteEndereco);
router.post("/blusablusas/endereco/id", Usuario.getIdEndereco);

// Rotas crud para os produtos
router.get("/blusablusas/produtos", Produtos.getProd);
router.get("/blusablusas/produtosUsers", Produtos.getProdForUsers);
router.get("/blusablusas/produtos/destaques", Produtos.getDestaques);
router.post("/blusablusas/produtos", Produtos.setNewProd);
router.patch("/blusablusas/produtos", Produtos.setNewProds);
router.put("/blusablusas/produtos", Produtos.setProd);
router.delete("/blusablusas/produtos", Produtos.deleteProd);
// Rota PRODUTOS por categoria
router.get("/blusablusas/produtos/categoria/:categoria", Produtos.getProdsByCat);
// Rota PRODUTO por ID
router.get("/blusablusas/produtos/:id_produto", Produtos.getProdById);

//Rotas de busca e filtro para os produtos
router.patch("/blusablusas/produtos/search", Produtos.searchProds);
router.put("/blusablusas/produtos/search", Produtos.filterProds);
router.post("/blusablusas/produtos/userSearch", Produtos.searchProdsForUsers);
//Rotas de busca e filtro para os produtos
router.post("/blusablusas/produtos/filter", Produtos.filterProdsForUsers);

// Rotas para os dados de vendas
router.get("/blusablusas/vendas", Vendas.getVendas);
router.patch("/blusablusas/vendas", Vendas.searchVendas);
router.put("/blusablusas/vendas", Vendas.filterVendas);
router.post("/blusablusas/vendas", Vendas.setNewVenda);
// Rota pra vizualizar vendas por usuario
router.put("/blusablusas/vendas/:id_usuario", Vendas.getVendasByUser)
//Rota para vizualizar dados da venda
router.get("/blusablusas/vendas/:id_venda", Vendas.getVenda);
//Rota para vizualizar itens por venda
router.get("/blusablusas/vendas/descricao/:id_venda", Vendas.getItensbyVenda);
// adicionar 1 item a venda
router.post("/blusablusas/vendas/:id_venda", Vendas.setNewItenOnVenda);
//Rota para alterar itens por venda
router.put("/blusablusas/vendas/descricao/:id_venda", Vendas.setItensbyVenda);

// Rotas de login
router.post("/blusablusas/login", LogPessoas.login);
router.post("/blusablusas/logado", autenticacaoJWT, LogPessoas.obterDadosLogado);
router.post("/blusablusas/esqueci-senha", LogPessoas.esqueciSenha);
router.post("/blusablusas/reset-senha", verificarTokenRecuperacao, LogPessoas.resetSenha);
router.post("/blusablusas/alterar-senha", LogPessoas.alterarSenha);

router.post("/blusablusas/enviar-email", LogPessoas.enviarEmail);

// rotas de comentarios
router.get("/blusablusas/comentarios", comentarios.getAllComentarios);
router.get("/blusablusas/comentarios/produto/:id_produto", comentarios.getComentarioByProduto);
router.post("/blusablusas/comentarios", comentarios.addComentario);

export default router;