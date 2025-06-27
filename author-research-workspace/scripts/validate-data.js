#!/usr/bin/env node

/**
 * Author Data Validation Script
 * Validates authors-data.json and style-analyses.json against expected schema
 */

const fs = require('fs');
const path = require('path');

// Expected author IDs from mission briefing
const REQUIRED_AUTHORS = [
  'hemingway', 'kafka', 'wilde', 'woolf', 'dickens', 'lovecraft',
  'austen', 'twain', 'poe', 'kerouac', 'orwell', 'rand'
];

// Required fields for author objects
const AUTHOR_REQUIRED_FIELDS = [
  'id', 'name', 'slug', 'lifespan', 'nationality', 'primaryWorks',
  'styleKeywords', 'literaryMovement', 'portrait'
];

const PORTRAIT_REQUIRED_FIELDS = ['filename', 'source', 'license'];

// Required fields for style analysis objects
const STYLE_ANALYSIS_REQUIRED_FIELDS = [
  'summary', 'detailed', 'vocabulary', 'sentenceStructure', 'themes', 'quirks'
];

function validateAuthorsData() {
  console.log('🔍 Validating authors data...');
  
  try {
    const authorsPath = path.join(__dirname, '../data/authors-data.json');
    const authorsData = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));
    
    // Check if it's an array
    if (!Array.isArray(authorsData)) {
      throw new Error('Authors data must be an array');
    }
    
    // Check if we have exactly 12 authors
    if (authorsData.length !== 12) {
      throw new Error(`Expected 12 authors, found ${authorsData.length}`);
    }
    
    // Validate each author
    const foundIds = [];
    for (const author of authorsData) {
      // Check required fields
      for (const field of AUTHOR_REQUIRED_FIELDS) {
        if (!author.hasOwnProperty(field)) {
          throw new Error(`Author ${author.id || 'unknown'} missing required field: ${field}`);
        }
      }
      
      // Validate specific field types
      if (typeof author.id !== 'string' || author.id.trim() === '') {
        throw new Error(`Author ID must be non-empty string, found: ${author.id}`);
      }
      
      if (!Array.isArray(author.primaryWorks) || author.primaryWorks.length < 3) {
        throw new Error(`Author ${author.id} must have at least 3 primary works`);
      }
      
      if (!Array.isArray(author.styleKeywords) || author.styleKeywords.length < 3) {
        throw new Error(`Author ${author.id} must have at least 3 style keywords`);
      }
      
      // Validate portrait object
      if (typeof author.portrait !== 'object') {
        throw new Error(`Author ${author.id} portrait must be an object`);
      }
      
      for (const field of PORTRAIT_REQUIRED_FIELDS) {
        if (!author.portrait.hasOwnProperty(field)) {
          throw new Error(`Author ${author.id} portrait missing field: ${field}`);
        }
      }
      
      foundIds.push(author.id);
    }
    
    // Check if all required authors are present
    for (const requiredId of REQUIRED_AUTHORS) {
      if (!foundIds.includes(requiredId)) {
        throw new Error(`Missing required author: ${requiredId}`);
      }
    }
    
    // Check for duplicates
    const uniqueIds = [...new Set(foundIds)];
    if (uniqueIds.length !== foundIds.length) {
      throw new Error('Duplicate author IDs found');
    }
    
    console.log('✅ Authors data validation passed');
    return true;
    
  } catch (error) {
    console.error('❌ Authors data validation failed:', error.message);
    return false;
  }
}

function validateStyleAnalyses() {
  console.log('🔍 Validating style analyses...');
  
  try {
    const stylesPath = path.join(__dirname, '../data/style-analyses.json');
    const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));
    
    // Check if it's an object
    if (typeof stylesData !== 'object' || Array.isArray(stylesData)) {
      throw new Error('Style analyses data must be an object');
    }
    
    // Check if all required authors have style analyses
    for (const authorId of REQUIRED_AUTHORS) {
      if (!stylesData.hasOwnProperty(authorId)) {
        throw new Error(`Missing style analysis for author: ${authorId}`);
      }
      
      const analysis = stylesData[authorId];
      
      // Check required fields
      for (const field of STYLE_ANALYSIS_REQUIRED_FIELDS) {
        if (!analysis.hasOwnProperty(field)) {
          throw new Error(`Style analysis for ${authorId} missing field: ${field}`);
        }
      }
      
      // Validate field types
      if (typeof analysis.summary !== 'string' || analysis.summary.length < 50) {
        throw new Error(`Style analysis summary for ${authorId} must be at least 50 characters`);
      }
      
      if (typeof analysis.detailed !== 'string' || analysis.detailed.length < 200) {
        throw new Error(`Style analysis detailed for ${authorId} must be at least 200 characters`);
      }
      
      if (!Array.isArray(analysis.themes) || analysis.themes.length < 3) {
        throw new Error(`Style analysis for ${authorId} must have at least 3 themes`);
      }
      
      if (!Array.isArray(analysis.quirks) || analysis.quirks.length < 3) {
        throw new Error(`Style analysis for ${authorId} must have at least 3 quirks`);
      }
    }
    
    console.log('✅ Style analyses validation passed');
    return true;
    
  } catch (error) {
    console.error('❌ Style analyses validation failed:', error.message);
    return false;
  }
}

function validateDataIntegrity() {
  console.log('🔍 Validating data integrity...');
  
  try {
    const authorsPath = path.join(__dirname, '../data/authors-data.json');
    const stylesPath = path.join(__dirname, '../data/style-analyses.json');
    
    const authorsData = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));
    const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));
    
    // Check that every author has a corresponding style analysis
    for (const author of authorsData) {
      if (!stylesData.hasOwnProperty(author.id)) {
        throw new Error(`No style analysis found for author: ${author.id}`);
      }
    }
    
    // Check that every style analysis has a corresponding author
    for (const authorId of Object.keys(stylesData)) {
      const authorExists = authorsData.some(author => author.id === authorId);
      if (!authorExists) {
        throw new Error(`Style analysis exists for non-existent author: ${authorId}`);
      }
    }
    
    console.log('✅ Data integrity validation passed');
    return true;
    
  } catch (error) {
    console.error('❌ Data integrity validation failed:', error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting author data validation...\n');
  
  const authorsValid = validateAuthorsData();
  const stylesValid = validateStyleAnalyses();
  const integrityValid = validateDataIntegrity();
  
  console.log('\n📊 Validation Summary:');
  console.log(`Authors Data: ${authorsValid ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Style Analyses: ${stylesValid ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Data Integrity: ${integrityValid ? '✅ PASS' : '❌ FAIL'}`);
  
  if (authorsValid && stylesValid && integrityValid) {
    console.log('\n🎉 All validations passed! Data is ready for integration.');
    process.exit(0);
  } else {
    console.log('\n💥 Validation failed! Please fix the issues above.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  validateAuthorsData,
  validateStyleAnalyses,
  validateDataIntegrity
}; 