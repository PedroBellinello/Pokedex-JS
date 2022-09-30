//import classes html 
 const pokemonName = document.querySelector(".pokemon_name");
 const pokemonNumber = document.querySelector(".pokemon_number");
 const pokemonImage = document.querySelector(".pokemon_image");

// formularios 
 const form = document.querySelector(".form");
 const input = document.querySelector(".input_search");
 const buttonPrev = document.querySelector(".btn-prev");
 const buttonNext= document.querySelector(".btn-next");


// iniciar pokedex com 1 pokemon selecionado
let searchPokemon = 1;

 //Procura o pokemon na api 
const fechPokemon = async (pokemon) => {
 const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return(data);
    };
};

//renderizar pokemon na tela 
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = 'data.id';

    const data = await fechPokemon(pokemon);
    
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value ="";
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = "Not Found";
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = "none"
    };
};

// recupera o valor do input e envia para a função renderPokemon
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// botão prev
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

// botão next
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});
  
renderPokemon(searchPokemon)