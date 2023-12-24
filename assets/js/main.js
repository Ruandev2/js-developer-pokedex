const pokemonList = document.getElementById('pokemonlist')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit){ 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon)  =>  `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <div class="pokeimg">
                        <img src="assets/img/pokemons/poke_${pokemon.id}.gif" alt="">
                        <img class="imgbackground" src="https://pokemoncalc.web.app/en/assets/pokeball.svg" alt="${pokemon.name}">
                    </div>
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHTML
    })
   
}
loadPokemonItens( offset, limit)
   

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


   

   