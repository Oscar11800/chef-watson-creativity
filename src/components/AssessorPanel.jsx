import { motion, AnimatePresence } from 'framer-motion'

export default function AssessorPanel({ candidates, noveltyWeight, onNoveltyChange, hasGenerated }) {
  if (!hasGenerated || candidates.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full bg-assessor" />
          <span className="font-mono text-lg tracking-[0.2em] text-text-dim">
            WORK PRODUCT ASSESSOR
          </span>
        </div>
        <p className="text-text-dim text-lg mb-6 leading-relaxed">
          The assessor evaluates candidates along two computed dimensions:
          <strong className="text-assessor"> novelty</strong> (average cuisine distance
          between ingredient pairs — how cross-cultural the combination is) and
          <strong className="text-assessor"> quality</strong> (average compound-class
          overlap — shared volatile compound families predict good flavor pairings).
        </p>
        <div className="flex items-center justify-center py-20 text-text-muted font-mono text-base border border-dashed border-border rounded">
          Open the Designer and generate candidates first.
        </div>
      </div>
    )
  }

  const qualityWeight = 1 - noveltyWeight

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-assessor" />
        <span className="font-mono text-lg tracking-[0.2em] text-text-dim">
          WORK PRODUCT ASSESSOR
        </span>
      </div>

      <p className="text-text-dim text-lg mb-2 leading-relaxed">
        <strong className="text-assessor">Novelty</strong> is computed as average cuisine
        distance between all ingredient pairs — combinations that cross culinary
        traditions score higher. <strong className="text-assessor">Quality</strong> is
        computed as average compound-class overlap (Jaccard index) — ingredients
        sharing volatile compound families tend to pair well (Ahn et al. 2011).
      </p>
      <p className="text-text-muted text-base mb-6 font-mono">
        Drag the slider to change the novelty/quality weighting. Rankings update in real-time.
        The top-ranked candidate propagates to the Planner and Output.
      </p>

      {/* Novelty-Quality slider */}
      <div className="mb-8 p-6 rounded-lg border border-assessor/30 bg-assessor-dim">
        <div className="flex justify-between mb-4">
          <span className="font-mono text-lg tracking-wider text-text-dim">
            QUALITY-WEIGHTED
          </span>
          <span className="font-mono text-lg tracking-wider text-text-dim">
            NOVELTY-WEIGHTED
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={noveltyWeight * 100}
          onChange={e => onNoveltyChange(Number(e.target.value) / 100)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-planner), var(--color-assessor))`,
            accentColor: 'var(--color-assessor)',
          }}
        />

        <div className="flex justify-between mt-3">
          <span className="font-mono text-base text-text-muted">
            compound overlap ×{qualityWeight.toFixed(2)}
          </span>
          <span className="font-mono text-base text-text-muted">
            cuisine distance ×{noveltyWeight.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Ranked candidate list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {candidates.map((candidate, i) => {
            const isTop = i === 0
            return (
              <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className={`flex items-center gap-5 p-5 rounded-lg border transition-all ${
                  isTop
                    ? 'border-assessor bg-assessor-dim'
                    : 'border-border hover:border-border-light'
                }`}
                style={{ opacity: Math.max(0.3, 1 - i * 0.06) }}
              >
                <div className={`font-mono text-3xl w-12 text-center shrink-0 ${isTop ? 'text-assessor' : 'text-text-muted'}`}>
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-lg font-medium truncate ${isTop ? 'text-text' : 'text-text-dim'}`}>
                    {candidate.name}
                  </div>
                  <div className="font-mono text-base text-text-muted mt-1">
                    {candidate.cuisineLabel} · {candidate.allIngredients.length} ingredients
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-52 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-muted w-10">NOV</span>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-assessor"
                        animate={{ width: `${candidate.novelty * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-muted w-10">QUA</span>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-planner"
                        animate={{ width: `${candidate.quality * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>

                <div className={`font-mono text-xl w-14 text-right shrink-0 ${isTop ? 'text-assessor' : 'text-text-muted'}`}>
                  {(candidate.score * 100).toFixed(0)}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-5 rounded-lg border border-dashed border-assessor/30"
      >
        <div className="font-mono text-lg text-assessor tracking-wider mb-1">
          TOP SELECTION → {candidates[0]?.name}
        </div>
        <div className="text-text-muted text-base font-mono">
          This selection propagates to the Planner and Output. Move the slider to change it.
        </div>
      </motion.div>
    </div>
  )
}
