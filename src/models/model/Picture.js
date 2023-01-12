export class Picture{
    #pictures = [{
        member : "",
        blobName : "",
        title : "",
        link : "",
        likes : "",
        visibility : "",
        date : ""
    }]

    updateModel(updatedModel){
        this.#pictures = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#pictures;
    }
}