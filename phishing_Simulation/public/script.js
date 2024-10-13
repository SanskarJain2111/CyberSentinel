let userActions = {
    clickedMaliciousLink: false,
    reportedAsScam: false,
    enteredCredentials: false
};

document.getElementById('start-simulation').addEventListener('click', async () => {
    const response = await fetch('/api/template/random');
    const phishingTemplate = await response.text();
    document.getElementById('phishing-template').innerHTML = phishingTemplate;
    document.getElementById('simulation-container').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', () => {
    const reportButton = document.getElementById('report-scam');
    const generateReportButton = document.getElementById('generate-report');
    const downloadReportButton = document.getElementById('download-report');
    const fileFormatSelect = document.getElementById('file-format');

    if (reportButton) {
        reportButton.addEventListener('click', () => {
            userActions.reportedAsScam = true;
            alert('Reported as a scam!');
        });
    }

    const phishingTemplateContainer = document.getElementById('phishing-template');
    phishingTemplateContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            userActions.clickedMaliciousLink = true;
            window.open(e.target.href, '_blank');
            e.preventDefault();
            alert('You clicked on a malicious link! The fake login page has been opened in a new tab.');
        }
    });

    if (generateReportButton) {
        generateReportButton.addEventListener('click', () => {
            let report = '<h3>Your Report:</h3><ul>';
            if (userActions.clickedMaliciousLink) {
                report += '<li>You clicked on a malicious link!</li>';
                userActions.enteredCredentials = confirm('Did you enter your credentials on the fake login page?');
                if (userActions.enteredCredentials) {
                    report += '<li>You entered your credentials on a fake login page!</li>';
                }
            }
            if (userActions.reportedAsScam) {
                report += '<li>You successfully reported the email as a scam.</li>';
            }

            let awarenessScore = 100;
            if (userActions.clickedMaliciousLink) {
                awarenessScore = 50;
                if (userActions.enteredCredentials) {
                    awarenessScore = 0;
                }
            }
            if (userActions.reportedAsScam && !userActions.clickedMaliciousLink && !userActions.enteredCredentials) {
                awarenessScore = 100;
            } else if (userActions.reportedAsScam && userActions.clickedMaliciousLink) {
                awarenessScore = 75;
            }

            report += `</ul><h4>Awareness Percentage: ${awarenessScore}%</h4><h4>Tips:</h4><ul>`;
            if (!userActions.reportedAsScam && userActions.clickedMaliciousLink) {
                report += '<li>Always report suspicious emails to your IT team or service provider.</li>';
            }
            if (userActions.enteredCredentials) {
                report += '<li>Change your password immediately if you entered it on a phishing site.</li>';
            }
            report += '<li>Be cautious of emails asking for sensitive information, even if they appear legitimate.</li>';
            report += '</ul>';

            document.getElementById('report').innerHTML = report;

            downloadReportButton.style.display = 'block';
        });
    }

    if (downloadReportButton) {
        downloadReportButton.addEventListener('click', () => {
            const reportContent = document.getElementById('report').innerText; 
            const selectedFormat = fileFormatSelect.value;

            if (selectedFormat === 'txt') {
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'phishing_simulation_report.txt';
                link.click();
            } else if (selectedFormat === 'pdf') {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.text(reportContent, 10, 10);
                doc.save('phishing_simulation_report.pdf');
            }
        });
    }
});
