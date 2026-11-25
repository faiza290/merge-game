import {useState} from 'react';
import Cell from './Cell';
import './App.css';

const GRID_SIZE=16;

function App(){
  const[grid,setGrid]=useState(Array(GRID_SIZE).fill(null));
  const [selected,setSelected]=useState(null);
  const [score,setScore]=useState(0);

  function spawnItem(){
    const emptyIndexes=[]

    grid.forEach((tier,index)=>{
      if(tier==null){
        emptyIndexes.push(index)
      }
    })
    if(emptyIndexes.length===0) return
    const randomPick=Math.floor(Math.random()*emptyIndexes.length)
    const cellIndex=emptyIndexes[randomPick]
    const newGrid=[...grid]
    newGrid[cellIndex]=1
    setGrid(newGrid)
  }

  function handleCellClick(index){
    const tier=grid[index]
    if(tier===null)return

    if(selected===null){
      setSelected(index)
      return
    }
    if(selected===index){
      setSelected(null)
      return
    }

    if(grid[selected]===tier){
      const newGrid=[...grid]
      newGrid[index]=tier+1
      newGrid[selected]=null
      setGrid(newGrid)
      setScore(score+tier+1)
      setSelected(null)
      return
    }
    setSelected(index)
  }

  function resetGame(){
    setGrid(Array(GRID_SIZE).fill(null))
    setSelected(null)
    setScore(0)
  }

  return(
    <div className="game">
      <h1>Merge Game</h1>
      <button onClick={spawnItem}>Spawn</button>
      <p className="Score">Score: {score}</p>
      <button onClick={resetGame}>Reset</button>
      <div className="board">
        {grid.map((tier,index)=>(
          <Cell key={index} tier={tier} isSelected={selected===index} onClick={()=> handleCellClick(index)}/>
        ))}
      </div>
    </div>
  )
}

export default App;