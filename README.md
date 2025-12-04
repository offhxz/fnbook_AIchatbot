FN-Book: Chatbot Analisador de Fake News
Uma ferramenta inteligente de verificação de fatos impulsionada pelo Google Gemini 2.5 Flash.

Sobre o Projeto
O FN-Book e uma aplicacao web desenvolvida para combater a desinformacao. Atraves de uma interface de chat intuitiva, o sistema utiliza a mais recente Inteligencia Artificial do Google (Gemini 2.5 Flash) para analisar textos, noticias e boatos em tempo real.

O sistema avalia criterios como sensacionalismo, coerencia logica, verificacao de fontes e contexto historico, retornando um veredito claro sobre a veracidade da informacao.

Tecnologias
Frontend: React.js + Vite

Backend: Node.js + Express

Inteligencia Artificial: Google Gemini API (Modelo gemini-2.5-flash)

Mapas: Leaflet / React-Leaflet

Estilizacao: CSS Moderno

Como Rodar o Projeto
Siga o passo a passo abaixo para executar a aplicacao no seu computador.

1. Pre-requisitos
Antes de começar, voce precisa ter o Node.js instalado. Abra o seu terminal (CMD ou PowerShell) e digite o seguinte comando:

node -v

Se aparecer uma versao (ex: v18.x.x), voce esta pronto. Caso nao apareça nada ou de erro, sera necessario realizar a instalacao do Node.js atraves do site oficial.

2. Baixando o Codigo
Baixe o ZIP do codigo neste repositorio do GitHub.

Extraia os arquivos para o seu diretorio de preferencia.

3. Instalacao e Configuracao
Abra o CMD (Prompt de Comando) ou terminal.

Acesse a pasta onde voce extraiu o projeto usando o comando cd (change directory). Exemplo: cd C:\Users\SeuUsuario\Downloads\fnbook_new_chatbot-main

Rode o seguinte comando dentro da pasta para baixar as bibliotecas necessarias: npm install

Configure a Chave da API:

Crie um arquivo chamado .env na raiz do projeto.

Abra o arquivo .env.example que ja existe na pasta, copie o conteudo dele e cole no seu novo arquivo .env.

Substitua o texto de exemplo pela sua API Key real do Google AI Studio.

4. Executando a Aplicacao
Para rodar o projeto, voce precisara de dois terminais abertos simultaneamente (um para o servidor e outro para o site).

Passo A: Iniciar o Backend (Servidor) No primeiro terminal (dentro da pasta do projeto), execute:

node server.js

Voce devera ver a mensagem: "Servidor rodando em http://localhost:3001"

Passo B: Iniciar o Frontend (Interface)

Abra uma nova janela do terminal ou CMD.

Acesse a pasta do projeto novamente (use o comando cd como no passo 3).

Execute o comando:

npm run dev

5. Acessando
Apos rodar o comando acima, o terminal mostrara um endereco local, geralmente algo como: http://localhost:5173/

Copie e cole essa URL em seu navegador e pronto, o sistema devera estar funcionando.
