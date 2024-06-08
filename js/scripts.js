document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const sectionHeaders = document.querySelectorAll('.section-header');
    const blockComponents = document.querySelectorAll('.block');
    const h1 = document.getElementById('messenger');
    const subtext = document.getElementById('subtext');
    let isScrolled = false;

    function stopScrambling() {
        h1.textContent = 'Ricco Lim';
    }

    function startScrambling() {
        h1.textContent = ''; // Clear h1 content for scrambling effect
        app.init();
    }

    function getCenter(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return { centerX, centerY };
    }

    function getScreenCenter() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        return { centerX, centerY };
    }

    window.addEventListener('scroll', function () {

        //#region Moving Section Headers

        // sectionHeaders.forEach(function (sectionHeader) {
        //     const section = sectionHeader.parentElement;
        //     const rect = section.getBoundingClientRect();
        //     let inactiveRect, activeRect;

        //     if (rect.top <= 162 && rect.bottom >= 0) {
        //         console.log('a', activeRect, 'i', inactiveRect, rect, section);
        //         sectionHeader.style.position = 'fixed';
        //         sectionHeader.style.top = '130px'
        //     }
        //     else {
        //         sectionHeader.style.position = 'static';
        //     }
        // });

        //#endregion Moving Section Headers

        //Focus on each "block"
        blockComponents.forEach(function (blockComponent) {
            console.log("cmoponent =", blockComponent, blockComponent.getBoundingClientRect().bottom)
            if (blockComponent.getBoundingClientRect().bottom < 260 || blockComponent.getBoundingClientRect().top > 360) blockComponent.classList.add('small')
            else blockComponent.classList.remove('small');
        });

        //Scramble
        if (window.scrollY > 30) {
            header.style.background = '#3b2e7d';
            header.style.padding = '0';
            subtext.classList.add('hidden'); // Hide subtext with transition
            if (!isScrolled) {
                stopScrambling();
                isScrolled = true;
            }
        } else {
            header.style.background = '#161d49';
            header.style.padding = '2rem 0';

            subtext.classList.remove('hidden'); // Show subtext with transition
            if (isScrolled) {
                isScrolled = false;
                startScrambling();
            }
        }
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
            while (randomText.length < length) randomText += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
            return randomText;
        }

        function animateIn() {
            if (isScrolled) return; // Stop animation if scrolled
            if (currentLength < messages[messageIndex].length) {
                currentLength += 2;
                if (currentLength > messages[messageIndex].length) currentLength = messages[messageIndex].length;
                let message = generateRandomString(currentLength);
                messenger.innerHTML = message;
                setTimeout(animateIn, 20);
            } 
            else setTimeout(animateFadeBuffer, 20);
            
        }

        function animateFadeBuffer() {
            if (isScrolled) return; // Stop animation if scrolled
            if (!fadeBuffer) {
                fadeBuffer = [];
                for (let i = 0; i < messages[messageIndex].length; i++) fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: messages[messageIndex].charAt(i) });
            }

            let doCycles = false;
            let message = '';

            for (let i = 0; i < fadeBuffer.length; i++) {
                let fader = fadeBuffer[i];
                if (fader.c > 0) {
                    doCycles = true;
                    fader.c--;
                    message += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
                } 
                else message += fader.l;
            }

            messenger.innerHTML = message;

            if (doCycles) setTimeout(animateFadeBuffer, 50);
            else setTimeout(cycleText, 2000);

        }

        function cycleText() {
            if (isScrolled) return; // Stop animation if scrolled
            messageIndex = (messageIndex + 1) % messages.length;
            currentLength = 0;
            fadeBuffer = false;
            messenger.innerHTML = '';

            setTimeout(animateIn, 200);
        }

        animateIn();
    }

    app.init();
});
