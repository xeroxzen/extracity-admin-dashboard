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
            // let min = new Date().getMonth();
            // min.setDate(min.getDate() - x - 1);
            // let max = new Date().getMonth();
            // max.setMonth(max.getMonth() - x);
            // eslint-disable-next-line
            let ecocashRef = await db.collection('reservations')
                .where("PaymentMethod", "==", ['EcoCash', 'Ecocash', 'ecocash'])
                .get()
                .then((snapshot) => {
                    setEcoCashData(state => [...state, snapshot.size]);
                });
            let onemoneyRef = await db.collection('reservations')
                .where("PaymentMethod", "==", ['OneMoney', 'One Money', 'one money'])
                .get()
                .then((snapshot) => {
                    setOneMoneyData(state => [...state, snapshot.size]);
                });
            let telecashRef = db.collection('reservations')
                .where("PaymentMethod", "==", 'Telecash')
                .get()
                .then((snapshot) => {
                    setTelecashData(state => [...state, snapshot.size]);
                });
            let swipeRef = db.collection('reservations')
                .where("PaymentMethod", "==", ['Swipe', 'swipe'])
                .get()
                .then((snapshot) => {
                    setSwipeData(state => [...state, snapshot.size]);
                });
            let cashRef = db.collection('reservations')
                .where("PaymentMethod", "==", ['Cash', 'cash'])
                .get()
                .then((snapshot) => {
                    setCashData(state => [...state, snapshot.size]);
                });

        }
        fetchData();
    }, []);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'EcoCash',
                data: ecocashData,
                backgroundColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
            {
                label: 'Cash',
                data: cashData,
                backgroundColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            },
            {
                label: 'One Money',
                data: oneMoneyData,
                backgroundColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
            {
                label: 'Telecash',
                data: telecashData,
                backgroundColor: '#fff',
                borderWidth: 1,
            },
            {
                label: 'Swipe',
                data: swipeData,
                backgroundColor: '#afafa7',
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
