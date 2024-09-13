import mintCollection from "../src/metagraph_scripts/mint_functions.js";

// const mintCollection = require('../src/metagraph_scripts/mint_functions.js');


// Mint a collection
const collectionName = 'Test Llama Collection';
const description = 'A collection of Llama NFTs';
const based_model = 'Llama 3.1B 8B';
const uri = 'https://gateway.pinata.cloud/ipfs/QmTQ5fF4p5zVwv3D3a7C3Wz5g6cD9hA1y7bY2G4Qc5gD4A';

mintCollection(collectionName, description, based_model, uri);
