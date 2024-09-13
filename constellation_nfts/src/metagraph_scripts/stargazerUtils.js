import { activateStargazerProviders } from './utils';
import axios from 'axios';



const METAGRAPH_L1_DATA_URL = 'http://localhost:9400'; // used for posting data to the L1 DAG
const METAGRAPH_L0 = 'http://localhost:9200'; // used for get requests from the L0 DAG


async function generateActionMessageProof(actionMessage, dagProvider, userAddress) 
{    
    const signatureRequestEncoded = window.btoa(JSON.stringify(actionMessage));
    
    const signature = await dagProvider.request({
      method: "dag_signData",
      params: [userAddress, signatureRequestEncoded],
    });
    
      console.log("signature",signature);    
    
      const publicKey = await dagProvider.request({
        method: 'dag_getPublicKey',
        params: [userAddress]
      });
    
      return {
        id: publicKey.substring(2),
        signature
      };
    }


async function generateActionMessageBody(actionMessage, dagProvider, userAddress) 
{
    const proof = await generateActionMessageProof(actionMessage, dagProvider, userAddress);
    console.log("proof",proof);
    return { value: actionMessage, proofs: [proof] };
}



async function sendActionMessage(actionMessage, dagProvider, userAddress) 
{
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
  