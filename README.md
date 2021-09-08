<div align="center">
  <img src=".github/recycleit.png" width="100px">
</div>

# Recycle.it

## Como iniciar

### Requisitos

- **[Git](https://git-scm.com/)**
- **[Node.JS](https://nodejs.org/en/)**
- **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**

> Versão do Node utilizada no projeto: 14.16.x

```bash
  # Clone o repositório
  $ git clone https://github.com/gjoao11/recycleit.git
  
  # Entre na pasta do projeto
  $ cd recycleit
```

### Back End

```bash
  # A partir da raiz do projeto
  
  # Entre na pasta do Back End
  $ cd recycleit-api
  
  # Instale as dependências
  $ yarn
  
  # Setup do banco de dados
  $ yarn prisma migrate dev --name init
  $ yarn prisma db seed --preview-feature
  
  # Inicie a aplicação
  $ yarn dev
```

### Front End

```bash
  # A partir da raiz do projeto
  
  # Entre na pasta do Front End
  $ cd recycleit-web
  
  # Instale as dependências
  $ yarn
  
  # Inicie a aplicação
  $ yarn dev
```

> O Back e o Front End devem rodar simultaneamente
