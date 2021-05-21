import React from 'react'
import { Bar } from 'react-chartjs-2';
import firebase from '../../firebase.config'
import moment from 'moment'



export default function PaymentMethodChart() {
    // const [paymentMethodData, setPaymentMethodData] = React.useState([]);
    const [ecocashData, setEcoCashData] = React.useState([]);
    const [oneMoneyData, setOneMoneyData] = React.useState([]);
    const [swipeData, setSwipeData] = React.useState([]);
    const [cashData, setCashData] = React.useState([]);
    const [telecashData, setTelecashData] = React.useState([]);
    const [labels, setLabels] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            // eslint-disable-next-line
            // let paymentsRef;
            let dates = [];
            dates.push(moment().format('MMM'));
            setLabels(dates);

            // eslint-disable-next-line
            let ecocashRef = await db.collection('reservations')
                .where("PaymentMethod", "==", 'Ecocash')
                .get()
                .then((snapshot) => {
                    setEcoCashData(state => [...state, snapshot.size]);
                }, []);

            // eslint-disable-next-line
            let onemoneyRef = await db.collection('reservations')
                .where("PaymentMethod", "==", 'One Money')
                .get()
                .then((snapshot) => {
                    setOneMoneyData(state => [...state, snapshot.size]);
                }, []);

            // eslint-disable-next-line
            let telecashRef = db.collection('reservations')
                .where("PaymentMethod", "==", 'Telecash')
                .get()
                .then((snapshot) => {
                    setTelecashData(state => [...state, snapshot.size]);
                }, []);

            // eslint-disable-next-line
            let swipeRef = db.collection('reservations')
                .where("PaymentMethod", "==", 'Swipe')
                .get()
                .then((snapshot) => {
                    setSwipeData(state => [...state, snapshot.size]);
                }, []);

            // eslint-disable-next-line
            let cashRef = db.collection('reservations')
                .where("PaymentMethod", "==", 'Cash')
                .get()
                .then((snapshot) => {
                    setCashData(state => [...state, snapshot.size]);
                }, []);

        }
        fetchData();
    }, []);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Ecocash',
                data: ecocashData,
                backgroundColor: '#1e88e5',
                borderWidth: 1,
            },
            {
                label: 'Cash',
                data: cashData,
                backgroundColor: '#f4511e',
                borderWidth: 1,
            },
            {
                label: 'One Money',
                data: oneMoneyData,
                backgroundColor: '#e53935',
                borderWidth: 1,
            },
            {
                label: 'Telecash',
                data: telecashData,
                backgroundColor: '#00897b',
                borderWidth: 1,
            },
            {
                label: 'Swipe',
                data: swipeData,
                backgroundColor: '#33eb91',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                // text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    return (
        <>
            <div className='header'>
                <h5 style={{ color: '#fff' }}>Payment Methods Chart</h5>
                <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/StackedBar.js'
                    >

                    </a>
                </div>
            </div>
            <Bar data={data} options={options} />
        </>
    )
}
