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

function showAccountMessage(message, isError) {
  const messageBox = document.getElementById("accountMessage");

  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;
  messageBox.className = "account-message" + (isError ? " account-message-error" : " account-message-success");
}

function showSignInView() {
  document.getElementById("signInView").style.display = "block";
  document.getElementById("signUpView").style.display = "none";
  document.getElementById("loggedInView").style.display = "none";
  document.getElementById("accountHeading").textContent = "your account";
  document.getElementById("accountSubtext").textContent =
    "sign in to keep track of your little treasures and orders";
}

function showSignUpView() {
  document.getElementById("signInView").style.display = "none";
  document.getElementById("signUpView").style.display = "block";
  document.getElementById("loggedInView").style.display = "none";
  document.getElementById("accountHeading").textContent = "create your account";
  document.getElementById("accountSubtext").textContent =
    "join chantal's closet to save your picks and orders";
}

function showLoggedInView(email) {
  document.getElementById("signInView").style.display = "none";
  document.getElementById("signUpView").style.display = "none";
  document.getElementById("loggedInView").style.display = "block";
  document.getElementById("accountHeading").textContent = "welcome back ♡";
  document.getElementById("accountSubtext").textContent =
    "you are signed in and ready to shop";
  document.getElementById("loggedInEmail").textContent = email;
}

function initAccountPage() {
  const sessionEmail = getSessionEmail();

  if (sessionEmail) {
    showLoggedInView(sessionEmail);
  } else {
    showSignInView();
  }

  document.getElementById("showSignUpLink").addEventListener("click", function(event) {
    event.preventDefault();
    showSignUpView();
    showAccountMessage("", false);
  });

  document.getElementById("showSignInLink").addEventListener("click", function(event) {
    event.preventDefault();
    showSignInView();
    showAccountMessage("", false);
  });

  document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("signInEmail").value.trim().toLowerCase();
    const password = document.getElementById("signInPassword").value;
    const user = getUsers().find(function(entry) {
      return entry.email === email;
    });

    if (!user || user.password !== password) {
      showAccountMessage("that email or password does not match our records", true);
      return;
    }

    setSessionEmail(email);
    showAccountMessage("signed in successfully ♡", false);
    showLoggedInView(email);
    document.getElementById("signInForm").reset();
  });

  document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signUpName").value.trim();
    const email = document.getElementById("signUpEmail").value.trim().toLowerCase();
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("signUpConfirmPassword").value;
    const users = getUsers();

    if (!name) {
      showAccountMessage("please enter your name", true);
      return;
    }

    if (password.length < 6) {
      showAccountMessage("password must be at least 6 characters", true);
      return;
    }

    if (password !== confirmPassword) {
      showAccountMessage("passwords do not match", true);
      return;
    }

    if (users.some(function(entry) { return entry.email === email; })) {
      showAccountMessage("an account with that email already exists", true);
      return;
    }

    users.push({ name: name, email: email, password: password });
    saveUsers(users);
    setSessionEmail(email);
    showAccountMessage("account created welcome to chantal's closet ♡", false);
    showLoggedInView(email);
    document.getElementById("signUpForm").reset();
  });

  document.getElementById("signOutButton").addEventListener("click", function() {
    clearSession();
    showSignInView();
    showAccountMessage("you have signed out", false);
  });
}

document.addEventListener("DOMContentLoaded", initAccountPage);
