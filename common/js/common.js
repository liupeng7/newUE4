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