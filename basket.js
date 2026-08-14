const BASKET_KEY = "chantalsClosetBasket";

function getBasket() {
  const stored = localStorage.getItem(BASKET_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveBasket(items) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}

function addToBasket(item) {
  const basket = getBasket();
  const existing = basket.find(function(entry) {
    return entry.id === item.id;
  });

  if (existing) {
    existing.quantity += 1;
  } else {
    basket.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }

  saveBasket(basket);
}

function updateBasketQuantity(id, change) {
  const basket = getBasket();
  const item = basket.find(function(entry) {
    return entry.id === id;
  });

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromBasket(id);
    return;
  }

  saveBasket(basket);
}

function removeFromBasket(id) {
  saveBasket(
    getBasket().filter(function(entry) {
      return entry.id !== id;
    })
  );
}

function formatPrice(amount) {
  return "₱" + amount.toLocaleString();
}

function getBasketCount() {
  return getBasket().reduce(function(total, item) {
    return total + item.quantity;
  }, 0);
}
