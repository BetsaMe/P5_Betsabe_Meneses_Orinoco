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
      jsonListProducts.forEach(product => {
        gridProducts.innerHTML += `<div class="col-12 col-md-6 col-lg-4 cardContainer">
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
})
.catch(err => {
  gridProducts.innerHTML= 
  `<div class="alert alert-danger mx-auto role="alert">
    <h4 class="alert-heading">Ooops! il y a eu un problème</h4>
    <hr>
    <p>${err.message}</p>    
  </div>` 
});










