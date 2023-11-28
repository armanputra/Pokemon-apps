import React from 'react';

interface PokemonInfo {
  name: string;
  weight: number;
  height: number;
}

const PokemonBasicInfo: React.FC<PokemonInfo> = ({ name, weight, height }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md transition duration-300 hover:scale-105">

      <p>Name: {name}</p>
      <p>Weight: {weight}</p>
      <p>Height: {height}</p>
    </div>
  );
};

export default PokemonBasicInfo;
