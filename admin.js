"use strict"
//eventToDivizio() //Event működés tesztelése
//let listofpriceIDs = [0,1,32]
let listofprice = [
    {
        id: 0,
        termeknev: "Háromszög",
        image: "",
        ar: 6000
    },
    {
        id: 1,
        termeknev: "Négyszög",
        image: "",
        ar: 7500
    },
    {
        id: 32,
        termeknev: "Ötszög",
        image: "",
        ar: 9000
    },
    {
        id: 33,
        termeknev: "Sokszög",
        image: "",
        ar: 9000
    },
    {
        id: 6,
        termeknev: "Négyzet",
        image: "",
        ar: 9000
    },
    {
        id: 2,
        termeknev: "Rombusz",
        image: "",
        ar: 6000
    },
    {
        id: 3,
        termeknev: "Tetraéder",
        image: "",
        ar: 7500
    },
    {
        id: 4,
        termeknev: "Paralelogramma",
        image: "",
        ar: 9000
    },
    {
        id: 5,
        termeknev: "Deltoid",
        image: "",
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
let megjelenitdemilyensorrendben = [];
let kosar = [{id: -1, menny: 0}]
kosar = []
kiindulGUI();

function kiindulGUI(){
    let priceparams ={
        keresettnevek: [],
        tiltottnevek: [],
        minAr: 7100,
        maxAr: 18000000
    }

    // Szavakat hozzaad

    let priceparamsesparams = {

    }
    let leptet = 0;
    let s = "";
    for(let i = 0; i < listofprice.length; i++){
        let idgprice = listofprice[i];
        let zsindex = letezikparam(listofprice[i].id);
        let idgparam = idkWhyParam(listofprice[i].id);
        if(szuro(listofprice[i].id, priceparams) /*&& szuroparam(listofprice[i].id)*/){
            if(leptet == 0){
                s += `<div class="row">`;
            }
            s+=`<div class="card col-md-3 col-sm-6 col-smx-12">` +
                    `<a href="#" class="card-header text-success">${idgprice.termeknev}</a>` +
                    `<div class="card-body">` +
                    ` <img src="${convImageExist(idgprice.image)}" class="img-thumbnail" alt="">` +
                        `<ul class = "lejon">` +
                            `<li>Szélesség: ${idgparam.szelesseg}${zsindex != -1 ? "cm": ""}</li>` +
                            `<li>Hosszúság/Vastagság: ${idgparam.hosszusag}${zsindex !=-1 ? "cm": ""}</li>` +
                            `<li>Magasság: ${idgparam.magassag}${zsindex != -1 ? "cm": ""}</li>` +
                            `<li>Anyag: ${idgparam.anyag}</li>` +
                            `<li>Tömör: ${idgparam.tomor ? 
                                (typeof idgparam.tomor === "boolean" ? "Igen" : "Nincs megadva") 
                                 : "Nem"}.</li>` +
                        `</ul>` +
                    `</div>` +
                    `<div class="card-footer">` +
                        `<div class="row">` +
                            `<div class="float-md-start">Ár: ${listofprice[i].ar} Ft</div>` +
                            ` <button class="float-md-end kosarba">Kosárba</button>` +
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
    mindenhezeventetadwitharray("kosarba", "click", addToKosar, listofprice)
}

function kosarFrissitGUI(){
    let s = "";
    for(let i = 0; i < kosar.length; i++){
        let index = letezik(kosar[i].id);
        s += `<p><img src="${convImageExist(listofprice[index].image)}" ` +
        `class="img-thumbnail" alt="">${listofprice[index].termeknev} : `+
        `<input type="number" class="elemszam" min="1" id="fname${i}" name="fname${i}N" value="${kosar[i].menny}">`+
        ` <button class="elemettorol">Töröl</button>`+
        `<span> ${listofprice[index].ar} Ft<span/></p>`
    }
    document.getElementsByClassName("kosar")[0].innerHTML = s;
    mindenhezeventetad("elemettorol", "click", removefromkosarwitharrayindex)
    mindenhezeventetad("elemszam", "change", elemszamnovelcsokken)
    kosaradatGUI()
}

function kosaradatGUI(){
    let s = `Összeg: ${sumforjsonar(kosar)} Ft`;
    document.getElementsByClassName("kosaradatok")[0].innerHTML = s;
}

function termekekGUI(){

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

// Terméklista kezelés
function add(price = {
    nev: "",
    szelesseg: 0,
    hosszusag: 0,
    magassag: 0,
    anyag: "",
    tomor: false
}){
    listofprice.push(price)
    return true;
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


// Kosarkezelés
function removefromkosar(id = -1){ // Törlés a kosárból
    let index = bennevan(id);
    if(index >= 0) kosar.splice(index, 1);
    kosaradatGUI();
}

function removefromkosarwitharrayindex(index = -1){ // Törlés a kosárból
    if(index >= 0) kosar.splice(index, 1);
    kosarFrissitGUI();
}

function addToKosar(id=-1){
    if(letezik(id) != -1){
        let index = bennevan(id);
        if(index==-1){
            kosar.push({id: id, menny: 1});
        }
        else{
            kosar[index].menny += 1;
        }
        kosarFrissitGUI();
    }
}

function bennevan(id = -1){
    let index = -1;
    for(let i = 0; i < kosar.length && index == -1; i++){
        index = kosar[i].id == id ? i : -1;
    }
    return index;
}

function elemszamnovelcsokken(i=-1){
     kosar[i].menny = document.getElementsByClassName("elemszam")[i].value;
     kosarFrissitGUI()
}

// Szures
function szuro(id=-1, params={
    keresettnevek: [],
    tiltottnevek: [],
    minAr: 0,
    maxAr: 18000000
}){
    let zsindex = letezik(id);
    let idgprice = zsindex!=-1 ? listofprice[zsindex] : {ar: 0};
    let both = zsindex != -1 && idgprice.ar >= params.minAr && idgprice.ar <= params.maxAr;
    if(both){
        for(let i = 0; i < keresettnevek; i++){
            
        }
    }
    return both;
}

function szuroparam(id=-1, objectMin={
    szamitsonaszelesseg: false,
    minszelesseg: 0,
    maxszelesseg: 0,
    szamitsonamagassag: false,
    minmagassag: 0,
    maxmagassag: 0,
    szamitsonahosszusag: false,
    minhosszusag: 0,
    maxhosszusag: 0,
    szamitsonazanyag: false,
    anyag: "",
    szamitsonatomorseg: false,
    tomor: null
}){
    return true;
}

// Rendezes


// Képkezelés
function convImageExist(image_url){
    return !imageExists(image_url) || image_url == "" ? "kepek/itsnotexist.png" : image_url;
}

function imageExists(image_url){
    let http = new XMLHttpRequest(); 
    http.open('HEAD', image_url, false);
    http.send();
    
    return http.status != 404;
}




// Segédfüggvények
function mindenhovaodair(HTMLosztaly = "", s = ""){
    let elemek = document.getElementsByClassName(HTMLosztaly);
    for(let i = 0; i < elemek.length; i++){
        elemek[i].innerHTML = s;
    }
}

function mindenhezeventetad(HTMLosztaly, esemeny, fuggveny){
    let elemek = document.getElementsByClassName(HTMLosztaly);
    for(let i = 0; i < elemek.length; i++){
        elemek[i].addEventListener(esemeny, function(){ fuggveny(i) });
    }
}

function mindenhezeventetadwitharray(HTMLosztaly, esemeny, fuggveny, tomb=[{id:-1}]){
    let elemek = document.getElementsByClassName(HTMLosztaly);
    for(let i = 0; i < elemek.length; i++){
        elemek[i].addEventListener(esemeny, function(){ fuggveny(tomb[i].id) });
    }
}

function sum(szamok=[]){
    let sum = 0;
    for(let i = 0; i<szamok.length; i++){
        sum += szamok[i];
    }
    return sum;
}

function sumforjsonar(tomb=[{id:-1, menny: -1}]){
    let sum = 0;
    let zsindex = -1;
    for(let i = 0; i<tomb.length; i++){
        zsindex = letezik(tomb[i].id);
        sum += zsindex != -1 ? listofprice[zsindex].ar * tomb[i].menny : 0;
    }
    return sum;
}

// Event teszt
function eventToDivizio(){
    let s = "";
    for(let i = 0; i < 10; i++){
        s += `<button class="szamotkiir">Nyomj meg!</button>`;
    }
    let a = document.getElementsByClassName("divizio")[0];
    a.innerHTML = s;
    let gombok = document.getElementsByClassName("szamotkiir");
    for(let i = 0; i < 10; i++){
        gombok[i].addEventListener("click", function(){ szamotKiir(i)})
    }
}

function szamotKiir(szam){
    let a = document.getElementsByClassName("theNumber")[0];
    a.innerHTML = szam;
}