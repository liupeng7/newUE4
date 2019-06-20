


function runAnimate(percent,dom){

    // if(percent == 0){
    //     percent = 0.1;
    // }

    var totalTime = 3;
    var $circleAnimate = dom.find('#circleAnimate');
    var per = percent/100;
    var durTime = totalTime * per;

    $circleAnimate[0].setAttribute('repeatDur', durTime + 's');
    $circleAnimate[0].beginElement();
}

function numRunFun(num,maxNum,dom,speed){
    var numText = num;
    var golb; // 为了清除requestAnimationFrame
    numSlideFun();

    function numSlideFun(){
        if(speed){
            numText += speed
        }else{
            numText+=0.4; // 速度的计算可以为小数
        }
        if(numText >= maxNum){
            numText = maxNum;
            cancelAnimationFrame(golb);
        }else {
            golb = requestAnimationFrame(numSlideFun);
        }
        dom.innerHTML = ~~(numText)

    }
}

function imgAnimate(dom,index,img1,img2){
    if(index<10){
        dom.attr('src',img1+index+'.png');
    }else {
        dom.attr('src',img2+index+'.png');
    }
}




