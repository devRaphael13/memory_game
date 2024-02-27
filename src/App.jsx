import { useState, useEffect } from "react";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

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
        const monster = pokemon.filter((x) => x.name === e.target.textContent)[0];

        if (monster.selected >= 1) {
            setHighScore(highScore > score ? highScore : score);
            setScore(0)
            return
        }
        
        setScore(score + 1);
        setPokemon(shuffle(pokemon.map((mon) => (monster.name === mon.name ? { ...mon, selected: mon.selected + 1 } : mon))));
    };

    return (
        <main>
            <h1>Memory Game</h1>
            <section>
                <div>
                    <h2>Score: {score}</h2>
                    <h2>HighScore: {highScore}</h2>
                </div>

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
