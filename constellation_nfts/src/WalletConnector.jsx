import React, { useState } from 'react';
import './styles/stargazer.css';
import { useNavigate } from 'react-router-dom';

const CONSTELLATION_NETWORK = {
  name: 'Constellation',
  chainId: 1001,
};

const StargazerWeb3Connector = () => {
  const [account, setAccount] = useState(null);
  const [stargazerProvider, setStargazerProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const initializeAndConnect = async () => {
    if (window.stargazer) {
      try {
        console.log(`Stargazer version ${window.stargazer.version} detected`);
        const provider = window.stargazer.getProvider("constellation");
        console.log("Stargazer provider initialized:", provider);
        setStargazerProvider(provider);

        const accounts = await provider.request({ method: "dag_requestAccounts", params: [] });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error initializing provider or connecting to wallet:", error);
        setError("Failed to connect to Stargazer. Make sure the extension is installed and try again.");
      }
    } else {
      setError("Stargazer not detected. Please install the Stargazer extension and refresh the page.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setStargazerProvider(null);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleCreate = () => navigate('/create_collection');

  return (
    <div className="app-container">
      <header className="header">
        <h1>Stargazer Web3 Connector</h1>
        <div className="dropdown">
          {account ? (
            <div>
              <button onClick={toggleDropdown} className="wallet-button">
                {account.slice(0, 6)}...{account.slice(-4)}
                <span style={{ marginLeft: '0.5rem' }}>▼</span>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleCreate} className="disconnect-button">
                    Create
                  </button>
                  <a href="#" className="dropdown-item">Collections</a>
                  <button onClick={disconnectWallet} className="disconnect-button">
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={initializeAndConnect} className="connect-button">
              Connect to Stargazer
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default StargazerWeb3Connector;