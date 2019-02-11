import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: ['BTC','ETH','LTC','XRP','BCH','NEO','DASH','ZEC','XMR'],
      tokenData: [],
      apkiKey: '',
    }
  }

  refreshData() {
    const baseMultipriceURL = 'https://min-api.cryptocompare.com/data/pricemulti?';    
    const tokens = this.state.searchTerms || this.state.tokens;
    //set price Data

    const fetchCryptoPrices = async () => {
      const response = await fetch(
          baseMultipriceURL 
          + 'fsyms=' + tokens.join(',') //join token shortcodes into string
          + '&tsyms=USD' 
          + '&api_key=' + this.state.apiKey, //stored in .gitignored config.js file
          {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const myJson = await response.json(); //extract JSON from the http response
      console.dir(myJson);
      // do something with myJson
  }
    this.setState({
      tokenData: [/*return values*/]
    });
  }

  render() {
    const tokenData = this.state.tokenData;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Dashboard tokenData={tokenData} />
      </div>
    );
  }
}

export default App;
