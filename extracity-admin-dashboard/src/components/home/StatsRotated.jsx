import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const data = [
    { route: 'Bulawayo', reservations: 30 },
    { route: 'Harare', reservations: 34 },
    { route: 'Chegutu', reservations: 11 },
    { route: 'Victoria', reservations: 39 },
    { route: 'Hwange', reservations: 13 },
    { route: 'Kwekwe', reservations: 5 },
    { route: 'Chiredzi', reservations: 13 },
    { route: 'Kadoma', reservations: 9 },
    { route: 'Johannesburg', reservations: 40 },
    { route: 'Mutare', reservations: 22 },
];

export default class StatsRotated extends React.PureComponent {
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
                    rotated
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="reservations"
                        argumentField="route"
                    />
                    <Title style={{ color: '#fff' }} text="Reservation Activity" />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}