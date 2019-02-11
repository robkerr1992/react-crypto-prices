import React, { Component } from 'react';

class Row extends Component {
    render() {
        return (
            <div>

            </div>
        )
    };
}

class Dashboard extends Component {
    renderRow(data) {
        return <Row
            data={data}
        />
    }
    render() {
        return (
            <div>
                {this.props.priceData.map((token, index) => <Row />)}
            </div>
        );
    }
}
export default Dashboard;
