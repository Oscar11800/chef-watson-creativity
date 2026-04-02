import { motion, AnimatePresence } from 'framer-motion'

export default function DesignerPanel({ candidates, onGenerate, hasGenerated, selectedCandidate }) {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-generator" />
        <span className="font-mono text-lg tracking-[0.2em] text-text-dim">
          WORK PRODUCT DESIGNER
        </span>
      </div>

      <p className="text-text-dim text-lg mb-1 leading-relaxed">
        The designer is the lead component. It picks a seed ingredient from the knowledge
        database, then selects companions by compound-class overlap (shared volatile compound
        families predict good flavor pairings — Ahn et al. 2011). A technique is chosen
        based on the categories present. Each click produces a genuinely different set.
      </p>
      <p className="text-text-muted text-base mb-5 font-mono">
        Candidates are sent to the Assessor for novelty/quality scoring and to the Planner for process generation.
        The Assessor and Planner interact only through this component.
      </p>

      <button
        onClick={onGenerate}
        className="font-mono text-lg tracking-[0.2em] px-6 py-3 rounded border border-generator text-generator hover:bg-generator-dim transition-colors mb-6 cursor-pointer"
      >
        {hasGenerated ? 'REGENERATE CANDIDATES' : 'GENERATE CANDIDATES'}
      </button>

      {!hasGenerated && (
        <div className="flex items-center justify-center py-16 text-text-muted font-mono text-base border border-dashed border-border rounded">
          Click above to recombine knowledge into candidate artifacts.
          Each candidate is built algorithmically from the ingredient database.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {candidates.map((candidate, i) => {
            const isSelected = selectedCandidate?.id === candidate.id
            return (
              <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={`rounded border p-4 transition-colors ${
                  isSelected
                    ? 'border-generator bg-generator-dim'
                    : 'border-border hover:border-border-light'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-base text-text-muted tracking-wider">
                    CANDIDATE {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="font-mono text-sm text-generator tracking-wider">
                        TOP RANKED
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-lg font-medium text-text mb-1">
                  {candidate.name}
                </div>
                <div className="font-mono text-base text-generator/60 mb-2">
                  {candidate.cuisineLabel} · {candidate.technique.name}
                </div>

                {/* Ingredients with seed highlighted */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {candidate.allIngredients.map(ing => (
                    <span
                      key={ing.id}
                      className={`font-mono text-base px-2 py-1 rounded border ${
                        ing.id === candidate.seed.id
                          ? 'bg-generator-dim text-generator border-generator/30'
                          : 'text-text-dim border-border'
                      }`}
                    >
                      {ing.id === candidate.seed.id && '● '}
                      {ing.name}
                    </span>
                  ))}
                </div>

                {/* Computed scores */}
                <div className="flex gap-4 font-mono text-base text-text-muted">
                  <span title="Cuisine distance — how rarely these ingredients share a cuisine">
                    NOVELTY {(candidate.novelty * 100).toFixed(0)}%
                  </span>
                  <span title="Compound overlap — shared volatile compound families">
                    QUALITY {(candidate.quality * 100).toFixed(0)}%
                  </span>
                </div>

                {/* Top compound pairings in this candidate */}
                {candidate.pairDetails.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="font-mono text-sm text-text-muted mb-1">
                      COMPOUND LINKS
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.pairDetails.slice(0, 3).map((pair, j) => (
                        <span key={j} className="font-mono text-sm text-text-muted">
                          {pair.a}↔{pair.b} ({pair.sharedClasses.join(', ')})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {hasGenerated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-3 rounded border border-dashed border-generator/30 text-center"
        >
          <span className="font-mono text-base text-text-muted tracking-wider">
            {candidates.length} CANDIDATES GENERATED FROM {candidates.reduce((s, c) => {
              c.allIngredients.forEach(i => s.add(i.id)); return s
            }, new Set()).size} UNIQUE INGREDIENTS →
            OPEN <span className="text-assessor">ASSESSOR</span> TO RANK BY NOVELTY × QUALITY
          </span>
        </motion.div>
      )}
    </div>
  )
}
