const USERS_KEY = "chantalsClosetUsers";
const SESSION_KEY = "chantalsClosetSession";

function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSessionEmail() {
  return localStorage.getItem(SESSION_KEY);
}

function setSessionEmail(email) {
  localStorage.setItem(SESSION_KEY, email);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function createDefaultProfile(name, email, password) {
  return {
    name: name,
    email: email,
    password: password,
    phone: "",
    dateOfBirth: "",
    profilePicture: "",
    notifications: {
      orderUpdates: true,
      newArrivals: true,
      promotions: true,
      backInStock: true,
      emailNotifications: true,
      pushNotifications: false
    },
    shopping: {
      savedItems: [],
      recentlyViewed: [],
      savedSizes: {
        tops: "",
        bottoms: "",
        shoes: ""
      },
      preferredCategories: [],
      favoriteStyles: ""
    },
    orders: {
      history: [],
      savedAddresses: [],
      defaultShippingAddress: "",
      returnHistory: []
    },
    payments: {
      methods: [],
      defaultMethod: "",
      billingAddress: ""
    },
    privacy: {
      twoFactorEnabled: false,
      loginActivity: [],
      privacySettings: {
        showProfile: true,
        shareWishlist: false
      }
    },
    appearance: {
      theme: "light",
      language: "en",
      currency: "PHP"
    }
  };
}

function migrateUser(user) {
  const defaults = createDefaultProfile(user.name || "shopper", user.email, user.password);

  Object.keys(defaults).forEach(function(key) {
    if (key === "email" || key === "password" || key === "name") {
      return;
    }

    if (user[key] === undefined) {
      user[key] = defaults[key];
    }
  });

  return user;
}

function getCurrentUser() {
  const email = getSessionEmail();

  if (!email) {
    return null;
  }

  const users = getUsers();
  const user = users.find(function(entry) {
    return entry.email === email;
  });

  if (!user) {
    return null;
  }

  return migrateUser(user);
}

function updateCurrentUser(updates) {
  const email = getSessionEmail();

  if (!email) {
    return null;
  }

  const users = getUsers();
  const index = users.findIndex(function(entry) {
    return entry.email === email;
  });

  if (index === -1) {
    return null;
  }

  users[index] = migrateUser(Object.assign({}, users[index], updates));
  saveUsers(users);
  return users[index];
}

function saveCurrentUser(user) {
  const email = getSessionEmail();

  if (!email) {
    return;
  }

  const users = getUsers();
  const index = users.findIndex(function(entry) {
    return entry.email === email;
  });

  if (index === -1) {
    return;
  }

  users[index] = migrateUser(user);
  saveUsers(users);
}

function logLoginActivity(user) {
  user.privacy.loginActivity.unshift({
    date: new Date().toISOString(),
    device: navigator.userAgent.slice(0, 100)
  });
  user.privacy.loginActivity = user.privacy.loginActivity.slice(0, 8);
}

function addRecentlyViewed(product) {
  const user = getCurrentUser();

  if (!user || !product) {
    return;
  }

  user.shopping.recentlyViewed = user.shopping.recentlyViewed.filter(function(item) {
    return item.id !== product.id;
  });

  user.shopping.recentlyViewed.unshift({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    viewedAt: new Date().toISOString()
  });

  user.shopping.recentlyViewed = user.shopping.recentlyViewed.slice(0, 12);
  saveCurrentUser(user);
}

function applyUserPreferences() {
  const user = getCurrentUser();
  document.body.classList.remove("theme-dark");

  if (user && user.appearance && user.appearance.theme === "dark") {
    document.body.classList.add("theme-dark");
  }
}

function createOrderFromBasket(basket, shippingFee) {
  const user = getCurrentUser();

  if (!user || basket.length === 0) {
    return null;
  }

  const subtotal = basket.reduce(function(total, item) {
    return total + item.price * item.quantity;
  }, 0);

  const order = {
    id: "ORD-" + Date.now(),
    date: new Date().toISOString(),
    items: basket.map(function(item) {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      };
    }),
    subtotal: subtotal,
    shipping: shippingFee,
    total: subtotal + shippingFee,
    status: "processing",
    tracking: "CC" + String(Date.now()).slice(-8)
  };

  user.orders.history.unshift(order);
  saveCurrentUser(user);
  return order;
}

document.addEventListener("DOMContentLoaded", applyUserPreferences);
