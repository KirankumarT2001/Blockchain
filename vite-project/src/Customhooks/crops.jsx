import { useSelector } from "react-redux";
import selecctId from "./generateId";
import { toast } from "react-toastify";

const useCrop = () => {
    const contract = useSelector(state => state.addContract.contract);
    const generateIdentifier = selecctId();

    async function cropRegister(farmer, crop, land, area, time, yild) {
        try {
            const identifiers = [];
            const data = await contract.getAllCropIds();
            if (data.length !== 0) {
                data.map((element)=>{
                    identifiers.push(element);
                });
            }
            const id = generateIdentifier(identifiers);
            await contract.cropRegister(id, farmer, crop, land, area, time, yild);
            contract.once("cropRegisterEvent", (id, farmer, crop, land, area, time, yild) => {
                toast.success(`Your crop registered successfully of Crop ID ${id}`);
            });
        } catch (e) {
            toast.error(e);
        }
    }

    async function getCrops() {
        const cropList = await contract.getCrops();
        let crops = [];
        cropList.map((element) => {
            let crop = {
                id: element.id,
                farmerName: element.farmerName,
                ETHAddress: element.ETHAddress,
                cropName: element.cropName,
                landAddress: element.landAddress,
                area: element.area,
                time: element.time,
                yield: element.yield,
                timeofRegister: element.timeofRegister
            }
            crops.push(crop);
        });
        return crops;
    }

    return { cropRegister, getCrops };
}

export default useCrop;