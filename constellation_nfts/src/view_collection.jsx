// NFTCollectionsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Collections_view.module.css'; // Use your existing CSS file
import defaultImage from './temp.jpg'; // Replace with the actual path to your default image
// import nftCollectionsData_json from './collections.json';

const nftCollectionsData = [
  {
    "id": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
    "owner": "DAG6FibrFtySEBh78roMzioUDALeLQSdYLzyrzag",
    "name": "testC",
    "creationDateTimestamp": 1726198932656,
    "numberOfNFTs": 5
  },
  {
    "id": "9e31623675f582efc863971861fe8d5b073c3efc1d7cce951c0fff9591a409a4",
    "owner": "DAG2vvtGcA2hKjFTPFMNBCqNTqJMbFJCz1Wcu8dq",
    "name": "My Awesome Collection",
    "creationDateTimestamp": 1726202370384,
    "numberOfNFTs": 0
  }
];

const NFTCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In real use, fetch data from an API
    setCollections(nftCollectionsData);
  }, []);

  const handleCreateCollection = () => {
    navigate('/create_collection'); // Adjust the path as needed
  };

  const handleCollectionClick = (collectionId, collectionName) => {
    navigate(`/collections/${collectionId}`, { state: { name: collectionName } });
  };
  

  return (
    <div className="nft-collection">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="logo">NeuraNFT</div>
        {/* Add any dropdown or navigation if needed */}
      </div>

      <div className="collection-content">
        <h1 className="collection-title">NFT Collections</h1>
        <div className="nft-grid">
          {/* Create New Collection Card */}
          <div className="nft-card create-nft" onClick={handleCreateCollection}>
            <div className="create-nft-content">
              <span className="plus-sign">+</span>
              {/* <h2>Create New Collection</h2> */}
            </div>
          </div>

          {/* Display NFT Collections */}
          {collections.map((collection, index) => (
            <div
              key={index}
              className="nft-card"
              onClick={() => handleCollectionClick(collection.id, collection.name)}
            >
              <img
                src={defaultImage}
                alt={collection.name || `Collection ${index + 1}`}
                className="nft-image"
              />
              <div className="nft-details">
                <h2 className="nft-name">{collection.name || `Collection ${index + 1}`}</h2>
                {/* <p className="nft-owner">Owner: {collection.owner}</p> */}
                {/* <p className="nft-number">Number of NFTs: {collection.numberOfNFTs}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionsPage;