const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
    
    await deployer.deploy(BonusToken);
    const bonusToken = await BonusToken.deployed(); 

    const routerAddress = '';   //address from uniswap
    const pairAddress = '';     //address from uniswap
    const routerForkAddress = '';   //address you deployed
    const pairForkAddress = '';     //address you deployed

  //  console.log(LiquidityMigrator);
    await deployer.deploy(
        LiquidityMigrator,
        routerAddress, 
        pairAddress, 
        routerForkAddress, 
        pairForkAddress, 
        bonusToken.address
    );
    const liquidityMigrator = await LiquidityMigrator.deployed();
    await bonusToken.setLiquidator(liquidityMigrator.address);
    
};

