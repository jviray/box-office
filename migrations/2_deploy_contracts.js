const BoxOffice = artifacts.require("BoxOffice");

module.exports = function(deployer) {
  deployer.deploy(BoxOffice);
};
