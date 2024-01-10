const cssPath = function (el) {
    if (!(el instanceof Element))
        return;
    var path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += '#' + el.id;
            path.unshift(selector);
            break;
        } else {
            var sib = el, nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() == selector)
                    nth++;
            }
            if (nth != 1)
                selector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(">");
}

fetch('/dialogs.json')
    .then(async function (res) {
        res.json().then(dialogs => {
            console.log(dialogs)
        })
    })

const positions = JSON.parse(localStorage.positions || "{}");

$(document).ready(function () {
    let items = [];
    [...document.querySelectorAll(".item")]
        .map(item => items.push(cssPath(item)))

    for (e of items) {
        const item = document.querySelector(e)
        const group = item.parentNode.parentNode

        $("#mindmap").connections({
            to: $(group).prev()[0],
            from: item,
            css: { zIndex: -1, }
        })
    }
    $(".mix").draggable({
        Handle: ".item",
        containment: "body",
        start: () => $('body').css("cursor", "move"),
        drag: function (event, ui) {
            $('connection').connections('update')
        },
        stop: function (event, ui) {
            positions[cssPath(ui.helper[0]).replace(/ /g, '')] = ui.position
            localStorage.positions = JSON.stringify(positions)
            $('body').css("cursor", "auto")
        }
    });

    $.each(positions, function (item, pos) {
        $(item).css(pos)
        $('connection').connections('update')
    })


    setInterval(() => $('connection').connections('update'), 1000)
})