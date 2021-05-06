import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import TripStopCreateForm from '../../components/trips/TripStopCreateForm'
import firebase from "../../firebase.config";
import { useParams } from "react-router-dom";

export default function AddTripStop() {
	let { id } = useParams();
	const db = firebase.firestore();
	const [trip, setTrip] = React.useState();
	const [docID, setDocID] = React.useState();
	let display;

	//get the trip
	const fetchData = () => {
		const db = firebase.firestore();
		db.collection("trips").doc(id).get().then((doc) => {
			console.log(doc);
			if (doc.exists){
				setTrip(doc.data());
				setDocID(doc.id);
			}
		}
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
				<TripStopCreateForm trip={trip} docID={docID}/>
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
