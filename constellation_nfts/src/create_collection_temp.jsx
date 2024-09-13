import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { Image } from 'lucide-react';
import { mintSampleCollection } from './metagraph_scripts/stargazerNftMinter';
import styles from './styles/nft_collections.module.css';

const CreateNFTCollection = () => {
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [collectionImagePreview, setCollectionImagePreview] = useState(null);
  const [collectionImage, setCollectionImage] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState('');
  const imageInputRef = useRef(null);

  const handleCollectionNameChange = (event) => setCollectionName(event.target.value);
  const handleCollectionDescriptionChange = (event) => setCollectionDescription(event.target.value);
  const handleModelChange = (event) => setSelectedModel(event.target.value);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCollectionImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollectionImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file');
    }
  };

  const handleMintCollection = async () => {
    if (!collectionImage || !collectionName || !selectedModel) {
      alert('Please fill in all fields and upload the collection image');
      return;
    }
  
    setIsMinting(true);
    setMintResult('');
  
    try {
      const imageData = Array.from(new Uint8Array(await collectionImage.arrayBuffer()));
      await mintSampleCollection({
        name: collectionName,
        description: collectionDescription,
        model: selectedModel,
        image: imageData,
      });
      setMintResult('NFT Collection minted successfully!');
    } catch (error) {
      console.error('Error minting NFT Collection:', error);
      setMintResult(`Error: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  const handleCloseAlert = () => {
    setMintResult('');
  };

  return (
    <div className={styles['create-nft-container']}>
      <Snackbar 
        open={!!mintResult}
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={mintResult.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {mintResult}
        </Alert>
      </Snackbar>

      <button 
        className={styles['back-button']}
        onClick={() => navigate('/')}
      >
        Back to Main
      </button>

      <div className={styles['create-nft-form']}>
        <div className={styles['form-group']}>
          <label>Collection Image</label>
          <div className={styles['nft-image-preview']}>
            <div className={styles['nft-image-circle']}>
              {collectionImagePreview ? (
                <img src={collectionImagePreview} alt="Collection Preview" />
              ) : (
                <Image size={40} />
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={imageInputRef}
              className={styles['hidden-input']}
            />
            <button 
              onClick={() => imageInputRef.current.click()}
              className={styles['change-photo-button']}
            >
              {collectionImage ? 'Change Photo' : 'Select Photo'}
            </button>
          </div>
        </div>

        <div className={styles['form-group']}>
          <label className={styles['name-label']}>Name of Collection</label>
          <input 
            type="text" 
            value={collectionName} 
            onChange={handleCollectionNameChange}
            className={styles['text-input']}
            placeholder="Enter collection name"
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles['desc-label']}>Description</label>
          <textarea 
            value={collectionDescription} 
            onChange={handleCollectionDescriptionChange}
            className={styles['text-input']}
            placeholder="Enter collection description"
            rows="3"
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles['select-label']}>Select Model</label>
          <select 
            value={selectedModel} 
            onChange={handleModelChange}
            className={styles['select-input']}
          >
            <option value="">Select a model</option>
            <option value="Llama 3.1">Llama 3.1</option>
            <option value="Llama 70b">Llama 70b</option>
          </select>
        </div>

        <div className={styles['button-group']}>
          <button 
            onClick={handleMintCollection}
            className={styles['upload-button']}
            disabled={isMinting}
          >
            {isMinting ? 'Minting...' : 'Mint Collection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFTCollection;