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
// WARNING: Is level se code ka size bohot barh jaye ga, lekin security na-qabil-e-yaqeen had tak mazboot hogi.
const qadeerUltraOptions = {
    // Layer 1: Anti-Tampering & Debugging
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 0, // 0 = Infinite loop on debug

    // Layer 2: Logic Obfuscation
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1, // Max Power
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1, // Max Power

    // Layer 3: Unreadable Code Generation
    stringArray: true,
    stringArrayEncoding: ['rc4'], // Strongest encoding
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

    // Layer 4: Variable & Number Obfuscation
    identifierNamesGenerator: 'mangled-shuffled',
    renameGlobals: true,
    numbersToExpressions: true,

    // Layer 5: General Settings
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
        label: 'QADEER-LOCK-ULTRA',
        options: qadeerUltraOptions
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

        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, currentOptions);

        const now = new Date();
        const dateTimeString = now.toLocaleString('en-PK', {
            timeZone: 'Asia/Karachi',
            dateStyle: 'full',
            timeStyle: 'long'
        });
        const header = `// By Qadeer khan\n// Protected on: ${dateTimeString}\n// Security Level: ${levels[selectedLevel].label}\n// --- \n`;

        outputCode.value = header + obfuscationResult.getObfuscatedCode();

    } catch (error) {
        outputCode.value = `Error during JS Obfuscation:\n\n${error.message}\n\nThis might be because the selected security level is too high for this specific script. Try a lower level.`;
    }
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

// --- NEW FUNCTION: Password Check ---
function handleProtectClick() {
    // The password is "hidden" here. In a real-world website, this isn't secure,
    // but for this tool, it works as requested.
    const correctPassword = "POWER OF QADEER";
    
    const enteredPassword = prompt("Please enter the password to protect the code:");

    if (enteredPassword === null) {
        // User clicked "Cancel", so we do nothing.
        return;
    }

    if (enteredPassword === correctPassword) {
        // If password is correct, run the obfuscator
        obfuscateCode();
    } else {
        // If password is wrong, show an error
        alert("Incorrect Password. Access Denied.");
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    const initialLevel = securitySlider.value;
    levelValue.textContent = levels[initialLevel].label;
    updateDots(initialLevel);
});

securitySlider.addEventListener('input', () => {
    const level = securitySlider.value;
    levelValue.textContent = levels[level].label;
    updateDots(level);
});

// MODIFIED: This now calls the password check function first
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
