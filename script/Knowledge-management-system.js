/**
 * Created by zhu_yeqing on 2017/11/26.
 */

window.onload = function () {
    var cardsHtml = document.getElementById('cards');
    var cover = document.getElementById('cover');
    var add = document.getElementById('add');
    var edit = document.getElementById('edit');
    var factor; //指示input中填写的信息是否正确
    var searchBox = document.getElementById('search-box');





    render(cardsHtml, cover, add, edit, factor, searchBox);









/**
 * 渲染主页面 + 注册事件们
 */
function render() {

    //添加DOM；添加到HTML中
    addHome();


    //注册事件

    //1.添加card事件
    eventUntil.addHandler(add, 'click', function () {
        editCard(0);
        var addConfirm = document.getElementById('edit-conf');
        eventUntil.addHandler(addConfirm, 'click', addConf);
    });

    //2.删除事件，view more事件，hide事件，编辑事件
    var cardClick = document.getElementsByClassName('card');
    for (var i = 0;i < cardClick.length;i++) {
        eventUntil.addHandler(cardClick[i], 'click', function (e) {
            var e = eventUntil.getElement(e);

            //1)点击垃圾桶--删除事件
            if (e.className === "trash") {
                var str = '';
                var cardId = e.parentNode.id;
                var cardIndex = cardId.split('-')[1]; //点击的删除键对应数据的index值
                str += '<p>是否删除此卡片？</p>' +
                    '<p><input type="button" value="确定"><input type="button" value="取消"></p>'; //点击删除后弹出的div里的内容

                popup(str, 1, 'delete-confirm', 'delDiv');
                eventUntil.addScroll(preventScroll);

                var delDiv = document.getElementById('delDiv');
                eventUntil.addHandler(delDiv, 'click', delConfirm);

                //删除card确认
                function delConfirm(e) {
                    var e = eventUntil.getEvent(e);
                    if (eventUntil.getElement(e).value === "确定") {
                        var card_del = document.getElementById(cardId); //获取要删除的card
                        card_del.parentNode.removeChild(card_del); //删除
                        var cards = localStorage.getItem("cards");
                        cards = JSON.parse(cards);
                        cards.splice(cardIndex, 1); //删除数据

                        cards = JSON.stringify(cards); //将JSON对象转化成字符串
                        localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串

                        cover.style.display = 'none';
                        delDiv.parentNode.removeChild(delDiv); //删除弹出的确认框

                    } else if (eventUntil.getElement(e).value === "取消") {
                        cancel(delDiv);
                    }
                    eventUntil.removeScroll(preventScroll);
                }
            }


            //2)点击view more---笔记展开
            else if (e.className === "view-more") {
                var notesCon = e.parentNode.childNodes[0]; //学习笔记内容的p标签
                notesCon.style.width = '5rem'; //设置宽一点，看起来正常一些
                notesCon.style.whiteSpace = 'normal';
                notesCon.innerHTML += ' <a href="#" class="hide">hide</a>';
                e.innerHTML = '';

            }


            //3)点击hide---隐藏笔记
            else if (e.className === "hide") {
                var notesCon = e.parentNode; //学习笔记内容的p标签，与view more中的获取语句不同，但是获取的都是p
                notesCon.style.width = '3.5rem'; //复原
                notesCon.style.whiteSpace = 'nowrap';
                notesCon.removeChild(notesCon.childNodes[1]); //noteCon.childNodes[1]: 学习笔记内容p标签内的hide（a标签）
                notesCon.parentNode.childNodes[2].innerText = 'view more';
            }


            //4)点击tags没反应
            else if (e.className === "tag") {
                return;
            }

            //5)点击title，不进入编辑状态
            else if (e.className === "tit-url") {
                return;
            }


            //6)点击card的其他地方都进入编辑页面---编辑card
            else {
                editCard(1);

                var editConfirm = document.getElementById('edit-conf');
                eventUntil.addHandler(editConfirm, 'click', editConf);

                //从localStorage中读出数据写入edit页面中
                var cardId = this.id;

                cardId = cardId.split('-')[1];

                var cards = localStorage.getItem("cards");
                cards = JSON.parse(cards);

                document.getElementById('edit-tit').value = cards[cardId].title;
                document.getElementById('edit-url').value = cards[cardId].URL;
                document.getElementById('edit-pro').value = cards[cardId].progress;
                document.getElementById('edit-eva').value = cards[cardId].evaluation;
                document.getElementById('edit-not').value = cards[cardId].notes;
                document.getElementById('edit-tag').value = cards[cardId].tags;
                document.getElementById('edit-tag').value = document.getElementById('edit-tag').value.replace(/,/g,';'); //将逗号替换成分号

                function editConf(e) {
                    var e = eventUntil.getEvent(e);
                    if (eventUntil.getElement(e).value === "确定" && factor === 1) {
                        //取得用户修改/未修改的内容
                        cards[cardId].title = document.getElementById('edit-tit').value;
                        cards[cardId].URL = document.getElementById('edit-url').value;
                        cards[cardId].progress = document.getElementById('edit-pro').value;
                        cards[cardId].evaluation = document.getElementById('edit-eva').value;
                        cards[cardId].notes = document.getElementById('edit-not').value;
                        cards[cardId].tags = document.getElementById('edit-tag').value.split(';');//通过分号分割

                        //用完存起来
                        cards = JSON.stringify(cards); //将JSON对象转化成字符串
                        localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串

                        render();

                        cardsHtml.style.display = 'block';
                        add.style.display = 'flex';
                        edit.innerHTML = '';
                    }
                    else if (eventUntil.getElement(e).value === "取消") {
                        cardsHtml.style.display = 'block';
                        add.style.display = 'flex';
                        edit.innerHTML = '';
                    }

                }
            }
        });
    }


    //3.对title的搜索功能
    eventUntil.addHandler(searchBox, 'input', searchTitInput);
    eventUntil.addHandler(searchBox, 'propertychange', searchTitProperty);

}




/** 生成主页面
 *
 */
function addHome() {
    cardsHtml.innerHTML = '';
    //从localStorage中读取数据
    var cards = localStorage.getItem("cards");
    cards = JSON.parse(cards);

    if (cards.length > 0) {
        for (var i = 0;i < cards.length;i++) {
            var card = cards[i];

            var str ='';
            str += '<div class="card">'
                +   '<p class="title">' + '<a href="" class="tit-url">' + card.title + '</a>' + '</p>'
                +   '<table class="content">'
                +       '<tr class="progress">'
                +           '<td class="name">学习进度：</td>'
                +           '<td class="value">'
                +               '<div class="progress-bar"></div>'
                +               '<span>' + card.progress + '%</span>'
                +           '</td>'
                +       '</tr>'
                +       '<tr class="evaluation">'
                +           '<td class="name">知识评价：</td>'
                +           '<td class="value stars"></td>'
                +       '</tr>'
                +       '<tr class="notes">'
                +           '<td class="name">学习笔记：</td>'
                +           '<td class="value">'
                +               '<p class="notes-con"></p>'
                +               ' <a href="#" class="view-more"></a>'
                +           '</td>'
                +       '</tr>'
                +   '</table>'
                +   '<div class="tags"></div>'
                +   '<img src="Picture/Material/Trash.png" alt="trash" class="trash">'
                + '</div>';
            cardsHtml.innerHTML += str;

            //从json中读取出来的数据写入上边定义的html结构中
            var title = document.getElementsByClassName('title');
            title[i].childNodes[0].href = card.URL;


            var progressBar = document.getElementsByClassName('progress-bar');
            progressBar[i].style.width = card.progress / 100  + 'rem';

            var stars = document.getElementsByClassName('stars');
            for (var j = 0;j < card.evaluation;j++) {
                stars[i].innerHTML += '<img src="Picture/Material/Star-1.png" alt="star" class="eva-img">';
            }

            var notesCon = document.getElementsByClassName('notes-con');
            notesCon[i].innerHTML = card.notes;



            //如果文字没有超过一行，那么就不现实view more
            if (notesCon[i].innerHTML.length >= 18) {
                document.getElementsByClassName('view-more')[i].innerText = 'view more';
                notesCon[i].style.width = '3.5rem';
                notesCon[i].style.textOverflow = 'ellipsis';
                notesCon[i].style.overflow = 'hidden';
            }
            else {
                document.getElementsByClassName('view-more')[0].innerText = '';
                notesCon[i].style.width = 'auto';
                notesCon[i].style.textOverflow = 'clip';
                notesCon[i].style.overflow = 'visible';
            }

            var tags = document.getElementsByClassName('tags');
            for (var k = 0;k < card.tags.length;k++) {
                if (!(card.tags[k].length == 0 || card.tags[k].replace(/(^s*)|(s*$)/g, "").length ==0 || isNull(card.tags[k]))) {
                    tags[i].innerHTML += '<span class="tag">' + card.tags[k] + '</span>';
                }

            }
            document.getElementsByClassName('card')[i].id = 'card-' + i; //为每个card添加id
        }

    }
    //用完立马存起来
    cards = JSON.stringify(cards); //将JSON对象转化成字符串
    localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串
}





/**
 * 点击加号或者编辑card事件：显示card的edit页面
 * @param factorInit factor的初始值，add和edit初识对话框的内容状态不同
 */
function editCard(factorInit) {

    // if (operation == editOperation) {
    //     factor = 1;
    // }
    // else if (operation == addOperation) {
    //     factor = 0;
    // }
    factor =factorInit;
    var str = '';
    str += '<form action="">'
        +  '<table>'
        +  '<tr><td>Title: </td> <td><input type="text" id="edit-tit"><span></span></td></tr>'
        +  '<tr><td>URL: </td><td><input type="text" id="edit-url"><span></span></td></tr>'
        +  '<tr><td>学习进度: </td><td><input type="text" id="edit-pro">%<span> (1%~100%)</span></td></tr>'
        +  '<tr><td>知识评价: </td><td><input type="text" id="edit-eva">颗星<span> (1~5)</span></td></tr>'
        +  '<tr><td class="notes">学习笔记: </td><td><textarea name="" id="edit-not" cols="30" rows="10"></textarea></td></tr>'
        +  '<tr><td>Tags: </td><td><input type="text" id="edit-tag"> (用分号分隔)</td></tr>'
        +  '</table>'
        +  '<p id="edit-conf"><input type="button" value="确定"><input type="button" value="取消"></p>'
        +  '</form>';

    cardsHtml.style.display = 'none';
    add.style.display = 'none';
    edit.innerHTML = str;

    var editTit = document.getElementById('edit-tit');
    var editURL = document.getElementById('edit-url');
    var editPro = document.getElementById('edit-pro');
    var editEva = document.getElementById('edit-eva');

    eventUntil.addHandler(editTit, 'input', OnInput);
    eventUntil.addHandler(editTit, 'propertychange', OnPropChanged);

    eventUntil.addHandler(editURL, 'input', OnInput);
    eventUntil.addHandler(editURL, 'propertychange', OnPropChanged);


    eventUntil.addHandler(editPro, 'input', OnInput);
    eventUntil.addHandler(editPro, 'propertychange', OnPropChanged);

    eventUntil.addHandler(editEva, 'input', OnInput);
    eventUntil.addHandler(editEva, 'propertychange', OnPropChanged);



    // Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
    function OnInput(event) {
        if (this.id === "edit-tit") {
            if (editTit.value === '') {
                editTit.parentNode.childNodes[1].innerText = '请输入标题';
                editTit.parentNode.childNodes[1].style.color = '#f00';
                factor = 0;
            }
            else {
                editTit.parentNode.childNodes[1].innerText = '';
                editTit.parentNode.childNodes[1].style.color = '#000';
                factor = 1;
            }
        }

        if (this.id === "edit-url") {
            if (editURL.value === '') {
                editURL.parentNode.childNodes[1].innerText = '请输入URL';
                editURL.parentNode.childNodes[1].style.color = '#f00';
                factor = 0;
            }
            else {
                editTit.parentNode.childNodes[1].innerText = '';
                editTit.parentNode.childNodes[1].style.color = '#000';
                factor = 1;
            }
        }

        if (this.id === "edit-pro") {
            if (parseInt(editPro.value) <= 100 && parseInt(editPro.value) >0 && parseInt(editPro.value) == editPro.value) {//用==：parseInt之后是number类型，而editPro是string类型
                editPro.parentNode.childNodes[2].innerText = ' (1%~100%)';
                editPro.parentNode.childNodes[2].style.color = '#000';
                factor = 1;
            }
            else {
                editPro.parentNode.childNodes[2].innerText = ' 请输入1～100的整数';
                editPro.parentNode.childNodes[2].style.color = '#f00';
                factor = 0;
            }
        }

        if (this.id === "edit-eva") {
            if (parseInt(editEva.value) <= 5 && parseInt(editEva.value) >0 && parseInt(editEva.value) == editEva.value) {
                editEva.parentNode.childNodes[2].innerText = ' (1~5)';
                editEva.parentNode.childNodes[2].style.color = '#000';
                factor = 1;
            }
            else {
                editEva.parentNode.childNodes[2].innerText = ' 请输入1～5的整数';
                editEva.parentNode.childNodes[2].style.color = '#f00';
                factor = 0;
            }
        }
    }
    // Internet Explorer
    function OnPropChanged(event) {
        if (event.propertyName.toLowerCase () == "value") {
            if (this.id === "edit-tit") {
                if (editTit.value === '') {
                    editTit.parentNode.childNodes[1].innerText = '请输入标题';
                    editTit.parentNode.childNodes[1].style.color = '#f00';
                    factor = 0;
                }
                else {
                    editTit.parentNode.childNodes[1].innerText = '';
                    editTit.parentNode.childNodes[1].style.color = '#000';
                    factor = 1;
                }
            }

            if (this.id === "edit-url") {
                if (editURL.value === '') {
                    editURL.parentNode.childNodes[1].innerText = '请输入URL';
                    editURL.parentNode.childNodes[1].style.color = '#f00';
                    factor = 0;
                }
                else {
                    editTit.parentNode.childNodes[1].innerText = '';
                    editTit.parentNode.childNodes[1].style.color = '#000';
                    factor = 1;
                }
            }

            if (this.id === "edit-pro") {
                if (parseInt(editPro.value) <= 100 && parseInt(editPro.value) >0 && parseInt(editPro.value) == editPro.value) {//用==：parseInt之后是number类型，而editPro是string类型
                    editPro.parentNode.childNodes[2].innerText = ' (1%~100%)';
                    editPro.parentNode.childNodes[2].style.color = '#000';
                    factor = 1;
                }
                else {
                    editPro.parentNode.childNodes[2].innerText = ' 请输入1～100的整数';
                    editPro.parentNode.childNodes[2].style.color = '#f00';
                    factor = 0;
                }
            }

            if (this.id === "edit-eva") {
                if (parseInt(editEva.value) <= 5 && parseInt(editEva.value) >0 && parseInt(editEva.value) == editEva.value) {
                    editEva.parentNode.childNodes[2].innerText = ' (1~5)';
                    editEva.parentNode.childNodes[2].style.color = '#000';
                    factor = 1;
                }
                else {
                    editEva.parentNode.childNodes[2].innerText = ' 请输入1～5的整数';
                    editEva.parentNode.childNodes[2].style.color = '#f00';
                    factor = 0;
                }
            }

        }
    }


}





/**
 * edit页面的 确定 或 取消按钮 触发的事件
 * @param e
 */
function addConf(e) {
    var e = eventUntil.getEvent(e);

    if (eventUntil.getElement(e).value === "确定" && factor === 1) {
        var newCard = {};

        var editPro = document.getElementById('edit-pro').value;


        if (parseInt(editPro) <= 100 && parseInt(editPro) >=0 && parseInt(editPro) == editPro) {//用==：parseInt之后是number类型，而editPro是string类型
            newCard.progress = editPro;
        }
        else {
            alert('请输入1到100的整数');
        }

        var editEva = document.getElementById('edit-eva').value;
        if (parseInt(editEva) <= 5 && parseInt(editEva) >=0 && parseInt(editEva) == editEva) {
            newCard.evaluation = editEva;
        }
        else {
            alert('请输入1到5的整数');
        }



        //取得用户输入的内容
        newCard.title = document.getElementById('edit-tit').value;
        newCard.URL = document.getElementById('edit-url').value;


        newCard.notes = document.getElementById('edit-not').value;
        newCard.tags = document.getElementById('edit-tag').value.split(';');//通过分号分割

        cardsHtml.innerHTML = '';

        var cards = localStorage.getItem("cards");
        cards = JSON.parse(cards);

        cards.push(newCard);

        //用完立马存起来
        cards = JSON.stringify(cards); //将JSON对象转化成字符串
        localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串

        cardsHtml.style.display = 'block';
        add.style.display = 'flex';
        edit.innerHTML = '';

        render();
    }
    else if (eventUntil.getElement(e).value === "确定" && factor === 0) {
        //弹框：请输入正确的内容，先不写
    }
    else if (eventUntil.getElement(e).value === "取消") {
        cardsHtml.style.display = 'block';
        add.style.display = 'flex';
        edit.innerHTML = '';
    }
}




/**
 * 对title进行搜索
 * @param event
 */
function searchTitInput(event) {
    var cards = localStorage.getItem("cards");
    cards = JSON.parse(cards);
    //es5写法
    // if (cards.length > 0) {
    //     for (var i = 0; i < cards.length;i++) {
    //         if (cards[i].title.indexOf(this.value) === -1) {
    //             document.getElementById('card-' + cards[i].index).style.display = 'none';
    //         }
    //         else {
    //         document.getElementById('card-' + card.index).style.display = 'block';
    //         }
    //     }
    // }

    //for...in  --> index;for...of(es6)--->object
    for (var card of cards) {//card为cards中的每个对象
        if (card.title.indexOf(this.value) === -1) {
            document.getElementById('card-' + card.index).style.display = 'none';
        }
        else {
            document.getElementById('card-' + card.index).style.display = 'block';
        }
    }
    cards = JSON.stringify(cards); //将JSON对象转化成字符串
    localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串
}
function searchTitProperty(event) {
    var cards = localStorage.getItem("cards");
    cards = JSON.parse(cards);
    if (event.propertyName.toLowerCase() == "value") {
        for (var card of cards) {//card为cards中的每个对象
            if (card.title.indexOf(this.value) === -1) {
                document.getElementById('card-' + card.index).style.display = 'none';
            }
            else {
                document.getElementById('card-' + card.index).style.display = 'block';
            }
        }
    }
    cards = JSON.stringify(cards); //将JSON对象转化成字符串
    localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串
}





/**
 * 确认框的弹出
 * @param str 确认框的内容
 * @param delDiv_hei 删除框的高度
 * @param className 类名
 * @param id id名
 */
function popup(str, delDiv_hei, className,id) {
    cover.style.height = innerHeight + 'px';
    cover.style.width = innerWidth + 'px';
    cover.style.display = 'block';

    eventUntil.addScroll(preventScroll);

    var addDiv = document.createElement('div');
    addDiv.innerHTML = str;
    addDiv.className = className;
    addDiv.id = id;
    addDiv.style.top = innerHeight/200 - delDiv_hei/2 + 'rem'; //除200是转化为rem
    addDiv.style.left = 30 + '%' ; //删除框的宽度是40%

    document.body.appendChild(addDiv);
}






/**
 * 确认框点击取消后的动作
 * @param elem 编辑确认框 or 删除确认框
 */
function cancel(elem) {
    cover.style.display = 'none'; //隐藏遮罩
    elem.parentNode.removeChild(elem); //删除弹出框
}





/**
 * 禁止滚轮默认行为
 */
function preventScroll(e) {
    var e = eventUntil.getEvent(e);
    eventUntil.preventDefault(e);
}





/**
 * 判断输入字符串是否为空或者全部都是空格
 * @param str
 * @returns {boolean}
 */
function isNull( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}



}