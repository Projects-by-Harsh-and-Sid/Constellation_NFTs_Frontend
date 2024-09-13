

import { activateStargazerProviders } from './utils';
import { sendActionMessage } from './stargazerUtils';



function nft_data(id,uri,name,description,metadata,AI_data) {

    const nftData = {
        id: id,
        uri: uri,
        name: name,
        description: description,
        metadata: metadata || {},
        AI_data: AI_data || ''
        };
    return nftData;

    }


async function mintNFTData(collectionId, nftData) {


    const { dagProvider }   = await activateStargazerProviders();
    const dagAccounts       = await dagProvider.request({ method: 'dag_accounts', params: [] });
    const userAddress       = dagAccounts[0];
    
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
  

    const collectionResponse    = await sendActionMessage(actionMessage, dagProvider, userAddress);
    console.log("collectionResponse",collectionResponse);
  
    const collectionId          = collectionResponse.data.hash;
    console.log("collectionId",collectionId);
  
    console.log('Waiting for collection to populate over the cluster');
    await new Promise(resolve => setTimeout(resolve, 30000));


  }



async function mintCollection(collectionName) {


    const { dagProvider }   = await activateStargazerProviders();
    const dagAccounts       = await dagProvider.request({ method: 'dag_accounts', params: [] });
    const userAddress       = dagAccounts[0];
  
    console.log("account:",userAddress);
  
    // Mint collection
    const mintCollectionAction  = { MintCollection: { name: collectionName } };
    console.log("metagraph_scripts",mintCollectionAction);
  
    const collectionResponse    = await sendActionMessage(mintCollectionAction, dagProvider, userAddress);
    console.log("collectionResponse",collectionResponse);
  
    const collectionId          = collectionResponse.data.hash;
    console.log("collectionId",collectionId);
  
    console.log('Waiting for collection to populate over the cluster');
    await new Promise(resolve => setTimeout(resolve, 30000));
  

    }




async function mintNftID(collectionName) {


        const { dagProvider } = await activateStargazerProviders();
        const dagAccounts = await dagProvider.request({ method: 'dag_accounts', params: [] });
        const userAddress = dagAccounts[0];
      
        console.log("account:",userAddress);
      
        // Mint collection
        const mintCollectionAction = { MintCollection: { name: collectionName } };
      
        console.log("metagraph_scripts",mintCollectionAction);
      
        const collectionResponse = await sendActionMessage(mintCollectionAction, dagProvider, userAddress);
        console.log("collectionResponse",collectionResponse);
      
        const collectionId = collectionResponse.data.hash;
        console.log("collectionId",collectionId);
      
        console.log('Waiting for collection to populate over the cluster');
        await new Promise(resolve => setTimeout(resolve, 30000));
      
    }
      