let cart = JSON.parse(localStorage.getItem("produit"));

/**************affichage des produits du LS dans le panier***********/
//selection du ul où il faut injecter le html
let ul = document.querySelector(".list-group");
// creation du tableau afin d'initier une boucle et recuperer les produits du LS
let output = [];

function afficherCameraDansPanier(i) {
  //creation de la classe où il faut injecter le html
  let li = document.createElement("li");
  // Création des éléments
  let nom = document.createElement("h6"),
    option = document.createElement("h6"),
    prix = document.createElement("p"),
    input = document.createElement("input"),
    bouton = document.createElement("button");
  iconebouton = document.createElement("i");

  // Remplissage des éléments
  nom.appendChild(document.createTextNode(cart[i].nomproduit));
  option.appendChild(document.createTextNode(cart[i].optionproduit));
  prix.appendChild(document.createTextNode(cart[i].prix + " €"));
  //toLocaleString("en") +
  li.classList.add("list-group-item", "d-flex", "justify-content-between");
  nom.classList.add("my-0");
  option.classList.add("my-0");
  prix.classList.add("affichage_prix");
  bouton.classList.add("btn_supprimer_article");
  iconebouton.classList.add("fas", "fa-times");
  input.setAttribute("value", cart[i].quantite);
  input.setAttribute("type", "number");
  input.classList.add("quantite");
  input.setAttribute("onchange", "updateQuantity(this.value)");
  //this.value;
  //Placement des éléments
  ul.appendChild(li);
  li.appendChild(nom);
  li.appendChild(option);
  li.appendChild(prix);
  li.appendChild(input);
  li.appendChild(bouton);
  bouton.appendChild(iconebouton);
}
// creer une condition pour vérifier si le panier est vide ou non
if (cart === null || cart == 0) {
  //si il est vide,inserer la structure html ci-dessus dans le ul
  const panierVide = `
    <div class="container-panier-vide">
    <div> Votre panier est actuellement vide.</div>
    </div>`;
  //inserer la structure html ci-dessus dans le ul (le panier)
  ul.innerHTML = panierVide;
} else {
  //sinon, il faut ajouter les produits du LS au ul (le panier)
  for (i = 0; i < cart.length; i++) {
    afficherCameraDansPanier(i);
  }
  //afficher le total dans une structure html & creation du bouton
  let affichagePrixTotal = `
<li id="total" class="list-group-item d-flex justify-content-between">
</li>`;
  //insertion dans la structure html et en dernière position
  ul.insertAdjacentHTML("beforeend", affichagePrixTotal);
}

/***************** calcul du prix total ***************/

//Fonction pour créer un prixTotal afin de l'utiliser pour afficher le prix total plus facillement dans la panier
function calculPrixTotal() {
  //integrer les prix dans le panier dans une variable qui est un tableau
  let calculPrixTotal = 0;
  //recuperer les prix du panier
  for (let i in cart) {
    calculPrixTotal += cart[i].prix;
  }
  localStorage.setItem("prixTotal", calculPrixTotal);
  if (document.querySelector(".affichage_prix") != null) {
    document.getElementById("total").innerHTML = `<strong>Total</strong>
<strong>${calculPrixTotal} €</strong>`;
  }
}
calculPrixTotal();

/**********************supprimer produits********************/

//recuperer l'icone croix qui servira à supprimer un produit
let btnsupprimer = document.querySelectorAll(".btn_supprimer_article");

for (let i = 0; i < btnsupprimer.length; i++) {
  btnsupprimer[i].addEventListener("click", (event) => {
    event.preventDefault();
    // au clique du bouton, affichage de l'id du produit
    let idasupprimer = cart[i].idproduit;
    //supprimer l'élément cliqué et garder les autres avec la methode filter
    cart = cart.filter((element) => element.idproduit !== idasupprimer);
    //envoyer en format JSON dans la key "produit" dans le LS
    localStorage.setItem("produit", JSON.stringify(cart));
    // alert produit supprimé + rechargement de la page
    alert("l'article a bien été supprimé");
    window.location.href = "panier.html";
  });
}

/************* creation du bouton "vider le panier"*************/
//creation du bouton
let btnToutSuppHtml = `
<button id="remove_all_button" class="primary" > Vider le panier</button>`;
//insertion dans la structure html
ul.insertAdjacentHTML("beforeend", btnToutSuppHtml);
//recuperation du bouton
let btnToutSuppPanier = document.getElementById("remove_all_button");
//suppression de la key produit du LS pour supprimer entièrement le panier
btnToutSuppPanier.addEventListener("click", (e) => {
  e.preventDefault();
  //vider le panier
  localStorage.removeItem("produit");
  alert("le panier a été vidé");
  //redirection de la page
  window.location.href = "panier.html";
});

/**********************modifier la quantité de produits************************/
//Fonction qui modifie la quantité directement sur la page du panier et mets à jour le prixTotal
// Le changement de valeur de l'input va lancer la fonction updateQuantity()
function updateQuantity(value) {
  for (i = 0; i < cart.length; i++) {
    let selection = document.querySelector(".quantite").value;
    console.log(selection);
    let prixUpdate = document.querySelector(".affichage_prix");
    console.log(prixUpdate);
    cart[i].quantite = value;
    cart[i].prix = cart[i].quantite * cart[i].prix;

    prixUpdate.innerHTML = cart[i].prix;
    //envoyer en format JSON dans la key "produit" dans le LS
    localStorage.setItem("produit", JSON.stringify(cart));
    calculPrixTotal();
  }
}

/************recuperation valeurs formulaire pour envoyer dans le LS**********/

//selection et ecouter le bouton "valider le panier"
const btnValiderPanier = document.querySelector(".btn-block");

// ecouter l'évènement clique du bouton
btnValiderPanier.addEventListener("click", (e) => {
  e.preventDefault();
  //mettre les values du formulaire dans un objet contact
  let contact = {
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  /********************gestion validation du formulaire************/
  //fonctions pour initialiser les regex + textes d'alerte
  const textAlert = (value) => {
    return ` ${value} : les chiffres ou symboles ne sont pas autorisés.\n Minimum 3 caractères, ne pas dépasser 20.`;
  };
  // pour le prénom,nom,et la ville
  const regexEmail = (value) => {
    return /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i.test(value);
  };
  const regexTest = (value) => {
    return /^([A-Za-z0-9_\s\-'\u00C0-\u024F]){3,20}$/.test(value);
  };

  //controle de validité du prénom
  function ValidFirstName() {
    const firstName = contact.firstName;
    if (regexTest(firstName)) {
      document.getElementById("invalid-feedback-firstName").textContent = "";
      return true;
    } else {
      document.getElementById("invalid-feedback-firstName").textContent =
        "Veuillez entrer un prénom valide";
      alert(textAlert("Votre prénom"));
      return false;
    }
  }

  //controle de validité du nom de famille
  function ValidLastName() {
    const lastName = contact.lastName;
    if (regexTest(lastName)) {
      document.getElementById("invalid-feedback-lastName").textContent = "";
      return true;
    } else {
      document.getElementById("invalid-feedback-lastName").textContent =
        "Veuillez entrer un nom valide";
      alert(textAlert("Votre nom de famille"));
      return false;
    }
  }

  //controle de validité de la ville
  function ValidCity() {
    const city = contact.city;
    if (regexTest(city)) {
      document.getElementById("invalid-feedback-city").textContent = "";
      return true;
    } else {
      document.getElementById("invalid-feedback-city").textContent =
        "Veuillez entrer une adresse pour valider votre commande";
      alert(textAlert("La ville"));
      return false;
    }
  }

  //controle de validité de l'e-mail
  function ValidEmail() {
    const email = contact.email;
    if (regexEmail(email)) {
      document.getElementById("invalid-feedback-email").textContent = "";
      return true;
    } else {
      document.getElementById("invalid-feedback-email").textContent =
        "Veuillez entrer une adresse e-mail valide";
      alert("L'adresse e-mail est invalide.");
      return false;
    }
  }

  //controle de validité de l'adresse
  function ValidAddress() {
    const address = contact.address;
    if (regexTest(address)) {
      document.getElementById("invalid-feedback-address").textContent = "";
      return true;
    } else {
      document.getElementById("invalid-feedback-address").textContent =
        "Veuillez entrer une adresse valide";
      alert("L'adresse est invalide.");
      return false;
    }
  }

  //envoyer l'objet contact au LS si c'est ok, sinon non
  if (
    ValidFirstName() &&
    ValidLastName() &&
    ValidCity() &&
    ValidEmail() &&
    ValidAddress()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
  }

  /********permettre de conserver les valeurs du formulaire après avoir rafraichi, ou changer de page ********/
  //recuperer les values contact du LS, etant donnée qu'on est hors addEventListener
  const recupContact = localStorage.getItem("contact");
  //convertir la chaine de caractères en objet javascript
  const recupContactObjet = JSON.parse(recupContact);
  // remettre les values contact du LS dans les champs du formulaire
  document.getElementById("lastName").value = recupContactObjet.lastName;
  document.getElementById("firstName").value = recupContactObjet.firtsName;
  document.getElementById("address").value = recupContactObjet.address;
  document.getElementById("city").value = recupContactObjet.city;
  document.getElementById("email").value = recupContactObjet.email;

  /********envoi des données contact + produistEnregistres au server avec la methode POST ********/

  //mettre contact + produitsEnregistrés dans un objet à envoyer au serveur
  const validationFinalPanier = {
    produitsEnregistres: cart,
    contact,
  };
  EnvoieServer(validationFinalPanier);
});

//envoyer l'objet avec fetch et method POST
function EnvoieServer(validationFinalPanier) {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(validationFinalPanier),
    headers: {
      //pour prevenir le server qu'il va recevoir du JSON avec les headers
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
