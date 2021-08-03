import { PlantPart } from "./plant-part-schema";

export async function retrieveById(id){
    return await PlantPart.findById(id);
}

export async function trimmedRetrieveById(id){
    const data = await retrieveById(id);
    return trimmedInfoPlantPart(data);
}

function trimmedInfoPlantPart(plant){
    return {
        EasyId: plant.EasyId,
        Name: plant.Name
    }
}