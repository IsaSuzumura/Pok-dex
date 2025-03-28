import React, { useEffect, useState } from "react";
import "./style.css"

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonNome, setNome] = useState("");

  function loadAPI(){
    let url = 'https://pokeapi.co/api/v2/pokemon/sylveon';
    fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setPokemon(json)
    })
    .catch(err => console.log(err));
  }

  function searchPokemon(){
    if(!pokemonNome) return;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNome.toLowerCase()}`;

    fetch(url)
      .then(response => {
        if(!response.ok) throw new Error("Pokemon NÃO encontrado");
        return response.json();
      })
      .then(json => {
        console.log(json);
        setPokemon(json);
      })
      .catch(err => {
        console.error(err);
        alert("Pokemon não encontrado! Tente outro nome.")
      });
  }
  useEffect(()=>{
    loadAPI();
  },[])

  return (
    <div className='container'>  
        <header>
          <strong>Pokedex</strong>
        </header>

        <div>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name}/>
          <div>Nome: {pokemon.name}</div>
          <div>Nº {pokemon.id}</div>
          <div>Peso: {pokemon.weight /10}kg</div>
          <div>Altura: {pokemon.height /10}m</div>
          <div>Tipo: {pokemon.types?.[0]?.type.name}</div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Digite o nome do Pokemon"
            value={pokemonNome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button onClick={searchPokemon}>Buscar</button>
        </div>
    </div>
  );
}

export default App;
