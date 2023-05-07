const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const barsearch = document.querySelector(".barsearch")
const form = document.querySelector('.form');

const pokeimg = document.querySelector(".pokeimg")
let name = document.querySelector(".name")
const id = document.querySelector(".id")

let numberpokemon = 0

const required_pokemon = async (pokemon) => {
    const api_pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (api_pokemon.status === 200){
        const data = api_pokemon.json()
        return data;
    }
}

const loading_pokemon = async (pokemon) => {
     
    const data = await required_pokemon(pokemon)

    if (data){
        pokeimg.style.display = "block"
        name.innerHTML = data.name
        id.innerHTML = `#${data.id}`
        numberpokemon = data.id

        pokeimg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        console.log(pokeimg.src)
        pokeimg.addEventListener("error", () => {
            pokeimg.src = data['sprites']['front_default']
        })
        barsearch.value = ""
    }else{
        pokeimg.src = "img/pokemon ERROR.gif"
        name.innerHTML = `ERRO`
        id.innerHTML = `pokemon não encontrado`
    }
}

form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    loading_pokemon(barsearch.value.toLowerCase())
})

next.addEventListener("click", async function(){
    numberpokemon++
    loading_pokemon(numberpokemon)
})

prev.addEventListener("click", function(){
    if(numberpokemon > 1){
        numberpokemon--
        loading_pokemon(numberpokemon)
}})

//let type = data.types.map(type => type.type.name);