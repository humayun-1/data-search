const nameInput = document.querySelector('.name');
const subjectInput = document.querySelector('.subject');
const messageInput = document.querySelector('.message');
const save = document.querySelector('.save');
const reset = document.querySelector('.reset');
const dataDiv = document.querySelector('.data-wrapper');
const search = document.querySelector('.search');


let obj;
let localData = localStorage.getItem(`temp`) ? JSON.parse(localStorage.getItem(`temp`)) : []

save.addEventListener('click', main);
reset.addEventListener('click', resetData);
search.addEventListener('keyup', searchData);


function main() {
    if (nameInput.value !== '' && subjectInput.value !== '' && messageInput.value !== '') {
        obj = {
            name: nameInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        }
        localData.push(obj)
        localStorage.setItem('temp', JSON.stringify(localData));
        let elem = document.createElement('div');
        elem.classList.add('data-container');
        for (i = 0; i < localData.length; i++) {
            elem.innerHTML = `<span class="delete"><i class="fas fa-trash"></i></span>
            <p class="data-head">${localData[i].name}</p>
            <p class="data-subject">${localData[i].subject}</p>
            <p class="data-message">${localData[i].message}</p>`;
            dataDiv.appendChild(elem);
        }
        nameInput.value = '';
        subjectInput.value = '';
        messageInput.value = ''
        location.reload();
    }
    else {
        alert('Fill All The Fields')
    }
}

function resetData() {
    localStorage.clear();
    location.reload();
}

// display data 

if (localData.length > 0) {
    document.addEventListener('DOMContentLoaded', () => {
        for (i = 0; i < localData.length; i++) {
            dataDiv.innerHTML += `<div class="data-container">
            <span class="delete"><i class="fas fa-trash"></i></span>
        <p class="data-head">${localData[i].name}</p>
          <p class="data-subject">${localData[i].subject}</p>
          <p class="data-message">${localData[i].message}</p>
    </div>`
        }
    })
}

// search data 

function searchData() {
    const allDataDiv = document.querySelectorAll('.data-container')
    if (localData.length > 0) {
        for (i = 0; i < allDataDiv.length; i++) {
            let divhead = allDataDiv[i].childNodes[1];

            if (localData[i].name.includes(search.value)) {
                allDataDiv[i].style.cssText = `display:inline-block;`
            }
            else {
                allDataDiv[i].style.cssText = `display:none;`
            }

        }
    }
}





dataDiv.addEventListener('click', (e) => {
    for (j = 0; j < document.querySelectorAll('.data-container').length; j++) {
        let DataLocal = JSON.parse(localStorage.getItem(`temp`));
        let clickedHead = e.target.parentNode.parentNode.childNodes[3];
        let clickedSubject = e.target.parentNode.parentNode.childNodes[5];
        let clickedMessage = e.target.parentNode.parentNode.childNodes[7];
        if (e.target.classList.value.includes('fas fa-trash') == true) {
            for (i = 0; i < DataLocal.length; i++) {
                if (DataLocal[i].name == clickedHead.innerHTML && DataLocal[i].subject == clickedSubject.innerHTML && DataLocal[i].message == clickedMessage.innerHTML) {
                    e.target.parentNode.parentNode.remove()
                    DataLocal.splice(i, i + 1)
                    localStorage.setItem('temp', JSON.stringify(DataLocal));
                }
            }

        }
    }
})