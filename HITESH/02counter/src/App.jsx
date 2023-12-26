import { useState } from 'react'
import {useReducer} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(0) 
  // let counter = 5;
 const addValue = () => {
  // console.log("value added", counter);
  counter = counter + 1;
  if(counter<20){
  setCounter(prevCounter=>prevCounter+1);
  setCounter(prevCounter=>prevCounter+1);
  // setCounter(prevCounter()=>prevCounter+1)
  }
 }
 const remValue = () => {
  setCounter(counter-1);
 }
  return (
    <>
      <h1>Chai aur react</h1>
      <h2> Counter value: {counter}</h2>
      <button onClick={addValue}>Add value</button><br/>
      <button onClick={remValue}>remove value</button>
    </>
  )
  }






export default App;
