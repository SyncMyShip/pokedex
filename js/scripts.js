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
    let pokemonListElement = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    listItem.classList.add("list-group-item")
    button.innerText = pokemon.name;
    button.classList.add("pokemon-name", "btn", 'btn-primary', "btn-block");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    
    listenForClick(button, pokemon);
   
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
      console.log(pokemon);
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

    // insert pokemon details in modal
    let pokemonName = document.createElement("h1");
    pokemonName.innerText = pokemon.name;
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
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function(pokemon) {
pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon); 
})
}) 