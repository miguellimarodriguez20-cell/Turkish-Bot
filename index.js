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
            .setColor('#DC2626') // Vermelho (barra lateral)
            .setTitle('ATC24 Application Hub')
            .setDescription('Bem-vindo ao hub de aplicações ATC24!')
            .addFields(
                {
                    name: '✈️ Apply for Pilot:',
                    value: 'Apply now to become an ATC24 Pilot and take your place among the elite.\nExperience the thrill of flying across the skies while proudly representing ATC24.',
                    inline: false
                },
                {
                    name: '📋 Apply for Staff Manager:',
                    value: '**CLOSED** - Apply now to become an ATC24 Staff Manager and take charge of leading our pilot team. As a Staff Manager, you\'ll oversee flight operations and review flight plans for accuracy and professionalism.',
                    inline: false
                },
                {
                    name: '⚠️ Informações Importantes:',
                    value: '• Complete a aplicação cuidadosamente com informações precisas\n• Submissões incompletas ou falsas podem afetar sua elegibilidade\n• Certifique-se que suas DMs estão abertas\n• Sua aplicação será revisada por nosso time',
                    inline: false
                },
                {
                    name: '✨ Obrigado:',
                    value: 'Obrigado pelo seu interesse, e esperamos ter você a bordo!',
                    inline: false
                }
            )
            .setFooter({ text: 'ATC24 Application Hub • Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) })
            .setTimestamp();

        // Botões
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('apply_pilot')
                    .setLabel('Apply')
                    .setStyle(ButtonStyle.Danger) // Vermelho
                    .setEmoji('✈️'),
                new ButtonBuilder()
                    .setCustomId('apply_staff')
                    .setLabel('Closed')
                    .setStyle(ButtonStyle.Secondary) // Cinza (desabilitado)
                    .setDisabled(true)
                    .setEmoji('📋')
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
