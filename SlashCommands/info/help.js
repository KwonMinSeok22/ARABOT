const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    CommandInteraction
} = require("discord.js");

module.exports = {
    name: "도움",
    description: "도움 명령어입니다.",
    type: 'CHAT_INPUT',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async (client, message, interaction) => {
        const directories = [
            ...new Set(client.commands.map(cmd => cmd.directory)),
        ];

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter(
                (cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || '이름이 없습니다.',
                    description:
                        cmd.description ||
                        '설명이 없습니다.',
                }
            });

            return {
                directory: formatString(dir),
                commands: getCommands,

            }
        })

        const embed = new MessageEmbed().setDescription(
            '메뉴에서 카테고리를 골라주세요.'
        );

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder('카테고리를 선택해주세요.')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `이 카테고리의 이름은 ${cmd.directory} 입니다.`
                            }
                        })
                    )
            )
        ]

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false)
        })

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            // time: 5000
        })

        collector.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const directoryembed = new MessageEmbed()
                .setTitle(`카테고리: ${directory}`)
                .setDescription('현재 카테고리의 명령어 입니다.')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        }
                    })
                )
            interaction.update({ embeds: [directoryembed] })
        })

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) })
        })
    }
};