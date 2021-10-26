//Affichage de produits sur la page panier//

const cartContainer= document.getElementById("tbody");



let cart= getAllObjects();
console.log(cart);

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
                <td class="border-0 align-middle"><strong>${product.price}</strong></td>
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
    const idProductInCart = closestElement.dataset.id  
    const lenseProductInCart = closestElement.querySelector(".lenses").textContent

    cart.forEach(product =>{        
        if(product.id === idProductInCart && product.lenses === lenseProductInCart ){ //ici je compare l'id mais aussi le choix de lense//
            product.quantity = parseInt(inputElement.value)
        }
    })  

    saveArticles(cart)
    console.log(cart) 
      
};









