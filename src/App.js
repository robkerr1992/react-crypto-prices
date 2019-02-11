import React, { Component } from 'react';
import './App.css';
import CryptoDashboard from './CryptoDashboard';
import Config from './.config.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: ['BTC', 'ETH', 'LTC', 'XRP', 'BCH', 'NEO', 'DASH', 'ZEC', 'XMR'],
      searchTerms: null,
      priceData: [],
      apkiKey: Config.apkiKey, //stored in file .config.js which is listed in .gitignore
    }
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.refreshData(),
      10000
    )
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  buildFetchURL() {
    const tokens = this.state.searchTerms ? this.state.searchTerms : this.state.tokens;    
    return 'https://min-api.cryptocompare.com/data/pricemultifull?'
    + 'fsyms=' + tokens.join(',') //join token shortcodes into string
    + '&tsyms=USD'
    + '&api_key=' + this.state.apiKey;//store this in hidden file
  }

  async refreshData() {
    const response = await fetch(this.buildFetchURL(), 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const jsonResponse = await response.json(); //extract JSON from the http response
    let displayData = jsonResponse['DISPLAY'] || {};
    const priceData = Object.keys(displayData).map((key, index) => {
      const specificToken = displayData[key]['USD'];
      console.log(specificToken);
      return {
        imageURL: specificToken['IMAGEURL'],
        name: key,
        usd: specificToken['PRICE'],
        change24Hour: specificToken['CHANGE24HOUR'],
        dayHigh: specificToken['HIGHDAY'],
        marketCap: specificToken['MKTCAP'],
        volume24Hour: specificToken['TOTALVOLUME24HTO'],
        supply: specificToken['SUPPLY'],
      }
    })
    this.setState({
      priceData: priceData
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <CryptoDashboard priceData={this.state.priceData} />
        </header>
      </div>
    );
  }
}

export default App;
