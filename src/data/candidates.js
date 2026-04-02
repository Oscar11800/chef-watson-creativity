import { ingredients, compoundOverlap, cuisineDistance, allCategories } from './knowledge'

/**
 * DESIGNER: Generate candidates by actual recombination from the knowledge database.
 *
 * Strategy: pick a "seed" ingredient, then select 3-5 companions based on
 * a mix of compound-compatibility and randomness. Name the dish algorithmically
 * from the ingredients, technique, and cuisine fusion.
 */

const techniques = [
  { name: 'Slow Braise', verb: 'Braised', needs: ['protein'], method: 'braise', category: 'wet-heat' },
  { name: 'Quick Sear', verb: 'Seared', needs: ['protein'], method: 'sear', category: 'dry-heat' },
  { name: 'Charcoal Roast', verb: 'Roasted', needs: ['protein', 'vegetable'], method: 'roast', category: 'dry-heat' },
  { name: 'Raw Preparation', verb: 'Raw', needs: ['protein'], method: 'cure', category: 'no-heat' },
  { name: 'Confit', verb: 'Confit', needs: ['protein', 'vegetable'], method: 'confit', category: 'low-heat' },
  { name: 'Steamed', verb: 'Steamed', needs: ['protein', 'vegetable', 'grain'], method: 'steam', category: 'wet-heat' },
  { name: 'Stir-Fried', verb: 'Wok-Fired', needs: ['protein', 'vegetable'], method: 'fry', category: 'dry-heat' },
  { name: 'Poached', verb: 'Poached', needs: ['protein'], method: 'poach', category: 'wet-heat' },
  { name: 'Smoked', verb: 'Smoked', needs: ['protein'], method: 'smoke', category: 'dry-heat' },
  { name: 'Emulsion', verb: 'Emulsified', needs: ['fat'], method: 'emulsify', category: 'technique' },
  { name: 'Reduction', verb: 'Reduced', needs: ['fermented', 'acid'], method: 'reduce', category: 'wet-heat' },
  { name: 'Infusion', verb: 'Infused', needs: ['aromatic', 'herb', 'spice'], method: 'infuse', category: 'technique' },
]

function pickRandom(arr, n = 1) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function pickWeighted(arr, weightFn) {
  const weights = arr.map(weightFn)
  const total = weights.reduce((s, w) => s + w, 0)
  if (total === 0) return arr[Math.floor(Math.random() * arr.length)]
  let r = Math.random() * total
  for (let i = 0; i < arr.length; i++) {
    r -= weights[i]
    if (r <= 0) return arr[i]
  }
  return arr[arr.length - 1]
}

/**
 * Generate a single candidate dish from the knowledge database.
 */
function generateCandidate(id) {
  // 1. Pick a seed ingredient (prefer proteins and vegetables as anchors)
  const anchors = ingredients.filter(i => ['protein', 'vegetable', 'grain'].includes(i.category))
  const seed = pickRandom(anchors, 1)[0]

  // 2. Pick companions: score by compound overlap (quality signal) + some randomness
  const others = ingredients.filter(i => i.id !== seed.id)
  const companions = []
  const used = new Set([seed.id])

  // Ensure category diversity: try to pick from different categories
  const targetCount = 3 + Math.floor(Math.random() * 3) // 3-5 companions

  for (let i = 0; i < targetCount; i++) {
    const available = others.filter(o => !used.has(o.id))
    if (available.length === 0) break

    const companion = pickWeighted(available, (ing) => {
      // Compound overlap with seed = quality signal
      const overlap = compoundOverlap(seed, ing)
      // Category diversity bonus
      const categoryBonus = !companions.some(c => c.category === ing.category) ? 0.3 : 0
      // Some randomness to allow surprising combinations
      const noise = Math.random() * 0.3
      return overlap + categoryBonus + noise
    })

    companions.push(companion)
    used.add(companion.id)
  }

  const allIngredients = [seed, ...companions]

  // 3. Pick a technique compatible with the ingredient categories
  const presentCategories = [...new Set(allIngredients.map(i => i.category))]
  const compatibleTechniques = techniques.filter(t =>
    t.needs.some(need => presentCategories.includes(need))
  )
  const technique = compatibleTechniques.length > 0
    ? pickRandom(compatibleTechniques, 1)[0]
    : pickRandom(techniques, 1)[0]

  // 4. Determine cuisine fusion from ingredient origins
  const allCuisines = allIngredients.flatMap(i => i.cuisines)
  const cuisineCounts = {}
  allCuisines.forEach(c => { cuisineCounts[c] = (cuisineCounts[c] || 0) + 1 })
  const sortedCuisines = Object.entries(cuisineCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c)
  const primaryCuisines = sortedCuisines.slice(0, Math.min(2, sortedCuisines.length))
  const cuisineLabel = primaryCuisines.join('–')

  // 5. Generate name algorithmically
  const name = generateName(seed, companions, technique)

  return {
    id,
    name,
    seed,
    companions,
    allIngredients,
    technique,
    cuisineLabel,
    primaryCuisines,
  }
}

function generateName(seed, companions, technique) {
  // Pick a flavor modifier from a companion
  const flavorComp = companions.find(c =>
    ['spice', 'herb', 'fermented', 'aromatic'].includes(c.category)
  )
  const modifier = flavorComp ? flavorComp.name : companions[0]?.name || ''

  // Structure: [Modifier]-[Technique] [Seed] or [Modifier] [Seed] [Technique-style]
  const patterns = [
    () => `${modifier}-${technique.verb} ${seed.name}`,
    () => `${technique.verb} ${seed.name} with ${modifier}`,
    () => `${modifier} ${seed.name} ${technique.name}`,
    () => `${seed.name} in ${modifier} ${technique.name}`,
  ]

  return patterns[Math.floor(Math.random() * patterns.length)]()
}

/**
 * ASSESSOR: Compute novelty and quality scores from the data.
 *
 * Novelty = average cuisine distance between all ingredient pairs.
 *   High novelty = ingredients from very different culinary traditions.
 *   Based on Ahn et al.'s finding that cross-cuisine pairings are rarer.
 *
 * Quality = average compound-class overlap between all ingredient pairs.
 *   High quality = ingredients share volatile compound families.
 *   Based on the flavor pairing hypothesis (shared compounds = good pairing).
 */
function assessCandidate(candidate) {
  const { allIngredients } = candidate
  let totalNovelty = 0
  let totalQuality = 0
  let pairCount = 0

  for (let i = 0; i < allIngredients.length; i++) {
    for (let j = i + 1; j < allIngredients.length; j++) {
      totalNovelty += cuisineDistance(allIngredients[i], allIngredients[j])
      totalQuality += compoundOverlap(allIngredients[i], allIngredients[j])
      pairCount++
    }
  }

  const novelty = pairCount > 0 ? totalNovelty / pairCount : 0
  const quality = pairCount > 0 ? totalQuality / pairCount : 0

  // Category diversity bonus for novelty (using more distinct categories = more novel structure)
  const uniqueCategories = new Set(allIngredients.map(i => i.category)).size
  const categoryBonus = Math.min(uniqueCategories / 5, 1) * 0.2

  return {
    ...candidate,
    novelty: Math.min(1, novelty + categoryBonus),
    quality,
    // Individual pair details for display
    pairDetails: buildPairDetails(allIngredients),
  }
}

function buildPairDetails(ings) {
  const pairs = []
  for (let i = 0; i < ings.length; i++) {
    for (let j = i + 1; j < ings.length; j++) {
      const overlap = compoundOverlap(ings[i], ings[j])
      const sharedClasses = ings[i].compoundClasses.filter(c =>
        ings[j].compoundClasses.includes(c)
      )
      if (sharedClasses.length > 0) {
        pairs.push({
          a: ings[i].name,
          b: ings[j].name,
          overlap,
          sharedClasses,
        })
      }
    }
  }
  return pairs.sort((a, b) => b.overlap - a.overlap)
}

/**
 * PLANNER: Generate preparation steps from ingredient properties.
 *
 * Steps are built algorithmically from:
 * - ingredient category → what kind of prep it needs
 * - ingredient prepMethods → specific actions
 * - technique → overall cooking method
 * - order logic → aromatics first, proteins main, acids/herbs finish
 */

const phaseOrder = ['protein', 'vegetable', 'grain', 'fat', 'fermented', 'umami', 'aromatic', 'spice', 'herb', 'chili', 'acid', 'nut', 'sweetener', 'bitter']

const categoryPrepDescriptions = {
  protein: (ing, technique) => {
    const method = ing.prepMethods.find(m => m === technique.method) || ing.prepMethods[0]
    return { phase: 'Prepare', action: `${capitalize(method)} the ${ing.name.toLowerCase()} — ${technique.category === 'wet-heat' ? 'build fond in vessel' : 'develop surface crust for Maillard compounds'}` }
  },
  vegetable: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Prepare', action: `${capitalize(method)} ${ing.name.toLowerCase()} to develop ${ing.flavorProfile.slice(0, 2).join(' and ')} character` }
  },
  grain: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Prepare', action: `${capitalize(method)} ${ing.name.toLowerCase()} as structural base` }
  },
  fat: (ing) => {
    return { phase: 'Build Base', action: `Use ${ing.name.toLowerCase()} as cooking medium — carries fat-soluble aromatics (${ing.compoundClasses.slice(0, 2).join(', ')})` }
  },
  aromatic: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Develop Aromatics', action: `${capitalize(method)} ${ing.name.toLowerCase()} to release volatile ${ing.compoundClasses.slice(0, 2).join(' and ')} compounds` }
  },
  spice: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Season', action: `${capitalize(method)} ${ing.name.toLowerCase()} — activates ${ing.compounds[0] || 'key volatiles'}` }
  },
  herb: (ing) => {
    return { phase: 'Finish', action: `Add ${ing.name.toLowerCase()} — contributes ${ing.compoundClasses.includes('terpenoid') ? 'terpenoid' : 'aromatic'} top-notes (${ing.compounds.slice(0, 2).join(', ')})` }
  },
  fermented: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Build Depth', action: `${capitalize(method)} ${ing.name.toLowerCase()} for umami/fermentation depth — contains ${ing.compoundClasses.filter(c => !['amino-acid'].includes(c)).slice(0, 2).join(' + ')} compounds` }
  },
  umami: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Build Depth', action: `${capitalize(method)} ${ing.name.toLowerCase()} — provides ${ing.compounds.filter(c => c.includes('acid') || c.includes('glutamate')).slice(0, 2).join(' + ') || 'nucleotide synergy'}` }
  },
  acid: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Balance', action: `${capitalize(method)} ${ing.name.toLowerCase()} to add ${ing.flavorProfile.slice(0, 2).join(' and ')} brightness — ${ing.compounds[0] || 'organic acids'} cut richness` }
  },
  chili: (ing) => {
    return { phase: 'Season', action: `Add ${ing.name.toLowerCase()} for ${ing.compounds[0] || 'capsaicin'} heat — ${ing.flavorProfile.filter(f => f !== 'hot').join(', ')} secondary notes` }
  },
  nut: (ing) => {
    const method = ing.prepMethods[0]
    return { phase: 'Texture', action: `${capitalize(method)} ${ing.name.toLowerCase()} — adds ${ing.flavorProfile.slice(0, 2).join(', ')} notes via ${ing.compoundClasses[0]} compounds` }
  },
  sweetener: (ing) => {
    return { phase: 'Balance', action: `Add ${ing.name.toLowerCase()} to balance — ${ing.compounds.slice(0, 2).join(' and ')} provide ${ing.flavorProfile.filter(f => f !== 'sweet').join(' and ')} depth` }
  },
  bitter: (ing) => {
    return { phase: 'Develop', action: `Incorporate ${ing.name.toLowerCase()} — ${ing.compounds[0] || 'alkaloids'} provide structural bitterness and complexity` }
  },
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')
}

function generatePlan(candidate) {
  const { allIngredients, technique } = candidate
  const steps = []

  // Sort ingredients by phase order
  const sorted = [...allIngredients].sort((a, b) => {
    return phaseOrder.indexOf(a.category) - phaseOrder.indexOf(b.category)
  })

  // Generate a step for each ingredient based on its category
  for (const ing of sorted) {
    const generator = categoryPrepDescriptions[ing.category]
    if (generator) {
      steps.push(generator(ing, technique))
    }
  }

  // Add a final assembly step
  steps.push({
    phase: 'Externalize',
    action: `Compose the final plate — the ${technique.name.toLowerCase()} ${candidate.seed.name.toLowerCase()} as center, arranged to express the ${candidate.cuisineLabel} fusion logic`,
  })

  return steps
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Generate N candidates from the knowledge database.
 * Each candidate is a novel recombination with computed scores.
 */
export function generateCandidates(count = 8) {
  const candidates = []
  for (let i = 0; i < count; i++) {
    const raw = generateCandidate(i + 1)
    const assessed = assessCandidate(raw)
    const plan = generatePlan(assessed)
    candidates.push({ ...assessed, steps: plan })
  }
  return candidates
}

/**
 * Re-score and sort candidates by weighted novelty/quality.
 */
export function scoreCandidates(candidates, noveltyWeight) {
  const qualityWeight = 1 - noveltyWeight
  return candidates
    .map(c => ({
      ...c,
      score: c.novelty * noveltyWeight + c.quality * qualityWeight,
    }))
    .sort((a, b) => b.score - a.score)
}
