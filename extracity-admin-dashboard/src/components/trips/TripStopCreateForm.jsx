import React, { useState } from "react";
import MultipleTimeSelect from './MultipleTimeSelect';
import { useHistory } from 'react-router-dom';
import firebase from "../../firebase.config";
const { uuid } = require("uuidv4");

function keyMap(src, target){
  target = target || {};
  Object.keys(src).forEach(function(propName){
     var prop = src[propName];
     if(typeof prop == "object"){
       target[propName] = Object.keys(prop).join(',');
       keyMap(prop, target);
     }
  });
  return target;
};

export default function TripStopCreateForm(props) {
    const history = useHistory();
    const db = firebase.firestore();
    const [name, setName] = useState();
    const [
            times, 
            setTimes
          ] = useState(new Map());

    /*
     setFares = (currency, amount) => {
              times.delete(currency);
              if (amount!="" && amount!=undefined && amount!=null){
                times[currency] = amount;
              }
            }
    setTimes = (departure, arrival) => {
              times.delete("time" + departure.toString());
              if (arrival!="" && arrival!=undefined && arrival!=null){
                times["time" + departure.toString()] = arrival;
              }
            }
    */




    const handleSubmit= (e) => {
      e.preventDefault();
      if (name == undefined || name == "" || times == undefined || times.length == 0)alert("Please fill in all input fields!");
      else{
        let id = uuid();

        var stops = props.trip?.stops ?? new Map();

        //console.log(stops);
        //stops.delete(name);
        stops[name] = {
          id: id,
          name: name,
          times: Object.fromEntries(times),
          date: new Date(),
        }

        //create possible trips
        //[from] to any other stop including [to]
        //[stop] to any other [stop]
        var arr = Array.from(new Map(Object.entries(stops)).values());
        var to_to_stops = [`${props.trip?.from}-${props.trip?.to}`];
        var from_to_stops = (arr).map((item) => `${props.trip?.from}-${item.name}`);
        var stops_to_stops = new Array();
        for (var x=0; x<arr.length; x++){
          stops_to_stops.push(`${arr[x].name}-${props.trip?.to}`);
          if (x<arr.length-1){
            for (var y=x+1; y<arr.length;y++){
              stops_to_stops.push(`${arr[x].name}-${arr[y].name}`);
            }
          }
        }

        var possibleTrips = to_to_stops.concat(from_to_stops, stops_to_stops);

        //save
        db
          .collection("trips")
          .doc(props.docID)
          .update({stops: stops, possibleTrips: possibleTrips})
          .then(
            (doc) =>
              // fetching free slots
              history.push("/trips/"+ props.docID +"/stops")
          )
          .catch(
            (e) => {alert("An error occurred!");console.log(e);}
          );
      }
    }

    return (
      <form onSubmit={e => {handleSubmit(e)}}>
        <br/>
        <br/>
        <label>City or town name</label>
        <br />
        <input 
          name='name' 
          type='text'
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <br/>
        <label>Times</label>
        <br />
        <table>
          <tr>
            <th>Leaves {props.trip.from} at</th>
            <th>Leaves this stop at</th>
          </tr>
          {
            props.trip.times.map((time) => {
              return (
                    <tr>
                      <td>{time}</td>
                      <td>
                        <input 
                          name='to' 
                          type="number"
                          type='text' 
                          onChange={e => {
                            times.delete(time);
                            setTimes(times.set(time,e.target.value))}
                          }
                        />
                      </td>
                    </tr>
              )
            })
          }
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