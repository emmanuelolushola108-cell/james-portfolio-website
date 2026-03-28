const msgCta = document.querySelector(".js-msg-cta");
const textArea = document.querySelector(".js-text-area");
const emailInputBox = document.querySelector(".js-email-input");
const nameInputBox = document.querySelector(".js-name-input");
const contactCta = document.querySelector(".js-header-cta");
const heroCtaBox = document.querySelector(".js-hero-cta");
const overlay = document.querySelector(".js-message-overlay");
const overlayTextBox = document.querySelector(".overlay-msg-box");
const sidebar = document.querySelector(".harmburger-side-menu");
const harmburgerCta = document.querySelector(".harmburger-menu");
const msg = {
  user: "admin",
  message: "",
  name: "",
  email: "",
};

function toggleStroke() {
  const stroke = document.querySelector(".stroke");
  const current = getComputedStyle(stroke).stroke;

  stroke.style.stroke = current === "rgb(59, 130, 246)" ? "#ffffff" : "#3b82f6";
}

function displaySideBar() {
  sidebar.classList.add("display-side-bar");
}

function goToServices() {
  document.querySelector(".js-service").scrollIntoView({
    behavior: "smooth",
  });
}
function goToContact() {
  document.querySelector(".js-contact").scrollIntoView({
    behavior: "smooth",
  });
}

function printMessage(message) {
  overlayTextBox.innerHTML = `
  ${message}
    `;

  overlay.classList.add("switch-overlay");
  setTimeout(() => {
    overlay.classList.remove("switch-overlay");
  }, 2000);
}

harmburgerCta.addEventListener("click", () => {
  toggleStroke();
  sidebar.classList.toggle("display-side-bar");
});
sidebar.addEventListener("click", () => {
  sidebar.classList.remove("display-side-bar");
  toggleStroke();
});

heroCtaBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-services")) {
    goToServices();
  } else if (e.target.classList.contains("hero-contact-cta")) {
    goToContact();
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactCta.addEventListener("click", goToContact);
msgCta.addEventListener("click", () => {
  const message = textArea.value.trim();
  const name = nameInputBox.value.trim();
  const email = emailInputBox.value.trim();

  if (!message || !name || !email) {
    printMessage(`<p>All fields are required</p>`);
    return;
  }

  emailjs
    .send("service_ymvlxn8", "template_6etbuw6", {
      name: name,
      email: email,
      message: message,
    })
    .then(() => {
      printMessage(`<p>Message sent successfully ✅</p>`, 3000);

      textArea.value = "";
      nameInputBox.value = "";
      emailInputBox.value = "";
    })
    .catch((error) => {
      console.log("ERROR", error);
      printMessage(`<p>Failed to send message ❌</p>`);
    });
});
