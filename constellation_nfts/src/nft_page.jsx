// NFTCollectionDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles/nft_page.module.css';
import defaultImage from './temp.jpg'; // Replace with the actual path to your default image
import { Dialog, DialogContent, CircularProgress } from '@mui/material'; // Import necessary components

const nftData = [
    {
        "id": 0,
        "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
        "owner": "DAG2d9k5NfZR4zGV2nhYoNEhRc5SKHohHH17c5ki",
        "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0001.png",
        "name": "testC - 0000",
        "description": "testC - 0000 - desc",
        "creationDateTimestamp": 1726198974789,
        "metadata": {},
        "AI_data": "Cool AI data",
        "apiResult": "Sample API response string"
    },
    {
        "id": 1,
        "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
        "owner": "DAG7Hrt3NbsvvH1yoKbkYAJtjvZCbSgXjMufK3gC",
        "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0002.png",
        "name": "testC - 0001",
        "description": "testC - 0001 - desc",
        "creationDateTimestamp": 1726198974789,
        "metadata": {},
        "AI_data": "Cool AI data",
        "apiResult": "Sample API response string"
    },
    {
        "id": 2,
        "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
        "owner": "DAG5xqiPUZNRoGC3QNAyxgYsTKcNTV2WsfRWioJD",
        "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0003.png",
        "name": "testC - 0002",
        "description": "testC - 0002 - desc",
        "creationDateTimestamp": 1726198974789,
        "metadata": {},
        "AI_data": "Cool AI data",
        "apiResult": "Sample API response string"
    },
    {
        "id": 3,
        "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
        "owner": "DAG7ZpyPUPXG4W9hqcYDizaQGeA2s8kZTDtkX2vf",
        "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0004.png",
        "name": "testC - 0003",
        "description": "testC - 0003 - desc",
        "creationDateTimestamp": 1726198974789,
        "metadata": {},
        "AI_data": "Cool AI data",
        "apiResult": "Sample API response string"
    },
    {
        "id": 4,
        "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
        "owner": "DAG3KnFpyHWGK1sVHPJLJDm2XZVbNJXgDJdtPJUK",
        "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0005.png",
        "name": "testC - 0004",
        "description": "testC - 0004 - desc",
        "creationDateTimestamp": 1726198974789,
        "metadata": {},
        "AI_data": "Cool AI data",
        "apiResult": "Sample API response string"
    }
]
const NFTCollectionDetailPage = () => {
  const { collectionId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // In real use, fetch data from an API based on collectionId
    const filteredNfts = nftData.filter(nft => nft.collectionId === collectionId);
    setNfts(filteredNfts);
  }, [collectionId]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCreateNFT = () => {
    // Navigate to the NFT creation page, passing the collectionId if needed
    navigate(`/create_nft/${collectionId}`);
  };

  const NFTImage = ({ imageUrl, name }) => {
    const [imageError, setImageError] = React.useState(false);
  
    const handleImageError = () => {
      setImageError(true);
    };
  
    if (imageError || !imageUrl) {
      return (
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333' }}>
          <p style={{ color: '#fff' }}>Image not available for {name || 'Unnamed NFT'}</p>
        </div>
      );
    }
  
    return (
      <img
        src={imageUrl}
        alt={name || 'NFT Image'}
        className="nft-image"
        onError={handleImageError}
      />
    );
  };
  
  const openNftDetails = (nft) => {
    setSelectedNft(nft);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedNft(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };


  return (
    <div className={styles['nft-page']}>
      {/* Top Bar */}
      <div className={styles['top-bar']}>
        <div className={styles['logo']}>NeuraNFT</div>
        <button className={styles['back-button']} onClick={handleBackClick}>
          Back
        </button>
      </div>

      <div className={styles['nft-page-content']}>
        <h1 className={styles['nft-page-title']}>NFTs in Collection</h1>
        <div className={styles['nft-grid']}>
          <div className={`${styles['nft-card']} ${styles['create-nft']}`} onClick={handleCreateNFT}>
            <div className={styles['create-nft-content']}>
              <span className={styles['plus-sign']}>+</span>
            </div>
          </div>
          {/* Display NFTs */}
          {nfts.map((nft, index) => (
            <div key={index} className={styles['nft-card']} onClick={() => openNftDetails(nft)}>
              <img
                src={nft.uri || defaultImage}
                alt={nft.name || `NFT ${index + 1}`}
                className={styles['nft-image']}
                onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
              />
              <div className={styles['nft-details']}>
                <h2 className={styles['nft-name']}>{nft.name || `NFT ${index + 1}`}</h2>
                {/* <p className={styles['nft-owner']}>Owner: {nft.owner}</p> */}
                {/* Add more NFT details if needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" classes={{ paper: styles.dialogPaper }}>
      <DialogContent className={`${styles['dialog-content']} ${styles['dialog-box-container-main']}`}>
        {selectedNft ? (
          <>
            <div className={styles['dialog-image']}>
              <NFTImage
                imageUrl={selectedNft.uri}
                name={selectedNft.name || 'Unnamed NFT'}
              />
            </div>
            <div className={styles['dialog-details']}>
              <h2>{selectedNft.name || 'Unnamed NFT'}</h2>
              <p className={styles['description']}>
                <strong>Description:</strong> {selectedNft.description || 'No description available'}
              </p>
              <div className={styles['tag-container']}>
                <div 
                  className={`${styles['tag']} ${styles['model-tag']}`} 
                  title={selectedNft.AI_data || 'Unknown AI data'}
                >
                  AI Data: {selectedNft.AI_data || 'Unknown AI data'}
                </div>
                <div
                  className={`${styles['tag']} ${styles['owner-tag']}`}
                  title={selectedNft.owner}
                  onClick={() => copyToClipboard(selectedNft.owner)}
                >
                  Owner: {selectedNft.owner}
                </div>
              </div>
              {/* Add any buttons or actions here */}
            </div>
            <button className={styles['dialog-close']} onClick={closeDialog}>
              ×
            </button>
          </>
        ) : (
          <div className={styles['loading-container']}>
            <CircularProgress />
          </div>
        )}
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default NFTCollectionDetailPage;
