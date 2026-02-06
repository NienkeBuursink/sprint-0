const snaren = document.querySelectorAll('.snaar');

snaren.forEach((snaar) => {
    ['mouseover', 'click'].forEach(event => // array met events voor hover op desktop en click op desktop en mobile
        snaar.addEventListener(event, function(e) {
            let snaarAudio = snaar.nextElementSibling; // sibling die direct onder de div staat, dus audio
            // console.log(snaarAudio);
            snaarAudio.play();
        })
    );
});
