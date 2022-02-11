var exampleProduct = null;

//Lägger in all information från api:et i funktionerna som skapar objekten på productPage
function loadProduct(productNumber){
    fetch("../api/products.php" + "?productId=" + productNumber)
    .then(response => response.json())
    .then(jsonResponse => {
        exampleProduct = jsonResponse;
        //TODO: Vet inte hur man kollar på ett specifikt objekt eller hur man får fram bara en id
        console.log(exampleProduct.name);
        console.log("products.php");
        console.log(exampleProduct);

        fillId(exampleProduct.id);
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

function fillId(idNumber){
    var idItem = document.getElementById("idTag");
	idItem.value = idNumber;
}

function fillHeader(name){
    var nameItem = document.getElementById("header");
	nameItem.innerHTML = name;
}

function fillPrice(price){
    var priceItem = document.getElementById("priceTag");
    priceItem.innerHTML = price;
}

function fillQuantity(quantity){
    var quantityItem = document.getElementById("quantityTag");
    quantityItem.max = quantity;
}

function fillPicture(picture){
    var pictureItem = document.getElementById("pictureTag");
    pictureItem.src = picture;
}

function fillDesc(desc){
    var descItem = document.getElementById("descriptionTag");
    descItem.innerHTML = desc;
}

function bild1(picture){
    var pictureItem = document.getElementById("bild1");
    pictureItem.src = picture;
}
function bild2(picture){
    var pictureItem = document.getElementById("bild2");
    pictureItem.src = picture;
}
function bild3(picture){
    var pictureItem = document.getElementById("bild3");
    pictureItem.src = picture;
}
function bild4(picture){
    var pictureItem = document.getElementById("bild4");
    pictureItem.src = picture;
}
function bild5(picture){
    var pictureItem = document.getElementById("bild5");
    pictureItem.src = picture;
}
function bild6(picture){
    var pictureItem = document.getElementById("bild6");
    pictureItem.src = picture;
}
function text1(text){
    var textItem = document.getElementById("text1");
    textItem.innerHTML = text;
}
function text2(text){
    var textItem = document.getElementById("text2");
    textItem.innerHTML = text;
}
function text3(text){
    var textItem = document.getElementById("text3");
    textItem.innerHTML = text;
}
function text4(text){
    var textItem = document.getElementById("text4");
    textItem.innerHTML = text;
}
function text5(text){
    var textItem = document.getElementById("text5");
    textItem.innerHTML = text;
}
function text6(text){
    var textItem = document.getElementById("text6");
    textItem.innerHTML = text;
}

function makePic() {
    fetch("../api/products.php" + "?productId=1")
    .then(response => response.json())
    .then(jsonResponse => {
        bild1(jsonResponse.picture);
        text1(jsonResponse.name);
    })
    fetch("../api/products.php" + "?productId=2")
    .then(response => response.json())
    .then(jsonResponse => {
        bild2(jsonResponse.picture);
        text2(jsonResponse.name);
    })
    fetch("../api/products.php" + "?productId=3")
    .then(response => response.json())
    .then(jsonResponse => {
        bild3(jsonResponse.picture);
        text3(jsonResponse.name);
    })
    fetch("../api/products.php" + "?productId=4")
    .then(response => response.json())
    .then(jsonResponse => {
        bild4(jsonResponse.picture);
        text4(jsonResponse.name);
    })
    fetch("../api/products.php" + "?productId=5")
    .then(response => response.json())
    .then(jsonResponse => {
        bild5(jsonResponse.picture);
        text5(jsonResponse.name);
    })
    fetch("../api/products.php" + "?productId=6")
    .then(response => response.json())
    .then(jsonResponse => {
        bild6(jsonResponse.picture);
        text6(jsonResponse.name);
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        fillHeader("Something seems to have gone wrong, please try again another time or contact us using the form on the front page. :)")
    });
}

//Lägger in all information från api:et i en sökkolumn som funktionen skapar på index sidan
function searchProd() {
    let searchBar = document.getElementById("search");
    let searchTerm = searchBar.value;

    let resultatbox = document.getElementById("resultat");
 
    resultatbox.innerHTML = null;

    console.log(searchTerm);
    if (searchTerm === ""){
        window.location.reload();}
    else {
    fetch("../api/products.php" + "?searchTerm=" + searchTerm)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if (response.length == 0) {
            resultatbox.innerHTML = "No products were found using this searchterm: '" + searchTerm + "'.";
            console.log("Inget resultat :(");
        }
        else{
            let goods = response;
            for (let index = 0; index < goods.length; index++) {
<<<<<<< HEAD
                let receptRad = document.createElement("tr");
                receptRad.className="col-md-12 sokKolomn rounded";
=======
                let prodRad = document.createElement("tr");
                prodRad.className="col-md-8";
>>>>>>> 9a9d84f02f00dd50cdc85a00f1ec86b837db9dc8
                
                let bildTd = document.createElement("td");
                bildTd.className="sokBildKolumn";
                let bild = document.createElement("img");
                bild.src = goods[index].picture;
                bild.className="sokBild";
                bildTd.appendChild(bild);


                let titelTd = document.createElement("td");
                let a = document.createElement("a");
                a.href = "productPage.html?productId=" + goods[index].id;
                a.innerHTML = goods[index].name;
                a.className="sokText";
                titelTd.appendChild(a);
        
                prodRad.appendChild(bildTd);
                prodRad.appendChild(titelTd);

                resultatbox.appendChild(prodRad);
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


makePic();