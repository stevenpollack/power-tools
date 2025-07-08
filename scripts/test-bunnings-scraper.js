#!/usr/bin/env node

/**
 * Test script for Bunnings scraper
 * Tests the scraping strategy on a single sub-category
 */

import puppeteer from "puppeteer";

async function testBunningsAccess() {
  console.log("🧪 Testing Bunnings access and brand extraction...");

  const browser = await puppeteer.launch({
    headless: false, // Use headed mode for debugging
    defaultViewport: { width: 1280, height: 720 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Set user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  try {
    // Test URL from task-at-hand.md strategy
    const testUrl =
      "https://www.bunnings.com.au/tools/power-tools/drills/drill-drivers";
    console.log(`📍 Navigating to: ${testUrl}`);

    await page.goto(testUrl, { waitUntil: "networkidle2", timeout: 30000 });

    console.log("✅ Successfully loaded page");

    // Test brand extraction logic
    const brandData = await page.evaluate(() => {
      const articles = document.querySelectorAll("article");
      console.log(`Found ${articles.length} articles`);

      const brands = new Map();

      articles.forEach((article, index) => {
        const link = article.querySelector("a[title]");
        if (link) {
          const title = link.getAttribute("title");
          const href = link.getAttribute("href");

          if (title && href) {
            // Extract brand name (first word of title)
            const brand = title.split(" ")[0].toLowerCase();

            // Store first tool for each unique brand
            if (!brands.has(brand)) {
              brands.set(brand, {
                brand,
                title,
                href: href.startsWith("/") ? href : `/${href}`,
                index,
              });
            }
          }
        }
      });

      return {
        totalArticles: articles.length,
        uniqueBrands: Array.from(brands.values()),
      };
    });

    console.log(`📊 Results:`);
    console.log(`  └─ Total articles found: ${brandData.totalArticles}`);
    console.log(`  └─ Unique brands found: ${brandData.uniqueBrands.length}`);

    brandData.uniqueBrands.forEach((brand, index) => {
      console.log(`  ${index + 1}. ${brand.brand}: ${brand.title}`);
    });

    // Test navigating to a single product page
    if (brandData.uniqueBrands.length > 0) {
      const firstBrand = brandData.uniqueBrands[0];
      const productUrl = `https://www.bunnings.com.au${firstBrand.href}`;

      console.log(`\n🔍 Testing product page scraping...`);
      console.log(`📍 Navigating to: ${productUrl}`);

      await page.goto(productUrl, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Test data extraction
      const productData = await page.evaluate(() => {
        const getText = (selector) => {
          const element = document.querySelector(selector);
          return element ? element.textContent.trim() : "";
        };

        const getAttr = (selector, attr) => {
          const element = document.querySelector(selector);
          return element ? element.getAttribute(attr) : "";
        };

        return {
          title: getText("h1"),
          price: getText('.price, [data-testid="price"], .current-price'),
          image: getAttr(
            ".product-image img, .hero-image img, .main-image img",
            "src",
          ),
          breadcrumbs: getText(".breadcrumbs, .breadcrumb"),
          description: getText(".product-description, .description").substring(
            0,
            200,
          ),
        };
      });

      console.log(`📋 Product data extracted:`);
      console.log(`  └─ Title: ${productData.title}`);
      console.log(`  └─ Price: ${productData.price}`);
      console.log(`  └─ Image: ${productData.image ? "Found" : "Not found"}`);
      console.log(
        `  └─ Description: ${productData.description}${productData.description.length >= 200 ? "..." : ""}`,
      );
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    await browser.close();
  }
}

// Run test
testBunningsAccess().catch(console.error);
