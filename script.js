// ====================================================================
// QADEER Obfuscator Script
// Feature: File Upload with Progress Percentage
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

// --- Define the obfuscation options for each security level ---
const levels = {
    '1': {
        label: 'BASIC',
        options: {
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            stringArray: false,
            transformObjectKeys: false
        }
    },
    '2': {
        label: 'MEDIUM',
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.5,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.2,
            stringArray: true,
            stringArrayThreshold: 0.7,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }
    },
    '3': {
        label: 'ADVANCED',
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            stringArray: true,
            stringArrayThreshold: 1,
            stringArrayEncoding: ['base64'],
            stringArrayWrappersCount: 4,
            transformObjectKeys: true,
            renameGlobals: true,
            identifierNamesGenerator: 'hexadecimal',
            splitStrings: true,
            selfDefending: true
        }
    },
    '4': {
        label: 'HARD-ADV',
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            disableConsoleOutput: true,
            renameGlobals: true,
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
            identifierNamesGenerator: 'hexadecimal'
        }
    }
};

// --- Event Listeners ---

// Function to update slider dots
function updateDots(level) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === level - 1);
    });
}

// Event listener for the security slider
securitySlider.addEventListener('input', () => {
    const level = parseInt(securitySlider.value, 10);
    levelValue.textContent = levels[level].label;
    updateDots(level);
});

// Event listener for the "Obfuscate Code" button
obfuscateBtn.addEventListener('click', () => {
    const codeToObfuscate = inputCode.value;
    if (!codeToObfuscate.trim()) {
        outputCode.value = "// Please write or paste your JavaScript code first.";
        return;
    }
    try {
        const selectedOptions = levels[securitySlider.value].options;
        const obfuscatedResult = window.JavaScriptObfuscator.obfuscate(codeToObfuscate, selectedOptions);
        outputCode.value = `// Obfuscated with [${levels[securitySlider.value].label}] settings.\n` + obfuscatedResult.getObfuscatedCode();
    } catch (error) {
        outputCode.value = 'Error: ' + error.message;
    }
});

// Event listener for the "Copy" button
copyBtn.addEventListener('click', () => {
    outputCode.select();
    document.execCommand('copy');
});

// Event listener for the "Download" button
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([outputCode.value], {
        type: 'application/javascript'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'hard-obfuscated-script.js';
    link.click();
    URL.revokeObjectURL(link.href); // Clean up memory
});

// --- File Upload Logic with Progress ---
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Show progress element and reset text
    uploadProgress.textContent = 'Uploading... 0%';
    uploadProgress.style.display = 'block';

    // Update progress as file is read
    reader.onprogress = (e) => {
        if (e.lengthComputable) {
            const percentLoaded = Math.round((e.loaded / e.total) * 100);
            uploadProgress.textContent = `Uploading... ${percentLoaded}%`;
        }
    };

    // When file is fully loaded, show in textarea
    reader.onload = (e) => {
        inputCode.value = e.target.result;
        uploadProgress.textContent = 'Upload Complete! ✅';
        // Hide the progress message after 2 seconds
        setTimeout(() => {
            uploadProgress.style.display = 'none';
        }, 2000);
    };

    // Handle file reading errors
    reader.onerror = () => {
        console.error("File reading error");
        alert("Sorry, there was an error reading the file.");
        uploadProgress.style.display = 'none';
    };

    reader.readAsText(file);
});


// Initialize the slider and level display on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialLevel = parseInt(securitySlider.value, 10);
    levelValue.textContent = levels[initialLevel].label;
    updateDots(initialLevel);
});
