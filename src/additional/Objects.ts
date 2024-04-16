import { v4 as uuidv4 } from "uuid";

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

    itemElement():HTMLElement{
        let div= document.createElement('div')
            div.innerHTML = `<div class="card"  style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${this.name}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">$${this.price}</h6>
              <p class="card-text">${this.description}</p>
              <a href="#" id=${this.id} class="btn btn-primary">Add to Cart</a>
            </div>
          </div>`
          return div
    }

}

export class User {
    private _cart: Item[] = []

    
    
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

    
    public cartHTMLElement():HTMLElement | null{
        let cart:HTMLElement = document.getElementById('cart')!
        const newStyle1: Partial<CSSStyleDeclaration> ={
            width: "30vw",
            padding: "0",
            margin: "0",
            height: "80vh",
            backgroundColor: "rgb(181, 181, 181)"
        }
        Object.assign(cart.style, newStyle1)
        
        cart.innerHTML=''
        if (Shop.currentUser!.cart.length === 0){
            cart.innerHTML = "<h3>Your cart is currently empty</h3>"
            return null
        } else {
        

        let checkoutTable:HTMLElement = document.createElement('table')
        checkoutTable.innerHTML = `<tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        </tr>`
        const myCartSet = new Set(this.cart)

        for (let item of myCartSet){
            
            let tableRow:HTMLElement = document.createElement('tr')
            let cell1: HTMLElement =document.createElement('td')
            cell1.innerHTML = item.name
            let cell2: HTMLElement =document.createElement('td')
            cell2.innerHTML = `$${item.price.toString()}`

            let itemCount:Item[] = this.cart.filter(x=>x.id==item.id)
            let cell3:HTMLElement = document.createElement('td')
            cell3.innerHTML = `${itemCount.length}`
            let cell4:HTMLElement = document.createElement('td')
            let removeAllButton:HTMLElement = document.createElement('button')
            removeAllButton.id = `${item.name}removeAll`
            removeAllButton.innerHTML = "X"
            cell4.append(removeAllButton)
            let cell5:HTMLElement = document.createElement('td')
            let removeOneButton:HTMLElement = document.createElement('button')
            removeOneButton.id = `${item.name}removeOne`
            removeOneButton.innerHTML = "-1"
            cell5.append(removeOneButton)
            
            tableRow.append(cell1, cell2, cell3, cell4, cell5)
            checkoutTable.append(tableRow)
            console.log(checkoutTable)
        }


        let checkoutTotal: HTMLElement = document.createElement('h4')
        checkoutTotal.innerHTML= `Total: $${Shop.currentUser?.cartTotal()}`

        cart.append(checkoutTable, checkoutTotal)
        for (let item of myCartSet){ Shop.currentUser?.addRemoveEventListeners(item)}

        return cart}
    }

    addRemoveEventListeners(item:Item):void{
        let removeAll:HTMLElement = document.getElementById(`${item.name}removeAll`)!
        removeAll.addEventListener('click', () =>{
            Shop.currentUser!.removeFromCart(item)
            Shop.currentUser!.cartHTMLElement()
        })
        let removeOne:HTMLElement = document.getElementById(`${item.name}removeOne`)!
        removeOne.addEventListener('click', ()=> {
            this.removeQuantityFromCart(item, 1)
            this.cartHTMLElement()
        })
        }
        
    
}

export class Shop {
    private static _currentShop: Shop | null = null;
    private static _currentUser: User | null = null;
    
    constructor(
        private _item1: Item = new Item(uuidv4(), "TV", 500, "Entertainment"), 
        private _item2: Item = new Item(uuidv4(), "car", 1000, "vehicle"), 
        private _item3: Item = new Item(uuidv4(), "pants", 10.00, "clothing"),
        private _item4: Item = new Item(uuidv4(), "notebook", 2.00, "school supplies"),
        private _item5: Item = new Item(uuidv4(), "robot", 10000.00, "electronics"), 
        private _item6: Item=new Item(uuidv4(), "soda", 0.25, "beverage")
    ){}

    private _inventory: Item[]=[this._item1, this._item2, this._item3, this._item4, this._item5, this._item6]

    public get inventory(): Item[] {
        return this._inventory;
    }
    public set inventory(value: Item[]) {
        this._inventory = value;
    }

    public static get currentShop(): Shop | null {
        return Shop._currentShop;
    }
    public static set currentShop(value: Shop | null) {
        Shop._currentShop = value;
    }

    public static get currentUser(): User | null {
        return Shop._currentUser;
    }
    public static set currentUser(value: User | null) {
        Shop._currentUser = value;
    }


    showItems():void{
        let shop:HTMLElement  = document.getElementById("shop")!
        const newStyle1: Partial<CSSStyleDeclaration> ={
            width: "70vw",
            padding: "0",
            margin: "0",
            height: "80vh"
        }
        Object.assign(shop.style, newStyle1)
        console.log(shop)


        let cardCont1 = document.createElement('div')
        const newStyle: Partial<CSSStyleDeclaration> = {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "70vw",
            backgroundColor: "#d3d3d3",
            height: "40vh"
        }
        Object.assign(cardCont1.style, newStyle)
        console.log(cardCont1)

        let cardCont2 = document.createElement('div')
        const newStyle2: Partial<CSSStyleDeclaration> = {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70vw",
            backgroundColor: "#d3d3d3",
            height: "40vh"
        }
        Object.assign(cardCont2.style, newStyle)
        
        shop.append(cardCont1, cardCont2)
        
        for (let item of this.inventory.slice(0,3)){
            cardCont1.append(item.itemElement())
        }
        for (let item of this.inventory.slice(3,6)){
            cardCont2.append(item.itemElement())
        }
        
        Shop.currentUser?.cartHTMLElement()
        
        for (let item of this.inventory){
            
            let addToCart:HTMLElement = document.getElementById(item.id)!
            addToCart.addEventListener('click', () =>{
            Shop.currentUser?.cart.push(item);
            console.log(Shop.currentUser!.cart)
            Shop.currentShop?.updateCart()
            })}
            


    }

    updateCart():void{
        if (Shop.currentUser!.cart){
        Shop.currentUser?.cartHTMLElement()
    }else{
        let div:HTMLElement= document.createElement('div')
        div.innerHTML = "The cart is empty"
        let cart:HTMLElement = document.getElementById('cart')!
        cart.innerHTML = ''
        cart.append(div)
    }
    }

    static login():void{
        let loginCont:HTMLElement= document.getElementById('login-cont')!
        console.log("logging in")
        let name: string | null =  (<HTMLInputElement>document.getElementById('name-input')).value.toString()
        console.log(name)
        let age: string | null  = (<HTMLInputElement>document.getElementById('age-input')).value.toString()
        console.log(age)
        if (name !== "" && age !="" && !isNaN(+age)){
            const newStyle: Partial<CSSStyleDeclaration> ={
                display: "none"
            }
            Object.assign(loginCont.style, newStyle)
            let newUser: User = User.createNewUser(name, +age)
            Shop.currentUser = newUser
            console.log(Shop.currentUser)
            let newShop: Shop = new Shop()
            Shop.currentShop = newShop
            Shop.currentShop.showItems()
        }

        
}
}
