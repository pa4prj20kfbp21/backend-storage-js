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
    let data = await ObjectData.find({Object: plant_id});
    const result = await ObjectData.find({Object: null});
    let i;

    try{
        for(i = 0; i < data.length; i++){
            const extraData = result.filter(res => res.createdAt.getDay() === data[i].createdAt.getDay());
            if(extraData){
                const keys = Object.keys(extraData[0].Data);
                for(const key of keys) data[i].Data[key] = extraData[0].Data[key];
                data[i].Data["EnvironmentRef"] = extraData[0]._id;
            }
        }
    }catch(e){
        console.log("Not working!");
    };
    
    return data;
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