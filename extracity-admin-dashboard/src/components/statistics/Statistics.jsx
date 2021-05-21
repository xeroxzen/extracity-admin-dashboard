import React from "react";
import firebase from "firebase";
import "@fontsource/roboto";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ActivityChart from "./ActivityChart";
import { Bar } from 'react-chartjs-2';
import StatsChart from "./StatsChart";
import PaymentMethodChart from './PaymentMethodChart'

const styles = (theme) => ({
    select: {
        backgroundColor: "transparent",
        color: "white",
        borderColor: "transparent",
    },
    option: {
        color: "black",
    },
    label: {
        color: "white",
        fontSize: 14,
    },
    grid: {
        paddingLeft: 20,
        color: "#fff"
    },
});


class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.inputPaymentMethodRef = React.createRef();
        this.inputPeriodRef = React.createRef();
        this.labels = ["Bulawayo", "Chegutu", "Kadoma", "Kwekwe", "Harare", "Victoria Falls", "Hwange", "Gweru", "Johannesburg"];
        this.colors = ["#33eaff", "#4615b2", "#00a152", "#ffea00", "#f50057", "#ff5722", "#fff", "#2196f3", "#aaa"];

        this.state = {
            data: [],
            totalReservations: 0,
        };
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData(paymentMethod = "", period = "") {
        const db = firebase.firestore();
        let total = 0;
        this.labels.forEach((pickupPoint) => {
            let reservationsRef = db.collection("reservations");

            if (paymentMethod !== "" && paymentMethod !== "All")
                reservationsRef = reservationsRef.where("PaymentMethod", "==", paymentMethod);

            if (period !== "" && period !== "All") {
                let min = new Date();
                min.setDate(min.getDate() - period);
                console.log(min);
                reservationsRef = reservationsRef
                    .orderBy("BookingTime")
                    .where("BookingTime", ">=", min);
            }

            reservationsRef
                .orderBy("TravellingFrom")
                .startAt(pickupPoint)
                .endAt(pickupPoint + "\uf8ff")
                .get()
                .then((snapshot) => {
                    total += snapshot.size;
                    this.setState({
                        data: [...this.state.data, snapshot.size],
                        totalReservations: total,
                    });
                });
        });
    }

    handleChange = () => {
        let paymentMethod = this.inputPaymentMethodRef.current.value;
        let period = this.inputPeriodRef.current.value;
        this.setState({ data: [] });
        this.getChartData(paymentMethod, period);
    };

    render() {
        const { classes } = this.props;
        const data = {
            labels: this.labels,
            datasets: [
                {
                    label: "Cumulative Reservations",
                    backgroundColor: this.colors,
                    // borderColor: "#04e7ff",
                    borderWidth: 1,
                    data: this.state.data,
                },
            ],
        };

        return (
            <div style={{ paddingTop: 20 }}>
                <Grid container style={{ padding: 20 }}>
                    <Grid item className={classes.grid}>
                        <label className={classes.label}>
                            Date: {moment(new Date()).format("DD/MM/YYYY")}
                        </label>
                    </Grid>
                    <Grid item className={classes.grid}>
                        <label className={classes.label}>
                            Period:
              <select
                                name="period"
                                className={classes.select}
                                onChange={this.handleChange}
                                ref={this.inputPeriodRef}
                            >
                                <option className={classes.option}>All</option>
                                <option className={classes.option} value="1">
                                    1 day
                </option>
                                <option className={classes.option} value="7">
                                    7 days
                </option>
                                <option className={classes.option} value="14">
                                    14 days
                </option>
                                <option className={classes.option} value="30">
                                    30 days
                </option>
                            </select>
                        </label>
                    </Grid>
                    <Grid item className={classes.grid}>
                        <label className={classes.label}>
                            No. of reservations: {this.state.totalReservations}
                        </label>
                    </Grid>
                    <Grid item className={classes.grid}>
                        <label className={classes.label}>
                            Payment Method:
              <select
                                name="paymentMethod"
                                className={classes.select}
                                onChange={this.handleChange}
                                ref={this.inputPaymentMethodRef}
                            >
                                <option className={classes.option}>All</option>
                                <option className={classes.option}>Swipe</option>
                                <option className={classes.option}>Cash</option>
                                <option className={classes.option}>EcoCash</option>
                                <option className={classes.option}>One Money</option>
                                <option className={classes.option}>Telecash</option>
                            </select>
                        </label>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={6}>

                        <Card
                            style={{
                                backgroundColor: '#003c6c',

                                color: '#fff',
                                marginRight: 5,
                            }}
                        >
                            <CardContent>
                                <h5 style={{ color: '#fff' }}>Activity Chart</h5>
                                <Bar
                                    height={200}
                                    data={data}
                                    options={{
                                        responsive: true,
                                        title: {
                                            display: true,
                                            text: "Reservations Summary",
                                            fontSize: 17,
                                            color: "white",
                                            padding: 10,
                                            align: "start",
                                        },
                                        legend: {
                                            labels: {
                                                color: "#fff",
                                            },
                                            display: false,
                                            position: "right",
                                        },
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        color: "#fff",
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                            xAxes: [
                                                {
                                                    ticks: {
                                                        color: "#fff",
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card
                            style={{
                                backgroundColor: '#003c6c',
                                // background: "linear-gradient(transparent,rgba(0,151,167,1))",
                                marginLeft: 5,
                            }}
                        >
                            <CardContent>
                                <ActivityChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <hr />
                        <Card
                            style={{
                                // backgroundColor: "#34495e",
                                // background: "linear-gradient(transparent,rgba(0,151,167,1))",
                                backgroundColor: '#003c6c',
                                marginLeft: 5,
                            }}
                        >
                            <CardContent>
                                <StatsChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <hr />
                        <Card
                            style={{
                                // backgroundColor: "#34495e",
                                // background: "linear-gradient(transparent,rgba(0,151,167,1))",
                                backgroundColor: '#003c6c',
                                marginLeft: 5,
                            }}
                        >
                            <CardContent>
                                <PaymentMethodChart />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Statistics);
