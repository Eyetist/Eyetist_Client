export class Picture{
    #pictures = [{
        member : "",
        blobName : "",
        likesBlobName : "",
        azureBlobName : "",
        title : "",
        link : "",
        likes : "",
        visibility : "",
        date : "",
        heart : "",
    }]

    updateModel(updatedModel){
        this.#pictures = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#pictures;
    }
}