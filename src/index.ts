import { v4 as uuidv4 } from "uuid";
import { Canvas, Component, HeaderBar } from "./Widget"

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
    //createShoppingPage()
}


class Item {

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
}

function createShoppingPage():void{
    
}

// class Shop {
    
//     constructor(private _item1: Item, private _item2: Item, private _item3: Item){}

//     private _cart: Item[]=[this._item1, this._item2, this._item3]

//     public get cart(): Item[] {
//         return this._cart;
//     }
//     public set cart(value: Item[]) {
//         this._cart = value;
//     }

// }

// function createUser (name:string, age: number):User{
//     let uuid:string = uuidv4()
//     return new User(uuid, name, age)
// }

// function createItem (name:string, price:number, description:string):Item{
//     let uuid:string = uuidv4()
//     return new Item(uuid, name, price, description)
// }


// //Driver Code


// let Jean:User = createUser("Jean", 99)
// console.log(Jean)

// let pants:Item = createItem("pants", 10.00, "clothing")
// console.log(pants)

// let car:Item = createItem("car", 1000, "vehicle")
// console.log(car)

// let TV:Item = createItem("TV", 500, "Entertainment")
// console.log(TV)

// let Target:Shop = new Shop(pants, car, TV)
// console.log(Target.cart)

// Jean.addToCart(pants)
// Jean.printCart

// for (let item of Target.cart) {
//     Jean.addToCart(item)
//     Jean.addToCart(item)
//     Jean.addToCart(item)
// }

// Jean.printCart()
// Jean.removeFromCart(pants)
// Jean.removeQuantityFromCart(TV, 1)
// Jean.printCart()
// console.log(Jean.cartTotal())