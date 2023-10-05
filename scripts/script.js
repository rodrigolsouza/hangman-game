//-----------------------------variables declarations --------------------------------

let attempts=6;
let typedLetter="";
let wrongLetters=[];
let revealdsLetters=[];
let secretWordSize=0;
let secretWord="";
const dictonaire=['louco','preto','bicho','verde','chuva','manha','noite','tarde','sexta','melão','mamão','perna','nariz','labio','dente','cilio','blusa','carro','forno','saida','bolsa','mouse','porta','tinta','cobra','ganso','missa','culto','sonho','cinza','creme','velha','velho','gordo','magro','baixo','baixa','magra','lindo','linda','raiva','casal','crise','indio','grade','curva','cinto','barro', 'jarro', 'lapis', 'garfo', 'prato', 'jesus', 'horta', 'milho', 'milha','grito', 'parto','lente','cravo','livro','leite','carta','vulto','abril','junho','julho','bomba','pombo','ostra','aguia','prata'];


/*const virtualKeyboard= [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['Enter','Z','X','C','V','B','N','M','<=']]*/


//------------------------------Functions call-----------------------------------------------

secretWord=sortWord(dictonaire);
startGame(secretWord);


//------------------------------functions declaration---------------------------------------

function searchLetter(letter, splittedSecretWord){
    letter=letter.toUpperCase();
    let isLetter=false;
    for (let index=0; index<splittedSecretWord.length; index++) {
        let element=splittedSecretWord[index];
        if (element==letter){
            revealdsLetters[index]=letter;
            secretWordSize-=1;
            isLetter=true;
        }

    }

    if(isLetter==false){
        attempts--;
        wrongLetters.push(letter);
    }
}


function sortWord(dictonaire){
    let selectedIndex=Math.floor(Math.random()*dictonaire.length);
    let sortedWord=dictonaire[selectedIndex].toUpperCase();
    return sortedWord;
}

function isEndGame(attempts, secretWordSize){
    if (attempts<1){
        console.log("GAME OVER!");
        return true;
    }else if(secretWordSize==0){
        console.log("Congratulations! You Win!");
        return true;
    }else{
        return false;
    }
}

function startGame(secretWord){

    let splittedSecretWord=secretWord.split("");
    secretWordSize=splittedSecretWord.length;
    revealdsLetters= Array(splittedSecretWord.length).fill("");
     

    console.log(splittedSecretWord);

    while(true){
        typedLetter= prompt("type un letter");

        searchLetter(typedLetter,splittedSecretWord);
        console.log(revealdsLetters);
        console.log(`remaining attempts: ${attempts}`);
        console.log(`missing letters: ${secretWordSize}`);
        console.log(wrongLetters);
    
        if(isEndGame(attempts,secretWordSize)){
            break;
        }else{
            continue;
        }
    }

}



