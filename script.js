// Create and append loading screen
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader">
            <div class="loader-circle"></div>
        </div>
        <h2 class="loading-text">7th CPC Calculator</h2>
        <p class="loading-subtext">Loading...</p>
    `;
    document.body.insertBefore(loadingScreen, document.body.firstChild);
}

// Loading Screen Handler
window.addEventListener('load', function() {
    // Initialize ads after content is loaded
    initializeAds();
    
    // Create loading screen if it doesn't exist
    if (!document.querySelector('.loading-screen')) {
        createLoadingScreen();
    }

    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.container');
    
    // Show loading screen
    loadingScreen.style.display = 'flex';
    mainContent.style.display = 'none';
    
    setTimeout(function() {
        // Hide loading screen
        loadingScreen.classList.add('fade-out');
        
        // Show main content
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
        
        // Remove loading screen after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500); // Show loading screen for 1.5 seconds
});

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    calculateBtn.addEventListener('click', calculateSalary);

    // Add event listener for pay level change
    document.getElementById('payLevel').addEventListener('change', function() {
        // Removed the filterBasicPayOptions function call
    });
});

function calculateSalary() {
    // Get input values
    const basicPay = parseFloat(document.getElementById('basicPay').value) || 0;
    const payLevel = document.getElementById('payLevel').value;
    const cityCategory = document.getElementById('cityCategory').value;
    const taType = document.getElementById('taType').value;

    // Validate inputs
    if (!basicPay || !payLevel || !cityCategory || !taType) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate DA (53% of Basic Pay)
    const daPercentage = 53;
    const da = (basicPay * daPercentage) / 100;

    // Calculate HRA based on city category
    let hra = 0;
    if (cityCategory !== 'NO_HRA') {
        let hraPercentage;
        switch (cityCategory) {
            case 'X':
                hraPercentage = 24;
                break;
            case 'Y':
                hraPercentage = 16;
                break;
            case 'Z':
                hraPercentage = 8;
                break;
            default:
                hraPercentage = 0;
        }
        hra = (basicPay * hraPercentage) / 100;
    }

    // Calculate Transport Allowance
    const baseTA = parseFloat(taType);
    const taDA = (baseTA * daPercentage) / 100;
    const totalTA = baseTA + taDA;

    // Calculate Gross Salary
    const grossSalary = basicPay + da + hra + totalTA;

    // Update results
    updateResults({
        basicPay: basicPay,
        da: da,
        hra: hra,
        ta: totalTA,
        gross: grossSalary
    });
}

function updateResults(results) {
    // Format numbers to Indian currency format
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    // Update DOM elements
    document.getElementById('resultBasicPay').textContent = formatter.format(results.basicPay);
    document.getElementById('resultDA').textContent = formatter.format(results.da);
    document.getElementById('resultHRA').textContent = formatter.format(results.hra);
    document.getElementById('resultTA').textContent = formatter.format(results.ta);
    document.getElementById('resultGross').textContent = formatter.format(results.gross);

    // Add animation effect to results
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.animation = 'fadeIn 0.5s ease-in-out';
    });
}

// Initialize ads
function initializeAds() {
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
