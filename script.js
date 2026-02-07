// ===== ÉTAT GLOBAL =====
const state = {
    currentDialect: 'all',
    currentTheme: 'light',
    searchTimeout: null,
    isSearching: false,
    isSearchFocused: false,
    favorites: new Set(),
    searchHistory: [],
    searchDirection: 'dialect-to-french',
    slogans: [
        "Un dictionnaire pour chaque dialecte, une culture à célébrer",
        "L'avenir des langues africains commence ici.",
        "Valoriser les dialectes, enrichir le monde.",
        "Un pont entre les cultures, un dictionnaire intelligent.",
        "La diversité des dialectes, notre richesse commune.",
        "Briser les barrières linguistiques, connecter les cultures.",
        "Donner une voix aux langues oubliées, grâce à l'innovation.",
        "Redonner aux peuples africains l'accès à l'information.",
        "Faire entendre chaque dialecte dans le monde numérique."
    ],
    currentSloganIndex: 0,
    isTyping: false,
    dialects: [
        { code: 'all', name: 'Tous les dialectes', color: '#2c5282' },
        { code: 'Ki Swahili', name: 'Ki Swahili', color: '#38a169' },
        { code: 'Ki Luba', name: 'Ki Luba', color: '#dd6b20' },
        { code: 'Ki Sanga', name: 'Ki Sanga', color: '#805ad5' },
        { code: 'Ki Songye', name: 'Ki Songye', color: '#d69e2e' },
        { code: 'Ki Hemba', name: 'Ki Hemba', color: '#e53e3e' },
        { code: 'Ki Bemba', name: 'Ki Bemba', color: '#319795' },
        { code: 'Tshiluba', name: 'Tshiluba', color: '#4fd1c7' }
    ],
    categories: [
        'salutations', 'nombres', 'famille', 'nourriture', 'animaux',
        'nature', 'vie_quotidienne', 'culture', 'traditions', 'corps'
    ],
    activeFilters: {
        category: '',
        difficulty: '',
        fuzzy: true
    },
    exampleWords: [
        { id: 1, word: 'Jambo', translation: 'Bonjour', dialect: 'Ki swahili', phonetic: '/ˈdʒɑːmboʊ/', category: 'salutations' },
        { id: 2, word: 'Aksanti', translation: 'Merci', dialect: 'Ki swahili', phonetic: '/ɑːˈsɑːnteɪ/', category: 'salutations' },
        { id: 3, word: 'Rafiki', translation: 'Ami', dialect: 'Ki swahili', phonetic: '/rɑːˈfiːki/', category: 'famille' },
        { id: 4, word: 'Kuya mbiyo', translation: 'Viens vite', dialect: 'Ki swahili', phonetic: '/ˈmɑːdʒi/', category: 'vie_quotidienne' },
        { id: 5, word: 'Chakula', translation: 'Nourriture', dialect: 'Ki swahili', phonetic: '/tʃɑːˈkuːlɑː/', category: 'nourriture' },
        { id: 6, word: 'Yambo', translation: 'Salut', dialect: 'Ki swahili', phonetic: '/yɑːmbo/', category: 'salutations' },
        { id: 7, word: 'Kuria', translation: 'manger', dialect: 'Ki swahili', phonetic: '/mɑːˈtɔːndɔ/', category: 'nourriture' },
        { id: 8, word: 'Bukari', translation: 'Le bukari', dialect: 'Ki swahili', phonetic: '/buːˈkɑːʃi/', category: 'nourriture' },
        { id: 9, word: 'Ku penda', translation: 'aimer', dialect: 'Ki swahili', phonetic: '/biːmɛˈnɛnɑ/', category: 'vie_quotidienne' },
        { id: 10, word: 'Samaki', translation: 'poisson', dialect: 'Ki swahili', phonetic: '/kuːˈdiːɑ/', category: 'nourriture' }
    ],
    formSubmissions: [],
    // Single API base URL (production). Change for local dev if needed.
    apiBaseUrl: 'https://yetumia.com/api',
    // Persisted favorite items (id -> item data) so API results show in Favorites
    favoriteItemsData: {}
};

// ===== RÉFÉRENCES DOM =====
const dom = {
    body: document.body,
    menuBtn: document.getElementById('menuBtn'),
    closeMenuBtn: document.getElementById('closeMenuBtn'),
    sideMenu: document.getElementById('sideMenu'),
    menuOverlay: document.getElementById('menuOverlay'),
    dialectsBtn: document.getElementById('dialectsBtn'),
    dialectsList: document.getElementById('dialectsList'),
    themeToggle: document.getElementById('themeToggle'),
    searchBox: document.getElementById('searchBox'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    resultsList: document.getElementById('resultsList'),
    typewriterText: document.getElementById('typewriterText'),
    mainContent: document.getElementById('mainContent'),
    searchSection: document.getElementById('searchSection'),
    headerLogo: document.getElementById('headerLogo'),
    
    // Advanced filters
    advancedFiltersBtn: document.getElementById('advancedFiltersBtn'),
    advancedFiltersPanel: document.getElementById('advancedFiltersPanel'),
    closeFiltersBtn: document.getElementById('closeFiltersBtn'),
    categoryFilter: document.getElementById('categoryFilter'),
    difficultyFilter: document.getElementById('difficultyFilter'),
    fuzzySearch: document.getElementById('fuzzySearch'),
    applyFilters: document.getElementById('applyFilters'),
    resetFilters: document.getElementById('resetFilters'),
    
    // Loading
    searchLoading: document.getElementById('searchLoading'),
    
    // Form Modals
    contributeModal: document.getElementById('contributeModal'),
    joinModal: document.getElementById('joinModal'),
    closeContributeModal: document.getElementById('closeContributeModal'),
    closeJoinModal: document.getElementById('closeJoinModal'),
    contributeForm: document.getElementById('contributeForm'),
    joinForm: document.getElementById('joinForm'),
    
    // Texte "Quitter"
    searchExitText: document.getElementById('searchExitText'),
    
    // Modales originales
    contactModal: document.getElementById('contactModal'),
    aboutModal: document.getElementById('aboutModal'),
    privacyModal: document.getElementById('privacyModal'),
    termsModal: document.getElementById('termsModal'),
    favoritesModal: document.getElementById('favoritesModal'),
    historyModal: document.getElementById('historyModal'),
    developmentModal: document.getElementById('developmentModal'),
    helpModal: document.getElementById('helpModal'),
    
    // Modal close buttons originales
    closeContactModal: document.getElementById('closeContactModal'),
    closeAboutModal: document.getElementById('closeAboutModal'),
    closePrivacyModal: document.getElementById('closePrivacyModal'),
    closeTermsModal: document.getElementById('closeTermsModal'),
    closeFavoritesModal: document.getElementById('closeFavoritesModal'),
    closeHistoryModal: document.getElementById('closeHistoryModal'),
    closeDevelopmentModal: document.getElementById('closeDevelopmentModal'),
    closeHelpModal: document.getElementById('closeHelpModal'),
    
    // Lists
    favoritesList: document.getElementById('favoritesList'),
    emptyFavorites: document.getElementById('emptyFavorites'),
    historyList: document.getElementById('historyList'),
    emptyHistory: document.getElementById('emptyHistory'),
    clearHistoryBtn: document.getElementById('clearHistory'),
    
    // Menu items
    grammarItem: document.getElementById('grammarItem'),
    conjugationItem: document.getElementById('conjugationItem'),
    contributeMenuItem: document.getElementById('contributeMenuItem'),
    joinMenuItem: document.getElementById('joinMenuItem'),
    favoritesItem: document.getElementById('favoritesItem'),
    historyMenuItem: document.getElementById('historyMenuItem'),
    contactMenuItem: document.getElementById('contactMenuItem'),
    helpItem: document.getElementById('helpItem'),
    
    // Footer links
    footerContact: document.getElementById('footerContact'),
    footerAbout: document.getElementById('footerAbout'),
    footerPrivacy: document.getElementById('footerPrivacy'),
    footerTerms: document.getElementById('footerTerms'),
    
    // Notification
    notification: document.getElementById('notification'),
    notificationMessage: document.getElementById('notificationMessage')
};

// ===== FONCTIONS API POUR YETUMIA BACKEND =====

// Fonction pour tester la connexion au backend
async function testBackendConnection() {
    try {
        console.log('🔗 Test de connexion au backend...');
        const response = await fetch(`${state.apiBaseUrl}/`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Backend connecté:', result);
        
        if (result.success) {
            return { success: true, message: result.message || 'Backend connecté' };
        } else {
            return { success: false, message: result.message || 'Erreur backend' };
        }
    } catch (error) {
        console.error('❌ Impossible de se connecter au backend:', error);
        return { success: false, message: error.message };
    }
}

// Fonction de recherche vers votre backend
async function searchWord(query) {
    try {
        console.log(`🔍 Recherche API: "${query}"`);
        
        const response = await fetch(`${state.apiBaseUrl}/mot/${encodeURIComponent(query)}`);
        const result = await response.json();
        console.log('📦 Résultat API:', result);
        
        if (!response.ok) {
            throw new Error(result.error || result.message || `Erreur HTTP: ${response.status}`);
        }
        if (result.success) {
            return result.data || [];
        } else {
            console.warn('⚠️ API a retourné success: false:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ Erreur API searchWord:', error);
        throw error;
    }
}

// Fonction pour ajouter un mot
async function addWordToDatabase(motSwahili, traductionFr) {
    try {
        console.log(`➕ Ajout API: "${motSwahili}" -> "${traductionFr}"`);
        
        const response = await fetch(`${state.apiBaseUrl}/ajouter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mot_swahili: motSwahili,
                traduction_fr: traductionFr
            })
        });
        
        const result = await response.json();
        console.log('✅ Réponse ajout:', result);
        
        if (!response.ok) {
            throw new Error(result.error || result.message || `Erreur HTTP: ${response.status}`);
        }
        if (result.success) {
            return result;
        } else {
            throw new Error(result.message || result.error || 'Erreur lors de l\'ajout');
        }
    } catch (error) {
        console.error('❌ Erreur ajout:', error);
        throw error;
    }
}

// Fonction principale de recherche
async function searchAPI(query) {
    try {
        console.log('🔍 Recherche principale pour:', query);

        // Rechercher dans votre backend
        const apiData = await searchWord(query);

        console.log('📦 Données API:', apiData);

        if (apiData && apiData.length > 0) {
            // Formater les résultats
            const formattedResults = apiData.map(item => ({
                id: item.id || Date.now() + Math.random(),
                word: item.mot_swahili,
                translation: item.traduction_fr,
                dialect: 'Ki Swahili',
                phonetic: item.prononciation_api || '',
                category: item.categorie_semantique || '',
                grammatical: item.categorie_grammaticale || '',
                difficulty: item.niveau_difficulte || '',
                source: 'backend'
            }));

            return {
                success: true,
                results: formattedResults,
                count: formattedResults.length,
                source: 'backend'
            };
        } else {
            return {
                success: false,
                results: [],
                count: 0
            };
        }

    } catch (error) {
        console.error('❌ Erreur recherche API:', error);
        return {
            success: false,
            results: [],
            error: error.message
        };
    }
}

// ===== INITIALISATION =====
function init() {
    try {
        // Forcer le placeholder réduit sur mobile
        if (window.innerWidth <= 768) {
            dom.searchInput.placeholder = "Rechercher...";
        }
        
        // Charger l'état sauvegardé
        loadSavedState();
        
        // Configurer les écouteurs d'événements
        setupEventListeners();
        
        // Initialiser l'interface
        initInterface();
        
        // Démarrer les animations
        startTypewriterAnimation();
        
        // Charger les favoris et l'historique
        loadFavorites();
        loadSearchHistory();
        loadFormSubmissions();
        
        // Masquer le texte "Quitter" initialement
        if (dom.searchExitText) {
            dom.searchExitText.style.display = 'none';
            dom.searchExitText.style.opacity = '0';
            dom.searchExitText.style.visibility = 'hidden';
        }
        
        // Test de connexion API au chargement
        testAPIConnection();
        
        showNotification('YetuMia Dictionnaire chargé avec succès!', 'success', 2000);
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        showNotification('Erreur de chargement', 'warning');
    }
}

// Test de connexion API
function testAPIConnection() {
    console.log('🧪 Test connexion backend...');
    
    testBackendConnection()
        .then(result => {
            if (result.success) {
                console.log('✅ Backend connecté:', result.message);
                showNotification('Connecté à YetuMia API', 'success', 2000);
            } else {
                console.warn('⚠️ Backend non disponible:', result.message);
                showNotification('Mode local activé', 'warning', 3000);
            }
        })
        .catch(error => {
            console.warn('⚠️ Erreur de test:', error);
            showNotification('Mode local activé', 'warning', 3000);
        });
}

function initInterface() {
    updateDialectsList();
    updateDialectButton();
    populateCategories();
    setTheme(state.currentTheme);
    handleSearchFocus();
    adjustFilterButtonForScreen();
}

function updateDialectsList() {
    dom.dialectsList.innerHTML = '';
    
    state.dialects.forEach(dialect => {
        const item = document.createElement('div');
        item.className = `dialect-item ${state.currentDialect === dialect.code ? 'active' : ''}`;
        item.dataset.dialect = dialect.code;
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${dialect.color || '#2c5282'};"></div>
                ${dialect.name}
            </div>
        `;
        item.addEventListener('click', () => selectDialect(dialect.code));
        dom.dialectsList.appendChild(item);
    });
}

function updateDialectButton() {
    const span = dom.dialectsBtn.querySelector('span');
    if (span) {
        const dialect = state.dialects.find(d => d.code === state.currentDialect);
        span.textContent = dialect ? dialect.name : 'Dialectes';
    }
}

function populateCategories() {
    if (dom.categoryFilter) {
        while (dom.categoryFilter.options.length > 1) {
            dom.categoryFilter.remove(1);
        }
        
        state.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            dom.categoryFilter.appendChild(option);
        });
    }
}

// ===== FONCTIONS DE RECHERCHE =====
async function performSearch(query) {
    const trimmedQuery = query.trim();
    
    dom.searchResults.classList.add('active');
    
    if (!trimmedQuery) {
        displayDefaultState();
        return;
    }
    
    addToSearchHistory(trimmedQuery);
    
    dom.searchLoading.style.display = 'block';
    state.isSearching = true;
    
    try {
        let results = [];
        let source = '';
        
        console.log(`🔍 Recherche en cours: "${trimmedQuery}"`);
        
        // Recherche dans l'API backend
        const apiResult = await searchAPI(trimmedQuery);
        
        if (apiResult.success && apiResult.results.length > 0) {
            results = apiResult.results;
            source = 'backend';
            
            displaySearchResults(results, source);
            showNotification(`${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`, 'success', 2000);
        } else {
            // Fallback aux données locales
            const localResults = searchLocalWords(trimmedQuery);
            if (localResults.length > 0) {
                results = localResults;
                source = 'local';
                displaySearchResults(results, source);
                showNotification(`${results.length} résultat${results.length > 1 ? 's' : ''} (mode local)`, 'info', 2000);
            } else {
                displayNoResults();
                showNotification('Aucun résultat trouvé', 'info', 2000);
            }
        }
        
    } catch (error) {
        console.error('❌ Erreur recherche:', error);
        
        // Fallback aux données locales
        const localResults = searchLocalWords(trimmedQuery);
        if (localResults.length > 0) {
            displaySearchResults(localResults, 'local');
            showNotification(`${localResults.length} résultat${localResults.length > 1 ? 's' : ''} (mode local)`, 'warning', 2000);
        } else {
            displayNoResults();
            showNotification('Aucun résultat trouvé', 'info', 2000);
        }
        
    } finally {
        dom.searchLoading.style.display = 'none';
        state.isSearching = false;
    }
}

function searchLocalWords(query) {
    const lowercaseQuery = query.toLowerCase();
    
    return state.exampleWords.filter(word => {
        return word.word.toLowerCase().includes(lowercaseQuery) ||
               word.translation.toLowerCase().includes(lowercaseQuery) ||
               word.phonetic?.toLowerCase().includes(lowercaseQuery);
    });
}

function displaySearchResults(results, source = 'backend') {
    dom.resultsList.innerHTML = '';
    
    if (!results || results.length === 0) {
        displayNoResults();
        return;
    }
    
    const sourceText = source === 'backend' ? 'Base YetuMia' : 'Base locale';
    const sourceIcon = source === 'backend' ? 'fa-database' : 'fa-laptop';
    
    const statsHTML = `
        <div class="search-stats">
            <span><strong>${results.length}</strong> résultat${results.length > 1 ? 's' : ''}</span>
            <span><i class="fas ${sourceIcon}"></i> ${sourceText}</span>
            ${state.currentDialect !== 'all' ? `<span><i class="fas fa-language"></i> ${getDialectName(state.currentDialect)}</span>` : '<span><i class="fas fa-globe"></i> Tous les dialectes</span>'}
        </div>
    `;
    dom.resultsList.innerHTML = statsHTML;
    
    results.forEach(item => {
        const resultEl = createResultElement(item);
        dom.resultsList.appendChild(resultEl);
    });
}

function createResultElement(item) {
    const resultEl = document.createElement('div');
    resultEl.className = 'result-item';
    
    const isFavorited = state.favorites.has(item.id);
    const displayDialect = state.currentDialect !== 'all' ? getDialectName(state.currentDialect) : (item.dialect || 'Ki Swahili');
    
    resultEl.innerHTML = `
        <div class="word-info">
            <div class="word">
                ${item.word}
                <span class="word-language">${displayDialect}</span>
                ${item.difficulty ? `<span class="word-language" style="background: #38a169;">${item.difficulty}</span>` : ''}
                ${item.source === 'backend' ? `<span class="word-language" style="background: #805ad5; font-size: 10px;">API</span>` : ''}
            </div>
            ${item.phonetic ? `<div class="phonetic">${item.phonetic}</div>` : ''}
            <div class="translation">${item.translation}</div>
            ${item.category ? `<div class="word-category">${item.category}</div>` : ''}
            ${item.grammatical ? `<div style="font-size: 12px; color: var(--secondary-light); margin-top: 4px;">${item.grammatical}</div>` : ''}
        </div>
        <div class="result-actions">
            <button class="action-btn pronounce-btn" title="Prononcer">
                <i class="fas fa-volume-up"></i>
            </button>
            <button class="action-btn favorite-btn ${isFavorited ? 'favorited' : ''}" 
                    title="${isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                <i class="fas fa-star"></i>
            </button>
        </div>
    `;
    
    const pronounceBtn = resultEl.querySelector('.pronounce-btn');
    const favoriteBtn = resultEl.querySelector('.favorite-btn');
    
    pronounceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pronounceWord(item.word);
    });
    
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(item.id, favoriteBtn, item);
    });
    
    resultEl.addEventListener('click', () => {
        dom.searchInput.value = item.word;
        performSearch(item.word);
    });
    
    return resultEl;
}

function displayNoResults() {
    dom.resultsList.innerHTML = `
        <div class="result-item">
            <div class="word-info">
                <div class="word">Aucun résultat trouvé</div>
                <div class="translation">Essayez avec d'autres mots ou vérifiez vos filtres</div>
            </div>
        </div>
    `;
}

function displayDefaultState() {
    dom.resultsList.innerHTML = `
        <div class="result-item">
            <div class="word-info">
                <div class="word">Commencez à taper pour rechercher</div>
                <div class="translation">Recherchez des mots dans tous les dialectes africains</div>
            </div>
        </div>
    `;
}

// ===== GESTION DE L'HISTORIQUE =====
function addToSearchHistory(query) {
    if (!query.trim()) return;
    
    const historyItem = {
        query: query,
        timestamp: new Date().toISOString(),
        dialect: state.currentDialect
    };
    
    const lastItem = state.searchHistory[0];
    if (!lastItem || lastItem.query !== query) {
        state.searchHistory.unshift(historyItem);
        
        if (state.searchHistory.length > 50) {
            state.searchHistory.pop();
        }
        
        saveSearchHistory();
    }
}

function loadSearchHistory() {
    const saved = localStorage.getItem('yetumia_search_history');
    if (saved) {
        try {
            state.searchHistory = JSON.parse(saved);
        } catch (e) {
            state.searchHistory = [];
        }
    }
}

function saveSearchHistory() {
    localStorage.setItem('yetumia_search_history', JSON.stringify(state.searchHistory));
}

function displaySearchHistory() {
    if (state.searchHistory.length === 0) {
        dom.emptyHistory.style.display = 'block';
        dom.historyList.innerHTML = '';
        return;
    }
    
    dom.emptyHistory.style.display = 'none';
    dom.historyList.innerHTML = '';
    
    state.searchHistory.forEach((item, index) => {
        const historyEl = document.createElement('div');
        historyEl.className = 'history-item';
        historyEl.innerHTML = `
            <div>
                <div class="favorite-word">${item.query}</div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <span class="word-language" style="font-size: 11px;">${getDialectName(item.dialect)}</span>
                    <span style="font-size: 11px; color: var(--secondary-light);">${formatDate(item.timestamp)}</span>
                </div>
            </div>
            <button class="action-btn" title="Rechercher à nouveau" data-index="${index}">
                <i class="fas fa-search"></i>
            </button>
        `;
        
        const searchBtn = historyEl.querySelector('.action-btn');
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dom.searchInput.value = item.query;
            performSearch(item.query);
            hideModal(dom.historyModal);
        });
        
        historyEl.addEventListener('click', () => {
            dom.searchInput.value = item.query;
            performSearch(item.query);
            hideModal(dom.historyModal);
        });
        
        dom.historyList.appendChild(historyEl);
    });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
        return `il y a ${diffMins} min`;
    } else if (diffHours < 24) {
        return `il y a ${diffHours} h`;
    } else if (diffDays < 7) {
        return `il y a ${diffDays} j`;
    } else {
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
}

// ===== FONCTIONS POUR LE LOGO =====
function stopLogoAnimation() {
    const logoBalls = document.querySelectorAll('.logo-ball');
    logoBalls.forEach(ball => {
        ball.style.animation = 'none';
        ball.style.transform = 'scale(1)';
        ball.style.opacity = '1';
    });
}

function startLogoAnimation() {
    const logoBalls = document.querySelectorAll('.logo-ball');
    logoBalls.forEach((ball, index) => {
        ball.style.animation = '';
    });
}

// ===== FONCTION POUR QUITTER LA RECHERCHE =====
function exitSearch() {
    state.isSearchFocused = false;
    dom.searchBox.classList.remove('focused');
    dom.mainContent.classList.remove('search-focused');
    dom.headerLogo.classList.remove('visible');
    
    stopLogoAnimation();
    
    dom.searchInput.value = '';
    dom.searchResults.classList.remove('active');
    
    if (dom.searchExitText) {
        dom.searchExitText.style.display = 'none';
        dom.searchExitText.style.opacity = '0';
        dom.searchExitText.style.visibility = 'hidden';
    }
    
    setTimeout(() => {
        dom.searchInput.blur();
    }, 100);
}

// ===== GESTION DES FAVORIS =====
function loadFavorites() {
    const saved = localStorage.getItem('yetumia_favorites');
    if (saved) {
        try {
            state.favorites = new Set(JSON.parse(saved));
        } catch (e) {
            state.favorites = new Set();
        }
    }
    const savedData = localStorage.getItem('yetumia_favorite_items');
    if (savedData) {
        try {
            state.favoriteItemsData = JSON.parse(savedData);
        } catch (e) {
            state.favoriteItemsData = {};
        }
    }
}

function saveFavorites() {
    localStorage.setItem('yetumia_favorites', JSON.stringify([...state.favorites]));
    localStorage.setItem('yetumia_favorite_items', JSON.stringify(state.favoriteItemsData));
}

function toggleFavorite(wordId, button, itemData) {
    if (state.favorites.has(wordId)) {
        state.favorites.delete(wordId);
        delete state.favoriteItemsData[wordId];
        if (button) {
            button.classList.remove('favorited');
            button.title = 'Ajouter aux favoris';
        }
        showNotification('Retiré des favoris', 'success');
    } else {
        state.favorites.add(wordId);
        if (itemData) {
            state.favoriteItemsData[wordId] = {
                id: itemData.id,
                word: itemData.word,
                translation: itemData.translation,
                dialect: itemData.dialect || 'Ki Swahili',
                phonetic: itemData.phonetic || '',
                category: itemData.category || '',
                source: itemData.source
            };
        }
        if (button) {
            button.classList.add('favorited');
            button.title = 'Retirer des favoris';
        }
        showNotification('Ajouté aux favoris', 'success');
    }
    saveFavorites();
    
    if (dom.favoritesModal && dom.favoritesModal.classList.contains('show')) {
        displayFavorites();
    }
}

function getFavoriteItem(wordId) {
    const local = state.exampleWords.find(w => w.id === wordId);
    if (local) return local;
    return state.favoriteItemsData[wordId] || null;
}

function displayFavorites() {
    const favorites = Array.from(state.favorites);
    
    if (favorites.length === 0) {
        dom.emptyFavorites.style.display = 'block';
        dom.favoritesList.innerHTML = '';
        return;
    }
    
    dom.emptyFavorites.style.display = 'none';
    dom.favoritesList.innerHTML = '';
    
    favorites.forEach(wordId => {
        const word = getFavoriteItem(wordId);
        if (word) {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div>
                    <span class="favorite-word">${word.word}</span>
                    <span class="favorite-dialect">${getDialectName(word.dialect)}</span>
                    <div class="translation">${word.translation}</div>
                </div>
                <div class="favorite-actions">
                    <button class="action-btn pronounce-btn" title="Prononcer">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="action-btn favorite-btn favorited" title="Retirer des favoris">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            `;
            
            const pronounceBtn = item.querySelector('.pronounce-btn');
            const favoriteBtn = item.querySelector('.favorite-btn');
            
            pronounceBtn.addEventListener('click', () => pronounceWord(word.word, word.dialect));
            favoriteBtn.addEventListener('click', () => toggleFavorite(word.id, favoriteBtn));
            
            dom.favoritesList.appendChild(item);
        }
    });
}

// ===== GESTION DES FORMULAIRES =====
function loadFormSubmissions() {
    const saved = localStorage.getItem('yetumia_form_submissions');
    if (saved) {
        try {
            state.formSubmissions = JSON.parse(saved);
        } catch (e) {
            state.formSubmissions = [];
        }
    }
}

function saveFormSubmissions() {
    localStorage.setItem('yetumia_form_submissions', JSON.stringify(state.formSubmissions));
}

async function sendForm(formData, formType) {
    try {
        state.formSubmissions.push({
            type: formType,
            data: formData,
            timestamp: new Date().toISOString()
        });
        saveFormSubmissions();
        
        return { success: true, message: 'Message envoyé avec succès' };
        
    } catch (error) {
        console.error('Erreur d\'envoi:', error);
        return { success: false, message: 'Erreur lors de l\'envoi' };
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== FONCTIONS UTILITAIRES =====
function getDialectName(code) {
    const dialect = state.dialects.find(d => d.code === code);
    return dialect ? dialect.name : code;
}

function getDialectColor(code) {
    const dialect = state.dialects.find(d => d.code === code);
    return dialect ? dialect.color : '#2c5282';
}

function selectDialect(dialectCode) {
    state.currentDialect = dialectCode;
    updateDialectButton();
    updateDialectsList();
    dom.dialectsList.classList.remove('show');
    localStorage.setItem('yetumia_dialect', dialectCode);
    
    if (dom.searchInput.value.trim()) {
        performSearch(dom.searchInput.value);
    }
    
    showNotification(`Dialecte: ${getDialectName(dialectCode)}`, 'success');
}

function pronounceWord(word, dialect = 'swahili') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        
        const localeMap = {
            'swahili': 'sw-KE',
            'luba': 'lu-CD',
            'bemba': 'bem-ZM'
        };
        
        utterance.lang = localeMap[dialect] || 'sw-KE';
        utterance.rate = 0.8;
        utterance.volume = 1;
        
        speechSynthesis.speak(utterance);
        showNotification(`Prononciation: "${word}"`, 'success');
    } else {
        showNotification('Synthèse vocale non disponible', 'warning');
    }
}

// ===== GESTION DE L'ÉTAT =====
function loadSavedState() {
    const savedTheme = localStorage.getItem('yetumia_theme') || 'light';
    state.currentTheme = savedTheme;
    setTheme(savedTheme);
    
    const savedDialect = localStorage.getItem('yetumia_dialect');
    if (savedDialect) {
        state.currentDialect = savedDialect;
    }
    
    const savedFilters = localStorage.getItem('yetumia_filters');
    if (savedFilters) {
        state.activeFilters = JSON.parse(savedFilters);
        applySavedFilters();
    }
}

function setTheme(theme) {
    state.currentTheme = theme;
    dom.body.classList.toggle('dark-mode', theme === 'dark');
    
    const icon = dom.themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun theme-icon';
        dom.themeToggle.title = 'Passer en mode clair';
    } else {
        icon.className = 'fas fa-moon theme-icon';
        dom.themeToggle.title = 'Passer en mode sombre';
    }
    
    localStorage.setItem('yetumia_theme', theme);
}

function toggleTheme() {
    const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showNotification(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, 'success');
}

function applySavedFilters() {
    if (dom.categoryFilter) dom.categoryFilter.value = state.activeFilters.category;
    if (dom.difficultyFilter) dom.difficultyFilter.value = state.activeFilters.difficulty;
    if (dom.fuzzySearch) dom.fuzzySearch.checked = state.activeFilters.fuzzy;
}

function saveFilters() {
    state.activeFilters = {
        category: dom.categoryFilter.value,
        difficulty: dom.difficultyFilter.value,
        fuzzy: dom.fuzzySearch.checked
    };
    localStorage.setItem('yetumia_filters', JSON.stringify(state.activeFilters));
}

function applyFilters() {
    saveFilters();
    
    if (dom.searchInput.value.trim()) {
        performSearch(dom.searchInput.value);
    }
    
    showNotification('Filtres appliqués', 'success');
    dom.advancedFiltersPanel.classList.remove('open');
}

function resetFilters() {
    state.activeFilters = {
        category: '',
        difficulty: '',
        fuzzy: true
    };
    
    if (dom.categoryFilter) dom.categoryFilter.value = '';
    if (dom.difficultyFilter) dom.difficultyFilter.value = '';
    if (dom.fuzzySearch) dom.fuzzySearch.checked = true;
    
    saveFilters();
    
    if (dom.searchInput.value.trim()) {
        performSearch(dom.searchInput.value);
    }
    
    showNotification('Filtres réinitialisés', 'success');
}

// ===== GESTION DU FOCUS DE RECHERCHE =====
function handleSearchFocus() {
    dom.searchInput.addEventListener('focus', () => {
        state.isSearchFocused = true;
        dom.searchBox.classList.add('focused');
        dom.mainContent.classList.add('search-focused');
        dom.headerLogo.classList.add('visible');
        
        startLogoAnimation();
        
        if (dom.searchExitText) {
            dom.searchExitText.style.display = 'flex';
            dom.searchExitText.style.opacity = '1';
            dom.searchExitText.style.visibility = 'visible';
        }
        
        dom.searchResults.classList.add('active');
        
        if (dom.searchInput.value.trim()) {
            performSearch(dom.searchInput.value);
        } else {
            displayDefaultState();
        }
    });

    dom.searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (!state.isSearchFocused) {
                if (dom.searchExitText) {
                    dom.searchExitText.style.display = 'none';
                    dom.searchExitText.style.opacity = '0';
                    dom.searchExitText.style.visibility = 'hidden';
                }
            }
        }, 200);
    });
}

// ===== FONCTION POUR ADAPTER LE BOUTON FILTRE =====
function adjustFilterButtonForScreen() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        dom.advancedFiltersBtn.innerHTML = `<i class="fas fa-sliders-h"></i>`;
        dom.advancedFiltersBtn.style.display = 'flex';
        dom.advancedFiltersBtn.style.width = '48px';
        dom.advancedFiltersBtn.style.padding = '0';
        dom.advancedFiltersBtn.style.order = '3';
        if (dom.searchExitText) {
            dom.searchExitText.style.order = '4';
        }
    } else {
        dom.advancedFiltersBtn.innerHTML = `<i class="fas fa-sliders-h"></i>`;
        dom.advancedFiltersBtn.style.display = 'flex';
        dom.advancedFiltersBtn.style.width = '48px';
        dom.advancedFiltersBtn.style.padding = '0';
        dom.advancedFiltersBtn.style.order = '';
        if (dom.searchExitText) {
            dom.searchExitText.style.order = '';
        }
    }
}

// ===== TYPEWRITER ANIMATION =====
function startTypewriterAnimation() {
    typeNextSlogan();
    setInterval(typeNextSlogan, 4000);
}

function typeNextSlogan() {
    if (state.isTyping) return;
    state.isTyping = true;
    
    const currentText = dom.typewriterText.textContent;
    let charIndex = currentText.length;
    
    function deleteLetter() {
        if (charIndex > 0) {
            dom.typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteLetter, 30);
        } else {
            state.currentSloganIndex = (state.currentSloganIndex + 1) % state.slogans.length;
            typeSlogan();
        }
    }
    
    deleteLetter();
}

function typeSlogan() {
    const slogan = state.slogans[state.currentSloganIndex];
    let charIndex = 0;
    
    function typeLetter() {
        if (charIndex < slogan.length) {
            dom.typewriterText.textContent = slogan.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeLetter, 50);
        } else {
            state.isTyping = false;
        }
    }
    
    typeLetter();
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success', duration = 3000) {
    dom.notificationMessage.textContent = message;
    dom.notification.className = `notification ${type} show`;
    
    const icon = dom.notification.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
    } else {
        icon.className = 'fas fa-info-circle';
    }
    
    setTimeout(() => {
        dom.notification.classList.remove('show');
    }, duration);
}

// ===== MENU LATÉRAL =====
function openSideMenu() {
    dom.sideMenu.classList.add('open');
    dom.menuOverlay.classList.add('show');
    if (window.innerWidth <= 768) {
        document.body.classList.add('menu-open');
    }
    dom.dialectsList.classList.remove('show');
    dom.advancedFiltersPanel.classList.remove('open');
}

function closeSideMenu() {
    dom.sideMenu.classList.remove('open');
    dom.menuOverlay.classList.remove('show');
    if (window.innerWidth <= 768) {
        document.body.classList.remove('menu-open');
    }
    dom.dialectsList.classList.remove('show');
    dom.advancedFiltersPanel.classList.remove('open');
}

// ===== MODALES =====
function showFormModal(modal) {
    if (!modal) return;
    
    document.querySelectorAll('.modal.show').forEach(m => hideModal(m));
    document.querySelectorAll('.form-modal.show').forEach(m => hideFormModal(m));
    
    closeSideMenu();
    
    modal.classList.add('show');
    dom.menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    dom.dialectsList.classList.remove('show');
    dom.advancedFiltersPanel.classList.remove('open');
    dom.searchResults.classList.remove('active');
}

function hideFormModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    
    const openModals = document.querySelectorAll('.modal.show');
    const openFormModals = document.querySelectorAll('.form-modal.show');
    
    if (openModals.length === 0 && openFormModals.length === 0) {
        dom.menuOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function showModal(modal) {
    if (!modal) return;
    
    document.querySelectorAll('.modal.show').forEach(m => hideModal(m));
    document.querySelectorAll('.form-modal.show').forEach(m => hideFormModal(m));
    
    modal.classList.add('show');
    dom.menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    if (window.innerWidth <= 768) {
        closeSideMenu();
    }
    
    dom.dialectsList.classList.remove('show');
    dom.advancedFiltersPanel.classList.remove('open');
    dom.searchResults.classList.remove('active');
}

function hideModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    
    const openModals = document.querySelectorAll('.modal.show');
    const openFormModals = document.querySelectorAll('.form-modal.show');
    
    if (openModals.length === 0 && openFormModals.length === 0) {
        dom.menuOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ===== ÉCOUTEURS D'ÉVÉNEMENTS =====
function setupEventListeners() {
    // Menu latéral
    dom.menuBtn.addEventListener('click', openSideMenu);
    dom.closeMenuBtn.addEventListener('click', closeSideMenu);
    dom.menuOverlay.addEventListener('click', () => {
        closeSideMenu();
        hideModal(dom.contactModal);
        hideModal(dom.aboutModal);
        hideModal(dom.privacyModal);
        hideModal(dom.termsModal);
        hideModal(dom.favoritesModal);
        hideModal(dom.historyModal);
        hideModal(dom.developmentModal);
        hideModal(dom.helpModal);
        hideFormModal(dom.contributeModal);
        hideFormModal(dom.joinModal);
    });
    
    // Dialectes
    dom.dialectsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dom.dialectsList.classList.toggle('show');
        dom.advancedFiltersPanel.classList.remove('open');
    });
    
    document.addEventListener('click', (e) => {
        if (!dom.dialectsBtn.contains(e.target) && !dom.dialectsList.contains(e.target)) {
            dom.dialectsList.classList.remove('show');
        }
    });
    
    // Thème
    dom.themeToggle.addEventListener('click', toggleTheme);
    
    // Recherche
    dom.searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        clearTimeout(state.searchTimeout);
        state.searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    dom.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(state.searchTimeout);
            performSearch(e.target.value);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!dom.searchBox.contains(e.target) && !dom.searchResults.contains(e.target)) {
            dom.searchResults.classList.remove('active');
        }
    });
    
    // Texte "Quitter"
    dom.searchExitText.addEventListener('click', (e) => {
        e.stopPropagation();
        exitSearch();
    });
    
    // Filtres avancés
    dom.advancedFiltersBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dom.advancedFiltersPanel.classList.add('open');
        dom.dialectsList.classList.remove('show');
    });
    
    dom.closeFiltersBtn.addEventListener('click', () => {
        dom.advancedFiltersPanel.classList.remove('open');
    });
    
    dom.applyFilters.addEventListener('click', applyFilters);
    dom.resetFilters.addEventListener('click', resetFilters);
    
    document.addEventListener('click', (e) => {
        if (!dom.advancedFiltersBtn.contains(e.target) && 
            !dom.advancedFiltersPanel.contains(e.target)) {
            dom.advancedFiltersPanel.classList.remove('open');
        }
    });
    
    // Formulaire de contribution
    dom.contributeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('contributorEmail').value;
        const subject = document.getElementById('contributionSubject').value;
        const message = document.getElementById('contributionMessage').value;
        
        if (!email || !subject || !message) {
            showNotification('Tous les champs sont obligatoires', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        if (message.length < 50) {
            showNotification('Le message doit contenir au moins 50 caractères', 'error');
            return;
        }
        
        const submitBtn = dom.contributeForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        
        try {
            showNotification('Envoi de votre contribution en cours...', 'info');
            
            const form = e.target;
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Votre contribution a été envoyée avec succès !', 'success');
                
                await sendForm({email, subject, message}, 'contribution');
                
                dom.contributeForm.reset();
                
                setTimeout(() => {
                    hideFormModal(dom.contributeModal);
                }, 2000);
            } else {
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            }
            
        } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur de connexion. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
    
    // Formulaire d'adhésion
    dom.joinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('joinName').value;
        const email = document.getElementById('joinEmail').value;
        const location = document.getElementById('joinLocation').value;
        const message = document.getElementById('joinMessage').value;
        
        if (!name || !email || !location || !message) {
            showNotification('Tous les champs sont obligatoires', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        if (message.length < 50) {
            showNotification('Le message doit contenir au moins 50 caractères', 'error');
            return;
        }
        
        const submitBtn = dom.joinForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        
        try {
            showNotification('Envoi de votre demande d\'adhésion...', 'info');
            
            const form = e.target;
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Votre demande d\'adhésion a été envoyée !', 'success');
                
                await sendForm({name, email, location, message}, 'join_request');
                
                dom.joinForm.reset();
                
                setTimeout(() => {
                    hideFormModal(dom.joinModal);
                }, 2000);
            } else {
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            }
            
        } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur de connexion. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
    
    // Menu items
    dom.contributeMenuItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showFormModal(dom.contributeModal);
    });
    
    dom.joinMenuItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showFormModal(dom.joinModal);
    });
    
    dom.historyMenuItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        displaySearchHistory();
        showModal(dom.historyModal);
    });
    
    dom.favoritesItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        displayFavorites();
        showModal(dom.favoritesModal);
    });
    
    dom.grammarItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showModal(dom.developmentModal);
    });
    
    dom.conjugationItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showModal(dom.developmentModal);
    });
    
    dom.contactMenuItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showModal(dom.contactModal);
    });
    
    dom.helpItem.addEventListener('click', (e) => {
        e.preventDefault();
        closeSideMenu();
        showModal(dom.helpModal);
    });
    
    // Footer links
    dom.footerContact.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(dom.contactModal);
    });
    
    dom.footerAbout.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(dom.aboutModal);
    });
    
    dom.footerPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(dom.privacyModal);
    });
    
    dom.footerTerms.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(dom.termsModal);
    });
    
    // Boutons de fermeture
    dom.closeContributeModal.addEventListener('click', () => hideFormModal(dom.contributeModal));
    dom.closeJoinModal.addEventListener('click', () => hideFormModal(dom.joinModal));
    
    dom.closeContactModal.addEventListener('click', () => hideModal(dom.contactModal));
    dom.closeAboutModal.addEventListener('click', () => hideModal(dom.aboutModal));
    dom.closePrivacyModal.addEventListener('click', () => hideModal(dom.privacyModal));
    dom.closeTermsModal.addEventListener('click', () => hideModal(dom.termsModal));
    dom.closeFavoritesModal.addEventListener('click', () => hideModal(dom.favoritesModal));
    dom.closeHistoryModal.addEventListener('click', () => hideModal(dom.historyModal));
    dom.closeDevelopmentModal.addEventListener('click', () => hideModal(dom.developmentModal));
    dom.closeHelpModal.addEventListener('click', () => hideModal(dom.helpModal));
    
    // Effacer l'historique
    dom.clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment effacer tout votre historique de recherche ?')) {
            state.searchHistory = [];
            saveSearchHistory();
            displaySearchHistory();
            showNotification('Historique effacé', 'success');
        }
    });
    
    // Gestion du redimensionnement
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 300);
    });
    
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            dom.searchInput.placeholder = "Rechercher...";
            dom.advancedFiltersBtn.style.order = '3';
            dom.searchExitText.style.order = '4';
        } else {
            dom.searchInput.placeholder = "Rechercher un mot dans tous les dialectes...";
            dom.advancedFiltersBtn.style.order = '';
            dom.searchExitText.style.order = '';
        }
        
        if (!isMobile) {
            dom.advancedFiltersBtn.innerHTML = `<i class="fas fa-sliders-h"></i>`;
            dom.advancedFiltersBtn.style.width = '48px';
            dom.advancedFiltersBtn.style.padding = '0';
            
            if (state.isSearchFocused) {
                state.isSearchFocused = false;
                dom.searchBox.classList.remove('focused');
                dom.mainContent.classList.remove('search-focused');
                dom.headerLogo.classList.remove('visible');
                stopLogoAnimation();
            }
        } else {
            dom.advancedFiltersBtn.innerHTML = `<i class="fas fa-sliders-h"></i>`;
            dom.advancedFiltersBtn.style.width = '48px';
            dom.advancedFiltersBtn.style.padding = '0';
        }
        
        dom.dialectsList.classList.remove('show');
        dom.advancedFiltersPanel.classList.remove('open');
    }
    
    // Gestion du clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openFormModal = document.querySelector('.form-modal.show');
            if (openFormModal) {
                hideFormModal(openFormModal);
            } else {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    hideModal(openModal);
                } else {
                    closeSideMenu();
                    dom.dialectsList.classList.remove('show');
                    dom.searchResults.classList.remove('active');
                    dom.advancedFiltersPanel.classList.remove('open');
                }
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            dom.searchInput.focus();
        }
    });
    
    // Prévention du zoom sur mobile
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===== DÉMARRAGE =====
document.addEventListener('DOMContentLoaded', init);

// Fonctions globales
window.selectDialect = selectDialect;
window.pronounceWord = pronounceWord;
window.toggleFavorite = toggleFavorite;
window.exitSearch = exitSearch;
window.stopLogoAnimation = stopLogoAnimation;
window.startLogoAnimation = startLogoAnimation;
window.displaySearchHistory = displaySearchHistory;

// Fonctions pour tester votre backend
window.chercherMot = async function() {
    const mot = prompt("Entrez un mot en swahili à rechercher:");
    if (!mot) return;
    
    try {
        const response = await fetch(`${state.apiBaseUrl}/mot/${encodeURIComponent(mot)}`);
        const result = await response.json();
        console.log("Résultats de l'API:", result);
        
        if (result.success && result.data && result.data.length > 0) {
            alert(`Résultats pour "${mot}":\n\n${result.data.map(item => `• ${item.mot_swahili} = ${item.traduction_fr}`).join('\n')}`);
        } else {
            alert(`Aucun résultat trouvé pour "${mot}"\n${result.message || ''}`);
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la recherche: " + error.message);
    }
};

window.ajouterMot = async function() {
    const motSwahili = prompt("Mot en swahili:");
    if (!motSwahili) return;
    
    const traductionFr = prompt("Traduction en français:");
    if (!traductionFr) return;
    
    try {
        const result = await addWordToDatabase(motSwahili, traductionFr);
        alert(`Mot "${motSwahili}" ajouté avec succès!\n${result.message || ''}`);
    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de l'ajout du mot: " + error.message);
    }
};

// Fonction pour tester la connexion
window.testerConnexion = function() {
    testBackendConnection()
        .then(result => {
            if (result.success) {
                alert(`✅ Backend connecté\n${result.message}`);
            } else {
                alert(`❌ Erreur de connexion\n${result.message}`);
            }
        })
        .catch(error => {
            alert(`❌ Erreur de connexion\n${error.message}`);
        });
};

// Fonction utilitaire pour tester directement l'API
window.testerAPI = function() {
    const tests = [
        `${state.apiBaseUrl}/`,
        `${state.apiBaseUrl}/mot/rafiki`,
        `${state.apiBaseUrl}/mot/jambo`
    ];
    
    console.log('🧪 Tests API en cours...');
    
    tests.forEach(async (url) => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(`📡 ${url}:`, result);
        } catch (error) {
            console.error(`❌ ${url}:`, error);
        }
    });
    
    showNotification('Tests API exécutés - voir console', 'info');
};
