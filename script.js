"use strict";

const stockCount = 4;
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
