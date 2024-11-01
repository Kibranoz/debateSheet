class DebateParser {
  /** @param{DebateSheetInfo} debateSheetInfo */
  constructor(debateSheetInfo) {
    /**@type {DebateSheetInfo} */
    this.debateSheetInfo = debateSheetInfo;
  }
  getTitle() {
    const title = document.getElementById("motionTitle").value;
    const titleString = "Qu'il soit résolu que " + title;
    return this.getHeader(titleString);
  }
  getHeader(headerTitle) {
    const header = "=".repeat(headerTitle.length);
    return header + "\n" + headerTitle + "\n" + header + "\n";
  }
  getIntro() {
    if (this.debateSheetInfo.isGov) {
      let introString =
        "Contexte dans lequel la motion se situe : " +
        document.getElementById("contextContent").value +
        "\n";
      introString +=
        "Balises : " +
        document.getElementById("caracterisationContent").value +
        "\n";
      introString +=
        "Notre point de vue : " +
        document.getElementById("summaryContent").value +
        "\n";
      return introString;
    }
  }
  getArguments() {
    let argumentsString = "";
    for (let i = 1; i < this.debateSheetInfo.numberOfArguments; i++) {
      let argumentParts = document.querySelectorAll('[argNo="' + i + '"]');

      argumentsString += this.getHeader(
        "Argument " + i + " : " + argumentParts[0].value,
      );
      argumentsString += "Prémisses : " + argumentParts[1].value + "\n";
      argumentsString += "Mécanisme : " + argumentParts[2].value + "\n";
      argumentsString += "Impacts : " + argumentParts[3].value + "\n";
    }
    return argumentsString;
  }

  getRefutations() {
    let whatTheySaid = Array.from(document.querySelectorAll(".them")).map(
      (elem) => elem.value,
    );
    let whatWeSaid = Array.from(document.querySelectorAll(".us")).map(
      (elem) => elem.value,
    );
    let refutString = this.getHeader("Réfutations");
    whatTheySaid.forEach((element, index) => {
      refutString += "L'équipe adverse a dit : " + element + "\n";
      refutString +=
        "Ce à quoi nous avons répondu : " + whatWeSaid[index] + "\n";
    });
    return refutString;
  }

  getCristal() {
    let cristalString = this.getHeader("Cristallisation");
    cristalString +=
      "Les points les plus importants du débat : " +
      document.getElementById("themeContent").value +
      "\n";
    cristalString +=
      "Ce que l'autre coté dit : " +
      document.getElementById("otherContent").value +
      "\n";
    cristalString +=
      "Ce que nous disons : " +
      document.getElementById("nousContent").value +
      "\n";
    cristalString +=
      "Nous avons raison parce que : " +
      document.getElementById("conclusionContent").value +
      "\n";
    return cristalString;
  }

  parseAll() {
    return (
      this.getTitle() +
      this.getIntro() +
      this.getArguments() +
      this.getRefutations() +
      this.getCristal()
    );
  }
}
