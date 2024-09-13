// stargazerNftMinter.js

import { activateStargazerProviders } from './utils';
import axios from 'axios';

import {Buffer} from 'buffer';

const METAGRAPH_L1_DATA_URL = 'http://localhost:9400';

// type StargazerDagSignatureRequest = {
//     content: string;
//     metadata: Record<string, JSONScalarValue>;
//   };

async function generateActionMessageProof(actionMessage, dagProvider, userAddress) {


// const signatureRequest  = {
//         content: 'Sign this message to confirm your participation in this project.',
//         metadata: actionMessage
// };
// //   const encodedMessage = btoa(JSON.stringify(actionMessage));
//   const encodedMessage = btoa(JSON.stringify(signatureRequest));

//   console.log("actionMessage",signatureRequest);
//   console.log("encodedMessage",encodedMessage);
//   console.log("dagProvider",dagProvider)
//   const signature = await dagProvider.request({
//     method: 'dag_signMessage',
//     params: [userAddress, encodedMessage]
//   });


const signatureRequestEncoded = window.btoa(JSON.stringify(actionMessage));

const signature = await dagProvider.request({
  method: "dag_signData",
  params: [userAddress, signatureRequestEncoded],
});

  console.log("signature",signature);
//   throw new Error('test error');


  const publicKey = await dagProvider.request({
    method: 'dag_getPublicKey',
    params: [userAddress]
  });

  return {
    id: publicKey.substring(2),
    signature
  };
}

async function generateActionMessageBody(actionMessage, dagProvider, userAddress) {
  const proof = await generateActionMessageProof(actionMessage, dagProvider, userAddress);
  console.log("proof",proof);
  return { value: actionMessage, proofs: [proof] };
}

async function sendActionMessage(actionMessage, dagProvider, userAddress) {


  const body = await generateActionMessageBody(actionMessage, dagProvider, userAddress);

  console.log("body",body);

  try {
    console.log('Sending Action Message:', JSON.stringify(body, null, 2));
    const response = await axios.post(`${METAGRAPH_L1_DATA_URL}/data`, body);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    return response;
  } catch (error) {
    console.error('Send Action Message Error:', error.response?.data || error.message);
    throw error;
  }
}

async function mintNFT(collectionId, nftData, dagProvider, userAddress) {
  const actionMessage = {
    MintNFT: {
      owner: userAddress,
      collectionId,
      nftId: nftData.id,
      uri: nftData.uri,
      name: nftData.name,
      description: nftData.description,
      metadata: nftData.metadata || {},
      AI_data: nftData.AI_data || ''
    }
  };

  return sendActionMessage(actionMessage, dagProvider, userAddress);
}

async function mintSampleCollection(collectionName, nftCount) {
  const { dagProvider } = await activateStargazerProviders();
  const dagAccounts = await dagProvider.request({ method: 'dag_accounts', params: [] });
  const userAddress = dagAccounts[0];

  console.log("account:",userAddress);



  // Mint collection
  const mintCollectionAction = { MintCollection: { name: collectionName } };

// const encodedMessage = Buffer.from(JSON.stringify(actionMessage)).toString('base64')
// const mintCollectionAction = {  // MintCollection: Buffer.from(JSON.stringify({ name: collectionName })).toString('base64') };

  console.log("metagraph_scripts",mintCollectionAction);

  const collectionResponse = await sendActionMessage(mintCollectionAction, dagProvider, userAddress);
  console.log("collectionResponse",collectionResponse);

  const collectionId = collectionResponse.data.hash;
  console.log("collectionId",collectionId);

  console.log('Waiting for collection to populate over the cluster');
  await new Promise(resolve => setTimeout(resolve, 30000));

//   console.log(`Minting ${nftCount} NFTs`);
//   for (let i = 0; i < nftCount; i++) {
//     const serial = String(i).padStart(4, '0');
//     const nftData = {
//       id: i,
//       uri: `https://your-nft-assets-url.com/${serial}.png`,
//       name: `${collectionName} - ${serial}`,
//       description: `${collectionName} - ${serial} - desc`,
//       metadata: {},
//       AI_data: 'Cool AI data'
//     };

    // await mintNFT(collectionId, nftData, dagProvider, userAddress);
  }

  console.log('Sample collection minted successfully');


export { mintSampleCollection };