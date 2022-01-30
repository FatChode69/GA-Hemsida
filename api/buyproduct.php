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
   
    <!--Header-->
    <header class="container rounded col-lg-8 box matTitel">
        Betalning
    </header>



    <br>
    <!--Information från köparen-->
    <section id="contactUs" class="mb-4 col-lg-8 mx-auto box">
    <h2 class="h1-responsive font-weight-bold text-center my-4">Din kundkorg kostar: 
    <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "remmacs_tech";
        $conn = mysqli_connect($servername, $username, $password, $database);

        session_start();

        $sql = 'SELECT * FROM products WHERE id IN (-1';
        foreach ($_SESSION["cart"] as $value) {
            if (is_numeric($value["id"])) {
                $sql = $sql . ", " . $value["id"];
            }
        }
        $sql = $sql . ")";

        $result = $conn->query($sql);

        $cartSum = 0;

        if (($result->num_rows) > 0) {
            while($row = $result->fetch_assoc()) {
                foreach ($_SESSION["cart"] as $value) {
                    if ($row['id'] == $value['id']){
                        $cartQuantity = $value['quantity'];
                        $prodSum = $cartQuantity * $row['price']; 
                        $cartSum = $cartSum + $prodSum;
                    } 
                }
            }
        }
    echo $cartSum;
    ?>

    </h2>
        
    <form id="contact-form" name="contact-form" method="POST">
        <div class="row">
        <div class="col-md-6 mb-md-0 mb-5">
                <div class="row">
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="förnamn" name="förnamn" class="form-control" placeholder="förnamn" required pattern="[A-Za-zåäöÅÄÖ ]+">
                            <label for="förnamn" class=""></label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="efternamn" name="efternamn" class="form-control" placeholder="Efternamn" required pattern="[A-Za-zåäöÅÄÖ ]+">
                            <label for="efternamn" class=""></label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="email" name="email" class="form-control" placeholder="Email" required pattern="[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+">
                            <label for="email" class=""></label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="address" name="address" class="form-control" placeholder="Address" required pattern="[A-Za-zåäöÅÄÖ .?!]+">
                            <label for="address" class=""></label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form">
                            <input id="ort" name="ort" rows="2" placeholder="Ort" class="form-control md-textarea" required maxlength="20"></textarea>
                            <label for="ort"></label>
                        </div>
                    </div>
                </div>

        </div>
        <div class="col-md-6 mb-md-0 mb-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                        <input type="text" id="kort" name="kort" class="form-control" placeholder="Kortnummer" required pattern="[0-9]{16}">
                        <label for="kort" class=""></label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-5">
                    <div class="md-form mb-0">
                        <input type="number" id="månad" name="månad" class="form-control" placeholder="Förfallodatum månad" required min="1" max="12">
                        <label for="månad" class=""></label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="md-form mb-0">
                        <input type="number" id="år" name="år" class="form-control" placeholder="Förfallodatum år" required min="22" max="47">
                        <label for="år" class=""></label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="md-form mb-0">
                        <input type="text" id="cvc" name="cvc" class="form-control" placeholder="CVC" maxlength="3" required pattern="[0-9]{3}">
                        <label for="cvc" class=""></label>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                        <input type="text" id="post" name="post" class="form-control" placeholder="Postkod" required pattern="[0-9]{5}">
                        <label for="post" class=""></label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                        <input type="text" id="tele" name="tele" class="form-control" placeholder="telefonnummer" required pattern="^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$">
                        <label for="tele" class=""></label>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
            
        <div class="status"></div>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" onclick="getValidation()">Send</button>
        </div>
    </form>
    </section>
    <!--Slutet av mitt kontakt formulär-->


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
	<script src="../självahemsidan/js/productBuilder.js"></script>
   <script src="../självahemsidan/js/productPage.js"></script>
  </body>
</html>