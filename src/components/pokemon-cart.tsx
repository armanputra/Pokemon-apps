import React, { useState } from "react";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  id: number;
}

interface PokemonCardProps {
  pokemonData: PokemonData;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonData }) => {
  const [isHovered, setIsHovered] = useState(false);
 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  const cardClassName = `bg-white rounded-lg shadow-md p-4 max-w-xs mx-auto transition-transform transform hover:shadow-xl ${
    isHovered ? "scale-105" : ""
  }`;

  return (
    <div
      className={`${cardClassName} mt-4 mb-4 w-48 h-48`} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        className="w-32 h-32 mx-auto mb-4" 
      />
      <h2 className=" font-semibold text-center relative z-10">
        {pokemonData.name}
      </h2>
      

    </div>
  );
};

export default PokemonCard;
