import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import classes from './PokemonImages.module.css'


PokemonImages.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function PokemonImages ({ pokemons }) {

  const [images, setImages] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState([score]);
  const [pokemon, setPokemon] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const newGame = () => {
    setIsModalOpen(false);
    setPokemon([])
    setScore(0)
  }

  const addPokemon = (event) => {
    if (!pokemon.includes(event.target.getAttribute('src'))) {
      setPokemon([...pokemon, event.target.getAttribute('src')])
      setScore(score + 1)
      shuffleArray()
    } else {
      setIsModalOpen(true);
      setBestScore([...bestScore, score])      
    }
  }

  const shuffleArray = () => {
    const shuffledArray = [...images].sort(() => Math.random() - 0.5);
    setImages([...shuffledArray])
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const imagesPromises = pokemons.map(async (pokemonId) => {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
          const res = await axios(url);
          return res.data.sprites.front_default;
        });
        const images = await Promise.all(imagesPromises);
        setImages(images);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [pokemons]);

  return (
    <>
      <div className={classes.grid}>
        {images.map((imageUrl, index) => (
          <img className={classes.img} onClick={addPokemon} key={index} src={imageUrl} alt='Изображение покемона' />
        ))}
      </div>
      <p>Счет: {score}</p>
      <p>Лучший счет: {Math.max(...bestScore)}</p>
      {isModalOpen && <Modal newGame={newGame} score={score} bestScore={Math.max(...bestScore)}/>}
    </>
    
  );
}


