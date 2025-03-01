import React from "react";
import Image from "next/image";
import Spot from "@/app/_component/spot";
import SpotlightCard from "@/SpotlightCard/SpotlightCard";

async function getPokemonDetails(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const details = await res.json();
  console.log("Details", details);
  return {
    id: details.id,
    name: details.name,
    image: details.sprites.front_default,
    abilities: details.abilities.map((a) => a.ability.name).join(", "),
    types: details.types.map((t) => t.type.name).join(", "),
    stats: details.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    moves: details.moves.map((m) => m.move.name).slice(0, 10),
  };
}

export default async function PokemonDetail({ params }) {
  const pokemon = await getPokemonDetails(params.id);

  return (
    <div className="min-h-screen p-8 bg-black">
      <h1 className="sm:text-4xl font-bold flex items-center justify-center bg-neutral-800/90 rounded-lg py-4">
        <span>Pokemon Explorer</span>
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-2/4 bg-neutral-800/90 flex items-center mx-2 justify-center my-6 rounded-lg before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_10%,rgba(0,0,0,0)_70%)] before:rounded-lg before:z-0">
          <div className="relative z-10 flex items-center justify-center">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={500}
              height={500}
            />
          </div>
        </div>

        <SpotlightCard className="flex flex-col w-full md:w-2/4 bg-neutral-800/90 my-6 mx-2 md:mx-6 px-4 rounded-lg">
          <h1 className="text-xl pt-2 md:text-4xl font-bold text-center mb-6">
            {pokemon.name}
          </h1>
          <div className="flex flex-col text-base sm:text-lg text-neutral-300">
            <p>
              <span className="font-semibold">Abilities:</span>{" "}
              {pokemon.abilities}
            </p>
            <p>
              <span className="font-semibold">Types:</span> {pokemon.types}
            </p>
          </div>
          <h2 className="mt-4 font-semibold text-base sm:text-lg">Stats:</h2>
          {/* <ul className="grid grid-cols-2 text-lg"> */}
          <ul className="grid grid-cols-2 text-base sm:text-lg sm:flex sm:flex-wrap items-center justify-center">
            {pokemon.stats.map((stat) => (
              <li
                key={stat.name}
                className="mx-5 my-3 flex flex-col items-center justify-center"
              >
                <span>{stat.name}</span> <span>{stat.value}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-4 font-semibold text-base sm:text-lg ">Moves:</h2>
          <ul className="text-sm sm:text-lg flex flex-wrap">
            {pokemon.moves.map((move) => (
              <li
                key={move}
                className="mx-4 my-2 border rounded-full px-3 py-1 bg-neutral-700/90 hover:bg-neutral-700/60 duration-300 border-gray-200"
              >
                {move}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </div>
  );
}
