import { useState, useEffect } from "react";

function App() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
            .then((res) => res.json())
            .then((res) =>
                setPokemon([
                    ...res.results.map((item) => {
                        return { id: crypto.randomUUID(), name: item.name, selected: 0 };
                    }),
                ])
            );
    }, []);

    const shuffle = (array) => {
        const result = [];

        while (array.length) {
            let cur = array.splice(Math.floor(Math.random() * array.length), 1)[0];
            result.push(cur);
        }

        return result;
    };

    const handleSelect = (e) => {
        setPokemon(shuffle(pokemon.map((mon) => (e.target.textContent === mon.name ? { ...mon, selected: mon.selected + 1 } : mon))));
    };

    return (
        <main>
            <h1>Memory Game</h1>
            <section>
                {pokemon.map((monster) => (
                    <button onClick={handleSelect} data-id={monster.id} key={monster.id}>
                        {monster.name}
                    </button>
                ))}
            </section>
        </main>
    );
}

export default App;
