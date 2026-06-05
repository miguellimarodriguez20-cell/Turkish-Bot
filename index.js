require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

// Evento: Bot pronto
client.once('ready', () => {
    console.log(`✅ Bot logado como ${client.user.tag}!`);
    client.user.setActivity('!help para ajuda', { type: 'LISTENING' });
});

// Evento: Mensagem recebida
client.on('messageCreate', message => {
    // Ignorar mensagens de bots
    if (message.author.bot) return;

    // Comando !ping
    if (message.content === '!ping') {
        message.reply(`🏓 Pong! Latência: ${client.ws.ping}ms`);
    }

    // Comando !help
    if (message.content === '!help') {
        message.reply(`
📚 **Comandos disponíveis:**
\`!ping\` - Verifica a latência do bot
\`!help\` - Mostra esta mensagem
\`!avatar\` - Mostra seu avatar
        `);
    }

    // Comando !avatar
    if (message.content === '!avatar') {
        message.reply(`${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`);
    }
});

// Evento: Erro
client.on('error', error => {
    console.error('❌ Erro do cliente:', error);
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);
