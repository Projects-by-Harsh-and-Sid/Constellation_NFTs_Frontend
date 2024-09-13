import React, { useState } from 'react';
import { mintSampleCollection } from './metagraph_scripts/stargazerNftMinter';

const NFTMinterButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [result, setResult] = useState('');

  const handleMint = async () => {
    setIsMinting(true);
    setResult('');

    try {
      await mintSampleCollection('My Awesome Collection', 2);
      setResult('Sample collection minted successfully!');
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleMint}
        disabled={isMinting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isMinting ? 'Minting...' : 'Mint Sample Collection'}
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
};

export default NFTMinterButton;