let names = [];
let errors = [];
let selection = [];
let selection_number = 1;
let seperator = ",";


//elements
const errorBox = document.getElementById("error-box");
const nameBox = document.getElementById("name");
const nameListBox = document.getElementById("name-list");
const numberBox = document.getElementById("number");
const meta = document.getElementById("meta");
const sepBox = document.getElementById("sep");
const meta2 = document.getElementById("meta2");
const resultBox = document.getElementById("selected-names");

//buttons 
const nameAddButton = document.getElementById("name-add-button");
const updateSelectionNumberButton = document.getElementById("update-selection-number");
const updateSeperatorButton = document.getElementById("update-selector");
const cta = document.getElementById("cta");
const save = document.getElementById("save");
const load = document.getElementById("load");


//function
let deleteError = (index) => {
    errors = errors.filter((e,i) => i !== index);
    renderErrors();
}

let deleteName = (index) => {
    names = names.filter((e,i) => i !== index);
    renderNames();
    renderNumberText();
}


//render
const renderErrors = () => {

    errorBox.innerHTML = "";

    errors.forEach((e, i) => {
        let error = `
        <div class="error">
            <p>${e}</p>
            <button onclick="deleteError(${i})"><i class="fas fa-times"></i></button>
        </div>
        `
        errorBox.innerHTML += error

    })
}


const renderNames = () => {
    nameListBox.innerHTML = ""
    
    names.forEach((e,i) => {
        let nameComp = `<li>
            <button onclick="deleteName(${i})" class="btn-danger"><i class="fas fa-times"></i></button>
            <p>${e}</p>
        </li>`

        nameListBox.innerHTML += nameComp
    })
}

const renderNumberText = () => {
    meta.innerHTML = `Currently Selecting ${selection_number} out of ${names.length} elements`
}

const renderSecondaryMeta = () => {
    meta2.innerHTML = `Currently seperating selected items with "${seperator}"`
}

const renderList = () => {
    resultBox.innerHTML = ""
    selection.forEach((s, i) => {
        if(i != 0){
            resultBox.innerHTML += seperator;
        }
        resultBox.innerHTML += s;
    })
}

const render = () => {
    renderErrors();
    renderNames();
    renderNumberText();
    renderSecondaryMeta();
    renderList();
}


//actions
nameAddButton.addEventListener("click", () => {
    if(nameBox.value == "") {
     errors.push("Can't add new name")
     window.scrollTo({top: 0, behavior: 'smooth'});

    }
    else{
        names.push(nameBox.value);
        nameBox.value = ""
    }
    render();
});

updateSelectionNumberButton.addEventListener("click", () => {
    if(Number(numberBox.value) <= 0){
     errors.push("Accepts value 1 and abover")
     window.scrollTo({top: 0, behavior: 'smooth'});
    } else if(Number(numberBox.value) > names.length){
        errors.push("Can't do that!")
    } 
    else{
        selection_number = Number(numberBox.value);
        numberBox.value = ""
    }
    render();
})

updateSeperatorButton.addEventListener("click", () => {
    seperator = sepBox.value;
    sepBox.value = "";
    render();
})

cta.addEventListener("click", () => {
    if(selection_number > names.length){
        errors.push("Not enough elements")
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
    else{
        let x = 0
        let p = ""
        selection = []
        while(x < selection_number){
            do{
                p = names[Math.floor(Math.random() * names.length)]
            }while(selection.indexOf(p) != -1)
            selection.push(p);
            x++;
        }
    }
    render();
});

save.addEventListener("click", () => {
    localStorage.setItem("names", JSON.stringify({names}))

    localStorage.setItem("selection_number", selection_number)

    localStorage.setItem("seperator", seperator)

    alert("Saved Successfully");
})

load.addEventListener("click", () => {

    try
    {
        names = JSON.parse(localStorage.getItem("names")).names;
    
        selection_number = Number(localStorage.getItem("selection_number"))
    
        seperator = localStorage.getItem("seperator");
        
        render();

        alert("Loaded Successfully");
        window.scrollTo({top: 0, behavior: 'smooth'});
    } catch(error) {
        alert("could not load data")
    }


})

render();