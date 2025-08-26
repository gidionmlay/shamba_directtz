// public/js/language-toggle.js

document.addEventListener('DOMContentLoaded', () => {
    const languageToggleBtn = document.getElementById('language-toggle');
    const languageToggleMobileBtn = document.getElementById('language-toggle-mobile');

    // All your translations here
    const appTranslations = {
        en: {
            page_title: "Shamba Direct - Grow Smarter",
            nav_home: "Home",
            nav_service: "Service",
            nav_about: "About",
            nav_reach_us: "Reach Us",
            auth_login: "Log in",
            auth_register: "Register",

            hero_tagline: "Empowering Farmers",
            hero_title: "Quality Agricultural Inputs at Your Fingertips",
            hero_get_started: "Get started",
            hero_feature1: "Verified Suppliers",
            hero_feature2: "Flexible Payments",
            hero_feature3: "Doorstep Delivery",

            testimonials_title: "What Our Farmers Say",
            testimonials_description: "At Shamba Direct, we're dedicated to empowering farmers with quality inputs and seamless access. Hear directly from those who trust us and are growing smarter every day.",
            testimonials_view_more: "View More",
            testimonial1_name: "Amosi Zakayo",
            testimonial1_location: "Farmer, Arusha",
            testimonial1_text: "\"Shamba Direct saved me 30% on my last seed purchase and the delivery was prompt!\"",
            testimonial2_name: "Juma Said",
            testimonial2_location: "Supplier, Morogoro",
            testimonial2_text: "\"Selling my produce is now so much easier. Shamba Direct connects me directly to buyers without any hidden fees.\"",
            testimonial3_name: "Neema John",
            testimonial3_location: "Farmer, Mbeya",
            testimonial3_text: "\"Accessing credit for inputs used to be a nightmare. Thanks to Shamba Direct, I can now buy what I need when I need it.\"",

            features_label: "FEATURES",
            features_title: "Everything You Need to Grow",
            features_subtitle: "Shamba Direct provides a complete solution for farmers to access quality inputs and support.",
            feature1_title: "Quality Agricultural Inputs",
            feature1_description: "Access to verified seeds, fertilizers, pesticides, and farming tools from trusted suppliers.",
            feature2_title: "Flexible Payment Options",
            feature2_description: "Pay via mobile money, bank transfer, cash on delivery, or buy on credit.",
            feature3_title: "Educational Resources",
            feature3_description: "Access farming tips and product guidelines to improve your agricultural practices.",
            feature4_title: "24/7 Support",
            feature4_description: "Get assistance anytime through our chatbot and customer support team.",
            feature5_title: "Credit System",
            feature5_description: "Build your credit score through purchase history to access inputs on installment.",

            process_label: "PROCESS",
            process_title: "How Shamba Direct Works",
            process_subtitle: "A simple process designed with farmers in mind, from ordering to delivery.",
            process1_title: "Place Your Order",
            process1_description: "Order through our mobile app, USSD, or WhatsApp for maximum convenience.",
            process2_title: "Choose Payment Method",
            process2_description: "Pay via mobile money, bank transfer, cash on delivery, or buy on credit.",
            process3_title: "Track Your Delivery",
            process3_description: "Follow your order in real-time as it makes its way to your location.",
            process4_title: "Receive Quality Products",
            process4_description: "Get verified agricultural inputs delivered directly to your doorstep.",
            process_cta_button: "Start Ordering Now",

            why_choose_us_title: "Why Partner with Us",
            video_label: "See How It Works",
            video_unsupported: "Your browser does not support the video tag.",
            partner_point1_heading: "24/7 Support",
            partner_point1_description: "Our dedicated team is always available to assist your farming journey, day or night.",
            partner_point2_heading: "Flexible Payment Options",
            partner_point2_description: "We offer various payment methods, including mobile money and credit facilities, for your convenience.",
            partner_point3_heading: "Trusted by 1000+ Farmers",
            partner_point3_description: "Join a growing community of farmers who rely on us for quality inputs and reliable service.",
            partner_point4_heading: "Secure & Scalable Platform",
            partner_point4_description: "Our robust platform ensures your transactions are secure and can grow with your needs.",
            partners_cta_button: "Become a Partner",

            knowledge_label: "Knowledge",
            knowledge_title: "Educational Resources",
            knowledge_subtitle: "Access farming knowledge and best practices to improve your agricultural productivity.",
            knowledge_explore_btn: "Explore All Resources",
            resource1_title: "Crop Guides",
            resource1_description: "Comprehensive guides on growing various crops, from planting to harvest.",
            resource1_link: "Browse Guides",
            resource2_title: "Tutorial Videos",
            resource2_description: "Watch step-by-step videos on farming techniques and product application.",
            resource2_link: "Watch Videos",
            resource3_title: "Product Manuals",
            resource3_description: "Detailed instructions for using agricultural inputs effectively and safely.",
            resource3_link: "View Manuals",

            partners_title: "Strategic Partners",
            partner_name1: "Partner 1",
            partner_name2: "Partner 2",
            partner_name3: "Partner 3",
            partner_name4: "Partner 4",
            partner_name5: "Partner 5",
            partner_name1b: "Partner 1", // Duplicates if the names are literally "Partner 1", "Partner 2" etc.
            partner_name2b: "Partner 2",
            partner_name3b: "Partner 3",
            partner_name5b: "Partner 5",

            footer_tagline: "Empowering Farmers. Connecting Inputs. Growing Together.",
            footer_quick_links_heading: "Quick Links",
            footer_link_home: "Home",
            footer_link_about: "About Us",
            footer_link_service: "Service",
            footer_link_reach_us: "Reach Us",
            footer_link_faqs: "FAQs",
            footer_contact_heading: "Contact & Support",
            footer_chat_whatsapp: "Chat with us",
            footer_access_heading: "Access Channels",
            access_channel1: "Web Portal",
            access_channel2: "WhatsApp Ordering",
            access_channel3: "USSD Access",
            footer_follow_us_heading: "Follow Us",
            footer_copyright: "2025 Shamba Direct. All rights reserved.",
            footer_terms: "Terms of Service",
            footer_privacy: "Privacy Policy",

            chatbot_header: "Shamba Bot",
            chatbot_input_placeholder: "Andika ujumbe wako...", // This was already in Swahili, keeping it consistent with placeholder behavior
            chatbot_send_button: "Tuma", // This was already in Swahili, keeping it consistent with button text
            chatbot_powered_by: "Powered by Shamba Direct"
        },
        sw: {
            page_title: "Shamba Direct - Lima Kwa Akili Zaidi",
            nav_home: "Mwanzo",
            nav_service: "Huduma",
            nav_about: "Kuhusu Sisi",
            nav_reach_us: "Wasiliana Nasi",
            auth_login: "Ingia",
            auth_register: "Jisajili",

            hero_tagline: "Kuwawezesha Wakulima",
            hero_title: "Pembejeo Bora za Kilimo Kiganjani Kwako",
            hero_get_started: "Anza Sasa",
            hero_feature1: "Wauzaji Walioidhinishwa",
            hero_feature2: "Njia Rahisi za Malipo",
            hero_feature3: "Uwasilishaji Hadi Mlangoni",

            testimonials_title: "Wakulima Wetu Wanasema Nini",
            testimonials_description: "Shamba Direct imejitolea kuwawezesha wakulima kwa pembejeo bora na urahisi wa upatikanaji. Sikia kutoka kwa wale wanaotuamini na wanakua kwa ufanisi zaidi kila siku.",
            testimonials_view_more: "Tazama Zaidi",
            testimonial1_name: "Amosi Zakayo",
            testimonial1_location: "Mkulima, Arusha",
            testimonial1_text: "\"Shamba Direct iliniokoa 30% kwenye ununuzi wangu wa mwisho wa mbegu na uwasilishaji ulikuwa wa haraka!\"",
            testimonial2_name: "Juma Said",
            testimonial2_location: "Msambazaji, Morogoro",
            testimonial2_text: "\"Kuuza mazao yangu sasa ni rahisi zaidi. Shamba Direct inaniunganisha moja kwa moja na wanunuzi bila ada zozote za siri.\"",
            testimonial3_name: "Neema John",
            testimonial3_location: "Mkulima, Mbeya",
            testimonial3_text: "\"Kupata mikopo kwa ajili ya pembejeo ilikuwa ndoto mbaya. Shukrani kwa Shamba Direct, sasa ninaweza kununua kile ninachohitaji ninapokihitaji.\"",

            features_label: "SIFA KUU",
            features_title: "Kila Unachohitaji Kukua",
            features_subtitle: "Shamba Direct inatoa suluhisho kamili kwa wakulima kupata pembejeo bora na msaada.",
            feature1_title: "Pembejeo Bora za Kilimo",
            feature1_description: "Upatikanaji wa mbegu, mbolea, viuatilifu, na zana za kilimo zilizoidhinishwa kutoka kwa wauzaji wanaoaminika.",
            feature2_title: "Njia Rahisi za Malipo",
            feature2_description: "Lipa kwa njia ya simu, uhamisho wa benki, malipo wakati wa kupokea, au nunua kwa mkopo.",
            feature3_title: "Rasilimali za Kielimu",
            feature3_description: "Pata vidokezo vya kilimo na miongozo ya bidhaa ili kuboresha mazoea yako ya kilimo.",
            feature4_title: "Msaada wa 24/7",
            feature4_description: "Pata msaada wakati wowote kupitia chatbot yetu na timu ya huduma kwa wateja.",
            feature5_title: "Mfumo wa Mikopo",
            feature5_description: "Jenga alama zako za mikopo kupitia historia ya ununuzi ili kupata pembejeo kwa awamu.",

            process_label: "MCHAKATO",
            process_title: "Jinsi Shamba Direct Inavyofanya Kazi",
            process_subtitle: "Mchakato rahisi ulioundwa kwa ajili ya wakulima, kutoka kuagiza hadi kuwasilisha.",
            process1_title: "Weka Agizo Lako",
            process1_description: "Agiza kupitia programu yetu ya simu, USSD, au WhatsApp kwa urahisi mkubwa.",
            process2_title: "Chagua Njia ya Malipo",
            process2_description: "Lipa kwa njia ya simu, uhamisho wa benki, malipo wakati wa kupokea, au nunua kwa mkopo.",
            process3_title: "Fuatilia Uwasilishaji Wako",
            process3_description: "Fuatilia agizo lako kwa wakati halisi linapoelekea eneo lako.",
            process4_title: "Pata Bidhaa Bora",
            process4_description: "Pata pembejeo za kilimo zilizoidhinishwa zikiwasilishwa moja kwa moja mlangoni kwako.",
            process_cta_button: "Anza Kuagiza Sasa",

            why_choose_us_title: "Kwa Nini Ushirikiane Nasi",
            video_label: "Tazama Jinsi Inavyofanya Kazi",
            video_unsupported: "Kivinjari chako hakitumii video.",
            partner_point1_heading: "Msaada wa 24/7",
            partner_point1_description: "Timu yetu iliyojitolea inapatikana kila wakati kukusaidia katika safari yako ya kilimo, mchana au usiku.",
            partner_point2_heading: "Njia Rahisi za Malipo",
            partner_point2_description: "Tunatoa njia mbalimbali za malipo, ikiwemo fedha za simu na mikopo, kwa urahisi wako.",
            partner_point3_heading: "Inaaminika na Wakulima 1000+",
            partner_point3_description: "Jiunge na jamii inayokua ya wakulima wanaotutegemea kwa pembejeo bora na huduma ya kuaminika.",
            partner_point4_heading: "Mfumo Salama na Unaoweza Kupanuka",
            partner_point4_description: "Mfumo wetu thabiti unahakikisha miamala yako ni salama na inaweza kukua kulingana na mahitaji yako.",
            partners_cta_button: "Kuwa Mshirika",

            knowledge_label: "Maarifa",
            knowledge_title: "Rasilimali za Kielimu",
            knowledge_subtitle: "Pata maarifa ya kilimo na mbinu bora za kuboresha uzalishaji wako wa kilimo.",
            knowledge_explore_btn: "Gundua Rasilimali Zote",
            resource1_title: "Miongozo ya Mazao",
            resource1_description: "Miongozo kamili ya kukuza mazao mbalimbali, kutoka kupanda hadi kuvuna.",
            resource1_link: "Vinjari Miongozo",
            resource2_title: "Video za Mafunzo",
            resource2_description: "Tazama video za hatua kwa hatua kuhusu mbinu za kilimo na matumizi ya bidhaa.",
            resource2_link: "Tazama Video",
            resource3_title: "Miongozo ya Bidhaa",
            resource3_description: "Maelekezo ya kina ya kutumia pembejeo za kilimo kwa ufanisi na usalama.",
            resource3_link: "Tazama Miongozo",

            partners_title: "Washirika wa Kimkakati",
            partner_name1: "Mshirika 1",
            partner_name2: "Mshirika 2",
            partner_name3: "Mshirika 3",
            partner_name4: "Mshirika 4",
            partner_name5: "Mshirika 5",
            partner_name1b: "Mshirika 1",
            partner_name2b: "Mshirika 2",
            partner_name3b: "Mshirika 3",
            partner_name5b: "Mshirika 5",

            footer_tagline: "Kuwawezesha Wakulima. Kuunganisha Pembejeo. Kukua Pamoja.",
            footer_quick_links_heading: "Viungo vya Haraka",
            footer_link_home: "Mwanzo",
            footer_link_about: "Kuhusu Sisi",
            footer_link_service: "Huduma",
            footer_link_reach_us: "Wasiliana Nasi",
            footer_link_faqs: "Maswali Yanayoulizwa Mara kwa Mara",
            footer_contact_heading: "Mawasiliano na Msaada",
            footer_chat_whatsapp: "Ongea Nasi",
            footer_access_heading: "Njia za Upatikanaji",
            access_channel1: "Tovuti",
            access_channel2: "Kuagiza kwa WhatsApp",
            access_channel3: "Upatikanaji wa USSD",
            footer_follow_us_heading: "Tufuate",
            footer_copyright: "2025 Shamba Direct. Haki zote zimehifadhiwa.",
            footer_terms: "Masharti ya Huduma",
            footer_privacy: "Sera ya Faragha",

            chatbot_header: "Shamba Bot",
            chatbot_input_placeholder: "Andika ujumbe wako...",
            chatbot_send_button: "Tuma",
            chatbot_powered_by: "Imewezeshwa na Shamba Direct"
        }
    };

    if (!languageToggleBtn) {
        console.warn("Language toggle button with ID 'language-toggle' not found.");
        return;
    }

    // Function to apply the selected language to the DOM
    const applyLanguage = (lang) => {
        // Update body data-attribute for CSS (if needed) and general state
        document.body.setAttribute('data-language', lang);
        document.documentElement.lang = lang; // Also update the HTML lang attribute

        // Update the page title
        const pageTitleElement = document.querySelector('title');
        if (pageTitleElement && appTranslations[lang] && appTranslations[lang].page_title) {
            pageTitleElement.textContent = appTranslations[lang].page_title;
        }

        // Iterate through all elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (appTranslations[lang] && appTranslations[lang][key]) {
                element.textContent = appTranslations[lang][key];
            }
        });

        // Iterate through elements with data-lang-placeholder (e.g., for input fields)
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (appTranslations[lang] && appTranslations[lang][key]) {
                element.placeholder = appTranslations[lang][key];
            }
        });

        // Store the preference
        localStorage.setItem('preferredLanguage', lang);
    };

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const initialLang = savedLanguage || 'en'; // Default to English if no preference saved
    applyLanguage(initialLang);

    // Add click listener to toggle language
    languageToggleBtn.addEventListener('click', () => {
        const currentLang = document.body.getAttribute('data-language');
        const newLang = (currentLang === 'en') ? 'sw' : 'en'; // Toggle between English and Swahili
        applyLanguage(newLang);
    });
    
    // Add click listener to mobile toggle language button if it exists
    if (languageToggleMobileBtn) {
        languageToggleMobileBtn.addEventListener('click', () => {
            const currentLang = document.body.getAttribute('data-language');
            const newLang = (currentLang === 'en') ? 'sw' : 'en'; // Toggle between English and Swahili
            applyLanguage(newLang);
        });
    }
});

