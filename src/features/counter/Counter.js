import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  timesAThousand,
  divAThousand,
  selectCount,
  selectPirate,
  fetchPirate
}  from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const pirate = useSelector(selectPirate); //this hook gives us redux store state

  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);

  useEffect(() => {dispatch(fetchPirate())} , [])

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8081/movies/61c59202-3b4f-4a12-aab1-af5a16489def/events",{withCredentials: false})
    eventSource.onmessage = e => {
      //updateProdutList(JSON.parse(e.data))
      console.log(JSON.parse(e.data))
    }
  }, [])


  const getMovies = async () => {
    let response = await fetch(`http://localhost:8081/movies`);
    let data = await response.json()
    return data;
  }


  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(
              fetchPirate()
            )
          }
        >
          GET
        </button>
        <p>First name:{pirate.firstName}</p>
        <p>Last name name:{pirate.lastName}</p>
        <p>Age:{pirate.age}</p>
      </div>
    </div>
  );
}
