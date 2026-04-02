/**
 * Curated ingredient database sourced from:
 * - FlavorDB 2.0 (cosylab.iiitd.edu.in/flavordb2/) — compound associations
 * - Ahn et al. 2011 "Flavor network and the principles of food pairing" (Nature) — pairing data
 * - FooDB (foodb.ca) — chemical composition
 *
 * Each ingredient has:
 *   - id: unique key
 *   - name: common name
 *   - category: functional role (protein, acid, fat, aromatic, etc.)
 *   - cuisines: primary cuisine associations (from Ahn flavor network)
 *   - compounds: key volatile/flavor compounds (from FlavorDB/FooDB)
 *   - compoundClasses: broader chemical families for compatibility scoring
 *   - prepMethods: how this ingredient is typically prepared (drives planner)
 *   - flavorProfile: taste axis tags
 */

export const ingredients = [
  // === PROTEINS ===
  { id: 'beef', name: 'Beef', category: 'protein', cuisines: ['Western', 'Latin American', 'East Asian'], compounds: ['4-hydroxy-5-methyl-3(2H)-furanone', '2-methylbutanal', 'methional', 'hexanal', '2-pentylfuran'], compoundClasses: ['furanone', 'aldehyde', 'sulfur'], prepMethods: ['sear', 'braise', 'roast', 'cure'], flavorProfile: ['umami', 'savory'] },
  { id: 'chicken', name: 'Chicken', category: 'protein', cuisines: ['Western', 'East Asian', 'Southeast Asian', 'South Asian'], compounds: ['2-methyl-3-furanthiol', 'hexanal', 'nonanal', '2,4-decadienal', 'methional'], compoundClasses: ['thiol', 'aldehyde', 'sulfur'], prepMethods: ['roast', 'braise', 'poach', 'fry'], flavorProfile: ['umami', 'neutral'] },
  { id: 'pork', name: 'Pork', category: 'protein', cuisines: ['East Asian', 'Western', 'Latin American', 'Southeast Asian'], compounds: ['hexanal', 'octanal', 'nonanal', '2-pentylfuran', 'skatole'], compoundClasses: ['aldehyde', 'furan', 'indole'], prepMethods: ['braise', 'roast', 'smoke', 'cure'], flavorProfile: ['umami', 'sweet', 'savory'] },
  { id: 'shrimp', name: 'Shrimp', category: 'protein', cuisines: ['East Asian', 'Southeast Asian', 'Latin American', 'Southern European'], compounds: ['trimethylamine', '2-acetyl-1-pyrroline', 'dimethyl sulfide', '1-octen-3-ol', '2-methylisoborneol'], compoundClasses: ['amine', 'pyrroline', 'sulfide'], prepMethods: ['sear', 'poach', 'cure', 'fry'], flavorProfile: ['umami', 'briny'] },
  { id: 'salmon', name: 'Salmon', category: 'protein', cuisines: ['Nordic', 'Japanese', 'Western'], compounds: ['2,6-nonadienal', 'trimethylamine', '1-octen-3-ol', '2,4-heptadienal', 'hexanal'], compoundClasses: ['aldehyde', 'amine', 'ketone'], prepMethods: ['cure', 'smoke', 'sear', 'poach'], flavorProfile: ['umami', 'fatty'] },
  { id: 'lamb', name: 'Lamb', category: 'protein', cuisines: ['Middle Eastern', 'South Asian', 'North African', 'Southern European'], compounds: ['4-methyloctanoic acid', '4-methylnonanoic acid', 'hexanal', 'nonanal', 'cresol'], compoundClasses: ['branched-acid', 'aldehyde', 'phenol'], prepMethods: ['roast', 'braise', 'grill'], flavorProfile: ['umami', 'gamey'] },
  { id: 'tofu', name: 'Tofu', category: 'protein', cuisines: ['East Asian', 'Southeast Asian'], compounds: ['hexanal', '1-octen-3-ol', '2-pentylfuran', 'isoflavones'], compoundClasses: ['aldehyde', 'furan', 'isoflavone'], prepMethods: ['fry', 'braise', 'ferment', 'steam'], flavorProfile: ['neutral', 'umami'] },
  { id: 'egg', name: 'Egg', category: 'protein', cuisines: ['Western', 'East Asian', 'Southeast Asian', 'Latin American'], compounds: ['hydrogen sulfide', 'dimethyl sulfide', '3-methylbutanal', 'nonanal'], compoundClasses: ['sulfide', 'aldehyde'], prepMethods: ['poach', 'fry', 'cure', 'emulsify'], flavorProfile: ['umami', 'sulfurous', 'rich'] },

  // === DAIRY / FAT ===
  { id: 'butter', name: 'Butter', category: 'fat', cuisines: ['Western', 'Northern European', 'South Asian'], compounds: ['diacetyl', 'butyric acid', 'delta-decalactone', 'acetoin', '2-heptanone'], compoundClasses: ['diketone', 'acid', 'lactone', 'ketone'], prepMethods: ['brown', 'emulsify', 'clarify'], flavorProfile: ['rich', 'sweet', 'creamy'] },
  { id: 'cream', name: 'Cream', category: 'fat', cuisines: ['Western', 'Northern European'], compounds: ['diacetyl', 'delta-decalactone', 'butyric acid', '2-nonanone'], compoundClasses: ['diketone', 'lactone', 'acid', 'ketone'], prepMethods: ['reduce', 'whip', 'infuse'], flavorProfile: ['rich', 'sweet'] },
  { id: 'coconut_milk', name: 'Coconut Milk', category: 'fat', cuisines: ['Southeast Asian', 'South Asian', 'Caribbean'], compounds: ['delta-octalactone', 'delta-decalactone', 'nonanal', '2-nonanone'], compoundClasses: ['lactone', 'aldehyde', 'ketone'], prepMethods: ['reduce', 'infuse', 'simmer'], flavorProfile: ['sweet', 'rich', 'tropical'] },
  { id: 'parmesan', name: 'Parmesan', category: 'fermented', cuisines: ['Southern European'], compounds: ['butyric acid', 'isovaleric acid', 'glutamate', 'tyrosine', 'diacetyl', 'ethyl butyrate'], compoundClasses: ['acid', 'amino-acid', 'diketone', 'ester'], prepMethods: ['grate', 'infuse'], flavorProfile: ['umami', 'sharp', 'savory'] },
  { id: 'olive_oil', name: 'Olive Oil', category: 'fat', cuisines: ['Southern European', 'Middle Eastern', 'North African'], compounds: ['hexanal', 'trans-2-hexenal', '1-penten-3-one', 'oleocanthal', 'hydroxytyrosol'], compoundClasses: ['aldehyde', 'ketone', 'phenol'], prepMethods: ['raw-finish', 'sear', 'infuse'], flavorProfile: ['bitter', 'peppery', 'fruity'] },
  { id: 'sesame_oil', name: 'Sesame Oil', category: 'fat', cuisines: ['East Asian', 'Middle Eastern'], compounds: ['2-furylmethanol', 'sesamol', '2-methylpyrazine', 'guaiacol', 'pyrazine'], compoundClasses: ['furan', 'phenol', 'pyrazine'], prepMethods: ['raw-finish', 'infuse'], flavorProfile: ['nutty', 'toasted'] },

  // === ALLIUMS ===
  { id: 'garlic', name: 'Garlic', category: 'aromatic', cuisines: ['East Asian', 'Southern European', 'South Asian', 'Middle Eastern', 'Latin American'], compounds: ['allicin', 'diallyl disulfide', 'methyl allyl sulfide', 'ajoene', '2-vinyl-4H-1,3-dithiin'], compoundClasses: ['sulfide', 'thiosulfinate'], prepMethods: ['raw', 'roast', 'confit', 'fry'], flavorProfile: ['pungent', 'savory'] },
  { id: 'onion', name: 'Onion', category: 'aromatic', cuisines: ['Western', 'South Asian', 'Middle Eastern', 'East Asian', 'Latin American'], compounds: ['propanethial S-oxide', 'dipropyl disulfide', '2-methyl-2-pentenal', 'thiopropanal S-oxide'], compoundClasses: ['sulfide', 'aldehyde', 'oxide'], prepMethods: ['caramelize', 'raw', 'sweat', 'pickle'], flavorProfile: ['pungent', 'sweet'] },
  { id: 'shallot', name: 'Shallot', category: 'aromatic', cuisines: ['Southeast Asian', 'Western', 'Southern European'], compounds: ['dipropyl disulfide', 'methyl propyl disulfide', 'propanethial S-oxide'], compoundClasses: ['sulfide', 'oxide'], prepMethods: ['fry', 'raw', 'pickle', 'confit'], flavorProfile: ['pungent', 'sweet', 'delicate'] },
  { id: 'scallion', name: 'Scallion', category: 'aromatic', cuisines: ['East Asian', 'Southeast Asian', 'Latin American'], compounds: ['dipropyl disulfide', 'methyl propyl trisulfide'], compoundClasses: ['sulfide'], prepMethods: ['raw', 'char', 'oil-infuse'], flavorProfile: ['pungent', 'fresh'] },
  { id: 'ginger', name: 'Ginger', category: 'aromatic', cuisines: ['East Asian', 'South Asian', 'Southeast Asian', 'Caribbean'], compounds: ['gingerol', 'shogaol', 'zingiberene', 'beta-sesquiphellandrene', 'geranial'], compoundClasses: ['phenol', 'terpene'], prepMethods: ['raw', 'infuse', 'juice', 'dry'], flavorProfile: ['pungent', 'warm', 'citrusy'] },
  { id: 'lemongrass', name: 'Lemongrass', category: 'aromatic', cuisines: ['Southeast Asian', 'South Asian'], compounds: ['citral', 'geranial', 'neral', 'myrcene', 'geraniol'], compoundClasses: ['terpene', 'terpenoid'], prepMethods: ['infuse', 'bruise', 'mince'], flavorProfile: ['citrusy', 'herbal', 'fresh'] },
  { id: 'galangal', name: 'Galangal', category: 'aromatic', cuisines: ['Southeast Asian'], compounds: ['1,8-cineole', 'alpha-pinene', 'methyl cinnamate', 'acetoxychavicol acetate'], compoundClasses: ['terpene', 'ester', 'phenol'], prepMethods: ['slice', 'infuse', 'pound'], flavorProfile: ['pungent', 'piney', 'citrusy'] },

  // === HERBS ===
  { id: 'basil', name: 'Basil', category: 'herb', cuisines: ['Southern European', 'Southeast Asian'], compounds: ['linalool', 'eugenol', 'methyl chavicol', '1,8-cineole', 'methyl cinnamate'], compoundClasses: ['terpenoid', 'phenol', 'ester'], prepMethods: ['raw', 'infuse', 'bruise'], flavorProfile: ['sweet', 'herbal', 'warm'] },
  { id: 'cilantro', name: 'Cilantro', category: 'herb', cuisines: ['Latin American', 'South Asian', 'Southeast Asian', 'Middle Eastern'], compounds: ['decanal', 'dodecanal', '2-decenal', 'linalool', 'geraniol'], compoundClasses: ['aldehyde', 'terpenoid'], prepMethods: ['raw', 'blend'], flavorProfile: ['citrusy', 'soapy', 'bright'] },
  { id: 'mint', name: 'Mint', category: 'herb', cuisines: ['Middle Eastern', 'South Asian', 'Southeast Asian', 'Northern European'], compounds: ['menthol', 'menthone', 'menthyl acetate', '1,8-cineole', 'limonene'], compoundClasses: ['terpenoid', 'terpene'], prepMethods: ['raw', 'infuse', 'muddle'], flavorProfile: ['cool', 'fresh', 'sweet'] },
  { id: 'dill', name: 'Dill', category: 'herb', cuisines: ['Nordic', 'Eastern European', 'Middle Eastern'], compounds: ['carvone', 'limonene', 'dill ether', 'alpha-phellandrene', 'myristicin'], compoundClasses: ['terpene', 'ether'], prepMethods: ['raw', 'infuse'], flavorProfile: ['herbal', 'fresh', 'anise'] },
  { id: 'thyme', name: 'Thyme', category: 'herb', cuisines: ['Western', 'Southern European', 'Middle Eastern', 'North African'], compounds: ['thymol', 'carvacrol', 'linalool', 'p-cymene', 'gamma-terpinene'], compoundClasses: ['phenol', 'terpenoid', 'terpene'], prepMethods: ['infuse', 'roast-with', 'dry'], flavorProfile: ['herbal', 'earthy', 'warm'] },
  { id: 'rosemary', name: 'Rosemary', category: 'herb', cuisines: ['Southern European', 'Western'], compounds: ['1,8-cineole', 'camphor', 'alpha-pinene', 'verbenone', 'borneol'], compoundClasses: ['terpene', 'terpenoid', 'ketone'], prepMethods: ['infuse', 'roast-with', 'char'], flavorProfile: ['piney', 'warm', 'herbal'] },
  { id: 'thai_basil', name: 'Thai Basil', category: 'herb', cuisines: ['Southeast Asian'], compounds: ['methyl chavicol', 'linalool', '1,8-cineole', 'methyl cinnamate', 'eugenol'], compoundClasses: ['phenol', 'terpenoid', 'ester'], prepMethods: ['raw', 'wilt'], flavorProfile: ['anise', 'sweet', 'peppery'] },
  { id: 'shiso', name: 'Shiso', category: 'herb', cuisines: ['Japanese', 'Korean'], compounds: ['perillaldehyde', 'limonene', 'linalool', 'beta-caryophyllene'], compoundClasses: ['aldehyde', 'terpene', 'terpenoid'], prepMethods: ['raw', 'fry'], flavorProfile: ['herbal', 'minty', 'citrusy'] },

  // === SPICES ===
  { id: 'cumin', name: 'Cumin', category: 'spice', cuisines: ['South Asian', 'Middle Eastern', 'Latin American', 'North African'], compounds: ['cuminaldehyde', 'gamma-terpinene', 'beta-pinene', 'p-cymene', 'safranal'], compoundClasses: ['aldehyde', 'terpene'], prepMethods: ['toast', 'bloom-in-oil', 'grind'], flavorProfile: ['earthy', 'warm', 'nutty'] },
  { id: 'coriander_seed', name: 'Coriander Seed', category: 'spice', cuisines: ['South Asian', 'Middle Eastern', 'Latin American', 'Southeast Asian'], compounds: ['linalool', 'geranyl acetate', 'camphor', 'gamma-terpinene', 'alpha-pinene'], compoundClasses: ['terpenoid', 'ester', 'terpene'], prepMethods: ['toast', 'grind', 'crack'], flavorProfile: ['citrusy', 'warm', 'floral'] },
  { id: 'black_pepper', name: 'Black Pepper', category: 'spice', cuisines: ['South Asian', 'Western', 'Southeast Asian', 'East Asian'], compounds: ['piperine', 'beta-caryophyllene', 'limonene', 'alpha-pinene', 'sabinene'], compoundClasses: ['alkaloid', 'terpene'], prepMethods: ['crack', 'grind', 'toast'], flavorProfile: ['pungent', 'warm', 'piney'] },
  { id: 'szechuan_pepper', name: 'Szechuan Pepper', category: 'spice', cuisines: ['East Asian'], compounds: ['hydroxy-alpha-sanshool', 'hydroxy-beta-sanshool', 'limonene', 'geraniol', 'linalool'], compoundClasses: ['sanshool', 'terpene', 'terpenoid'], prepMethods: ['toast', 'grind', 'infuse-in-oil'], flavorProfile: ['numbing', 'citrusy', 'tingling'] },
  { id: 'turmeric', name: 'Turmeric', category: 'spice', cuisines: ['South Asian', 'Southeast Asian', 'Middle Eastern'], compounds: ['turmerone', 'curcumin', 'zingiberene', '1,8-cineole', 'alpha-phellandrene'], compoundClasses: ['ketone', 'phenol', 'terpene'], prepMethods: ['bloom-in-oil', 'paste', 'dry'], flavorProfile: ['earthy', 'bitter', 'warm'] },
  { id: 'cardamom', name: 'Cardamom', category: 'spice', cuisines: ['South Asian', 'Middle Eastern', 'Nordic'], compounds: ['1,8-cineole', 'alpha-terpinyl acetate', 'linalool', 'linalyl acetate', 'limonene'], compoundClasses: ['terpene', 'terpenoid', 'ester'], prepMethods: ['crack', 'grind', 'infuse'], flavorProfile: ['warm', 'floral', 'eucalyptus'] },
  { id: 'cinnamon', name: 'Cinnamon', category: 'spice', cuisines: ['South Asian', 'Middle Eastern', 'Western', 'North African'], compounds: ['cinnamaldehyde', 'eugenol', 'linalool', 'coumarin', 'beta-caryophyllene'], compoundClasses: ['aldehyde', 'phenol', 'terpenoid'], prepMethods: ['infuse', 'grind', 'toast'], flavorProfile: ['warm', 'sweet', 'woody'] },
  { id: 'star_anise', name: 'Star Anise', category: 'spice', cuisines: ['East Asian', 'South Asian', 'Southeast Asian'], compounds: ['anethole', 'estragole', 'limonene', 'alpha-pinene', 'linalool'], compoundClasses: ['phenol', 'terpene', 'terpenoid'], prepMethods: ['infuse', 'toast', 'grind'], flavorProfile: ['anise', 'sweet', 'warm'] },
  { id: 'clove', name: 'Clove', category: 'spice', cuisines: ['South Asian', 'Southeast Asian', 'Middle Eastern', 'Western'], compounds: ['eugenol', 'eugenyl acetate', 'beta-caryophyllene', 'alpha-humulene'], compoundClasses: ['phenol', 'ester', 'terpene'], prepMethods: ['infuse', 'grind', 'stud'], flavorProfile: ['warm', 'sweet', 'numbing'] },
  { id: 'saffron', name: 'Saffron', category: 'spice', cuisines: ['Middle Eastern', 'South Asian', 'Southern European', 'North African'], compounds: ['safranal', 'picrocrocin', 'isophorone', '2,6,6-trimethyl-1,3-cyclohexadiene-1-carboxaldehyde'], compoundClasses: ['aldehyde', 'terpenoid'], prepMethods: ['steep', 'bloom-in-liquid', 'infuse'], flavorProfile: ['floral', 'honey', 'metallic'] },
  { id: 'sumac', name: 'Sumac', category: 'spice', cuisines: ['Middle Eastern', 'North African'], compounds: ['malic acid', 'citric acid', 'anthocyanins', 'gallic acid', 'quercetin'], compoundClasses: ['organic-acid', 'phenol', 'flavonoid'], prepMethods: ['sprinkle', 'steep'], flavorProfile: ['tart', 'fruity', 'astringent'] },
  { id: 'fenugreek', name: 'Fenugreek', category: 'spice', cuisines: ['South Asian', 'Middle Eastern', 'North African'], compounds: ['sotolone', '3-amino-4,5-dimethyl-3H-thiophen-2-one', 'trigonelline', 'diosgenin'], compoundClasses: ['lactone', 'alkaloid'], prepMethods: ['toast', 'grind', 'bloom-in-oil'], flavorProfile: ['maple', 'bitter', 'nutty'] },
  { id: 'smoked_paprika', name: 'Smoked Paprika', category: 'spice', cuisines: ['Southern European', 'Latin American'], compounds: ['capsanthin', 'guaiacol', '4-methylguaiacol', 'syringol', 'furfural'], compoundClasses: ['carotenoid', 'phenol', 'furan'], prepMethods: ['bloom-in-oil', 'sprinkle', 'rub'], flavorProfile: ['smoky', 'sweet', 'warm'] },

  // === FERMENTED ===
  { id: 'soy_sauce', name: 'Soy Sauce', category: 'fermented', cuisines: ['East Asian', 'Southeast Asian'], compounds: ['4-hydroxy-2(or 5)-ethyl-5(or 2)-methyl-3(2H)-furanone', '3-methylbutanal', 'methional', 'glutamate', '4-hydroxy-5-methyl-3(2H)-furanone'], compoundClasses: ['furanone', 'aldehyde', 'sulfur', 'amino-acid'], prepMethods: ['season', 'glaze', 'marinate'], flavorProfile: ['umami', 'salty', 'sweet'] },
  { id: 'miso', name: 'Miso', category: 'fermented', cuisines: ['Japanese'], compounds: ['4-hydroxy-2(or 5)-ethyl-5(or 2)-methyl-3(2H)-furanone', 'isovaleric acid', 'glutamate', 'ethyl acetate', '2-methylpropanal'], compoundClasses: ['furanone', 'acid', 'amino-acid', 'ester', 'aldehyde'], prepMethods: ['dissolve', 'glaze', 'marinate'], flavorProfile: ['umami', 'salty', 'sweet', 'funky'] },
  { id: 'fish_sauce', name: 'Fish Sauce', category: 'fermented', cuisines: ['Southeast Asian', 'East Asian'], compounds: ['trimethylamine', 'glutamate', 'isovaleric acid', 'butyric acid', 'indole'], compoundClasses: ['amine', 'amino-acid', 'acid', 'indole'], prepMethods: ['season', 'dress'], flavorProfile: ['umami', 'funky', 'salty'] },
  { id: 'gochujang', name: 'Gochujang', category: 'fermented', cuisines: ['Korean'], compounds: ['capsaicin', 'glutamate', 'maltose', 'ethyl acetate', '3-methylbutanal'], compoundClasses: ['alkaloid', 'amino-acid', 'sugar', 'ester', 'aldehyde'], prepMethods: ['glaze', 'marinate', 'stir-in'], flavorProfile: ['sweet', 'spicy', 'umami', 'funky'] },
  { id: 'doenjang', name: 'Doenjang', category: 'fermented', cuisines: ['Korean'], compounds: ['3-methylbutanal', 'glutamate', 'methional', 'dimethyl trisulfide'], compoundClasses: ['aldehyde', 'amino-acid', 'sulfur', 'sulfide'], prepMethods: ['dissolve', 'braise-with'], flavorProfile: ['umami', 'earthy', 'funky'] },
  { id: 'black_garlic', name: 'Black Garlic', category: 'fermented', cuisines: ['East Asian', 'Western'], compounds: ['s-allyl cysteine', 'melanoidins', 'fructose', '5-hydroxymethylfurfural', 'pyrazines'], compoundClasses: ['amino-acid', 'melanoidin', 'sugar', 'furan', 'pyrazine'], prepMethods: ['purée', 'slice', 'fold-in'], flavorProfile: ['sweet', 'umami', 'balsamic'] },
  { id: 'tamarind', name: 'Tamarind', category: 'fermented', cuisines: ['South Asian', 'Southeast Asian', 'Latin American', 'Middle Eastern'], compounds: ['tartaric acid', 'malic acid', 'citric acid', '2-acetyl-furan', 'furfural'], compoundClasses: ['organic-acid', 'furan'], prepMethods: ['dissolve', 'reduce', 'paste'], flavorProfile: ['sour', 'sweet', 'fruity'] },
  { id: 'vinegar_rice', name: 'Rice Vinegar', category: 'fermented', cuisines: ['East Asian', 'Japanese'], compounds: ['acetic acid', 'ethyl acetate', '3-methylbutanal', 'furfural'], compoundClasses: ['acid', 'ester', 'aldehyde', 'furan'], prepMethods: ['season', 'dress', 'pickle'], flavorProfile: ['sour', 'mild', 'sweet'] },

  // === ACIDS / CITRUS ===
  { id: 'lime', name: 'Lime', category: 'acid', cuisines: ['Southeast Asian', 'Latin American', 'South Asian', 'Caribbean'], compounds: ['limonene', 'gamma-terpinene', 'beta-pinene', 'citral', 'linalool'], compoundClasses: ['terpene', 'terpenoid'], prepMethods: ['juice', 'zest', 'wedge'], flavorProfile: ['sour', 'citrusy', 'bright'] },
  { id: 'lemon', name: 'Lemon', category: 'acid', cuisines: ['Southern European', 'Middle Eastern', 'Western', 'North African'], compounds: ['limonene', 'citral', 'linalool', 'gamma-terpinene', 'geranial'], compoundClasses: ['terpene', 'terpenoid'], prepMethods: ['juice', 'zest', 'preserve'], flavorProfile: ['sour', 'citrusy', 'bright'] },
  { id: 'yuzu', name: 'Yuzu', category: 'acid', cuisines: ['Japanese', 'Korean'], compounds: ['limonene', 'linalool', 'yuzu-none', 'gamma-terpinene', 'thymol'], compoundClasses: ['terpene', 'terpenoid', 'phenol'], prepMethods: ['juice', 'zest', 'infuse'], flavorProfile: ['sour', 'floral', 'citrusy'] },
  { id: 'pomegranate', name: 'Pomegranate', category: 'acid', cuisines: ['Middle Eastern', 'South Asian', 'North African'], compounds: ['punicalagin', 'ellagic acid', 'anthocyanins', 'citric acid', '3-hexenol'], compoundClasses: ['tannin', 'phenol', 'organic-acid'], prepMethods: ['juice', 'reduce', 'seed'], flavorProfile: ['tart', 'sweet', 'tannic'] },

  // === VEGETABLES ===
  { id: 'tomato', name: 'Tomato', category: 'vegetable', cuisines: ['Southern European', 'Latin American', 'South Asian', 'Middle Eastern'], compounds: ['cis-3-hexenal', '2-isobutylthiazole', 'beta-ionone', '6-methyl-5-hepten-2-one', 'hexanal', 'glutamate'], compoundClasses: ['aldehyde', 'thiazole', 'ionone', 'ketone', 'amino-acid'], prepMethods: ['raw', 'roast', 'reduce', 'confit'], flavorProfile: ['umami', 'sweet', 'acidic'] },
  { id: 'mushroom_shiitake', name: 'Shiitake', category: 'vegetable', cuisines: ['East Asian', 'Japanese'], compounds: ['1-octen-3-ol', 'lenthionine', 'guanosine monophosphate', 'glutamate', 'ethyl cinnamate'], compoundClasses: ['alcohol', 'sulfide', 'nucleotide', 'amino-acid', 'ester'], prepMethods: ['sear', 'dry', 'braise', 'infuse-dashi'], flavorProfile: ['umami', 'earthy', 'meaty'] },
  { id: 'eggplant', name: 'Eggplant', category: 'vegetable', cuisines: ['Middle Eastern', 'South Asian', 'East Asian', 'Southern European'], compounds: ['trans-2-nonenal', 'hexanal', '1-octen-3-ol', 'solasonine'], compoundClasses: ['aldehyde', 'alcohol', 'alkaloid'], prepMethods: ['char', 'roast', 'fry', 'braise'], flavorProfile: ['earthy', 'creamy', 'smoky'] },
  { id: 'sweet_potato', name: 'Sweet Potato', category: 'vegetable', cuisines: ['East Asian', 'Latin American', 'Caribbean', 'Western'], compounds: ['maltol', '2-acetyl-furan', 'phenylacetaldehyde', 'beta-ionone', 'linalool'], compoundClasses: ['furanone', 'furan', 'aldehyde', 'ionone', 'terpenoid'], prepMethods: ['roast', 'steam', 'purée', 'fry'], flavorProfile: ['sweet', 'earthy', 'caramel'] },
  { id: 'daikon', name: 'Daikon', category: 'vegetable', cuisines: ['Japanese', 'East Asian', 'Korean'], compounds: ['4-methylthio-3-butenyl isothiocyanate', 'methyl mercaptan', 'dimethyl sulfide'], compoundClasses: ['isothiocyanate', 'sulfide'], prepMethods: ['raw', 'pickle', 'simmer', 'grate'], flavorProfile: ['pungent', 'fresh', 'mild'] },

  // === GRAINS / STARCH ===
  { id: 'rice', name: 'Rice', category: 'grain', cuisines: ['East Asian', 'South Asian', 'Southeast Asian', 'Latin American'], compounds: ['2-acetyl-1-pyrroline', 'hexanal', 'nonanal', '4-vinylguaiacol', 'vanillin'], compoundClasses: ['pyrroline', 'aldehyde', 'phenol'], prepMethods: ['steam', 'fry', 'toast', 'risotto'], flavorProfile: ['neutral', 'starchy', 'floral'] },
  { id: 'noodle_wheat', name: 'Wheat Noodle', category: 'grain', cuisines: ['East Asian', 'Southeast Asian', 'South Asian'], compounds: ['2-acetyl-1-pyrroline', 'hexanal', 'furfural'], compoundClasses: ['pyrroline', 'aldehyde', 'furan'], prepMethods: ['boil', 'stir-fry', 'soup'], flavorProfile: ['neutral', 'wheaty'] },

  // === NUTS / SEEDS ===
  { id: 'peanut', name: 'Peanut', category: 'nut', cuisines: ['Southeast Asian', 'East Asian', 'West African', 'Latin American'], compounds: ['2-methylpyrazine', '2,5-dimethylpyrazine', '2-acetylpyrrole', 'benzaldehyde', '2-pentylfuran'], compoundClasses: ['pyrazine', 'pyrrole', 'aldehyde', 'furan'], prepMethods: ['roast', 'crush', 'butter', 'fry'], flavorProfile: ['nutty', 'toasted', 'sweet'] },
  { id: 'sesame', name: 'Sesame Seed', category: 'nut', cuisines: ['East Asian', 'Middle Eastern', 'South Asian'], compounds: ['sesamol', '2-furylmethanol', 'pyrazines', 'guaiacol', 'furfural'], compoundClasses: ['phenol', 'furan', 'pyrazine'], prepMethods: ['toast', 'grind-to-paste', 'sprinkle'], flavorProfile: ['nutty', 'toasted'] },
  { id: 'coconut', name: 'Coconut', category: 'nut', cuisines: ['Southeast Asian', 'South Asian', 'Caribbean', 'Latin American'], compounds: ['delta-octalactone', 'delta-decalactone', 'gamma-nonalactone', 'nonanal'], compoundClasses: ['lactone', 'aldehyde'], prepMethods: ['toast', 'milk', 'shred', 'cream'], flavorProfile: ['sweet', 'tropical', 'creamy'] },
  { id: 'cashew', name: 'Cashew', category: 'nut', cuisines: ['South Asian', 'Southeast Asian', 'East Asian'], compounds: ['2-methylpyrazine', '2-acetylpyrrole', 'furfural', 'benzaldehyde'], compoundClasses: ['pyrazine', 'pyrrole', 'furan', 'aldehyde'], prepMethods: ['roast', 'cream', 'crush'], flavorProfile: ['sweet', 'buttery', 'nutty'] },

  // === SWEETENERS ===
  { id: 'palm_sugar', name: 'Palm Sugar', category: 'sweetener', cuisines: ['Southeast Asian', 'South Asian'], compounds: ['maltol', 'furaneol', 'sotolon', 'cyclotene', 'ethyl maltol'], compoundClasses: ['furanone', 'lactone', 'ketone'], prepMethods: ['dissolve', 'caramelize'], flavorProfile: ['sweet', 'caramel', 'butterscotch'] },
  { id: 'honey', name: 'Honey', category: 'sweetener', cuisines: ['Middle Eastern', 'Western', 'North African', 'South Asian'], compounds: ['phenylacetaldehyde', 'methyl phenylacetate', 'isovaleric acid', '2-phenylethanol', 'linalool oxide'], compoundClasses: ['aldehyde', 'ester', 'acid', 'alcohol', 'terpenoid'], prepMethods: ['drizzle', 'dissolve', 'glaze'], flavorProfile: ['sweet', 'floral', 'warm'] },
  { id: 'mirin', name: 'Mirin', category: 'sweetener', cuisines: ['Japanese'], compounds: ['ethyl acetate', 'isoamyl alcohol', 'glucose', 'amino acids'], compoundClasses: ['ester', 'alcohol', 'sugar', 'amino-acid'], prepMethods: ['season', 'glaze', 'reduce'], flavorProfile: ['sweet', 'umami', 'mild'] },

  // === CHILIES / HEAT ===
  { id: 'thai_chili', name: 'Thai Chili', category: 'chili', cuisines: ['Southeast Asian'], compounds: ['capsaicin', 'dihydrocapsaicin', 'beta-carotene', 'ascorbic acid'], compoundClasses: ['alkaloid', 'carotenoid', 'acid'], prepMethods: ['slice', 'pound', 'dry', 'fry-in-oil'], flavorProfile: ['hot', 'fruity', 'sharp'] },
  { id: 'chipotle', name: 'Chipotle', category: 'chili', cuisines: ['Latin American'], compounds: ['capsaicin', 'guaiacol', '4-methylguaiacol', 'syringol', 'furfural'], compoundClasses: ['alkaloid', 'phenol', 'furan'], prepMethods: ['rehydrate', 'purée', 'infuse'], flavorProfile: ['smoky', 'hot', 'sweet'] },
  { id: 'gochugaru', name: 'Gochugaru', category: 'chili', cuisines: ['Korean'], compounds: ['capsaicin', 'dihydrocapsaicin', 'beta-carotene', 'capsanthin', 'zeaxanthin'], compoundClasses: ['alkaloid', 'carotenoid'], prepMethods: ['sprinkle', 'paste', 'infuse-in-oil'], flavorProfile: ['hot', 'sweet', 'fruity', 'smoky'] },

  // === COCOA / COFFEE / TEA ===
  { id: 'cocoa', name: 'Cocoa', category: 'bitter', cuisines: ['Latin American', 'Western'], compounds: ['theobromine', 'phenylethylamine', '2-methylpyrazine', '2,3-dimethylpyrazine', 'linalool', 'vanillin'], compoundClasses: ['alkaloid', 'amine', 'pyrazine', 'terpenoid', 'aldehyde'], prepMethods: ['melt', 'dust', 'infuse', 'rub'], flavorProfile: ['bitter', 'sweet', 'earthy'] },
  { id: 'coffee', name: 'Coffee', category: 'bitter', cuisines: ['Latin American', 'Middle Eastern', 'Western', 'East African'], compounds: ['2-furfurylthiol', 'kahweofuran', '2-methylpyrazine', '2-ethyl-3,5-dimethylpyrazine', 'guaiacol', 'vanillin'], compoundClasses: ['thiol', 'furan', 'pyrazine', 'phenol', 'aldehyde'], prepMethods: ['brew', 'infuse', 'grind-rub'], flavorProfile: ['bitter', 'roasted', 'acidic'] },
  { id: 'matcha', name: 'Matcha', category: 'bitter', cuisines: ['Japanese'], compounds: ['L-theanine', 'epigallocatechin gallate', 'chlorophyll', 'linalool', 'geraniol'], compoundClasses: ['amino-acid', 'catechin', 'terpenoid'], prepMethods: ['whisk', 'dust', 'infuse'], flavorProfile: ['bitter', 'vegetal', 'umami', 'sweet'] },

  // === MISC ===
  { id: 'kombu', name: 'Kombu', category: 'umami', cuisines: ['Japanese', 'Korean'], compounds: ['glutamate', 'mannitol', 'fucoxanthin', 'dimethyl sulfide'], compoundClasses: ['amino-acid', 'sugar-alcohol', 'carotenoid', 'sulfide'], prepMethods: ['steep-cold', 'steep-hot', 'infuse-dashi'], flavorProfile: ['umami', 'briny', 'mineral'] },
  { id: 'bonito', name: 'Bonito Flakes', category: 'umami', cuisines: ['Japanese'], compounds: ['inosinic acid', 'histidine', 'anserine', '2-methyl-3-furanthiol', 'dimethyl sulfide'], compoundClasses: ['nucleotide', 'amino-acid', 'thiol', 'sulfide'], prepMethods: ['steep', 'infuse-dashi', 'sprinkle'], flavorProfile: ['umami', 'smoky', 'savory'] },
  { id: 'dried_shrimp', name: 'Dried Shrimp', category: 'umami', cuisines: ['Southeast Asian', 'East Asian', 'Latin American'], compounds: ['trimethylamine', 'dimethyl sulfide', 'inosinic acid', 'glutamate'], compoundClasses: ['amine', 'sulfide', 'nucleotide', 'amino-acid'], prepMethods: ['pound', 'fry', 'infuse'], flavorProfile: ['umami', 'briny', 'funky'] },
  { id: 'vanilla', name: 'Vanilla', category: 'aromatic', cuisines: ['Western', 'Latin American'], compounds: ['vanillin', 'guaiacol', 'p-hydroxybenzaldehyde', '4-methylguaiacol', 'piperonal'], compoundClasses: ['aldehyde', 'phenol'], prepMethods: ['infuse', 'scrape', 'steep'], flavorProfile: ['sweet', 'warm', 'floral'] },
  { id: 'pandan', name: 'Pandan', category: 'aromatic', cuisines: ['Southeast Asian'], compounds: ['2-acetyl-1-pyrroline', 'linalool', 'phytol', '3-methylbutanal'], compoundClasses: ['pyrroline', 'terpenoid', 'aldehyde'], prepMethods: ['infuse', 'blend', 'knot'], flavorProfile: ['floral', 'vanilla-like', 'grassy'] },
  { id: 'makrut_lime', name: 'Makrut Lime Leaf', category: 'aromatic', cuisines: ['Southeast Asian'], compounds: ['citronellal', 'limonene', 'beta-pinene', 'citronellol', 'linalool'], compoundClasses: ['terpene', 'terpenoid'], prepMethods: ['chiffonade', 'infuse', 'tear'], flavorProfile: ['citrusy', 'floral', 'piney'] },
]

// All unique compound classes across the database
export const allCompoundClasses = [...new Set(ingredients.flatMap(i => i.compoundClasses))].sort()

// All unique cuisines
export const allCuisines = [...new Set(ingredients.flatMap(i => i.cuisines))].sort()

// All categories
export const allCategories = [...new Set(ingredients.map(i => i.category))].sort()

/**
 * Compute compound-class overlap between two ingredients.
 * This is the basis for flavor pairing theory (Ahn et al. 2011):
 * ingredients sharing volatile compound classes tend to pair well.
 * Returns a value between 0 and 1.
 */
export function compoundOverlap(a, b) {
  const setA = new Set(a.compoundClasses)
  const setB = new Set(b.compoundClasses)
  const intersection = [...setA].filter(c => setB.has(c)).length
  const union = new Set([...setA, ...setB]).size
  return union === 0 ? 0 : intersection / union
}

/**
 * Compute cuisine distance between two ingredients.
 * 0 = same cuisines, 1 = no shared cuisines.
 * Cross-cuisine combinations score higher on novelty.
 */
export function cuisineDistance(a, b) {
  const setA = new Set(a.cuisines)
  const setB = new Set(b.cuisines)
  const intersection = [...setA].filter(c => setB.has(c)).length
  const union = new Set([...setA, ...setB]).size
  return union === 0 ? 1 : 1 - (intersection / union)
}
