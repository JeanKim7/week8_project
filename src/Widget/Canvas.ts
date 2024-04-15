import Component from "./Component"
import { State} from './types'

export default class Canvas {
    
    constructor(
        private parent:HTMLElement,
        private _components: Component[] = [],
        private _state: State = {}
    ){
        this.parent.innerHTML = '';
        this.parent.id = 'canvas';
        const newStyle: Partial<CSSStyleDeclaration> = {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(12, 1fr)',
            height: '100vh',
            columnGap: '5px',
            rowGap: '5px',
            aspectRatio: '1/1'
        }
        Object.assign(this.parent.style, newStyle)
    }

    public get components(): Component[] {
        return this._components;
    }
    
    public get state(): State {
        return this._state;
    }
    public set state(value: State) {
        this._state = value;
    }

    public addComponent(component: Component): void {
        this.components.push(component);

        component.canvas = this

        this.render()
    }

    private render():void{
        // this.parent.innerHTML = '';
        for (let component of this.components){
            let div = this.initializeComponentDiv(component)
            this.placeComponent(component, div);
            this.injectState(component, div)
        }
    }

    private initializeComponentDiv(component:Component): HTMLDivElement {
        let div = document.createElement('div');
        div.id=component.id
        const newStyle: Partial<CSSStyleDeclaration> = {
            margin: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '3%',
            aspectRatio: '1/1'
        }

        Object.assign(div.style, newStyle);
        Object.assign(div.style, component.shape.attributes);
        div.innerHTML = component.content
        return div
    }

    private placeComponent (component:Component, div:HTMLDivElement): void {
        const newStyle: Partial<CSSStyleDeclaration> = {
            gridColumnStart: component.locationLeft.toString(),
            gridColumnEnd: "span "+ component.width,
            gridRowStart: component.locationTop.toString(),
            gridRowEnd: "span " + component.height
        }
        Object.assign(div.style, newStyle);
        this.parent.append(div)
    }

    private injectState(component:Component, div:HTMLDivElement): void {
        div.innerHTML = component.content;
        let key: keyof State;
        for (key in this.state){
            if (div.innerHTML.includes(`{{ ${key} }}`)){
                div.innerHTML = div.innerHTML.split(`{{ ${key} }}`).join(this.state[key])
            }
        }
    }
}