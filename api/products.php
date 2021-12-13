<meta charset="UTF-8">
<?php
header('Content-Type: application/json; charset=utf-8');
$sql = "SELECT * FROM `products`;";
$servername = "localhost";
$username = "root";
$password = "";
$database = "remmacs_tech";
$conn = mysqli_connect($servername, $username, $password, $database);
$result = $conn->query($sql);

$products = [];
#echo "Num rows: ". $result->num_rows;
if (($result->num_rows) > 0) {
    $index = 0;
    while($row = $result->fetch_assoc()) {
        $products[$index] = $row;
        $products[$index]['id'] = intval($row["id"]);
        $products[$index]['quantity'] = intval($row["quantity"]);
        $products[$index]['price'] = doubleval($row["price"]);
        $index++;
	}
}
$conn->close();

echo json_encode($products);
?>