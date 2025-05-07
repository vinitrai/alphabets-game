import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Dice from "./components/Dice";

const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function App() {
  const [dice, setDice] = useState(generateAllLetters());
  const buttonRef = useRef(null);

  // Helper: generate the full set of 26 dice
  function generateAllLetters() {
    return new Array(26).fill(null).map((_, index) => ({
      id: nanoid(),
      isHeld: false,
      value: alphabet[Math.floor(Math.random() * alphabet.length)]
    }));
  }

  // Helper: check if a given letter at index is correct
  function isCorrectLetter(index, value) {
    return alphabet[index] === value;
  }

  // Check if all letters match the alphabet
  function checkWin() {
    return dice.every((die, index) => isCorrectLetter(index, die.value) && die.isHeld);
  }

  const gameWon = checkWin();

  function rollDice() {
    if (!gameWon) {
      setDice(prevDice => {
        const heldLetters = prevDice
          .filter(die => die.isHeld)
          .map(die => die.value);
  
        const remainingLetters = alphabet.filter(
          letter => !heldLetters.includes(letter)
        );
  
        const shuffledRemaining = [...remainingLetters].sort(() => Math.random() - 0.5);
        let nextIndex = 0;
  
        return prevDice.map(die => {
          if (die.isHeld) return die;
  
          const nextLetter = shuffledRemaining[nextIndex] || alphabet[Math.floor(Math.random() * alphabet.length)];
          nextIndex++;
  
          return {
            ...die,
            value: nextLetter
          };
        });
      });
    } else {
      setDice(generateAllLetters());
    }
  }

  // Handle click on parent container for event delegation
  function handleContainerClick(event) {
    const id = event.target.closest('.dice')?.dataset.id;
    if (id) {
      setDice(prevDice =>
        prevDice.map(die =>
          die.id === id
            ? { ...die, isHeld: !die.isHeld }
            : die
        )
      );
    }
  }

  const diceList = dice.map((letter, index) => (
    <Dice
      key={letter.id}
      value={letter.value}
      held={letter.isHeld}
      id={letter.id} 
    />
  ));

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  return (
    <>
      {gameWon && <ReactConfetti />}
      <h1>Alphabets Game</h1>
      <div className="letter_container" onClick={handleContainerClick}>
        {diceList}
      </div>
      <button className="roll-btn" onClick={rollDice} ref={buttonRef}>
        {gameWon ? "Restart" : "Roll Dice"}
      </button>
    </>
  );
}

export default App;