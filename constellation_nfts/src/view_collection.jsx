// NFTCollectionsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Collections_view.module.css'; // Use your existing CSS file
import defaultImage from './temp.jpg'; // Replace with the actual path to your default image
import axios from 'axios';


// const nftCollectionsData = [
//   {
//     "id": "9c3803e52f35edb49e2238fb18b8cb22a9b84c31502e45b1099571cf1c8766a4",
//     "owner": "DAG2vvtGcA2hKjFTPFMNBCqNTqJMbFJCz1Wcu8dq",
//     "name": "Harsh Personality",
//     "creationDateTimestamp": 1726248610396,
//     "numberOfNFTs": 0,
//     "description": "This collection is to create social personas",
//     "baseModel": "Llama 3.1",
//     "uri": "http://localhost:5500/image/5DohZkAtiu.jpg"
// }
// ]
// ];

const NFTCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:9200/data-application/collections', { method: 'GET' });
        const nftCollectionsData = await response.json();
        console.log(nftCollectionsData);
        setCollections(nftCollectionsData);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
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
                src={collection.uri}
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