import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreate = () => {
    const contract = useSelector(state => state.addContract.contract);
    const navigate = useNavigate();

    function createCustomer(role, name, email, password) {
        return new Promise((resolve, reject) => {
            contract.createCustomer(name, email, password, role)
                .then(() => {
                    contract.on("createCustomerEvent", (name, email, password, role) => {
                        window.localStorage.setItem("userData", JSON.stringify({name,email,role}));
                        toast.success(`Customer ${name} created successfully`);
                        navigate("/");
                        resolve();
                    });
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }

    function createFarmer(role, name, email, password) {
        return new Promise((resolve, reject) => {
            contract.createFarmer(name, email, password, role)
                .then(() => {
                    contract.on("createFarmerEvent", (name, email, password, role) => {
                        window.localStorage.setItem("userData", JSON.stringify({name, email, role}));
                        toast.success(`Farmer ${name} created successfully`);
                        navigate("/farmer");
                        resolve();
                    });
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }

    function createAuthority(role, name, email, password) {
        return new Promise((resolve, reject) => {
            contract.createAuthority(name, email, password, role)
                .then(() => {
                    contract.on("createAuthorityEvent", (name, email, password, role) => {
                        window.localStorage.setItem("userData", JSON.stringify({name, email, role}));
                        toast.success(`Authority ${name} created successfully`);
                        navigate("/authority");
                        resolve();
                    });
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }

    return [createCustomer, createFarmer, createAuthority];
}


export default useCreate;