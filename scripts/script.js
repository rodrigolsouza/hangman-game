//-----------------------------variables declarations --------------------------------

const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop")
,{}
);
let attempts=6;
let typedLetter="";
let wrongLetters=[];
let revealdsLetters=[];
let secretWordSize=0;
let secretWord="";
let secretWordAndHint="";
let secretHint="";
let splittedSecretWord=[];
const dictonaire=[
{name:'louco', hint: "situação mental"},
{name:'preto', hint:"Uma cor"},
{name:'bicho', hint:"algo vivo"},
{name:'chuva', hint:"condição da climatologia"},
{name:'manha', hint:"fase de um dia"},
{name:'noite', hint:"parte do dia"},
{name:'sexta', hint:"número ordinal"},
{name:'melão', hint:"fruta suculenta"},
{name:'perna', hint:"auxilia na locomoção do humano"},
{name:'nariz', hint:"orgão responsável por um dos sentidos"},
{name:'labio', hint:"Uma parte do corpo humano"},
{name:'dente', hint:"parte do corpo associado a digestão dos alimentos"},
{name:'cilio', hint:"protetor de um dos orgãos dos sentidos"},
{name:'carro', hint:"associado a transporte de pessoas"},
{name:'forno', hint:"muito útil numa cozinha"},
{name:'saida', hint:"Parte inerente a todo lugar"},
{name:'bolsa', hint:" utensilio usado para levar acessorios"},
{name:'mouse', hint:"Dispostivo informático"},
{name:'porta', hint:"Divisor entre entrada em saida"},
{name:'tinta', hint:"Usado para colorir"},
{name:'cobra', hint:"animal sem patas"},
{name:'ganso', hint:"ave parente do pato"},
{name:'missa', hint:"rito religioso"},
{name:'sonho', hint:"ato que ocorre na mente das pessoas"},
{name:'creme', hint:"um sabor de sorvete"},
{name:'velha', hint:"adjetivo para algo antigo"},
{name:'gordo', hint:"adjetivo pejorativo"},
{name:'magro', hint:"característica de um indivíduo"},
{name:'raiva', hint:"estado de humor"},
{name:'casal', hint:"quando se está a dois"},
{name:'crise', hint:"estado onde as coisas não vão bem"},
{name:'grade', hint:"usado para proteger residencias"},
{name:'curva', hint:"parte da pista"},
{name:'cinto', hint:"acessorio para ajustar coisas"},
{name:'barro', hint:"Matéria-prima comum em construções"},
{name:'jarro', hint:"semelhante a uma ânfora"},
{name:'lapis', hint:"Usado para escrever"},
{name:'garfo', hint:"Utensílio de cozinha"},
{name:'prato', hint:"Utensílio de cozinha"},
{name:'horta', hint:"Onde se cultiva vegetais"},
{name:'grito', hint:"manifestação das cordas vocais"},
{name:'livro', hint:"Artefato de conhecimento"},
{name:'abril', hint:"mes do ano"}
];


/*const virtualKeyboard= [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['Enter','Z','X','C','V','B','N','M','<=']]*/


//------------------------------Functions call-----------------------------------------------

generateKeyboard();
secretWordAndHint=sortWord(dictonaire);
secretWord=secretWordAndHint.name;
secretHint=secretWordAndHint.hint;
setHintText(secretHint);

startGame(secretWord);


//------------------------------functions declaration---------------------------------------


function generateKeyboard() {
    const keyboardContainer = document.querySelector(".keyboard-container");
  
    for (let index = 65; index < 91; index++) {
      const character = String.fromCharCode(index)
      const buttonElement = `<button id="${character}" onclick="findLetter('${character}')" type="button" class="btn btn-primary">${character}</button>`
  
     keyboardContainer.innerHTML += buttonElement;
    }
}

document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toUpperCase();
    const buttonElementPressed = document.getElementById(pressedKey);
  
    // Check if the button is disabled
    if (buttonElementPressed?.classList.contains("disabled")) {
      return;
    }
  
    // Check if the pressed key is a valid letter (A-Z)
    const alphabetRegex = /^[A-Z]$/;
    if (alphabetRegex.test(pressedKey)) {
      // Call the findLetter function with the pressed key
      findLetter(pressedKey);
      // Focus on the corresponding button
      buttonElementPressed.focus();
    }
  });

function sortWord(dictonaire){
    let selectedIndex=Math.floor(Math.random()*dictonaire.length);
    let sortedWordAndHint=dictonaire[selectedIndex];
    return sortedWordAndHint;
}

function setHintText(randomWord) {

    const hintElement = document.getElementById("hint-text");
    hintElement.innerHTML = randomWord;
  }

function setSecretWordBlankLetters() {
    const secretWordListElement = document.querySelector(".secret-word-ul");
  
    for (const index in splittedSecretWord) {
      secretWordListElement.innerHTML += `<li id='secret-word-${index}'>&#8203</li>`;
    }
}

function disableButton(buttonId) {
    // Get the button element by its ID and add the "disabled" class
    document.getElementById(buttonId).classList.add("disabled");
  }

function startGame(secretWord){

    splittedSecretWord=secretWord.toUpperCase().split("");
    secretWordSize=splittedSecretWord.length;
    revealdsLetters= Array(splittedSecretWord.length).fill("");
    setSecretWordBlankLetters();

    console.log(splittedSecretWord);
    console.log(revealdsLetters);
    console.log(`remaining attempts: ${attempts}`);
    console.log(`missing letters: ${secretWordSize}`);
    console.log(wrongLetters);
    

    window.findLetter=function(letter){
        if(isEndGame(attempts,secretWordSize)){
            return;
        }

        disableButton(letter);

        searchLetter(letter,splittedSecretWord);
        if(isEndGame(attempts,secretWordSize)){
            return;
        }

    }
 
}

function searchLetter(letter, splittedSecretWord){
    letter=letter.toUpperCase();
    let isLetter=false;
    for (let index=0; index<splittedSecretWord.length; index++) {
        let element=splittedSecretWord[index];
        if (element==letter){
            revealdsLetters[index]=letter;
            secretWordSize-=1;
            document.getElementById(`secret-word-${index}`).innerHTML = letter;
            isLetter=true;
        }
    }
    if(isLetter==false){
        attempts--;
        wrongLetters.push(letter);
        const hangmanImgElement = document.getElementById("hangman-img");
        hangmanImgElement.src = `../assets/images/hangman-${6-attempts}.svg`;
        const missingElement = document.getElementById("guesses-text");
        missingElement.innerHTML = `${attempts}`;        
    }
}

function isEndGame(attempts, secretWordSize){
    const modalTitleElement = document.getElementById("staticBackdropLabel");
    const modalBody=document.querySelector(".modal-body");
    if (attempts<1){
        modalTitleElement.innerHTML = "GAME OVER! 😭😢";
        modalBody.innerHTML =`<img src="../assets/images/lost.gif" width="80%">`;
        myModal.show();
        console.log("GAME OVER!");
        return true;
    }else if(secretWordSize==0){
        modalTitleElement.innerHTML = "Congratulations! You Win! 🎉👏🏼";
        modalBody.innerHTML =`<img src="../assets/images/victory.gif">`;
        myModal.show();
        console.log("Congratulations! You Win!");
        return true;
    }else{
        return false;
    }
}
