import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import TripStopsTable from '../../components/trips/TripStopsTable'
import firebase from "../../firebase.config";
import { useParams } from "react-router-dom";

export default function TripStops() {
	let { id } = useParams();
	const db = firebase.firestore();
	const [trip, setTrip] = React.useState();
	let display;

	//get the trip
	const fetchData = () => {
		const db = firebase.firestore();
		db.collection("trips").doc(id).get().then((doc) => {
			console.log(doc);
			if (doc.exists)setTrip(doc.data());}
		);	
	}
	
	React.useEffect(() => {
		fetchData();
	}, []);

	//display the stops

	if (trip != undefined && trip != null)
		display = (
			<div>
				<h1>{trip.name}</h1>
				<TripStopsTable trip={trip}/>
			</div>
		);
	else 
		display = (
				<h1>Trip not found!</h1>
		);
    

    return (
	        <div>
	            <Navbar />
	            {display}
	            <Footer />
	        </div>
	    );
}
