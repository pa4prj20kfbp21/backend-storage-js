import { PlantPart } from "./plant-part-schema";

export async function retrieveById(id){
    return await PlantPart.findById(id);
}

export async function retrieveByObjectType(query){
    const listObjects = await PlantPart.find().sort({EasyId: "asc"});
    const resultList = [];

    listObjects.forEach((o,i,a) => {
        a[i] = trimmedButWithCreationDate(o);
        if (a[i].Name.toLowerCase().includes(query)) resultList.push(a[i]);
    });

    return resultList;
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

function trimmedButWithCreationDate(plant){
    return {
        ID: plant._id,
        EasyId: plant.EasyId,
        Name: plant.Name,
        CreatedDate: plant.createdAt
    }
}