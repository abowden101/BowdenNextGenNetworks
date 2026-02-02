const pages = {
    home: `<h1>Next-Gen MSP for Orlando</h1><p>Welcome to BowdenNextGenNetworks...</p>`,
    services: `
        <h1>Managed Services</h1>
        <div class="detail-card">
            <h3>24/7 Threat Monitoring</h3>
            <p>Our Orlando-based SOC uses AI to neutralize ransomware before it spreads.</p>
        </div>`,
    portfolio: `
        <h1>Success Stories</h1>
        <div class="case-study">
            <h3>Enterprise Cloud Migration</h3>
            <p>Secured 500+ endpoints for a Florida healthcare provider using Zero Trust.</p>
        </div>`
};

document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const pageKey = e.target.getAttribute('data-page');
        document.getElementById('content-area').innerHTML = pages[pageKey];
    });
});
