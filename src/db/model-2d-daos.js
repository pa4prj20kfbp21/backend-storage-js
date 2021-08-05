import { Model2D } from "./model-2d-schema";
import * as BoundingBox from "./bounding-box-daos";

export async function eagerRetrieveModel2D(id){
    const data = await retrieveById(id);
    return await convertToEagerDto(data);
}

export async function retrieveById(id){
    return await Model2D.findById(id);
}

async function convertToEagerDto(model){
    const bBoxList = [];

    for(const bBox of model.BoundingBoxes){
        const bBoxInfo = await BoundingBox.eagerRetrieveModel2D(bBox);
        bBoxList.push(bBoxInfo);
    }

    return {
        ImageURL: model.ImageURL,
        BoundingBoxes: bBoxList
    }
}