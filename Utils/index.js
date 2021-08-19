const  { readdirSync } = require('fs');

function getCommands () {
    let categories = [];

    readdirSync('./discord/').forEach((dir) => {
        const directories = readdirSync(`./discord/${dir}/`).filter((file) => file.endsWith('.js'))

        const value = [];
        const commands = directories.map((command) => {
            const file = require(`../discord/${dir}/${command}`);

            value.push({
                name: file.name ? file.name : '이름이 없습니다.',
                description: file.description ? file.description : '설명이 없습니다.',
                aliases: file.aliases ? file.aliases : '부명령어가 없습니다.',
                usage: file.usage ? file.usage : '사용방법이 없습니다.'
            })
        });
        
        let data = new Object();
        
        data = {
            name: dir.toUpperCase(),
            value: value
        };

        categories.push(data);

    })

    return categories;
}

module.exports = { getCommands }