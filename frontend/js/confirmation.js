// Je récupère mon url//
let currentUrl = window.location.search;
let url = new URLSearchParams(currentUrl);
// J'obtien mon id//
let id = url.get("id");

const numberProduct= document.querySelector(".validationNumber");
numberProduct.textContent = id;

localStorage.clear();