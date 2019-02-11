import React, { Component } from 'react';

function Row(props) {
    return (
        <div className="row">
            <TokenImage imageURL={props.imageURL} tokenName={props.name} />
            <TokenInfo name={props.name} usd={props.usd} />
        </div>
    )
}

function TokenImage(props) {
    return (
        <div>
            <img className="token-image" src={'https://cryptocompare.com' + props.imageURL} alt={props.tokenName + ' Token Image'} />
        </div>
    );
}

function TokenInfo(props) {
    return (
        <div className="token-info">
            <h1 key={props.name}>{props.name} => {props.usd}</h1>
        </div>
    );
}

class Dashboard extends Component {
    buildRows() {
        return this.props.priceData.map((element, index) => {
            return Row(element);
        });
    }
    render() {
        return (
            <div>
                {this.buildRows()}
            </div>
        );
    }
}
export default Dashboard;
