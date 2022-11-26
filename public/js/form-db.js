
const listResumoStatus = [
    "Resumo pendente",
    "Resumo aguardando avaliação",
    "Resumo em avaliação",
    "Resumo avaliado",
    "Resumo arquivado"
]
function insertResumoStatus(params) {
    listResumoStatus.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
}
const listPosterStatus = [
    "Pôster aguardando checkin",
    "Pôster aguardando avaliação",
    "Pôster em avaliação",
    "Pôster avaliado",
    "Pôster arquivado"
]
function insertPosterStatus(params) {
    listPosterStatus.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
}
const listEdital = [
    "PIBIC",
    "PIBITI",
    "PIBIC-AF",
    "PIBIC-EM",
]
function insertEdital(params) {
    listEdital.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
    
}
const listInstituicao = [
    "UDF",
    "UCB",
    "IESB",
    "IFG-AGUAS_LINDAS",
    "IFB",
    "ESCS",
    "UNB"
]
function insertInstituicao(params) {
    listInstituicao.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
    
}
const listGrandeArea = [
    "Artes e Humanidades",
    "Saúde e Vida",
    "Exatas e Tecnológicas"
]
function insertGrandeArea(params) {
    listGrandeArea.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
    
}
const listSubarea = [
    "Administração",
    "Agronomia",
    "Antropologia",
    "Arqueologia",
    "Arquitetura e Urbanismo",
    "Astronomia",
    "Ciência da Computação",
    "Ciência da Informação",
    "Ciência e Tecnologia de Alimentos",
    "Ciência Política",
    "Ciências Biológicas",
    "Comunicação",
    "Demografia",
    "Direito",
    "Economia",
    "Educação",
    "Educação Física",
    "Enfermagem",
    "Engenharia Aeroespacial",
    "Engenharia Agrícola",
    "Engenharia Biomédica",
    "Engenharia Civil",
    "Engenharia de Materiais e Metalúrgica",
    "Engenharia de Minas",
    "Engenharia de Produção",
    "Engenharia de Transportes",
    "Engenharia Elétrica",
    "Engenharia Mecânica",
    "Engenharia Naval e Oceânica",
    "Engenharia Nuclear",
    "Engenharia Química",
    "Engenharia Sanitária",
    "Farmácia",
    "Filosofia",
    "Física",
    "Fisioterapia e Terapia Ocupacional",
    "Fonoaudiologia",
    "GeoCiências",
    "Geografia",
    "História",
    "Lingüística, Letras e Artes",
    "Matemática",
    "Medicina",
    "Medicina Veterinária",
    "Museologia",
    "Nutrição",
    "Oceanografia",
    "Odontologia",
    "Planejamento Urbano e Regional",
    "Probabilidade e Estatística",
    "Psicologia",
    "Química",
    "Recursos Florestais e Engenharia Florestal",
    "Recursos Pesqueiros e Engenharia de Pesca",
    "Saúde Coletiva",
    "Serviço Social",
    "Sociologia",
    "Zootecnia"
]
function insertSubarea(params) {
    listSubarea.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
    
}
const listPremiacao = ["Menção honrosa","Indicação a prêmio destaque","Vencedor prêmio destaque"]
function insertPremiacao(params) {
    listPremiacao.forEach(e => {
        document.querySelector(params).innerHTML += `<option value="${e}">${e}</option>`
    });
    
}



