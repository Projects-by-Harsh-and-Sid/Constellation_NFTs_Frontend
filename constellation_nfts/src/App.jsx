import React from 'react';
import {Route, Routes } from 'react-router-dom';
import CreateNFT from './create_nft';
import Chat from './chat';
// import { AppProvider } from './AppContext';
import { HashRouter as Router } from 'react-router-dom';
import Collections from './Collections';
import StargazerWeb3Connector from './WalletConnector';
function App() {
  console.log('Inside App.jsx');
  
  return (
    <div className="App">
      {/* <AppProvider> */}
        <Router>
          <Routes>
            <Route path="/create_nft" element={<CreateNFT />} />
            <Route path="/chat/:nftId" element={<Chat />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/" element={< StargazerWeb3Connector/>} />
          </Routes>
        </Router>
      {/* </AppProvider> */}
    </div>
  );
}

// Home component for the root route
// function Home() {
//   return <h1>Welcome to the Home Page</h1>;
// }

export default App;