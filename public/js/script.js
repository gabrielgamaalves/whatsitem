fetch('dialogs.json')
    .then(async function (res) {
        res.json().then(dialogs => {
            console.log(dialogs)
            const r = sweep(dialogs.messages, "reply.options", (r, x) => {
                const i = x.index, o = x.array
                if (r.length > 0) {
                    const e = r.map((e, x) => { e.id = `${o[i].id}:${x}`; return e })
                }
            })  
    
            console.log(r)
        })
    })


const addChamada = document.getElementById("addChamadas")

addChamada.addEventListener("click", (e) => {
    e.preventDefault()
    const div = document.createElement("div")
          div.innerHTML = '<input type="text" placeholder="chamada" value=""><span onclick="deleteChamada(this)"><i class="bi bi-dash-lg"></i></span>'

    document.getElementById("chamadasItems").appendChild(div)
})

function deleteChamada(e){
    console.log(e)
    e.parentNode.parentNode.removeChild(e.parentNode)
}