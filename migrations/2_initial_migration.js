const Migrations = artifacts.require("transfer");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
