function selectIndexArea(params) {
    switch (params) {
        case "Artes e Humanidades":
            return 0
            break;
        case "Saúde e Vida":
            return 1
            break;
        case "Exatas e Tecnológicas":
            return 2
            break;
    }
}
function countCaracAndInserValue(countHere,inputValueHere) {
    document.querySelector(countHere).addEventListener('keyup', (evt) => {
    let qnt = document.querySelector(countHere).value.length
    document.querySelector(inputValueHere).innerHTML = qnt
})
}
//MODAL - USER
function userModal(element) {
    let id = element.currentTarget.getAttribute('data-id');
    let name = element.currentTarget.getAttribute('data-name');
    let cpf = element.currentTarget.getAttribute('data-cpf');
    let email = element.currentTarget.getAttribute('data-email');
    let isAdmin = element.currentTarget.getAttribute('data-isAdmin') == 'true' ? 0 : 1;
    let isReviewer = element.currentTarget.getAttribute('data-isReviewer') == 'true' ? 0 : 1;
    document.querySelector('input[name="_id"]').value = id;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="cpf"]').value = cpf;
    document.querySelector('input[name="email"]').value = email;
    document.querySelector('select[name="isAdmin"]').options.selectedIndex = isAdmin;
    document.querySelector('select[name="isReviewer"]').options.selectedIndex = isReviewer
    //document.querySelector('#btn-del').href = `/admin/users/del/${cpf}`;
}
//MODAL - EDITION

function editionModal(element) {
    let id = element.currentTarget.getAttribute('data-id');
    let title = element.currentTarget.getAttribute('data-title');
    let smallTitle = element.currentTarget.getAttribute('data-smallTitle');
    let year = element.currentTarget.getAttribute('data-year');
    let statusSubmit = element.currentTarget.getAttribute('data-statusSubmit') == 'true' ? 0 : 1;
    let date_artes = element.currentTarget.getAttribute('data-date_artes');
    let date_saude = element.currentTarget.getAttribute('data-date_saude');
    let date_exatas = element.currentTarget.getAttribute('data-date_exatas');
    let hour_pm = element.currentTarget.getAttribute('data-hour_pm');
    let hour_am = element.currentTarget.getAttribute('data-hour_am');
    let local_abertura = element.currentTarget.getAttribute('data-local_abertura');
    let local_apresentacao = element.currentTarget.getAttribute('data-local_apresentacao');
    let local_encerramento = element.currentTarget.getAttribute('data-local_encerramento');


    document.querySelector('input[name="_id"]').value = id;
    document.querySelector('input[name="title"]').value = title;
    document.querySelector('input[name="smallTitle"]').value = smallTitle;
    document.querySelector('input[name="year"]').value = year;
    document.querySelector('input[name="year"]').readOnly = true;
    document.querySelector('select[name="statusSubmit"]').options.selectedIndex = statusSubmit;
    document.querySelector('input[name="date_artes"]').value = date_artes;
    document.querySelector('input[name="date_saude"]').value = date_saude;
    document.querySelector('input[name="date_exatas"]').value = date_exatas;
    document.querySelector('input[name="hour_pm"]').value = hour_pm;
    document.querySelector('input[name="hour_am"]').value = hour_am;
    document.querySelector('input[name="local_abertura"]').value = local_abertura;
    document.querySelector('input[name="local_apresentacao"]').value = local_apresentacao;
    document.querySelector('input[name="local_encerramento"]').value = local_encerramento;

    //document.querySelector('#btn-del').href = `/admin/editions/del/${year}`;
}
function newEdition(element) {
    document.querySelector('input[name="_id"]').disabled = true;
    document.querySelector('input[name="title"]').value = null;
    document.querySelector('input[name="smallTitle"]').value = null;
    document.querySelector('input[name="year"]').value = null;
    document.querySelector('select[name="statusSubmit"]').options.selectedIndex = 0;
    document.querySelector('input[name="year"]').readOnly = false;
    document.querySelector('input[name="date_artes"]').value = null;
    document.querySelector('input[name="date_saude"]').value = null;
    document.querySelector('input[name="date_exatas"]').value = null;
    document.querySelector('input[name="hour_pm"]').value = null;
    document.querySelector('input[name="hour_am"]').value = null;
    document.querySelector('input[name="local_abertura"]').value = null;
    document.querySelector('input[name="local_apresentacao"]').value = null;
    document.querySelector('input[name="local_encerramento"]').value = null;

    //document.querySelector('#btn-del').style.display = 'none';
}
function articleReviewerModal(element) {
    let id = element.currentTarget.getAttribute('data-id');
    let resumo_titulo = element.currentTarget.getAttribute('data-resumo_titulo');
    let poster_numero = element.currentTarget.getAttribute('data-poster_numero');
    let poster_turno = element.currentTarget.getAttribute('data-poster_turno');
    let resumo_introducao = element.currentTarget.getAttribute('data-resumo_introducao');
    let resumo_metodologia = element.currentTarget.getAttribute('data-resumo_metodologia');
    let resumo_resultado = element.currentTarget.getAttribute('data-resumo_resultado');
    let resumo_conclusao = element.currentTarget.getAttribute('data-resumo_conclusao');

    document.querySelector('input[name="_id"]').value = id;
    document.querySelector('#resumo_titulo').innerHTML = resumo_titulo;
    document.querySelector('#poster_turno').innerHTML = poster_turno;
    document.querySelector('#poster_numero').innerHTML = poster_numero;
    document.querySelector('#resumo_introducao').innerHTML = resumo_introducao;
    document.querySelector('#resumo_metodologia').innerHTML = resumo_metodologia;
    document.querySelector('#resumo_resultado').innerHTML = resumo_resultado;
    document.querySelector('#resumo_conclusao').innerHTML = resumo_conclusao;


    //document.querySelector('#btn-del').href = `/admin/editions/del/${year}`;
}
function clearValueForm(formName) {
    let form = document.querySelector(formName)
    
    form.querySelectorAll('select').forEach(e => {
        e.options.selectedIndex = 0;
    });
}


let AllbtnEditionEdit = document.querySelectorAll('.btn-edit');
AllbtnEditionEdit.forEach(e => {
    e.addEventListener('click',(element)=>{
        
        let formName = element.currentTarget.getAttribute('form-name');
        switch (formName) {
            case 'user':
                userModal(element);
                break;
            case 'edition':
                editionModal(element)
                break;
            case 'articleReviewer':
                articleReviewerModal(element)
                break;
            default:
                break;
        }
        showModal('.modal');

    })
});

let AllViewArticles = document.querySelectorAll('.viewArticles');
AllViewArticles.forEach(e => {
    e.addEventListener('click',(element)=>{
        let year = element.currentTarget.getAttribute('data-year')
        window.location.href = `/admin/articles/${year}`
    })
});

let AllViewArticle = document.querySelectorAll('.viewArticle');
AllViewArticle.forEach(e => {
    e.addEventListener('click',(element)=>{
        let id = element.currentTarget.getAttribute('data-id')
        window.location.href = `/admin/article/${id}`
    })
});

let AllViewArticleReviewer = document.querySelectorAll('.viewArticleReviewer');
AllViewArticleReviewer.forEach(e => {
    e.addEventListener('click',(element)=>{
        let id = element.currentTarget.getAttribute('data-id')
        window.location.href = `/user/reviewer/article/${id}`
    })
});

let AllViewArticleUser = document.querySelectorAll('.viewArticleUser');
AllViewArticleUser.forEach(e => {
    e.addEventListener('click',(element)=>{
        let id = element.currentTarget.getAttribute('data-id')
        console.log(element.currentTarget.getAttribute('data-id'))
        window.location.href = `/user/article/${id}`
    })
});
