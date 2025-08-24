// ====================================================================
// QADEER Obfuscator Script
// ====================================================================

// --- Get references to all the HTML elements ---
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
const htmlObfuscateBtn = document.getElementById('htmlObfuscateBtn');

// --- Define the obfuscation options for each security level ---
const levels = {
    '2': { label: 'MEDIUM', options: { compact: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.5, deadCodeInjection: true, deadCodeInjectionThreshold: 0.2, stringArray: true, stringArrayThreshold: 0.7, transformObjectKeys: true, unicodeEscapeSequence: false } },
    '3': { label: 'ADVANCED', options: { compact: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 1, deadCodeInjection: true, deadCodeInjectionThreshold: 1, stringArray: true, stringArrayThreshold: 1, stringArrayEncoding: ['base64'], stringArrayWrappersCount: 4, transformObjectKeys: true, renameGlobals: true, identifierNamesGenerator: 'hexadecimal', splitStrings: true, selfDefending: true } },
    '4': { label: 'HARD-ADV', options: { compact: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 1, deadCodeInjection: true, deadCodeInjectionThreshold: 1, disableConsoleOutput: true, renameGlobals: true, selfDefending: true, stringArray: true, stringArrayEncoding: ['rc4'], stringArrayThreshold: 1, stringArrayWrappersCount: 5, stringArrayWrappersChained: true, stringArrayWrappersType: 'function', splitStrings: true, splitStringsChunkLength: 2, transformObjectKeys: true, identifierNamesGenerator: 'hexadecimal' } },
    '5': {
        label: "QADEER'S WORK",
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,          
            debugProtectionInterval: true,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'mangled-shuffled',
            log: false,
            numbersToExpressions: true,
            renameGlobals: true,
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
            seed: 'QadeerXtech'
        }
    }
};

// --- Event Listeners ---

function updateDots(level) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === level - 2);
    });
}

securitySlider.addEventListener('input', () => {
    const level = parseInt(securitySlider.value, 10);
    levelValue.textContent = levels[level].label;
    updateDots(level);
});

obfuscateBtn.addEventListener('click', () => {
    const codeToObfuscate = inputCode.value;
    if (!codeToObfuscate.trim()) {
        outputCode.value = "// Please write or paste your JavaScript code first.";
        return;
    }
    try {
        const selectedOptions = levels[securitySlider.value].options;
        const obfuscatedResult = window.JavaScriptObfuscator.obfuscate(codeToObfuscate, selectedOptions);
        outputCode.value = '// Obfuscated By Qadeer Khan\n// https://github.com/Qadeer-Xtech\n' + obfuscatedResult.getObfuscatedCode();
    } catch (error) {
        outputCode.value = 'Error: ' + error.message;
    }
});

// <<< --- HTML OBFUSCATOR BUTTON KA CODE FIX KIYA GAYA --- >>>
htmlObfuscateBtn.addEventListener('click', () => {
    const htmlToObfuscate = inputCode.value;
    if (!htmlToObfuscate.trim()) {
        outputCode.value = "// Please write or paste your HTML code first.";
        return;
    }
    try {
        // Step 1: HTML code ko JavaScript string mein convert karo
        const jsString = `document.write(${JSON.stringify(htmlToObfuscate)});`;

        // Step 2: HTML ko load karne ke liye aik special, safe aur powerful setting istemal karo
        // Yahan se 'debugProtection' aur 'selfDefending' hata diya hai taake browser mein error na aaye
        const htmlLoaderOptions = {
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            renameGlobals: true,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 1,
            unicodeEscapeSequence: true,
            stringArrayWrappersCount: 3,
            stringArrayWrappersChained: true,
            identifierNamesGenerator: 'hexadecimal',
            splitStrings: true
        };

        // Step 3: JavaScript string ko new 'htmlLoaderOptions' se obfuscate karo
        const obfuscatedJs = window.JavaScriptObfuscator.obfuscate(jsString, htmlLoaderOptions).getObfuscatedCode();

        // Step 4: Final protected HTML file tayar karo
        const finalHtml = `\n<script>${obfuscatedJs}</script>`;
        
        outputCode.value = finalHtml;

    } catch (error) {
        outputCode.value = 'HTML Obfuscation Error: ' + error.message;
    }
});
// <<< --- FIX ENDS HERE --- >>>

copyBtn.addEventListener('click', () => {
    outputCode.select();
    document.execCommand('copy');
});

downloadBtn.addEventListener('click', () => {
    const blob = new Blob([outputCode.value], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qadeer-protected-file.html';
    link.click();
    URL.revokeObjectURL(link.href);
});

// --- File Upload Logic ---
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
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
        setTimeout(() => { uploadProgress.style.display = 'none'; }, 2000);
    };
    reader.onerror = () => {
        alert("Sorry, there was an error reading the file.");
        uploadProgress.style.display = 'none';
    };
    reader.readAsText(file);
});

document.addEventListener('DOMContentLoaded', () => {
    const initialLevel = parseInt(securitySlider.value, 10);
    levelValue.textContent = levels[initialLevel].label;
    updateDots(initialLevel);
});
