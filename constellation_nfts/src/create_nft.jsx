// CreateNFT.js
import { Image, Paperclip, Brain, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAppContext } from './AppContext';
import { Alert, Snackbar } from '@mui/material';
import './styles/CreateNFT.css';
import { useAppContext } from './AppContext';

import { get_all_collection_data, get_collection_data } from './helper_functions/get_chain_data';
import { uploadImage } from './helper_functions/image_uploader';
import { convertPdfToText } from './helper_functions/pdf_to_text';
import { mintNFTData, nft_data } from './metagraph_scripts/mint_functions';


const CreateNFT = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [nftImagePreview, setNftImagePreview] = useState(null);
  const [nftImage, setNftImage] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  // const { actor, authClient } = useAppContext();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [nftCreated, setNftCreated] = useState(false);
  const [collectionsid, setCollectionsId] = useState({});
  console.log('Inside CreateNFT.jsx');
  const [isUploading, setIsUploading] = useState(false);
  const { address, provider } = useAppContext();

  console.log('address:', address);
  console.log('provider:', provider);


  useEffect(() => {
    console.log("Inside useEffect of CreateNFT.jsx");
    
    // Function to fetch collection data
    const fetchCollectionData = async () => {
      try {
        const collection_data = await get_all_collection_data();
        console.log("printing collection data");  
        console.log(collection_data);

        const collection_data_map = {};

        for (const item of collection_data) {
          collection_data_map[item.name] = item.id;
          console.log(item.name);
        }

        setCollectionsId(collection_data_map);
      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    };

    // Call the function
    fetchCollectionData();

  }, []); // Empty dependency array means this runs once on mount



  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleModelChange = (event) => setSelectedModel(event.target.value);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNftImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNftImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file');
    }
  };



  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.type === 'application/pdf');
    
    if (validFiles.length !== files.length) {
      alert('Please select only PDF files');
    }

    setPdfFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setPdfFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const uploadNFT = async () => {


    if (!nftImage || pdfFiles.length === 0 || !name || !description || !selectedModel) {
      alert('Please fill in all fields and upload required files');
      return;
    }

    setIsUploading(true);

    try {

      const textResults = await Promise.all(pdfFiles.map(file => convertPdfToText(file)));

      const nftImageArray = Array.from(new Uint8Array(await nftImage.arrayBuffer()));

      const result_image = await uploadImage(nftImageArray);

      

      // get the collection data from collections id
      
      console.log("printing selectedModel");
      console.log(selectedModel);

      var collection_data =  await get_collection_data(selectedModel);


      // collection_data = collection_data[0];

      // for (var i = 0; i < collectionsid.length; i++) {
      //   if (collectionsid[i].id == selectedModel) {
      //     collection_data = collectionsid[i];
      //     break;
      //   }
      // }

      console.log("printing collection data2");
      console.log(collection_data);

      // convert string to number
      var numberOfNFTs = parseInt(collection_data.numberOfNFTs) + 1;
      
      const mint_nft_data = nft_data(
        numberOfNFTs,
        result_image.url,
        name,
        description,
        {},
      // "test"
        textResults[0]["text"]
      );

      await mintNFTData(selectedModel, mint_nft_data);

      setNftCreated(true);
      setIsUploading(false);

      setTimeout(() => {

        navigate(`/collections/${selectedModel}`);

      }, 3000);


      // TODO: react -> flask -> blockchain
      // const tokenId = await actor.process_pdfs_and_mint_nft(input);// rust 
      // setNftCreated(true);
      // console.log('NFT minted with token ID:', tokenId);
      // alert(`NFT minted with token ID: ${tokenId}`);




    } catch (error) {
      console.error('Error processing PDFs and minting NFT:', error);
      alert('Error processing PDFs and minting NFT');
    }
  };

  const handleCloseAlert = () => {
    setNftCreated(false);
  };

  return (
    <div className="create-nft-container">
        <Snackbar 
        open={!!nftCreated}
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          NFT Created Successfully !
        </Alert>
      </Snackbar>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Main
      </button>

      <div className={`create-nft-form ${isUploading ? 'uploading' : ''}`}>
        <div className="form-group">
          <label>NFT Image</label>
          <div className="nft-image-preview">
            <div className="nft-image-circle">
              {nftImagePreview ? (
                <img src={nftImagePreview} alt="NFT Preview" />
              ) : (
                <Image size={40} />
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={imageInputRef}
              className="hidden-input"
            />
            <button 
              onClick={() => imageInputRef.current.click()}
              className="change-photo-button"
            >
              {nftImage ? 'Change Photo' : 'Select Photo'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className='name-label'>Name of NFT</label>
          <input 
            type="text" 
            value={name} 
            onChange={handleNameChange}
            className="text-input"
            placeholder="Enter NFT name"
          />
        </div>

        <div className="form-group">
          <label className='desc-label'>Description</label>
          <textarea 
            value={description} 
            onChange={handleDescriptionChange}
            className="text-input"
            placeholder="Enter NFT description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label className='select-label'>Select Custom Model</label>
          <select 
          value={selectedModel} 
          onChange={handleModelChange}
          className="select-input"
        >
          <option value="" disabled selected>Select a model</option>
          
          {Object.entries(collectionsid).map(([name, id]) => (
            <option key={id} value={id}>{name}</option>
  ))}
</select> 
        </div>

        <div className="form-group">
          <label className="upload-label">Upload Knowledge. Fine Tune Your Model</label>
          <div className="pdf-upload-area">
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".pdf" 
              onChange={handleFileChange} 
              multiple
              className="hidden-input"
            />
            {pdfFiles.length > 0 ? (
              <div className="pdf-file-list">
                {pdfFiles.map((file, index) => (
                  <div key={index} className="pdf-file-item">
                    <div className="pdf-icon">PDF</div>
                    <span className="pdf-name">{file.name}</span>
                    <button onClick={() => handleRemoveFile(index)} className="remove-file-button">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Click the attach button</p>
            )}
          </div>
          <div className="button-group">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="attach-button"
            >
              <Paperclip size={20} /> Attach
            </button>
            <button 
              onClick={uploadNFT}
              className="upload-button"
            >
              <Brain size={20} /> {isUploading ? 'Tokenizing...' : 'Tokenize Knowledge'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;