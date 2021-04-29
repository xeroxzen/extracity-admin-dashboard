import React from "react";
import "./App.css";
import firebase from "./firebase.config";

function App() {
  const [reservations, setReservations] = React.useState([]);

  React.useEffect(() => {
    const fetchReservations = async () => {
      const db = firebase.firestore();
      const data = await db.collection("reservations").get();
      setReservations(data.docs.map((doc) => doc.data()));
    };
    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Extracity</h1>
      <ol>
        {reservations.map((reservation) => (
          <li key={reservation.ID}>{reservation.fullname}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
