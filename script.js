// 43d54ce -> last commit before large changes if hash needed  

scrollToElement = (target) => {
    let e = document.getElementById(target)
    let pos = e.getBoundingClientRect();

    window.scrollTo({
        top: pos.y + window.scrollY,
        left: pos.left,
        behavior: "smooth"
    });
}


displayHiddenText = (targetText, classSelector, pos) => {
    let textField = document.getElementById(targetText);
    let button = document.querySelectorAll(classSelector)[pos];

    button.classList.toggle("active");

    if (textField.style.display == "none") {
        textField.style.display = "block";
    } else {
        textField.style.display = "none";
    }
}