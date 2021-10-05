import { PlantPart } from "./plant-part-schema";

export async function retrieveById(id){
    return await PlantPart.findById(id);
}

export async function retrieveByEasyId(id){
    return await PlantPart.find({EasyId: id});
}

export async function createPlantPart(name){
    const highEasyId = await retrieveMaxId();
    const item = new PlantPart({
        EasyId: highEasyId + 1,
        Name: name
    });
    await PlantPart.insertMany(item);
    return item;
}

export async function createPlantPartWithDate(name, date){
    const highEasyId = await retrieveMaxId();
    const item = new PlantPart({
        EasyId: highEasyId + 1,
        Name: name,
        createdAt: date
    });
    await PlantPart.insertMany(item);
    return item;
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

export async function retrieveMaxId(){
    const data = await PlantPart.find().sort({EasyId: -1}).limit(1);
    return data ? data[0].EasyId : -1;
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