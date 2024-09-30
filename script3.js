function response(choice) {
    const resultDiv = document.getElementById('result');
    
    if (choice === 'clickLink') {
        resultDiv.innerHTML = `<p class="error">You clicked the link. This could lead to a phishing site. Always verify links before clicking!</p>`;
    } else if (choice === 'callBank') {
        resultDiv.innerHTML = `<p class="success">Good choice! Calling the bank directly is a safe way to verify requests.</p>`;
    } else if (choice === 'deleteEmail') {
        resultDiv.innerHTML = `<p class="neutral">Deleting the email is a cautious choice, but consider reporting it for others' safety.</p>`;
    }
}
