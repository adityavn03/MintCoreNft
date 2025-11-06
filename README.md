🎨 Solana NFT Minting with Metaplex Core

This project demonstrates NFT creation on the Solana blockchain using the Metaplex Core
 protocol.
It automatically creates a collection, mints NFTs with on-chain metadata, and stores JSON metadata securely on Irys (Arweave).

🚀 Tech Stack
Layer	Technology	Description
🧱 Blockchain	Solana Web3.js
	Blockchain interaction & transactions
🧩 NFT Protocol	Metaplex Core
	Modern NFT standard for Solana
🛠 SDK	@metaplex-foundation/mpl-core	Core SDK for creating, managing NFTs
🪶 Metadata Storage	Irys
 (Arweave)	Decentralized metadata storage
⚙️ Runtime	Node.js
 + TypeScript	Development environment
📦 Features

✅ Automatic SOL airdrop on local/testnet
✅ Create NFT Collections using Metaplex Core
✅ Mint NFTs with metadata hosted on Irys
✅ Assign collection-based update authorities
✅ Fetch assets by owner or collection
✅ Transfer NFT ownership on-chain

⚡ Quick Start
1️⃣ Clone the repository
git clone https://github.com/yourusername/MintCoreNft.git
cd MintCoreNft

2️⃣ Install dependencies
npm install

3️⃣ Start local Solana test validator (optional)
solana-test-validator

4️⃣ Run the NFT creation script
npx ts-node app.ts

🧾 Example Output
🚀 Starting NFT Creation...

💰 Airdropping SOL...
✅ Airdrop complete

📁 Creating Collection: ARLCoN5pcNdVWt5tWJLUDteKVf18iWANjoVUNAT9Vb5e
✅ Collection created

🎨 Minting NFT #0...
✅ NFT #0 minted
