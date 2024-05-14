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
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('pokemon-name');

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
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = "";
    
    let modal = document.createElement("div");
    modal.classList.add("modal");
    
    let closeModalButton = document.createElement('button');
    closeModalButton.classList.add('modal-close');
    closeModalButton.innerText = 'Close';
    closeModalButton.addEventListener('click', hideModal);

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

    modalContainer.appendChild(modal);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonTypes);
    modal.appendChild(closeModalButton);
    
    modalContainer.classList.add("is-visible");
    
    modalContainer.addEventListener('click', function(e) {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
    
    window.addEventListener("keydown", function(e) {
      if (e.key === ("Escape")) {
        hideModal();
      }
    })
  }

  function hideModal() {
  let modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.remove("is-visible");
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    listenForClick: listenForClick,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function(pokemon) {
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})
})