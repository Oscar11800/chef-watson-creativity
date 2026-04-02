import { motion } from 'framer-motion'

const phaseColors = {
  'Prepare': 'var(--color-knowledge)',
  'Build Base': 'var(--color-knowledge)',
  'Develop Aromatics': 'var(--color-generator)',
  'Develop': 'var(--color-generator)',
  'Build Depth': 'var(--color-assessor)',
  'Season': 'var(--color-assessor)',
  'Texture': 'var(--color-planner)',
  'Balance': 'var(--color-planner)',
  'Finish': 'var(--color-artifact)',
  'Externalize': 'var(--color-artifact)',
}

export default function PlannerPanel({ candidate, hasGenerated }) {
  if (!hasGenerated || !candidate) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-planner" />
          <span className="font-mono text-base tracking-[0.2em] text-text-dim">
            WORK PLANNER
          </span>
        </div>
        <p className="text-text-dim text-base mb-4 leading-relaxed">
          The planner generates preparation steps algorithmically from ingredient properties.
          Each ingredient's category (protein, spice, herb, acid...) determines what kind
          of preparation it needs, and its prepMethods field from the knowledge database
          drives the specific action. Steps are ordered by culinary phase logic.
        </p>
        <div className="flex items-center justify-center py-16 text-text-muted font-mono text-sm border border-dashed border-border rounded">
          Generate candidates in the Designer first.
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-planner" />
        <span className="font-mono text-base tracking-[0.2em] text-text-dim">
          WORK PLANNER
        </span>
      </div>

      <p className="text-text-dim text-base mb-1 leading-relaxed">
        Each step below is generated from the ingredient's category and preparation methods
        in the knowledge database — not pre-written. Change the Assessor's weighting to
        select a different candidate and see a different plan.
      </p>
      <div className="font-mono text-sm text-planner tracking-wider mb-6">
        PLANNING FOR: {candidate.name} · {candidate.technique.name}
      </div>

      {/* Process flowchart */}
      <div className="relative">
        {candidate.steps.map((step, i) => {
          const color = phaseColors[step.phase] || 'var(--color-text-dim)'
          const isLast = i === candidate.steps.length - 1

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              {!isLast && (
                <div
                  className="absolute left-[25px] top-[52px] w-px h-[calc(100%-24px)]"
                  style={{ backgroundColor: `color-mix(in srgb, ${color} 30%, transparent)` }}
                />
              )}

              <div className="flex items-start gap-4 mb-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 + 0.05 }}
                  className="w-[52px] h-[52px] rounded-lg border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: color,
                    backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
                  }}
                >
                  <span className="font-mono text-base font-bold" style={{ color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                <div className="flex-1 pb-1 pt-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-lg tracking-[0.15em] font-medium" style={{ color }}>
                      {step.phase.toUpperCase()}
                    </span>
                    {!isLast && (
                      <span className="font-mono text-base text-text-muted">→</span>
                    )}
                  </div>
                  <p className="text-lg text-text-dim leading-relaxed">
                    {step.action}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-lg border border-planner/30 bg-planner-dim"
      >
        <div className="font-mono text-lg text-planner tracking-wider mb-2">
          PROCESS SUMMARY
        </div>
        <div className="flex gap-1.5 flex-wrap mb-2">
          {[...new Set(candidate.steps.map(s => s.phase))].map((phase, i) => (
            <span
              key={i}
              className="font-mono text-base px-2 py-0.5 rounded border"
              style={{
                color: phaseColors[phase] || 'var(--color-text-dim)',
                borderColor: `color-mix(in srgb, ${phaseColors[phase] || 'var(--color-text-dim)'} 30%, transparent)`,
              }}
            >
              {phase}
            </span>
          ))}
        </div>
        <div className="font-mono text-base text-text-muted">
          {candidate.steps.length} steps · {candidate.allIngredients.length} ingredients ·
          technique: {candidate.technique.name} ({candidate.technique.category})
        </div>
      </motion.div>
    </div>
  )
}
