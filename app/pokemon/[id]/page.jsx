import React from "react";
import Image from "next/image";

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
      <h1 className="text-4xl font-bold flex items-center justify-center bg-neutral-800/90 rounded-lg py-4">
        <span>Pokemon Explorer</span>
      </h1>
      <div className="flex ">
        <div className="w-2/4 bg-neutral-800/90 flex items-center justify-center my-6 rounded-lg">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col w-2/4 bg-neutral-800/90 my-6 mx-6 px-4 rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            {pokemon.name}
          </h1>
          <div className="flex flex-col text-lg text-neutral-300">
            <p>
              <span className="font-semibold">Abilities:</span>{" "}
              {pokemon.abilities}
            </p>
            <p>
              <span className="font-semibold">Types:</span> {pokemon.types}
            </p>
          </div>
          <h2 className="mt-4 font-semibold text-lg">Stats:</h2>
          {/* <ul className="grid grid-cols-2 text-lg"> */}
          <ul className="text-lg flex items-center justify-center">
            {pokemon.stats.map((stat) => (
              <li
                key={stat.name}
                className="mx-5 flex flex-col items-center justify-center"
              >
                <span>{stat.name}</span> <span>{stat.value}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-4 font-semibold text-lg ">Moves:</h2>
          <ul className="text-lg flex flex-wrap">
            {/* <ul className="grid grid-cols-2 text-lg"> */}
            {pokemon.moves.map((move) => (
              <li
                key={move}
                className="mx-4 my-2 border rounded-full px-3 py-1 bg-neutral-700/90 hover:bg-neutral-700/60 duration-300 border-gray-200"
              >
                {move}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
