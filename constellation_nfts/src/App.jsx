import React from 'react';
import {Route, Routes } from 'react-router-dom';
import CreateCollection from './create_collection_temp';
import Chat from './chat';
import ViewCollection from './view_collection';
import NFTCollectionDetailPage from './nft_page';
import CreateNFT from './create_nft';

import { AppProvider } from './AppContext';
import { HashRouter as Router } from 'react-router-dom';
import Collections from './Collections';
import StargazerWeb3Connector from './WalletConnector';
function App() {
  console.log('Inside App.jsx');
  
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/create_collection" element={<CreateCollection />} />
            <Route path="/chat/:collectionId" element={<Chat />} />
            {/* <Route path="/collections" element={<Collections />} /> */}
            <Route path="/" element={< StargazerWeb3Connector/>} />
            <Route path="/view_collection" element={< ViewCollection/>} />
            <Route path="/collections/:collectionId" element={<NFTCollectionDetailPage />} />
            <Route path="/create_nft/:collectionId" element={<CreateNFT />} />
            {/* <Route path="/create_nft/:collectionId" element={<CreateNFT />} /> */}


          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

// Home component for the root route
// function Home() {
//   return <h1>Welcome to the Home Page</h1>;
// }

export default App;