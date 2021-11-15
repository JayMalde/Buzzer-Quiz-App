const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
const question = document.querySelector('.js-question')
var quest="No Question";
// var quest=["Who is the prime minister of India?","Which is the national animal of India?"];
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

function onKeyPressed1()
{
  // const quest1 = document.getElementById('quest').value
  // quest=quest1
  console.log(quest);
}

function onSelected1()
{
  for (var i = 0; i < propertyType.options.length; i++) {
    if(propertyType.options[i].selected='selected')
    {
      quest=propertyType.options[i].value;
    }
    else{
      quest="No Question Selected"
    }
  }
}

question.addEventListener('click',()=>{
  console.log(quest)
  socket.emit('question',{quest:quest})
})
