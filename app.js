const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const barsearch = document.querySelector(".barsearch")
const form = document.querySelector('.form');
const type_text = document.querySelector('.type');

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

        type_text.innerHTML = "type: "
        data.types.map(type => type_text.innerHTML +=`${type.type.name} `);

        pokeimg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        console.log(pokeimg.src)
        pokeimg.addEventListener("error", () => {
            pokeimg.src = data['sprites']['front_default']
        })

        barsearch.value = '';

    }else{
        barsearch.value = '';
        pokeimg.src = "img/pokemon ERROR.gif"
        name.innerHTML = `º§%"+(&`
        id.innerHTML = `#¨%@(*)`
        type_text.innerHTML = "type: $(`^~|?"
    }
}

form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    barsearch.innerHTML = ""
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