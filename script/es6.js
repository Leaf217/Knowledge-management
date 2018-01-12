window.onload = function () {
    let cardHtml = document.getElementById('cards');
    home(cardHtml);

}

//主页面的渲染
function home(cardHtml) {
    cardHtml.innerHTML = ''; //initialization
    let cardData = JSON.parse(localStorage.getItem("cards"));

    for (let [index, value] of cardData.entries()) {
        cardHtml.innerHTML += '<div class="card">'
            +   '<p class="title">'
            +     '<a href="' + value.URL + '" class="tit-url">' + value.title + '</a>'
            +   '</p>'
            +   '<table class="content">'
            +       '<tr class="progress">'
            +           '<td class="name">学习进度：</td>'
            +           '<td class="value">'
            +               '<div class="progress-bar"></div>'
            +               '<span>' + value.progress + '%</span>'
            +           '</td>'
            +       '</tr>'
            +       '<tr class="evaluation">'
            +           '<td class="name">知识评价：</td>'
            +           '<td class="value stars"></td>'
            +       '</tr>'
            +       '<tr class="notes">'
            +           '<td class="name">学习笔记：</td>'
            +           '<td class="value">'
            +               '<p class="notes-con">' + value.notes + '</p>'
            +               ' <a href="#" class="view-more"></a>'
            +           '</td>'
            +       '</tr>'
            +   '</table>'
            +   '<div class="tags"></div>'
            +   '<img src="Picture/Material/Trash.png" alt="trash" class="trash">'
            + '</div>';

        //设置进度条
        let progressBar = document.getElementsByClassName('progress-bar');
        progressBar[index].style.width = value.progress / 100 + 'rem';

        //设置评价星星
        let stars = document.getElementsByClassName('stars');
        starsSet(value.evaluation, stars, index);

        //设置tag标签
        let tags = document.getElementsByClassName('tags');
        for (let tag of value.tags) {
            if (!(tag.length === 0 || tag.replace(/(^s*)|(s*$)/g, "").length === 0 || isNull(tag))) {
                tags[index].innerHTML += '<span class="tag">' + tag + '</span>';
            }
        }


    }

}


//评价星星的生成
function starsSet(num, stars, index) {
    for (let i = 0;i < num;i++) {
        stars[index].innerHTML += '<img src="Picture/Material/Star-1.png" alt="star" class="eva-img">';
    }
}


/**
 * 判断输入字符串是否为空或者全部都是空格
 * @param str
 * @returns {boolean}
 */
function isNull( str ){
    if ( str == "" ) return true;
    let regu = "^[ ]+$";
    let re = new RegExp(regu);
    return re.test(str);
}




//不应该用for of+迭代器



// 例子  瞎写的
// let a = createPerson('1','2');
// console.log(a);
// function createPerson(name,age) {
//     return {
//         name,
//         age
//     }
// }
//
//
// let person = {
//     name : "me",
//     sayName() {
//         console.log(this.name);
//     }
// }
// person.sayName();