window.onload = function () {
    // let cardHtml = document.getElementById('cards');
    // let edit = document.getElementById('edit');
    // let addButton = document.getElementById('add');

    render();

};





//--------Homepage----------//
//Render homepage
let renderHome = function () {
    let cardHtml = document.getElementById('cards');
    cardHtml.innerHTML = ''; //initialization
    let cardData = JSON.parse(localStorage.getItem("cards"));

    for (let [index, value] of cardData.entries()) {
        //produce every card
        let card = document.createElement('div'); //variable
        card.className = 'card';
        cardHtml.appendChild(card);

        //title
        addTitle(index, value);

        //content: progress + evaluation + notes
        addContent(index,value);

        //tags
        addTags(index, value);

        //deleteButton
        deleteButton(index);
    }
};
//问题：for of ，对data.js的循环还可以进一步处理？



//Add and set title of cards
let addTitle = function (index, value) {
    let card = document.getElementsByClassName('card');
    let title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = '<a href="' + value.URL + '">' + value.title + '</a>';
    card[index].appendChild(title);

    return title;
};


//Add content: progress + evaluation + notes
let addContent = function (index, value) {
    let content = document.createElement('table');
    content.className = 'content';
    let card = document.getElementsByClassName('card');
    card[index].appendChild(content);

    progressAdd(index, value);

    evaluationAdd(index, value);

    notesAdd(index, value);

    //if there is any content, add hereafter......

    return content;
};



//Add progress
let progressAdd = function (index, value) {
    let content = document.getElementsByClassName('content');
    let progress = document.createElement('tr');
    progress.className = 'progress';
    content[index].appendChild(progress);

    progress = document.getElementsByClassName('progress');
    progress[index].innerHTML = '<td class="name">学习进度：</td>'
                              + '<td class="value">'
                                  + '<div class="progress-bar"></div>'
                                  + '<span>' + value.progress + '%</span>'
                              +  '</td>';
    let progressBar = document.getElementsByClassName('progress-bar');
    progressBar[index].style.width = value.progress / 100 + 'rem';

    return progress;
};



//Add evaluation
let evaluationAdd = function (index, value) {
    let content = document.getElementsByClassName('content');
    let evaluation = document.createElement('tr');
    evaluation.className = 'evaluation';
    content[index].appendChild(evaluation);

    evaluation = document.getElementsByClassName('evaluation');
    evaluation[index].innerHTML = '<td class="name">知识评价：</td>'
                                + '<td class="value stars"></td>';
    for (let i = 0;i < value.evaluation;i++) {
        let stars = document.getElementsByClassName('stars');
        stars[index].innerHTML += '<img src="Picture/Material/Star-1.png" alt="star" class="eva-img">';
    }

    return evaluation;
};



//Add notes
let notesAdd = function (index, value) {
    let content = document.getElementsByClassName('content');
    let notes = document.createElement('tr');
    notes.className = 'notes';
    content[index].appendChild(notes);

    notes = document.getElementsByClassName('notes');
    notes[index].innerHTML = '<td class="name">学习笔记：</td>'
                           + '<td class="value">'
                           +     '<p class="notes-con">' + value.notes + '</p>'
                           +     '<a href="#" class="view-more">view more</a>'
                           + '</td>';

    return notes;
};


//Determine the string is empty or space
let isNull = function ( str ){
    if ( str == "" ) return true;
    let regular = "^[ ]+$";
    let re = new RegExp(regular);
    return re.test(str);
};


//Add tags
let addTags = function (index, value) {
    let card = document.getElementsByClassName('card');
    let tags = document.createElement('div');
    tags.className = 'tags';
    card[index].appendChild(tags);

    tags = document.getElementsByClassName('tags');
    for (let tag of value.tags) {
        if (!(tag.length === 0 || tag.replace(/(^s*)|(s*$)/g, "").length === 0 || isNull(tag))) {
            tags[index].innerHTML += '<span class="tag">' + tag + '</span>';
        }
    }

    return tags;
};


//Add delete button
let deleteButton = function (index) {
    let card = document.getElementsByClassName('card');
    let deleteButton = document.createElement('img');
    deleteButton.className = 'trash';
    deleteButton.src = 'Picture/Material/Trash.png';
    card[index].appendChild(deleteButton);
};
//问题：创建元素时有重复代码，如何解决这个问题。可能直接用jQ就行吧，先放着这个问题




//--------Create edit page------//

//Manage single case
let getSingle = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
};


//Create edit page(only )
let createEditPage = function () {
    let edit = document.getElementById('edit');
    let form = document.createElement('form');
    form.innerHTML = '<form action="">'
                   + '<table>'
                   + '<tr><td>Title:</td> <td><input type="text" id="edit-tit"><span></span></td></tr>'
                   + '<tr><td>URL:</td><td><input type="text" id="edit-url"><span></span></td></tr>'
                   + '<tr><td>学习进度:</td><td><input type="text" id="edit-pro" placeholder="1%~100%"><span></span></td></tr>'
                   + '<tr><td>知识评价:</td><td><input type="text" id="edit-eva" placeholder="1~5颗星"><span></span></td></tr>'
                   + '<tr><td class="notes">学习笔记:</td><td><textarea name="" id="edit-not" cols="30" rows="10" placeholder="最少输入20个字符"></textarea><span></span></td></tr>'
                   + '<tr><td>Tags:</td><td><input type="text" id="edit-tag" placeholder="用分号分隔"><span></span></td></tr>'
                   + '</table>'
                   + '<p id="edit-conf"><input type="button" value="确定"><input type="button" value="取消"></p>'
                   + '</form>';
    form.style.display = 'none';
    edit.appendChild(form);
    return form;
};
//问题：innerHTML是不是不该这么写？


//Monitor input status
let onInput = function (e) {
    let event = eventUntil.getEvent(e);
    let ele = eventUntil.getElement(event);
    checkInput(ele);
};


//Check input
let checkInput = function (ele) {
    let editItem = document.getElementById(ele.id);
    let promptInfo = ele.parentNode.parentNode.childNodes[0].innerText.split(':')[0];//find the corresponding Chinese name
    if (isNull(editItem.value)) {
        ele.parentNode.childNodes[1].innerText = '请输入' + promptInfo;
        ele.parentNode.childNodes[1].style.color = '#f00';
    }
    else {
        ele.parentNode.childNodes[1].innerText = '';
        ele.parentNode.childNodes[1].style.color = '#000';
    }
    if (ele.id === 'edit-pro' || ele.id === 'edit-eva') {
        //继续看设计模式再改吧
    }
};

//Bind monitor (Singleton mode)
let bindMonitor = getSingle(
    function () {
        let edit = document.getElementById('edit');
        eventUntil.addHandler(edit, 'input', onInput);
    }
);


//Bind add button (Singleton mode)
let bindAddButton = getSingle(function () {
    let cardHtml = document.getElementById('cards');
    let edit = document.getElementById('edit');
    let addButton = document.getElementById('add');

    eventUntil.addHandler(addButton, 'click', function() {
        //Create edit page (Singleton mode)
        // let createSingleEditPage = getSingle(createEditPage);
        // let editPage = createSingleEditPage();
        let editPage = getSingle(createEditPage)();
        addButton.style.display = 'none';
        cardHtml.style.display = 'none';
        editPage.style.display = 'block';
        edit.style.display = 'block';
    });
    return true;
});




//Render
let render = function () {
    renderHome();
    bindAddButton();
    bindMonitor();
};



//单例模式 (Singleton mode)
//对于一个对象频繁创建、添加和删除是要避免的：用一个变量来标志是否已经建立过这个对象，如果是，则在下次直接返回这个已经创建好的对象。将创建实例和管理单例两个职责分离开来。