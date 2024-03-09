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
      pokemonList.push(item);
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list')
      let listItem = document.createElement('li')
      let button = document.createElement('button')
      button.innerText = pokemon.name
      button.classList.add('pokemon-name')
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
    }
    
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();

  // // New For Loop //
  pokemonRepository.addListItem().forEach(function(pokemon) {

  })  

  // // Original For Loop //
  // pokemonRepository.getAll().forEach(function(pokemon) {
  //   if (pokemon.height > 0.6) {
  //     document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - Wow, that's big!" + "<br>")
  //   } else {
  //     document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br>")
  //   }
  // })

