// Url de l'API//

const API_URL = "http://localhost:3000/api/cameras";

// Je récupère mon url//
let currentUrl = window.location.search;
let url = new URLSearchParams(currentUrl);
// J'obtien mon id//
let id = url.get("id");

const buttonCart= document.getElementById("addToCart"); 

// Je récupère les info produit avec mon id//

fetch(`${API_URL}/${id}`)
    .then(data => {
        if(data.ok){  
        return data.json();
     }  
    })
    .then(productInfo => {
        
        let product={        
            id: productInfo._id,
            description: productInfo.description,
            name: productInfo.name,
            image: productInfo.imageUrl,
            price: productInfo.price,
            lenses: productInfo.lenses
        }

        return product;
    })
    .then(product => {

        document.querySelector(".productName").textContent= product.name;
        document.querySelector(".productPrice").textContent= product.price;
        document.querySelector(".productDescription").textContent= product.description;
        document.querySelector(".productImage").innerHTML= `<img src="${product.image}" alt=""></img>`;        
        
        let option= "";
        product.lenses.forEach(element => 

        option +=`<option value="${element}">${element}</option>` 
        );

        document.querySelector("#options").innerHTML= option;
        buttonCart.addEventListener("click", function(){    
            setCart(product);   
        });

    })
    .catch(err => {
        console.log(err)
    });



// La fonction setCart s'initialise avec l'event click//


function setCart(product){ 

        product.lenses = document.querySelector("#options").value;// j'écrase la valeur de lenses en mettant la sélection de l'utilisateur
        product.quantity = parseInt(document.querySelector("#quantity").value);//je transforme la quantité en integer

        let cartContent = getAllObjects();   

        verifyCart(product, cartContent);

        saveArticles(cartContent);

};



function verifyCart(product, cartContent){

    for(let i=0; i < cartContent.length ; i++){
        if(cartContent[i].id === product.id && cartContent[i].lenses === product.lenses){
            cartContent[i].quantity += product.quantity 
            return null;
        }
    }
    cartContent.push(product)
};



// avec cette fonction mon code ne marche pas, je dois 'pusher' un product a chaque fois que je click sur lui, et pas seulement
// lorsque mon panier et vide

// function verifyCart(product, cartContent){
//     if(cartContent.length !== 0){ // si mon panier n'est pas vide
//         cartContent.forEach((productInCart) => {// je le parcours et je check chacun
//             if(productInCart.id === product.id){// si un des produits du panier a le même id que le produit que je met dans mon panier
//                 productInCart.quantity += product.quantity; // alors bingo ! j'ajoute la quantité du produit du panier à la quantité du produit que je veux mettre dans mon panier
//             }
//         });
//     } else {
//         cartContent.push(product);
//     }
//     localStorage.setItem("cart", JSON.stringify(cartContent)); // je mets à jour mon localStorage avec la version à jour du contenu de mon panier
   
// };



