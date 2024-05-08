"use strict"
//eventToDivizio() //Event működés tesztelése
//let listofpriceIDs = [0,1,32]
let listofprice = [
    {
        id: 0,
        termeknev: "Háromszög",
        image: "n",
        ar: 6000
    },
    {
        id: 1,
        termeknev: "Négyszög",
        image: "n",
        ar: 7500
    },
    {
        id: 32,
        termeknev: "Ötszög",
        image: "n",
        ar: 9000
    },
    {
        id: 33,
        termeknev: "Sokszög",
        image: "n",
        ar: 9000
    },
    {
        id: 6,
        termeknev: "Négyzet",
        image: "n",
        ar: 9000
    },
    {
        id: 2,
        termeknev: "Rombusz",
        image: "n",
        ar: 6000
    },
    {
        id: 3,
        termeknev: "Tetraéder",
        image: "n",
        ar: 7500
    },
    {
        id: 4,
        termeknev: "Paralelogramma",
        image: "n",
        ar: 9000
    },
    {
        id: 5,
        termeknev: "Deltoid",
        image: "n",
        ar: 9000
    },
]
let listofpriceParameters = [
    {
        id: 0,
        szelesseg: 13,
        magassag: 13,
        hosszusag: 1,
        anyag: "Fa",
        tomor: true
    },
    {
        id: 1,
        szelesseg: 123,
        magassag: 2,
        hosszusag: 1,
        anyag: "Fa",
        tomor: true
    },
    {
        id: 32,
        szelesseg: 99,
        magassag: 99,
        hosszusag: 1,
        anyag: "Aluminium",
        tomor: true
    }
]

let kosar = [{id: -1, menny: 0}]
kosar = []
kiindul();

function kiindul(){
    let leptet = 0;
    let s = "";
    for(let i = 0; i < listofprice.length; i++){
        let zsindex = letezikparam(listofprice[i].id);
        let idgparam = idkWhyParam(listofprice[i].id);
        if(szuro(listofprice[i]) && szuroparam/*                */ */){
            if(leptet == 0){
                s += `<div class="row">`;
            }
            s+=`<div class="card col-md-3 col-sm-6 col-smx-12">` +
                    `<a href="#" class="card-header text-success">${listofprice[i].termeknev}</a>` +
                    `<div class="card-body">` +
                    ` <img src="${convImageExist(listofprice[i].image)}" class="img-thumbnail" alt="">` +
                        `<ul class = "">` +
                            `<li>Szélesség: ${idgparam.szelesseg}${zsindex != -1 ? "cm": ""}</li>` +
                            `<li>Hosszúság/Vastagság: ${idgparam.hosszusag}${zsindex !=-1 ? "cm": ""}</li>` +
                            `<li>Magasság: ${idgparam.magassag}${zsindex != -1 ? "cm": ""}</li>` +
                            `<li>Anyag: ${idgparam.anyag}</li>` +
                            `<li>Tömör: ${idgparam.tomor ? "Igen" : "Nem"}.</li>` +
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
    }
    document.getElementsByClassName("termekek")[0].innerHTML = s;
    let eventlist = document.getElementsByClassName("kosarba")
    for(let i = 0; i < eventlist.length; i++){
        eventlist[i].addEventListener("click", function(){addToKosar(listofprice[i].id)})
    }
}

function idkWhyParam(id){
    let index = letezikparam(id);
    return index != -1 ? listofpriceParameters[index] : {
        szelesseg: "Nincs megadva",
        magassag: "Nincs megadva",
        hosszusag: "Nincs megadva",
        anyag: "Nincs megadva",
        tomor: "Nincs megadva"
    };
}

function add(price = {
    nev: "",
    szelesseg: 0,
    hosszusag: 0,
    magassag: 0,
    anyag: "",
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
        kosar.push({id: id, menny: 0});
    }
    else{
        kosar[index].menny += 1;
    }
    kosarFrissit();
}

function kosarFrissit(){
    let s = "";
    for(let i = 0; i < kosar.length; i++){
        let index = letezik(kosar[i].id);
        s += `<p>${listofprice[index].termeknev} : <input type="number" id="fname" name="fname" value="${kosar[i].menny}"></p>`
    }
    document.getElementsByClassName("kosar")[0].innerHTML = s;
}

function bennevan(id = -1){
    let index = -1;
    for(let i = 0; i < kosar.length && index == -1; i++){
        index = kosar[i].id == id ? i : -1;
    }
    return index;
}

function letezik(id = -1){
    let index = -1;
    for(let i = 0; i < listofprice.length && index == -1; i++){
        index = listofprice[i].id == id ? i : -1;
    }
    return index;
}

function letezikparam(id = -1){
    let index = -1;
    for(let i = 0; i < listofpriceParameters.length && index == -1; i++){
        index = listofpriceParameters[i].id == id ? i : -1;
    }
    return index;
}

function eventToDivizio(){
    let s = "";
    for(let i = 0; i < 10; i++){
        s += `<button class="szamotkiir">Nyomj meg!</button>`;
    }
    let a = document.getElementsByClassName("divizio")[0];
    a.innerHTML = s;
    let gombok = document.getElementsByClassName("szamotkiir");
    for(let i = 0; i<10; i++){
        gombok[i].addEventListener("click", function(){ szamotKiir(i)})
    }
}

function szamotKiir(szam){
    let a = document.getElementsByClassName("theNumber")[0];
    a.innerHTML = szam;
}

function convImageExist(image_url){
    return imageExists(image_url) || image_url === "" ? image_url : "kepek/itsnotexist.png";
}

function imageExists(image_url){
    let http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

function szuro(object={
    termeknev: "Háromszög",
    image: "n",
    ar: 6000
}){
    return true;
}

function szuroparam(object={
    szelesseg: 13,
    magassag: 13,
    hosszusag: 1,
    anyag: "Fa",
    tomor: true
}){
    return true;
}

//szures, rendezes