




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

function barChart(dom,data) {
    let html = '';
    let width = dom.find('.barChart_item_bar').width();
    for(let i =0;i<data.length;i++){
        html +=`<div class="barChart_item">
        <div class="barChart_item_name">${data[i].name}</div>
        <div class="barChart_item_bar">
            <div class="barChart_item_ac" style=""></div>
            <div class="barChart_item_bg" style=""></div>
        </div>
        <div class="barChart_item_num">${data[i].value}</div>
    </div>`
    }
}