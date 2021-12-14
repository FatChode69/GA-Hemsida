<?php
#$user_products = $_POST['productsInCart'];
#Detta är testdata POST är det som kommer egentligen användas

$user_products = array (array("id" => "1", "quantity" => "2"), array("id" => "2", "quantity" => "4"));

#hur det typ ser ut i json
/* {
    "productsInCart": [
        {"id": 1, "quantity": 2},
        {"id": 2, "quantity": 4}
    ]
} */

#lista med id:n från kundvagnen
$user_product_ids = array_column($user_products, 'id');

header('Content-Type: application/json; charset=utf-8');
#$sql gör en sql för att ladda alla id:n
$sql = "SELECT * FROM `products` where `id` IN (" . implode(",", $user_product_ids) . ");";
$servername = "localhost";
$username = "root";
$password = "";
$database = "remmacs_tech";
$conn = mysqli_connect($servername, $username, $password, $database);
$result = $conn->query($sql);


if (($result->num_rows) > 0) {
    $index = 0;
    while($row = $result->fetch_assoc()) {
        #TODO: Jag ska jobba vidare här. Måste matcha databasprodukterna med user_products...
        if$user_product_ids = $row["id"]{
            if $user_products['quantity'] <=  intval($row["quantity"]){
                $index = intval($row["quantity"]-$user_products['quantity'];
                $sql = "UPDATE products SET quantity=index WHERE $row['id']=$user_product_ids";
            }
        }
        else{
            echo "Error!!!";
        }
/*         if $user_products[$index]['quantity'] <=  intval($row["quantity"]);

        $products[$index] = $row;
        $products[$index]['id'] = intval($row["id"]);
        $products[$index]['quantity'] = intval($row["quantity"]);
        $products[$index]['price'] = doubleval($row["price"]);
        $index++; */
	}
}
$conn->close();

echo json_encode($products);
?>