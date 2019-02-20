import React, { Component } from 'react';

class Row extends Component {
    buildTokenData() {
        const token = this.props.token;
        return Object.keys(token).map((key, index) => {
            return key === 'imageURL' ? <TokenImage url={token[key]} name={token.name} /> : <TokenData data={token[key]} />;
        });
    }
    render() {
        return (
            <tr key={this.props.token.name} className="row">
                {this.buildTokenData()}
            </tr>
        )
    }
}

function TokenImage(props) {
    return (
        <td className="img-slot">
            <img className="token-image" src={'https://cryptocompare.com' + props.url} alt={props.name + ' Token Image'} />
        </td>
    );
}

function TokenData(props) {
    return <td>{props.data}</td>;
}

class CryptoDashboard extends Component {
    buildRows() {
        return this.props.priceData.map((element, index) => {
            return <Row token={element} />;
        });
    }
    render() {
        return (
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Short Code</th>
                        <th>Price</th>
                        <th>Daily High</th>
                        <th>24 Hr Change</th>
                        <th>24 Hr Volume</th>
                        <th>Market Cap</th>
                        <th>Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {this.buildRows()}
                </tbody>
            </table>
        );
    }
}
export default CryptoDashboard;