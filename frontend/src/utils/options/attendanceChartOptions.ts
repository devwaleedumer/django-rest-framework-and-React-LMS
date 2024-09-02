export const attendanceSeries = [{
    name: 'Present',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
}, {
    name: 'Absent',
    data: [5, 41, 36, 26, 45, 48, 52, 53, 41]
}]

export const attendanceChartOptions: ApexCharts.ApexOptions = {
    chart: {
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',

        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
        title: {
            text: ''
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {

        }

    }
}


