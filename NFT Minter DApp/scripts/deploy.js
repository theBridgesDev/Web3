async function main() {
   // Grab the contract factory 
   const FelineFriendsFactory = await ethers.getContractFactory("FelineFriends");

   // Start deployment, returning a promise that resolves to a contract object
   const felineFriends = await FelineFriendsFactory.deploy(); // Instance of the contract 
   console.log("Contract deployed to address:", felineFriends.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
