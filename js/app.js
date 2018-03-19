 /* 把所有图片上的符号，放入一个数组，并进行洗牌  */
const symbols = ['fa-anchor', 'fa-paint-brush', 'fa-fax', 'fa-bomb', 'fa-paw', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o', 'fa-anchor', 'fa-paint-brush', 'fa-fax', 'fa-bomb', 'fa-paw', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o', ]

shuffle(symbols);//洗牌

 /* 让符号按随机顺序显示在卡片上 */
const picList = document.querySelectorAll('.card i');//选择16个i元素,nodeList
for (let i = 0; i < picList.length; i++) {//为所有i元素设置class
  let symbol = 'fa ' + symbols[i];
  picList[i].setAttribute('class', symbol);
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

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

let open = [];
let moves = 0;
let card2;
let matching = 0; //防止在setTimeout运行过程中，用户再点击新的card
let matchedPairs = 0; //8对即成功

//事件代理event delegation：监视父元素ul，管理子元素li的事件
document.querySelector('.deck').addEventListener('click', respondClick);//父元素ul
youWin();

function respondClick(evt){
  if(matching===0){
    let card = evt.target;//子元素li;
    if (card.nodeName === 'LI' && !card.classList.contains('match') && !card.classList.contains('open')){//nodeName要大写
        card.setAttribute('class', 'card open');//为li设置class
        let symbol = card.firstElementChild.className;//获取i的字符，即class
        setTimeout(addToOpen(symbol), 600);
        openLength(card);
    }
  }
}

//将卡片添加到 “open”  *数组* 中
function addToOpen(symbol){
    if(open.length<2){
        open.push(symbol);
    }
}

function openLength(card){
    if(open.length===1){
        card2 = card;//把第一个evt target保存在函数之外，以便和第二个做比较
    }else if(open.length===2){
        compare(card);
    }
}

//如果数组中已有另一张卡，则检查两张卡片是否匹配
function compare(card){
    if(open[0]===open[1]){//匹配
        matchedPairs+=1;
        card.setAttribute('class', 'card match');//为li设置class
        card2.setAttribute('class', 'card match');
        setTimeout(function(){
          card.setAttribute('class', 'card match jump');//为li设置class
          card2.setAttribute('class', 'card match jump');
        }, 600)
    }
    if(open[0]!=open[1]){//不匹配
        matching = 1;
        card.setAttribute('class', 'card wrong');//为li设置class
        card2.setAttribute('class', 'card wrong');
        setTimeout(function(){
            card.setAttribute('class', 'card wrong shake');//为li设置class
            card2.setAttribute('class', 'card wrong shake');
        }, 600)
        setTimeout(function(){
            card.setAttribute('class', 'card');//为li设置class
            card2.setAttribute('class', 'card');
            matching = 0;
        }, 2000);
    }
    open = [];
    count();
}

//增加移动计数器并将其显示在页面上
function count(){
    moves+=1;
    document.querySelector('.moves').textContent = moves;
}


function youWin(){
    if(matchedPairs===8){
        congratulations();
    }
}

function congratulations(){

}
