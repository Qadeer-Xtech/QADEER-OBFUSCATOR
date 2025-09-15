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

// --- Obfuscation Options for Each Security Level (Updated for Compact & Hard Security) ---

// Level 1: ADVANCED (Compact & Strong)
// Yeh Fuzool code (dead code) nahi daalta, is liye output chota rehta hai.
const advancedOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false, // Output size kam karne ke liye isko band kar diya hai
    debugProtection: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['base64'], // base64 encoding thori compact hoti hai
    stringArrayThreshold: 0.75,
    stringArrayRotate: true,
};

// Level 2: HARD-ADV (Very Strong & Compact)
// Is main debug protection on hai taake koi code ko aasani se analyze na kar sakay.
const hardAdvOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    debugProtection: true, // Debugging rokne ke liye
    debugProtectionInterval: 2000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled-shuffled',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'], // rc4 ziada secure hai
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
};

// Level 3: QADEER-LOCK (Maximum Compact Security)
// Yeh global variables ko bhi rename kar deta hai jis se code samajhna na-mumkin ho jata hai.
// WARNING: Yeh option kuch codes ko break kar sakta hai agar wo HTML se interact kar rahe hon.
const qadeerMaxOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: false,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled',
    log: false,
    renameGlobals: true, // Sab se powerful option, lekin risky ho sakta hai
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
    splitStringsChunkLength: 5, // Strings ko chotay hisson mein torta hai
    transformObjectKeys: true,
    unicodeEscapeSequence: false, // Size kam rakhta hai
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
