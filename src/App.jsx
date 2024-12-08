import React from 'react';
import Dice from './Dice.jsx';
import Confetti from 'react-confetti';
import { nanoid, random } from 'nanoid';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [twelvzies, setTwelvzies] = React.useState(false);
  const [confettiVisible, setConfettiVisible] = React.useState(false);

  const diceElements = dice.map((die) => {
    const randomNumber = Math.ceil(Math.random() * 6);

    return (
      <Dice
        holdDie={() => holdDie(die.id)}
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
      />
    );
  });

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setTwelvzies(true);
      setConfettiVisible(true);

      setTimeout(() => {
        setConfettiVisible(false);
      }, 8000);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 12; i++) {
      newDiceArray.push(generateNewDie());
    }
    return newDiceArray;
  }

  function rollDice() {
    twelvzies
      ? (setDice(allNewDice), setTwelvzies(false))
      : setDice((prevDice) =>
          prevDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
        );
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const CodePics = () => {
    const thePics = (
      <>
        <img src="/code-pic-1.png" alt="pic-1" />
        <br />
        <img src="/code-pic-2.png" alt="pic-2" />
      </>
    );

    return thePics;
  };

  const TheCode = () => {
    const theCode = (
      <>
        <p>FiBi</p>
        <p>SoWh</p>
        <p>FlOr</p>
        <p>FiNa</p>
        <p>SoGr</p>
        <p>StBl</p>
        <p>SoBl</p>
        <p>SoBk</p>
      </>
    );

    return theCode;
  };

  return (
    <main style={{ backgroundColor: twelvzies && 'cornflowerblue' }}>
      {confettiVisible && <Confetti />}
      <h1 className="title">{twelvzies ? 'THE CODE' : "We Rollin'"}</h1>
      <h2 className="description">
        {twelvzies ? (
          <CodePics />
        ) : (
          'Click a number to freeze it. Roll until all are the same!'
        )}
      </h2>
      <div className="dice__container">{twelvzies ? '' : diceElements}</div>
      <button onClick={rollDice} className="roll__dice__button">
        {twelvzies ? 'RESET' : 'Roll!'}
      </button>
    </main>
  );
}
