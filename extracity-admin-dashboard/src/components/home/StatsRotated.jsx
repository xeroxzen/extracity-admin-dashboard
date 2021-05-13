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
    { route: 'Bulawayo', reservations: 2.525 },
    { route: 'Harare', reservations: 3.018 },
    { route: 'Victoria', reservations: 3.682 },
    { route: 'Hwange', reservations: 4.440 },
    { route: 'Kwekwe', reservations: 5.310 },
    { route: 'kadoma', reservations: 6.127 },
    { route: 'Chegutu', reservations: 6.930 },
    { route: 'Chiredzi', reservations: 2.890 },
    { route: 'Johannesburg', reservations: 5.890 },
    { route: 'Mutare', reservations: 1.890 },
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
            <Paper style={{ backgroundColor: '#7a7a7a' }}>
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
                    <Title text="Reservation Activity" />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}