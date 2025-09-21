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
});
