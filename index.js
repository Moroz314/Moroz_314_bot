const Tg_Api = require('node-telegram-bot-api')

const token = '7063227232:AAFFdQDvPWan5alvlowoZNUw6KDJD27IiA4'

const bot = new Tg_Api(token, options={polling: true})

const chats = {}
const game_btn = {
    
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}

const game_btn_return = {
    
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: 'Загадать ещё раз !', callback_data: '/again'}]
        ]
    })
}
const bnt_write_post = {
    
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: 'Написать пост !', callback_data: '/write_post'}]
        ]
    })
}

const start_game = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадал число от 0 до 9, а ты должен его отгадать')
    const randNumb = Math.floor(Math.random() * 10)
    chats[chatId] = randNumb;
    console.log(randNumb)
    return bot.sendMessage(chatId, 'Отгадывай', game_btn);
}

const start = () => {
    
    bot.setMyCommands([
        {command: '/start', description: 'начальное приветствие'},
        {command: '/info', description: 'информация'},
        {command: '/game_1', description: 'Игра 1'},
        {command: '/vanga', description: 'Расскажу кое что о тебе )))'}
    ])
    
    bot.on( 'message', async msg => {
        const text = msg.text;
        const name = msg.chat.first_name
        const famil = msg.chat.last_name
        const chatId = msg.chat.id;
        let write = false


        if (text == '/start'){
           
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/25d/f5a/25df5a18-cf79-4b3e-a2f1-4862771ebd1c/1.webp')
            await bot.sendMessage(chatId, `Привет, ${name}! Рад видеть тебя здесь. Я - Moroz! `)
            return bot.sendMessage(chatId, 'Для того что бы предложить пост в "Подслушка 587", начните своё сообщение с слов "Для 587: "(без ковычек)')
        }
        if (text == '/start@Moroz_314_bot'){
           
            console.log(chatId)
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/25d/f5a/25df5a18-cf79-4b3e-a2f1-4862771ebd1c/1.webp')
            return bot.sendMessage(chatId, ` Привет, ${name}! Рад видеть тебя здесь. Я - Moroz! ${chatId} `)
        }
        if (text == '/info'){
            return bot.sendMessage(chatId, `Ты попал к самому крутому боту в телеграм!`)
        }
        if(text == 'Иди в пизду'){
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/13.webp')
         }
        if (text== '/game_1'){
           return start_game(chatId);
        }

        if (text == '/vanga'){
            await bot.sendMessage(chatId, `Твоё имя ${name}, фамилия ${famil}`)
            return bot.sendMessage(chatId, `Ты написал ${text}`)
        }
        
        chat_id_of_other_group = -4136500466
        if (msg.text && msg.text.startsWith("Для 587: ")) {
            // Отправляем сообщение в другую группу
            await bot.sendMessage(
                chat_id_of_other_group,
                msg.text
            );
            return bot.sendMessage(
            chatId, `Спасибо !!`
            );
        }
        
        
        
        await bot.sendMessage(chatId, `Ты написал "${text}"`)
        return bot.sendMessage(chatId, 'Он я ничего не понял :)')

       
      
    })

    bot.on('callback_query', async msg =>{
        const shet_game = 0;
        const data = msg.data;
        const chatId = msg.message.chat.id
        if (data == '/again'){
            return start_game(chatId);
        }

        if (data == chats[chatId]){

            await bot.sendMessage(chatId, `Ты угадал ${shet_game} раз`)
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цыфру ${chats[chatId]}!`, game_btn_return)
        }
        else{
            return bot.sendMessage(chatId, `К сожадению ты не угадал, бот загадал цыфру ${chats[chatId]}`, game_btn_return)
        }
    })
    bot.on('photo', (msg) => {
        const chatId = msg.chat.id;
        const caption = msg.caption || '';
        const photoId = msg.photo[msg.photo.length - 1].file_id;
    
        bot.sendPhoto(chatId, photoId, { caption: caption });
        bot.sendPhoto(-4136500466, photoId, { caption: caption });
    });
    
    bot.on('video', (msg) => {
        const chatId = msg.chat.id;
        const caption = msg.caption || '';
        const videoId = msg.video.file_id;
    
        bot.sendVideo(chatId, videoId, { caption: caption });
        bot.sendVideo(-4136500466, videoId, { caption: caption });
    });
    
}

start()