import PokemonImages from './components/PokemonImages/PokemonImages';

const App = () => {

  const pokemons = [3, 6,  9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75];
  
  return (
    <div>
     <PokemonImages pokemons={pokemons} />
    </div>
  );
};

export default App;

