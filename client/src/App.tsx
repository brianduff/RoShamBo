import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [page, setPage] = useState("welcome")

  switch (page) {
    case "game": return <Game />
    default: return <Welcome setPage={setPage}></Welcome>
  }
}

function Welcome(props: any) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Rock Paper Scissors
        </p>
        <button onClick={() => props.setPage("game")}>Play <i className="fa-solid fa-play"></i></button>
      </header>
    </div>
  );
}

function Game() {
  const [name, setName] = useState("");
  const [goClicked, setGoClicked] = useState(false);

  const opponentName = randomBotName();
  const opponentWeapon = randomNumber(3); // Either 0, 1, or 2.

  return <div className="App-header">

    {!goClicked && <>
      Enter your name:
      <input type="text" value={name} onChange={(e: any) => setName(e.target.value)} />
      <button onClick={() => setGoClicked(true)}>Go!</button>
    </>}


    {goClicked && <ChooseWeapon name={name} opponent={opponentName} opponentWeapon={opponentWeapon}></ChooseWeapon>}

  </div>
}

const WEAPON_NAMES = ["rock", "paper", "scissors"]


function ChooseWeapon(props: any) {
  const [winner, setWinner] = useState<string | null>(null);
  const [myWeapon, setMyWeapon] = useState<number | null>(null);

  function click(n: number) {
    setMyWeapon(n);
    const myWeapon = n;                          // 0=rock, 1=paper, 2=scissors
    const opponentWeapon = props.opponentWeapon; // 0=rock, 1=paper, 2=scissors

    if (myWeapon === opponentWeapon) {
      // it's a draw!
      setWinner("")
    } else if (myWeapon - 1 === opponentWeapon) {
      // I won!
      setWinner(props.name)
    } else if (myWeapon === 0 && opponentWeapon === 2) {
      // I won!
      setWinner(props.name)
    } else {
      // Opponent won!
      setWinner(props.opponent);
    }
  }

  return <>
    {!myWeapon && <>Choose your weapon, {props.name}
      <div>
        <Weapon onClick={() => click(0)} icon="rock"></Weapon>
        <Weapon onClick={() => click(1)} icon="paper"></Weapon>
        <Weapon onClick={() => click(2)} icon="scissors"></Weapon>
      </div></>}

    {myWeapon && <>
      <Weapon icon={WEAPON_NAMES[myWeapon]}></Weapon>
      <Weapon icon={WEAPON_NAMES[props.opponentWeapon]}></Weapon>
    </>}
    {winner === null && <>Waiting for your opponent {props.opponent} to choose...</>}
    {winner === "" && <>It's a draw!</>}
    {winner && <>The winner is {winner}</>}
  </>
}

function Weapon(props: any) {
  return <button onClick={props.onClick} className="WeaponButton">
    <i className={"fas fa-hand-" + props.icon}></i>
  </button>
}

function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function randomItem(items: string[]) {
  return items[randomNumber(items.length)]
}

function randomBotName() {
  return randomItem(BOT_FIRST_NAMES) + randomItem(BOT_LAST_NAMES)
}

const BOT_FIRST_NAMES = [
  "Plunky",
  "Stick",
  "Roaming",
  "Fluffy",
  "Helter",
  "Robo",
  "Cyclo",
  "Logic"
]

const BOT_LAST_NAMES = [
  "BotBrain",
  "Dalek",
  "Automoton",
  "Scuttlebot",
  "Tron",
  "Skeeter",
  "RainGut",
  "PoopSmile",
  "Fart",
  "Stench",
  "Gulp"
]
