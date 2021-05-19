import React from 'react';
import moment from 'moment';
import firebase from 'firebase';
import { Line } from "react-chartjs-2";

export default function ActivityChart() {
    const [activityData, setActivityData] = React.useState([]);
    const [byoData, setByoData] = React.useState([]);
    const [harareData, setHarareData] = React.useState([]);
    const [vicfallsData, setVicfallsData] = React.useState([]);
    const [gweruData, setGweruData] = React.useState([]);
    const [kadomaData, setKadomaData] = React.useState([]);
    const [chegutuData, setChegutuData] = React.useState([]);
    const [kwekweData, setKwekweData] = React.useState([]);
    const [hwangeData, setHwangeData] = React.useState([]);

    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        const fetchStats = async () => {
            const db = firebase.firestore();
            let activitiesRef;
            let byo;
            let hre;
            let gweru;
            let kadoma;
            let vicfalls;
            let kwekwe;
            let chegutu;
            let hwange
            let dates = [];

            for (var x = 6; x >= 0; x--) {
                var minDate = new moment().subtract(x, "days");
                dates.push(minDate.format('ddd'));
                var min = new Date();
                min.setDate(min.getDate() - x - 1);
                var max = new Date();
                max.setDate(max.getDate() - x);
                let activitiesTotal = 0;
                // eslint-disable-next-line
                activitiesRef = db.collection("reservations")
                    .where('BookingTime', '>', min).where('BookingTime', '<', max)
                    .get()
                    .then(snapshot => {
                        activitiesTotal += snapshot.size;
                        setActivityData(state => [...state, activitiesTotal]);
                    }, []);

                let byoTotal = 0;
                // eslint-disable-next-line
                byo = db.collection("reservations")
                    .where("TravellingFrom", "==", "Bulawayo").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        byoTotal += snapshot.size;
                        setByoData(state => [...state, byoTotal]);
                    });
                //harare
                let harareTotal = 0;
                // eslint-disable-next-line
                hre = db.collection("reservations")
                    .where("TravellingFrom", "==", "Harare").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        harareTotal += snapshot.size;
                        setHarareData(state => [...state, harareTotal]);
                    });
                //vicfalls
                let vicfallsTotal = 0;
                // eslint-disable-next-line
                vicfalls = db.collection("reservations")
                    .where("TravellingFrom", "==", "Victoria Falls").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        vicfallsTotal += snapshot.size;
                        setVicfallsData(state => [...state, vicfallsTotal]);
                    });
                //gweru
                let gweruTotal = 0;
                // eslint-disable-next-line
                gweru = db.collection("reservations")
                    .where("TravellingFrom", "==", "Gweru").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        gweruTotal += snapshot.size;
                        setGweruData(state => [...state, gweruTotal]);
                    });
                //kwekwe
                let kwekweTotal = 0;
                // eslint-disable-next-line
                kwekwe = db.collection("reservations")
                    .where("TravellingFrom", "==", "Kwekwe").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        kwekweTotal += snapshot.size;
                        setKwekweData(state => [...state, kwekweTotal]);
                    });
                //kadoma
                let kadomaTotal = 0;
                // eslint-disable-next-line
                kadoma = db.collection("reservations")
                    .where("TravellingFrom", "==", "Kadoma").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        kadomaTotal += snapshot.size;
                        setKadomaData(state => [...state, kadomaTotal]);
                    });
                //chegutu
                let chegutuTotal = 0;
                // eslint-disable-next-line
                chegutu = db.collection("reservations")
                    .where("TravellingFrom", "==", "Chegutu").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        chegutuTotal += snapshot.size;
                        setChegutuData(state => [...state, chegutuTotal]);
                    });
                //hwange
                let hwangeTotal = 0;
                // eslint-disable-next-line
                hwange = db.collection("reservations")
                    .where("TravellingFrom", "==", "Hwange").where("status", "==", "paid").where('BookingTime', '>', min).where('BookingTime', '<', max)

                    .get()
                    .then((snapshot) => {
                        hwangeTotal += snapshot.size;
                        setHwangeData(state => [...state, hwangeTotal]);
                    });
            }
            setLabels(dates);
        };
        fetchStats();
    }, []);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Overall Activity",
                data: activityData,
                fill: false,
                // backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#026ca0"
            },
            {
                label: "Bulawayo",
                data: byoData,
                fill: false,
                // backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#33eaff"
            },
            {
                label: "Harare",
                data: harareData,
                fill: false,
                borderColor: "#f50057"
            },
            {
                label: "Victoria Falls",
                data: vicfallsData,
                fill: false,
                borderColor: "#ff5722"
            },
            {
                label: "Gweru",
                data: gweruData,
                fill: false,
                borderColor: "#2196f3"
            },
            {
                label: "Kwekwe",
                data: kwekweData,
                fill: false,
                borderColor: "#ffea00"
            },
            {
                label: "Kadoma",
                data: kadomaData,
                fill: false,
                borderColor: "#00a152"
            },
            {
                label: "Chegutu",
                data: chegutuData,
                fill: false,
                borderColor: "#4615b2"
            },
            {
                label: "Hwange",
                data: hwangeData,
                fill: false,
                borderColor: "#fff"
            }

        ]
    };

    return (
        <Line
            height={200}
            data={data}
            style={{
                backgroundColor: '#003c6c',
                fontColor: '#fff'
            }}
            options={{
                responsive: true,
                title: {
                    display: true,
                    text: "Activity for the past 7 days",
                    fontSize: 17,
                    color: "#fff",
                    padding: 10,
                },
                legend: {
                    display: false,
                    position: "right",
                    color: '#fff'
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                color: "white",
                                beginAtZero: true,
                                stepSize: 1
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                color: "white",
                            },
                        },
                    ],
                },
            }}
        />
    )
}