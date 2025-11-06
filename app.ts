import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { 
    createV1, 
    mplCore, 
    fetchAssetV1,
    transferV1,
    createCollectionV1, 
    getAssetV1GpaBuilder, 
    Key, 
    updateAuthority, 
    pluginAuthorityPair, 
    ruleSet 
} from '@metaplex-foundation/mpl-core'
import { TransactionBuilderSendAndConfirmOptions, generateSigner, signerIdentity, sol } from '@metaplex-foundation/umi';

const umi = createUmi('http://127.0.0.1:8899', 'processed').use(mplCore())

const asset = generateSigner(umi);
const payer = generateSigner(umi);

umi.use(signerIdentity(payer));

const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};

async function main() {
    console.log('🚀 Starting NFT Creation...\n');

    // 1. Airdrop
    console.log('💰 Airdropping SOL...');
    const airdropAmount = sol(100);
    await umi.rpc.airdrop(umi.identity.publicKey, airdropAmount, txConfig.confirm);
    console.log('✅ Airdrop complete\n');

    // 2. Create collection with YOUR Irys metadata
    const collectionAddress = generateSigner(umi);
    console.log('📁 Creating Collection:', collectionAddress.publicKey.toString());
    
    const collectionUpdateAuthority = generateSigner(umi);
    const creator1 = generateSigner(umi);
    const creator2 = generateSigner(umi);
    
    await createCollectionV1(umi, {
        name: 'My NFT Collection',
        // Use the collection metadata link from your JSON (-1 item)
        uri: 'https://gateway.irys.xyz/5U1ZbL7H7DmUF2rMXkxUBXpkCKXN4jhMF2dNTHY8uUWU',
        collection: collectionAddress,
        updateAuthority: collectionUpdateAuthority.publicKey,
        plugins: [
            pluginAuthorityPair({
                type: 'Royalties',
                data: {
                    basisPoints: 500,
                    creators: [
                        { address: creator1.publicKey, percentage: 20 },
                        { address: creator2.publicKey, percentage: 80 },
                    ],
                    ruleSet: ruleSet('None'),
                },
            }),
        ],
    }).sendAndConfirm(umi, txConfig);
    console.log('✅ Collection created\n');

    // 3. Mint NFT #0 with YOUR metadata
    console.log('🎨 Minting NFT #0...');
    await createV1(umi, {
        name: 'My NFT #0',
        // Use the metadata link for NFT #0
        uri: 'https://gateway.irys.xyz/vdCvYrhEL17pezTbmD6SqRz6Lm9XVh2UaS7k3VWEpGd',
        asset: asset,
        collection: collectionAddress.publicKey,
        authority: collectionUpdateAuthority,
    }).sendAndConfirm(umi, txConfig);
    console.log('✅ NFT #0 minted\n');

    // Rest of your code for fetching and displaying...
        // 4. Fetch assets by owner
    const assetsByOwner = await getAssetV1GpaBuilder(umi)
        .whereField('key', Key.AssetV1)
        .whereField('owner', payer.publicKey)
        .getDeserialized();

    console.log(assetsByOwner);

    // 5. Fetch assets by collection
    const assetsByCollection = await getAssetV1GpaBuilder(umi)
        .whereField('key', Key.AssetV1)
        .whereField(
            'updateAuthority',
            updateAuthority('Collection', [collectionAddress.publicKey])
        )
        .getDeserialized();

    console.log(assetsByCollection);

        // 6. Transfer an asset
    const recipient = generateSigner(umi);
    await transferV1(umi, {
        asset: asset.publicKey,
        newOwner: recipient.publicKey,
        collection: collectionAddress.publicKey,
     }).sendAndConfirm(umi, txConfig);

    const transferredAsset = await fetchAssetV1(umi, asset.publicKey);
    if (transferredAsset.owner.toString() !== recipient.publicKey.toString()) {
        throw new Error('Transfer failed');
    }
}
main().catch((err) => console.error(err));
