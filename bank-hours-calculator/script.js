document.addEventListener("DOMContentLoaded", function () {
    calculateRecommendedExitTime(8, '03:12', '08:37, 09:14')
});

function handleCalculate() {
    const workHours = parseInt(document.getElementById('workHours').value, 10);
    const bankedHoursInput = document.getElementById('bankedHours').value;
    const entriesInput = document.getElementById('entries').value;
	calculateRecommendedExitTime(workHours, bankedHoursInput, entriesInput);
}

function calculateRecommendedExitTime(workHours, bankedHoursInput, entriesInput) {
    const bankedHoursArray = bankedHoursInput.split(':');
    const bankedHours = parseInt(bankedHoursArray[0], 10);
    const bankedMinutes = parseInt(bankedHoursArray[1], 10);

    const entriesArray = entriesInput.split(',').map(entry => entry.trim());
    const totalWorkedMinutes = calculateTotalWorkedMinutes(entriesArray);

    // Calculate remaining minutes correctly
    const remainingMinutes = (workHours * 60) + (bankedHours * 60 + bankedMinutes) - totalWorkedMinutes;

    if (remainingMinutes <= 0) {
        displayResult('You have already compensated your banked hours. No need to work more.');
        return;
    }

    const recommendedExitTime = calculateRecommendedExitTimeInternal(entriesArray, remainingMinutes);
    displayResult(`Recommended exit time to compensate banked hours: ${recommendedExitTime}`);
}

function calculateTotalWorkedMinutes(entries) {
    let totalMinutes = 0;

    for (let i = 0; i < entries.length - 1; i++) {
        const [currentHours, currentMinutes] = entries[i].split(':').map(part => parseInt(part, 10));
        const [nextHours, nextMinutes] = entries[i + 1].split(':').map(part => parseInt(part, 10));

        totalMinutes += nextHours * 60 + nextMinutes - currentHours * 60 - currentMinutes;
    }

    return totalMinutes;
}

function calculateRecommendedExitTimeInternal(entries, remainingMinutes) {
    const lastEntry = entries[entries.length - 1];
    const [lastHours, lastMinutes] = lastEntry.split(':').map(part => parseInt(part, 10));

    const totalMinutes = lastHours * 60 + lastMinutes + remainingMinutes;

    const recommendedHours = Math.floor(totalMinutes / 60);
    const recommendedMinutes = totalMinutes % 60;

    return formatTime(recommendedHours, recommendedMinutes);
}

function formatTime(hours, minutes) {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
}

function displayResult(message) {
    document.getElementById('result').textContent = message;
}
