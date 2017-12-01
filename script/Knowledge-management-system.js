/**
 * Created by zhu_yeqing on 2017/11/26.
 */

window.onload = function () {
    var cards = document.getElementById('cards');
    var cover = document.getElementById('cover');
    var add = document.getElementById('add');
    var edit = document.getElementById('edit');

    eventUntil.addHandler(cards, 'click', clickTrash);
    eventUntil.addHandler(add, 'click', addCard);


    /**
     * 点击加号事件：添加新的cards
     */
    function addCard() {

        cards.style.display = 'none';
        add.style.display = 'none';
        edit.style.display = 'block';

        var edit_conf = document.getElementById('edit-conf');
        eventUntil.addHandler(edit_conf, 'click', editConf);

        /**
         * 确定 or 取消触发的事件
         * @param e
         */
        function editConf(e) {
            var e = eventUntil.getEvent(e);
            if (eventUntil.getElement(e).value === "确定") {
                //取得用户输入的内容
                var edit_tit = document.getElementById('edit-tit').value;
                var edit_url = document.getElementById('edit-url').value;
                var edit_sch = document.getElementById('edit-sch').value;
                var edit_eva = document.getElementById('edit-eva').value;
                var edit_not = document.getElementById('edit-not').value;//取出一部分字:text-overflow+width

                var edit_tag = document.getElementById('edit-tag').value;//通过分号分割出来
                var newCard = {
                    "title": edit_tit,
                    "URL": edit_url,
                    "学习进度": edit_sch,
                    "知识评价": edit_eva,
                    "学习笔记": edit_not,
                    "tags": ['Tag1', 'Tag2', 'Tag3']
                }

            }
            else if (eventUntil.getElement(e).value === "取消") {
                cards.style.display = 'block';
                add.style.display = 'flex';
                edit.style.display = 'none';
            }
        }
    }



    /**
     * 点击delete事件：删除按钮
     * @param e
     */
    function clickTrash(e) {
        var e = eventUntil.getEvent(e);
        if (eventUntil.getElement(e).className === "trash") {
            var str = '';
            var cardId = eventUntil.getElement(e).parentNode.id;
            var cardIndex = cardId.split('-')[1]; //点击的删除键对应数据的index值
            str += '<p>是否删除此卡片？</p>' +
                 '<p><input type="button" value="确定"><input type="button" value="取消"></p>'; //点击删除后弹出的div里的内容

            popup(str, 1, 'delete-confirm', 'delDiv');
            eventUntil.addScroll(preventScroll);


            var delDiv = document.getElementById('delDiv');
            eventUntil.addHandler(delDiv, 'click', delConfirm);

            function delConfirm(e) {
                var e = eventUntil.getEvent(e);
                if (eventUntil.getElement(e).value === "确定") {
                    var card_del = document.getElementById(cardId); //获取要删除的card
                    card_del.parentNode.removeChild(card_del); //删除
                    var cards = localStorage.getItem("cards");
                    cards = JSON.parse(cards);
                    cards.splice(cardIndex, 1); //删除数据

                    cover.style.display = 'none';
                    delDiv.parentNode.removeChild(delDiv); //删除弹出的确认框

                } else if (eventUntil.getElement(e).value === "取消") {
                    cancel(delDiv);
                }
                eventUntil.removeScroll(preventScroll);
            }
        }
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


}
