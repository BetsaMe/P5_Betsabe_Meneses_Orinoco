//Affichage de produits sur la page panier//

const cartContainer= document.querySelector("tbody");

let cart= getAllObjects();

function renderCart(cart){

    if(cart.length!== 0){ //Si mon panier n'est pas vide//
        let content=""; 
        cart.forEach(product => {
            content += `<tr class="myProduct" data-id=${product.id}>
                <td scope="row" class="border-0 nameColumn">
                    <div>
                        <img src="${product.image}" alt="" width="120" class="img-fluid rounded shadow-sm">
                        <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle titleUnique">${product.name}</a></h5>
                            <span class="text-muted d-block">Objectif:<span class="lenses">${product.lenses}</span></span>
                        </div>
                    </div>
                </td>
                <td class="border-0 align-middle priceColumn"><strong class="price">${product.price}€</strong></td>
                <td class="border-0 align-middle priceColumn">                                         
                    <input type="number" class="inputQuantityCart" name="itemQuantity" min="1" max="100" value="${product.quantity}">                    
                </td>
                <td class="border-0 align-middle trashColumn"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
            </tr>`  
        })
        cartContainer.innerHTML= content; 
    }else{ //Si mon panier est vide//
        cartContainer.innerHTML= 
        `<div class="alert alert-info mx-auto role="alert">
          <h4 class="text-center">¡Ton panier est vide!</h4>           
        </div>` 
    }
    sumCart()
};

renderCart(cart);

//Modifier la quantité de chaque produit dans le panier//
const inputs = cartContainer.querySelectorAll('.inputQuantityCart');

inputs.forEach(input => {
    input.addEventListener('change', modifyInput);
})

function modifyInput(e){
    const inputElement= e.target;
    const closestElement= inputElement.closest(".myProduct");
    const idProduct = closestElement.dataset.id;
    const lenseProduct = closestElement.querySelector(".lenses").textContent;     

    cart.forEach(product =>{        
        if(product.id === idProduct && product.lenses === lenseProduct ){ //ici je compare l'id mais aussi le choix de lense//
            product.quantity = parseInt(inputElement.value)         
        }
    })  
    sumCart();
    saveArticles(cart);      
};


//Somme d'éléments dans le panier//
function sumCart(){
const subTotal= document.querySelector(".subTotalPrice")
const Total= document.querySelector(".TotalPrice")

let sum = 0;
    cart.forEach(product=>{
       let sumItems =  product.price*product.quantity 
       sum += sumItems       
    })

    subTotal.innerHTML=`${sum}€`
    Total.innerHTML=`${sum}€`
}


// Supprimer elements dans le panier//

const allDeleteButtons= cartContainer.querySelectorAll(".fa-trash")

allDeleteButtons.forEach(deleteButton =>{
    deleteButton.addEventListener('click', removeProduct)
})

function removeProduct(e){
    const trash= e.target;
    const closestElement= trash.closest(".myProduct")
    const idProduct = closestElement.dataset.id 
    

    for(let i=0; i<cart.length ; i++){
        if(cart[i].id===idProduct){
            cart.splice(i,1)
        }              
     }
     console.log(cart)
     saveArticles(cart)
};

// Inputs du formulaire//
const inputName = document.getElementById("form6Example1");
const inputLastName = document.getElementById("form6Example2");
const inputAddress = document.getElementById("form6Example3");
const inputCity = document.getElementById("form6Example4");
const inputEmail = document.getElementById("form6Example5");


// Envoyer données du formulaire//
const myForm= document.getElementById("formContact");
myForm.addEventListener("submit", function(e){  

    e.preventDefault(); 
    
    // Vérification des données saisies par l'utilisateur//
    if (checkInputs() == false){
        return;
    }
    
    //Création d'object Contact//  
    const contact={
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value
    }
    //Création de tableau product// 
    const products=[];

    cart.forEach((productInCart) =>{
        let idProduct= productInCart.id;
        products.push(idProduct);
    });
    console.log(products)
    fetch("http://localhost:3000/api/cameras/order", {
    
    method: "POST",
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact, products})
    
    })
    .then(function(res){
        console.log(res)
        if (res.ok) {
        return res.json()        
        }
    })
    .then(function(response) {
        let url= "confirmation.html?id="
        window.location.href = url + response.orderId;
    })    
    .catch(function(err) {
        document.querySelector("#tableCart").innerHTML= 
        `<div class="alert alert-danger mx-auto role="alert">
          <h4 class="alert-heading">Ooops! il y a eu un problème</h4>
          <hr>
          <p>${err.message}</p>    
        </div>` 
        console.log(err.message)
    }); 
});


// Vérification des champs vides//
function checkInputs() { 

    const valueName= inputName.value;
    const valueLastName= inputLastName.value;
    const valueAddress= inputAddress.value;
    const valueCity= inputCity.value;
    const valueEmail= inputEmail.value;
    
    if(valueName == "") {
        setError(inputName, 'Veuillez remplir ce champ obligatoire');
        return false;
    }    
    if(valueLastName == "") {
        setError(inputLastName, 'Veuillez remplir ce champ obligatoire');
        return false;
    }     
    if(valueAddress == "") {
        setError(inputAddress, 'Veuillez remplir ce champ obligatoire');
        return false;
    }     
    if(valueCity == "") {
        setError(inputCity, 'Veuillez remplir ce champ obligatoire');
        return false;
    }
    if(valueEmail == "") {
        setError(inputEmail, 'Veuillez remplir ce champ obligatoire');
        return false;
    }  
    return true;
};

// Vérification Format de l'adresse email//

inputEmail.addEventListener("input", function(e){
    const validFormat= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    
    if (validFormat.test(e.target.value))
  {    
    setSuccess(inputEmail, "Address e-mail valide")
    
  }else{  
    setError(inputEmail, "L'adresse e-mail doit être indiquée dans un format approprié.");
  }    
});

// Vérification Format du prenom//
inputName.addEventListener("input",function(e){
    const validFormat= /^[a-zA-Z]{3,20}$/;
    
    if (validFormat.test(e.target.value))
  {    
    setSuccess(inputName, "prenom valide")
    
  }else{  
    setError(inputName, "Votre nom doit comporter entre 3 et 20 caractères");
  } 
});

// Message d'erreur//
function setError(input, message){
    const inputParent= input.parentElement;
    const messageError= inputParent.querySelector('small');
    // add error message
    messageError.innerText= message;
    // add error class
    messageError.className= 'text-danger';
};
// Message de success//
function setSuccess(input, message){
    const inputParent= input.parentElement;
    const messageError= inputParent.querySelector('small');
    // add success message
    messageError.innerText= message;
    // add success class
    messageError.className= 'text-success';
};




