const produit = document.getElementById("card-container");

let params = new URL(document.location).searchParams;
//recuperation des URLs des objets

//url.search property accesses the query string of the URL prefixed with ?:
let id = location.search.substring(7);
console.log(id);

/************appel de l'API avec la methode FETCH avec le parametre ID **********/

fetch("http://localhost:3000/api/cameras/" + id)
  .then((res) => res.json())
  .then((data) => {
    output = "";

    // utilisation de template literals pour afficher les données dans une structure html
    output += `
   <div class = "details-container">
     <div class="container-img">
      <img src=" ${data.imageUrl}" alt="appareil photo vintage"/>
     </div>
    <div class="card-description" >
     <h2> ${data.name}</h2>
      <p class="text" >${data.description}</p>
      <p class="price"> Prix: ${data.price / 100}€</p>
     
      <form>
        <select id="option_produit" >
        <option value ="Selectionner votre lentille" selected disabled>Selectionner votre lentille </option>
        <option value="Objectif plein format 24 mm f/1.4">Objectif  plein format 24 mm f/1.4</option>
        <option value ="Objectif plein format 50 mm f/1.8">Objectif plein format 50 mm f/1.8</option>
        <option value ="Objectif plein format 85mm f/1.8">Objectif plein format 85mm f/1.8</option>
        </select>
      </form>
      <input type="number" class="quantite" value="1">
      <button id="add-button" class="primary" > Ajouter au panier </button>
  </div>
  </div>
    `;
    //faire apparaitre les données dans la div card-container
    document.querySelector(".section-product-detail").innerHTML = output;

    /**************** ecouter l'évènement clique du bouton "ajouter au panier" ************************/
    const addbutton = document.getElementById("add-button");
    addbutton.addEventListener("click", (e) => {
      e.preventDefault();

      // recuperer le choix de la selection d'options du produit dans une variable
      let info = document.getElementById("option_produit");
      const optionselected = info.value;

      // selection de la quantité de produit
      const quantite = document.querySelector(".quantite");
      const selectquantite = quantite.value;
      console.log(selectquantite);

      // recuperation des valeurs de la selection dans un objet
      let optionsProduit = {
        nomproduit: data.name,
        idproduit: data._id,
        imageproduit: data.imageUrl,
        //optionproduit: optionselected,
        prix: (data.price * quantite.value) / 100,
        quantite: quantite.value,
      };

      //creation de la fenêtre popupVersPanier()
      const popupVersPanier = () => {
        // creation alert avec btns confirmer/annuler
        if (
          window.confirm(`${data.name} option  ${optionselected} a bien été ajouté au panier
Consulter votre panier ou revenir à l'acceuil`)
        ) {
          // redirection de la page
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      };

      //local storage
      //stocker la recuperation des valeurs de selct dans le LS
      //variable avec keys/values qui sont dans le LS, et avant d'envoyer des
      //donnees, il faut verifier si il y en a pas deja
      let produitsEnregistres = JSON.parse(localStorage.getItem("produit"));
      //convertir donnees au format JSON qui sont dans le LS en obj JS
      console.log(produitsEnregistres);

      /* fonction ajouter un produit selectionne dans le LS  */
      const ajouterProduit = () => {
        //ajouter de l'objt dans le tableau avec les options choisies par le user
        produitsEnregistres.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitsEnregistres));
      };

      //selection du produit
      // si il y a pas de produits enregistrés dans LS, ne pas creer
      if (produitsEnregistres) {
        ajouterProduit();
        popupVersPanier();
      }
      // si vide, creer la clé
      else {
        produitsEnregistres = [];
        ajouterProduit();
        popupVersPanier();
      }
      //selection de la quantite du produit
      // si il existe le nom produit avec une quantite, additionner les quantites
      if (produitsEnregistres) {
      }
      // si ca nexiste pas , le rajouter
      else {
        produitsEnregistres = [];
        ajouterProduit();
        popupVersPanier();
      }
    });
  });
