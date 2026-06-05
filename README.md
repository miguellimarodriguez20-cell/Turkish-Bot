# 🤖 Turkish-Bot

Um bot Discord simples e funcional feito com **discord.js**.

## 📋 Requisitos

- Node.js 18+ instalado
- Token do Discord Bot (obtenha em [Discord Developer Portal](https://discord.com/developers/applications))

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/miguellimarodriguez20-cell/Turkish-Bot.git
cd Turkish-Bot
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o arquivo `.env`:**
```bash
cp .env.example .env
```
Abra o `.env` e adicione seu token:
```
DISCORD_TOKEN=seu_token_aqui
```

4. **Execute o bot:**
```bash
npm start
```

## 📝 Comandos

| Comando | Descrição |
|---------|-----------|
| `!ping` | Verifica a latência do bot |
| `!help` | Mostra a lista de comandos |
| `!avatar` | Exibe seu avatar |

## 🔐 Segurança

⚠️ **IMPORTANTE:**
- Nunca compartilhe seu `DISCORD_TOKEN`
- Sempre use um arquivo `.env` para variáveis sensíveis
- O `.env` está no `.gitignore` para proteção

## 📖 Como obter seu Token

1. Vá para [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie um novo aplicativo
3. Vá até a aba "Bot" e clique em "Add Bot"
4. Copie o token em "TOKEN"
5. Adicione o bot ao seu servidor usando a URL de autorização gerada

## 🛠️ Desenvolvimento

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 📚 Recursos

- [discord.js Docs](https://discord.js.org/)
- [Discord API Docs](https://discord.com/developers/docs)

## 📄 Licença

MIT

---

Made with ❤️ by miguellimarodriguez20-cell
