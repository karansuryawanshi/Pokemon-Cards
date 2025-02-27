import React from "react";
import Link from "next/link";
import Image from "next/image";

const cards = (pokemon) => {
  console.log("Pokemon", pokemon.pokemon.image);
  return (
    <Link key={pokemon.pokemon.id} href={`/pokemon/${pokemon.pokemon.id}`}>
      <div className="relative p-4 rounded-lg flex flex-col text-center items-center justify-center shadow cursor-pointer hover:scale-105 hover:bg-neutral-800/60 duration-300 bg-neutral-800/90 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_10%,rgba(0,0,0,0)_70%)] before:rounded-lg before:z-0">
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src={pokemon.pokemon.image}
            alt={pokemon.pokemon.name}
            width={150}
            height={150}
          />
          <p className="text-center text-xl font-semibold mt-2">
            {pokemon.pokemon.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default cards;
