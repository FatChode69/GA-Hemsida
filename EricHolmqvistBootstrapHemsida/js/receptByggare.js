var exempelrecept = null;

//Lägger in all information från api:et i funktionerna som skapar objekten på receptsida
function laddaRecept(receptNummer){
    fetch("https://api.spoonacular.com/recipes/" + receptNummer + "/information?apiKey=2d2e090185f54133a4d35f1c69321171&includeNutrition=true.")
    .then(response => response.json())
    .then(response => {
        exempelrecept = response;
        fyllHeader(exempelrecept.title);
        fyllBeskrivning("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium accusantium iusto cum sunt illo fuga eaque, dignissimos qui nemo cupiditate doloremque aperiam, sint aut eveniet consequuntur quae totam odit maiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi magnam quasi sunt, rem eligendi assumenda explicabo magni provident nobis atque alias repellendus! Excepturi necessitatibus repellat cupiditate nulla asperiores");
        fyllBild(exempelrecept.image);
        fyllIngredienslista(exempelrecept.extendedIngredients);
        fyllInstruktioner(exempelrecept.instructions);
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        fyllHeader("Something seems to have gone wrong, please try again another time or contact us using the form on the front page. :)")
    });
}

function fyllHeader(maten){
    var matItem = document.getElementById("header");
	matItem.innerHTML = maten;
}

function fyllBeskrivning(besk){
    var beskItem = document.getElementById("besk");
    beskItem.innerHTML = besk;
}

function fyllBild(bild){
    var bildItem = document.getElementById("matBild");
    bildItem.src = bild;
}

function skapaIngrediens(ingrediensnamn){
    var listItem = document.createElement("li");
    listItem.innerHTML = ingrediensnamn;
    return listItem;
}

function fyllIngredienslista(ingredienser){
    ingredienser.forEach(ing => {
        var ingItem = document.getElementById("ingredientList");
        ingItem.appendChild(skapaIngrediens(ing.amount + " " + ing.unit + " " + ing.name));
    }); 
}

function fyllInstruktioner(instruktioner){
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
        fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&apiKey=2d2e090185f54133a4d35f1c69321171&includeNutrition=true")
    .then(response => response.json())
    .then(response => {
        console.log(response);
        console.log(response.totalResults);
        if (response.totalResults === 0) {
            resultatbox.innerHTML = "No recepies was found using the searchterm '" + searchTerm + "'.";
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