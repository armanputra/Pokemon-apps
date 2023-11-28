import React from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-white p-4 rounded-md text-left my-4 mx-4 shadow-md transition duration-300 transform hover:scale-105">
    <img
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
      className="mx-auto mb-4 w-64 h-64 rounded-md border border-gray-300 transform hover:rotate-6 transition duration-300"
    />
    <div>
      <div className="flex flex-wrap gap-2">
        {pokemon.types.map((type, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white py-2 px-4 rounded-md text-sm capitalize"
          >
            {type.type.name}
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
  );
};

export default PokemonCard;
