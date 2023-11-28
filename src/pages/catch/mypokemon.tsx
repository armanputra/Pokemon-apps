import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type CapturedPokemon = {
  name: string;
  originalName: string;
  imageUrl: string;
};

const MyPokemon = () => {
  const [capturedPokemon, setCapturedPokemon] = useState<CapturedPokemon[]>([]);

  useEffect(() => {
    const myPokemon = localStorage.getItem("myPokemon");
    if (myPokemon) {
      const parsedPokemon: CapturedPokemon[] = JSON.parse(myPokemon);
      setCapturedPokemon(parsedPokemon);
    }
  }, []);

  const handleReleasePokemon = (index: number) => {
    const updatedPokemonList = [...capturedPokemon];
    updatedPokemonList.splice(index, 1);
    setCapturedPokemon(updatedPokemonList);
    localStorage.setItem("myPokemon", JSON.stringify(updatedPokemonList));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-slate-200 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mt-8 mb-4">My Pokemon List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-20 p-4 ">
            {capturedPokemon.map((pokemon, index) => (
              <div
                className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105"
                key={index}
              >
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="mx-auto mb-4"
                />
                <div className="text-center">
                  <p className=" font-semibold">{pokemon.name}</p>
                  <p className=" text-gray-600">
                    Original Name: {pokemon.originalName}
                  </p>
                  <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleReleasePokemon(index)}
                  >
                    Release
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MyPokemon;
