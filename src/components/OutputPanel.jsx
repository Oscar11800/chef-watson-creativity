import { motion } from 'framer-motion'

export default function OutputPanel({ candidate, hasGenerated, rankedCandidates, noveltyWeight }) {
  if (!hasGenerated || !candidate) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-border flex items-center justify-center mb-6">
            <span className="font-mono text-lg text-text-muted text-center px-4">
              AWAITING<br />PIPELINE
            </span>
          </div>
          <p className="text-text-dim text-lg mb-2">
            The output reflects every upstream decision.
          </p>
          <p className="font-mono text-base text-text-muted">
            Go to step 01 (Designer) to generate candidates, then step 02 (Assessor) to rank them.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Hero artifact card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative rounded-xl border border-artifact bg-artifact-dim p-10 mb-8"
      >
        {/* Corner marks */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-artifact/30" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-artifact/30" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-artifact/30" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-artifact/30" />

        <div className="font-mono text-lg text-text-muted tracking-[0.3em] mb-4">
          REALIZED ARTIFACT
        </div>

        <h2 className="text-3xl font-medium text-text mb-2 leading-tight">
          {candidate.name}
        </h2>

        <div className="font-mono text-lg text-artifact tracking-wider mb-6">
          {candidate.cuisineLabel} · {candidate.technique.name}
        </div>

        {/* Large metrics row */}
        <div className="flex gap-10 mb-8">
          <div>
            <div className="font-mono text-3xl text-assessor">{(candidate.novelty * 100).toFixed(0)}</div>
            <div className="font-mono text-base text-text-muted tracking-wider">NOVELTY</div>
            <div className="font-mono text-sm text-text-muted mt-0.5">cuisine distance</div>
          </div>
          <div>
            <div className="font-mono text-3xl text-planner">{(candidate.quality * 100).toFixed(0)}</div>
            <div className="font-mono text-base text-text-muted tracking-wider">QUALITY</div>
            <div className="font-mono text-sm text-text-muted mt-0.5">compound overlap</div>
          </div>
          <div>
            <div className="font-mono text-3xl text-artifact">
              {candidate.score ? (candidate.score * 100).toFixed(0) : '—'}
            </div>
            <div className="font-mono text-base text-text-muted tracking-wider">COMPOSITE</div>
            <div className="font-mono text-sm text-text-muted mt-0.5">
              novelty ×{noveltyWeight.toFixed(2)} + quality ×{(1 - noveltyWeight).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <div className="font-mono text-lg text-text-muted tracking-wider mb-3">
            INGREDIENTS ({candidate.allIngredients.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.allIngredients.map((ing, i) => (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04, type: 'spring', stiffness: 200 }}
                className={`px-4 py-2 rounded-full border font-mono text-lg ${
                  ing.id === candidate.seed.id
                    ? 'border-artifact/50 text-artifact bg-bg'
                    : 'border-border text-text-dim bg-bg'
                }`}
              >
                {ing.id === candidate.seed.id && <span className="text-artifact mr-1">●</span>}
                {ing.name}
                <span className="text-text-muted ml-2 text-base">{ing.category}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compound links */}
        {candidate.pairDetails && candidate.pairDetails.length > 0 && (
          <div className="mb-6">
            <div className="font-mono text-lg text-text-muted tracking-wider mb-3">
              FLAVOR COMPOUND LINKS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {candidate.pairDetails.slice(0, 6).map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-2 p-2 rounded border border-border bg-bg"
                >
                  <span className="font-mono text-base text-text-dim">{pair.a}</span>
                  <svg width="16" height="8" viewBox="0 0 16 8" className="shrink-0">
                    <line x1="0" y1="4" x2="16" y2="4" stroke="var(--color-artifact)" strokeWidth="1" opacity="0.5" />
                  </svg>
                  <span className="font-mono text-base text-text-dim">{pair.b}</span>
                  <span className="font-mono text-sm text-artifact ml-auto shrink-0">
                    {pair.sharedClasses.join(', ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Technique */}
        <div className="font-mono text-lg text-text-muted">
          TECHNIQUE: {candidate.technique.name} ({candidate.technique.category})
        </div>
      </motion.div>

      {/* Process steps — inline summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="font-mono text-lg text-planner tracking-wider mb-4">
          PREPARATION PROCESS ({candidate.steps.length} steps)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {candidate.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.04 }}
              className="p-3 rounded border border-border"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-base text-planner font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-base text-text-muted tracking-wider">
                  {step.phase.toUpperCase()}
                </span>
              </div>
              <p className="text-base text-text-dim leading-relaxed">{step.action}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pipeline trace */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-lg border border-dashed border-artifact/20"
      >
        <div className="font-mono text-lg text-text-muted tracking-wider mb-2">
          PIPELINE TRACE
        </div>
        <div className="font-mono text-base leading-relaxed">
          <span className="text-knowledge">KNOWLEDGE</span>
          <span className="text-text-muted"> ({candidate.allIngredients.length} ingredients drawn) → </span>
          <span className="text-generator">DESIGNER</span>
          <span className="text-text-muted"> (recombined with {candidate.technique.name}) → </span>
          <span className="text-assessor">ASSESSOR</span>
          <span className="text-text-muted"> (novelty {(candidate.novelty * 100).toFixed(0)}%, quality {(candidate.quality * 100).toFixed(0)}%, composite {(candidate.score * 100).toFixed(0)}) → </span>
          <span className="text-planner">PLANNER</span>
          <span className="text-text-muted"> ({candidate.steps.length} steps) → </span>
          <span className="text-artifact">OUTPUT</span>
        </div>
        {rankedCandidates && rankedCandidates.length > 1 && (
          <div className="font-mono text-base text-text-muted mt-2">
            Selected from {rankedCandidates.length} candidates.
            Runner-up: {rankedCandidates[1]?.name} (score {(rankedCandidates[1]?.score * 100).toFixed(0)}).
          </div>
        )}
      </motion.div>
    </div>
  )
}
