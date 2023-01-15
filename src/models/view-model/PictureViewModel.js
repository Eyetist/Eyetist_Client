export class PictureViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        let pictures = [];
        this.model.getModel().map( (picture) => {
            if (picture.date){
                let splitDate = picture.date.split(" ")
                console.log(splitDate)
                picture.date = splitDate[1] + "/" +String(splitDate[2]) + "/" + String(splitDate[5])
                // picture.date = picture.date.replace("KST","GMT")
                // picture.date = new Date(picture.date).toISOString().split("T")[0]
            }
            pictures.push(picture)
        })
        return pictures;
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