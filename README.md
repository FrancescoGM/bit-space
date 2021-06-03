<h1 align='center' style='color: #ED2786'>bit space</h1>

## ⚽ Sobre a bit space

A bit space é uma plataforma para você criar seus times de futebol personalizáveis como você preferir. Este projeto foi desenvolvido para uma vaga de emprego com o prazo de 7 dias. [projeto final]('https://bit-space.vercel.app/')

## 👨‍💻 Experiência de desenvolvimento

Desenvolver o projeto foi um desafio em tanto, primeiramente refiz a interface do projeto no figma, com isso tiver com mais exatidão os tamanhos e medidos dos elementos, [link]('https://www.figma.com/file/5vTB0aIWWMM9hrXLZUrmR8/bit-space'). Logo após comecei a configurar o projeto, adicionando typescript, eslint e prettier, para padronizar os códigos. Então desenvolvi as telas, os componentes e outros, após isso os partes com mais lógica. Mas o que definitivamente me travou por uns tempos foi toda a lógica e os componentes de drag and drop, pois NUNCA construí algo do tipo, então utilizei esse video como base [vídeo]('https://www.youtube.com/watch?v=awRtgpRsdTQ&t=3355s'), tirando os usos da biblioteca react-dnd o resto fui eu que desenvolvi, como o tempo foi meio curto, existe a possibilidade de existir algum bug ou erro, pois não tenho experiência em criar drag and drop's e por esse mesmo motivo, não é possível utilizar a aplicação em ambiente mobile, logo a tela não é responsiva. Foram desenvolvidas as funcionalidades de criar/deletar/editar um time.

Obs: no último dia de desenvolvimento me ocorreu que enquanto desenvolvia a página de edição do time, encontrei um bug que até agora não sei como resolver, por isso não é possivel redefinir a posição de um time já criado, claro era pra ser possivel, mas o tempo acabou e seria arriscado modificar os arquivos e talvez piorar a situação, e por fim os dados do jogador mais e menos escolhido estão estáticos, pois não me sobrou tempo par pensar na lógica por trás.

## 🗃 Bibliotecas utilizadas

- NextJS: Biblioteca baseada no reactJS que tráz a possibilidade de utilizarmos SSR em projetos front end, e também as API routes, podendo dar a possibilidade de termos um "backend" no front end.
- Typescript: Linguagem baseada no javascript que trás a possibilidade de "tiparmos" nosso código.
- ChakraUI: Biblioteca de componentização pré definida utilizada para modelar todo o front end da aplicação.
- Unform: Biblioteca de gerenciamento de formulários altamente performáticos e personalizáveis.
- Yup: Biblioteca de validação de dados.
- Faunadb: Biblioteca utilizada para entrar em comunicação com o banco de dados.
- React DnD: Biblioteca utilizada para a criação de componentes drag and drop.
- React select: Biblioteca completa sobre componentes select (utilizada para criar o componente de tags).
- Eslint e prettier: Bibliotecas para padronizar e estilizar o código.

## 🛠 Como configurar o projeto

Caso você queira recriar do zero a aplicação basta configurar 2 variáveis ambiente e criar um banco de dados no fauna com a seguinte collection "teams".

```env
  API_FOOTBALL_KEY=chave do rapidapi
  FAUNADB_KEY=fchave do banco de dados fauna
```

```bash
  git clone https://github.com/FrancescoGM/bit-space # Clonar o repo
  cd bit-space # Navegar até a pasta

  yarn # para instalar as dependências
  yarn build # para buildar o projeto
  yarn start # para iniciar em modo de produção
```
