import Container from "./Container";

class LeftLeaningContainer extends Container {
    constructor(){
        super()
        this.borderRadius = '10% 25%'
    }
}

class HeaderBar extends Container{
    constructor(){
        super()
        this.borderRadius = '0'
    }
}

export {
    LeftLeaningContainer,
    HeaderBar
}