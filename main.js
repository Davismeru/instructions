const questionaires = ["first name", "surname", "Id number", "age", "country", "gender", "highest education level", "hobby", "profession", "favorite movie"]
const specifics = document.querySelector('#specifics')
const btns = document.querySelectorAll('.btn')
const textInput = document.querySelector('.text-input')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const notificationPopup = document.querySelector('.notification-popup')
prevBtn.style.display = "none"
const profiles = []
let tempArr = []
let count = 0
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const clickedBtn = e.currentTarget.getAttribute('value')
        if(clickedBtn === "Next") {
            if(textInput.value) {
                count++
                tempArr.push(textInput.value)
                textInput.value = ''
            } else {
                alert("please fill this field")
            }
        }  else if(clickedBtn === "Previous") {
            count--
            textInput.value = tempArr[count]
            tempArr.pop()
        } else {
            tempArr.push(textInput.value)
            const singleProfile = `${tempArr}`
            localStorage.setItem(`${tempArr[2]}`, singleProfile)
            tempArr = []
            notificationPopup.classList.add('show-popup')
            setTimeout(()=> {
                notificationPopup.classList.remove('show-popup')
            }, 3000)
            count = 0
            textInput.value = ''
        }
        count > 0 ? prevBtn.style.display = "inline" : prevBtn.style.display = "none"
        count == questionaires.length-1 ? nextBtn.setAttribute("value", "submit") : nextBtn.setAttribute("value", "Next")
        specifics.textContent = questionaires[count]
        textInput.setAttribute('placeholder', `${questionaires[count]}`)
    })
})

const clear = document.querySelector('.clear')
clear.addEventListener('click', ()=> {
    localStorage.clear()
})