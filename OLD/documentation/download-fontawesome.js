const https = require('https');
const fs = require('fs');
const path = require('path');

// Create necessary directories
const cssDir = path.join(__dirname, 'fonts', 'fontawesome', 'css');
const webfontsDir = path.join(__dirname, 'fonts', 'fontawesome', 'webfonts');

if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
}

if (!fs.existsSync(webfontsDir)) {
    fs.mkdirSync(webfontsDir, { recursive: true });
}

// Download CSS
const downloadCSS = () => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(cssDir, 'all.min.css'));
        https.get('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('CSS file downloaded');
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join(cssDir, 'all.min.css'), () => {});
            reject(err);
        });
    });
};

// Download webfont files (partial list of the most commonly used files)
const webfontFiles = [
    'fa-brands-400.woff2',
    'fa-regular-400.woff2',
    'fa-solid-900.woff2',
    'fa-brands-400.ttf',
    'fa-regular-400.ttf',
    'fa-solid-900.ttf'
];

const downloadWebfont = (filename) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(webfontsDir, filename));
        https.get(`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/${filename}`, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Webfont file ${filename} downloaded`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join(webfontsDir, filename), () => {});
            reject(err);
        });
    });
};

// Main function
async function main() {
    try {
        // Download CSS
        await downloadCSS();
        
        // Download webfonts
        for (const file of webfontFiles) {
            await downloadWebfont(file);
        }
        
        // Update CSS file paths to point to local webfonts
        let cssContent = fs.readFileSync(path.join(cssDir, 'all.min.css'), 'utf8');
        cssContent = cssContent.replace(/\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/webfonts\//g, '../webfonts/');
        fs.writeFileSync(path.join(cssDir, 'all.min.css'), cssContent);
        
        console.log('Font Awesome successfully downloaded and configured for local use!');
    } catch (error) {
        console.error('Error downloading Font Awesome:', error);
    }
}

main();