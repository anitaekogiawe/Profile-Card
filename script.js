 // To display current time in milliseconds
    const timeEl = document.querySelector('[data-testid="test-user-time"]');

    function updateTime() {

      timeEl.textContent = Date.now();

    }

    updateTime();

    // To optionally update every second

    setInterval(updateTime, 1000);

  