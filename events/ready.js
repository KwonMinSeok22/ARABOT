const client = require("../index");
const path = require('path')
const { getCommands } = require('../Utils');

client.on("ready", () => {

    console.log(`${client.user.tag}(이)가 실행되었습니다.\n아라(ARA)라이선스는 MinSeok_P#3582에게 있으며 소유는 불가능합니다.`)

    const arrayOfStatus = [
        `${client.guilds.cache.size}서버 서비스중`,
        `${client.users.cache.size}명이 사용중`,
        `사용방법: 아라 <명령어>`
    ]

    let index = 0;
    setInterval(() => {
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status);
        index++;
    }, 5000)


    // 대시보드

    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size
    }

    const express = require('express')

    const app = express()

    const port = 3000 || 3001;

    app.set('view engine', "ejs")

    app.get("/", (req, res) => {
        res.status(200).sendFile(
            path.join(__dirname, "..", "pages", "landingPage.html")
        );
    })

    app.get("/commands", (req, res) => {
        const commands = getCommands();
        res.status(200).render('commands', { commands })
    })
    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails)
    })
    app.listen(port)
    }
)
