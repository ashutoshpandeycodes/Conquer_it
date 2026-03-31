document.getElementById('generate-btn').addEventListener('click', async () => {
    const inputField = document.getElementById('main-quest-input');
    const questText = inputField.value.trim();
    const loadingDiv = document.getElementById('loading');
    const questBoard = document.getElementById('quest-board');
    const generateBtn = document.getElementById('generate-btn');

    if (!questText) {
        alert("Please enter a main quest first!");
        return;
    }

    // 1. Disable the button immediately to prevent double-clicks
    generateBtn.disabled = true;
    generateBtn.innerText = "FORGING QUESTS...";

    // Clear the board from previous runs
    questBoard.innerHTML = '';
    questBoard.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        const response = await fetch('http://localhost:5000/generate-quest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quest: questText })
        });

        // 2. Check if hit the API limit
        if (response.status === 429) {
            throw new Error("The Quest Master is resting. Please try again in a minute.");
        }

        const quests = await response.json();
        loadingDiv.classList.add('hidden');

        if (quests.error) {
            alert("Quest Master error: " + quests.error);
        } else {

            quests.forEach(quest => {
                const questCard = document.createElement('div');
                questCard.className = 'quest-card';
                questCard.innerHTML = `
                    <h3 style="color: #ffffff; margin-top: 0; font-weight: 600; font-size: 1.25rem; letter-spacing: -0.5px;">
                        ${quest.level}: ${quest.title}
                    </h3>
                    <p style="line-height: 1.6; color: #a3a3a3; margin-bottom: 16px;">
                        ${quest.description}
                    </p>
                    <span style="color: #e5e5e5; font-size: 0.85rem; font-weight: 500; background: #333333; padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                        Reward: ${quest.xp} XP
                    </span>
                `;
                questBoard.appendChild(questCard);
            });
            questBoard.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error:", error);
        loadingDiv.classList.add('hidden');
        alert(error.message || "Could not connect to the Quest Master.");
    } finally {
        // 4. Re-enable the button after a 5-second cooldown
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.innerText = "GENERATE QUESTS";
        }, 5000);
    }
});


document.getElementById('main-quest-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('generate-btn').click();
    }
});