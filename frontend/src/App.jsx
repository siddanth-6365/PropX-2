import CollectionsSection from "./components/CollectionsSection";
import HeroSection from "./components/HeroSection";
import StatsTable from "./components/StatsTable";
import BaseLayout from "./components/layouts/BaseLayout";
import { useState } from "react";
import MarketplaceAbi from "../../blockchain/src/frontend/contractsData/Marketplace.json";
import MarketplaceAddress from "../../blockchain/src/frontend/contractsData/Marketplace-address.json";
import FractionalNFTAbi from "../../blockchain/src/frontend/contractsData/FractionalNFT.json";
import FractionalNFTAddress from "../../blockchain/src/frontend/contractsData/FractionalNFT-address.json";
import { ethers } from "ethers";

function App() {
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState(null);
  const [fractionalNFT, setFractionalNFT] = useState(null);
  const [account, setAccount] = useState(null);

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const fractionalNFT = new ethers.Contract(
      FractionalNFTAddress.address,
      FractionalNFTAbi.abi,
      signer
    );
    setFractionalNFT(fractionalNFT);
    setLoading(false);
  };

  return (
    <>
      <BaseLayout account={account} web3Handler={web3Handler}>
        <HeroSection />
        <StatsTable />
        <CollectionsSection title="Notable Collections" />
        <CollectionsSection title="Top Collector Buys Today" />
        <CollectionsSection title="LGBTQIA+ Pride Month Creator Spotlight" />
        {/* <CollectionsSection title="Trending in Art" />
      <CollectionsSection title="Trending in Gaming" />
      <CollectionsSection title="Trending in Memberships" /> */}
      </BaseLayout>
    </>
  );
}

export default App;
