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

let i=0
let text="Python Developer | AI Engineer | Embedded Systems"

function type(){
document.getElementById("typing").innerHTML=text.slice(0,i++)
if(i<=text.length){
setTimeout(type,100)
}
}
type()

function toggleTheme(){
document.body.classList.toggle("light")
}

function toggleMenu(){
document.getElementById("navMenu").classList.toggle("active")
}

function openPopup(img){
document.getElementById("popup").style.display="flex"
document.getElementById("popup-img").src=img
}

function closePopup(){
document.getElementById("popup").style.display="none"
}