export const makeChart = (targetElement, lables, data) => {

    new Chart(targetElement, {
        type: 'line',
        data: {
            labels: lables,
            datasets: [{
                label: 'Closing price at date',
                data: data,
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }
    });
}