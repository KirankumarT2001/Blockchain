import { useDispatch } from "react-redux";
import { ethers, Contract } from "ethers";
import { setWallet } from "../store/walletSlice";
import { abi } from "../assets/Supply.json";
import { toast } from "react-toastify";

function useWallet() {
    const dispatch = useDispatch();
    window.ethereum.on("accountsChanged", connectWallet);

    function connectWallet() {
        return new Promise((resolve, reject) => {
            let signer = null;
            let provider;
            if (window.ethereum == null) {
                toast.warn("MetaMask not installed; using read-only defaults")
                provider = ethers.getDefaultProvider();
                reject();
            } else {
                provider = new ethers.BrowserProvider(window.ethereum)
                provider.getSigner().then((data) => {
                    signer = data;
                    const contract = new Contract("0x255bAa64c7468148aeC6A886B785BdD0be97ce17", abi, signer);
                    const address = signer.address;
                    dispatch(setWallet({ contract, address }));
                    resolve();
                })
            }
        });
    }

    return connectWallet;
}

export default useWallet;