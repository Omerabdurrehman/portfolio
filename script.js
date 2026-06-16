const cards=document.querySelectorAll('.card,.project-card,.exp-card')

window.addEventListener('scroll',()=>{

cards.forEach(card=>{

const top=card.getBoundingClientRect().top

if(top<window.innerHeight-100){

card.style.opacity='1'
card.style.transform='translateY(0)'
}

})

})

cards.forEach(card=>{

card.style.opacity='0'
card.style.transform='translateY(40px)'
card.style.transition='1s'
})