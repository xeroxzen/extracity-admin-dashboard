import React from 'react';
import moment from 'moment';
import firebase from 'firebase';
import { Line } from "react-chartjs-2";

export default function ActivityChart() {
    const [activityData, setActivityData] = React.useState([]);
    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        const fetchStats = async () => {
            const db = firebase.firestore();
            let activitiesRef;
            let dates = [];

            for (var x = 6; x >= 0; x--) {
                var minDate = new moment().subtract(x, "days");
                dates.push(minDate.format('ddd'));
                var min = new Date();
                min.setDate(min.getDate() - x - 1);
                var max = new Date();
                max.setDate(max.getDate() - x);
                activitiesRef = db.collection("reservations")
                    .where("BookingTime", ">", min)
                    .where("BookingTime", "<", max)
                    .get()
                    .then((snapshot) => {
                        setActivityData(state => [...state, snapshot.size]);
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
                label: "No. of seat reservations",
                fill: true,
                backgroundColor: "#04e7ff",
                borderColor: "#04e7ff",
                data: activityData,
                borderWidth: 1,
                pointRadius: 0,
            }
        ],
    };

    return (
        <Line
            height={200}
            data={data}
            style={{
                backgroundColor: '#003c6c'
            }}
            options={{
                responsive: true,
                title: {
                    display: true,
                    text: "Activity for the past 7 days",
                    fontSize: 17,
                    fontColor: "white",
                    padding: 10,
                },
                legend: {
                    display: false,
                    position: "right",
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "white",
                                beginAtZero: true,
                                stepSize: 1
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "white",
                            },
                        },
                    ],
                },
            }}
        />
    )
}