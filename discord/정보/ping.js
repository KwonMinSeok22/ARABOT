const { Message, Client } = require("discord.js");

module.exports = {
    name: "핑",
    aliases: ['p', '핑알려줘'],
    usage: "아라봇의 현재 핑을 확인합니다.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping}ms 입니다. 더 알고 싶으시다면 이네아라 <명령어>를 입력해주세요!`);
    },
};
