import React from "react";
import "./App.css";
// import firebase from "./firebase.config";
// import ReservationInput from "./components/reservations/ReservationInput";
// import ReservationData from './components/reservations/ReservationData';
import ReservationTable from './components/reservations/ReservationTable'

function App() {
  // const [reservations, setReservations] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchReservations = async () => {
  //     const db = firebase.firestore();
  //     const data = await db.collection("reservations").get();
  //     setReservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   fetchReservations();
  // }, []);

  return (
    <div>
      <h1>Extracity</h1>
      {/* <ReservationData /> */}
      <ReservationTable />
    </div>
  );
}

export default App;
