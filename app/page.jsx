"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import Link from "next/link";
import Image from "next/image";
import Cards from "./_component/cards";

const PokemonCard = lazy(() => import("./_component/cards"));

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=51");
  const data = await res.json();
  const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
      };
    })
  );
  return pokemons;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);

  console.log(search);

  useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="min-h-screen p-8 text-neutral-300">
        <h1 className="text-sm md:text-4xl font-bold text-center mb-6 flex justify-between px-4 bg-neutral-800/90 rounded-lg py-4">
          <span className="mt-1">Pokemon Explorer</span>
          <p className="flex gap-4 items-center">
            <label
              htmlFor="search"
              className="text-sm hidden md:block sm:text-lg font-semibold"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="rounded-lg font-semibold w-24 sm:w-full text-neutral-900 text-sm px-2 sm:text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </p>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-wrap">
          <Suspense fallback={<p>Loading...</p>}>
            {filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
