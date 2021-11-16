// Url de l'API//

const API_URL = "http://localhost:3000/api/cameras";
const productContainer= document.querySelector("article");


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
        }else{
            throw new Error(`Erreur HTTP ! statut : ${data.status}`)
        }  
    })
    .then(productInfo => {

        let formatedNumber= (productInfo.price/1000);          
        
        let product={        
            id: productInfo._id,
            description: productInfo.description,
            name: productInfo.name,
            image: productInfo.imageUrl,
            price: formatedNumber,
            lenses: productInfo.lenses
        }
        return product;
    })
    .then(product => {

        document.querySelector(".productName").textContent= product.name;
        document.querySelector(".productPrice").textContent= (product.price).toLocaleString( undefined,{ minimumFractionDigits: 2 });  
        document.querySelector(".productDescription").textContent= product.description;
        document.querySelector(".productImage").innerHTML= `<img src="${product.image}" alt=""></img>`;        
        
        let option= "";
        product.lenses.forEach(element => 

        option +=`<option value="${element}">${element}</option>` 
        );

        document.querySelector("#options").innerHTML= option;
        buttonCart.addEventListener("click", function(){    
            setCart(product); //appel à la fonction pour l'ajout de produits à mon local storage//
            const addAlert= document.querySelector(".alertProduct");
            addAlert.textContent= "Ton produit a été ajouté au panier";
        });

    })
    .catch(err => {
        productContainer.innerHTML= 
        `<div class="alert alert-danger mx-auto alertProductmissing" role="alert">
        <h4 class="alert-heading">Ooops! Il y a eu un problème</h4>
        <p>Je ${err.message}</p>        
        </div>`
    });

// La fonction setCart s'initialise avec l'événement click//


function setCart(product){ //Mise en forme du panier//
        let valueLense= document.querySelector("#options").value;              
        let formatedValue = valueLense.split(" ").join("-");
        console.log(formatedValue);
            
        product.lenses = formatedValue; // j'écrase la valeur de lenses en mettant ma valeur simplifiée 
        // product.lenses = document.querySelector("#options").value;// j'écrase la valeur de lenses en mettant la sélection de l'utilisateur
        product.quantity = parseInt(document.querySelector("#quantity").value);//je transforme la quantité en integer

        let cartContent = getAllObjects();   

        verifyCart(product, cartContent);
        saveArticles(cartContent);
};

function verifyCart(product, cartContent){//Vérification des Id et type de lense pour éviter des répetitions//
    for(let i=0; i < cartContent.length ; i++){
        if(cartContent[i].id === product.id && cartContent[i].lenses === product.lenses){
            cartContent[i].quantity += product.quantity 
            return null;
        }
    }
    cartContent.push(product)
};




// function verifyCart(product, cartContent){
    
//     cartContent.forEach((productInCart) => {// je le parcours et je check chacun
//         if(productInCart.id === product.id && productInCart.lenses === product.lenses){// si un des produits du panier a le même id que le produit que je met dans mon panier
//             productInCart.quantity += product.quantity; // alors bingo ! j'ajoute la quantité du produit du panier à la quantité du produit que je veux mettre dans mon panier
//         }else {
//             cartContent.push(product); //porquoi cette fonction ne marche pas?
//         }
//     });
// }; 




