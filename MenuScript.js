let coffee = [
    "Cafe Mocha",89.00,"coffee",200,
    "Cappuccino",89.00,"coffee",100,
    "Caramel Macchiato",89.00,"coffee",200,
    "Espresso",59.00,"coffee",120,
    "Hot Americano",59.00,"coffee",200,
    "Spanish Latte",89.00,"coffee",200,
    "Vanilla Latte",89.00,"coffee",200,
     "Iced Americano",69.00,"coffee",200,
      "Cold Brew",79.00,"coffee",200
];
let nonCaffine = [
    "Chai Tea",79.00,"non caffine drink",60,
    "Chocolate Milk",49.00,"non caffine drink",60,
    "Ginger tea with lemon",50.00,"non caffine drink", 60,
    "Matcha",70.00,"non caffine drink", 60,
    "Iced Thai Tea",69.00,"non caffine drink",60
]

let pastries = [
    "Chocolate Chip Cookie",50,"pastries",30,
    "Croissant",75,"pastries",30,
    "Muffin",65,"pastries",30,
    "Ensaymada", 30, "pastries", 30,
    "Spanish Bread", 20, "pastries", 30
]

let balance = 10000
let productDetails = [];
let queue = [];
let amount = 0;
let productSelected = document.getElementById("Product_Selected");
let orderComplete = document.getElementById("Order_Complete");
productSelected.style.display = "none"
orderComplete.style.display = "none"
let table1 = document.getElementById("Coffees");
let table2 = document.getElementById("Non Caffine");
let table3 = document.getElementById("Pastries");
let body = document.body


let Interval = setInterval(() => {
    console.log("aa")
    document.getElementById("money").innerHTML = balance;
    amount = document.getElementById("amount").value
    document.getElementById("price_selected").innerHTML = (productDetails[1] * amount) + ".00" +"₱"
},1000)
document.getElementById("amount").innerHTML = 1
body.addEventListener("click", (event) => {
    
    if (event.target.tagName === "BUTTON") {
        let values = JSON.parse(event.target.value);
        let name = values[0]
        productDetails = values;
        productSelected.style.display = "block"
        let img = document.getElementById("img_selected")
        document.getElementById("price_selected").innerHTML = values[1] + ".00" +"₱"
        document.getElementById("product_selected").innerHTML = values[0]
        img.src = name +".jpg"
        console.log(name)
        img.onerror = function () {
            img.src = name + ".png"
            img.onerror() = function () {

            }
        }

        
        
       
    }
})

function back(){
    productSelected.style.display = "none"
    orderComplete.style.display = "none"
}

function buy(){
    
    amount = document.getElementById("amount").value * 1
    if (amount <= 0 || amount == null || amount == undefined || amount == " "){
        alert("Invalid input")
    } else if (balance > productDetails[1]*amount){
        balance -= productDetails[1]*amount
        productSelected.style.display = "none"
        orderComplete.style.display = "block"

        let id = Math.floor(Math.random()*(10000-1000)+1000);
        queue.push([id,Queue(id,amount,productDetails[0])])
        queue[(queue.length -1)]()
    } else {
        alert("You don't have enough balance")
    }
}   

function uploadPictures(table,array,fileDestination){
    let counter = 0;
    let arrLength = array.length;
    while (counter < arrLength){
        let tr = document.createElement("tr");
        for (i = 0; i < 5; i ++){
            let td = document.createElement("td")

            if (counter <= arrLength-4){
                let name = fileDestination + array[counter]
                
                let img = document.createElement("img");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let button = document.createElement("button");
                let productName = document.createTextNode(array[counter]);
                let price = document.createTextNode(array[counter+1] + ".00" + "₱");
                let text = document.createTextNode("BUY");
                button.value = JSON.stringify([array[counter],array[counter+1],array[counter+2],array[counter+3]])
                td.style.textAlign = "center"
                img.src = name + ".jpg";
                img.onerror = function() {
                    img.src = name + ".png";
                    img.onerror() = function () {

                    }
                }
                h3.appendChild(productName);
                p.appendChild(price);
                button.appendChild(text);
                td.appendChild(img);
                td.appendChild(h3);
                td.appendChild(p);
                td.appendChild(button);
            } else {
                let div = document.createElement("div")
                div.style.height = "300px"
                div.style.width = "300px"
                td.appendChild(div)

            }
            tr.appendChild(td);
            counter+=4;
        }
        table.appendChild(tr)
    }
}

function Queue(id,quantity,productName){
    let floatingWindow = document.getElementById("Balance");
    let duration = productDetails[3] * quantity
    let name = productDetails[0]
    let div = document.createElement("div");
    let img = document.createElement("img")
    let br = document.createElement("br")
    let text1 = document.createTextNode("Product: " + productDetails[0])
    let text2 = document.createTextNode("Quantity: " + quantity)
    let p = document.createElement("p")
    img.src = name + ".jpg";
    img.src = name + ".jpg";
    img.onerror = function (){
        img.src = name + ".png"
        img.onerror = function (){

        }
    }
    img.style.height = "100px"
    img.style.width = "auto"
    img.style.left = "100px"
    div.style.height = "auto"
    div.style.width = "100%"
    div.style.alignSelf = "center"
    div.style.border = "solid rgb(169, 117, 101)"
    
    div.appendChild(img)
    floatingWindow.append(div)
    div.appendChild(text1)
    div.appendChild(br)
    div.appendChild(text2)
    div.appendChild(br)
    div.appendChild(p)
    
    let time = setInterval(() => {
        p.innerHTML = "Preparing: " + duration +"s"
        duration --

        if(duration < 0){
            img.remove()
            div.remove()
            br.remove()
            text1.remove()
            p.remove()
            clearInterval(time)
            for(i = 0; i < queue.length-1; queue++){
                if (queue[i][0] == id ){
                    queue.splice(i,1)
                }
            }
            alert("Your order " + quantity + " " + productName+ " is complete \n our waiter will arrive and serve it to you. \n Thank you for ordering")
        }
        
    },1000)
}

uploadPictures(table1,coffee,"")
uploadPictures(table2,nonCaffine,"")
uploadPictures(table3,pastries,"")
