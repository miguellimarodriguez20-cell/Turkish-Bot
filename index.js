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
        message.reply(`🏓 Pong! Latência: ${client.ws.ping}ms`);
    }

    // Comando !help
    if (message.content === '!help') {
        message.reply(`
📚 **Comandos disponíveis:**
\`!ping\` - Verifica a latência do bot
\`!help\` - Mostra esta mensagem
\`!avatar\` - Mostra seu avatar
\`!aplicacao\` - Mostra o embed de aplicação
        `);
    }

    // Comando !avatar
    if (message.content === '!avatar') {
        message.reply(`${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`);
    }

    // Comando !aplicacao
    if (message.content === '!aplicacao') {
        const embed = new EmbedBuilder()
            .setColor('#DC2626') // Vermelho
            .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Turkish_Airlines_Logo.svg/1200px-Turkish_Airlines_Logo.svg.png')
            .setTitle('Hub de Candidaturas ATC24')
            .setDescription('Bem-vindo ao hub de aplicações ATC24!')
            .addFields(
                {
                    name: '✈️ Candidatar-se para Piloto:',
                    value: 'Candidata-te agora para te tornares um Piloto ATC24 e toma o teu lugar entre a elite.\nExperimenta a emoção de voar nos céus enquanto representas com orgulho ATC24.',
                    inline: false
                },
                {
                    name: '📋 Candidatar-se para Gestor de Staff:',
                    value: 'Candidata-te agora para te tornares um Gestor de Staff ATC24 e assumi o comando da liderança do nosso grupo de pilotos. Como Gestor de Staff, supervisionarás as operações de voo e revegarás planos de voo para precisão e profissionalismo.',
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
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('apply_staff')
                    .setLabel('Fechado')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        message.reply({ embeds: [embed], components: [row] });
    }
});

// Evento: Erro
client.on('error', error => {
    console.error('❌ Erro do cliente:', error);
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);
