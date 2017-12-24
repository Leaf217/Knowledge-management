## Knowledge managment system
实现一个知识管理系统，如下图所示为主页面：<br>
   > ![Delete-mention](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Home-page.png)

### 第一阶段
#### 第一阶段任务如下：<br>
- 实现如上所示的主页面；
- 点击view more时，展开显示笔记详情，并显示hide，点击hide时收起笔记详情。
- 当点击卡片右上角的删除按钮时，弹出如下图所示的删除框，并且背景是遮罩。
当点击取消时，返回主页面，当点击确定时，删除此卡片。<br>
    > ![Delete-mention](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Delete-mention.png)
- 当点击点击加号时，切换到如下所示的编辑页面。
    Title为知识点的标题，当输入为空时，input后显示“请输入标题”的提醒，颜色#f00；
    URL是对应于知识点的url，当输入为空时，input框后显示“请输入URL”的提醒，颜色#f00；
    学习进度的范围是1%～100%，单位为1%，当输入为空或者不是1～100的整数时，input框后的（0%～100%）改为“请输入1～100的整数”，颜色#f00；
    知识评价的取值范围是1～5颗星，当输入为空或者不是1～5的整数时，input框后的（1～5）改为“请输入1～5的整数”，颜色#f00；
    Tag可以写多个，不同的Tag之间用英文输入法下的分号隔开。
    当点击确定时，若title、URL、学习进度以及知识评价都按照上述规则填入，那么新增卡片，所填写的内容以主页面中所示卡片的形式添加到主页面中，否则将不做任何处理；
    当点击取消时，返回主页面。
    > ![Edit](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Edit-v2.png)
- 当点击某个card时，进入编辑页面
- 以上所有关于card的数据都将存储到localStorage当中

#### 第一阶段目前存在的问题
- 如何按照屏幕的分辨率进行自适应地改变rem所对应的px大小，未解决。
- div下包裹span标签，在span中设置font-size属性不奏效，但是在包裹它的div里设置就奏效了，这是为什么？
- 移动端页面的切换，暂时使用的是display:none和display:block，不知道是否存在其他更好的方法或者是已经很成熟的方法。
- 在编辑页面，当输入有误和输入正确时，两个提醒进行切换，切换时input框上下浮动问题




### 第二阶段
#### 第二阶段任务如下：
- 标题栏：实现对标题以及标签的搜索功能，对搜索框中输入的内容进行实时监测，即每输入一个字，就对card搜索一次，主页面中只显示与输入对应的卡片；
- 主页面的card：当点击卡片上的标题时，进入对应的URL；
- 主页面的card：若笔记小于一定字数时，不再显示view more(hide)；
- 添加页面：对输入标签进行判断，如果标签为空或者全部都是空格，不生成标签
- 主页面：当没有card时，主页面显示"还没有标签哦！赶快去添加吧"，并且点击添加两字，跳转到添加页面



#### 第二阶段目前存在问题
- 在chrome浏览器当中，点击view more时，展开的笔记字体自动变大
- view more是否显示的问题，使用字的个数判断是否显示，不太准确






