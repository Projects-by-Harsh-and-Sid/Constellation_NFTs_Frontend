import React, { useState, useEffect } from 'react';

// Assuming window.stargazer is already typed in a TypeScript declaration file elsewhere in your project.

const CONSTELLATION_NETWORK = {
  name: 'Constellation',
  chainId: 1001, // Replace with the actual chain ID for Constellation
};

const StargazerWeb3Connector = () => {
  const [account, setAccount] = useState(null);
  const [stargazerProvider, setStargazerProvider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.stargazer) {
        console.log(`Stargazer version ${window.stargazer.version} detected`);
        try {
          const provider = window.stargazer.getProvider("constellation");
          console.log("Stargazer provider initialized:", provider);
          setStargazerProvider(provider);

          if (provider.activated) {
            try {
              const accounts = await provider.request({ method: "dag_requestAccounts", params: [] });
              if (accounts && accounts.length > 0) {
                setAccount(accounts[0]);
              }
            } catch (accountError) {
              console.error("Error fetching accounts:", accountError);
            }
          }
        } catch (error) {
          console.error("Error initializing provider:", error);
          setError("Failed to initialize Stargazer provider. Make sure the Stargazer extension is installed and the network is accessible.");
        }
      } else {
        setError("Stargazer not detected. Please install the Stargazer extension and refresh the page.");
      }
    };

    initProvider();
  }, []);

  const connectWallet = async () => {
    if (stargazerProvider) {
      try {
        const accounts = await stargazerProvider.request({ method: "dag_requestAccounts", params: [] });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        setError("Failed to connect to wallet. Please try again.");
      }
    } else {
      setError("Provider not initialized. Please refresh the page and try again.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stargazerProvider) {
    return <div>Loading provider information...</div>;
  }

  return (
    <div>
      <p>Connected to network: {CONSTELLATION_NETWORK.name} (Chain ID: {CONSTELLATION_NETWORK.chainId})</p>

      {account ? (
        <div>
          <p>Connected with account: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect to Stargazer</button>
      )}
    </div>
  );
};

export default StargazerWeb3Connector;
