import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Midterm() {
    const contract = useSelector(state => state.addContract.contract);

    async function MidTermVerify(farmer_name, cropname, area, progress, timeremaing) {
        try {
            await contract.midTermVerify(farmer_name, cropname, area, progress, timeremaing);
            contract.once("midTermVerifyEvent", (farmer_name, cropname, area, progress, timeremaing) => {
                toast.success(`Your request for Midterm verification has submitted successfully`);
            });
        } catch (e) {
            toast.error(e);
        }
    }

    return { MidTermVerify };
}

export default Midterm;