    // Weight Converter Logic
    const weightForm = document.getElementById('weight-form');
    if (weightForm) {
        // Conversion rates to kilograms
        const toKg = {
            kg: 1,
            g: 0.001,
            lb: 0.453592,
            oz: 0.0283495
        };
        const fromKg = {
            kg: 1,
            g: 1000,
            lb: 2.20462,
            oz: 35.274
        };
        weightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('weight-amount').value);
            const from = document.getElementById('weight-from').value;
            const to = document.getElementById('weight-to').value;
            if (amount >= 0 && toKg[from] && fromKg[to]) {
                const kg = amount * toKg[from];
                const converted = kg * fromKg[to];
                document.getElementById('weight-result').textContent = `${amount} ${from} = ${converted.toFixed(4)} ${to}`;
            } else {
                document.getElementById('weight-result').textContent = 'Please enter valid values.';
            }
        });
    }
    // Currency Converter Logic (static rates)
    const currencyForm = document.getElementById('currency-form');
    if (currencyForm) {
        // Example static rates (1 USD = ...)
        const rates = {
            USD: 1,
            EUR: 0.93,
            INR: 83.2,
            GBP: 0.8
        };
        currencyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('currency-amount').value);
            const from = document.getElementById('currency-from').value;
            const to = document.getElementById('currency-to').value;
            if (amount >= 0 && rates[from] && rates[to]) {
                // Convert to USD first, then to target
                const usd = amount / rates[from];
                const converted = usd * rates[to];
                document.getElementById('currency-result').textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
            } else {
                document.getElementById('currency-result').textContent = 'Please enter valid values.';
            }
        });
    }
    // Loan Interest Calculator Logic
    const loanForm = document.getElementById('loan-form');
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('loan-amount').value);
            const rate = parseFloat(document.getElementById('loan-rate').value) / 100 / 12;
            const years = parseInt(document.getElementById('loan-years').value);
            const n = years * 12;
            if (amount > 0 && rate >= 0 && years > 0) {
                let monthly;
                if (rate === 0) {
                    monthly = amount / n;
                } else {
                    monthly = amount * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1);
                }
                const total = monthly * n;
                document.getElementById('loan-result').textContent = `Monthly Payment: $${monthly.toFixed(2)} | Total Payment: $${total.toFixed(2)}`;
            } else {
                document.getElementById('loan-result').textContent = 'Please enter valid values.';
            }
        });
    }
// Basic calculator logic for button clicks
window.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.calculator-display');
    const buttons = document.querySelectorAll('.calculator-buttons button');
    let current = '';
    let resetNext = false;

    function updateDisplay(val) {
        display.textContent = val || '0';
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const value = btn.textContent;
            if (value === 'AC') {
                current = '';
                updateDisplay('0');
            } else if (value === 'DEL') {
                current = current.slice(0, -1);
                updateDisplay(current);
            } else if (value === '=') {
                try {
                    let expr = current.replace(/x/g, '*');
                    let result = eval(expr);
                    updateDisplay(result);
                    current = result.toString();
                    resetNext = true;
                } catch {
                    updateDisplay('Error');
                    current = '';
                    resetNext = true;
                }
            } else {
                if (resetNext) {
                    current = '';
                    resetNext = false;
                }
                current += value;
                updateDisplay(current);
            }
        });
    });
    updateDisplay('0');

    // BMI Calculator Logic
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const heightCm = parseFloat(document.getElementById('bmi-height').value);
            if (weight > 0 && heightCm > 0) {
                const heightM = heightCm / 100;
                const bmi = weight / (heightM * heightM);
                let category = '';
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 25) category = 'Normal weight';
                else if (bmi < 30) category = 'Overweight';
                else category = 'Obese';
                document.getElementById('bmi-result').textContent = `BMI: ${bmi.toFixed(2)} (${category})`;
            } else {
                document.getElementById('bmi-result').textContent = 'Please enter valid values.';
            }
        });
    }
});
