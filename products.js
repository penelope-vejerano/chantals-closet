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
      image: images[index % images.length]
    };
  });
}

const categoryImages = {
tops: [
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

  bottoms: [
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

  bags: [
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

  shoes: [
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
    "assets/vintageplatformsandals.png",
    "assets/brownleathersandals.jpg",
    "assets/bowdetailballetflats.jpg",
    "assets/vintageoxfordshoes.jpg",
    "assets/wovensandals.jpg",
    "assets/lowblockheels.jpg",
    "assets/vintageslingbackheels.jpg",
    "assets/creammaryjaneheels.jpg",
    "assets/retrocanvassneakers.jpg",
    "assets/vintagepointedtoepumps.jpg"
  ]
};

const productCatalog = {
  tops: buildProducts([
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
  ], categoryImages.tops, 350, [350, 400, 450]),

  bottoms: buildProducts([
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
  ], categoryImages.bottoms, 450, [500, 450, 550]),

  bags: buildProducts([
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
  ], categoryImages.bags, 550, [600, 650, 550]),

  shoes: buildProducts([
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
  ], categoryImages.shoes, 650, [750, 800, 700])
};

function getProductByName(name) {
  const categories = Object.keys(productCatalog);

  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    const product = productCatalog[category].find(function(entry) {
      return entry.name === name;
    });

    if (product) {
      return product;
    }
  }

  return null;
}

const newArrivalNames = [
  "ribbon blouse",
  "classic wide leg pants",
  "cyan mini bag",
  "cream ballet flats",
  "pink floral top",
  "vintage corduroy pants",
  "floral tapestry bag",
  "vintage lace-up boots",
  "embroidered peasant blouse",
  "pleated midi skirt",
  "quilted mini handbag",
  "vintage kitten heels"
];

function createBasketButton(product) {
  return (
    '<button type="button" class="add-to-basket-btn"' +
      ' data-id="' + product.id + '"' +
      ' data-name="' + product.name + '"' +
      ' data-price="' + product.price + '"' +
      ' data-image="' + product.image + '"' +
    '>add to basket ♡</button>'
  );
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML =
    '<img src="' + product.image + '" alt="' + product.name + '" class="zoomable-image">' +
    '<div class="product-info">' +
      '<h3>' + product.name + '</h3>' +
      '<div class="product-price-row">' +
        '<p class="price">₱' + product.price + '</p>' +
        createBasketButton(product) +
      '</div>' +
    '</div>';

  return card;
}

function createNewArrivalCard(product) {
  const card = document.createElement("div");
  card.className = "showcase-card new-arrival-card";

  card.innerHTML =
    '<img src="' + product.image + '" alt="' + product.name + '" class="zoomable-image">' +
    '<h3>' + product.name + '</h3>' +
    '<div class="product-price-row">' +
      '<p class="price">₱' + product.price + '</p>' +
      createBasketButton(product) +
    '</div>';

  return card;
}

function renderProductCatalog() {
  Object.keys(productCatalog).forEach(function(category) {
    const grid = document.querySelector("#" + category + " .product-grid");

    if (!grid) {
      return;
    }

    grid.innerHTML = "";

    productCatalog[category].forEach(function(product) {
      grid.appendChild(createProductCard(product));
    });
  });
}

function renderNewArrivals() {
  const grid = document.getElementById("newArrivalsGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  newArrivalNames.forEach(function(name) {
    const product = getProductByName(name);

    if (product) {
      grid.appendChild(createNewArrivalCard(product));
    }
  });
}

function initImageModal() {
  const imageModal = document.getElementById("imageModal");
  const fullImage = document.getElementById("fullImage");
  const closeButton = document.getElementById("imageModalClose");

  if (!imageModal || !fullImage) {
    return;
  }

  function closeImage() {
    imageModal.classList.remove("active");
    fullImage.src = "";
  }

  window.closeImage = closeImage;

  if (closeButton) {
    closeButton.addEventListener("click", closeImage);
  }

  imageModal.addEventListener("click", function(event) {
    if (event.target === imageModal) {
      closeImage();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeImage();
    }
  });

  document.addEventListener("click", function(event) {
    const productImage = event.target.closest(".zoomable-image");

    if (productImage) {
      fullImage.src = productImage.src;
      fullImage.alt = productImage.alt;
      imageModal.classList.add("active");
    }
  });
}

function initBasketButtons() {
  document.addEventListener("click", function(event) {
    const basketButton = event.target.closest(".add-to-basket-btn");

    if (!basketButton || basketButton.disabled) {
      return;
    }

    addToBasket({
      id: basketButton.dataset.id,
      name: basketButton.dataset.name,
      price: Number(basketButton.dataset.price),
      image: basketButton.dataset.image
    });

    const originalText = basketButton.textContent;
    basketButton.textContent = "added ♡";
    basketButton.disabled = true;

    setTimeout(function() {
      basketButton.textContent = originalText;
      basketButton.disabled = false;
    }, 1200);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderProductCatalog();
  renderNewArrivals();
  initImageModal();
  initBasketButtons();
});
