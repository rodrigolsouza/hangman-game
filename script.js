let tentativas=6;
let palpitesRestantes=6;


const dicionario=['louco','preto','bicho','verde','chuva','manha','noite','tarde','sexta','melão','mamão','perna','nariz','labio','dente','cilio','blusa','carro','forno','saida','bolsa','mouse','porta','tinta','cobra','ganso','missa','culto','sonho','cinza','creme','velha','velho','gordo','magro','baixo','baixa','magra','lindo','linda','raiva','casal','crise','indio','grade','curva','cinto','barro', 'jarro', 'lapis', 'garfo', 'prato', 'jesus', 'horta', 'milho', 'milha','grito', 'parto','lente','cravo','livro','leite','carta','vulto','abril','junho','julho','bomba','pombo','ostra','aguia','prata'];


let palavraSecreta=sortear_palavra(dicionario);
let splittedPalSecreta=palavraSecreta.split("");
let letrasReveladas= Array(splittedPalSecreta.length).fill("");

console.log(splittedPalSecreta);


encontrarLetra("i");
console.log(letrasReveladas);
console.log(tentativas);

encontrarLetra("w");
console.log(letrasReveladas);
console.log(tentativas);

encontrarLetra("a");
console.log(letrasReveladas);
console.log(tentativas);



function encontrarLetra(letra){
    letra=letra.toUpperCase();
    let encontrada=true;
    for (let index=0; index<splittedPalSecreta.length; index++) {
        const element=splittedPalSecreta[index];
        if (element==letra){
            letrasReveladas[index]=letra;
            contLetrasReveladas+=1;
        }
    }
    if(encontrada==false){
        tentativas--;
    }
    verificaFimDeJogo(tentaivas,contLetrasReveladas);
}


function sortear_palavra(dicionario){
    let indiceSorteado=Math.floor(Math.random()*dicionario.length);
    let palavraSorteada=dicionario[indiceSorteado].toUpperCase();
    return palavraSorteada;
}

function verificaFimDeJogo(tentativas){
    if (tentativas==0){
        console.log("")
    }
}

