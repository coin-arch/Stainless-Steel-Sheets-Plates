
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(process.cwd(), 'public_html', 'technical.html');
const outputPath = path.join(process.cwd(), 'src', 'data', 'technical-data.json');

// Ensure data dir exists
const dataDir = path.dirname(outputPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

try {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const $ = cheerio.load(html);
    const result = [];

    // Iterate over each accordion block
    $('.accordion.block').each((i, el) => {
        const $el = $(el);
        // Extract title - usually in .acc-btn
        let title = $el.find('.acc-btn').text().trim();

        // Clean up title (remove icons/extra whitespace)
        title = title.replace(/\s+/g, ' ').trim(); // Normalize spaces

        const sections = [];

        // Find tables inside the content
        // The structure seems to be .acc-content -> .content -> .panel-body -> .table-responsive > table
        // Or sometimes headers h4 before tables

        const $content = $el.find('.acc-content .panel-body');

        // We will try to group tables with their preceding headings if possible
        // But for simplicity, let's just grab all tables and their headers

        $content.find('.table-responsive').each((j, tblWrapper) => {
            const $wrapper = $(tblWrapper);

            // Try to find a header immediately preceding this wrapper
            let sectionTitle = $wrapper.prev('h4').text().trim();
            if (!sectionTitle) {
                // Try looking at previous siblings until we hit a header or another table
                let prev = $wrapper.prev();
                let steps = 0;
                while (prev.length && steps < 5) {
                    if (prev.is('h4')) {
                        sectionTitle = prev.text().trim();
                        break;
                    }
                    if (prev.is('.table-responsive')) break; // Stop if we hit another table
                    prev = prev.prev();
                    steps++;
                }
            }
            if (!sectionTitle) sectionTitle = 'Data Table';

            const $table = $wrapper.find('table');
            const headers = [];
            const rows = [];

            // Extract headers
            $table.find('thead tr, tbody tr:first-child').first().find('th, td').each((k, th) => {
                let headerText = $(th).text().replace(/\s+/g, ' ').trim();
                if (headerText) headers.push(headerText);
            });
            // Fallback if multiple header rows (common in these legacy tables) involves complex logic
            // providing raw HTML might be safer if structure is very complex, 
            // but let's try to get clean text data first. 

            // Actually, let's extract ALL rows and let the UI handle generic rendering
            $table.find('tr').each((r, tr) => {
                const rowData = [];
                $(tr).find('td, th').each((d, td) => {
                    // removing newlines and condensing spaces
                    rowData.push($(td).text().replace(/\s+/g, ' ').trim());
                });
                if (rowData.some(x => x)) { // Only add if not empty
                    rows.push(rowData);
                }
            });

            sections.push({
                subTitle: sectionTitle,
                rows: rows
            });
        });

        // Special case for Pipe Data which references another page/image in the hardcoded version
        // If no tables found, maybe grab text?
        if (sections.length === 0) {
            const text = $content.text().trim();
            if (text) {
                sections.push({
                    subTitle: 'Information',
                    text: text,
                    rows: []
                });
            }
        }

        result.push({
            title,
            data: sections
        });
    });

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`Extracted ${result.length} categories to ${outputPath}`);

} catch (err) {
    console.error('Error extracting data:', err);
}
