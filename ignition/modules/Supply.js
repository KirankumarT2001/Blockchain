const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SupplyModule", (m) => {
  const suply = m.contract("Supply");
  return { suply };
});
