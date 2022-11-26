function showModal(modalName) {
    document.querySelector(modalName).style.display = 'flex';
    setTimeout(() => {
        document.querySelector(modalName).style.opacity = '1';
        document.querySelector(modalName).style['pointer-events'] = 'all';
    }, 300);
}
function closeModal(modalName) {
    document.querySelector(modalName).style.opacity = '0';
    document.querySelector(modalName).style['pointer-events'] = 'none';
    setTimeout(() => {
        document.querySelector(modalName).style.display = 'flex';

    }, 300);
}
//showModal('.modal')
document.querySelector('.filter').addEventListener('click',(e)=>{
    e.preventDefault()
    showModal('.modal')
})
document.querySelector('.close').addEventListener('click',(e)=>{
    e.preventDefault()
    closeModal('.modal')
})