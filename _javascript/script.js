const pokeNumber = document.querySelector('span#pokeNumber')
const pokeName = document.querySelector('span#pokeName')
const pokeImage = document.querySelector('img#pokeImage')
const input = window.document.querySelector('input#searchInput')
const rng = Math.floor((Math.random() * 649) + 1) // random number generator, o maior número é 
                                                  // 649 pois é o último pokémon da national dex da gen 5. 

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    
    if ( APIResponse.status ===  200 ) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokeNumber.innerHTML = ''
    pokeName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon)

    if ( data ) {
        pokeNumber.innerHTML = data.id
        pokeName.innerHTML = data.name
        
        const rngShiny = Math.floor((Math.random() * 4096) + 1)
        console.log("Shiny probability: " + rngShiny)
        if(rngShiny === 1) {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        } else {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }

        input.value = ''
    } else {
        pokeName.innerHTML = 'Not found.'
    }

}

function Search() {
    let pokeInput = input.value
    
    if ( pokeInput.length < 1) {
        renderPokemon(`${rng}`)
    }

    renderPokemon(pokeInput)

    input.focus()
}

function Previous() {
    pokeName.innerHTML = "Testando Anterior..."
}

function Next() {
    pN = Number( `${pokeNumber + 1}` )
    renderPokemon(`${pN + 1}`)
}

renderPokemon(`${rng}`) // Mostra um pokemon com o numero aletorio passado