import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PokemonCard from "@/components/pokemon-cart";

const PokemonInfo = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await response.json();
        const { results, previous, next } = data;

        setPrevPage(previous);
        setNextPage(next);

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon: any) => {
            const pokemonResponse = await fetch(pokemon.url);
            return pokemonResponse.json();
          })
        );

        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    fetchPokemonData();
  }, []);

  const handleNextPage = async () => {
    if (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      const { results, previous, next } = data;

      setPrevPage(previous);
      setNextPage(next);

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: any) => {
          const pokemonResponse = await fetch(pokemon.url);
          return pokemonResponse.json();
        })
      );

      setPokemonData(pokemonDetails);
    }
  };

  const handlePrevPage = async () => {
    if (prevPage) {
      const response = await fetch(prevPage);
      const data = await response.json();
      const { results, previous, next } = data;

      setPrevPage(previous);
      setNextPage(next);

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: any) => {
          const pokemonResponse = await fetch(pokemon.url);
          return pokemonResponse.json();
        })
      );

      setPokemonData(pokemonDetails);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 min-h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-slate-200">
        <Navbar />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 mt-20 mb-4  bg-slate-200 font-press-start">
          {pokemonData.map((pokemon: any, index: number) => (
            <Link key={index} to={`/pokemon/${pokemon.id}`}>
              <PokemonCard pokemonData={pokemon} />
            </Link>
          ))}
        </div>
        <div className="flex justify-between py-4 mb-20 px-4 font-press-start">
          <button
            onClick={handlePrevPage}
            disabled={!prevPage}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
              !prevPage && "cursor-not-allowed opacity-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextPage}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
              !nextPage && "cursor-not-allowed opacity-50"
            }`}
          >
            Next
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PokemonInfo;
