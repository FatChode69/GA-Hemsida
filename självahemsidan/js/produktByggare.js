var exampleProduct = null;

//Lägger in all information från api:et i funktionerna som skapar objekten på receptsida
function laddaRecept(){
    fetch("products.php")
    .then(response => {
        console.log("products.php");
        console.log(response);
        exampleProduct = response;
        /*
        fillHeader(exampleProduct.title);
        fillBeskrivning("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium accusantium iusto cum sunt illo fuga eaque, dignissimos qui nemo cupiditate doloremque aperiam, sint aut eveniet consequuntur quae totam odit maiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi magnam quasi sunt, rem eligendi assumenda explicabo magni provident nobis atque alias repellendus! Excepturi necessitatibus repellat cupiditate nulla asperiores");
        fillBild(exampleProduct.image);
        fillIngredienslista(exampleProduct.extendedIngredients);
        fillInstruktioner(exampleProduct.instructions);
        */
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        fillHeader("Something seems to have gone wrong, please try again another time or contact us using the form on the front page. :)")
    });
}

function fillHeader(maten){
    var matItem = document.getElementById("header");
	matItem.innerHTML = maten;
}

function fillBeskrivning(besk){
    var beskItem = document.getElementById("besk");
    beskItem.innerHTML = besk;
}

function fillBild(bild){
    var bildItem = document.getElementById("matBild");
    bildItem.src = bild;
}

function skapaIngrediens(ingrediensnamn){
    var listItem = document.createElement("li");
    listItem.innerHTML = ingrediensnamn;
    return listItem;
}

function fillIngredienslista(ingredienser){
    ingredienser.forEach(ing => {
        var ingItem = document.getElementById("ingredientList");
        ingItem.appendChild(skapaIngrediens(ing.amount + " " + ing.unit + " " + ing.name));
    }); 
}

function fillInstruktioner(instruktioner){
    insItem = document.getElementById("instruktioner");
    insItem.innerHTML = instruktioner;
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