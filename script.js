"use strict";

function stockForName(name) {
  let total = 0;
  const letters = String(name).toLowerCase();

  for (let index = 0; index < letters.length; index++) {
    total = total + letters.charCodeAt(index);
  }

  return total % 16;
}

function getStockMessage(count) {
  if (count > 10) {
    return "In stock";
  } else if (count >= 1 && count <= 10) {
    return "Only a few left";
  } else {
    return "Sold out";
  }
}

function stockLabel(count) {
  return "stocks: " + count + " — " + getStockMessage(count);
}

const stockCount = stockForName("ribbon blouse");
const orderTotal = 1500;
const isMember = true;
const isShopOpen = true;

const stockStatusElement = document.getElementById("stockStatus");
const deliveryTotalElement = document.getElementById("deliveryTotal");
const shopHoursElement = document.getElementById("shopHours");

let stockMessage;

if (stockCount > 10) {
  stockMessage = "In stock";
} else if (stockCount >= 1 && stockCount <= 10) {
  stockMessage = "Only a few left";
} else {
  stockMessage = "Sold out";
}

const qualifiesForFreeDelivery = orderTotal >= 1000 && isMember === true;
const deliveryFee = qualifiesForFreeDelivery === true ? 0 : 150;
const finalTotal = Number(orderTotal) + Number(deliveryFee);

const shopStatus = isShopOpen === true ? "Open today" : "Closed today";

if (stockStatusElement !== null) {
  stockStatusElement.textContent = "ribbon blouse — " + stockMessage;
}

if (deliveryTotalElement !== null) {
  const deliveryLabel = deliveryFee === 0 ? "free delivery" : "delivery ₱" + deliveryFee;
  deliveryTotalElement.textContent = deliveryLabel + " — final total ₱" + finalTotal;
}

if (shopHoursElement !== null) {
  shopHoursElement.textContent = shopStatus;
}

document.querySelectorAll(".product-stock").forEach(function(element) {
  if (element.dataset.product === undefined) {
    return;
  }

  const count = stockForName(element.dataset.product);
  element.textContent = stockLabel(count);

  if (count === 0) {
    const button = element.parentElement.querySelector(".add-to-basket-btn");

    if (button !== null) {
      button.disabled = true;
      button.textContent = "sold out";
    }
  }
});
