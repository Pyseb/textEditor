let te_wrapper = document.getElementById("text_editor_wrapper")

let btn_gras = document.getElementById('gras');
let listTitle = document.getElementById('titleBtn')
let placeholder = document.querySelector('.placeholder')
let parag = document.querySelector('.text-content');
parag.addEventListener('click', resetTextSpan)

btnOpt();

listTitle.addEventListener('change', titlefunc)



btn_gras.addEventListener('click', function() {
    mep('strong', this);


})
let btn_underline = document.getElementById('under');
btn_underline.addEventListener('click', function() {
    mep('u', this);

})
let bnt_ital = document.getElementById('italique')
bnt_ital.addEventListener('click', function() {
    mep('i', this);

})

let add_parag_btn = document.querySelector('.add-btn')
add_parag_btn.addEventListener('click', function() {


        let div_copy = document.querySelector('.text_editor').cloneNode([true])
        let span = document.createElement("span");
        span.classList = "placeholder"
        reset_text_content = div_copy.querySelector('.text-content');
        reset_img_content = div_copy.querySelector('.img-fluid');
        reset_text_content.innerText = "";
        if (!!reset_img_content) {
            reset_img_content.remove()
        }



        reset_text_content.appendChild(span)
        te_wrapper.insertBefore(div_copy, document.querySelector(".modal-add-parag"));
        btnOpt();
        img();
        document.querySelectorAll('.text-content').forEach(parag => {
            parag.addEventListener('click', resetTextSpan)
        })





    })
    //------------------------reset span paragraphe --------------

function resetTextSpan() {

    this.innerText = "";

}
// ----------------------survol du bouton d'ajout d'image--------------
function addOptMenu(btn, mode) {
    console.log(mode)
        //btn.parentNode.parentNode.querySelector(mode).classList.add('active')
    document.querySelector(mode).classList.add('active')

}

function removeOptMenu(btn, mode) {
    // btn.parentNode.parentNode.querySelector(mode).classList.remove('active')
    document.querySelector(mode).classList.remove('active')

}


function btnOpt() {
    document.querySelectorAll(".button_opt").forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (btn.classList.contains('remove')) {
                addOptMenu(btn, '.remove_img')
            } else if (btn.classList.contains('add')) {
                addOptMenu(btn, '.insert_img')
            }
        })
        btn.addEventListener('mouseleave', function() {
            if (btn.classList.contains('remove')) {
                removeOptMenu(btn, '.remove_img')
            } else if (btn.classList.contains('add')) {
                removeOptMenu(btn, '.insert_img')
            }
        })
    })
    document.querySelectorAll('.hover').forEach(hover => {
        hover.addEventListener('mouseenter', function() {


            if (!hover.classList.contains('active')) {

                if (hover.classList.contains('remove_img')) {
                    addOptMenu(hover, '.remove_img')
                } else if (hover.classList.contains('insert_img')) {
                    addOptMenu(hover, '.insert_img')
                }
            }
        })

        hover.addEventListener('mouseleave', function() {

            if (hover.classList.contains('remove_img')) {
                if (hover.classList.contains('active')) {
                    removeOptMenu(hover, '.remove_img')
                }
            } else if (hover.classList.contains('insert_img')) {
                if (hover.classList.contains('active')) {
                    removeOptMenu(hover, '.insert_img')
                }

            }
        })

    })
}


// -----------------placement des images dans le paragraph-----------------------------------



//nom a revoir
img();

function img() {
    document.querySelectorAll('.left_img').forEach(left => {
        left.addEventListener('click', function() {
            side(left, "left")
        })

    })
    document.querySelectorAll('.right_img').forEach(right => {
        right.addEventListener('click', function() {
            side(right, "right")
        })

    })

    function side(side, side_img) {

        const paragraphe = side.parentElement.parentElement.parentElement.parentElement.querySelector('.paragraphe')
        if (paragraphe.querySelectorAll('.img-fluid').length > 0) {
            paragraphe.removeChild(paragraphe.querySelector('.img-fluid'))
        }
        const img = document.createElement('img');
        img.classList = "img-fluid"
        img.src = '3000.png';
        img.style.width = '200px';
        img.style.height = '200px';
        paragraphe.appendChild(img);
        paragraphe.style.display = "flex";
        paragraphe.querySelector(".text-content").style.width = "70%"

        if (side_img == 'left') {
            paragraphe.style.flexDirection = "row-reverse";
            paragraphe.style.justifyContent = "flex-end";
        } else if (side_img == 'right') {
            paragraphe.style.flexDirection = "row";
            paragraphe.style.justifyContent = "flex-start";
        }

    }
}





//-------click sur placeholder paragraphe pour suppression-----
placeholder.addEventListener('click', function() {
    console.log(placeholder)
    console.log(placeholder.id)
    erraseSpan(placeholder.id)
        //document.querySelector('.text-content').removeChild(placeholder)



})


//--------------------------------- fonction de mise en page du titre----------------------------------
function titlefunc() {

    if (te_wrapper.firstChild.nodeName == "H1" || te_wrapper.firstChild.nodeName == "H3") {

        te_wrapper.firstChild.remove()

    }


    title = document.createElement(listTitle.value)
    title.id = "title"
    title.ariaLabel = "titre"
    title.style.padding = "5px"
    span = document.createElement("span")
    span.id = "spanTitle"
    span.classList = ('spanTitle placeholder')

    span.contentEditable = false;

    title.appendChild(span)


    te_wrapper.insertBefore(title, te_wrapper.firstChild)




    const spanClk = document.querySelector('.spanTitle')

    spanClk.addEventListener('click', function() {

        erraseSpan(span.id)
    })

    document.addEventListener('keyup', function() {
        if ((title.innerText !== "") && (document.getElementById("spanTitle"))) {

            erraseSpan(span.id)
        }
    })



}


function erraseSpan(value) {
    console.log(document.getElementById(value))
    console.log(document.getElementById(value).parentNode)
    document.getElementById(document.getElementById(value).parentNode.id).removeChild(document.getElementById(document.getElementById(value).id))
}



//------------------------Fonction de mise en page-------------------------
function mep(valeur, btn) {
    btn.classList.toggle('active')

    if (btn.classList.contains('active')) {
        console.log(btn.id)
        let selObj = window.getSelection();
        if (selObj.getRangeAt(0).startOffset != selObj.getRangeAt(0).endOffset) {
            repObj = `<${valeur}>${selObj}</${valeur}>`
            replaceSelectionWithHtml(repObj)

        } else {
            new_doc = document.createElement(valeur)
            new_doc.innerText = ` `
            new_doc.classList = "newDiv"
            te_wrapper.insertAdjacentElement("beforeend", new_doc)
            document.querySelector('.newDiv').style.background = "red"
            last_focus = document.querySelector('.newDiv')

            //repObj = `<${valeur}> </${valeur}>`
            //replaceSelectionWithHtml(repObj)
            //te_wrapper.focus()

        }
    } // else {
    //    let range = document.createRange();
    //    //range.collapse = true;
    //    range.setStartAfter(te_wrapper.firstChild)//

    //    console.log(range)//

    //    console.log(`pas ${btn.id}`)
    //        //te_wrapper.lastChild.focus()//

    //}
    last_focus.focus()
    console.log(last_focus)

}

function replaceSelectionWithHtml(html) {
    var range;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(),
            child;
        while ((child = div.firstChild)) {
            frag.appendChild(child);

        }
        range.insertNode(frag);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
}