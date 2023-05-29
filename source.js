var argumentNo = 1;

function createNewArgument() {
    let arguments = document.getElementById("arguments");
    arguments.appendChild(createLabelledInput("input","argTitle", "Argument "+argumentNo));
    argumentNo ++;
    arguments.appendChild(createLabelledInput("textarea","premiss", "Prémisse"))
    arguments.appendChild(createLabelledInput("textarea", "mecha", "Mécanisation"))
    arguments.appendChild(createLabelledInput("textarea", "impact", "Impact"));
}

function createLabelledInput(type, label, text) {
    let labelItem = document.createElement('label');
    labelItem.setAttribute("for", label);
    labelItem.innerText = text
    let textArea = document.createElement(type);
    textArea.setAttribute("name", label);
    let container = document.createElement("div");
    container.classList.add("argument");
    container.appendChild(labelItem);
    container.appendChild(textArea);
    return container;
}

function createUnlabelledTextArea() {
    let textArea = document.createElement("textArea");
    return textArea;
}

function addRefutations() {
    let refutations = document.getElementById("refutations");
    let refutation = document.createElement("div");
    refutation.classList.add("refutation");
    refutation.appendChild(createUnlabelledTextArea());
    refutation.appendChild(createUnlabelledTextArea());
    refutations.appendChild(refutation);
}

document.getElementById("addArg").addEventListener("click", ()=> {
    createNewArgument()
})

document.getElementById("addRefut").addEventListener("click", ()=> {
    addRefutations()
})

document.getElementById("govButton").addEventListener("click", ()=> {
    Array.from(document.getElementsByClassName("government")).forEach(element => {
        element.classList.remove("hidden")
    });
})

document.getElementById("oppButton").addEventListener("click", ()=> {
    console.log(document.getElementsByClassName("government"));
    Array.from(document.getElementsByClassName("government")).forEach(element => {
        console.log(element)
        element.classList.add("hidden")
    });
})

