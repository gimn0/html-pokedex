const pokeNumber = document.querySelector('#pokeNumber')
const pokeName = document.querySelector('#pokeName')
const pokeImage = document.querySelector('#pokeImage')
const input = window.document.querySelector('#searchInput')
const rng = Math.floor((Math.random() * 649) + 1) // random number generator, o maior número é 
                                                  // 649 pois é o último pokémon da national dex da gen 5. 
let indexPokemon = rng // variavel para as funçoes previous e next

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
        pokeImage.style.display = 'block'
        pokeNumber.innerHTML = data.id
        pokeName.innerHTML = data.name
        indexPokemon = data.id
        
        const rngShiny = Math.floor((Math.random() * 4096) + 1) // variavel para aparecer o sprite shiny do pokemon
        // console.log("Shiny probability: " + rngShiny)
        if(rngShiny === 1) {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        } else {
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }

        input.value = ''
    } else {
        pokeImage.style.display = 'none'
        pokeName.innerHTML = 'Not found.'
    }

}

function Search() {
    let pokeInput = input.value
    
    if ( pokeInput.length < 1) {
        return renderPokemon(`${rng}`)
    } else if ( pokeInput < 1 || pokeInput > 649 ) {
        pokeNumber.innerHTML = ''
        return pokeName.innerHTML = 'Only up to gen 5.'
    }

    renderPokemon(pokeInput)
    indexPokemon = Number( pokeInput )

    input.focus()
}

function Previous() {
    if ( indexPokemon <= 1 ) {
        indexPokemon = 649 // Vai para o ultimo pokemon disponivel na national dex da gen 5
        return renderPokemon('649')
    }
    
    indexPokemon -= 1
    renderPokemon(`${indexPokemon}`)
}

function Next() {
    if ( indexPokemon >= 649 ) {
        indexPokemon = 1 // Vai para o primeiro pokemon disponivel na national dex
        return renderPokemon('1')
    }
    
    indexPokemon += 1
    renderPokemon(`${indexPokemon}`)
}

renderPokemon(`${rng}`) // Mostra um pokemon com o numero aletorio passado