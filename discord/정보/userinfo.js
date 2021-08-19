const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js");

const moment = require('moment')

module.exports = {
    name: "유저정보",
    aliases: ["userinfo"],
    description: "유저정보를 확인합니다.",
    usage: "유저정보 @멘션",
    /**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
     run: async (client, message, args) => {
        const Target = message.mentions.users.first() || message.author
        const Member = message.guild.members.cache.get(Target.id)

        const Response = new MessageEmbed()
        .setAuthor(`${Target.username}`, Target.displayAvatarURL({dynamic: true}))
        .setThumbnail(Target.displayAvatarURL({dynamic: true}))
        .setColor("#EE82EE")
        .addField("유저 아이디", `${Target.id}`)
        .addField("역할", `${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
        .addField("서버 입장일", `${moment(Member.joinedAt).format('YYYY MMMM Do, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`)
        .addField("계정 생성일", `${moment(Target.createdAt).format('YYYY MMMM Do, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`)
        message.reply({embeds: [Response]})
    }
}