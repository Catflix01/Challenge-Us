var totalPoints = 0;
var completedDares = [];

var dareCategories = {
    "physical": [
        { dare: "Do 10 push-ups.", points: 10, image: "physical_pushups.png" },
        { dare: "Run around the block.", points: 20, image: "physical_running.png" },
        { dare: "Try a handstand.", points: 30, image: "physical_handstand.png" },
        { dare: "Run", points: 30, image: "physical_running.png" },
    ],
    "social": [
        { dare: "Start a conversation with a stranger.", points: 15, image: "social_conversation.png" },
        { dare: "Compliment someone you don't know.", points: 20, image: "social_compliment.png" },
        { dare: "Ask for a high-five from a passerby.", points: 25, image: "social_highfive.png" }
    ],
    "creative": [
        { dare: "Draw a self-portrait blindfolded.", points: 20, image: "creative_blindfolded.png" },
        { dare: "Write a short poem about the weather.", points: 25, image: "creative_poem.png" },
        { dare: "Create a dance to a random song.", points: 30, image: "creative_dance.png" }
    ],
    // Add more dare categories and dares as needed
};

function generateDare() {
    var selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
    if (selectedCategories.length !== 1) {
        alert("Please only select one category.");
        return;
    }
    var category = selectedCategories[0];
    var dareList = dareCategories[category];
    if (!dareList || dareList.length === 0) {
        return null;
    }
    var randomIndex = Math.floor(Math.random() * dareList.length);
    return dareList.splice(randomIndex, 1)[0];
}

function displayDare(dare) {
    var dareContainer = document.getElementById('dare-container');
    var dareItem = document.createElement('div');
    dareItem.classList.add('dare-item');
    dareItem.innerHTML = "<img src='images/" + dare.image + "' alt='" + dare.dare + "'><p>" + dare.dare + "</p><span class='points'>" + dare.points + " points</span><label><input type='checkbox' class='completed-checkbox'> Completed</label>";
    dareContainer.appendChild(dareItem);
}

function updatePoints() {
    var points = 0;
    completedDares.forEach(function (dare) {
        points += dare.points;
    });
    totalPoints = points;
    document.getElementById('total-points').textContent = "Total Points: " + totalPoints;
}

document.getElementById('generate-btn').addEventListener('click', function() {
    var dareContainer = document.getElementById('dare-container');
    dareContainer.innerHTML = '';
    var dare = generateDare();
    if (dare) {
        displayDare(dare);
    } else {
        dareContainer.textContent = 'Out of dares';
    }
});

document.getElementById('dare-container').addEventListener('change', function(event) {
    if (event.target && event.target.matches('.completed-checkbox')) {
        var dareItem = event.target.closest('.dare-item');
        var dareIndex = parseInt(dareItem.dataset.index);
        if (event.target.checked) {
            completedDares.push({
                points: parseInt(dareItem.querySelector('.points').textContent),
                index: dareIndex
            });
        } else {
            completedDares = completedDares.filter(function(dare) {
                return dare.index !== dareIndex;
            });
        }
        updatePoints();
    }
});

// Add Custom Dare functionality
document.getElementById('add-dare-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var dareInput = document.getElementById('dare-input').value.trim();
    var pointsInput = parseInt(document.getElementById('points-input').value);
    var categorySelect = document.getElementById('category-select').value;

    if (!dareInput || isNaN(pointsInput) || pointsInput <= 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    var customDare = { dare: dareInput, points: pointsInput, category: categorySelect };
    customDares.push(customDare);
    localStorage.setItem('customDares', JSON.stringify(customDares));

    // Clear form fields
    document.getElementById('dare-input').value = '';
    document.getElementById('points-input').value = '';
    document.getElementById('category-select').selectedIndex = 0;

    alert("Custom dare added successfully!");
});
