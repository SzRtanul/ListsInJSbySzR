"use strict"
//eventToDivizio() //Event működés tesztelése
//let listofpriceIDs = [0,1,32]
let listofprice = [
    {
        id: 0,
        termeknev: "Retro Póló",
        image: "",
        ar: 0
    },
    {
        id: 1,
        termeknev: "Nem retro Póló",
        image: "",
        ar: 0
    },
    {
        id: 32,
        termeknev: "Kicsit retro Póló",
        image: "",
        ar: 0
    },
]
let listofpriceParameters = [
    {
        id: 0,
        szelesseg: 0,
        hosszusag: 0,
        magassag: 0,
        anyag: "",
        tomor: false
    },
    {
        id: 1,
        szelesseg: 0,
        hosszusag: 0,
        magassag: 0,
        anyag: "",
        tomor: false
    },
    {
        id: 32,
        szelesseg: 0,
        hosszusag: 0,
        magassag: 0,
        anyag: "",
        tomor: false
    }
]

let kosar = [{id: -1, menny: 0}]
kosar = []
kiindul();

function kiindul(){
    let leptet = 0;
    let s = "";
    for(let i = 0; i < listofprice.length; i++){
        if(leptet == 0){
            s += `<div class="row">`;
        }
        s+=`<div class="card col-md-3 col-sm-6 col-smx-12">` +
                `<a href="#" class="card-header text-success">Kocka</a>` +
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
                        `<div class="float-md-start">Ár: 6990 Ft</div>` +
                ` <button class="float-md-end kosarba">Kosárba</button>` +
                    `</div>` +
            `</div>` +
            `</div>`;
        leptet++;
        if(leptet == 4){
            s += `</div">`
            leptet = 0;
        }
    }
    document.getElementsByClassName("termekek")[0].innerHTML = s;
    let eventlist = document.getElementsByClassName("kosarba")
    for(let i = 0; i < eventlist.length; i++){
        eventlist[i].addEventListener("click", function(){addToKosar(listofprice[i].id)})
    }
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
    for(let i = 0; i < kosar.length && index == -1; i++){
        index = listofprice[i].id == id ? i : -1;
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

//szures, rendezes