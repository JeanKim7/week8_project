import { v4 as uuidv4 } from "uuid";
// import { Canvas, Component, HeaderBar } from "./Widget"
import { ShopLayout } from "./additional/ShopLayout";

let loginForm: HTMLElement | null = document.getElementById('login-form')
console.log(loginForm)
let loginCont:HTMLElement | null = document.getElementById('login-cont')

loginForm?.addEventListener('submit', (e)=> {
    e.preventDefault(); 
    console.log("submitted");
    login()
    })   

function login():void{
    console.log("logging in")
    let name: string | null =  (<HTMLInputElement>document.getElementById('name-input')).value.toString()
    console.log(name)
    let age: string | null  = (<HTMLInputElement>document.getElementById('age-input')).value.toString()
    console.log(age)
    if (name !== "" && age !="" && !isNaN(+age)){
        const newStyle: Partial<CSSStyleDeclaration> ={
            display: "none"
        }
        if (loginCont){Object.assign(loginCont.style, newStyle)}
    }

    let newUser: User = User.createNewUser(name, +age)
    User._currentUser = newUser
    console.log(User._currentUser)
    createShoppingPage()
}


export class Item {

    constructor(private _id: string, private _name: string, private _price: number, private _description: string){}

    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get price(): number {
        return this._price
    }
    public set price(value: number) {
        this._price = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }


}

class User {
    private _cart: Item[] = []
    static _currentUser: User | null = null;
    
    
    static createNewUser(name:string, age:number):User{
        let uuid:string = uuidv4()
        let NewUser:User = new User(uuid, name, age)
        return NewUser
    }

    constructor(private _id: string, private _name: string, private _age: number){}

    
    public get cart(): Item[] {
        return this._cart
    }
    public set cart(value: Item[]) {
        this._cart = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    protected get age(): number {
        return this._age
    }
    protected set age(value: number) {
        this._age = value
    }
    protected get name(): string {
        return this._name
    }
    protected set name(value: string) {
        this._name = value
    }

    public addToCart(item:Item):void {
        this.cart.push(item)
    }

    public removeFromCart (item: Item):void{
        let newCart:Item[] = []
        for (let itm of this.cart) {
            if (itm !== item){
                newCart.push(itm)
            }
        }
        this._cart = newCart
    }
    public removeQuantityFromCart(item:Item, amount: number):void{
        let newCart:Item[] = []
        let count:number = 0
        for (let itm of this._cart) {
            if (itm !== item){
                newCart.push(itm)
            } else {
                if (count >= amount) {
                    newCart.push(itm)
                } else {count+=1}
            }
        }
        this.cart = newCart
    }

    public cartTotal():number{
        let total:number = 0
        for (let item of this.cart){
            total += item.price
        }
        return total
    }

    public printCart():void{
        console.log(this.cart)
    }

    public cartHTMLElement():HTMLElement{
        let cart:HTMLElement = document.getElementById('cart')!
        const newStyle1: Partial<CSSStyleDeclaration> ={
            width: "30vw",
            padding: "0",
            margin: "0",
            height: "80vh",
            backgroundColor: "rgb(181, 181, 181)"
        }
        Object.assign(cart.style, newStyle1)
        return cart
    }
}

function createShoppingPage():void{
    
    let TV:Item = new Item(uuidv4(), "TV", 500, "Entertainment")
    let car:Item = new Item(uuidv4(), "car", 1000, "vehicle")
    let pants:Item =  new Item(uuidv4(), "pants", 10.00, "clothing")
    let notebook:Item = new Item(uuidv4(), "notebook", 2.00, "school supplies")
    let robot:Item = new Item(uuidv4(), "robot", 10000.00, "electronics")
    let soda:Item = new Item(uuidv4(), "soda", 0.25, "beverage")

    
    let newShop: Shop = new Shop(TV, car, pants, notebook, robot, soda)
    Shop.currentShop = newShop

    
    let shop:HTMLElement  = document.getElementById("shop")!
    const shopLayout = new ShopLayout()
    shopLayout.createOuterContainers()
    for (let item of Shop.currentShop.cart){shopLayout.createItemCard(item)}
    for (let item of shopLayout.cards.slice(0,3)){
        shopLayout.outerComponents[0].append(item)
    }
    for (let item of shopLayout.cards.slice(3,7)){
        shopLayout.outerComponents[1].append(item)
    }
    User._currentUser?.cartHTMLElement()
}


class Shop {
    private static _currentShop: Shop | null = null;
    
    constructor(private _item1: Item, private _item2: Item, private _item3: Item, private _item4: Item, private _item5: Item, private _item6: Item){}

    private _cart: Item[]=[this._item1, this._item2, this._item3, this._item4, this._item5, this._item6]

    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }

    public static get currentShop(): Shop | null {
        return Shop._currentShop;
    }
    public static set currentShop(value: Shop | null) {
        Shop._currentShop = value;
    }
}