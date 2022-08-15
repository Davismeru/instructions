// all survey questions array
const questionaires = ["first name", "surname", "Id number", "age", "county", "gender", "highest education level", "hobby", "profession", "favorite movie"]
const wrapper = document.querySelector('.wrapper')
const allBtns = wrapper.querySelectorAll('.btn')
const prevBtn = wrapper.querySelector('.prev')
const nextBtn = wrapper.querySelector('.next')
const specifics = wrapper.querySelector('#specifics')
const textInput = wrapper.querySelector('.text-input')
const notificationPopup = wrapper.querySelector('.notification-popup')
const profilesSlide = wrapper.querySelector('.profiles-slide')
const profilesList = profilesSlide.querySelector('.profiles-list')

prevBtn.style.display = "none" //hide previous button by default and only diplay if count is greater than 0

let count = 0
let tempArr = []
allBtns.forEach(btn => {
    btn.addEventListener('click', (e)=> {
        const clickedBtn  = e.currentTarget.getAttribute("value")
        if(clickedBtn == "Next") {
            if(textInput.value != "") {
                count++
                tempArr.push(textInput.value)
                textInput.value = "" // clear the current value of the input
            } else {
                alert("please fill this field")
            }
        } else if(clickedBtn == "Previous") {
            count--
            textInput.value = `${tempArr[count]}`
            tempArr.pop()
        } else if(clickedBtn == "Submit") {
            tempArr.push(textInput.value) //push the last value into the tempArr array
            localStorage.setItem(`${tempArr[2]}`, JSON.stringify(tempArr))
            tempArr = []
            textInput.value = ''
            notificationPopup.classList.add('show-popup')
            setTimeout(()=> {
                notificationPopup.classList.remove('show-popup')
            }, 2000)
            count = 0
        } else if(clickedBtn == "Profiles") {
            profilesSlide.classList.add('show-profiles-slide') //show profiles slide when profiles button is clicked
        }
        // display submit button once we are in the last questionaire    
        count == questionaires.length-1 ? nextBtn.setAttribute("value", "Submit") : nextBtn.setAttribute("value", "Next")
        // display previous button if count is greater than 0
        count > 0 ? prevBtn.style.display = "inline" : prevBtn.style.display = "none"
        specifics.textContent = questionaires[count]
        textInput.setAttribute("placeholder", `${questionaires[count]}`)
    })
})

// hide profiles slide when home button is clicked
const homeBtn = profilesSlide.querySelector('.fa-home')
homeBtn.addEventListener('click', ()=> {
    profilesSlide.classList.remove('show-profiles-slide')
})

// refresh button functionality
const refreshBtn = profilesSlide.querySelector('.fa-refresh')
refreshBtn.addEventListener('click', ()=> {
    location.reload()
})

// display items in the profiles slide from the local storage
const keys = Object.keys(localStorage) // get all items stored in the local storage by their key (i.e id number)
keys.forEach(key => {
    const fetchedSurveys = JSON.parse(localStorage.getItem(key)) //get all items in the local storage and convert them into arrays
    profilesList.innerHTML += `
        <div class="list-content">
            <div class="name">
                <p>${fetchedSurveys[0] + " " + fetchedSurveys[1]}</p>
            </div>

            <div class="id-number">
                <p>${fetchedSurveys[2]}</p>
            </div>

            <div class="profile-link">
                <p class="single-link">see profile</p>
            </div>
        </div>
        `
})

// see individual profile
const allListContents = profilesSlide.querySelectorAll('.list-content')
const profilePopup = profilesSlide.querySelector('.single-profile-popup')
const popupInfo = profilePopup.querySelector('.popup-info')
allListContents.forEach(list => {
    const profileLink = list.querySelector('.single-link')
    profileLink.addEventListener('click', (e)=> {
        profilePopup.classList.add('show-profile-popup')
        const getId = e.currentTarget.parentElement.parentElement.querySelector('.id-number p').textContent
        const fetchedProfiles = JSON.parse(localStorage.getItem(getId))
        popupInfo.innerHTML = `
        <div class="col">
            <h6>First name: <span>${fetchedProfiles[0]}</span></h6>
            <h6>Surname: <span>${fetchedProfiles[1]}</span></h6>
            <h6>Id number: <span>${fetchedProfiles[2]}</span></h6>
            <h6>Age: <span>${fetchedProfiles[3]}</span></h6>
            <h6>county: <span>${fetchedProfiles[4]}</span></h6>
        </div>

        <div class="col">
            <h6>Gender: <span>${fetchedProfiles[5]}</span></h6>
            <h6>Education: <span>${fetchedProfiles[6]}</span></h6>
            <h6>Hobby: <span>${fetchedProfiles[7]}</span></h6>
            <h6>Profession: <span>${fetchedProfiles[8]}</span></h6>
            <h6>Favorite movie: <span>${fetchedProfiles[9]}</span></h6>
        </div>`
    })
})

// close popup
const closeBtn = profilesSlide.querySelector('.fa-x')
closeBtn.addEventListener('click', ()=> {
    profilePopup.classList.remove('show-profile-popup')
})

// clear button functionality
const clear = document.querySelector('.clear')
clear.addEventListener('click', ()=> {
    localStorage.clear()
})