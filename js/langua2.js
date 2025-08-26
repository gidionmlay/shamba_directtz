// public/js/language-toggle.js

document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleMobile = document.getElementById('language-toggle-mobile');
    const htmlElement = document.documentElement; // The <html> tag

    // Define your translations
    const translations = {
        en: {
            // Page Title
            service_page_title: "Shamba Direct - Farmer's Market",

            // Header Navigation
            nav_home: "Home",
            nav_service: "Service",
            nav_about: "About",
            nav_reach_us: "Reach Us",
            auth_login: "Log in",
            auth_register: "Register",

            // Filter Section
            filter_products_title: "Filter Products",
            filter_category_label: "Product Category",
            filter_category_all: "All Products",
            filter_price_range_label: "Price Range (TZS)",
            filter_price_to: "to",
            filter_search_label: "Search Products",
            filter_search_placeholder: "Search products...",
            quick_filters_title: "Quick Filters:",
            filter_btn_irrigation: "Irrigation system",
            filter_btn_organic: "Organic",
            filter_btn_equipment: "Equipment",
            filter_btn_tools: "Tools",

            // Product Card - General
            product_badge_best_seller: "Best Seller",
            product_badge_organic: "Organic",
            product_badge_sale: "Sale",
            product_stock: "in stock",
            order_now_button: "Order Now",

            // Product Categories
            product_category_irrigation: "Irrigation",
            product_category_equipment: "Equipment",
            product_category_tools: "Tools",
            product_category_seeds: "Seeds",

            // Specific Product Details
            product_name_water_pump_agri: "Water Pump (Agricultural Pump)",
            product_desc_water_pump_agri: "High-performance water pump designed for agricultural use. Efficient and durable for all your irrigation needs.",
            product_name_power_tiller: "Power Tiller (Walking Tractor / Rotary Tiller)",
            product_desc_power_tiller: "Powerful and versatile tiller for efficient soil preparation. Ideal for small to medium farms.",
            product_name_drip_irrigation: "Drip Irrigation Kit",
            product_desc_drip_irrigation: "Water-efficient irrigation system ideal for small to medium farms. Easy to install and maintain.",
            product_name_knapsack_sprayer: "Knapsack Sprayer",
            product_desc_knapsack_sprayer: "Efficient and portable sprayer for applying pesticides and fertilizers. Ideal for small to medium farms.",
            product_name_shovels: "Shovels",
            product_desc_shovels: "Durable and efficient shovels for various farming tasks. Ideal for small to medium farms.",
            product_name_water_pump_gen: "Water Pump", // Re-used name, separate key if description differs significantly.
            product_desc_water_pump_gen: "High-efficiency water pump suitable for irrigation and drainage. Durable and easy to use.",
            product_name_knapsack_sprayer_manual: "Knapsack Sprayer (Manual Sprayer)",
            product_desc_knapsack_sprayer_manual: "High-efficiency manual sprayer for applying pesticides and fertilizers. Ideal for small to medium farms.",
            product_name_pruning_shears: "Premium Pruning Shears",
            product_desc_pruning_shears: "Professional-grade pruning shears with sharp blades and comfortable grip for precise cutting.",

            // Pagination
            pagination_prev: "Previous",
            pagination_next: "Next",

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
            // Page Title
            service_page_title: "Shamba Direct - Soko la Wakulima",

            // Header Navigation
            nav_home: "Nyumbani",
            nav_service: "Huduma",
            nav_about: "Kuhusu",
            nav_reach_us: "Tufikie",
            auth_login: "Ingia",
            auth_register: "Jisajili",

            // Filter Section
            filter_products_title: "Chuja Bidhaa",
            filter_category_label: "Aina ya Bidhaa",
            filter_category_all: "Bidhaa Zote",
            filter_price_range_label: "Kiwango cha Bei (TZS)",
            filter_price_to: "hadi",
            filter_search_label: "Tafuta Bidhaa",
            filter_search_placeholder: "Tafuta bidhaa...",
            quick_filters_title: "Vichujio vya Haraka:",
            filter_btn_irrigation: "Mfumo wa Umwagiliaji",
            filter_btn_organic: "Asilia",
            filter_btn_equipment: "Vifaa",
            filter_btn_tools: "Zana",

            // Product Card - General
            product_badge_best_seller: "Iliyouzwa Zaidi",
            product_badge_organic: "Asilia",
            product_badge_sale: "Punguzo",
            product_stock: "katika hisa",
            order_now_button: "Agiza Sasa",

            // Product Categories
            product_category_irrigation: "Umwagiliaji",
            product_category_equipment: "Vifaa",
            product_category_tools: "Zana",
            product_category_seeds: "Mbegu",

            // Specific Product Details
            product_name_water_pump_agri: "Pampu ya Maji (Pampu ya Kilimo)",
            product_desc_water_pump_agri: "Pampu ya maji yenye ufanisi wa hali ya juu iliyoundwa kwa matumizi ya kilimo. Inafaa na inadumu kwa mahitaji yako yote ya umwagiliaji.",
            product_name_power_tiller: "Power Tiller (Trekta Tembezi / Tiller ya Rotary)",
            product_desc_power_tiller: "Tiller yenye nguvu na inayoweza kutumika kwa ajili ya maandalizi bora ya udongo. Inafaa kwa mashamba madogo hadi ya kati.",
            product_name_drip_irrigation: "Kifaa cha Umwagiliaji wa Matone",
            product_desc_drip_irrigation: "Mfumo wa umwagiliaji wa kutumia maji vizuri unaofaa kwa mashamba madogo hadi ya kati. Rahisi kusakinisha na kudumisha.",
            product_name_knapsack_sprayer: "Pampu ya Kunyunyizia ya Mkono (Knapsack Sprayer)",
            product_desc_knapsack_sprayer: "Pampu ya kunyunyizia yenye ufanisi na inayobebeka kwa ajili ya kupulizia viuatilifu na mbolea. Inafaa kwa mashamba madogo hadi ya kati.",
            product_name_shovels: "Majembe",
            product_desc_shovels: "Majembe imara na yenye ufanisi kwa kazi mbalimbali za kilimo. Yanafaa kwa mashamba madogo hadi ya kati.",
            product_name_water_pump_gen: "Pampu ya Maji", // Re-used name, separate key if description differs significantly.
            product_desc_water_pump_gen: "Pampu ya maji yenye ufanisi wa hali ya juu inayofaa kwa umwagiliaji na mifereji ya maji. Imara na rahisi kutumia.",
            product_name_knapsack_sprayer_manual: "Pampu ya Kunyunyizia ya Mkono (Manual Sprayer)",
            product_desc_knapsack_sprayer_manual: "Pampu ya kunyunyizia ya mkono yenye ufanisi wa hali ya juu kwa ajili ya kupulizia viuatilifu na mbolea. Inafaa kwa mashamba madogo hadi ya kati.",
            product_name_pruning_shears: "Mikasi ya Kupunguza Miti Bora",
            product_desc_pruning_shears: "Mikasi ya kupunguza miti ya kiwango cha kitaalamu yenye makali makali na mshiko mzuri kwa kukata sahihi.",

            // Pagination
            pagination_prev: "Iliopita",
            pagination_next: "Inayofuata",

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
            // For input placeholders, set the placeholder attribute
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                if (translations[lang] && translations[lang][key]) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
            } else {
                // For other elements, set textContent
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
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