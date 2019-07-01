

function resize (reChart){
    if(reChart){
        reChart = reChart()
    }
    let windowWidth = $('html').width();
    if(window.innerWidth == 0){
        window.onresize = function () {
            if(window.innerWidth<windowWidth){
                narrow();
                reChart;
            }
        };
    }else if(window.innerWidth<windowWidth){
        narrow();
        reChart;
    }else if(window.innerWidth>windowWidth){
        reChart;
    }

}


function narrow(){
    let width = $('html').width()*0.25;
    let height = $('html').height()*0.25;
    $('html').css({
        position: 'absolute',
        transform:'scale(0.5)',
        left:-width,
        top:-height
    });
}

function barChart(dom,data,width) {
    let html = '';
    for(let i =0;i<data.length;i++){
        html +=`<div class="barChart_item">
        <div class="barChart_item_name">${data[i].name}</div>
        <div class="barChart_item_bar">
            <div class="barChart_item_ac" style="background:${data[i].color};width:${data[i].per*width}px "></div>
            <div class="barChart_item_bg" style="width: ${width-data[i].per*width}px"></div>
        </div>
        <div class="barChart_item_num">${data[i].value}</div>
    </div>`
    }
    dom.html(html)
}


function info(dom,data) {
    let html = '';
    for(let i =0;i<data.length;i++) {
        html += `<div class="info_item">
                    <img class="info_left" width="75" height="80" src="">
                    <div class="info_right">
                        <div class="info_name">${data[i].name}</div>
                        <div class="info_value">${data[i].value}</div>
                    </div>
                </div>
        `
    }
    dom.html(html);
}


function block(dom,num,acnum,color){
    let html = '';
    for(let i=0;i<num;i++){
        html += `<div class="cont_block ${  i< acnum? color:''}" ></div>`
    }
    dom.html(html);
    let animation = setInterval(function () {
        if(acnum+2<num){
            acnum = acnum+1;
            block(dom,num,acnum,color)
        }else {
            clearInterval(animation)
        }
    },30000);
}