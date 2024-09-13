

// private val routes: HttpRoutes[F] = HttpRoutes.of[F] {
//     case GET -> Root / "collections" => getAllCollections
//     case GET -> Root / "collections" / collectionId => getCollectionById(collectionId)
//     case GET -> Root / "collections" / collectionId / "nfts" => getCollectionNFTs(collectionId)
//     case GET -> Root / "collections" / collectionId / "nfts" / nftId => getCollectionNFTById(collectionId, nftId.toLong)
//     case GET -> Root / "addresses" / AddressVar(address) / "collections" => getAllCollectionsOfAddress(address)
//     case GET -> Root / "addresses" / AddressVar(address) / "nfts" => getAllNFTsOfAddress(address)
//     case GET -> Root / "collections" / collectionId / "nfts"/ nftId/"getApi" => Generate_API_KEY(collectionId, nftId.toLong)
//     case GET -> Root / "collections" / collectionId / "nfts"/ nftId/"DTest" => Complete_Decentralizaed_Data_Test(collectionId, nftId.toLong)



async function get_all_collection_data() {

    // {
    //     "id": "8c2c6f272a7d59452857dbcde989b10a9d729402e3caf76c26e031e4bd7863b2",
    //     "owner": "DAG2vvtGcA2hKjFTPFMNBCqNTqJMbFJCz1Wcu8dq",
    //     "name": "Harsh Personality 2",
    //     "creationDateTimestamp": 1726249744411,
    //     "numberOfNFTs": 0,
    //     "description": "Ho Ho Ho",
    //     "baseModel": "Llama 3.1",
    //     "uri": "http://localhost:5500/image/1uQZSGbUu3.jpg"
    //   }

    const response = await fetch('http://localhost:9200/data-application/collections', { method: 'GET' });
    const nftCollectionsData = await response.json();
    return nftCollectionsData;

}


async function get_collection_data(collectionId) {
    const response = await fetch(`http://localhost:9200/data-application/collections/${collectionId}`, { method: 'GET' });
    const nftCollectionData = await response.json();

    // console.log("printing collection data");
    // console.log(nftCollectionData);

    return nftCollectionData;
}

async function get_all_nft_data(collectionId) {
    const response = await fetch(`http://localhost:9200/data-application/collections/${collectionId}/nfts`, { method: 'GET' });
    const nftData = await response.json();
    return nftData;
}


async function get_nft_data(collectionId, nftId) {
    const response = await fetch(`http://localhost:9200/data-application/collections/${collectionId}/nfts/${nftId}`, { method: 'GET' });
    const nftData = await response.json();
    return nftData;
}


export { get_all_collection_data, get_collection_data, get_all_nft_data, get_nft_data };
