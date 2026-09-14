$ErrorActionPreference = "Stop"

function Slugify($text) {
    $slug = $text.ToLower() -replace '[^a-z0-9]+', '-'
    return $slug.Trim('-')
}

function Get-ColourFromName($name) {
    $colours = @('pink', 'cream', 'brown', 'cyan', 'white', 'floral', 'vintage')
    foreach ($colour in $colours) {
        if ($name.ToLower().Contains($colour)) { return $colour }
    }
    return 'assorted vintage tones'
}

function Get-Description($name, $category) {
    $intros = @{
        tops = "this handpicked top from chantal's closet brings a soft, dreamy feel to everyday outfits."
        bottoms = "these vintage bottoms were chosen for their flattering fit and easy, wearable charm."
        bags = "this little bag is the kind of treasure that finishes an outfit and carries your daily essentials with style."
        shoes = "these shoes offer a pretty vintage-inspired finish to any look, with comfort for all-day wear."
    }
    return "$($intros[$category]) the $name has been carefully selected for its quality, character, and whimsical details. each piece is one-of-a-kind, lightly loved, and ready for a new chapter in your wardrobe. style it with your favourite pieces from our closet or let it become the star of a simple, romantic outfit"
}

function Build-Products($names, $images, $basePrice, $startingPrices) {
    $products = @()
    for ($i = 0; $i -lt $names.Count; $i++) {
        if ($startingPrices -and $i -lt $startingPrices.Count) {
            $price = $startingPrices[$i]
        } else {
            $price = $basePrice + (($i % 5) * 25)
        }
        $products += [PSCustomObject]@{
            id = Slugify $names[$i]
            name = $names[$i]
            price = $price
            image = $images[$i]
        }
    }
    return $products
}

function Build-OrderEnquiryForm($productId, $productName) {
    return @"

    <section class="order-enquiry-section">
      <h2>order enquiry</h2>
      <p class="order-enquiry-intro">ask about ordering the $productName</p>

      <form class="order-enquiry-form" action="#" method="post">

        <input type="hidden" name="product" value="$productName">

        <label for="$productId-quantity">quantity</label>
        <input
          type="number"
          id="$productId-quantity"
          name="quantity"
          min="1"
          max="20"
          value="1"
          required
        >

        <fieldset class="order-enquiry-fieldset">
          <legend>how would you like your order delivered?</legend>

          <div class="choice-option">
            <input
              type="radio"
              id="$productId-delivery-standard"
              name="delivery"
              value="standard"
              required
            >
            <label for="$productId-delivery-standard">standard delivery</label>
          </div>

          <div class="choice-option">
            <input
              type="radio"
              id="$productId-delivery-express"
              name="delivery"
              value="express"
            >
            <label for="$productId-delivery-express">express delivery</label>
          </div>

          <div class="choice-option">
            <input
              type="radio"
              id="$productId-delivery-pickup"
              name="delivery"
              value="pickup"
            >
            <label for="$productId-delivery-pickup">local pickup</label>
          </div>
        </fieldset>

        <fieldset class="order-enquiry-fieldset">
          <legend>optional extras</legend>

          <div class="choice-option">
            <input
              type="checkbox"
              id="$productId-extra-gift"
              name="extras"
              value="gift-wrapping"
            >
            <label for="$productId-extra-gift">gift wrapping</label>
          </div>

          <div class="choice-option">
            <input
              type="checkbox"
              id="$productId-extra-express"
              name="extras"
              value="express-handling"
            >
            <label for="$productId-extra-express">express handling</label>
          </div>

          <div class="choice-option">
            <input
              type="checkbox"
              id="$productId-extra-note"
              name="extras"
              value="personal-note"
            >
            <label for="$productId-extra-note">personal note card</label>
          </div>
        </fieldset>

        <label for="$productId-email">contact email</label>
        <input
          type="email"
          id="$productId-email"
          name="email"
          placeholder="your email"
          required
        >

        <button type="submit" class="order-enquiry-button">send order enquiry</button>

      </form>
    </section>
"@
}

function Build-PageHtml($product, $category, $material, $size) {
    $titleName = (Get-Culture).TextInfo.ToTitleCase($product.name)
    $colour = Get-ColourFromName $product.name
    $description = Get-Description $product.name $category
    $imagePath = "../$($product.image)"

    @"
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chantal's Closet | $titleName</title>
  <link rel="stylesheet" href="../style.css">
</head>

<body class="product-detail-page">

  <header class="site-header">
    <h1 class="logo">chantal's closet</h1>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../contact.html">Contact</a></li>
        <li><a href="../clothes.html">clothes</a></li>
        <li><a href="../buy.html" class="buy-link">buy</a></li>
        <li><a href="../account.html" class="account-link">account</a></li>
      </ul>
    </nav>
  </header>

  <main class="product-detail-content">

    <p class="small-heading">a little treasure</p>

    <h1>$($product.name)</h1>

    <div class="product-detail-layout">

      <img
        class="product-detail-image"
        src="$imagePath"
        alt="$titleName from Chantal's Closet"
      >

      <div class="product-detail-info">

        <p class="product-detail-description">
          $description
        </p>

        <table class="product-specs-table">
          <tr>
            <th>material</th>
            <td>$material</td>
          </tr>
          <tr>
            <th>size</th>
            <td>$size</td>
          </tr>
          <tr>
            <th>colour</th>
            <td>$colour</td>
          </tr>
          <tr>
            <th>price</th>
            <td>&#8369;$($product.price)</td>
          </tr>
        </table>

        <div class="product-detail-actions">
          <button
            type="button"
            class="add-to-basket-btn product-detail-basket-btn"
            data-id="$($product.id)"
            data-name="$($product.name)"
            data-price="$($product.price)"
            data-image="$imagePath"
          >add to basket</button>

          <button
            type="button"
            class="shop-button product-detail-button"
            onclick="location.href='../clothes.html#$category'"
          >
            back to $category
          </button>
        </div>

      </div>

    </div>
$(Build-OrderEnquiryForm $product.id $product.name)
  </main>

  <footer class="site-footer">
    <p class="small-heading">thank you for visiting</p>
    <p>chantal's closet, dreamy thrifted finds</p>

    <nav class="footer-nav" aria-label="Footer">
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../contact.html">Contact</a></li>
      </ul>
    </nav>
  </footer>

  <script src="../basket.js"></script>
  <script>
    document.querySelector(".product-detail-basket-btn").addEventListener("click", function() {
      const button = this;

      addToBasket({
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image.replace("../", "")
      });

      const originalText = button.textContent;
      button.textContent = "added";
      button.disabled = true;

      setTimeout(function() {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  </script>

</body>
</html>
"@
}

$outputDir = Join-Path $PSScriptRoot "..\products"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$categories = @{
    tops = @{
        names = @(
            "pink floral top","cream knit top","ribbon blouse","vintage lace camisole","floral button-up blouse",
            "embroidered peasant blouse","vintage satin blouse","puff-sleeve blouse","ruffled collar blouse",
            "cropped knit cardigan","vintage striped polo","peter pan collar top","crochet halter top",
            "eyelet cotton blouse","vintage denim shirt","ribbon-tie blouse","sheer floral blouse",
            "vintage embroidered top","argyle knit sweater","off-shoulder vintage blouse","vintage velvet blouse"
        )
        images = @(
            "assets/pinkfloral.jpg","assets/creamknit.jpg","assets/ribbonblouse.jpg","assets/vintagelacecamisole.jpg",
            "assets/floralbuttonup.jpg","assets/embroideredpeasantblouse.jpg","assets/vintagesatinblouse.jpg",
            "assets/puffsleeveblouse.jpg","assets/ruffledcollarblouse.jpg","assets/croppedknitcardigan.jpg",
            "assets/vintagestripedpolo.jpg","assets/peterpancollartop.jpg","assets/crochethaltertop.jpg",
            "assets/eyelettcottonblouse.jpg","assets/vintagedenimshirt.jpg","assets/ribbontieblouse.jpg",
            "assets/sheerfloralblouse.jpg","assets/vintageembroideredtop.jpg","assets/argyleknitsweater.jpg",
            "assets/offshouldervintageblouse.jpg","assets/vintagevelvetblouse.jpg"
        )
        basePrice = 350
        startingPrices = @(350, 400, 450)
        material = "lightweight cotton blend"
        size = "S-XL"
    }
    bottoms = @{
        names = @(
            "vintage denim skirt","brown pleated skirt","classic wide leg pants","vintage corduroy pants",
            "high-waisted mom jeans","pleated midi skirt","floral maxi skirt","vintage plaid skirt",
            "corduroy mini skirt","denim maxi skirt","high-waisted linen pants","vintage culottes",
            "pinstripe trousers","a-line midi skirt","floral pleated skirt","vintage cargo pants",
            "high-waisted straight-leg jeans","brown corduroy skirt","vintage checkered trousers",
            "embroidered denim skirt","vintage denim shorts"
        )
        images = @(
            "assets/vintagedenimskirt.jpg","assets/brownpleatedskirt.jpg","assets/classicwidelegpants.jpg",
            "assets/vintagecorduroypants.jpg","assets/highwaistedmomjeans.jpg","assets/pleatedmidiskirt.jpg",
            "assets/floralmaxiskirt.jpg","assets/vintageplaidskirt.jpg","assets/corduroyminiskirt.jpg",
            "assets/denimmaxiskirt.jpg","assets/highwaistedlinenpants.jpg","assets/vintageculottes.jpg",
            "assets/pinstrippetrousers.jpg","assets/alinmidiskirt.jpg","assets/floralpleatedskirt.jpg",
            "assets/vintagecargopants.jpg","assets/highwaistedstraightlegjeans.jpg","assets/browncorduroyskirt.jpg",
            "assets/vintagecheckeredtrousers.jpg","assets/embroidereddenimskirt.jpg","assets/vintagedenimshorts.jpg"
        )
        basePrice = 450
        startingPrices = @(500, 450, 550)
        material = "vintage cotton and denim blend"
        size = "S-XL"
    }
    bags = @{
        names = @(
            "pink shoulder bag","vintage brown bag","cyan mini bag","vintage leather shoulder bag",
            "quilted mini handbag","floral tapestry bag","vintage beaded purse","woven basket bag",
            "brown suede shoulder bag","mini baguette bag","vintage frame handbag","crochet shoulder bag",
            "patchwork tote bag","vintage canvas messenger bag","pearl-handle handbag","embroidered tote bag",
            "small vintage satchel","woven mini handbag","vintage box purse","floral print shoulder bag",
            "vintage wicker handbag"
        )
        images = @(
            "assets/pinkshoulderbag.jpg","assets/brownvintagehandbag.jpg","assets/cyanbag.jpg",
            "assets/vintageleathershoulderbag.jpg","assets/quiltedminihandbag.jpg","assets/floraltapestrybag.jpg",
            "assets/vintagebeadedpurse.jpg","assets/wovenbasketbag.jpg","assets/brownsuedeshoulderbag.jpg",
            "assets/minibaguettebag.jpg","assets/vintageframehandbag.jpg","assets/crochetshoulderbag.jpg",
            "assets/patchworktotebag.jpg","assets/vintagecanvasmessengerbag.jpg","assets/pearlhandlehandbag.jpg",
            "assets/embroideredtotebag.jpg","assets/smallvintagesatchel.jpg","assets/wovenminihandbag.jpg",
            "assets/vintageboxpurse.jpg","assets/floralprintshoulderbag.jpg","assets/vintagewickerhandbag.jpg"
        )
        basePrice = 550
        startingPrices = @(600, 650, 550)
        material = "vintage mixed materials"
        size = "one size"
    }
    shoes = @{
        names = @(
            "white mary janes","classic brown loafers","cream ballet flats","vintage mary jane flats",
            "brown leather loafers","vintage lace-up boots","floral ballet flats","t-strap mary janes",
            "vintage kitten heels","cream leather loafers","suede ankle boots","vintage platform sandals",
            "brown leather sandals","bow-detail ballet flats","vintage oxford shoes","woven sandals",
            "low block heels","vintage slingback heels","cream mary jane heels","retro canvas sneakers",
            "vintage pointed-toe pumps"
        )
        images = @(
            "assets/whitemaryjanes.jpg","assets/brownloafers.jpg","assets/creamballetflats.jpg",
            "assets/vintagemaryjaneflats.jpg","assets/brownleatherloafers.jpg","assets/vintagelaceupboots.jpg",
            "assets/floralballetflats.jpg","assets/tstrapmaryjanes.jpg","assets/vintagekittenheels.jpg",
            "assets/creamleatherloafers.jpg","assets/suedeankleboots.jpg","assets/vintageplatformsandals.jpg",
            "assets/brownleathersandals.jpg","assets/bowdetailballetflats.jpg","assets/vintageoxfordshoes.jpg",
            "assets/wovensandals.jpg","assets/lowblockheels.jpg","assets/vintageslingbackheels.jpg",
            "assets/creammaryjaneheels.jpg","assets/retrocanvassneakers.jpg","assets/vintagepointedtoepumps.jpg"
        )
        basePrice = 650
        startingPrices = @(750, 800, 700)
        material = "leather and synthetic blend"
        size = "S-XL"
    }
}

$count = 0
foreach ($category in $categories.Keys) {
    $config = $categories[$category]
    $products = Build-Products $config.names $config.images $config.basePrice $config.startingPrices
    foreach ($product in $products) {
        $html = Build-PageHtml $product $category $config.material $config.size
        $filePath = Join-Path $outputDir ($product.id + ".html")
        Set-Content -Path $filePath -Value $html -Encoding UTF8
        $count++
    }
}

Write-Output "Generated $count product detail pages in products/"
