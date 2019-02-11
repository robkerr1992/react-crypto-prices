import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: ['BTC', 'ETH', 'LTC', 'XRP', 'BCH', 'NEO', 'DASH', 'ZEC', 'XMR'],
      searchTerms: null,
      priceData: [],
      apkiKey: '228ef4fe3191079e9bf60b75b834bd284ac7d9e186df5a579269d04bf83dd5e7',
      baseMultipriceURL : 'https://min-api.cryptocompare.com/data/pricemultifull?',
    }
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.refreshData(),
      // 5000
      30000
    )
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async refreshData() {
    const tokens = this.state.searchTerms ? this.state.searchTerms : this.state.tokens;
    const response = await fetch(
      this.state.baseMultipriceURL
      + 'fsyms=' + tokens.join(',') //join token shortcodes into string
      + '&tsyms=USD'
      + '&api_key=' + this.state.apiKey, //store this in hidden file
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    const jsonResponse = await response.json(); //extract JSON from the http response
    let displayData = jsonResponse['DISPLAY'] || {};
    const priceData = Object.keys(displayData).map((key, index) => {
      const specificToken = displayData[key]['USD'];
      console.log(specificToken);
      return {
        name: key,
        usd: specificToken['PRICE'],
        twentyfourhourChange: specificToken['CHANGE24HOUR'],
        dayHigh: specificToken['HIGHDAY'],
        imageURL: specificToken['IMAGEURL'],
      }
    })
    this.setState({
      priceData: priceData
    });
  }

  render() {
    // this.refreshData();
    return (
      <div className="App">
        <header className="App-header">
        <Dashboard priceData={this.state.priceData} />
        </header>
      </div>
    );
  }
}

export default App;
