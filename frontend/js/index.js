/* Affichage de produits dans la page d'accueil */

const API_URL = "http://localhost:3000/api/cameras";

const gridProducts = document.querySelector(".gridProducts");

fetch(`${API_URL}/`)
.then(data => {
    if(data.ok){
      return data.json()
    }else{
      throw new Error(`Erreur HTTP ! statut : ${data.status}`)
    }
})
.then(jsonListProducts => {
      let cards ="";
      jsonListProducts.forEach(product => {
        cards += `<div class="col-12 col-md-6 col-lg-4 cardContainer">
                          <div class="card cardIndex">                            
                              <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap"width="250">
                              <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-price">${new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(product.price/1000)}</p>
                                <div class="lastBloc">
                                  <ul class="list-inline small">
                                    <li class="list-inline-item m-0"><i class="fa fa-star starReview"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star starReview"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star starReview"></i></li>
                                    <li class="list-inline-item m-0"><i class="fa fa-star starReview"></i></li>
                                    <li class="list-inline-item m-0"><i class="fas fa-star-half-alt starReview"></i></li>
                                    <li class="list-inline-item m-0"><i class="fas fa-star-half-alt starReview"></i></li>
                                  </ul>
                                  <a href="product.html?id=${product._id}" class="btn btn-outline-dark my-2 my-sm-0 buttonIndex" role="button">Détails</a>
                                </div>
                              </div>                            
                          </div>
                  </div>`;
        });
        gridProducts .innerHTML= cards;
        
})
.catch(err => {
  gridProducts.innerHTML= 
  `<div class="alert alert-danger mx-auto role="alert">
    <h4 class="alert-heading">Ooops! il y a eu un problème</h4>
    <hr>
    <p>${err.message}</p>    
  </div>` 
});




















 
//   const products = jsonListProducts.map((product) =>  
//   `<div class="col-12 col-md-4">
//     <div class="card" style="width: 18rem;">
//       <a href="produit.html?id=${product._id}&name=${product.name}&imageUrl=${product.imageUrl}&price=${product.price}&description=${product.description}&lenses=${product.len}">
//         <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap"width="250">
//         <div class="card-body">
//           <h5 class="card-title">${product.name}</h5>
//           <p class="card-text">${product.description}</p>
//         </div>
//       </a>
//     </div>
//   </div>`
//   ); 
  
//   HTMLResponse.innerHTML = products;  
//   console.log(products);  
// })

// .catch(err => {
//   console.log("Une erreur est survenue");
// });
  


// fetch("http://localhost:3000/api/cameras")
// .then(data => data.json())
// .then( jsonListProduits => {
//           // Create a variable to store HTML
//         let li = `<tr><th>Name</th><th>Price</th></tr>`;
       
//           // Loop through each data and add a table row
//         jsonListProduits.forEach(produit => {
//               li += `<tr>
//                     <td>${produit.name} </td>
//                     <td><img src="${produit.imageUrl}"alt=""width="250"></td>        
//                     </tr>`;
//             });
//          // Display result
//         document.getElementById("produits").innerHTML = li;

//     console.log(jsonListProduits);
// });



// .then(jsonListProduits(produit){

// })




// const produits = [];
  // for (let produit of jsonListProduits) {
  //   produits.push(`<li><img src="${produit.imageUrl}"alt=""width="250"></li>`)  ;
  // }
  