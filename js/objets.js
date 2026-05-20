class Messages {
    constructor(){
        this.container = document.querySelector(".container");
        this.message = document.querySelector(".message");
        this.yesBtn = document.querySelector(".yes");
        this.notBtn = document.querySelector(".non");
        this.loadingArrow = document.querySelector(".deleting");
    }

    confirmPopUp(callback){
        this.container.classList.toggle("show");

        return new Promise((resolve) => {

            this.notBtn.onclick = () => {
                this.container.classList.remove("show");
                resolve(false);
            };

            this.yesBtn.onclick = () => {
                this.message.style.display = "none";
                this.loadingArrow.style.display = "flex";
                
                setTimeout(() => {
                    this.container.classList.remove("show");
                    this.message.style.display = "grid"; 
                    this.loadingArrow.style.display = "none";
                    resolve(true);
                },800);
            }
        });
    }
}

export default Messages;