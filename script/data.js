
//JSON对象
var cards = [
    {
        "title": "关于float的那些事儿",
        "URL": "http://www.w3school.com.cn/cssref/pr_class_float.asp",
        "学习进度": 100,
        "知识评价": 3,
        "学习笔记": "关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿关于float的那些事儿",
        "tags": ['Tag1', 'Tag2', 'Tag3']
    },
    {
        "title": "position知多少",
        "URL": "http://www.w3school.com.cn/cssref/pr_class_position.asp",
        "学习进度": 75,
        "知识评价": 4,
        "学习笔记": "position知多少position知多少position知多少position知多少position知多少position知多少position知多少position知多少position知多少",
        "tags": ['Tag1', 'Tag2']
    }
]

cards = JSON.stringify(cards); //将JSON对象转化成字符串
localStorage.setItem("cards", cards); //用localStorage保存转化好的字符串

