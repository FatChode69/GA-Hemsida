function fillId() {
    fetch("../api/addToCart.php")
    .then(response => response.json())
    .then(response => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
            let productIdNumber = response[index].id;
            console.log(productIdNumber);
          }
    })
}

    //let productIdNumber = 
function fillCart() {
    fillId();
    fetch("../api/products.php" + "?productId=" + productIdNumber)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if (response.length == 0) {
            cartBox.innerHTML = "Your cart is empty. ";
            console.log("Inget resultat :(");
        }
        else{
            let items = response;
            for (let index = 0; index < items.length; index++) {
                let receptRad = document.createElement("tr");
                receptRad.className="col-md-8";
                
                let bildTd = document.createElement("td");
                bildTd.className="sokBildKolumn";
                let bild = document.createElement("img");
                bild.src = items[index].picture;
                bild.className="sokBild";
                bildTd.appendChild(bild);


                let titelTd = document.createElement("td");
                let a = document.createElement("a");
                a.innerHTML = items[index].name;
                a.className="sokText";
                titelTd.appendChild(a);
        
                receptRad.appendChild(bildTd);
                receptRad.appendChild(titelTd);

                cartBox.appendChild(receptRad);
            }
        } 
    })
    //Skriver ett felmeddelande om den inte når api:et
    .catch(err => {
        console.error(err);
        cartBox.innerHTML = "Something went wrong, please try again later. :)";
    });
}

fillId();