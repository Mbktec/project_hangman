const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const compteur = document.querySelector('.erreur')

const words = ['applic', 'program', 'interfa', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//function generateButtons() {
   //var buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
   //<button 
     //  class="btn btn-lg btn-secondary m-2"
      // id='` + letter + `'
     //  onclick="handleGuess('` + letter + `')"
   //>
  // ` + letter + `
   //</button>
  // `).join('');
  // document.getElementById('keyword').innerHTML = buttonsHTML;
//}

//generateButtons()

//show hidden word
function displayword(){
   wordE1.innerHTML =`
   ${selectedWord
   .split('')
   .map(
         letter =>`
         <span class="letter">
         ${correctLetters.includes(letter) ? letter: ''}
         </span>
       `
      )
   .join('')}
   `;
  
   const innerWord = wordE1.innerText.replace(/\n/g, '');
   if(innerWord === selectedWord){
      finalMessage.innerText = 'Super! vous avez gagné';
      playAgainBtn.textContent = 'Rejouier'
      popup.style.display= 'flex';
   }
}

//update the wrong letters
function uppdateWrongletterE1(){
   //display wrong letters
   wrongLettersE1.innerHTML = `
${wrongLetters.length > 0 ? `<p>Wrong</p>`: ''}
${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

//display parts
let i=0;
figureParts.forEach((part, index) => {
   const errors = wrongLetters.length;
   
   if(index < errors) {
      part.style.display = 'block'
      i++;
      compteur.textContent = i;
    
   }
   else{
      part.style.display = 'none';
   }
});
//check if lost
if(wrongLetters.length === figureParts.length){
   finalMessage.innerText = 'Oups! vous avez perdu la partie';
   playAgainBtn.textContent = 'Rejouier'
   popup.style.display = 'flex';

}
}

//show notification
function showNotification(){
   notification.classList.add('show');

   setTimeout(() => {
      notification.classList.remove('show');
   }, 2000)
}

//

window.addEventListener('keydown', e =>{
   if(e.keyCode>= 65 && e.keyCode <=98){
      const letter = e.key;

      if(selectedWord.includes(letter)){
         if(!correctLetters.includes(letter)){
            correctLetters.push(letter);

            displayword();
         }
         else{
            showNotification();
         }
      }else{
         if(!wrongLetters.includes(letter)){
           wrongLetters.push(letter); 
           uppdateWrongletterE1(); 
         }else{
            showNotification();
         }
      }
   }
} );

// star game
playAgainBtn.addEventListener('click', () =>{
   correctLetters.splice(0);
    wrongLetters.splice(0);
    compteur.textContent = "";

selectedWord = words[Math.floor(Math.random() * words.length)];
displayword();

uppdateWrongletterE1();
popup.style.display = 'none';

})

displayword();
