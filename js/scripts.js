let pokemonRepository = (function () {
  let pokemonList = [];
  let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50'

  function getAll() {
    return pokemonList;
  }
    
  function add(pokemon) {
    pokemonList.push(pokemon);
  }


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    })  
  }


  // try creating separate function for event listener
  function clicksHandler(listener, pokemon) {
    listener.addEventListener('click', function(e) {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list')
    let listItem = document.createElement('li')
    let button = document.createElement('button')
    button.innerText = pokemon.name
    button.classList.add('pokemon-name')
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    clicksHandler(button, pokemon);
  } 

  function loadList() {
    return fetch(pokemonApiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
        console.error(error);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height
      item.weight = details.weight
      item.types = details.types
    }).catch(function (error) {
      console.error(error);
    });
  }
    

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})
// adds each pokemon name to a button - logs name when clicked

