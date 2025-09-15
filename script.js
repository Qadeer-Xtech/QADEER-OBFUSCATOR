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

// Level 3: QADEER-LOCK (EXTREME Multi-Layer Security)
// WARNING: Is level se code ka size barh sakta hai, lekin security na-qabil-e-yaqeen had tak mazboot hogi.
const qadeerMaxOptions = {
    // Layer 1: Domain Lock (Apni website ka naam likhein)
    // Yeh script sirf aapki di hui websites par chalegi, kahin aur copy karne par kaam nahi karegi.
    domainLock: ['https://Your-Website.com', 'www.Your-Website.com'],
    domainLockRedirectUrl: 'about:blank', // Ghalat domain par user ko yahan bhej dega

    // Layer 2: Self Defending & Debug Protection
    // Code ko format karne ya kholne ki koshish karne par usay crash kar deta hai.
    selfDefending: true,
    debugProtection: true,
    debugProtectionInterval: 4000,

    // Layer 3: Control Flow & Dead Code Injection
    // Code ke asal logic ko hazaron fuzool code blocks ke andar chupa deta hai.
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,

    // Layer 4: Advanced String & Object Obfuscation
    // Tamam text (strings) ko encrypt karke ek aesi jaga rakh deta hai jahan se unhe samajhna na-mumkin hota hai.
    stringArray: true,
    stringArrayEncoding: ['rc4'], // Strongest encoding
    stringArrayThreshold: 1,
    stringArrayRotate: true,
    stringArrayWrappersCount: 15, // Wrappers ki tadad bohot ziada
    stringArrayWrappersParametersMaxCount: 15,
    stringArrayWrappersChained: true,
    stringArrayWrappersType: 'function',
    transformObjectKeys: true,
    splitStrings: true,
    splitStringsChunkLength: 2, // Strings ko chotay tukron mein torta hai

    // Layer 5: Variable & Number Obfuscation
    // Tamam variable names ko badal deta hai aur numbers ko mushkil hisaabi formulas mein tabdeel kar deta hai.
    identifierNamesGenerator: 'mangled-shuffled',
    renameGlobals: true, // Sab se powerful option
    numbersToExpressions: true,

    // Layer 6: General Settings
    compact: true,
    disableConsoleOutput: true,
    log: false,
    seed: 0, // Har baar alag result dega
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
        const currentOptions = levels[selectedLevel].options;

        // Agar user Qadeer-Lock select kare, to usay domain lock ke baray mein inform karein
        if (selectedLevel === '3' && currentOptions.domainLock && currentOptions.domainLock.includes('https://Your-Website.com')) {
             const userDomains = prompt(
                "QADEER-LOCK SECURITY:\n" +
                "Yeh script sirf un websites par chalegi jin ka naam aap yahan likhenge.\n" +
                "Apni website ke naam likhein (e.g., mywebsite.com, another.net).\n" +
                "Agar multiple hain to comma (,) daal kar likhein.",
                "my-app.com"
            );

            if (userDomains) {
                // User ke input se domains ki list banayein
                const domainList = userDomains.split(',').map(d => d.trim());
                // Options mein user ke domains set karein
                currentOptions.domainLock = domainList;
            } else {
                // Agar user cancel kar de, to obfuscation rokein
                outputCode.value = "// Domain Lock canceled. Obfuscation stopped.";
                return;
            }
        }
        
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, currentOptions);
        
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
    if(outputCode.value && !outputCode.value.startsWith("// Please write")){
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

    const blob = new Blob([outputCode.value], { type: 'application/javascript' });
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

