//Affichage de produits sur la page panier//

const cartContainer= document.getElementById("tbody");



let cart= getAllObjects();

function renderCart(cart){

let content="";
cart.forEach(product => {

            content += `<tr class="myProduct" data-id=${product.id}>
                <th scope="row" class="border-0">
                    <div class="p-2">
                        <img src="${product.image}" alt="" width="70" class="img-fluid rounded shadow-sm">
                        <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle titleUnique">${product.name}</a></h5>
                            <span class="text-muted font-weight-normal font-italic d-block">Objectif:<span class="lenses">${product.lenses}</span></span>
                        </div>
                    </div>
                </th>
                <td class="border-0 align-middle"><strong class="price">${product.price}</strong></td>
                <td class="border-0 align-middle">                                         
                    <input type="number" class="inputQuantityCart" name="itemQuantity" min="1" max="100" value="${product.quantity}">                    
                </td>
                <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
            </tr>`            
            
        })
        cartContainer.innerHTML= content; 
};

renderCart(cart);

//Modifier la quantité de chaque produit dans le panier//
const inputs = cartContainer.querySelectorAll('.inputQuantityCart');

inputs.forEach(input => {
    input.addEventListener('change', modifyInput)
})

function modifyInput(e){
    const inputElement= e.target
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
       sum = sum + sumItems       
    })

    subTotal.innerHTML=`${sum}€`
    Total.innerHTML=`${sum}€`
}
sumCart()



// Supprimer elements dans le panier//

const allTrash= cartContainer.querySelectorAll(".fa-trash")

allTrash.forEach(trash =>{
    trash.addEventListener('click', removeProduct)
})

function removeProduct(e){
    const trash= e.target;
    const closestElement= trash.closest(".myProduct")
    const idProduct = closestElement.dataset.id  
    console.log(trash)
    for(let i=0; i<cart.length ; i++){
        if(cart[i].id===idProduct){
            cart.splice(i,1)
        }              
     }
     console.log(cart)
     closestElement.remove()
     saveArticles(cart)
};







