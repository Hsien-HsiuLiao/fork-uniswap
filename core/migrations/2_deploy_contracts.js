const Factory = artifacts.require("UniswapV2Factory.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory, addresses[0]); //send transaction for deployment, by default first address, addresses[0] , used for deployment, gets reference to contract
  const factory = await Factory.deployed();     // wait for transaction to be mined

  //after getting reference, we can run functions, factory.createpair()
  let token1Address, token2Address;
  if(network === 'mainnet') {
    token1Address = '';
    token2Address = '';
  } else {
    await deployer.deploy(Token1);
    await deployer.deploy(Token2);
    const token1 = await Token1.deployed(); //get reference to token
    const token2 = await Token2.deployed(); //get reference
    token1Address = token1.address;         //save address
    token2Address = token2.address;         //save address  
  }
  await factory.createPair(token1Address, token2Address);
};
