// --- Elements ---
const securitySlider = document.getElementById('securitySlider');
const levelValue = document.getElementById('levelValue');
const inputCode = document.getElementById('inputCode');
const outputCode = document.getElementById('outputCode');
const obfuscateBtn = document.getElementById('obfuscateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const dots = document.querySelectorAll('.dot');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const fileNameInput = document.getElementById('fileNameInput');

// --- Obfuscation Options ---

// Level 1: ADVANCED (Compact & Strong)
const advancedOptions = {
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    stringArrayRotate: true,
};

// Level 2: HARD-ADV (Very Strong & Compact)
const hardAdvOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled-shuffled',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
};

// Level 3: QADEER-LOCK-ULTRA (EXTREME AI-Proof Security) 🔒
const qadeerUltraOptions = {
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 0,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 30,
    stringArrayWrappersParametersMaxCount: 30,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
    splitStrings: true,
    splitStringsChunkLength: 2,
    unicodeEscapeSequence: true,
    identifierNamesGenerator: 'mangled-shuffled',
    renameGlobals: true,
    numbersToExpressions: true,
    compact: true,
    disableConsoleOutput: true,
    log: false,
    seed: 0,
};

// ⭐ NEW LEVEL 4: QADEER-ULTRA-PRO-MAX (UNBREAKABLE DEFENSE) ☢️
// This is the most powerful level, designed for maximum security.
// WARNING: This will make your code MUCH larger and slower. Only use it for your most sensitive projects.
const qadeerUltraProMaxOptions = {
    // Layer 1: Anti-Tampering & Active Defense
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 0, // Infinite loop on debug
    // NEW: Domain Lock - Code will only run on these domains.
    domainLock: ['your-domain.com', 'www.your-domain.com'], // <-- IMPORTANT: Change this to your website!
    domainLockRedirectUrl: 'about:blank', // Redirects thieves to a blank page

    // Layer 2: Logic Obfuscation (Max Power)
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,

    // Layer 3: Extreme Unreadable Code Generation
    stringArray: true,
    // NEW: Multi-layered encoding for strings. Much harder to decode.
    stringArrayEncoding: ['rc4', 'base64'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    // NEW: Drastically increased wrapper count for maximum confusion.
    stringArrayWrappersCount: 50,
    stringArrayWrappersParametersMaxCount: 50,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
    splitStrings: true,
    splitStringsChunkLength: 2,
    unicodeEscapeSequence: true,

    // Layer 4: Extreme Variable & Number Obfuscation
    identifierNamesGenerator: 'mangled-shuffled',
    // NEW: Adds a prefix to all generated identifiers to make them un-trackable.
    identifiersPrefix: 'QDR',
    renameGlobals: true,
    numbersToExpressions: true,

    // Layer 5: Final Settings
    compact: true,
    disableConsoleOutput: true,
    log: false,
    seed: 0,
};


// Structure to hold all levels
const levels = {
    '1': {
        label: 'ADVANCED',
        options: advancedOptions
    },
    '2': {
        label: 'HARD-ADV',
        options: hardAdvOptions
    },
    '3': {
        label: 'ULTRA',
        options: qadeerUltraOptions
    },
    '4': {
        label: 'ULTRA-PRO-MAX',
        options: qadeerUltraProMaxOptions
    }
};

// --- Functions ---

function updateDots(level) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === level - 1);
    });
}

function obfuscateCode() {
    const code = inputCode.value;
    if (!code.trim()) {
        outputCode.value = "// Please write or paste your JavaScript code first.";
        return;
    }

    try {
        const selectedLevel = securitySlider.value;
        const currentOptions = levels[selectedLevel].options;

        // Special handling for the new level's domain lock
        if (selectedLevel === '4') {
             const userDomains = prompt("You've selected ULTRA-PRO-MAX.\nPlease enter the domains where this code should run, separated by commas (e.g., mysite.com, app.mysite.com):");
             if (userDomains) {
                 // Create a fresh copy of options to avoid modifying the original
                 const dynamicOptions = { ...currentOptions };
                 dynamicOptions.domainLock = userDomains.split(',').map(d => d.trim());
                 // Use these dynamic options for this one time
                 runObfuscation(code, dynamicOptions, selectedLevel);
             } else {
                 alert("Domain Lock is required for this level. Aborting.");
                 return;
             }
        } else {
            // For all other levels, run as normal
            runObfuscation(code, currentOptions, selectedLevel);
        }

    } catch (error) {
        outputCode.value = `Error during JS Obfuscation:\n\n${error.message}\n\nThis might be because the selected security level is too high for this specific script. Try a lower level.`;
    }
}

function runObfuscation(code, options, selectedLevel) {
     const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options);

     const now = new Date();
     const dateTimeString = now.toLocaleString('en-PK', {
         timeZone: 'Asia/Karachi',
         dateStyle: 'full',
         timeStyle: 'long'
     });
     const header = `// By Qadeer khan\n// Protected on: ${dateTimeString}\n// Security Level: ${levels[selectedLevel].label}\n// --- \n`;

     outputCode.value = header + obfuscationResult.getObfuscatedCode();
}


function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    uploadProgress.textContent = 'Uploading... 0%';
    uploadProgress.style.display = 'block';

    reader.onprogress = (e) => {
        if (e.lengthComputable) {
            const percentLoaded = Math.round((e.loaded / e.total) * 100);
            uploadProgress.textContent = `Uploading... ${percentLoaded}%`;
        }
    };

    reader.onload = (e) => {
        inputCode.value = e.target.result;
        uploadProgress.textContent = 'Upload Complete! ✅';
        setTimeout(() => {
            uploadProgress.style.display = 'none';
        }, 2000);
    };

    reader.onerror = () => {
        alert("Sorry, there was an error reading the file.");
        uploadProgress.style.display = 'none';
    };

    reader.readAsText(file);
}

function handleProtectClick() {
    const correctPassword = "POWER OF QADEER";
    const enteredPassword = prompt("Please enter the password to protect the code:");

    if (enteredPassword === null) {
        return;
    }

    if (enteredPassword === correctPassword) {
        obfuscateCode();
    } else {
        alert("Incorrect Password. Access Denied.");
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: Make sure your HTML slider goes up to level 4!
    // <input type="range" min="1" max="4" value="3" class="slider" id="securitySlider">
    console.log("Remember to set your slider's max value to 4 in your HTML file!");

    const initialLevel = securitySlider.value;
    levelValue.textContent = levels[initialLevel].label;
    updateDots(initialLevel);
});

securitySlider.addEventListener('input', () => {
    const level = securitySlider.value;
    levelValue.textContent = levels[level].label;
    updateDots(level);
});

obfuscateBtn.addEventListener('click', handleProtectClick);

copyBtn.addEventListener('click', () => {
    if (outputCode.value && !outputCode.value.startsWith("// Please write")) {
        outputCode.select();
        document.execCommand('copy');
    }
});

downloadBtn.addEventListener('click', () => {
    if (outputCode.value.trim() === '' || outputCode.value.startsWith('// Please write')) {
        alert("There is no protected code to download. Please obfuscate your code first.");
        return;
    }

    let filename = fileNameInput.value.trim();
    if (filename === '') {
        filename = 'protected-script.js';
    }

    if (!filename.toLowerCase().endsWith('.js')) {
        filename += '.js';
    }

    const blob = new Blob([outputCode.value], {
        type: 'application/javascript'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
});

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
