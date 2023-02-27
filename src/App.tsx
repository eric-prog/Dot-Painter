import { MouseEvent, useState } from 'react';
// import logo from './logo.svg';
import './App.css';


interface Dots {
  x: number,
  y: number
}

function App() {
  const [dots, setDots] = useState<Dots[]>([])
  const [cache, setCache] = useState<Dots[]>([])

  const draw  = (e: MouseEvent) => {
    const { clientX, clientY } = e // keys named clientX and clientY in e (event) and set equal to clientX. Searches within object e
    setDots([...dots, {x: clientX, y: clientY}])
  } 

  const undo = () => {
    if (dots.length > 0) {
      const newDots = [...dots] // clone of old dots
      const lastDot = newDots.pop() as Dots // gets last value of array and returns it (only if array exists)
      
      Promise.all([
        setCache([...cache, lastDot]),
        setDots(newDots)
      ])
    }
  }

  const redo = () => {
    if (cache.length > 0) {
      const newCache = [...cache]
      const lastCacheItem = newCache.pop() as Dots

      Promise.all([
        setDots([...dots, lastCacheItem]),
        setCache(newCache)
      ])
    }
  }

  return (
    <div className="App">
      <div id='button-wrapper'>
        <button onClick={() => redo()}>Redo</button>
        <button onClick={() => undo()}>Undo</button>
      </div>
      <div id='click-area' onClick={(e) => draw(e)}>
        {dots.map(({x, y}: Dots, i: number) => (
          <div key={i} style={{left: x, top: y}} className='dot'></div>
        ))}
      </div>
    </div>
  );
}

export default App;
