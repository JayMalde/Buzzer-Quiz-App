const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
const clearQuestion = document.querySelector('.js-clear-question')
const question = document.querySelector('.js-question')
var propertyType=document.getElementById('propertyType');

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})

clearQuestion.addEventListener('click', () => {
  socket.emit('question',{quest:questionText="Question is Cleared"})
})

// function onKeyPressed1()
// {
  // const quest1 = document.getElementById('quest').value
  // quest=quest1
  // console.log(quest);
// }
var questionText="";
function onSelected1()
{
    var quest=["Demo Question","Who is the prime minister of India?","Which is the national animal of India?"];
    d = document.getElementById("select_id").value;
    alert(d);
    questionText=quest[d].toString()
  socket.emit('question',{quest:questionText})
}
// question.addEventListener('click',()=>{
//   // console.log(quest)
//   socket.emit('question',{quest:questionText})
// })  
