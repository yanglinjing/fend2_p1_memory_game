 /* 把所有图片上的符号，放入一个数组，并进行洗牌  */
const symbols = ['fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o']

shuffle(symbols);//洗牌

 /* 让符号按随机顺序显示在卡片上 */
const picList = document.querySelectorAll('.card i');//选择16个i元素
for (let i = 0; i < picList.length; i++) {//为所有i元素设置class
  let symbol = 'fa ' + symbols[i];
  picList[i].setAttribute('class', symbol);
}

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

//事件代理event delegation：监视父元素ul，管理子元素li的事件
const deck = document.querySelector('.deck');
deck.addEventListener('click', respondClick);
function respondClick(evt){
    if (evt.target.nodeName === 'LI'){//nodeName要大写
        evt.target.setAttribute('class', 'card open show');
    }
}








 // 洗牌函数来自于 http://stackoverflow.com/a/2450976
 function shuffle(array) {
     let currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }
