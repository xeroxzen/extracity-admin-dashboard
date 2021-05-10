import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import TripStopCreateForm from '../../components/trips/TripStopCreateForm'
import firebase from "../../firebase.config";
import { useParams } from "react-router-dom";

export default function AddTripStop() {
	let { id } = useParams();
	// const db = firebase.firestore();
	const [trip, setTrip] = React.useState();
	const [docID, setDocID] = React.useState();
	let display;

	//get the trip
	// const fetchData = () => {
	// 	const db = firebase.firestore();
	// 	db.collection("trips").doc(id).get().then((doc) => {
	// 		console.log(doc);
	// 		if (doc.exists) {
	// 			setTrip(doc.data());
	// 			setDocID(doc.id);
	// 		}
	// 	}
	// 	);
	// }

	// React.useEffect(() => {
	// 	fetchData();
	// }, []);

	React.useEffect(() => {
		const fetchData = () => {
			const db = firebase.firestore();
			db.collection("trips").doc(id).get().then((doc) => {
				console.log(doc);
				if (doc.exists) {
					setTrip(doc.data());
					setDocID(doc.id);
				}
			}
			);
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	//display the stops

	if (trip !== undefined && trip !== null)
		display = (
			<div>
				<h1>{trip.name}</h1>
				<TripStopCreateForm trip={trip} docID={docID} />
			</div>
		);
	else
		display = (
			<h1>Trip not found!</h1>
		);


	return (
		<div>
			<Sidebar />
			{display}
			<Footer />
		</div>
	);
}
