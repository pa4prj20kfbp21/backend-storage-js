import { BoundingBoxData } from "./bounding-box-schema";
import * as ObjectData from "./object-data-daos";

export async function eagerRetrieveModel2D(id){
    const data = await BoundingBoxData.findById(id);
    return await eagerConvertToDto(data);
}

export async function retrieveById(object_id){
    return await BoundingBoxData.findById(object_id);
}

async function eagerConvertToDto(box){
    const objItem = await ObjectData.eagerRetrieveById(box.ObjectID);
    return {
        X: box.X,
        Y: box.Y,
        Height: box.Height,
        Width: box.Width,
        Color: box.Color,
        ObjectID: objItem
    }
}