let pokemonRepository = (function () {
  let pokemonList = []
  
  function loadList() {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25'
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.name = details.name;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map(function(pokemon) {
        return pokemon.type.name
      });
      return addListItem(pokemon)
    }).catch(function(e) {
      console.error(e);
    })
  }

  function getAll() {
     return pokemonList;
  }

  function add(pokemon) {
    if (typeof(pokemon) === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.log('invalid data type');
    }
  }

  function addListItem(pokemon) {
    let pokemonContainer = document.querySelector('.container');
    let pokemonRow = document.querySelector('.pokemon-container')
    let pokemonColumn = document.createElement('div');
    let button = document.createElement('button');

    button.innerText = "Show More"
    button.classList.add("show-details", "btn", 'btn-primary', "btn-block");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");
    pokemonColumn.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");


    // customize pokemon card
    let pokemonCard = document.createElement('div')
    let pokemonCardBody = document.createElement('div');
    let pokemonCardTitle = document.createElement('h5');
    let pokemonCardImage = document.createElement('img');

    pokemonCard.classList.add("card")
    pokemonCardBody.classList.add("card-body");
    pokemonCardTitle.classList.add("card-title");
    // pokemonCardImage.src = loadDetails.imageUrl;
    pokemonCardImage.classList.add("card-img-top", "card-img");
    let capitalTitle = pokemon.name
    pokemonCardTitle.innerText = capitalTitle.toUpperCase();

    pokemonCard.appendChild(pokemonCardBody);
    pokemonCardBody.appendChild(pokemonCardImage);
    pokemonCardBody.appendChild(pokemonCardTitle);
    pokemonCardBody.appendChild(button);


    pokemonColumn.appendChild(pokemonCard);
    pokemonRow.appendChild(pokemonColumn);
    pokemonContainer.appendChild(pokemonRow);

    // if (pokemon.types.includes("grass")) {
    //   pokemonCard.classList.add("grass-type")
    // }

    listenForClick(button, pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // listen for a click on an element
  function listenForClick(el, pokemon) {
    el.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle= document.querySelector(".modal-title");
    modalTitle.innerText = "";
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerText = "";
    let capitalTitle = pokemon.name

    // insert pokemon details in modal
    let pokemonName = document.createElement("h3");
    pokemonName.innerText = capitalTitle.toUpperCase();
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add("modal-img");
    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "Height: " + pokemon.height;
    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "Weight: " + pokemon.weight;
    let pokemonTypes = document.createElement("p");
    pokemonTypes.innerText = "Types: " + pokemon.types.join(", ");

    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonTypes);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    listenForClick: listenForClick,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})
})