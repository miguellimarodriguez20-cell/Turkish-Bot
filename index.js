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
            .setTitle('ATC24 Application Hub')
            .setThumbnail('https://cdn.discordapp.com/attachments/1234567890/1234567890/atc24_logo.png') // Adicione a URL do logo
            .setDescription('Bem-vindo ao hub de aplicações ATC24!')
            .addFields(
                {
                    name: 'Apply for Pilot:',
                    value: 'Apply now to become an ATC24 Pilot and take your place among the elite.\nExperience the thrill of flying across the skies while proudly representing ATC24.',
                    inline: false
                },
                {
                    name: 'Apply for Staff Manager:',
                    value: 'Apply now to become an ATC24 Staff Manager and take charge of leading our pilot team. As a Staff Manager, you\'ll oversee flight operations and review flight plans for accuracy and professionalism.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Please take your time to complete this application carefully and provide accurate information. Incomplete or false submissions may affect your eligibility.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Please make sure your DM\'s are open, or the application questions will not be able to reach you.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Once submitted, your application will be reviewed by our team, and we\'ll contact you with the next steps.',
                    inline: false
                },
                {
                    name: '\u200b',
                    value: 'Thank you for your interest, and we look forward to potentially having you on board!',
                    inline: false
                }
            )
            .setFooter({ text: 'ATC24 Application Hub' })
            .setTimestamp();

        // Botões fora do embed
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('apply_pilot')
                    .setLabel('Apply')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('apply_staff')
                    .setLabel('Closed')
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
