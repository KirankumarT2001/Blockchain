import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CertificationReq() {
    const contract = useSelector(state => state.addContract.contract);

    async function applyCertificate(cropname,cropquantity,cropquality,desiredprice) {
        try {
            await contract.applyCertificate(cropname,cropquantity,cropquality,desiredprice);
            contract.once("applyCertificateEvent", (cropname,cropquantity,cropquality,desiredprice) => {
                toast.success(`Your request of issue for Certificate has submitted successfully`);
            });
        } catch (e) {
            toast.error(e);
        }
    }

    return { applyCertificate };
}

export default CertificationReq;