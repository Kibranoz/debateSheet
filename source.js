class DebateSheet {

    constructor() {
        this.argumentNo = 1;
        this.isGovernement = true;
        //this.isJudge = false;

        document.getElementById("addArg").addEventListener("click", ()=> {
            this.createNewArgument()
        })
        
        document.getElementById("addRefut").addEventListener("click", ()=> {
            this.addRefutations()
        })
        
        document.getElementById("govButton").addEventListener("click", ()=> {
            Array.from(document.getElementsByClassName("government")).forEach(element => {
                element.classList.remove("hidden")
            });
            this.isGov = true;
        })
        
        document.getElementById("oppButton").addEventListener("click", ()=> {
            console.log(document.getElementsByClassName("government"));
            Array.from(document.getElementsByClassName("government")).forEach(element => {
                console.log(element)
                element.classList.add("hidden")
            });
            this.isGov = false;
        })

        document.getElementById("saveButton").addEventListener("click", async ()=> {
            const debateParser = new DebateParser(this.toDto());

            let fileHandle;
            // Destructure the one-element array.
            fileHandle = await window.showSaveFilePicker({
              types: [
                {
                  description: 'Text Files',
                  accept: {
                    'text/plain': ['.txt'],
                  },
                },
              ],
            });
            // Do something with the file handle.
          
          const contents =  debateParser.parseAll();
          
          const writable = await fileHandle.createWritable();
            // Write the contents of the file to the stream.
            await writable.write(contents);
            // Close the file and write the contents to disk.
            await writable.close();      
              })
    }
createNewArgument() {
    let debateArguments = document.getElementById("arguments");
    debateArguments.appendChild(this.createLabelledInput("input","argTitle", "Argument "+ this.argumentNo, this.argumentNo));
    debateArguments.appendChild(this.createLabelledInput("textarea","premiss", "Prémisse", this.argumentNo))
    debateArguments.appendChild(this.createLabelledInput("textarea", "mecha", "Mécanisation", this.argumentNo))
    debateArguments.appendChild(this.createLabelledInput("textarea", "impact", "Impact", this.argumentNo));
    this.argumentNo ++;

}

createLabelledInput(type, label, text, number=0) {
    let labelItem = document.createElement('label');
    labelItem.setAttribute("for", label);
    labelItem.innerText = text
    let textArea = document.createElement(type);
    textArea.setAttribute("name", label);
    if (number!=0) {
        textArea.setAttribute("argNo", number)
    }
    let container = document.createElement("div");
    container.classList.add("argument");
    container.appendChild(labelItem);
    container.appendChild(textArea);
    return container;
}

createUnlabelledTextArea(attClass) {
    let textArea = document.createElement("textArea");
    textArea.classList.add(attClass);
    return textArea;
}

addRefutations() {
    let refutations = document.getElementById("refutations");
    let refutation = document.createElement("div");
    refutation.classList.add("refutation");
    refutation.appendChild(this.createUnlabelledTextArea("them"));
    refutation.appendChild(this.createUnlabelledTextArea("us"));
    refutations.appendChild(refutation);
}

toDto() {
    return {
        isGov : this.isGovernement,
        numberOfArguments: this.argumentNo
    }
}


}


let controller = new DebateSheet();