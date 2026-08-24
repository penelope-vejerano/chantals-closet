const fs = require("fs");
const path = require("path");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildProducts(names, images, basePrice, startingPrices) {
  return names.map(function(name, index) {
    const price = startingPrices && startingPrices[index] !== undefined
      ? startingPrices[index]
      : basePrice + (index % 5) * 25;

    return {
      id: slugify(name),
      name: name,
      price: price,
      image: images[index]
    };
  });
}

const catalogConfig = {
  tops: {
    names: [
      "pink floral top",
      "cream knit top",
      "ribbon blouse",
      "vintage lace camisole",
      "floral button-up blouse",
      "embroidered peasant blouse",
      "vintage satin blouse",
      "puff-sleeve blouse",
      "ruffled collar blouse",
      "cropped knit cardigan",
      "vintage striped polo",
      "peter pan collar top",
      "crochet halter top",
      "eyelet cotton blouse",
      "vintage denim shirt",
      "ribbon-tie blouse",
      "sheer floral blouse",
      "vintage embroidered top",
      "argyle knit sweater",
      "off-shoulder vintage blouse",
      "vintage velvet blouse"
    ],
    images: [
      "assets/pinkfloral.jpg",
      "assets/creamknit.jpg",
      "assets/ribbonblouse.jpg",
      "assets/vintagelacecamisole.jpg",
      "assets/floralbuttonup.jpg",
      "assets/embroideredpeasantblouse.jpg",
      "assets/vintagesatinblouse.jpg",
      "assets/puffsleeveblouse.jpg",
      "assets/ruffledcollarblouse.jpg",
      "assets/croppedknitcardigan.jpg",
      "assets/vintagestripedpolo.jpg",
      "assets/peterpancollartop.jpg",
      "assets/crochethaltertop.jpg",
      "assets/eyelettcottonblouse.jpg",
      "assets/vintagedenimshirt.jpg",
      "assets/ribbontieblouse.jpg",
      "assets/sheerfloralblouse.jpg",
      "assets/vintageembroideredtop.jpg",
      "assets/argyleknitsweater.jpg",
      "assets/offshouldervintageblouse.jpg",
      "assets/vintagevelvetblouse.jpg"
    ],
    basePrice: 350,
    startingPrices: [350, 400, 450],
    material: "lightweight cotton blend",
    size: "medium (fits UK 8–10)"
  },
  bottoms: {
    names: [
      "vintage denim skirt",
      "brown pleated skirt",
      "classic wide leg pants",
      "vintage corduroy pants",
      "high-waisted mom jeans",
      "pleated midi skirt",
      "floral maxi skirt",
      "vintage plaid skirt",
      "corduroy mini skirt",
      "denim maxi skirt",
      "high-waisted linen pants",
      "vintage culottes",
      "pinstripe trousers",
      "a-line midi skirt",
      "floral pleated skirt",
      "vintage cargo pants",
      "high-waisted straight-leg jeans",
      "brown corduroy skirt",
      "vintage checkered trousers",
      "embroidered denim skirt",
      "vintage denim shorts"
    ],
    images: [
      "assets/vintagedenimskirt.jpg",
      "assets/brownpleatedskirt.jpg",
      "assets/classicwidelegpants.jpg",
      "assets/vintagecorduroypants.jpg",
      "assets/highwaistedmomjeans.jpg",
      "assets/pleatedmidiskirt.jpg",
      "assets/floralmaxiskirt.jpg",
      "assets/vintageplaidskirt.jpg",
      "assets/corduroyminiskirt.jpg",
      "assets/denimmaxiskirt.jpg",
      "assets/highwaistedlinenpants.jpg",
      "assets/vintageculottes.jpg",
      "assets/pinstrippetrousers.jpg",
      "assets/alinmidiskirt.jpg",
      "assets/floralpleatedskirt.jpg",
      "assets/vintagecargopants.jpg",
      "assets/highwaistedstraightlegjeans.jpg",
      "assets/browncorduroyskirt.jpg",
      "assets/vintagecheckeredtrousers.jpg",
      "assets/embroidereddenimskirt.jpg",
      "assets/vintagedenimshorts.jpg"
    ],
    basePrice: 450,
    startingPrices: [500, 450, 550],
    material: "vintage cotton and denim blend",
    size: "medium (fits UK 8–10)"
  },
  bags: {
    names: [
      "pink shoulder bag",
      "vintage brown bag",
      "cyan mini bag",
      "vintage leather shoulder bag",
      "quilted mini handbag",
      "floral tapestry bag",
      "vintage beaded purse",
      "woven basket bag",
      "brown suede shoulder bag",
      "mini baguette bag",
      "vintage frame handbag",
      "crochet shoulder bag",
      "patchwork tote bag",
      "vintage canvas messenger bag",
      "pearl-handle handbag",
      "embroidered tote bag",
      "small vintage satchel",
      "woven mini handbag",
      "vintage box purse",
      "floral print shoulder bag",
      "vintage wicker handbag"
    ],
    images: [
      "assets/pinkshoulderbag.jpg",
      "assets/brownvintagehandbag.jpg",
      "assets/cyanbag.jpg",
      "assets/vintageleathershoulderbag.jpg",
      "assets/quiltedminihandbag.jpg",
      "assets/floraltapestrybag.jpg",
      "assets/vintagebeadedpurse.jpg",
      "assets/wovenbasketbag.jpg",
      "assets/brownsuedeshoulderbag.jpg",
      "assets/minibaguettebag.jpg",
      "assets/vintageframehandbag.jpg",
      "assets/crochetshoulderbag.jpg",
      "assets/patchworktotebag.jpg",
      "assets/vintagecanvasmessengerbag.jpg",
      "assets/pearlhandlehandbag.jpg",
      "assets/embroideredtotebag.jpg",
      "assets/smallvintagesatchel.jpg",
      "assets/wovenminihandbag.jpg",
      "assets/vintageboxpurse.jpg",
      "assets/floralprintshoulderbag.jpg",
      "assets/vintagewickerhandbag.jpg"
    ],
    basePrice: 550,
    startingPrices: [600, 650, 550],
    material: "vintage mixed materials",
    size: "one size"
  },
  shoes: {
    names: [
      "white mary janes",
      "classic brown loafers",
      "cream ballet flats",
      "vintage mary jane flats",
      "brown leather loafers",
      "vintage lace-up boots",
      "floral ballet flats",
      "t-strap mary janes",
      "vintage kitten heels",
      "cream leather loafers",
      "suede ankle boots",
      "vintage platform sandals",
      "brown leather sandals",
      "bow-detail ballet flats",
      "vintage oxford shoes",
      "woven sandals",
      "low block heels",
      "vintage slingback heels",
      "cream mary jane heels",
      "retro canvas sneakers",
      "vintage pointed-toe pumps"
    ],
    images: [
      "assets/whitemaryjanes.jpg",
      "assets/brownloafers.jpg",
      "assets/creamballetflats.jpg",
      "assets/vintagemaryjaneflats.jpg",
      "assets/brownleatherloafers.jpg",
      "assets/vintagelaceupboots.jpg",
      "assets/floralballetflats.jpg",
      "assets/tstrapmaryjanes.jpg",
      "assets/vintagekittenheels.jpg",
      "assets/creamleatherloafers.jpg",
      "assets/suedeankleboots.jpg",
      "assets/vintageplatformsandals.jpg",
      "assets/brownleathersandals.jpg",
      "assets/bowdetailballetflats.jpg",
      "assets/vintageoxfordshoes.jpg",
      "assets/wovensandals.jpg",
      "assets/lowblockheels.jpg",
      "assets/vintageslingbackheels.jpg",
      "assets/creammaryjaneheels.jpg",
      "assets/retrocanvassneakers.jpg",
      "assets/vintagepointedtoepumps.jpg"
    ],
    basePrice: 650,
    startingPrices: [750, 800, 700],
    material: "leather and synthetic blend",
    size: "UK 5–6 (EU 38–39)"
  }
};

function getColourFromName(name) {
  const colours = ["pink", "cream", "brown", "cyan", "white", "floral", "vintage"];
  const found = colours.find(function(colour) {
    return name.toLowerCase().includes(colour);
  });
  return found || "assorted vintage tones";
}

function buildDescription(product, category) {
  const intros = {
    tops: "this handpicked top from chantal's closet brings a soft, dreamy feel to everyday outfits.",
    bottoms: "these vintage bottoms were chosen for their flattering fit and easy, wearable charm.",
    bags: "this little bag is the kind of treasure that finishes an outfit and carries your daily essentials with style.",
    shoes: "these shoes offer a pretty vintage-inspired finish to any look, with comfort for all-day wear."
  };

  return (
    intros[category] +
    " the " + product.name + " has been carefully selected for its quality, character, and whimsical details. " +
    "each piece is one-of-a-kind, lightly loved, and ready for a new chapter in your wardrobe. " +
    "style it with your favourite pieces from our closet or let it become the star of a simple, romantic outfit"
  );
}

function buildPageHtml(product, category, config) {
  const imagePath = "../" + product.image;
  const imageFile = product.image.split("/").pop();
  const titleName = product.name.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chantal's Closet | ${titleName}</title>
  <link rel="stylesheet" href="../style.css">
</head>

<body class="product-detail-page">

  <header class="header">
    <h1 class="logo">chantal's closet</h1>

    <div class="header-nav-group">
      <nav class="site-nav" aria-label="Main">
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../about.html">About</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
      </nav>

      <nav class="nav-buttons" aria-label="Shop">
        <button onclick="location.href='../clothes.html'">clothes</button>
        <button onclick="location.href='../buy.html'" class="buy-btn-header">buy</button>
        <button onclick="location.href='../account.html'" class="account-btn">account</button>
      </nav>
    </div>
  </header>

  <main class="product-detail-content">

    <p class="small-heading">a little treasure ♡</p>

    <h1>${product.name}</h1>

    <div class="product-detail-layout">

      <img
        class="product-detail-image"
        src="${imagePath}"
        alt="${titleName} from Chantal's Closet"
      >

      <div class="product-detail-info">

        <p class="product-detail-description">
          ${buildDescription(product, category)}
        </p>

        <table class="product-specs-table">
          <tr>
            <th>material</th>
            <td>${config.material}</td>
          </tr>
          <tr>
            <th>size</th>
            <td>${config.size}</td>
          </tr>
          <tr>
            <th>colour</th>
            <td>${getColourFromName(product.name)}</td>
          </tr>
          <tr>
            <th>price</th>
            <td>₱${product.price}</td>
          </tr>
        </table>

        <div class="product-detail-actions">
          <button
            type="button"
            class="add-to-basket-btn product-detail-basket-btn"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="../${product.image}"
          >add to basket ♡</button>

          <button
            type="button"
            class="shop-button product-detail-button"
            onclick="location.href='../clothes.html#${category}'"
          >
            back to ${category}
          </button>
        </div>

      </div>

    </div>

  </main>

  <footer class="site-footer">
    <p class="small-heading">thank you for visiting ♡</p>
    <p>chantal's closet — dreamy thrifted finds</p>

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
      button.textContent = "added ♡";
      button.disabled = true;

      setTimeout(function() {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  </script>

</body>
</html>
`;
}

const outputDir = path.join(__dirname, "..", "products");
fs.mkdirSync(outputDir, { recursive: true });

let count = 0;

Object.keys(catalogConfig).forEach(function(category) {
  const config = catalogConfig[category];
  const products = buildProducts(
    config.names,
    config.images,
    config.basePrice,
    config.startingPrices
  );

  products.forEach(function(product) {
    const filePath = path.join(outputDir, product.id + ".html");
    fs.writeFileSync(filePath, buildPageHtml(product, category, config), "utf8");
    count += 1;
  });
});

console.log("Generated " + count + " product detail pages in products/");
