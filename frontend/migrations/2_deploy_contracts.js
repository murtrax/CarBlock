var Hello = artifacts.require("HashingTest");
module.exports = function(deployer) {   
	deployer.deploy(Hello);
};