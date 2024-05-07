"use strict"
let listofprice = [
    {
        id: 0,
        termeknev: "Retro Póló"
    },
    {
        id: 1,
        termeknev: "Nem retro Póló"
    },
    {
        id: 2,
        termeknev: "Kicsit retro Póló"
    },
]
let kosar = [{id: -1, mennyiseg: 0}]

kiindul();

function kiindul(){
    let leptet = 0;
    let s = "";
    for(let i = 0; i < listofprice.length; i++){
        if(leptet == 0){
            s += `<div class="row">`;
        }
        s+=`<div class="card col-md-3 col-sm-6 col-smx-12">` +
                `<div class="card-header text-success">${listofprice[i].termeknev}</div>` +
                `<div class="card-body">` +
                ` <img src="kepek/polo1.jpg" class="img-thumbnail" alt="">` +
                    `<ul class = "d-none">` +
                        `<li>Szélesség: 5cm</li>` +
                        `<li>Hosszúság: 5cm</li>` +
                        `<li>Magasság: 5cm</li>` +
                        `<li>Anyag: Fenyőfa</li>` +
                        `<li>Tömör: Igen</li>` +
                    `</ul>` +
                `</div>` +
                `<div class="card-footer">` +
                    `<div class="row">` +
                        `<div class="float-md-start">Ár: ${listofprice[i].ar} Ft</div>` +
                ` <button class="float-md-end">Kosárba</button>` +
                    `</div>` +
            `</div>` +
            `</div>`;
        leptet++;
        if(leptet == 4){
            s += `</div>`
            leptet = 0;
        }
    }
    document.getElementsByClassName("termekek")[0].innerHTML = s;
}

function add(price = {
    nev: "",
    szelesseg: 0,
    hosszusag: 0,
    magassag: 0,
    agyag: "",
    tomor: false
}){
    listofprice.push()
}

function remove(id = 0){
    let index = bennevan(id);
    if(index >=0) kosar.slice(index);
}

function addToKosar(id=-1){
    let index = bennevan(id);
    if(index==-1){
        kosar.push(kosarElem);
    }
}

function bennevan(id = -1){
    let index = -1;
    for(let i = 0; i < kosar.length && index == -1; i++){
        index = kosar[i].id === id ? i : -1;
    }
    return index;
}

function letezik(id = -1){
    let index = -1;
    for(let i = 0; i < kosar.length && index == -1; i++){
        index = listofprice[i].id === id ? i : -1;
    }
    return index;
}