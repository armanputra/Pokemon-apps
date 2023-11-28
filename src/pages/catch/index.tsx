import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PokemonInfo = () => {
  const [pokemonData, setPokemonData] = useState<any>({});
  const [pokemonName, setPokemonName] = useState("");
  const [captureResult, setCaptureResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-form/${id}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const saveCapturedPokemon = (pokemonName: string, originalName: string, imageUrl: string | undefined) => {

    const capturedPokemon = {
      name: pokemonName || originalName,
      originalName: originalName,
      imageUrl: imageUrl
    };

    const myPokemon = localStorage.getItem("myPokemon");
    if (myPokemon) {
      const parsedPokemon = JSON.parse(myPokemon);
      parsedPokemon.push(capturedPokemon);
      localStorage.setItem("myPokemon", JSON.stringify(parsedPokemon));
    } else {
      localStorage.setItem("myPokemon", JSON.stringify([capturedPokemon]));
    }
  };

  const capturePokemon = () => {
    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      setShowPopup(true);
      setCaptureResult(`Congratulations You caught ${pokemonData.name}`);
    } else {
      setShowPopup(true);
      setCaptureResult("Oops! Failed to catch the Pokemon. Try again!");
    }
    
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const handleSubmit = () => {
    if (pokemonName.trim() !== "") {
      saveCapturedPokemon(
        pokemonName,
        pokemonData.name,
        pokemonData.sprites?.front_default
      );

      setCaptureResult(
        `Congratulations! You Pokemon Name ${pokemonName || pokemonData.name}!`
      );
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        window.location.href = "/";
      }, 2000);
    } else {
      setCaptureResult("Please enter a name for the Pokemon.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white min-h-screen">
        <Navbar />
        <div
          className="min-h-screen p-1"
          style={{
            backgroundImage:
              'url("https://www.shutterstock.com/shutterstock/photos/1794636469/display_1500/stock-photo-bloody-river-anime-background-landscape-illustration-1794636469.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-16 p-4">
            <div className="rounded-lg bg-green-900 mt-4 p-2 border border-white">
              <h1 className="text-2xl font-bold mb-2 mt-2 text-white text-center ">
                will {pokemonData.name} appear
              </h1>
            </div>
            <img
              src={pokemonData.sprites?.front_default}
              alt="Pokemon"
              className="mx-auto mb-4 h-48 w-48 "
            />
          </div>

          {showPopup && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6">
            <p className=" font-semibold mb-4">{captureResult}</p>
            {captureResult.includes('Congratulations') ? (
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Enter Pokemon nickname"
                  value={pokemonName}
                  onChange={handleNameChange}
                  className="border border-gray-300 rounded mb-4 px-4 py-2 focus:outline-none"
                />
                <div className="flex justify-center space-x-4 ">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded focus:outline-none"
                  >
                    Catch
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPopup(false)}
                className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded focus:outline-none"
              >
                OK
              </button>
            )}
          </div>
          
          
          )}

          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center rounded-lg bg-blue-900 px-4 py-3 ml-2 border border-white">
              <h1 className="font-bold mb-2 mt-2 text-white">
                what will you do?
              </h1>
            </div>
            <div className="flex justify-center rounded-lg bg-orange-700 px-4 py-3 mr-2 border border-white">
              <h1 className="font-bold mb-2 mt-2 text-white">
                <button onClick={capturePokemon}>Catch Pokemon</button>
              </h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PokemonInfo;
