#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Sample generated reviews for key author-tool combinations
const sampleReviews = {
  "ernest-hemingway-reviews-bosch-professional-720w-125mm-corded-angle-grinder": `The grinder. Bosch. Professional grade. Seven hundred and twenty watts of honest power. I found this at my local Bunnings - surprisingly easy parking on a Saturday morning. Good. A man needs parking when he buys tools.

The weight. One point nine kilograms. Solid. Not heavy. Not light. Right. The way a grinder should feel. Balanced. The cord stays out of the way. Important. A man cuts metal. He does not fight cords.

The motor spins. Fast. Clean. The restart protection works. You stop. You start again. Safe. The ergonomic grip fits the hand. Natural. No strain after hours of work. The disc. One hundred and twenty-five millimeters. Standard. Good. A man knows where to find replacement discs.

Ninety-nine dollars Australian. Fair price. Not cheap. Not expensive. Value. The professional construction shows. No plastic where metal belongs. No shortcuts. German engineering. Reliable. It cut through the steel bar stock clean. First try. Every try.

The sparks flew in clean arcs. Beautiful. Dangerous. Necessary. The blade stayed true. No wobble. No heat buildup. Cool running. The work went fast. Clean cuts. Square edges. Professional results.

It is a tool for working. Not showing off. Not collecting dust. Working. Every day. Hard materials. Metal. Steel. Stone when needed. It does the job. All of it. That is enough. That is everything.`,

  "oscar-wilde-reviews-dewalt-18v-xr-brushless-impact-driver": `One must confess, this DeWALT specimen possesses a certain mechanical elegance that speaks well of contemporary American industrial aesthetics. Delivery was prompt though the box looked like it had been through a war - rather like the reputation of the manufacturer itself.

The eighteen-volt battery system represents, I dare say, a triumph of modern convenience over the pedestrian tyranny of electrical cords. How delightfully liberating to work unencumbered by such mundane tethers! The brushless motor purrs with an efficiency that would make even the most discerning Parisian appreciate its refined engineering.

Three speed settings allow one to approach each fastening task with the appropriate level of force - much like conversation, where subtlety often achieves what brute enthusiasm cannot. The LED work light illuminates one's endeavors with a clarity that renders even the darkest corners amenable to precise work. How wonderfully democratic that such illumination comes standard rather than as an expensive afterthought.

The belt clip, while utilitarian, demonstrates a practical consideration for those of us who must occasionally engage in manual labor. The tool hangs naturally at one's side, ready for deployment with theatrical efficiency. At its price point, this implement represents remarkable value - rather like discovering a perfectly tailored suit at ready-to-wear prices.

I find myself genuinely impressed by this American confection. It drives screws with the authority of conviction while maintaining the delicacy necessary for precision work. A tool, like wit, succeeds best when it appears effortless.`,

  "franz-kafka-reviews-makita-18v-brushless-compact-driver-drill": `In the vast bureaucracy of modern tool-making, this Makita device emerges as both salvation and torment, a mechanical embodiment of our perpetual struggle against the insurmountable complexity of contemporary existence.

The eighteen-volt power system represents yet another layer in the intricate hierarchy of energy distribution that governs our mechanical lives. One finds oneself trapped within this system of batteries and chargers, each component dependent upon the others in an endless cycle of preparation and depletion. The brushless motor operates with a precision that suggests the presence of some invisible administrative authority, monitoring each revolution with bureaucratic thoroughness.

I had to drive to three different stores before finding one in stock - a pilgrimage through the labyrinthine retail distribution network that somehow seemed both futile and necessary. The compact design, while ostensibly convenient, serves mainly to intensify one's awareness of the tool's concentrated mechanical purpose. Twenty-one adjustable torque settings present themselves as choices, yet each setting merely defines another boundary within which one's drilling aspirations must be contained.

The LED work light illuminates the drilling site with a harsh efficiency that reminds one of the unforgiving fluorescent lighting in government offices. Under this illumination, each hole drilled becomes an act of penetration into the vast, indifferent surface of material reality. The variable speed trigger responds to the slightest pressure of one's finger, creating an unsettling intimacy between human intention and mechanical execution.

Despite these existential complications, the drill performs its function with remarkable reliability. It drives screws and bores holes with mechanical certainty, transforming abstract intentions into concrete results. In this transformation lies perhaps the only genuine consolation available in our mechanized age.`,

  "virginia-woolf-reviews-ryobi-18v-one-palm-sander": `How curious that this Ryobi implement should stir such unexpected contemplations of creation itself, the way its orbital motion mirrors the endless circling of thought around meaning, the gentle abrasion of surface against surface like the patient wearing away of pretense until truth emerges, smooth and honest.

The compact form nestles naturally in one's palm - shipping was free over $99 which made the decision easy, though such practical considerations seem almost vulgar when one contemplates the deeper implications of this small machine. Here is rhythm made manifest, the three hundred orbits per minute creating a meditation upon repetition, upon the thousand small actions that constitute the larger work of transformation.

One notices how the dust collection system draws away the debris of improvement, the paper particles that were once wood, now liberated from their former existence. Is this not precisely what we attempt in our daily struggles toward refinement? The variable speed control responds to the gentlest pressure, allowing one to modulate the intensity of change according to the material's willingness to be transformed.

The LED light casts its scientific illumination upon the work surface, revealing imperfections that daylight conceals. Under this harsh honesty, each stroke of the sander becomes an act of revelation, exposing the grain beneath, the natural pattern waiting to be discovered. The eighteen-volt battery liberates one from the tyranny of placement, allowing work to follow inspiration rather than proximity to power sources.

Between the tool's vibrations and the steady whisper of its motor, one finds an unexpected companionship in the work of refinement, this patient dialogue between human intention and mechanical precision, both working toward the same essential goal: the revelation of what lies beneath.`,

  "charles-dickens-reviews-gerni-3600-1810psi-pressure-washer": `Behold, dear reader, the magnificent spectacle that is the Gerni 3600! This mechanical marvel, this triumph of industrial ingenuity, arrived two days earlier than expected, well packaged, as if the very forces of commerce had conspired to deliver unto my humble dwelling this most extraordinary implement of cleansing power!

What a curious thing is modern machinery, I mused, as I first beheld this yellow-clad colossus in my garden shed. One thousand eight hundred and ten pounds per square inch of pressurized water! Such force, such relentless determination to scour away the accumulated grime of neglect and time! The electric motor, humming with fifteen hundred watts of purposeful energy, speaks to the very soul of progress itself.

The wand extends like some magical staff from the pages of a fairy tale, yet its purpose is decidedly practical - to transform the most begrimed surfaces into pristine monuments to human industriousness. The various nozzles, each designed for its particular mission, remind one of the specialized tools employed by the finest craftsmen of our age. Wide spray for gentle persuasion, narrow stream for the most stubborn of stains!

I employed this marvel upon my weathered deck boards, those long-suffering planks that had endured countless seasons of harsh Australian weather. The transformation was nothing short of miraculous! Years of accumulated dirt and discoloration vanished beneath the steady march of pressurized precision. Even my elderly neighbor, Mrs. Henderson, peered over the fence to witness this resurrection of timber.

At three hundred and ninety-nine dollars, this Gerni represents not merely a purchase, but an investment in the very dignity of domestic maintenance. It stands ready to wage eternal war against entropy itself!`,

  "mark-twain-reviews-ozito-pxc-18v-13mm-cordless-drill-driver": `Well now, I reckon I've seen my share of contraptions in my time, but this here Ozito drill is something else entirely. Picked this up during their latest sale, couldn't resist the price, and I'm mighty glad I did. Sometimes the best adventures start with the most ordinary decisions.

Now, I ain't no expert on these mechanical marvels, but I know what works and what don't, and this little yellow fellow works just fine. Thirteen millimeters might not sound like much to city folks, but it'll bore a hole clean through most anything you're likely to encounter around the homestead. The eighteen-volt battery gives it enough gumption to tackle whatever project you've got in mind.

The cordless nature of the beast is particularly appealing to an old river rat like myself. No wires to trip over, no hunting around for electrical outlets - just pick it up and get to work wherever the work needs doing. Reminds me of the freedom we felt on the river, when the whole Mississippi stretched out before us like an endless highway of possibility.

The thirteen different torque settings are a marvel of modern engineering, though I confess I mostly just use it on the middle setting and call it good. The LED light is a thoughtful touch - illuminates the work area better than a Mississippi lightning bug on a summer evening.

For the price point, this Ozito represents honest value - no fancy frills or unnecessary complications, just solid performance that gets the job done. Sometimes the simplest tools are the most reliable, like a good fishing line or a well-worn pair of boots. This drill has earned its place in my workshop, right next to my daddy's old hand tools.`,

  "jane-austen-reviews-karcher-k-silent-anniversary-pressure-washer": `It is a truth universally acknowledged that a homeowner in possession of a substantial garden must be in want of a proper pressure washer. How fortunate, then, that the Karcher K Silent Anniversary Edition should present itself as such an admirably suitable solution to this most pressing domestic requirement.

Upon first acquaintance, one cannot help but be struck by the machine's elegant proportions and dignified bearing. The staff member at Bunnings was particularly helpful explaining the warranty, displaying that rare combination of knowledge and courtesy that speaks well of modern retail sensibilities. The anniversary edition designation suggests a certain pedigree, much like the way established families take pride in their lineage.

The silent technology deserves particular commendation, for what could be more considerate than a cleaning apparatus that performs its duties without disturbing the neighborhood's morning tranquility? One thousand eight hundred watts of cleaning power, delivered with the discretion of a well-trained servant - surely this represents the height of modern domestic engineering.

The ecoBooster nozzle demonstrates an admirable attention to efficiency, suggesting that environmental consciousness and practical performance need not be mutually exclusive. Such thoughtful design speaks to manufacturers who understand that true elegance lies in the harmonious balance of form and function.

The auto stop/start function exhibits a intelligence that borders on the prescient, anticipating one's needs with the intuitive grace of a perfectly trained lady's maid. At four hundred dollars, this Karcher represents an investment in domestic excellence that any sensible household would find entirely reasonable. It performs its cleaning duties with quiet competence, never drawing undue attention to itself - the very model of mechanical propriety.`,
};

// Function to calculate reading time
function calculateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 220);
}

// Function to generate appropriate excerpt
function generateExcerpt(content, authorStyle) {
  const sentences = content.split(/[.!?]+/);
  if (sentences.length > 0) {
    return sentences[0].trim() + ".";
  }
  return content.substring(0, 100) + "...";
}

// Generate real content for sample reviews
console.log(
  "🎯 Generating real review content for sample author-tool combinations...",
);

let generatedCount = 0;
Object.entries(sampleReviews).forEach(([filename, content]) => {
  const filePath = path.join("reviews", `${filename}.md`);

  if (fs.existsSync(filePath)) {
    // Read current file to get frontmatter
    const currentContent = fs.readFileSync(filePath, "utf8");
    const frontmatterMatch = currentContent.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      // Parse frontmatter and update reading time and excerpt
      const frontmatterLines = frontmatterMatch[1].split("\n");
      const updatedLines = frontmatterLines.map((line) => {
        if (line.startsWith("readingTime:")) {
          const actualReadingTime = calculateReadingTime(content);
          return `readingTime: ${actualReadingTime}`;
        }
        if (line.startsWith("excerpt:")) {
          const excerpt = generateExcerpt(content);
          return `excerpt: ${excerpt}`;
        }
        return line;
      });

      const newFrontmatter = `---\n${updatedLines.join("\n")}\n---\n\n`;
      const newContent = newFrontmatter + content;

      fs.writeFileSync(filePath, newContent);
      generatedCount++;
      console.log(`✅ Generated real content for ${filename}`);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log(`\n📝 Generated ${generatedCount} real reviews!`);
console.log(`📊 Remaining placeholder reviews: ${420 - 23 - generatedCount}`);
console.log(
  "\n🎯 These samples demonstrate the quality and style for each author.",
);
console.log(
  "📋 Each remaining placeholder contains the complete prompt for LLM generation.",
);
