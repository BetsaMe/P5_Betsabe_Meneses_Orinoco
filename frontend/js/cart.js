//Affichage de produits sur la page panier//

const cartContainer= document.querySelector("tbody");
const myForm= document.getElementById("formContact");
const mySubmitButton= document.getElementsByClassName("btnSubmit"); 
let cart= getAllObjects();

function renderCart(cart){
    let content=""; 
    cart.forEach(product => {
        
        content += `<tr class="myProduct" data-id=${product.id}> 
            <td scope="row" class="border-0 nameColumn">
                <div>
                    <a  href="product.html?id=${product.id}"><img src="${product.image}" alt="" width="120" class="img-fluid rounded shadow-sm"></a>                      
                    <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle titleUnique">${product.name}</a></h5>
                        <span class="text-muted d-block">Objectif:<span class="lenses">${product.lenses}</span></span>
                    </div>
                </div>
            </td>
            <td class="border-0 align-middle priceColumn"><strong class="price">${product.price.toLocaleString( undefined,{ minimumFractionDigits: 2 })}€</strong></td>
            <td class="border-0 align-middle priceColumn">                                         
                <input type="number" class="inputQuantityCart" name="itemQuantity" min="1" max="100" value="${product.quantity}">                    
            </td>
            <td class="border-0 align-middle trashColumn"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
        </tr>`  
    })
    cartContainer.innerHTML= content; 
};

if(cart.length!== 0){ //Si mon panier n'est pas vide//
    
    renderCart(cart);
    sumCart()

}else{ //Si mon panier est vide//
    
    cartContainer.innerHTML= 
    `<div class="text-center role="alert">
        <h4 class="text-center">¡Ton panier est vide!</h4>
        <a href="index.html"class="linkEmptyCart">Continuer mes achats</a>           
    </div>`;
    document.getElementById("promoContainer").innerHTML= "";
    document.getElementById("formContainer").innerHTML= ""; 
};
    


//Modifier la quantité de chaque produit dans le panier//
const inputsQuantity = cartContainer.querySelectorAll('.inputQuantityCart');

inputsQuantity.forEach(input => {
    input.addEventListener('change', modifyInput);
})

function modifyInput(e){
    const inputElement= e.target;
    const closestElementInput= inputElement.closest(".myProduct"); //sélection de l'ascendant//
    const idProduct = closestElementInput.dataset.id; //id attribué à l'ascendant//
    const lenseProduct = closestElementInput.querySelector(".lenses").textContent;

    cart.forEach(product =>{        
        if(product.id === idProduct && product.lenses === lenseProduct ){ //on compare l'id mais aussi le type de lense choisi pour eviter des erreurs//
            product.quantity = parseInt(inputElement.value);         
        }
    })  
    sumCart(); //une fois modifié on refait la somme mais aussi l'enregistrement sur mon localstorage//
    saveArticles(cart);      
};


//Somme d'éléments dans le panier//
function sumCart(){
const subTotal= document.querySelector(".subTotalPrice");
const Total= document.querySelector(".TotalPrice");

let sum = 0;
    cart.forEach(product=>{
       
       let sumItems = product.price*product.quantity;
       sum += sumItems;      
    })

    subTotal.innerHTML=`${sum.toLocaleString( undefined,{ minimumFractionDigits: 2 })}€`
    Total.innerHTML=`${sum.toLocaleString( undefined,{ minimumFractionDigits: 2 })}€`
};


// Supprimer elements dans le panier//
const allDeleteButtons= cartContainer.querySelectorAll(".fa-trash")

allDeleteButtons.forEach(deleteButton =>{
    deleteButton.addEventListener('click', removeProduct) //Rafraîchir le site pour voir les changements//
})

function removeProduct(e){
    const trash= e.target;
    const closestElement= trash.closest(".myProduct");//sélection de l'ascendant//
    const idProduct = closestElement.dataset.id; //id attribué à l'ascendant//
    const lenseProduct = closestElement.querySelector(".lenses").textContent; 
    
    for(let i=0; i<cart.length ; i++){
        if(cart[i].id === idProduct && cart[i].lenses === lenseProduct){ //on compare l'id mais aussi le type de lense choisi//
            cart.splice(i,1)
        }              
     }     
     saveArticles(cart)
};


// Inputs du formulaire//
const inputName = document.getElementById("form6Example1");
const inputLastName = document.getElementById("form6Example2");
const inputAddress = document.getElementById("form6Example3");
const inputCity = document.getElementById("form6Example4");
const inputEmail = document.getElementById("form6Example5");
const inputsForm= myForm.querySelectorAll('input');


// Expressions régulières validation formulaire //
const validFormatEmail= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/; 
const validFormat= /^[a-zA-Z]{3,20}$/; //majuscules et minuscules, entre 3 et 20 lettres//
const validAdressFormat= /^[#.0-9a-zA-Z\s,-]+$/; //les chiffres, les lettres majuscules et minuscules, les espaces, les tirets et les points//
const validCityFormat= /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/; //lettres, tirests, espaces//

function checkInputs (e) { // function à executer avec l'evenement input//
    
	switch (e.target.id) {
		case "form6Example1":
			validationFormat(inputName, validFormat,"Votre prénom doit contenir entre 3 et 20 lettres");
		break;
		case "form6Example2":
			validationFormat(inputLastName, validFormat,"Votre nom doit contenir entre 3 et 20 lettres");
		break;
		case "form6Example3":
			validationFormat(inputAddress, validAdressFormat,"Veuillez saisir une adresse valide");
		break;
		case "form6Example4":
			validationFormat(inputCity, validCityFormat,"Veuillez saisir une ville valide");
		break;
		case "form6Example5":
			validationFormat(inputEmail, validFormatEmail,"L'adresse e-mail doit être indiquée dans un format approprié.");
		break;
	}
};

function validationFormat(input, validFormat, message){ 
     
    if(!validFormat.test(input.value)){        
        setError(input, message,'text-danger');
        
    }else{
        deleteError(input);
    }
};

inputsForm.forEach((input) => {
	input.addEventListener('keyup', checkInputs);
	input.addEventListener('blur', checkInputs);
});



function checkForm(){ // function de verification pour l'evenement submit//
    let validate = true;
    inputsForm.forEach(input=> {
        if (input.value == "") {
            setError(input, 'Veuillez remplir ce champ obligatoire','text-danger');  
            validate = false;
        }
    });
    if(!validFormat.test(inputName.value) || !validFormat.test(inputLastName.value) || !validAdressFormat.test(inputAddress.value)
    || !validCityFormat.test(inputCity.value) || !validFormatEmail.test(inputEmail.value)){
    validate = false;
    } 
    return validate;
};

myForm.addEventListener("submit", function(e){  

    e.preventDefault();

    if(checkForm() == true ){
        // Création d'object Contact//  
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
        
        fetch("http://localhost:3000/api/cameras/order", {
        
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
        
        })
        .then(function(res){        
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
    }
 
});



// Message d'erreur//
function setError(input, message, text){
    const inputParent= input.parentElement;
    const messageError= inputParent.querySelector('small');
    messageError.innerText= message;
    messageError.className= text;
};
// Supprimer Message d'erreur//
function deleteError(input){
    const inputParent= input.parentElement;
    const messageError= inputParent.querySelector('small');
    messageError.innerText= "";
};









// function checkInputFormat(input, formatValid, message){
//     input.addEventListener("input", function(e){      
//         if(!formatValid.test(e.target.value)){        
//             setError(input, message,'text-danger'); 
//             // document.getElementById("btnSubmit").setAttribute("disabled", "");  
//         } else{
//             deleteError(input);
//             // document.getElementById("btnSubmit").removeAttribute("disabled"); 
//         }       
//     });
// };

// checkInputFormat(inputName, validFormat,"Votre prénom doit contenir entre 3 et 20 lettres");
// checkInputFormat(inputLastName, validFormat,"Votre nom doit contenir entre 3 et 20 lettres");
// checkInputFormat(inputAddress, validAdressFormat,"Veuillez saisir une adresse valide");
// checkInputFormat(inputCity, validCityFormat,"Veuillez saisir une ville valide");
// checkInputFormat(inputEmail, validFormatEmail,"L'adresse e-mail doit être indiquée dans un format approprié.",'text-danger'); 
