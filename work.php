<?php
    $sketchname = $_GET["name"];
    $headline = "";
    $category = "";
    $linkname = "";

    switch($sketchname) {
        case "circles":
            $linkname="sketches/art_circles/index.html";
            $headline="Circles";
            $category="Generative Art";
            break;
        case "race":
            $linkname="sketches/sim_race/index.html";
            $headline="Race";
            $category="Simulation";
            break;
        case "system":
            $linkname="sketches/sim_system/index.html";
            $headline="System";
            $category="Simulation";
            break;
        case "mountain":      
            $linkname="sketches/sim_blitz/index.html";
            $headline="Mountain";
            $category="Simulation";
            break;
        case "sunset":
            $linkname="sketches/sim_sunset/index.html";
            $headline="Sunset";
            $category="Simulation";
            break;
        case "triangle":
            $linkname="sketches/art_triangles/index.html";
            $headline="Triangles";
            $category="Generative Art";
            break;
        case "infinity":
            $linkname="sketches/load_infinity/index.html";
            $headline="Infinity";
            $category="Loading Icons";
            break;
        case "raindrops":
            $linkname="sketches/sim_tropfen/index.html";
            $headline="Raindrops";
            $category="Simulation";
            break;
        case "helix":
            $linkname="sketches/load_spirale/index.html";
            $headline="Helix";
            $category="Loading Icons";
            break;
        case "squares":
            $linkname="sketches/load_squares/index.html";
            $headline="Squares";
            $category="Loading Icons";
            break;
        case "atom":
            $linkname="sketches/sim_atom/index.html";
            $headline="Atom";
            $category="Simulation";
            break;
        case "fan":    
            $linkname="sketches/sim_fan/index.html";
            $headline="Fan";
            $category="Simulation";
            break;
        case "arcs":
            $linkname="sketches/sim_graphic/index.html";
            $headline="Arcs";
            $category="Simulation";
            break;
        case "iss":
            $linkname="sketches/viz_iss/index.html";
            $headline="ISS";
            $category="Data Visualization";
            break;
    }
?>

<!DOCTYPE html>
<html lang="en">

    <!-- Basic -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">   
   
    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 
     <!-- Site Metas -->
    <title>Mathias Fontain | p5.js</title>  
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Site CSS -->
    <link rel="stylesheet" href="style.css">
    <!-- Venobox CSS -->
    <link rel="stylesheet" href="js/venobox/venobox.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body> 

    <!-- LOADER -->
    <div id="preloader">
        <img class="preloader" src="images/loader.gif" alt="">
    </div><!-- end loader -->
    <!-- END LOADER -->

    <div id="wrapper">


        <div class="section lb">
            <div class="container">
                <div class="row intro text-center wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                    <div class="col-md-10 col-md-offset-1 col-sm-12">
                        <h1><?php echo $headline ?></h1>
                        <p><?php echo $category ?></p>
                    </div><!-- end col -->
                </div><!-- end row -->
            </div>
        </div>


        <div class="sketch">
            <iframe src="<?php echo $linkname ?>" id="sketchFrame" width="100%" height="800px" frameBorder="0"></iframe>
        </div>
        
        <div class="container">                
            <div class="portfolio-share" style="text-align: center;">                    
                <a href="index.html">
                    <button class="btn btn-primary" style="display: inline-block; margin: 0 auto;">Zurück</button>
                </a>
                <button class="btn btn-primary" style="display: inline-block; margin: 0 auto;" onclick="resetSketch()">Reset</button>
                <!--
                <nav class="portfolio-pager">
                    <ul class="pager">
                        <li><a href="work.php?name=system"><i class="fa fa-angle-left"></i></a></li>
                        <li><a href="work.php?name=race"><i class="fa fa-angle-right"></i></a></li>
                    </ul>
                </nav>
                -->
            </div>
        </div> <!-- end container -->

        <div class="copyrights">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <p>&copy;2018 Mathias Fontain</p>
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- end container -->
        </div><!-- end copyrights -->
    </div><!-- end wrapper -->


    <!-- ALL JS FILES -->
    <script src="js/all.js"></script>
    <!-- ALL PLUGINS -->
    <script src="js/custom.js"></script> 

    <!-- PORTFOLIO PLUGINS -->
    <script src="js/venobox/venobox.min.js"></script> 

    <script>
        function resetSketch() {
            var iframe = document.getElementById('sketchFrame');
            iframe.src = iframe.src;
        }
    </script>

</body>
</html>