import { activateStargazerProviders } from './utils';

const METAGRAPH_L0_URL = 'http://localhost:9200'; // Replace with the actual metagraph L0 URL

async function getUserAddress() {
  const { dagProvider } = await activateStargazerProviders();
  const dagAccounts = await dagProvider.request({ method: 'dag_accounts', params: [] });
  const userAddress = dagAccounts[0];
  return userAddress;
}

// 1. Get all NFTs associated with the user
async function getAllNFTsForUser() {
  const userAddress = await getUserAddress();
  const response = await fetch(`${METAGRAPH_L0_URL}/data-application/addresses/${userAddress}/nfts`);
  if (!response.ok) {
    throw new Error(`Error fetching NFTs: ${response.statusText}`);
  }
  const nftData = await response.json();
  return nftData;
}

// 2. Get all collections associated with the user
async function getAllCollectionsForUser() {
  const userAddress = await getUserAddress();
  const response = await fetch(`${METAGRAPH_L0_URL}/data-application/addresses/${userAddress}/collections`);
  if (!response.ok) {
    throw new Error(`Error fetching collections: ${response.statusText}`);
  }
  const collectionsData = await response.json();
  return collectionsData;
}

// 3. Filter NFTs based on collections
async function getUserNFTsInCollection(collectionId) {
  const nfts = await getAllNFTsForUser();
  const filteredNFTs = nfts.filter(nft => nft.collectionId === collectionId);
  return filteredNFTs;
}

// Example usage:

(async () => {
  try {
    // Get all NFTs for the user
    const userNFTs = await getAllNFTsForUser();
    console.log('All NFTs for the user:', userNFTs);

    // Get all collections for the user
    const userCollections = await getAllCollectionsForUser();
    console.log('All collections for the user:', userCollections);

    // Filter NFTs based on a specific collection
    const collectionId = 'your-collection-id-here'; // Replace with actual collection ID
    const nftsInCollection = await getUserNFTsInCollection(collectionId);
    console.log(`NFTs in collection ${collectionId}:`, nftsInCollection);
  } catch (error) {
    console.error(error);
  }
})();
