// 43d54ce -> last commit before large changes if hash needed  

const scrollToElement = (target) => {
    let e = document.getElementById(target)
    let pos = e.getBoundingClientRect();

    window.scrollTo({
        top: pos.y + window.scrollY,
        left: pos.left,
        behavior: "smooth"
    });
}


const displayHiddenText = (targetText, classSelector, pos) => {
    let textField = document.getElementById(targetText);
    let button = document.querySelectorAll(classSelector)[pos];

    button.classList.toggle("active");

    if (textField.style.display == "none") {
        textField.style.display = "block";
    } else {
        textField.style.display = "none";
    }
}

const handleDisplaying = (idName, displayType) => {
    let e = document.getElementById(idName);
    e.style.display = displayType;
}

let enterCount = 0;
document.addEventListener("keypress", event => {

    let enterPressed = event.key == "Enter";

    if (enterPressed && enterCount == 0) {

        handleDisplaying("blink1", "none")
        setTimeout(() => {
            handleDisplaying("hidden1", "block");
            setTimeout(() => {
                handleDisplaying("hidden2", "block");
                setTimeout(() => {
                    handleDisplaying("hidden3", "block");
                    setTimeout(() => {
                        handleDisplaying("hidden4", "block");
                    }, 500);
                }, 2000);
            }, 1000);
        }, 750);

        enterCount++;

    }

    // console.log(enterCount);

})
