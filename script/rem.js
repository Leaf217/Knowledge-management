/**
 * Created by zhu_yeqing on 2017/11/23.
 * 用于动态获取dpr--->rem所对应的px值
 */
window.onload = function () {
    var dpr_0, rem_0, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    dpr_0 = window.devicePixelRatio || 1;
//动态计算rem
    rem_0 = docEl.clientWidth * dpr_0 / 10;
    scale = 1 / dpr_0;


// 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr_0 * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr_0);

// 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem_0 + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem_0;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem_0;
    };

    window.dpr = dpr_0;
    window.rem = rem_0;
    // console.log(docEl.clientWidth)
}
