// vanilla js 
scrollToElement = (target) => {
    let e = document.getElementById(target)
    let pos = e.getBoundingClientRect();
    console.log(pos.top, pos.left, pos.right, pos.bottom);
    window.scroll({
        top: pos.top,
        left: pos.left,
        behavior: "smooth"
    });
}


displayHiddenText = (target) => {
    let textField = document.getElementById(target);
    // let currDisplay = textField.style.display;
    // textField.style.display = "block";

    // textField.style.display == "none" ? textField.style.display : textField.style.display;

    if (textField.style.display == "none") {
        textField.style.display = "block";
    } else {
        textField.style.display = "none";
    }
}