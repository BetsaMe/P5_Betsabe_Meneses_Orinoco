// La fonction getAllObjects vérifie les produits dans mon local storage, s'il y en a//

function getAllObjects(){
    let cartContent = localStorage.getItem("cartContent");
    if(cartContent == null){
        return [];
    }else{
        return JSON.parse(cartContent);
    }
};

//Cette fonction permet de sauvegarder le contenu du panier dans le local storage//

function saveArticles(cartContent){
    localStorage.setItem("cartContent",JSON.stringify(cartContent));    
};