# Chat Mastery
## _Aplicação criada para fins de demonstração_

## Linguagens Utilizadas
- TypeScript

## Frameworks e Bibliotecas
- NextJs 14
- Bootstrap React
- Notify React

## Estrutura
- src/app - Arquivos fonte relacionados a comportamento do layout e da unica pagina do projeto
- src/app/Components - Componentes em react para construção da pagina, items do chat e modais (registro, login e seletores)
- src/app/Factories - Geradores de registro estatico, helpers para criação de instancias das interfaces disponiveis de acordo com necessidade e atributos disponíveis
- src/app/Helpers - Helpers para centralizas e satisfazer alguns processos que necessitam de chave unica ou controles complexos de fluxos de modais
- src/app/Providers - Classes que persistem instancias referentes a um módulo especifico: ex(Serviço, Repository e Interfaces) 
- src/app/Repositories - Classes responsável por armazenar e gerenciar dados coletados no localStorage
- src/app/Services - Serviços especificos referentes a cada módulo controlando os repositorios e as notificações de eventos

# Ambientes
### Url Publica
O teste foi publicado em uma url para maior facilidade na utilização e pode ser acessado através do link:  https://chat-seven-amber-17.vercel.app/

### NodeJS Local
O teste pode ser iniciado através do servidor nodejs local da maquina atravéz do comando
 ``` docker
 npm run dev
```

### Docker Local
Para subir o ambiente diretamente através de uma instância do docker local, pode ser utilizado o comando
 ``` docker
 docker-compose up - build
```

# Funcionamento da Aplicação
### Primeiro Acesso
- No primeiro acesso ao sistema realizado por um novo navegador que não possua a estrutura de itens armazenada em seu localStorage, a propria aplicação criará
-  Estrutura de chats no localstorage, ja carregado com o chat padrão (Geral), onde todos os usuarios podem interagir uns coms os outros

- Após carregamento completo do sistema, o componente welcome.tsx, é responsável por controlar o fluxo de modais iniciais para onboarding do usuario, esse fluxo contempla 3 popups distintas
- Modal de apresentação do sistema 

![Modal de Apresentação](https://chat-seven-amber-17.vercel.app/img/screenshots/modal-apresentacao.png)
- Modal para seleção de tipo de login

![Modal de Seleção de Login](https://chat-seven-amber-17.vercel.app/img/screenshots/modal-tipo-login.png)
- Modal de Login

![Modal de Login](https://chat-seven-amber-17.vercel.app/img/screenshots/modal-login.png)
- Modal de Registro

![Modal de Registro](https://chat-seven-amber-17.vercel.app/img/screenshots/modal-register.png)

- Após seleção ou criação de um usuário válido temos acesso a tela principal da aplicação
- ![Tela do sistema geral](https://chat-seven-amber-17.vercel.app/img/screenshots/system.png)

- Painel Lateral Esquerdo
- Campo para filtro de chats (onde pode-se filtrar um chat pelo nome do mesmo)
- Lista dos chats ativos, o chat em foco aparecerá em vermelho e o restante em branco
- Chats que possuem notificações pendentes são exibidos em laranja

![Exeplo de Chat com Notificação](https://chat-seven-amber-17.vercel.app/img/screenshots/chat-notify.png)

- Painel Central
- No topo do painel central temos o nome do chat em foco
- A area central mostra as mensagens enviadas naquele Chat
- A area do rodapé possuí campo para escrever mensagem, selecionar emojis e enviar mensagens (também funciona com Enter)

![Modal de seleção de Emojis](https://chat-seven-amber-17.vercel.app/img/screenshots/emoji-select.png)

- Painel Lateral Direito
-  Neste painel são mostrados os usuários que estão naquele Chat

- Notificações
- Há notificações disponíveis para os eventos
-  Recebimento de novas mensagens
-  Formulário incompleto ao cadastrar usuário
-  Mensagem sem conteúdo

![Notificação de Erro](https://chat-seven-amber-17.vercel.app/img/screenshots/notify-error.png)

![Notificação de Mensagem](https://chat-seven-amber-17.vercel.app/img/screenshots/notify.png)

# Controle do usuário autenticado
O controle para gerenciamento do usuário autenticado é todo feito através da variável loggedUser, que é alimentada pelos hooks useState e useEffect, dessa forma mantendo apenas uma sessão ativa por aba
Para trocar de usuário é necessario recarregar a pagina

# Controle de envio de mensagens
O serviço responsável por enviar mensagens e registrar notificações a todos os usuários relavantes na operação é a classe ChatService (chat.service.tsx), este módulo ao enviar uma mensagem, verifica todos os usuários participantes daquele chat e envia notificações para todos os participantes do chat menos quem está enviando a mensagem, essas notificações são disponibilizadas através do broadcastChannel e lidas a partir de um eventListener na pagina principal da aplicação, que reconhece o seu tipo e muda as configurações necessarias através do serviço NotifyService (notify.service.tsx)

# Fluxos da Aplicação
Login

![Fluxo de Login](https://chat-seven-amber-17.vercel.app/img/screenshots/fluxo-login.png)

Mensagem

![Fluxo de Mensagem](https://chat-seven-amber-17.vercel.app/img/screenshots/fluxo-mensagem.png)


# Explicação geral
Explicação geral, orietada ao fluxo do usuário, para esclarecimento de questões tecnicas e explicação da construção

## Notificações
As notificações são todas transacionadas através do broadCastChannel do navegador, há 2 listeners disponiveis na pagina principal de aplicação 
- Listener para notificações do sistema (erros possiveis)
- Listener dentro do UseEffect do loggedUser, para pegar somente as notificações daquele usuário

## Controle de usuário Logado
O controle de usuário logado é realizado através da variavel LoggedUser, que passa o seu setState como callback para o grupo de modais de login, e registra o usuario logado na sessão ao obter seu retorno

## Controle de usuários cadastrados
O controle de usuários cadastrados, busca e edição é reaizado através o repositorio de Usuarios, user.repository.tx

## Controle de chats
O controle de chats é feito através do repositorio de chats, dentro da estrutura de cada chat temos usuarios participantes e mensagens disponiveis em ordem cronologica com um id de tempo para controle

## Listeners 
Há listeners disponiveis na aplicação para, ao receber qualquer alteração no LocalStorage recarregar, lista de chats e lista de usuarios disponiveis, a cada modificação no storage, é feito novamente o fluxo de adicionar todos os usuarios ao chat principal

## Interfaces
Todos os tipos de objeto podem sen encontrados no arquivo types.tsx


