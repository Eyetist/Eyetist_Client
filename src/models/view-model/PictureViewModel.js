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

    getPictures(userId){
        let pictures = [];
        this.getAll().map( (picture) => {
            if(picture.userId === userId){
                pictures.push(picture)
            }
        })
        return pictures;
    }
}