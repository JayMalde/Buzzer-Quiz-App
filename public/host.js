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
    var quest=["Demo Question 1","Demo Question 2","Which of the following were never awarded a Nobel prize?","For how long, a joint sitting of both the houses of parliament may be convened to consider a bill which was passed by one house and pending in another house?","What do you mean by a mixed economy?","Which country made the first declaration of War?","Who among the following wrote Sanskrit grammar?","A line which cuts a pair of parallel lines is called?","Who won the IPL title in 2016?","Who was the second person on Moon?","Which two countries were the first to declare war on Germany?","What was the name of Gautam Buddha's only son?"];
    d = document.getElementById("select_id").value;
    alert(d);
    questionText=quest[d].toString()
  socket.emit('question',{quest:questionText})
}
// question.addEventListener('click',()=>{
//   // console.log(quest)
//   socket.emit('question',{quest:questionText})
// })  
