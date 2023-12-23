const pokeApi = {}
function pokedetailTopokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types
    pokemon.type = type
    pokemon.types = types
    
    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(pokedetailTopokemon)
}
pokeApi.getPokemons = (offset = 1,limit = 10) => {    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response)=> response.json())
    .then((jsonbody)=> jsonbody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) =>  pokemonsDetails)
} 

