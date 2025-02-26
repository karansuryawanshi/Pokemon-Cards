"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
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

export default async function Home() {
  const pokemons = await getPokemons();

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
            />
          </p>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-wrap">
          {pokemons.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
              <div className="relative p-4 rounded-lg flex flex-col text-center items-center justify-center shadow cursor-pointer hover:scale-105 hover:bg-neutral-800/60 duration-300 bg-neutral-800/90 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_10%,rgba(0,0,0,0)_70%)] before:rounded-lg before:z-0">
                <div className="relative z-10 flex flex-col items-center">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                  <p className="text-center text-xl font-semibold mt-2">
                    {pokemon.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
