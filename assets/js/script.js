// Event listener for form submission
document.getElementById('vendorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get values from the form
    const learningType = document.getElementById('learning_type').value;
    const industry = document.getElementById('industry').value;
    const preferredOutcomes = document.getElementById('preferred_outcomes').value;

    // Send data to API
    const response = await fetch('http://localhost:3000/api/match-vendors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            learning_type: learningType,
            industry: industry,
            preferred_outcomes: preferredOutcomes
        })
    });

    // Handle the response
    const data = await response.json();
    const resultsDiv = document.getElementById('results');

    if (response.ok) {
        resultsDiv.innerHTML = '<h3>Matched Vendors:</h3><ul>' + data.vendors.map(vendor => `<li>${vendor.vendor_name} (Score: ${vendor.total_match_score})</li>`).join('') + '</ul>';
    } else {
        resultsDiv.innerHTML = `<p>${data.message}</p>`;
    }
});
