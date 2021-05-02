import React from "react";
import firebase from "../../firebase.config";
import ReservationInput from "./ReservationInput";

export default function ReservationData() {
  //reservation state
  const [reservations, setReservations] = React.useState([]);
  const [newReservation, setNewReservation] = React.useState();

  React.useEffect(() => {
    const fetchReservations = async () => {
      const db = firebase.firestore();
      const data = await db.collection("reservations").get();
      setReservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchReservations();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("reservations").add({ name: newReservation });
  };

  return (
    <div>
      <ol>
        <input
          value={newReservation}
          onChange={(e) => setNewReservation(e.target.value)}
        />
        <button onClick={onCreate}>Create</button>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <ReservationInput booking={reservation} />
          </li>
        ))}
      </ol>
    </div>
  );
}
