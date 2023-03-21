<h1>:blossom:	Projeto em grupo módulo 5</h1>

<img src="https://github.com/TRQ10/Projeto-Fullstack-AI-MERN/blob/main/client/src/assets/home.png">
<p>dAIsy é uma pequena plataforma de rede social que permite criar uma conta, fazer login e atualizar seu perfil. Você também pode criar suas próprias imagens usando a API DALL-E da OpenAI em nosso site e compartilhá-las com a comunidade.</p>

<h2>:computer: Começando</h2>
<p>Baixe os arquivos do repositório GitHub.</p>

<pre><code>git clone https://github.com/seu-nome-de-usuario/minha-plataforma-de-rede-social.git</code></pre>

<p>Abra o terminal e navegue até as pastas do cliente e do servidor.</p>

<pre><code>cd minha-plataforma-de-rede-social/cliente
cd minha-plataforma-de-rede-social/servidor</code></pre>

<p>Crie um arquivo .env na pasta do cliente com a seguinte linha:</p>

<pre><code>VITE_BASE_URL=http://localhost:6969</code></pre>

<p>Crie um arquivo .env na pasta do servidor com as seguintes informações:</p>

<pre><code>DATABASE_URL=sua-url-de-banco-de-dados
DALL_E_API_KEY=sua-chave-de-API-da-DALL-E
CLOUDINARY_CLOUD_NAME=seu-nome-de-nuvem-cloudinary
CLOUDINARY_API_KEY=sua-chave-de-API-do-Cloudinary
CLOUDINARY_API_SECRET=sua-chave-secreta-de-API-do-Cloudinary</code></pre>

<p>Execute npm i em ambas as pastas para instalar as dependências necessárias.</p>

<pre><code>npm i</code></pre>

<p>Para iniciar o servidor Vite React, execute npm run dev na pasta do cliente.</p>

<pre><code>cd client
npm run dev</code></pre>

<p>Para iniciar o servidor Express.js, execute npm start na pasta do servidor.</p>

<pre><code>cd server
npm start</code></pre>

<h2>:sparkles: Utilização</h2>
<p>Para usar esta plataforma de rede social, primeiro crie uma conta clicando no botão "Criar Conta" e preenchendo as informações necessárias, como seu endereço de e-mail, nome, sobrenome e uma senha. Depois de criar uma conta, você pode fazer login clicando no botão "Entrar" e inserindo seu e-mail e senha.</p>

<p>Depois de fazer login, você será redirecionado para a página principal. Para atualizar suas informações de perfil, como seu e-mail, nome e sobrenome, clique no link "Perfil" no menu de navegação.</p>

<p>Você também pode criar suas próprias imagens usando a API DALL-E da OpenAI em nosso site. Basta clicar no botão "Criar Imagem" no site, inserir os parâmetros desejados da imagem e clicar no botão "Gerar Imagem" para criar e baixar a imagem. Você também pode compartilhar sua imagem com a comunidade, basta clicar no botão "Compartilhar Imagem" e ela será adicionada à galeria de imagens compartilhadas.</p>

<p>Esteja ciente de que a API DALL-E tem limites de uso e pode não estar sempre disponível.</p>

<h2>:hammer: Contribuindo</h2>
<p>Se você deseja contribuir para este projeto, envie uma solicitação pull.</p>

<h2>:two_hearts: Contribuidores</h2>
<a href="https://github.com/TRQ10/Projeto-Fullstack-AI-MERN/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TRQ10/Projeto-Fullstack-AI-MERN" />
</a>

<h2>:page_with_curl: Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.</p>
