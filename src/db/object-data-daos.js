import { ObjectData } from "./object-data-schema";
import * as PlantPart from "./plant-part-daos";

export async function retrieveById(object_id){
    return await ObjectData.findById(object_id);
}

export async function eagerRetrieveById(object_id){
    const data = await retrieveById(object_id)
    return await eagerConvertToDto(data);
}

export async function retrieveAllByPlantID(plant_id){
    return await ObjectData.find({Object: plant_id});
}

async function eagerConvertToDto(objectData){
    if(objectData["Object"]){
        const plantPart = await PlantPart.trimmedRetrieveById(objectData["Object"]);
        return {
            Object: plantPart,
            Data: objectData.Data
        }
    }
    return {
        Data: objectData.Data
    }
}