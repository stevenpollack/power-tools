#!/usr/bin/env node
/**
 * Fix field naming inconsistencies in authors-data.json
 * Convert camelCase to snake_case to match integration test expectations
 */

const fs = require('fs');
const path = require('path');

const authorsDataPath = path.join(__dirname, '../data/authors-data.json');
const styleAnalysesPath = path.join(__dirname, '../data/style-analyses.json');

console.log('🔧 Fixing field name inconsistencies...');

// Fix authors data
let authorsData = JSON.parse(fs.readFileSync(authorsDataPath, 'utf8'));

authorsData = authorsData.map(author => ({
    id: author.id,
    name: author.name,
    slug: author.slug,
    lifespan: author.lifespan,
    nationality: author.nationality,
    primary_works: author.primaryWorks || author.primary_works,
    style_keywords: author.styleKeywords || author.style_keywords,
    literary_movement: author.literaryMovement || author.literary_movement,
    portrait_metadata: author.portrait || author.portrait_metadata
}));

fs.writeFileSync(authorsDataPath, JSON.stringify(authorsData, null, 2));
console.log('✅ Fixed authors-data.json field names');

// Fix style analyses
let styleAnalyses = JSON.parse(fs.readFileSync(styleAnalysesPath, 'utf8'));

Object.keys(styleAnalyses).forEach(authorId => {
    const analysis = styleAnalyses[authorId];
    if (analysis.detailed && !analysis.detailed_analysis) {
        analysis.detailed_analysis = analysis.detailed;
        delete analysis.detailed;
    }
});

fs.writeFileSync(styleAnalysesPath, JSON.stringify(styleAnalyses, null, 2));
console.log('✅ Fixed style-analyses.json field names');

console.log('🎉 All field naming inconsistencies fixed!'); 