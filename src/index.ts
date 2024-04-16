import { v4 as uuidv4 } from "uuid";
import { ShopLayout } from "./additional/ShopLayout";
import {Item, User, Shop} from "./additional/Objects"



let loginForm: HTMLElement = document.getElementById('login-form')!
let loginCont:HTMLElement= document.getElementById('login-cont')!

loginForm?.addEventListener('submit', (e)=> {
    e.preventDefault(); 
    console.log("submitted");
    Shop.login()
    })   

// function login():void{
//     console.log("logging in")
//     let name: string | null =  (<HTMLInputElement>document.getElementById('name-input')).value.toString()
//     console.log(name)
//     let age: string | null  = (<HTMLInputElement>document.getElementById('age-input')).value.toString()
//     console.log(age)
//     if (name !== "" && age !="" && !isNaN(+age)){
//         const newStyle: Partial<CSSStyleDeclaration> ={
//             display: "none"
//         }
//         Object.assign(loginCont.style, newStyle)
//     }

//     let newUser: User = User.createNewUser(name, +age)
//     Shop.currentUser = newUser
//     console.log(Shop.currentUser)
//     createShoppingPage()
// }

// function createShoppingPage():void{
    
//     let TV:Item = new Item(uuidv4(), "TV", 500, "Entertainment")
//     let car:Item = new Item(uuidv4(), "car", 1000, "vehicle")
//     let pants:Item =  new Item(uuidv4(), "pants", 10.00, "clothing")
//     let notebook:Item = new Item(uuidv4(), "notebook", 2.00, "school supplies")
//     let robot:Item = new Item(uuidv4(), "robot", 10000.00, "electronics")
//     let soda:Item = new Item(uuidv4(), "soda", 0.25, "beverage")

    
//     let newShop: Shop = new Shop(TV, car, pants, notebook, robot, soda)
//     Shop.currentShop = newShop

    
//     const shopLayout = new ShopLayout()
//     shopLayout.createOuterContainers()
//     for (let item of Shop.currentShop.inventory){shopLayout.createItemCard(item)}
//     for (let item of shopLayout.cards.slice(0,3)){
//         shopLayout.outerComponents[0].append(item)
//     }
//     for (let item of shopLayout.cards.slice(3,7)){
//         shopLayout.outerComponents[1].append(item)
//     }
//     let cart:HTMLElement = document.getElementById('cart')!
//     cart.append(Shop.currentUser?.cartHTMLElement()!)


// }



