$(document).ready(function () {
  const problemsChartObject = document.getElementById('problemsChart').getContext('2d');
  const problemsChart = new Chart(problemsChartObject, {
    type: 'bar',
    data: {
      labels: ['Scanner', 'Software', 'MS Office', 'Wifi', 'Printer', 'Other'],
      datasets: [{
        label: 'No. of times problem occured',
        backgroundColor: ['red', 'red', 'orange', 'green', 'green', 'grey', 'grey'],
        borderWidth: 1,
        borderColor: '#555',
        hoverBorderWidth: 5,
        data: [45, 30, 17, 10, 9, 3],
      }],
    },
    options: {
      title: {
        display: true,
        text: 'Most Common Problems'
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 50,
          right: 50
        }
      }
    }
  });

  const specialistChartObject = document.getElementById('specialistChart').getContext('2d');

  const specialistChart = new Chart(specialistChartObject, {
    type: 'bar',
    data: {
      labels: ['Bert', 'Clara', 'Bill', 'Tim', 'Kim'],
      datasets: [{
        label: 'No. of times specialist referred',
        backgroundColor: ['red', 'red', 'orange', 'green', 'green'],
        borderWidth: 1,
        borderColor: '#555',
        hoverBorderWidth: 5,
        data: [8, 6, 4, 2, 1],
      }],
    },
    options: {
      title: {
        display: true,
        text: 'Number of issues assigned per specialist'
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 50,
          right: 50
        }
      }
    }
  });
})


function generateSpecialistChart(issues) {
  $('#specialistPieChart').remove();
  $('body').append('<canvas class="d-inline-block" id="specialistPieChart"><canvas>');
  const specialistPieChartObject = document.getElementById('specialistPieChart').getContext('2d');
  const issuesSolved = issues.getAttribute('data-solved')
  const issuesReferred = issues.getAttribute('data-referred')
  const issuesPending = issues.getAttribute('data-pending')
  const specialistPieChart = new Chart(specialistPieChartObject, {
    type: 'doughnut',
    data: {
      labels: ['Solved', 'Forwarded', 'Pending'],
      datasets: [{
        label: 'No. of times specialist referred',
        backgroundColor: ['green', 'red', 'orange'],
        borderWidth: 1,
        borderColor: '#555',
        hoverBorderWidth: 5,
        data: [issuesSolved, issuesReferred, issuesPending]
      }],
    },
    options: {
      title: {
        display: true,
        text: `${issues.value} - Average solving time: 30s`
      },
      legend: {
        display: true
      },
    },
    plugins: [{
      beforeDraw: function ({ chart }) {
        const totalIssues = Number(issuesPending) + Number(issuesReferred) + Number(issuesSolved)
        const percentageOfIssuesSolved = Math.round(issuesSolved * 100 / totalIssues, 2)
        const width = chart.width
        const height = chart.height
        const context = chart.ctx;
        context.restore();
        const font = Math.round(((height + width) / 220)).toString();
        context.font = font + "rem sans-serif";
        context.textBaseline = "middle";
        const text = `${percentageOfIssuesSolved}%`
        const textX = Math.round((width - context.measureText(text).width) / 2)
        const textY = height / 1.8
        context.fillText(text, textX, textY)
        context.fillStyle = 'green'
        context.save()
      }
    }]
  });
}
