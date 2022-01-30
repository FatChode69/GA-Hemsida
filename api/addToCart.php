<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Product</title>

      <!-- Bootstrap -->
      <link href="../självahemsidan/css/bootstrap-4.4.1.css" rel="stylesheet">
      
      <!-- Inported Font -->
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400&display=swap" rel="stylesheet">
      
      <!-- style -->
      <link href="../självahemsidan/css/style.css" rel="stylesheet">
  </head>
  <body id="body">
	<!--Denna gör min Navbar-->
   <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
		<a href="index.html">
         <img class="navbar-brand logo" alt="Picture not found." src="images/matlogga3.png">
      </a>

		<!--Här så görs mina nav-items en hamburgermeny när skärmen blir liten-->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <!--Mina länkar-->
      <section class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
               <a class="nav-link" href="../självahemsidan/index.html">Home</a>
            </li>
             
            <li class="nav-item active">
               <a class="nav-link" href="../självahemsidan/index.html#contactUs">Contact Us</a>
            </li>
         </ul>
      </section>
   </nav>
	
   <div class="background">
   <br>
   <br>
   <br>
   
   <!--Vad maträtten heter-->
   <header id="header" class="container rounded col-lg-8 box matTitel">
   </header>

   <br>
   <br>

   <main class="container">
    

        <table id="resultat" class="container rounded col-lg-8 box">
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "remmacs_tech";
        $conn = mysqli_connect($servername, $username, $password, $database);

        session_start();
        //session_reset();
        #$_SESSION["idTag"] = $_POST["idTag"];


        if (empty($_SESSION["cart"])){
        $_SESSION["cart"] = [];
        }

        $key = array_search($_POST["idTag"], array_column($_SESSION["cart"], 'id'));

        if (($key)){
            echo("Unsetting key " . $key);
            unset($_SESSION["cart"][$key]);
        }

        $nyProdukt = array(
            "id" => $_POST["idTag"], 
            "quantity" => $_POST["quantityTag"]);
        array_push($_SESSION["cart"], $nyProdukt);

        
        $sql = 'SELECT * FROM products WHERE id IN (-1';
        foreach ($_SESSION["cart"] as $value) {
            $sql = $sql . ", " . $value["id"];
        }
        $sql = $sql . ")";
        
        $result = $conn->query($sql);
        
        $x=0;
        if (($result->num_rows) > 0) {
            while($row = $result->fetch_assoc()) {
                foreach ($_SESSION["cart"] as $value) {
                if ($row['id'] == $value['id']){
                        $cartQuantity = $value['quantity'];
                    }
                }
                echo ($row['name']);
                echo('<tr class="col-md-8">');
                echo('    <td class="sokBildKolumn"><img src="' . $row['picture'] . '"');
                echo('            class="sokBild"></td>');
                echo('    <td><a href="productPage.html?productId=' . $row["id"] . '" class="sokText">' . $row['name'] . '</a>'. $cartQuantity .'</td>');
                echo('</tr>');
            }
        }
    ?>
        </table>
   </main>

   <!--Min fotter-->
   <footer class="container">
      <div class="row">
         <div class="text-center col-lg-6 offset-lg-3">
            <p>Copyright &copy; 2021 &middot; Knife and Fork Kitchen</p>
         </div>
      </div>
   </footer>
   </div>

   <!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
   <script src="../självahemsidan/js/jquery-3.4.1.min.js"></script>

   <!-- Include all compiled plugins (below), or include individual files as needed --> 
   <script src="../självahemsidan/js/popper.min.js"></script>
   <script src="../självahemsidan/js/bootstrap-4.4.1.js"></script>
	  
   <!--Här är mina Java-Script recept--> 
  </body>
</html>