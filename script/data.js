/**
 * 用于存放所有cards的信息
 */


localStorage.clear(); //清除
//JSON对象
var cards = [
    // {
    //     "index": 0,
    //     "title": "关于float的那些事儿",
    //     "URL": "http://www.w3school.com.cn/cssref/pr_class_float.asp",
    //     "progress": 100,
    //     "evaluation": 3,
    //     "notes": "关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿",
    //     "tags": ['Tag1', 'Tag2', 'Tag3']
    // },
    // {
    //     "index": 1,
    //     "title": "position知多少",
    //     "URL": "http://www.w3school.com.cn/cssref/pr_class_position.asp",
    //     "progress": 75,
    //     "evaluation": 4,
    //     "notes": "position知多少position知多少position知多少position知多少position知多少position知多少position知多少position知多少position知多少",
    //     "tags": ['Tag1', 'Tag2']
    // }
]

cards = JSON.stringify(cards); //将JSON对象转化成字符串
localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串
