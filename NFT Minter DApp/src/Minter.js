import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  useEffect(async () => { //TODO: implement
	  const {address, status} = await getCurrentWalletConnected();
	  setWallet(address);
	  setStatus(status);
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
	  const walletResponse = await connectWallet();
	  setStatus(walletResponse.status);
	  setWallet(walletResponse.address);
  };

const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
};

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🐱 Feline Friends NFT Minter</h1>
      <p>
        Simply add your feline friend's URL, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🐒 Jpeg URL: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>📛 Name your feline friend: </h2>
        <input
          type="text"
          placeholder="e.g. Cutie-patoots!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>📃 Tell us about your feline friend: </h2>
        <input
          type="text"
          placeholder="e.g. Even cuter than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint Feline Friend
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
