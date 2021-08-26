const produit = document.getElementById("card-container");
//recuperation des URLs des objets
let params = new URL(document.location).searchParams;
console.log(params);
//url.search property accesses the query string of the URL prefixed with ?:
let id = location.search.substring(7);

function afficherCamera(data) {
  // Création des éléments
  let name = document.querySelector(".name"),
    price = document.querySelector(".price"),
    text = document.querySelector(".text"),
    image = document.getElementById("img-camera"),
    selectLenses = document.querySelector("select");

  // Remplissage des éléments
  name.appendChild(document.createTextNode(data.name));
  image.src = data.imageUrl;
  price.appendChild(document.createTextNode(data.price / 100 + " €"));
  text.appendChild(document.createTextNode(data.description));
  for (i = 0; i < data.lenses.length; i++) {
    let option = document.createElement("option");
    option.textContent = data.lenses[i];
    selectLenses.appendChild(option);
  }
}
//au clique "ajouter panier",modifie le bouton et icone panier
function iconeChanged() {
  let icone = document.querySelector(".fa-shopping-cart");
  console.log(icone);
  icone.classList.toggle("selected");
  if (icone.classList.contains("selected")) {
    setTimeout(iconeChanged, 500);
  }
}
function boutonModifie() {
  const addbutton = document.getElementById("add-button");
  addbutton.classList.toggle("clicked");
  if (addbutton.classList.contains("clicked")) {
    setTimeout(boutonModifie, 1500);
  }
}

/************appel de l'API avec la methode FETCH avec le parametre ID **********/
fetch("http://localhost:3000/api/cameras/" + id)
  .then((res) => res.json())
  .then((data) => {
    afficherCamera(data);

    /**************** ecouter l'évènement clique du bouton "ajouter au panier" ************************/
    const addbutton = document.getElementById("add-button");
    addbutton.addEventListener("click", (e) => {
      e.preventDefault();

      //modifier l'icone panier et le bouton pour signaler l'ajout produit
      boutonModifie();
      iconeChanged();
      // recuperer le choix de la selection d'options du produit stocké dans une variable
      let selection = document.querySelector("select");
      const optionselected = selection.options[selection.selectedIndex].value;
      // selection de la quantité de produit
      const quantite = document.querySelector(".quantite");
      const selectquantite = quantite.value;

      // recuperation des valeurs de la selection dans un objet
      let optionsProduit = {
        nomproduit: data.name,
        idproduit: data._id,
        imageproduit: data.imageUrl,
        optionproduit: optionselected,
        prix: (data.price * quantite.value) / 100,
        quantite: selectquantite,
      };

      //local storage
      /*avant d'envoyer des donnees, il faut verifier si il y en a pas deja dans le LS*/
      let isPresent = false;
      let panier = [];

      if (JSON.parse(localStorage.getItem("produit"))) {
        //convertir donnees au format JSON qui sont dans le LS en obj JS
        let cart = JSON.parse(localStorage.getItem("produit"));
        //création d'une variable pour manipuler le panier
        cart.forEach((element) => {
          if (
            element.idproduit === id &&
            element.optionproduit === optionselected
          ) {
            console.log(cart);
            element.quantite =
              parseInt(element.quantite) + parseInt(selectquantite);
            isPresent = true;
          }
        });
        panier = cart;
      }
      console.log(panier);

      //Ajouter la caméra au panier
      if (isPresent === false) {
        //ajout de l'objt dans le tableau avec les options choisies par le user
        panier.push(optionsProduit);
      }
      // ajouter un produit selectionné dans le LS
      localStorage.setItem("produit", JSON.stringify(panier));
    });
  });

/*OPITON PRODUIT ET TITRE
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;*/
