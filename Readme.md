## Knowledge managment system
实现一个知识管理系统，如下图所示为主页面：<br>
> ![Delete-mention](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Home-page.png)

第一阶段任务如下：<br>
- 实现如上所示的页面
- 当点击卡片右上角的删除按钮时，弹出如下图所示的删除框，并且背景是遮罩。
当点击取消时，返回主页面，当点击确定时，删除此卡片。<br>
    > ![Delete-mention](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Delete-mention.png)
- 当长按标签或者点击加号时，切换到如下所示的编辑页面。
Title为知识点的标题；
URL是对应于知识点的；
学习进度的范围是0%～100%，可以通过箭头点按调节学习进度的多少，单位为1%；
知识评价的取值范围是1～5颗星，可以通过箭头点按调节知识评价的星级；
Tag可以写多个，不同的Tag之间用分号隔开。
当点击确定时，刷新已有的卡片或者新增卡片，所填写的内容以主页面中所示的形式展现出来；
当点击取消时，返回主页面。
    > ![Edit](https://github.com/Leaf217/Knowledge-management-system/raw/master/Picture/Edit-v2.png)
- 点击知识点的Title时，弹出该知识点对应的参考URL。




## 目前存在问题
- 如何按照屏幕的分辨率进行自适应地改变rem所对应的px大小，未解决。
- div下包裹span标签，在span中设置font-size属性不奏效，但是在包裹它的div里设置就奏效了，这是为什么？
- 移动端页面的切换，暂时使用的是display:none和display:block，不知道是否存在其他更好的方法或者是已经很成熟的方法。

