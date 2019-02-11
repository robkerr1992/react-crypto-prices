import React, { Component } from 'react';

function Row(props) {
    console.log(props);
    return (
        <div>
            <h1 key={props.name}>{props.name} => {props.usd}</h1>
        </div>
    )
}

class Dashboard extends Component {
    buildRows() {
        console.log(this.props.priceData)
        return this.props.priceData.map((element, index) => {
            return Row(element);
        });
    }
    // renderRow(tokenData) {
    //     return Row(tokenData);
    // }
    render() {
        // console.log(this.buildRows());
        return (
            <div>
                {this.buildRows()}
            </div>
        );
    }
}
export default Dashboard;
