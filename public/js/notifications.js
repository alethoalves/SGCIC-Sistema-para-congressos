function closeNotify(className) {
    document.querySelector(className).style.opacity = '0';
    setTimeout(() => {
        document.querySelector(className).style.display = 'none';
    }, 1000)
    
}
//|| document.querySelector('.success')
if(document.querySelector('.error_float') ){
    setTimeout(() => {
        document.querySelector('.error_float').style.opacity = '0';
    }, 3000)
}
if(document.querySelector('.success_float') ){
    setTimeout(() => {
        document.querySelector('.success_float').style.opacity = '0';
    }, 3000)
}