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


// ██████████████████████████████████████████████████████████████████
// ███ NEW: Deceptive Malware Name Generator for Level 3        ███
// ██████████████████████████████████████████████████████████████████
const malwareLexicon = [
    'process', 'inject', 'payload', 'transmit', 'kernel', 'panic',
    'root', 'shell', 'exploit', 'buffer', 'overflow', 'malware',
    'trojan', 'worm', 'virus', 'backdoor', 'keylog', 'spyware',
    'ransom', 'crypto', 'miner', 'botnet', 'zombie', 'attack',
    'phish', 'spoof', 'socket', 'thread', 'memory', 'leak',
    'data', 'packet', 'intercept', 'hook', 'syscall', 'fs', 'regedit',
    'delete', 'system32', 'critical', 'failure', 'compromised'
];

// This function creates scary looking names like _0x_inject_a4f1
function malwareNamesGenerator() {
    const prefix = '_0x_';
    const word = malwareLexicon[Math.floor(Math.random() * malwareLexicon.length)];
    const hex = (Math.random() * 0xFFFF | 0).toString(16).padStart(4, '0');
    return `${prefix}${word}_${hex}`;
}


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

// Level 2: HARD-ADV (Uses the previous QADEER-ULTRA settings)
const hardAdvOptions = {
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


// ██████████████████████████████████████████████████████████████████
// ███ CHANGE: QADEER-ULTRA (Level 3) is now a DECEPTIVE version  ███
// ██████████████████████████████████████████████████████████████████
// Level 3: QADEER-LOCK-ULTRA (DECEPTIVE MALWARE-LIKE PROTECTION) ☣️
const qadeerUltraOptions = {
    // Core Defense
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 0,

    // Maximum Logic Obfuscation
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,

    // NEW: Deceptive Naming and String Injection
    stringArray: true,
    stringArrayEncoding: ['rc4', 'base64'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 50,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    // NEW: Custom generator to create scary names
    identifierNamesGenerator: 'custom',
    customIdentifierNamesGenerator: malwareNamesGenerator,
    renameGlobals: true,

    // Advanced Transformations
    transformObjectKeys: true,
    splitStrings: true,
    splitStringsChunkLength: 3,
    unicodeEscapeSequence: true,
    numbersToExpressions: true,
    // NEW: Forces scary strings into the code to mislead analysts
    forceTransformStrings: [
        'C:\\Windows\\System32',
        'System integrity compromised. Virus detected.',
        'Initiating rootkit...',
        'Access Denied: Admin privileges required.',
        'Transmitting data to external server...',
        'Corrupting file system...',
        'format C: /y'
    ],

    // Final Settings
    compact: true,
    disableConsoleOutput: true,
    log: false,
};


// ⭐ LEVEL 4: QADEER-ULTRA-PRO-MAX (UNBREAKABLE DEFENSE) ☢️
const qadeerUltraProMaxOptions = {
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 0,
    domainLock: ['your-domain.com', 'www.your-domain.com'],
    domainLockRedirectUrl: 'about:blank',
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    stringArray: true,
    stringArrayEncoding: ['rc4', 'base64'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 50,
    stringArrayWrappersParametersMaxCount: 50,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
    splitStrings: true,
    splitStringsChunkLength: 2,
    unicodeEscapeSequence: true,
    identifierNamesGenerator: 'mangled-shuffled',
    identifiersPrefix: 'QDR',
    renameGlobals: true,
    numbersToExpressions: true,
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

        if (selectedLevel === '4') {
             const userDomains = prompt("You've selected ULTRA-PRO-MAX.\nPlease enter the domains where this code should run, separated by commas (e.g., mysite.com, app.mysite.com):");
             if (userDomains) {
                 const dynamicOptions = { ...currentOptions };
                 dynamicOptions.domainLock = userDomains.split(',').map(d => d.trim());
                 runObfuscation(code, dynamicOptions, selectedLevel);
             } else {
                 alert("Domain Lock is required for this level. Aborting.");
                 return;
             }
        } else {
            runObfuscation(code, currentOptions, selectedLevel);
        }

    } catch (error) {
        outputCode.value = `Error during JS Obfuscation:\n\n${error.message}\n\nThis might be because the selected security level is too high for this specific script. Try a lower level.`;
    }
}


// ██████████████████████████████████████████████████████████████████
// ███ CHANGE: New Warning Header for the Deceptive Level 3     ███
// ██████████████████████████████████████████████████████████████████
function runObfuscation(code, options, selectedLevel) {
     const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options);
     let header = '';

     if (selectedLevel === '3') {
         header = `// ☣️ WARNING: MALICIOUS CODE DETECTED ☣️
// This script contains a polymorphic, self-replicating worm.
// DO NOT ATTEMPT TO ANALYZE OR REVERSE-ENGINEER.
// Tampering with this code will trigger a system-wide security breach.
// YOUR IP AND MACHINE ID HAVE BEEN LOGGED.
// --- Protection by Qadeer Khan --- \n`;
     } else {
         const now = new Date();
         const dateTimeString = now.toLocaleString('en-PK', {
             timeZone: 'Asia/Karachi',
             dateStyle: 'full',
             timeStyle: 'long'
         });
         header = `// By Qadeer khan\n// Protected on: ${dateTimeString}\n// Security Level: ${levels[selectedLevel].label}\n// --- \n`;
     }

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
