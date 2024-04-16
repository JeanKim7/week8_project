// Code from another approach, can ignore


// import { v4 as uuidv4 } from "uuid"

// import { Item } from "./Objects"

// export class ShopLayout{
    
//     private _outerComponents: HTMLElement[] = []
//     private _cards: HTMLElement[] = []

//     public get outerComponents(): HTMLElement[] {
//         return this._outerComponents
//     }
//     public set outerComponents(value: HTMLElement[]) {
//         this._outerComponents = value
//     }

//     public get cards(): HTMLElement[] {
//         return this._cards
//     }
//     public set cards(value: HTMLElement[]) {
//         this._cards = value
//     }


//     public createOuterContainers():void{
//         let shop:HTMLElement  = document.getElementById("shop")!
//         const newStyle1: Partial<CSSStyleDeclaration> ={
//             width: "70vw",
//             padding: "0",
//             margin: "0",
//             height: "80vh"
//         }
//         Object.assign(shop.style, newStyle1)

//         let div = document.createElement('div')
//         const newStyle: Partial<CSSStyleDeclaration> = {
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//             width: "70vw",
//             backgroundColor: "#d3d3d3",
//             height: "40vh"
//         }
//         Object.assign(div.style, newStyle)
//         this.outerComponents.push(div)

//         let div2 = document.createElement('div')
//         const newStyle2: Partial<CSSStyleDeclaration> = {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "70vw",
//             backgroundColor: "#d3d3d3",
//             height: "40vh"
//         }
//         Object.assign(div2.style, newStyle)
//         this.outerComponents.push(div2)
//         shop.append(div)
//         shop.append(div2)
//     }

//     public createItemCard(item:Item):void{
//         let div= document.createElement('div')
//         div.innerHTML = `<div class="card"  style="width: 18rem;">
//         <div class="card-body">
//           <h5 class="card-title">${item.name}</h5>
//           <h6 class="card-subtitle mb-2 text-body-secondary">$${item.price}</h6>
//           <p class="card-text">${item.description}</p>
//           <a href="#" id=${item.id} class="btn btn-primary">Add to Cart</a>
//         </div>
//       </div>
//         `
//         this._cards.push(div)
//     }
    
// }

