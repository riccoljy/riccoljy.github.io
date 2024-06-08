document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = '#3b2e7d';
            header.style.padding = '0';
        } else {
            header.style.background = '#161d49';
            header.style.padding = '1rem 0';
        }
    });
});

const app = {};

app.init = () => {
    // Scrambling Letters Effect
    const messenger = document.getElementById('messenger');
    const codeletters = "&#*+%?£@§$";
    const messages = [
        'Ricco Lim'
    ];
    let messageIndex = 0;
    let currentLength = 0;
    let fadeBuffer = false;

    function generateRandomString(length) {
        let randomText = '';
        while (randomText.length < length) {
            randomText += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
        } 
        return randomText;
    }

    function animateIn() {
        if (currentLength < messages[messageIndex].length) {
            currentLength += 2;
            if (currentLength > messages[messageIndex].length) {
                currentLength = messages[messageIndex].length;
            }
            
            let message = generateRandomString(currentLength);
            messenger.innerHTML = message;
            
            setTimeout(animateIn, 20);
        } else { 
            setTimeout(animateFadeBuffer, 20);
        }
    }
    
    function animateFadeBuffer() {
        if (!fadeBuffer) {
            fadeBuffer = [];
            for (let i = 0; i < messages[messageIndex].length; i++) {
                fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: messages[messageIndex].charAt(i) });
            }
        }
        
        let doCycles = false;
        let message = ''; 
        
        for (let i = 0; i < fadeBuffer.length; i++) {
            let fader = fadeBuffer[i];
            if (fader.c > 0) {
                doCycles = true;
                fader.c--;
                message += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
            } else {
                message += fader.l;
            }
        }
        
        messenger.innerHTML = message;
        
        if (doCycles) {
            setTimeout(animateFadeBuffer, 50);
        } else {
            setTimeout(cycleText, 2000);
        }
    }
    
    function cycleText() {
        messageIndex = (messageIndex + 1) % messages.length;
        currentLength = 0;
        fadeBuffer = false;
        messenger.innerHTML = '';
        
        setTimeout(animateIn, 200);
    }
    
    animateIn();
}

document.addEventListener('DOMContentLoaded', function() {
    app.init();
});
