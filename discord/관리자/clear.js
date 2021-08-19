const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js");

module.exports = {
    name : '채팅청소',
    aliases : ['purge', 'clear', '청소'],
    description: "청소 <1~99>",
    usage: "채팅을 청소합니다.",
        /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        if(!args[0]) return message.channel.send('삭제할 메시지의 수를 1~99 사이의 자연수로 입력해주세요.')
        if(isNaN(args[0])) return message.channel.send('삭제할 메시지의 개수는 숫자로만 입력하실 수 있습니다')
        if(parseInt(args[0]) > 99) return message.channel.send('최대로 삭제할 수 있는 메시지의 수는 99개 입니다')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send("✅ 채팅청소 | " + args[0]  + "만큼 메시지를 지웠습니다.")
    }
}