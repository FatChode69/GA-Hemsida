var exampleProduct = null;

//Lägger in all information från api:et i funktionerna som skapar objekten på receptsida
function laddaRecept(){
    fetch("../api/products.php")
    .then(response => response.json())
    .then(jsonRespons => {
        exampleProduct = jsonRespons;
        //TODO: Vet inte hur man kollar på ett specifikt objekt eller hur man får fram bara en id
        console.log(exampleProduct.name);
        exampleProduct.id=1;
        console.log("products.php");
        console.log(exampleProduct);

        fillHeader(exampleProduct.name);
        fillPrice(exampleProduct.price);
        fillPicture(exampleProduct.picture);
        fillDesc(exampleProduct.description);
        fillQuantity(exampleProduct.quantity);
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        fillHeader("Something seems to have gone wrong, please try again another time or contact us using the form on the front page. :)")
    });
}

function fillHeader(name){
    var nameItem = document.getElementById("header");
	nameItem.innerHTML = name;
}

function fillPrice(price){
    var priceItem = document.getElementById("besk");
    priceItem.innerHTML = price;
}

function fillQuantity(quantity){
    var quantityItem = document.getElementById("ingredientList");
    quantityItem.innerHTML = quantity;
}

function fillPicture(picture){
    var pictureItem = document.getElementById("matBild");
    pictureItem.src = picture;
}

function fillDesc(desc){
    var descItem = document.getElementById("instruktioner");
    descItem.innerHTML = desc;
}

//Lägger in all information från api:et i en sökkolumn som funktionen skapar på index sidan
function sokRecept() {
    let searchBar = document.getElementById("search");
    let searchTerm = searchBar.value;

    let resultatbox = document.getElementById("resultat");

    resultatbox.innerHTML = null;

    console.log(searchTerm);
    if (searchTerm === ""){
        window.location.reload();}
    else {
        fetch("products.php")
    .then(response => {
        console.log(response);
        console.log(response.totalResults);
        if (response.totalResults === 0) {
            resultatbox.innerHTML = "No products were found using the searchterm: '" + searchTerm + "'.";
        }
        else{
            let dishes = response.results;
            for (let index = 0; index < dishes.length; index++) {
                let receptRad = document.createElement("tr");
                receptRad.className="col-md-8";
                
                let bildTd = document.createElement("td");
                bildTd.className="sokBildKolumn";
                let bild = document.createElement("img");
                bild.src = dishes[index].image;
                bild.className="sokBild";
                bildTd.appendChild(bild);


                let titelTd = document.createElement("td");
                let a = document.createElement("a");
                a.href = "receptsida.html?receptID="+dishes[index].id;
                a.innerHTML = dishes[index].title;
                a.className="sokText";
                titelTd.appendChild(a);
        
                receptRad.appendChild(bildTd);
                receptRad.appendChild(titelTd);

                resultatbox.appendChild(receptRad);
            }
        } 
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        resultatbox.innerHTML = "Something went wrong, please try again later. :)";
    });
    }
}

//Märker om man skriver någonting fel i kontackt formuläret
function getValidation(){
    document.getElementById('contact-form').requestSubmit();
}