// Récupèraton de mon url//
let currentUrl = window.location.search;
let url = new URLSearchParams(currentUrl);
// J'obtien mon id//
let idConfirmation = url.get("id");

const numberProduct= document.querySelector(".validationNumber");
numberProduct.textContent = idConfirmation;

// Vider mon panier//
localStorage.clear();