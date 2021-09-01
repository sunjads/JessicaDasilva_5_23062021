let col = document.getElementById("container-confirmation");
console.log(col);
let confirmation = `
<h1>Bonjour ${localStorage.firstName} ,</h1>
        <p>Merci de vos achats sur Orinocameras.</p>
        <p>Nous avons bien reçu votre commande n° <strong>${localStorage.orderId}</strong> et nous vous contacterons une fois que votre colis sera expédié .</p>
        <p>Prix total : ${localStorage.prixTotal}€</p>
    `;
col.innerHTML = confirmation;
//localStorage.clear(); //MODIFICATION//

//<p class="font-weight-bold">
