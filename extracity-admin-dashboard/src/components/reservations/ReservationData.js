import React from "react";
import firebase from "../../firebase.config";
import { ReservationInput } from "./ReservationInput";

export default function ReservationData() {
  //reservation state
  const [reservations, setReservations] = React.useState([]);

  React.useEffect(() => {
    const fetchReservations = async () => {
      const db = firebase.firestore();
      const data = await db.collection("reservations").get();
      setReservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchReservations();
  }, []);

  return (
    <div>
      <ol>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <ReservationInput booking={reservation} />
          </li>
        ))}
      </ol>
    </div>
  );
}
