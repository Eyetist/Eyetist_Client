export class PictureViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getPictures(member, visibility){
        let pictures = [];
        this.getAll().map( (picture) => {
            if(picture.member === member && picture.visibility === visibility){
                pictures.push(picture)
            }
        })
        return pictures;
    }
}