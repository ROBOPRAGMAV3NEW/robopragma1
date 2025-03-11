document.addEventListener('DOMContentLoaded', () => {
  const activateButton = document.querySelector('.activate-button');
  const tableContainer = document.querySelector('.table-container');
  const loadingText = document.querySelector('.loading-text');
  const cheatText = document.querySelector('.cheat-text');
  const finalText = document.querySelector('.final-text');
  const buttons = document.querySelector('.buttons');
  const robotContainer = document.querySelector('.robot-container');
  const tableRows = document.querySelectorAll('.table-container tbody tr');
  const checkboxButtons = document.querySelectorAll('.checkbox-button');

  // Checkbox button click handler
  checkboxButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('checked'); // Toggle the 'checked' class
    });
  });

  activateButton.addEventListener('click', () => {
    // 1. Hide initial elements
    activateButton.style.display = 'none';
    buttons.style.display = 'none';
    robotContainer.style.display = 'none';

    // 2. Show table and "Mengaktivasi..." text
    tableContainer.style.display = 'block';

    // 3. Simulate loading and animate percentages with a smoother transition
    tableRows.forEach(row => {
      const percentageCell = row.querySelector('td:last-child');
      const finalPercentage = parseInt(percentageCell.dataset.final, 10);
      let currentPercentage = 0;

      const interval = setInterval(() => {
        currentPercentage++; // Increment percentage by 1
        percentageCell.textContent = `${currentPercentage}%`;

        // Slow down the increment to make it smoother
        if (currentPercentage >= finalPercentage) {
          clearInterval(interval);
          percentageCell.textContent = 'AKTIF'; // Change to "AKTIF" after reaching final value
        }
      }, 50); // Slower animation (50ms delay between increments, you can increase this value for an even slower effect)
    });

    // 4. Show "Loading..." after a delay
    setTimeout(() => {
      loadingText.style.display = 'block';
    }, 1000);

    // 5. Show "MENGAKTIVASI CHEAT..." after loading is complete
    setTimeout(() => {
      loadingText.style.display = 'none'; // Hide "Loading..."
      cheatText.style.display = 'block'; // Show "MENGAKTIVASI CHEAT..."

      // 6. Show "MENUJU KE SITUS CHEAT..." and redirect
      setTimeout(() => {
        cheatText.style.display = 'none';
        finalText.style.display = 'block';

        setTimeout(() => {
          window.location.href = 'https://bajawantt.store/';
        }, 5000); // Redirect after 2 seconds
      }, 6000);

    }, 5000); // Longer delay to account for percentage animation
  });
});
