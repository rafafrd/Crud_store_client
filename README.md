# 🛍️ API de Gerenciamento de Loja

<div align="center">
  <h3>🧩 Tecnologias Utilizadas no Projeto</h3>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
	<img src="https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white&style=for-the-badge" alt="Node.js" />
	<img src="https://img.shields.io/badge/express-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/insomnia-4000BF?logo=insomnia&logoColor=white&style=for-the-badge" alt="insomnia" />
  <img src="https://img.shields.io/badge/json-000000?logo=json&logoColor=white&style=for-the-badge" alt="json" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
</div>

---

Projeto de uma API RESTful desenvolvido com foco em **Node.js, Express** e **MySQL**. Esta API foi construída para fornecer um backend robusto para gerenciar as operações de CRUD (Criar, Ler, Atualizar, Deletar) de Clientes e Produtos de uma loja.

## 🧩 Sobre o Projeto

O projeto **API de Loja** é um backend construído para treinar a estruturação de um servidor Node.js.
O objetivo é reforçar boas práticas de **arquitetura MVC** (Model-View-Controller), **separação de responsabilidades** (dividindo lógica de rotas, controllers e models), **manipulação de banco de dados** relacional com MySQL e **documentação de código** com JSDoc.

## 🏗️ Arquitetura

O design da API segue o padrão MVC (Model-View-Controller) para organizar o código de forma clara e escalável:

* **Config:** Contém a configuração de conexão com o banco de dados (`db.js`).
* **Controllers:** Orquestram a lógica da aplicação. Recebem as requisições HTTP, validam dados e enviam as respostas (`clientesController.js`, `produtoController.js`).
* **Models:** Responsáveis pela comunicação direta com o banco de dados, executando as queries SQL (`clientesModel.js`, `produtoModel.js`).
* **Routes:** Mapeiam os endpoints (URLs) e métodos HTTP para os métodos corretos nos controllers (`clientesRoutes.js`, `routes.js`).
* **Server.js:** Ponto de entrada principal que inicializa o servidor Express e registra todas as rotas.

--- 

## 🗂️ Estrutura do Projeto
```
└── 📁 loja
    ├── 📁 docs
    │   └── ⚙️ Insomnia_2025-11-07.yaml
    ├── 📁 public
    │   ├── 📁 images
    │   └── 📁 styles
    ├── 📁 src
    │   ├── 📁 config
    │   │   └── 📄 db.js
    │   ├── 📁 controllers
    │   │   ├── 📄 clientesController.js
    │   │   └── 📄 produtoController.js
    │   ├── 📁 models
    │   │   ├── 📄 clientesModel.js
    │   │   └── 📄 produtoModel.js
    │   ├── 📁 routes
    │   │   ├── 📄 clientesRoutes.js
    │   │   ├── 📄 produtoRoutes.js
    │   │   └── 📄 routes.js
    │   └── 📁 views
    ├── ⚙️ .gitignore
    ├── ⚙️ package-lock.json
    ├── ⚙️ package.json
    └── 📄 server.js

```
