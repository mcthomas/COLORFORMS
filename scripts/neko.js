let hasTriggered = false;
const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];
let index = 0;
function konamiCodeHandler(event) {
    if (!hasTriggered && event.key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
            hasTriggered = true;
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
            function delayNeko() {
                var newNeko = new Neko(window.innerWidth / 2 - 18, 380, false);
                var poof = document.createElement('img');
                var poofSound = new Audio('../style/sounds/poof.m4a');
                poof.src = "../style/images/poof.gif";
                poof.style.position = 'fixed';
                poof.style.zIndex = 1002;
                poof.style.left = window.innerWidth / 2 - 33 + 'px';
                poof.style.top = 365 + 'px';
                document.body.appendChild(poof);
                poofSound.play();
                document.addEventListener('mousemove', function(event) {
                    newNeko.active = true;
                });
            }
            setTimeout(delayNeko, 1000)
            index = 0;
        }
    } else {
        index = 0;
    }
}
document.addEventListener('keydown', konamiCodeHandler);