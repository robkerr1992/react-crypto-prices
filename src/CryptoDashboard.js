import React, { Component } from 'react';

class Row extends Component {
    buildtokenData(){
        const token = this.props.token;
        const row = Object.keys(token).map((key, index) => {
            return key === 'imageURL' ? <TokenImage url={token[key]} name={token.name} /> : <TokenData data={token[key]} />;
        });
        return row;
    }
    render() {
        return (
            <tr key={this.props.token.name} className="row">
                {this.buildtokenData()}
            </tr>
        )
    }
}

function TokenImage(props) {
    return (
        <td>
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
            <table>
                <tbody>
                    {this.buildRows()}
                </tbody>
            </table>
        );
    }
}
export default CryptoDashboard;