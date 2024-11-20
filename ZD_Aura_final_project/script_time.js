var delay = 50; // Скорость печати

    var print_text = function(text, elem, delay) {
        if (text.length > 0) {
            elem.innerHTML += text[0];
            setTimeout(function() {
                print_text(text.slice(1), elem, delay); 
            }, delay);
        }
    }
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        const formattedDateTime = now.toLocaleString('en-US', options);
        var elem = document.getElementById("date-time");

        elem.innerHTML = "";

        print_text(formattedDateTime, elem, delay);
    }

    updateDateTime();

    setInterval(updateDateTime, 10000);