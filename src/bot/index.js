import wwebjs from "whatsapp-web.js";
import qrcode from 'qrcode-terminal'

import dialogs from "../dialogs/dialogs.js";

const client = new wwebjs.Client({
    authStrategy: new wwebjs.LocalAuth()
})
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})
client.on('authenticated', (session) => {
    console.log("auth")
})


const chats = []
client.on('message', async (m) => {
    await dialogs().then(dialog => {
        function sendAnswer(answer){
            if(answer){
                client.sendMessage(m.from, answer.reply.message)
                chats[chats.findIndex(c => c.from === m.from)].idm = answer.id
            }else{
                client.sendMessage(m.from, dialog.chamadas.doubt.reply)
            }
        }
    
        const message = m.body.toLocaleLowerCase().trim()
        const contact = chats.find(c => c.from === m.from)
        const chamadas = dialog.chamadas
    
    
        if(chamadas.exit.messages.find(c => c.toLocaleLowerCase() === message)){
            const index = chats.findIndex(c => c.from === m.from)
            if(index != -1){
                chats.splice(index, 1)
                client.sendMessage(m.from, chamadas.exit.reply)
            }else{
                client.sendMessage(m.from, dialog.chamadas.doubt.reply)
            }
        }
    
    
        else if(contact){
            if(contact.idm === '00000'){
                const answer = dialog.messages.find({question: message})
                sendAnswer(answer)
            }
            else{
                const answer = dialog.messages.find({id: contact.idm})
                sendAnswer(answer.reply.options.find(c => c.question.toLocaleLowerCase() === message))
            }
    
        }
        else{
            if(chamadas.initial.messages.find(c => c.toLocaleLowerCase() === message)){
                chats.push({from: m.from, idm: '00000'})
                m.reply(dialog.chamadas.initial.reply)
            }
        }
    })
})

client.initialize()