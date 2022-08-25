function Search() {
    let pokeInput = window.document.querySelector('input#searchInput').value
    let name = window.document.querySelector('p#pokeName')
    
    if ( pokeInput.length < 1) {
        window.alert("[ERRO] pokeInput.lenght < 1")
    }

    name.innerHTML = `${pokeInput}`
}

function Previous() {
    let name = window.document.querySelector('p#pokeName')
    name.innerHTML = "Testando Anterior..."
}

function Next() {
    let name = window.document.querySelector('p#pokeName')
    name.innerHTML = "Testando Proximo..."
}