document.addEventListener("DOMContentLoaded", function() {
    const datepicker = document.getElementById("datepicker");
    const generateButton = document.getElementById("generate");
    const shadow = document.querySelector('.shadow');
    
    generateButton.addEventListener("click", function() {
        const selectedDate = datepicker.value;
        const date = new Date(selectedDate);
        const selectedYear = date.getFullYear();
        const selectedMonth = (date.getMonth() + 1).toString().padStart(2, "0");

        const isLeapYear = (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || (selectedYear % 400 === 0);
        const daysInFebruary = isLeapYear ? 29 : 28;

        const daysInMonths = {
            "01": 31,
            "02": daysInFebruary,
            "03": 31,
            "04": 30,
            "05": 31,
            "06": 30,
            "07": 31,
            "08": 31, 
            "09": 30,
            "10": 31,
            "11": 30, 
            "12": 31
        };

        const firstDay = new Date(`${selectedYear}-${selectedMonth}-01`).getDay();

        updateCalendar(selectedYear, selectedMonth, daysInMonths[selectedMonth], firstDay);
        highlightSelectedDay(date.getDate());
    });

    function highlightSelectedDay(day) {
        const buttons = document.querySelectorAll(".date-grid button");
        buttons.forEach(button => {
            button.classList.remove("is-selected");
        });
    
        buttons.forEach(button => {
            const timeElement = button.querySelector("time");
            if (timeElement && timeElement.textContent === day.toString()) {
                button.classList.add("is-selected"); 
            }
        }); 
    } 
    dazai,fyodor & chuuya
    mushitaro, ango, nikolai &sigma 
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); 
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    } 

    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(name + "=") === 0) {
                return cookie.substring(name.length + 1);
            } 
        }
        return ""; 
    }

    function updateCalendar(year, month, daysInMonth, firstDay) {
        const calendarContainer = document.querySelector(".date-grid");
        calendarContainer.innerHTML = '';

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("button");
                if (i === 0 && j < firstDay) {
                } else if (dayCounter <= daysInMonth) {
                    const timeElement = document.createElement("time");
                    const day = dayCounter.toString().padStart(2, "0");
                    const datetime = `${year}-${month}-${day}`;
                    timeElement.setAttribute("datetime", datetime);
                    timeElement.textContent = dayCounter;
                    cell.appendChild(timeElement);

                    const eventKey = `event_${datetime}`;
                    const eventValue = getCookie(eventKey);

                    if (eventValue) {
                        cell.addEventListener("click", function() {
                            alert(eventValue);
                        });
                        cell.style.color = "Gray";
                    } else {
                        cell.addEventListener("click", function() {
                            const eventTitle = prompt("Enter Event Title:");
                            const content = prompt("Enter Content:");

                            if (eventTitle || content) {
                                const eventData = `Event Title: ${eventTitle}\nContent: ${content}`;
                                setCookie(eventKey, eventData, 7); 
                                alert("Event saved!");
                                cell.style.color = "gray";
                            }
                        });
                    }
                    dayCounter++;
                }
                calendarContainer.appendChild(cell);
            }
        }
    }

    
    document.addEventListener('mousemove', (e) => {
        let x = e.clientX - (document.documentElement.clientWidth * 1.5);
        let y = e.clientY - (document.documentElement.clientHeight * 1.5);
        shadow.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
});
