const pages = {
    home: `
        <div class="hero">
            <h1>Orlando's Intelligence-Driven MSP</h1>
            <p>Beyond IT Support. We provide 24/7 Digital Fortification.</p>
            <div class="live-stats glass-card">
                <div><span>Threats Blocked Today:</span> 12,402</div>
                <div><span>System Uptime:</span> 99.99%</div>
            </div>
        </div>`,
    services: `
        <h2>Advanced MSP Solutions</h2>
        <div class="grid">
            <div class="glass-card"><h3>Zero Trust Access</h3><p>Identity-based security for hybrid Orlando workforces.</p></div>
            <div class="glass-card"><h3>MDR & EDR</h3><p>Managed detection and rapid response for ransomware.</p></div>
            <div class="glass-card"><h3>Cloud Governance</h3><p>Optimizing Azure and AWS for Florida's top firms.</p></div>
        </div>`,
    portfolio: `
        <h2>Business Impact</h2>
        <div class="glass-card">
            <h3>Medical Center Network Rebuild</h3>
            <p>Migrated legacy infrastructure to a secure, HIPAA-compliant SD-WAN environment.</p>
        </div>`
};

function showPage(pageId) {
    document.getElementById('app-viewport').innerHTML = pages[pageId] || pages.home;
}

// Gemini API Communication
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-msg');
    const display = document.getElementById('chat-display');
    
    display.innerHTML += `<div><b>You:</b> ${input.value}</div>`;
    
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: input.value })
    });
    
    const data = await response.json();
    display.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
    input.value = '';
});

// Init
showPage('home');
