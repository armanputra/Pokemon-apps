import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Stats from "@/components/stat";
import PokemonBasicInfo from "@/components/info-pokecard";
import AbilityCard from "@/components/ability-card";
import MoveCard from "@/components/move-card";
import PokemonCard from "@/components/poke-cart";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

function PokemonDetail() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    fetchPokemon();
  }, [id]);

  const handleCatchClick = () => {
    navigate(`/pokemon-form/${id}`);
  };

  if (!pokemon) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-slate-200">
        <Navbar />
        <div className="bg-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 mt-20 bg-slate-200">
            <div className="text-left">
              <PokemonCard pokemon={pokemon} />
            </div>
            <div className="my-4 mx-4 ">
              <Stats stats={pokemon.stats} />
            </div>
          </div>
          <div className="grid grid-cols-1 mx-4 my-4">
            <PokemonBasicInfo
              name={pokemon.name}
              weight={pokemon.weight}
              height={pokemon.height}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-11 mt-6 mb-14 p-4 bg-slate-200">
            <div className="bg-white p-4 rounded-md shadow-md transition duration-300 hover:scale-105">
              <AbilityCard abilityName={pokemon.abilities[0].ability.name} />
            </div>
            <div className="bg-white p-4 rounded-md shadow-md transition duration-300 hover:scale-105">
              <div className="grid ">
                {pokemon.moves.slice(0, 5).map((move, index) => (
                  <MoveCard key={index} moveName={move.move.name} />
                ))}
              </div>
            </div>
            <div className="col-span-2 text-center mb-8">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleCatchClick}
              >
                Catch
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
