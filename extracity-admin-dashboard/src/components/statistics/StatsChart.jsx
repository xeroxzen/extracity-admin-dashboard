import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
import firebase from 'firebase';
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';



export default function StatsChart() {
    const [activityData, setActivityData] = React.useState([]);
    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        const fetchStats = async () => {
            const db = firebase.firestore();
            // eslint-disable-next-line
            // let activitiesRef;
            let dates = [];

            for (let x = 6; x >= 0; x--) {
                let minDate = new moment().subtract(x, "days");
                dates.push(minDate.format('ddd'));
                let min = new Date();
                min.setDate(min.getDate() - x - 1);
                let max = new Date();
                max.setDate(max.getDate() - x);
                // eslint-disable-next-line
                let activitiesRef = db.collection('reservations')
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
                label: "No. of reservations",
                fill: true,
                backgroundColor: "#00a152",
                borderColor: "#00a152",
                data: activityData,
                borderWidth: 1,
                pointRadius: 0,
            }

        ],
    };

    return (
        <Grid container style={{ padding: 20 }}>
            <h5 style={{ color: '#fff' }}>Overall Activity Chart</h5>
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
                        fontColor: "#5f0937",
                        padding: 10,
                    },
                    legend: {
                        display: true,
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
        </Grid>
    )
}
// }