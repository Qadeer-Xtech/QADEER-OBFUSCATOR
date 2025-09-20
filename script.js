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

// Level 3: QADEER-LOCK-ULTRA (PHOTO WALA POWERFUL SYSTEM) 🔒
// WARNING: Is level se code ka size bohot barh jaye ga, lekin security na-qabil-e-yaqeen had tak mazboot hogi.
const qadeerUltraOptions = {
    // Layer 1: Anti-Tampering & Debugging (Photo wala Anti-Analysis)
    // Code ko kholne, format karne ya "DevTools" mein dekhne ki koshish karne par
    // browser ko hang kar dega ya crash kar dega.
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 4000, // Har 4 second mein debugger check karega

    // Layer 2: Logic Obfuscation (Control Flow Mangling)
    // Code ke asal logic ko hazaron be-matlab code blocks aur
    // uljhay hue raaston (control flow) ke andar chupa deta hai. Yeh photo wala main feature hai.
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1, // Max Power
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1, // Max Power

    // Layer 3: Unreadable Code Generation (String & Variable Destruction)
    // Tamam text, variables, aur numbers ko aesi shaklon mein tabdeel kar deta hai jinhe parhna na-mumkin ho.
    stringArray: true,
    stringArrayEncoding: ['rc4'], // Strongest encoding
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 5, // High complexity
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
    unicodeEscapeSequence: true, // Sab kuch unicode mein badal dega (bohot powerful)

    // Layer 4: Variable & Number Obfuscation
    // Tamam variable names ko badal deta hai aur numbers ko mushkil hisaabi formulas mein tabdeel kar deta hai.
    identifierNamesGenerator: 'mangled-shuffled', // Unreadable names
    renameGlobals: false, // ⚠️ WARNING: Ise 'true' karne se code break ho sakta hai. Sirf expert use ke liye.
    numbersToExpressions: true,
    
    // Layer 5: Domain Lock (Code ko sirf aapki website par chalne dega)
    // Agar koi code copy karke apni site par chalayega to nahi chalega.
    // Apni website ka naam yahan daalein. Example: domainLock: ['qadeerkhan.com']
    domainLock: [], 
    domainLockRedirectUrl: 'about:blank',

    // Layer 6: General Settings
    compact: true,
    disableConsoleOutput: true,
    log: false,
    seed: 0, // Har baar alag result dega
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
