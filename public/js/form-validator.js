document.getElementById('cpf').addEventListener('keyup',(e)=>{
    console.log(document.getElementById('cpf').value)
    document.getElementById('cpf').value = document.getElementById('cpf').value.slice(0,11)
    
})