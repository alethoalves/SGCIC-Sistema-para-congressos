let getAllPostersDesocupado = document.querySelectorAll('.poster-desocupado');
let getAllPosterAvaliado = document.querySelectorAll('.poster-avaliado');

function addEventToPoster(data) {
    
    data.forEach(e => {
        e.addEventListener('click',(e)=>{
            let poster_numero = e.currentTarget.getAttribute('value');
            let poster_turno = e.currentTarget.getAttribute('turno');
            document.querySelector('input[name="poster_numero"]').value = poster_numero;
            document.querySelector('input[name="poster_turno"]').value = poster_turno;
            
        })
    });
}
addEventToPoster(getAllPostersDesocupado)
addEventToPoster(getAllPosterAvaliado)