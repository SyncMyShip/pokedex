let pokemonRepository = (function () {
    let pokemonList = [
      {
          name: 'Bulbasaur', 
          hp: 45, 
          attack: 49, 
          defense: 49, 
          speed: 45, 
          height: 0.7,
          types: [
              'grass',
              'poison'
          ] 
      },
      {
          name: 'Squirtle',
          hp: 44,
          attack: 48,
          defense: 65,
          speed: 43,
          height: 0.5,
          types: ['water']
      },
      {
          name: 'Charmander', 
          hp: 39,
          attack: 52,
          defense: 43,
          speed: 65,
          height: 0.6,
          types: ['fire']
      }
    ]
    
    function getAll() {
      return pokemonList;
    }
    
    function add(pokemon) {
      pokemonList.push(pokemon);
    }


    function showDetails(pokemon) {
      console.log(pokemon)
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

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
    };
  })();

// adds each pokemon name to a button - logs name when clicked
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})
