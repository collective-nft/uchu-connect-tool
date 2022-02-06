import SaleABI from "../abi/Sale.json";
import NFTContractABI from "../abi/NFTContract.json";
import RoyaltyStandardABI from "../abi/RoyaltyStandard.json";

const sale_contract_addr = "0x14b570127FA1a797173Bb8320ADd31E8a9C5c4A7";
const sale_contract_abi = SaleABI.abi;

let web3js;
let sale_contract = new web3js.eth.Contract(
  sale_contract_abi,
  sale_contract_addr
);

window.addEventListener("load", function () {
  if (typeof web3 !== "undefined") {
    web3js = new Web3(web3.currentProvider);
  } else {
    alert("MetaMaskをインストールして下さい");
  }
  startApp();
});

function startApp() {
  web3js.eth.getAccounts(function (err, accounts) {
    coinbase = accounts[0];
    console.log("coinbase is " + coinbase);
    if (typeof coinbase === "undefined") {
      alert("MetaMaskを起動してください．");
    }
  });
}

function withdraw() {
  var amount = document.getElementById("amount").value;

  return sale_contract.methods
    .withdrawFee(web3js.utils.toWei(amount))
    .send({ from: coinbase })
    .on("receipt", function (receipt) {
      alert("success");
    })
    .on("error", function (error) {
      alert("error" + error);
    });
}

function soldTokenCounter() {
  contract.methods
    .soldTokenCounter()
    .call()
    .then(function (soldTokenCounter) {
      console.log(soldTokenCounter);
    });
}
