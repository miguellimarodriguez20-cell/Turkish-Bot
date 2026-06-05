require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
        message.reply({ content: `🏓 Pong! Latência: ${client.ws.ping}ms`, allowedMentions: { repliedUser: false } });
    }

    // Comando !help
    if (message.content === '!help') {
        message.reply({ content: `
📚 **Comandos disponíveis:**
\`!ping\` - Verifica a latência do bot
\`!help\` - Mostra esta mensagem
\`!avatar\` - Mostra seu avatar
\`!aplicacao\` - Mostra o embed de aplicação
        `, allowedMentions: { repliedUser: false } });
    }

    // Comando !avatar
    if (message.content === '!avatar') {
        message.reply({ content: `${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`, allowedMentions: { repliedUser: false } });
    }

    // Comando !aplicacao
    if (message.content === '!aplicacao') {
        const embed = new EmbedBuilder()
            .setColor('#DC2626') // Vermelho
            .setTitle('Hub de Candidaturas ATC24')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Turkish_Airlines_Logo.svg/1200px-Turkish_Airlines_Logo.svg.png')
            .setDescription('Bem-vindo ao hub de aplicações ATC24!')
            .addFields(
                {
                    name: '✈️ Candidatar-se para Piloto:',
                    value: 'Candidata-te agora para te tornares um Piloto ATC24 e toma o teu lugar entre a elite.\nExperimenta a emoção de voar nos céus enquanto representas com orgulho ATC24.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Por favor, dedica tempo para completar esta candidatura com cuidado e forneça informações precisas. Candidaturas incompletas ou falsas podem afetar a tua elegibilidade.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Certifique-se de que as tuas DMs estão abertas, ou as questões de candidatura não conseguirão contactar-te.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Após a submissão, a tua candidatura será revisada pela nossa equipa, e entraremos em contacto contigo com os próximos passos.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Obrigado pelo teu interesse, e esperamos potencialmente ter-te a bordo!',
                    inline: false
                }
            )
            .setFooter({ text: 'Hub de Candidaturas ATC24' })
            .setTimestamp();

        // Botões
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('apply_pilot')
                    .setLabel('Candidatar')
                    .setStyle(ButtonStyle.Danger)
            );

        message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
    }
});

// Evento: Erro
client.on('error', error => {
    console.error('❌ Erro do cliente:', error);
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);
