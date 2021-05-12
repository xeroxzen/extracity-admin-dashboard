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
    { year: 'January', population: 2.525 },
    { year: 'February', population: 3.018 },
    { year: 'March', population: 3.682 },
    { year: 'April', population: 4.440 },
    { year: 'May', population: 5.310 },
    // { year: 'June', population: 6.127 },
    // { year: '2010', population: 6.930 },
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
            <Paper style={{ backgroundColor: '#7a7a7a' }}>
                <Chart
                    data={chartData}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        valueField="population"
                        argumentField="year"
                    />
                    <Title
                        text="Booking Reservations Activity"
                    />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
        );
    }
}