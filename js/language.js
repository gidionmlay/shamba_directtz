// public/js/language-toggle.js

document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleMobile = document.getElementById('language-toggle-mobile');
    const htmlElement = document.documentElement; // The <html> tag

    // Define your translations
    const translations = {
        en: {
            // Header
            about_us_title: "About | Shamba Direct",
            nav_home: "Home",
            nav_service: "Service",
            nav_about: "About",
            nav_reach_us: "Reach Us",
            auth_login: "Log in",
            auth_register: "Register",
            auth_admin: "Admin",

            // Hero Section
            hero_title: "About Us",
            hero_description: "Shamba Direct is a digital AgriTech platform empowering smallholder and medium-scale farmers across Tanzania. We connect farmers directly with verified suppliers, ensuring access to quality agricultural inputs and essential support services. Our mission is to transform farming practices by making agricultural resources more accessible, affordable, and efficient.",

            // Mission Section
            mission_title: "We make sure your idea & creation are delivered properly",
            mission_paragraph_1: "Shamba Direct provides a complete solution for farmers to access quality inputs and support. We connect farmers directly with verified suppliers, ensuring access to quality agricultural inputs and essential support services. Our mission is to transform farming practices by making agricultural resources more accessible, affordable, and efficient.",
            mission_paragraph_2: "We focus on providing a seamless experience, from easy ordering through our mobile app, USSD, or WhatsApp, to flexible payment options like mobile money, bank transfer, cash on delivery, or even credit.",

            // Empowerment Section
            empowerment_title: "We empower smallholder farmers",
            empowerment_paragraph_1: "We understand the challenges smallholder farmers face. That's why Shamba Direct focuses on providing financial inclusion and access to credit, helping farmers build their credit score through purchase history to access inputs on installment.",
            empowerment_paragraph_2: "Our platform ensures access to verified seeds, fertilizers, pesticides, and farming tools from trusted suppliers, guaranteeing quality for every product.",
            testimonial_quote: "\"Shamba Direct has revolutionized how I get my farm inputs. The credit option is a game-changer!\"",
            testimonial_author: "- Happy Farmer, Morogoro",

            // Growth Support Section
            growth_section_title: "We help farmers grow faster and bigger",
            growth_card_1_title: "Verified Suppliers",
            growth_card_1_description: "Partnering with trusted agro-input providers for quality assurance.",
            growth_card_2_title: "Flexible Payment",
            growth_card_2_description: "Pay via mobile money, bank, or cash on delivery.",
            growth_card_3_title: "Order Tracking",
            growth_card_3_description: "Real-time delivery updates and support through chatbots.",

            // Why Choose Us Section
            why_choose_us_title: "Why Choose Us?",
            reason_card_1_title: "Transparent Pricing",
            reason_card_1_description: "No hidden costs — what you see is what you pay. We promote fair trade and price integrity.",
            reason_card_2_title: "Inclusive & Farmer-Centered",
            reason_card_2_description: "Designed with smallholder and medium-scale farmers in mind, Shamba Direct empowers you to grow smarter and earn more.",
            reason_card_3_title: "Community & Trust",
            reason_card_3_description: "We’re building a community of farmers, agents, and partners who care about agricultural success across Tanzania.",
            reason_card_4_title: "Farmer Education & Support",
            reason_card_4_description: "Access farming tips, product usage guides, and real-time help from our 24/7 support chatbot and expert articles.",
            reason_card_5_title: "Multiple Access Channels",
            reason_card_5_description: "Order via Web App, WhatsApp, or USSD, ensuring both digital and non-digital users can benefit.",
            reason_card_6_title: "Flexible Payments & Credit Support",
            reason_card_6_description: "Pay your way: use mobile money, cards, or access credit through our vetted financial partners.",
            
            // Footer
            footer_tagline: "Empowering Farmers. Connecting Inputs. Growing Together.",
            footer_quick_links_heading: "Quick Links",
            footer_link_home: "Home",
            footer_link_about_us: "About Us",
            footer_link_products: "Products",
            footer_link_reach_us: "Reach Us",
            footer_link_faqs: "FAQs",
            footer_contact_support_heading: "Contact & Support",
            footer_chat_with_us: "Chat with us",
            footer_access_channels_heading: "Access Channels",
            access_channel_web_portal: "Web Portal",
            access_channel_whatsapp: "WhatsApp Ordering",
            access_channel_ussd: "USSD Access",
            footer_follow_us_heading: "Follow Us",
            footer_copyright: "2025 Shamba Direct. All rights reserved.",
            footer_terms_of_service: "Terms of Service",
            footer_privacy_policy: "Privacy Policy",

            // Chatbot
            chatbot_header: "Shamba Bot",
            chatbot_input_placeholder: "Type your message...",
            chatbot_send_button: "Send",
            chatbot_footer_text: "Powered by Shamba Direct"
        },
        sw: {
            // Header
            about_us_title: "Kuhusu Sisi | Shamba Direct",
            nav_home: "Nyumbani",
            nav_service: "Huduma",
            nav_about: "Kuhusu",
            nav_reach_us: "Tufikie",
            auth_login: "Ingia",
            auth_register: "Jisajili",
            auth_admin: "Msimamizi",

            // Hero Section
            hero_title: "Kuhusu Sisi",
            hero_description: "Shamba Direct ni jukwaa la kidijitali la AgriTech linalowawezesha wakulima wadogo na wa kati kote Tanzania. Tunawaunganisha wakulima moja kwa moja na wasambazaji waliothibitishwa, kuhakikisha wanapata pembejeo bora za kilimo na huduma muhimu za usaidizi. Dira yetu ni kubadilisha mazoea ya kilimo kwa kufanya rasilimali za kilimo zipatikane kwa urahisi zaidi, kwa bei nafuu, na kwa ufanisi.",

            // Mission Section
            mission_title: "Tunahakikisha wazo na ubunifu wako unawasilishwa ipasavyo",
            mission_paragraph_1: "Shamba Direct inatoa suluhisho kamili kwa wakulima kupata pembejeo bora na msaada. Tunawaunganisha wakulima moja kwa moja na wasambazaji waliothibitishwa, kuhakikisha wanapata pembejeo bora za kilimo na huduma muhimu za usaidizi. Dira yetu ni kubadilisha mazoea ya kilimo kwa kufanya rasilimali za kilimo zipatikane kwa urahisi zaidi, kwa bei nafuu, na kwa ufanisi.",
            mission_paragraph_2: "Tunazingatia kutoa uzoefu usio na mshono, kuanzia kuagiza kwa urahisi kupitia programu yetu ya simu, USSD, au WhatsApp, hadi chaguzi rahisi za malipo kama vile M-Pesa, uhamisho wa benki, malipo wakati wa kupokea, au hata mkopo.",

            // Empowerment Section
            empowerment_title: "Tunawawezesha wakulima wadogo",
            empowerment_paragraph_1: "Tunaelewa changamoto wanazokabiliana nazo wakulima wadogo. Ndiyo maana Shamba Direct inazingatia kutoa ujumuishaji wa kifedha na upatikanaji wa mikopo, kuwasaidia wakulima kujenga alama zao za mikopo kupitia historia ya ununuzi ili kupata pembejeo kwa awamu.",
            empowerment_paragraph_2: "Jukwaa letu linahakikisha upatikanaji wa mbegu zilizothibitishwa, mbolea, viuatilifu, na zana za kilimo kutoka kwa wasambazaji wanaoaminika, kuhakikisha ubora wa kila bidhaa.",
            testimonial_quote: "\"Shamba Direct imebadilisha jinsi ninavyopata pembejeo zangu za kilimo. Chaguo la mkopo limebadilisha mchezo!\"",
            testimonial_author: "- Mkulima Furaha, Morogoro",

            // Growth Support Section
            growth_section_title: "Tunawasaidia wakulima kukua haraka na kwa ukubwa zaidi",
            growth_card_1_title: "Wasambazaji Waliothibitishwa",
            growth_card_1_description: "Kushirikiana na watoa huduma za pembejeo za kilimo wanaoaminika kwa uhakikisho wa ubora.",
            growth_card_2_title: "Malipo Rahisi",
            growth_card_2_description: "Lipa kupitia M-Pesa, benki, au malipo wakati wa kupokea.",
            growth_card_3_title: "Ufuatiliaji wa Oda",
            growth_card_3_description: "Taarifa za wakati halisi za uwasilishaji na usaidizi kupitia roboti za gumzo.",

            // Why Choose Us Section
            why_choose_us_title: "Kwa Nini Utuchague?",
            reason_card_1_title: "Bei za Uwazi",
            reason_card_1_description: "Hakuna gharama za siri — unachokiona ndicho unacholipa. Tunakuza biashara ya haki na uadilifu wa bei.",
            reason_card_2_title: "Jumuishi na Inayomlenga Mkulima",
            reason_card_2_description: "Iliyoundwa kwa kuzingatia wakulima wadogo na wa kati, Shamba Direct inakuwezesha kulima kwa akili zaidi na kupata mapato zaidi.",
            reason_card_3_title: "Jumuiya na Uaminifu",
            reason_card_3_description: "Tunajenga jumuiya ya wakulima, mawakala, na washirika wanaojali mafanikio ya kilimo kote Tanzania.",
            reason_card_4_title: "Elimu na Usaidizi kwa Mkulima",
            reason_card_4_description: "Pata vidokezo vya kilimo, miongozo ya matumizi ya bidhaa, na msaada wa wakati halisi kutoka kwa roboti yetu ya gumzo ya 24/7 na makala ya wataalamu.",
            reason_card_5_title: "Njia Nyingi za Kufikia",
            reason_card_5_description: "Agiza kupitia Tovuti, WhatsApp, au USSD, kuhakikisha watumiaji wa kidijitali na wasio wa kidijitali wanaweza kufaidika.",
            reason_card_6_title: "Malipo Rahisi na Usaidizi wa Mikopo",
            reason_card_6_description: "Lipa kwa njia yako: tumia M-Pesa, kadi, au pata mikopo kupitia washirika wetu wa kifedha waliothibitishwa.",

            // Footer
            footer_tagline: "Kuwawezesha Wakulima. Kuunganisha Pembejeo. Kukua Pamoja.",
            footer_quick_links_heading: "Viungo vya Haraka",
            footer_link_home: "Nyumbani",
            footer_link_about_us: "Kuhusu Sisi",
            footer_link_products: "Bidhaa",
            footer_link_reach_us: "Tufikie",
            footer_link_faqs: "Maswali Yanayoulizwa Mara kwa Mara",
            footer_contact_support_heading: "Mawasiliano na Msaada",
            footer_chat_with_us: "Piga gumzo nasi",
            footer_access_channels_heading: "Njia za Kufikia",
            access_channel_web_portal: "Tovuti",
            access_channel_whatsapp: "Kuagiza kwa WhatsApp",
            access_channel_ussd: "Ufikiaji wa USSD",
            footer_follow_us_heading: "Tufuate",
            footer_copyright: "2025 Shamba Direct. Haki zote zimehifadhiwa.",
            footer_terms_of_service: "Masharti ya Huduma",
            footer_privacy_policy: "Sera ya Faragha",

            // Chatbot
            chatbot_header: "Shamba Boti",
            chatbot_input_placeholder: "Andika ujumbe wako...",
            chatbot_send_button: "Tuma",
            chatbot_footer_text: "Inaendeshwa na Shamba Direct"
        }
    };

    // Function to set the language
    const setLanguage = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        // Update HTML lang attribute
        htmlElement.setAttribute('lang', lang);
        // Store preferred language in local storage
        localStorage.setItem('preferredLanguage', lang);
    };

    // Initialize language based on local storage or default to English
    const initialLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(initialLang);

    // Toggle language on click
    languageToggle.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('lang');
        const newLang = (currentLang === 'en' || currentLang === null) ? 'sw' : 'en';
        setLanguage(newLang);
    });
    
    // Toggle language on mobile click
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', () => {
            const currentLang = htmlElement.getAttribute('lang');
            const newLang = (currentLang === 'en' || currentLang === null) ? 'sw' : 'en';
            setLanguage(newLang);
        });
    }
});