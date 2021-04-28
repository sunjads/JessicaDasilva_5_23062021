// fetch API pour recupérer les données des produits "cameras"
fetch("http://localhost:3000/api/cameras/")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    let array = [data[0], data[1], data[2], data[3], data[4]];
    //console.log(array);
    output = "";
    for (infos in array) {
      // console.log(infos);
      console.log(array[infos]);
      output += `
    <div class="col-12 col-lg-4 mt-5">
    <div class="card border-white shadow">
    <img class="card-img-top" src=" ${array[infos].imageUrl}" alt="" />
    <div class="card-body" >
    <h5 class="card-title">${array[infos].name}</h5>
    <p class="card-text"> Prix: ${array[infos].price / 100}€</p>
    <p class="card-text font-italic" >${array[infos].description}</p>
    </div>
    </div>
    </div>
    `;

      document.getElementById("card-container").innerHTML = output;
    }
  });
/*
// creer une fct qui creer des elements afin de l'inclure dans la boucle
// de l'array API

//creation les cartes
function createCards(camera) {
  let cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "col-12 col-md-4");
  cardContainer.innerHTML = `<div class="card">
    <img class="card-img-top" src=" ${array[infos].imageUrl}" alt="" />
    <div class="card-body">
    <h5 class="card-title">${array[infos].name}</h5>
    <p class="card-text"> Prix: ${array[infos].price}</p>
    <p class="card-text">${array[infos].description}</p>
    </div>
    </div>
    `;
  document.getElementById("row").appendChild(cardContainer);
}
*/
