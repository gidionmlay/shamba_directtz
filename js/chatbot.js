document.addEventListener('DOMContentLoaded', () => {
    // Swahili FAQ Responses
    const faqResponses = {
        "agiza": "Unaweza kuagiza vifaa (inputs) kwa urahisi kupitia tovuti yetu au app ya simu. Nenda kwenye ‘Bidhaa’, chagua unachohitaji, kisha fuata maelekezo ya kuweka agizo.",
        "mkopo": "Kwa mfumo wetu wa mkopo, wakulima wanaostahili wanaweza kupata vifaa sasa, halafu walipa baada ya mavuno – bila shida!",
        "wasilisha": "Tunawasilisha vifaa kwa siku 3-5 za kazi kwa maeneo mengi Tanzania. Upate kilichohitajika karibu nawe!",
        "mawasiliano": "Tupigie kupitia WhatsApp (+254 700 123 456) au tutumie barua pepe (huduma@shambadirect.com). Tuko tayari kukusaidia!",
        "rasilimali": "Kwenye sehemu ya ‘Rasilimali’, utapata mafunzo, miongozo ya kilimo, na vitabu muhimu – zote kwa matumizi yako!"
    };

    // Common Swahili question variations for better NLP
    const keywordMappings = {
        "agiza": ["agiza", "nunua", "pata", "order", "kuagiza", "agizo", "namna ya kuagiza", "bidhaa", "vifaa", "omba"],
        "mkopo": ["mkopo", "kulipa", "malipo", "deni", "salio", "credit", "mikopo", "fedha", "pesa"],
        "wasilisha": ["wasilisha", "lete", "delivery", "fika", "mizigo", "usafirishaji", "mletee", "leta"],
        "mawasiliano": ["mawasiliano", "piga", "ongea", "contact", "namba", "email", "whatsapp", "simu", "barua pepe"],
        "rasilimali": ["rasilimali", "mafunzo", "miongozo", "vitabu", "jifunze", "elimu", "resources", "shamba", "kilimo"]
    };

    // Small talk responses
    const smallTalkResponses = {
        "jambo": "Jambo Nipo hapa kukusaidia. Una swali lolote kuhusu Shamba Direct?",
        "habari": "Nzuri sana Nawe je? Niko tayari kukuhudumia.",
        "asante": "Karibu sana Ni furaha yangu kukuhudumia.",
        "shukrani": "Raha tele Niko hapa wakati wowote unaponihitaji.",
        "mambo": "Poa! Niko tayari kukusaidia. Una swali gani leo?",
        "salamu": "Salama kabisa Niko Shamba Bot, nimefurahi kukuona.",
        "niaje": "Safi sana! Mimi niko poa tu. Ungependa kukusaidiaje?",
        "wewe ni nani": "Mimi ni Shamba Bot, msaidizi wako wa Shamba Direct. Nipo hapa kujibu maswali yako.",
        "unafanya nini": "Nafanya kazi ya kujibu maswali yako kuhusu huduma za Shamba Direct kama vile kuagiza, mikopo, na uwasilishaji.",
        "mshamba bot": "Ndiyo, mimi ni Shamba Bot! Niko hapa kukuhudumia.",
        "bye": "Kwaheri Asante kwa kuwasiliana nami. Karibu tena!"
    };

    // DOM Elements - Added checks to ensure elements exist
    const chatbotToggle = document.querySelector(".chatbot-toggle");
    const chatbotWindow = document.querySelector(".chatbot-window");
    const closeChat = document.querySelector(".close-chat");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const typingIndicator = document.getElementById("typingIndicator"); // Added for the typing effect

    // Ensure all required elements are found before proceeding
    if (!chatbotToggle || !chatbotWindow || !closeChat || !chatForm || !chatInput || !chatMessages || !typingIndicator) {
        console.error("Chatbot: One or more required DOM elements not found. Check your HTML IDs and classes.");
        return; // Stop execution if elements are missing
    }

    // Function to append messages to the chat window
    function appendMessage(sender, message) {
        const div = document.createElement("div");
        div.className = sender + "-msg";
        // Convert newlines to <br> for HTML display
        div.innerHTML = message.replace(/\n/g, '<br>');
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }

    // Function to generate bot response
    function respondTo(msg) {
        let response = "Samahani, bado sijakuelewa vizuri. Tafadhali jaribu kuniuliza kuhusu:\n\n" +
                       "- **Kuagiza** bidhaa\n" +
                       "- Mfumo wa **mkopo**\n" +
                       "- **Uwasilishaji** wa vifaa\n" +
                       "- **Mawasiliano** yetu\n" +
                       "- **Rasilimali** za kilimo\n\n" +
                       "Au unaweza kuniambia **jambo**, **habari**, au **asante**!";

        // 1. Check for small talk first
        for (const greeting in smallTalkResponses) {
            if (msg.includes(greeting)) {
                response = smallTalkResponses[greeting];
                break; // Found a small talk match
            }
        }

        // 2. If no small talk match, check for FAQ responses using keyword mappings
        if (response.startsWith("Samahani")) { // Only check FAQ if no small talk match yet
            for (const key in keywordMappings) {
                const keywords = keywordMappings[key];
                for (let i = 0; i < keywords.length; i++) {
                    // Use a more robust check for whole words if needed, but 'includes' is simple for now
                    // Example: if (msg.split(/\s+/).includes(keywords[i])) { ... }
                    if (msg.includes(keywords[i])) {
                        response = faqResponses[key];
                        break; // Found an FAQ match
                    }
                }
                if (response !== "Samahani, bado sijakuelewa vizuri. Tafadhali jaribu kuniuliza kuhusu:\n\n" +
                                   "- **Kuagiza** bidhaa\n" +
                                   "- Mfumo wa **mkopo**\n" +
                                   "- **Uwasilishaji** wa vifaa\n" +
                                   "- **Mawasiliano** yetu\n" +
                                   "- **Rasilimali** za kilimo\n\n" +
                                   "Au unaweza kuniambia **jambo**, **habari**, au **asante**!") {
                    break; // Stop outer loop if an FAQ response was found
                }
            }
        }

        // Show typing indicator
        typingIndicator.classList.remove('hidden');
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to show indicator

        // Delay bot response
        setTimeout(() => {
            typingIndicator.classList.add('hidden'); // Hide typing indicator
            appendMessage("bot", response);
        }, 800); // Increased delay slightly for better typing effect
    }

    // --- Event Listeners ---

    // Toggle chatbot window visibility
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.classList.toggle("active");
        if (chatbotWindow.classList.contains("active")) {
            // Clear messages and add initial greeting each time it's opened
            chatMessages.innerHTML = '<div id="typingIndicator" class="bot-msg hidden">...</div>'; // Re-add typing indicator
            appendMessage("bot", "Habari rafiki! Mimi ni Shamba Bot, niko hapa kukusaidia na maswali yako kuhusu Shamba Direct. Ungependa kufahamu kuhusu nini?");
            chatInput.focus(); // Focus on input field
        }
    });

    // Close chatbot window
    closeChat.addEventListener("click", () => {
        chatbotWindow.classList.remove("active");
    });

    // Handle form submission
    chatForm.addEventListener("submit", async e => {
        e.preventDefault(); // Prevent page reload
        const userMsg = chatInput.value.trim();

        if (!userMsg) {
            // Optionally, shake input or show a temporary error message
            chatInput.placeholder = "Tafadhali andika ujumbe!";
            setTimeout(() => { chatInput.placeholder = "Andika ujumbe wako..."; }, 1500);
            return;
        }

        appendMessage("user", userMsg);

        // BACKEND: Send user message to /api/chatbot and display response
        // Expected request: { message: string }
        // Expected response: { reply: string }
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await response.json();
            if (data.reply) {
                // Show typing indicator for effect
                typingIndicator.classList.remove('hidden');
                chatMessages.scrollTop = chatMessages.scrollHeight;
                setTimeout(() => {
                    typingIndicator.classList.add('hidden');
                    appendMessage("bot", data.reply);
                }, 800);
            } else {
                respondTo(userMsg.toLowerCase()); // Fallback to local logic if no backend reply
            }
        } catch (error) {
            console.error('Chatbot API error:', error);
            respondTo(userMsg.toLowerCase()); // Fallback to local logic on error
        }
        chatInput.value = ""; // Clear input field
    });
});