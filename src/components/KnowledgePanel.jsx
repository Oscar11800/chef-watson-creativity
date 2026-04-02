import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ingredients, allCategories, allCuisines, compoundOverlap } from '../data/knowledge'

export default function KnowledgePanel() {
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterCuisine, setFilterCuisine] = useState('all')
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  const filtered = useMemo(() => {
    return ingredients.filter(ing => {
      if (filterCategory !== 'all' && ing.category !== filterCategory) return false
      if (filterCuisine !== 'all' && !ing.cuisines.includes(filterCuisine)) return false
      return true
    })
  }, [filterCategory, filterCuisine])

  // Find top pairings for selected ingredient
  const pairings = useMemo(() => {
    if (!selectedIngredient) return []
    return ingredients
      .filter(i => i.id !== selectedIngredient.id)
      .map(i => ({ ingredient: i, overlap: compoundOverlap(selectedIngredient, i) }))
      .filter(p => p.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 8)
  }, [selectedIngredient])

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-knowledge" />
        <span className="font-mono text-lg tracking-[0.2em] text-text-dim">
          KNOWLEDGE DATABASE
        </span>
      </div>

      <p className="text-text-dim text-lg mb-1 leading-relaxed">
        {ingredients.length} ingredients with real flavor compound data sourced from
        FlavorDB and the Ahn et al. flavor network. Each entry carries compound classes,
        cuisine associations, and preparation methods — this is what the Designer
        recombines, the Assessor evaluates against, and the Planner draws from.
      </p>
      <p className="text-text-muted text-base mb-5 font-mono">
        Click any ingredient to see its compound classes and top flavor pairings (by shared compound overlap).
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-base text-text-muted tracking-wider">CATEGORY</span>
          <select
            value={filterCategory}
            onChange={e => { setFilterCategory(e.target.value); setSelectedIngredient(null) }}
            className="font-mono text-base px-2 py-1 rounded border border-border bg-surface text-text-dim cursor-pointer"
          >
            <option value="all">All ({ingredients.length})</option>
            {allCategories.map(c => (
              <option key={c} value={c}>
                {c} ({ingredients.filter(i => i.category === c).length})
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-base text-text-muted tracking-wider">CUISINE</span>
          <select
            value={filterCuisine}
            onChange={e => { setFilterCuisine(e.target.value); setSelectedIngredient(null) }}
            className="font-mono text-base px-2 py-1 rounded border border-border bg-surface text-text-dim cursor-pointer"
          >
            <option value="all">All cuisines</option>
            {allCuisines.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <span className="font-mono text-base text-text-muted self-center">
          {filtered.length} results
        </span>
      </div>

      {/* Ingredient grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((ing, i) => {
            const isSelected = selectedIngredient?.id === ing.id
            const isPaired = selectedIngredient && pairings.some(p => p.ingredient.id === ing.id)

            return (
              <motion.div
                key={ing.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: selectedIngredient && !isSelected && !isPaired ? 0.3 : 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, delay: i * 0.008 }}
                onClick={() => setSelectedIngredient(isSelected ? null : ing)}
                className={`cursor-pointer rounded border p-4 transition-colors ${
                  isSelected
                    ? 'border-knowledge bg-knowledge-dim'
                    : isPaired
                    ? 'border-knowledge/40'
                    : 'border-border hover:border-border-light'
                }`}
              >
                <div className="text-base font-medium text-text">{ing.name}</div>
                <div className="font-mono text-sm text-text-muted mt-0.5 flex gap-1.5">
                  <span>{ing.category}</span>
                  <span className="text-border">·</span>
                  <span>{ing.cuisines[0]}</span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Selected ingredient detail */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-lg border border-knowledge/40 bg-knowledge-dim">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-medium text-text">{selectedIngredient.name}</h3>
                  <div className="font-mono text-base text-text-muted mt-0.5">
                    {selectedIngredient.category} · {selectedIngredient.cuisines.join(', ')}
                  </div>
                </div>
                <div className="font-mono text-sm text-text-muted">
                  {selectedIngredient.flavorProfile.join(' · ')}
                </div>
              </div>

              {/* Compounds */}
              <div className="mb-3">
                <div className="font-mono text-base text-knowledge tracking-wider mb-1.5">
                  KEY COMPOUNDS (from FlavorDB)
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedIngredient.compounds.map(c => (
                    <span key={c} className="font-mono text-base px-2 py-0.5 rounded bg-surface border border-border text-text-dim">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compound classes */}
              <div className="mb-3">
                <div className="font-mono text-base text-knowledge tracking-wider mb-1.5">
                  COMPOUND CLASSES (used for pairing scores)
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedIngredient.compoundClasses.map(c => (
                    <span key={c} className="font-mono text-base px-2 py-0.5 rounded bg-knowledge-dim text-knowledge border border-knowledge/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prep methods */}
              <div className="mb-4">
                <div className="font-mono text-base text-knowledge tracking-wider mb-1.5">
                  PREPARATION METHODS (used by Planner)
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedIngredient.prepMethods.map(m => (
                    <span key={m} className="font-mono text-base px-2 py-0.5 rounded border border-planner/20 text-planner">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top pairings */}
              {pairings.length > 0 && (
                <div>
                  <div className="font-mono text-base text-knowledge tracking-wider mb-1.5">
                    TOP PAIRINGS BY COMPOUND OVERLAP (Ahn et al. flavor network)
                  </div>
                  <div className="space-y-1">
                    {pairings.map(({ ingredient: ing, overlap }) => (
                      <div key={ing.id} className="flex items-center gap-2">
                        <div className="flex-1 text-base text-text-dim">{ing.name}</div>
                        <div className="w-28 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-knowledge"
                            style={{ width: `${overlap * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-base text-text-muted w-12 text-right">
                          {(overlap * 100).toFixed(0)}%
                        </span>
                        <span className="font-mono text-sm text-text-muted">
                          {ing.compoundClasses.filter(c =>
                            selectedIngredient.compoundClasses.includes(c)
                          ).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
