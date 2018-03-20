myTime();

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
let matching = false; //防止在setTimeout运行过程中，用户再点击新的card
let matchedPairs = 0; //8对即成功
let starNum = 5;

//事件代理event delegation：监视父元素ul，管理子元素li的事件
document.querySelector('.deck').addEventListener('click', respondClick);//父元素ul

function respondClick(evt){
  if(!matching){
    let card = evt.target;//子元素li;
    if (card.nodeName === 'LI' && !card.classList.contains('match') && !card.classList.contains('open')){//nodeName要大写
        card.setAttribute('class', 'card open');//为li设置class
        let symbol = card.firstElementChild.className;//获取i的字符，即class
        addToOpen(symbol);
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
        matching = true;
        matchedPairs+=1;
        card.setAttribute('class', 'card match');//为li设置class
        card2.setAttribute('class', 'card match');
        setTimeout(function(){
          card.setAttribute('class', 'card match jump');//为li设置class
          card2.setAttribute('class', 'card match jump');
          matching = false;
        }, 600)
    }
    if(open[0]!=open[1]){//不匹配
        matching = true;
        card.setAttribute('class', 'card wrong');//为li设置class
        card2.setAttribute('class', 'card wrong');
        setTimeout(function(){
            card.setAttribute('class', 'card wrong shake');//为li设置class
            card2.setAttribute('class', 'card wrong shake');
        }, 600)
        setTimeout(function(){
            card.setAttribute('class', 'card');//为li设置class
            card2.setAttribute('class', 'card');
            matching = false;
        }, 2000);
    }
    open = [];
    count();
    myStar();

    if(matchedPairs===1) {
        congrt();
    }
}

//增加移动计数器并将其显示在页面上
function count(){
    moves+=1;
    document.querySelector('.moves').textContent = moves;
}

function myStar(){
    const stars = document.querySelector('.stars')
    const star = document.querySelector('li')
    if(moves===12 || moves===16 || moves===18 || moves===20){
        stars.removeChild(star);
        starNum -=1;
    }
}

function congrt(){
    document.getElementById('congratulations').setAttribute('class', 'showWindow');
    document.querySelector('#congratulations .moves').textContent = moves;
    document.querySelector('#congratulations .stars').textContent = starNum;
    runFirework();
}


//几个buttons的功能
document.getElementById('play').addEventListener('click', reload);
document.querySelector('.fa-repeat').addEventListener('click', reload);

function reload(){
    window.location.reload();
}

document.getElementById('close').addEventListener('click', function(){
    document.getElementById('congratulations').setAttribute('class', 'hideWindow');
});



/*
 *烟花特效
 *来自:http://blog.csdn.net/wcslb/article/details/53142221
 */


//封装一个颜色随机的效果
function randomColor(){
    var color = "rgb("
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    color = color+r+","+g+","+b+")";
    return color;
}
//创建一个制造烟花的构造函数，第一个参数为元素，第二参数为初始x轴位置，第三参数为y轴位置。
function Fireworks(Div,x,y){
    Div.style.backgroundColor=randomColor();   //给烟花添加背景色
    Div.className="firworks";                   //添加一个class
    document.body.appendChild(Div);
    Div.style.left=x+"px";                      //把鼠标点击坐标给div
    Div.style.top=y+"px";
    var speedX = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*16 + 1);  //三目运算符随机移动方向，概率50%,为1时往正方向移动，负1时往反方向移动第二个随机数随机速度快慢
    var speedY = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*20 + 1);
    this.move=function(){
        var i = 3;
        var time1=setInterval(function(){
            i++;
            Div.style.left=Div.offsetLeft+speedX+"px";
            Div.style.top=Div.offsetTop+speedY+i+"px";   //当i+speedY>0时,烟花朝下运动。
            if(Div.offsetLeft+Div.offsetWidth>window.innerWidth|| Div.offsetLeft<2 || Div.offsetTop+Div.offsetHeight>window.innerHeight || Div.offsetTop<2 ){
                Div.remove();       //移动出可视区域记得删除div和清除定时器
                clearInterval(time1);
            }
        },30);
    }
}

function runFirework(){
    let x=300, y=300;
    for(let i=0;i<80;i++){       //随机烟花的数量
        const div=document.createElement("div");
        let b=new Fireworks(div, x, y);
        b.move();
        locaion(x, y);
    }
}

//生成网页随机坐标：来源http://blog.csdn.net/dyushuo6230/article/details/7285313
function locaion(x, y){

    //右下边求出图片起始点最大X和Y的坐标值
    const w=window.screen.availWidth
    const h=window.screen.availHeight;

    //随机产生坐标x和坐标Y的值（都是从零到起始点最大X和Y的坐标值）
    x=Math.round(Math.random()*(w));
    y=Math.round(Math.random()*(h));
    return x, y;
}


/*
 *计时器
 *来自:https://zhidao.baidu.com/question/2077864432758305548.html
 */
document.querySelector('body').addEventListener('onload', myTime);
function myTime() {
   var sec=0;
   setInterval(function () {
       sec++;
       var date = new Date(0, 0)
       date.setSeconds(sec);
       var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
       document.getElementById("mytime").innerText = two_char(h) + ":" + two_char(m) + ":" + two_char(s);
   }, 1000);
}
//补零
function two_char(n) {
   return n >= 10 ? n : "0" + n;
}
