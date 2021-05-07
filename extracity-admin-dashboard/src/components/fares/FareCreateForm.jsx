import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import firebase from "../../firebase.config";
const { uuid } = require("uuidv4");

export default function FareCreateForm(props) {
    const history = useHistory();
    const db = firebase.firestore();
    const [to, setTo] = useState();
    const [from, setFrom] = useState();
    const [prices, setPrices] = useState(new Map());

    const updatePrices = (currency, amount) => {
              prices.delete(currency);
              prices.set(currency, amount);
            }

    const handleSubmit= (e) => {
      e.preventDefault();
      if (to == undefined || to == "" || from == undefined || from == "" || prices == undefined || prices.length == 0)alert("Please fill in all input fields!");
      else{
        let id = uuid();
        console.log(prices);
        var possibleTrips = [`${from}-${to}`,`${to}-${from}`];
        //save
        db
          .collection("fares")
          .add({
            id: id,
            to: to,
            from: from,
            possibleTrips: possibleTrips,
            prices: Object.fromEntries(prices),
            date: new Date(),
          })
          .then(
            (ref) =>
              // fetching free slots
              history.push("/fares")
          )
          .catch(
            (e) => alert("An error occurred!")
          );
      }
    }
  
    return (
      <form onSubmit={e => {handleSubmit(e)}}>
        <br/>
        <br/>
        <label>From</label>
        <br />
        <input 
          name='from' 
          type='text'
          value={from}
          required
          onChange={e => setFrom(e.target.value)} 
        />
        <br/>
        <br/>
        <label>To</label>
        <br />
        <input 
          name='to' 
          type='text' 
          value={to}
          required
          onChange={e => setTo(e.target.value)}
        />
        <br/>
        <br/>
        <label>Fares</label>
        <br />
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>
                <input 
                  name='to' 
                  type='text' 
                  onChange={e => updatePrices("USD",e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>ZWL</td>
              <td>
                <input 
                  name='to' 
                  type='text' 
                  onChange={e => updatePrices("ZWL",e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>ZAR</td>
              <td>
                <input 
                  name='to' 
                  type='text' 
                  onChange={e => updatePrices("ZAR",e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          value='Save' 
        />
      </form>
    )
  }