// NFTCollectionDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import styles from './styles/nft_page.module.css';
import defaultImage from './temp.jpg'; // Replace with the actual path to your default image
import { Dialog, DialogContent, CircularProgress } from '@mui/material'; // Import necessary components
import {get_all_nft_data} from './helper_functions/get_chain_data';
import {test_model, get_api_key} from './helper_functions/get_chat_data';
import { marked } from 'marked'; // Import the marked library
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization


// import nftData from './nf.json'; // Import the NFT data

// const nftData = [
//     {
//         "id": 0,
//         "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
//         "owner": "DAG2d9k5NfZR4zGV2nhYoNEhRc5SKHohHH17c5ki",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0001.png",
//         "name": "testC - 0000",
//         "description": "testC - 0000 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     },
//     {
//         "id": 1,
//         "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
//         "owner": "DAG7Hrt3NbsvvH1yoKbkYAJtjvZCbSgXjMufK3gC",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0002.png",
//         "name": "testC - 0001",
//         "description": "testC - 0001 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     },
//     {
//         "id": 2,
//         "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
//         "owner": "DAG5xqiPUZNRoGC3QNAyxgYsTKcNTV2WsfRWioJD",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0003.png",
//         "name": "testC - 0002",
//         "description": "testC - 0002 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     },
//     {
//         "id": 3,
//         "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
//         "owner": "DAG7ZpyPUPXG4W9hqcYDizaQGeA2s8kZTDtkX2vf",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0004.png",
//         "name": "testC - 0003",
//         "description": "testC - 0003 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     },
//     {
//         "id": 4,
//         "collectionId": "31143e3c62db821008bc93651da248e55bce4a923d21cd1bcedf14fea0b738e4",
//         "owner": "DAG3KnFpyHWGK1sVHPJLJDm2XZVbNJXgDJdtPJUK",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0005.png",
//         "name": "testC - 0004",
//         "description": "testC - 0004 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     },
//     {
//         "id": 4,
//         "collectionId": "9e31623675f582efc863971861fe8d5b073c3efc1d7cce951c0fff9591a409a4",
//         "owner": "DAG3KnFpyHWGK1sVHPJLJDm2XZVbNJXgDJdtPJUK",
//         "uri": "https://constellation-nfts-assets.s3.amazonaws.com/dtm/0005.png",
//         "name": "testC - 0004",
//         "description": "testC - 0004 - desc",
//         "creationDateTimestamp": 1726198974789,
//         "metadata": {},
//         "AI_data": "Cool AI data",
//         "apiResult": "Sample API response string",
//         "model": "model1"
//     }
// ]
const NFTCollectionDetailPage = () => {
  const { collectionId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [isApiLoading, setIsApiLoading] = useState(false);
  const navigate = useNavigate();
  const [formattedTestApiResult, setFormattedTestApiResult] = useState('');

  const [isTestApiDialogOpen, setIsTestApiDialogOpen] = useState(false);
  const [testApiResult, setTestApiResult] = useState('');
  const [isTestApiLoading, setIsTestApiLoading] = useState(false);

  const location = useLocation();
  const collectionName = location.state?.name;

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        if (collectionId) {
          const fetchedNftData = await get_all_nft_data(collectionId);
          setNfts(fetchedNftData);
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        // Handle error appropriately (e.g., set an error state, show a notification)
      }
    };
  
    fetchNFTData();
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

  const handleTestApiClick = async () => {
    setIsTestApiLoading(true);
    setIsTestApiDialogOpen(true);

      const response = await test_model(collectionId, selectedNft.id);
      const data = response['output'];
      const sanitizedHtml = DOMPurify.sanitize(marked(data));
      const formattedHtml = `<div class="api-response">${sanitizedHtml}</div>`;
      setFormattedTestApiResult(formattedHtml);

      setTestApiResult(data);
      setIsTestApiLoading(false);
    };


  const openChat = (nftId) => {
    navigate(`/chat/${collectionId}/${nftId}`);
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

  const handleApiClick = async () => {

    
    setIsDialogOpen(false);
    setIsApiDialogOpen(true);
    setIsApiLoading(true);
    
    const collection_id = collectionId;
    const nft_id = selectedNft.id;
    
    console.log("collection_id",collection_id);
    console.log("nft_id",nft_id);

      const api_key = await get_api_key(collection_id, nft_id);

    console.log("api_key",api_key);
    
    const url = api_key['hpcEndpoint']+":"+api_key['hpcEndpointPort'];

    const apiKey = api_key['apiKey'];

    // setIsDialogOpen(false);
    // setIsApiDialogOpen(true);
    // setIsApiLoading(true);





    // Simulate an API call delay and use dummy values
    setTimeout(() => {
      setApiKey(apiKey);
      setApiEndpoint(url);
      setIsApiLoading(false);
    }, 500); // 1 second delay
  };

  const truncateAddress = (address) => {
    if (typeof address !== 'string') return 'Invalid Address';
    if (address.length <= 13) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
        <h1 className={styles['nft-page-title']}>NFTs in {collectionName}</h1>
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
                  Model: {selectedNft.model || 'Unknown AI data'}
                </div>
                <div
                  className={`${styles['tag']} ${styles['owner-tag']}`}
                  title={selectedNft.owner}
                  onClick={() => copyToClipboard(selectedNft.owner)}
                >
                  Owner: {truncateAddress(selectedNft.owner)}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.dialogButton} ${styles.chatButton}`}
                    onClick={() => openChat(selectedNft.id)}
                  >
                    Chat
                  </button>
                  <button
                    className={`${styles.dialogButton} ${styles.apiButton}`}
                    onClick={() => handleApiClick(selectedNft.id)}
                  >
                    Get API
                  </button>
                  <button
                  className={`${styles.dialogButton} ${styles.testApiButton}`}
                  onClick={handleTestApiClick}
                >
                  Test API
                </button>
                </div>
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
{/* API Dialog */}
    <Dialog
        open={isApiDialogOpen}
        onClose={() => setIsApiDialogOpen(false)}
        maxWidth="md"
        classes={{ paper: styles.dialogPaper }}
      >
        <DialogContent className={styles.apiDialogContent}>
          {isApiLoading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className={styles.apiItem}>
                <span className={styles.apiLabel}>API Key:</span>
                <div className={styles.apiValueContainer}>
                  <span className={styles.apiValue}>{apiKey}</span>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(apiKey)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className={styles.apiItem}>
                <span className={styles.apiLabel}>API Endpoint:</span>
                <div className={styles.apiValueContainer}>
                  <span className={styles.apiValue}>{apiEndpoint}</span>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(apiEndpoint)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTestApiDialogOpen}
        onClose={() => setIsTestApiDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        classes={{ paper: styles.testApiDialogPaper }}
      >
        <DialogContent className={styles.testApiDialogContent}>
          <h3 className={styles.testApiDialogTitle}>API Test Result</h3>
          {isTestApiLoading ? (
            <div className={styles.testApiLoadingContainer}>
              <CircularProgress />
            </div>
          ) : (
            <pre className={styles.testApiResultPre} dangerouslySetInnerHTML={{ __html: formattedTestApiResult }}></pre>
          )}
            <button className={styles['dialog-close']} onClick={closeDialog}>
              ×
            </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NFTCollectionDetailPage;
