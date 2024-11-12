const { save } = window.__TAURI__.dialog;
const { writeTextFile, BaseDirectory } = window.__TAURI__.fs;

console.log(window.__TAURI__);

/**
 * @typedef DebateSheetInfo
 * @property {boolean} isGov - Whether the current team is the governement
 * @property {number} numberOfArguments How many arguments are there
 */

class DebateSheet {
  constructor() {
    this.argumentNo = 1;
    this.isGovernement = true;
    this.refutationNumber = 0;

    document.getElementById("addArg").addEventListener("click", () => {
      this.createNewArgument();
    });

    document.getElementById("addRefut").addEventListener("click", () => {
      this.addRefutations();
    });

    document.getElementById("govButton").addEventListener("click", () => {
      Array.from(document.getElementsByClassName("government")).forEach(
        (element) => {
          element.classList.remove("hidden");
        },
      );
      this.isGov = true;
    });

    document.getElementById("oppButton").addEventListener("click", () => {
      console.log(document.getElementsByClassName("government"));
      Array.from(document.getElementsByClassName("government")).forEach(
        (element) => {
          element.classList.add("hidden");
        },
      );
      this.isGov = false;
    });

    document
      .getElementById("saveButton")
      .addEventListener("click", async () => {
        const debateParser = new DebateParser(this.toDto());
        const path = await save({
          filters: [
            {
              name: "Text",
              extensions: ["txt"],
            },
          ],
        });
        // Do something with the file handle.

        const contents = debateParser.parseAll();
        await writeTextFile(path, contents, {
          baseDir: BaseDirectory,
        });
      });
  }
  createNewArgument() {
    let debateArguments = document.getElementById("arguments");
    if (this.isJudge) {
      debateArguments.appendChild(
        this.createLabelledInput("input", "name", "Nom ", this.argumentNo),
      );
    }
    debateArguments.appendChild(
      this.createLabelledInput(
        "input",
        "argTitle",
        "Argument " + this.argumentNo,
        this.argumentNo,
      ),
    );
    debateArguments.appendChild(
      this.createLabelledInput(
        "textarea",
        "premiss",
        "Prémisse",
        this.argumentNo,
      ),
    );
    debateArguments.appendChild(
      this.createLabelledInput(
        "textarea",
        "mecha",
        "Mécanisation",
        this.argumentNo,
      ),
    );
    debateArguments.appendChild(
      this.createLabelledInput("textarea", "impact", "Impact", this.argumentNo),
    );
    this.argumentNo++;
  }

  createLabelledInput(type, label, text, number = 0) {
    let labelItem = document.createElement("label");
    labelItem.setAttribute("for", label);
    labelItem.innerText = text;
    let textArea = document.createElement(type);
    textArea.setAttribute("name", label);
    if (number != 0) {
      textArea.setAttribute("argNo", number);
    }
    let container = document.createElement("div");
    container.classList.add("argument");
    container.appendChild(labelItem);
    container.appendChild(textArea);
    return container;
  }

  /**
   *
   * @param {string} attClass The CSS class name of the textarea
   * @returns {HTMLElement}
   */
  createUnlabelledTextArea(attClass) {
    let textArea = document.createElement("textArea");
    textArea.classList.add(attClass);
    return textArea;
  }
  /**
   *
   * @param {string} id the id of the parent item
   * @param {()=>{}} handler a function
   * @returns {HTMLElement} the checkbox
   */
  createCheckbox(id, handler) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => {
      handler(id);
    });
    return checkbox;
  }

  addRefutations() {
    let refutations = document.getElementById("refutations");
    let refutation = document.createElement("div");
    refutation.classList.add("refutation");
    refutation.id = "refutations-" + this.refutationNumber;
    refutation.appendChild(this.createUnlabelledTextArea("them"));
    refutation.appendChild(this.createUnlabelledTextArea("us"));
    refutations.appendChild(refutation);
    this.currentRefutation = document.getElementById(
      "refutations-" + this.refutationNumber,
    );
    this.currentRefutation.appendChild(
      this.createCheckbox("refutations-" + this.refutationNumber, (id) => {
        let refutationOfCheckbox = document.getElementById(id);
        if (refutationOfCheckbox.classList.contains("isDone")) {
          refutationOfCheckbox.classList.remove("isDone");
        } else {
          refutationOfCheckbox.classList.add("isDone");
        }
      }),
    );
    this.refutationNumber++;
  }

  /**
   *
   * @returns {DebateSheetInfo}
   */

  toDto() {
    return {
      isGov: this.isGovernement,
      numberOfArguments: this.argumentNo,
    };
  }
}

let controller = new DebateSheet();
