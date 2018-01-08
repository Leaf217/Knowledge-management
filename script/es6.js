window.onload = function () {
    let cardHtml = document.getElementById('cards');
    home(cardHtml);

}

function home(cardHtml) {
    cardHtml.innerHTML = '';
    let cardData = JSON.parse(localStorage.getItem(cards));
}




// 例子  瞎写的
let a = creatPerson('1','2');
console.log(a);
function creatPerson(name,age) {
    return {
        name,
        age
    }
}


let person = {
    name : "me",
    sayName() {
        console.log(this.name);
    }
}
person.sayName();