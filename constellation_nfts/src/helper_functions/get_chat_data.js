// private val routes: HttpRoutes[F] = HttpRoutes.of[F] {
//     case GET -> Root / "collections" => getAllCollections
//     case GET -> Root / "collections" / collectionId => getCollectionById(collectionId)
//     case GET -> Root / "collections" / collectionId / "nfts" => getCollectionNFTs(collectionId)
//     case GET -> Root / "collections" / collectionId / "nfts" / nftId => getCollectionNFTById(collectionId, nftId.toLong)
//     case GET -> Root / "addresses" / AddressVar(address) / "collections" => getAllCollectionsOfAddress(address)
//     case GET -> Root / "addresses" / AddressVar(address) / "nfts" => getAllNFTsOfAddress(address)
//     case GET -> Root / "collections" / collectionId / "nfts"/ nftId/"getApi" => Generate_API_KEY(collectionId, nftId.toLong)
//     case GET -> Root / "collections" / collectionId / "nfts"/ nftId/"DTest" => Complete_Decentralizaed_Data_Test(collectionId, nftId.toLong)


async function get_api_key(collectionId, nftId) {
    const response = await fetch(`http://localhost:9200/data-application/collections/${collectionId}/nfts/${nftId}/getApi`, { method: 'GET' });
    const nftData = await response.json();
    return nftData;
}


async function test_model(collectionId, nftId) {
    const response = await fetch(`http://localhost:9200/data-application/collections/${collectionId}/nfts/${nftId}/DTest`, { method: 'GET' });
    const nftData = await response.json();
    return nftData;
}


export { get_api_key, test_model };