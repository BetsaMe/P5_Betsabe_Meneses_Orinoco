//Affichage de produits sur la page panier//

const cartContainer= document.querySelector("tbody");

let cart= getAllObjects();

function renderCart(cart){

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
};

renderCart(cart);

//Modifier la quantité de chaque produit dans le panier//
const inputs = cartContainer.querySelectorAll('.inputQuantityCart');

inputs.forEach(input => {
    input.addEventListener('change', modifyInput);
})

function modifyInput(e){
    const inputElement= e.target;
    const closestElement= inputElement.closest(".myProduct")
    const idProduct = closestElement.dataset.id
    const lenseProduct = closestElement.querySelector(".lenses").textContent       

    cart.forEach(product =>{        
        if(product.id === idProduct && product.lenses === lenseProduct ){ //ici je compare l'id mais aussi le choix de lense//
            product.quantity = parseInt(inputElement.value)         
        }
    })  
    sumCart()
    saveArticles(cart)
    console.log(cart)       
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
sumCart()



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


// Vérification de formulaire//
let alertEmail= document.createElement("p");
document.querySelector(".inputEmail").appendChild(alertEmail);


const inputEmail= document.querySelector("#form6Example5");

inputEmail.addEventListener("input", function(e){
    const validFormat= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (validFormat.test(e.target.value))
  {    
    alertEmail.innerText= "adresse e-mail valide";
    alertEmail.setAttribute("class", "text-success");
    
  }else{    
    alertEmail.innerText= "L'adresse e-mail doit être indiquée dans un format approprié.";
    alertEmail.setAttribute("class", "text-danger");
  }    
});


// Envoyer données du formulaire//
const myForm= document.getElementById("formContact");

myForm.addEventListener("submit", function(e){   
    
    e.preventDefault();
    const contact={
        firstName: document.getElementById("form6Example1").value,
        lastName: document.getElementById("form6Example2").value,
        address: document.getElementById("form6Example3").value,
        city: document.getElementById("form6Example4").value,
        email: document.getElementById("form6Example5").value
    }
    
    const products=[];

    cart.forEach((productInCart) =>{
        let idProduct=productInCart.id;
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
    console.log(err)
    }); 
});














