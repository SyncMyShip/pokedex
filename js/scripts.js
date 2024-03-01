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
];

// writes the name of the Pokemon && appends a string if height is > 0.6
pokemonList.forEach(function(pokemon) {
    if (pokemon.height > 0.6) {
      document.write(pokemon.name + " (height: " + pokemon.height + ")" + " - Wow, that's big!" + "<br>")
    } else {
      document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br>")
    }
  })