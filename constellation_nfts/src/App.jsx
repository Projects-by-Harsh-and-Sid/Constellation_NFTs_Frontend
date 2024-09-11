import React from 'react';
import {Route, Routes } from 'react-router-dom';
import CreateNFT from './create_nft';
import Chat from './chat';
import { AppProvider } from './AppContext';
import { HashRouter as Router } from 'react-router-dom';
import Collections from './Collections';
import StargazerWeb3Connector from './WalletConnector';
function App() {
  console.log('Inside App.jsx');
  
  return (
    // <div className="App" style={{backgroundColor: 'black'}}>
    <div className="App">

      <AppProvider>
      <Router>
        <Routes>
          <Route path="/create_nft" element={<CreateNFT />} />
          <Route path="/" element={<StargazerWeb3Connector />} />
          <Route path="/chat/:nftId" element={<Chat />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </Router>
      </AppProvider>
    </div>
  );
}

export default App;