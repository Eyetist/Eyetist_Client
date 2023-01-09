export class Picture{
    #pictures = [{
        userId : "",
        paintName : "",
        paintUrl : "",
        visibility : "",
        likeCount : "",
    }]

    updateModel(updatedModel){
        this.#pictures = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#pictures;
    }
}