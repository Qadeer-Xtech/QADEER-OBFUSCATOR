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

// --- Obfuscation Options for Each Security Level ---

// Level 1: Advanced protection (Strong Base)
const advancedOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled-shuffled',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 7,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    splitStrings: true,
    splitStringsChunkLength: 2,
    transformObjectKeys: true,
    unicodeEscapeSequence: true,
};

// Level 2: Hard-Advanced protection (Very Strong)
const hardAdvOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    disableConsoleOutput: true,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    splitStrings: true,
    splitStringsChunkLength: 2,
    transformObjectKeys: true,
    identifierNamesGenerator: 'hexadecimal',
};

// Level 3: QADEER (Maximum & Experimental Security) - Pehle se ziada hard
const qadeerMaxOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled',
    log: false,
    numbersToExpressions: true,
    renameGlobals: true, // Renames global variables and functions
    renameProperties: true, // EXPERIMENTAL: Obfuscates object properties (e.g., obj.name -> obj._0x123). Can break code.
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 7, // Increased wrappers
    stringArrayWrappersParametersMaxCount: 7,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    splitStrings: true,
    splitStringsChunkLength: 2, // Smaller chunks are harder to read
    transformObjectKeys: true,
    unicodeEscapeSequence: true,
    seed: 0, // Ensures different output every time
    sourceMap: false, // Disables source maps completely
};

// Structure to hold all levels
const levels = {
    '1': { label: 'ADVANCED', options: advancedOptions },
    '2': { label: 'HARD-ADV', options: hardAdvOptions },
    '3': { label: 'QADEER-LOCK', options: qadeerMaxOptions }
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
        const options = levels[selectedLevel].options;
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options);
        
        // --- Create Custom Header ---
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'full', timeStyle: 'long' });
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

obfuscateBtn.addEventListener('click', obfuscateCode);

copyBtn.addEventListener('click', () => {
    outputCode.select();
    document.execCommand('copy');
});

downloadBtn.addEventListener('click', () => {
    const blob = new Blob([outputCode.value], { type: 'application/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'qadeer-protected-script.js';
    a.click();
    URL.revokeObjectURL(a.href);
});

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

