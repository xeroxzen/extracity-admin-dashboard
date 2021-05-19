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
                // eslint-disable-next-line
                activitiesRef = db.collection("reservations")
                    .where('BookingTime', '>', min)
                    .where('BookingTime', '<', max)
                    .get()
                    .then(snapshot => {
                        setActivityData(state => [...state, snapshot.size]);
                    }, []);

                // eslint-disable-next-line
                byo = db.collection("reservations")
                    .where("TravellingFrom", "==", "Bulawayo")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setByoData(state => [...state, snapshot.size]);
                    });
                //harare
                // eslint-disable-next-line
                hre = db.collection("reservations")
                    .where("TravellingFrom", "==", "Harare")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setHarareData(state => [...state, snapshot.size]);
                    });
                //vicfalls
                // eslint-disable-next-line
                vicfalls = db.collection("reservations")
                    .where("TravellingFrom", "==", "Victoria Falls")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setVicfallsData(state => [...state, snapshot.size]);
                    });
                //gweru
                // eslint-disable-next-line
                gweru = db.collection("reservations")
                    .where("TravellingFrom", "==", "Gweru")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setGweruData(state => [...state, snapshot.size]);
                    });
                //kwekwe
                // eslint-disable-next-line
                kwekwe = db.collection("reservations")
                    .where("TravellingFrom", "==", "Kwekwe")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setKwekweData(state => [...state, snapshot.size]);
                    });
                //kadoma
                // eslint-disable-next-line
                kadoma = db.collection("reservations")
                    .where("TravellingFrom", "==", "Kadoma")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setKadomaData(state => [...state, snapshot.size]);
                    });
                //chegutu
                // eslint-disable-next-line
                chegutu = db.collection("reservations")
                    .where("TravellingFrom", "==", "Chegutu")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setChegutuData(state => [...state, snapshot.size]);
                    });
                //chegutu
                // eslint-disable-next-line
                hwange = db.collection("reservations")
                    .where("TravellingFrom", "==", "Hwange")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    // .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setHwangeData(state => [...state, snapshot.size]);
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
                color: '#fff'
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