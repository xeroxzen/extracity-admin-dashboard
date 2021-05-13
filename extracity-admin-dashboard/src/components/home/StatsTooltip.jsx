import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
    { route: 'Bulawayo', reservations: 30 },
    { route: 'Harare', reservations: 34 },
    { route: 'Kadoma', reservations: 9 },
    { route: 'Victoria', reservations: 39 },
    { route: 'Hwange', reservations: 13 },
    { route: 'Kwekwe', reservations: 5 },
    { route: 'Mutare', reservations: 22 },
    { route: 'Chiredzi', reservations: 13 },
    { route: 'Chegutu', reservations: 11 },
    { route: 'Johannesburg', reservations: 40 },
];

export default class StatsTooltip extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper style={{ backgroundColor: '#003c6c' }}>
                <Chart
                    data={chartData}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        valueField="reservations"
                        argumentField="route"
                    />
                    <Title
                        style={{ backgroundColor: 'white' }}
                        text="Booking Reservations Activity"
                    />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
        );
    }
}