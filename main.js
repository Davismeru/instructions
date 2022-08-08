// all survey question points
const questionaires = ["first name", "surname", "Id number", "age", "county", "gender", "highest education level", "hobby", "profession", "favorite movie"]

const specifics = document.querySelector('#specifics')
const btns = document.querySelectorAll('.btn')
const textInput = document.querySelector('.text-input')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const notificationPopup = document.querySelector('.notification-popup')
const profilesSlide = document.querySelector('.profiles-slide')
const profilesList = document.querySelector('.profiles-list')
prevBtn.style.display = "none"
let tempArr = []
let count = 0
let emptyString = ''
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const clickedBtn = e.currentTarget.getAttribute('value')
        // next button functionality
        if(clickedBtn === "Next") {
            if(textInput.value) { //only show next question if the current field is not empty
                count++
                tempArr.push(`"${textInput.value}"`)
                textInput.value = ''
            } else { //show this alert message if field is empty
                alert("please fill this field")
            }
        }  else if(clickedBtn === "Previous") { // previous button functionality
            count--
            textInput.value = tempArr[count]
            tempArr.pop()
        } else if(clickedBtn ==="Submit"){    //submit button functionality
            tempArr.push(`"${textInput.value}"`)
            localStorage.setItem(`${tempArr[2]}`, tempArr)
            tempArr = []
            notificationPopup.classList.add('show-popup')
            setTimeout(()=> {
                notificationPopup.classList.remove('show-popup')
            }, 2000)
            count = 0
            textInput.value = ''
        } else { //see profiles button functionality
            profilesSlide.classList.add('show-profiles-slide')
        }
        // hide previous button at the beginning of the survey
        count > 0 ? prevBtn.style.display = "inline" : prevBtn.style.display = "none"
        // show submit button at the end of the survey
        count == questionaires.length-1 ? nextBtn.setAttribute("value", "Submit") : nextBtn.setAttribute("value", "Next")
        specifics.textContent = questionaires[count]
        textInput.setAttribute('placeholder', `${questionaires[count]}`)
    })
})

let keys = Object.keys(localStorage)
let profilesArr = []
keys.map((key) => {
    const fetchedProfiles = `[${localStorage.getItem(key)}]`
    profilesArr.push(fetchedProfiles)
    profilesArr.forEach(profile => {
        let toArr = JSON.parse(profile)
        console.log(profile);
        profilesList.innerHTML += `
        <div class="list-content">
            <div class="name">
                <p>${toArr[0] + " " + toArr[1]}</p>
            </div>

            <div class="id-number">
                <p>${JSON.parse(toArr[2])}</p>
            </div>

            <div class="profile-link">
                <p class="profile-link">see profile</p>
            </div>
        </div>
        `
    })
})


// hide profiles slide when home button is clicked
const homeBtn = document.querySelector('.fa-home')
homeBtn.addEventListener('click', ()=> {
    profilesSlide.classList.remove('show-profiles-slide')
})

// display all profiles in the profiles slide


const clear = document.querySelector('.clear')
clear.addEventListener('click', ()=> {
    localStorage.clear()
})