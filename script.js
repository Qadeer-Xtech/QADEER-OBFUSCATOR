/**
 * Qadeer Code Protector - script.js
 * Deobfuscated, cleaned, and upgraded by Gemini
 *
 * Changes:
 * 1. Code is now clean, readable, and has comments for better understanding.
 * 2. Security slider now has 5 levels.
 * 3. "Qadeer's Work" preset is now the "Advanced" (Level 3) preset.
 * 4. A new, extremely powerful "GEMINI-LOCK" (Level 5) preset has been added.
 */

// --- DOM Element Selection ---
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

// Level 1: Basic protection
const basicOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    stringArray: true,
    stringArrayThreshold: 0.7,
};

// Level 2: Medium protection (Original Medium)
const mediumOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    stringArray: true,
    stringArrayThreshold: 0.8,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
};

// Level 3: Advanced protection (Previously "Qadeer's Work")
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

// Level 4: Hard-Advanced protection (Original Hard-Adv)
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

// Level 5: NEW - GEMINI-LOCK (Maximum Security)
const geminiLockOptions = {
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
    renameGlobals: true, // Risky but powerful
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    splitStrings: true,
    splitStringsChunkLength: 3,
    transformObjectKeys: true,
    unicodeEscapeSequence: true,
    seed: 0 // For max randomness
};

// Structure to hold all levels
const levels = {
    '1': { label: 'BASIC', options: basicOptions },
    '2': { label: 'MEDIUM', options: mediumOptions },
    '3': { label: 'ADVANCED', options: advancedOptions }, // Qadeer's is now Advanced
    '4': { label: 'HARD-ADV', options: hardAdvOptions },
    '5': { label: 'GEMINI-LOCK', options: geminiLockOptions }  // New hardest level
};

// --- Functions ---

// Function to update the slider dots UI
function updateDots(level) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === level - 1);
    });
}

// Function to perform the obfuscation
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
        
        const header = `// Obfuscated by Qadeer Code Protector\n// https://github.com/Qadeer-Xtech\n// Security Level: ${levels[selectedLevel].label}\n`;
        outputCode.value = header + obfuscationResult.getObfuscatedCode();
        
    } catch (error) {
        outputCode.value = `Error during JS Obfuscation:\n\n${error.message}\n\nThis might be because the selected security level is too high for this specific script. Try a lower level.`;
    }
}

// Function to handle file reading
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

// Initialize when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const initialLevel = securitySlider.value;
    levelValue.textContent = levels[initialLevel].label;
    updateDots(initialLevel);
});

// Update UI when slider is moved
securitySlider.addEventListener('input', () => {
    const level = securitySlider.value;
    levelValue.textContent = levels[level].label;
    updateDots(level);
});

// Button click listeners
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
