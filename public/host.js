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
  var quest=
  [
    "Demo Question 1 \nOptions \nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4",
    "Demo Question 2 \nOptions \nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4",
    "Which of the following were never awarded a Nobel prize? Options \nA) Mahatma Gandhi\nB) Nelson Mandela\nC) Martin Luther King\nD) Malala Yousafzai",
    "For how long, a joint sitting of both the houses of parliament may be convened to consider a bill which was passed by one house and pending in another house? Options \nA) 3 Months\nB) 6 Months\nC) 9 Months\nD) 12 Months",
    "What do you mean by a mixed economy? Options \nA) Modern and traditional industries \nB) Foreign and domestic investment \nC) Public and private sectors \nD) Commercial and subsistence farming",
    "Which country made the first declaration of War? Options \nA) USSR \nB) Austria \nC) Poland \nD) Germany",
    "Who among the following wrote Sanskrit grammar? Options \nA) Kalidas \nB) Aryabhatt \nC) Charak \nD) Panini",
    "A line which cuts a pair of parallel lines is called? Options \nA) Tangent \nB) Intersector \nC) traversal \nD) chord",
    "Who won the IPL title in 2016? Options Options \nA) Mumbai Indians \nB) Chennai Super Kings \nC) Sunrisers Hyderbad \nD) Royal Challengers Banglore",
    "Who was the second person on Moon? Options \nA) Michael Collins \nB) Neil A. Armstrong \nC) Edwin E \nD)Buzz Aldrin",
    "Which two countries were the first to declare war on Germany? Options \nA) Italy and Greece \nB) Norway and Denmark \nC) Britain and France \nD) The US and The USSR",
    "What was the name of Gautam Buddha's only son? Options \nA) Rahul \nB) Chunda \nC) Channa \nD) Kanthala"
  ];

    d = document.getElementById("select_id").value;
    alert(d);
    questionText=quest[d].toString()
  socket.emit('question',{quest:questionText})
}
// question.addEventListener('click',()=>{
//   // console.log(quest)
//   socket.emit('question',{quest:questionText})
// })  
