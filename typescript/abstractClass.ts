abstract class TakePhoto{
    constructor(
        public cameraMode:string,
        public burst:number
    ){}

    abstract getSepia():void

    getReelTime():number{
        return 123
    }
}


class Instagram extends TakePhoto{
    constructor(
        public cameraMode:string,
        public burst:number,
        public filter:string
    ){
        super(cameraMode,burst)
    }

    getSepia(): void {
        console.log("let go")
    }
}

const n=new Instagram("portrait",3,"sepia")
n.getSepia()
console.log(n.getReelTime())