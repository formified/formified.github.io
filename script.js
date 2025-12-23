// Typing Animation
const texts = [
  "Skript Developer",
  "Discord Server Setup Specialist",
  "Plugin Configurator",
  "Discord Server Manager",
  "Minecraft Server Staff",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicText = document.querySelector(".dynamic-text");
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    dynamicText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentText.length) {
    speed = delayBetweenTexts;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(type, speed);
}

// Start typing animation
type();

// Discord Member Counter
async function updateMembers() {
  const elements = document.querySelectorAll(".members[data-guild-id]");

  for (const el of elements) {
    const guildId = el.dataset.guildId;
    if (!guildId) continue;

    try {
      const res = await fetch(
        `https://discord.com/api/guilds/${guildId}/widget.json`,
      );

      if (!res.ok) throw new Error("Widget not available");

      const data = await res.json();

      if (data.presence_count) {
        el.textContent = `${data.presence_count.toLocaleString()} Members`;
      }
    } catch (err) {
      console.log(`Failed to fetch data for guild ${guildId}`);
    }
  }
}

// Update on load
updateMembers();

// Update every 60 seconds
setInterval(updateMembers, 60000);
