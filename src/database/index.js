export function sweep(array = [], key = '', callback) {
    let k = key.split('.')
    array.map(function (r, i, o) {
        if (k[0] !== '') {
            for (let i = 0; i < k.length; i++) {
                r = r[k[i]]
            }
        }

        callback(r, { index: i, array: o })
        if (r.length > 0) {
            sweep(r, key, callback)
        }
    })

    return array
}

function dialogs(db) {
    const config = {
        initial_id: '00000'
    }

    return {
        chamadas: {
            initial: db.data.chamadas.initial,
            exit: db.data.chamadas.exit,
            doubt: db.data.chamadas.doubt
        },
        messages: {
            find: function (id) {
                function returnMap(array = []){
                    let r = []
                    array.map(m => r.push({ question: m.question, id: m.id, message: m.reply.message }))
                    return r
                }   

                if (id === config.initial_id) {
                    return returnMap(db.data.messages)
                }

                const object = db.data.messages.find(o =>
                    o.id === id.split(':')[0]
                )

                if (object && id !== object.id) {
                    let item;
                    sweep([object], 'reply.options', (r) => {
                        if (r.length > 0) {
                            r.map(rr => rr.id === id ? item = rr : null)
                        }
                    })
                    
                    return returnMap(item.reply.options)
                }

                return returnMap(object.reply.options)
            },
            query: function (array = [], question = '') {
                return array.find(r => r.question === question.toLocaleLowerCase())
            }
        },
        read: () => db.data
    }
}

export default dialogs