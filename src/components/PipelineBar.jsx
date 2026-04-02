import { motion } from 'framer-motion'

const steps = [
  {
    id: 'designer',
    label: 'Designer',
    sublabel: 'Generate candidates',
    number: '01',
    color: 'var(--color-generator)',
    dimColor: 'var(--color-generator-dim)',
  },
  {
    id: 'assessor',
    label: 'Assessor',
    sublabel: 'Rank by novelty × quality',
    number: '02',
    color: 'var(--color-assessor)',
    dimColor: 'var(--color-assessor-dim)',
  },
  {
    id: 'planner',
    label: 'Planner',
    sublabel: 'Build process map',
    number: '03',
    color: 'var(--color-planner)',
    dimColor: 'var(--color-planner-dim)',
  },
  {
    id: 'output',
    label: 'Output',
    sublabel: 'Converged artifact',
    number: '04',
    color: 'var(--color-artifact)',
    dimColor: 'var(--color-artifact-dim)',
  },
]

export default function PipelineBar({
  activeStep,
  knowledgeOpen,
  stepsReached,
  onStepClick,
  onKnowledgeToggle,
  hasGenerated,
  selectedCandidate,
}) {
  return (
    <div className="border-b border-border bg-surface shrink-0">
      <div className="px-6 py-4">
        {/* Knowledge source row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={onKnowledgeToggle}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg border font-mono text-sm tracking-wider transition-all cursor-pointer ${
              knowledgeOpen
                ? 'border-knowledge text-knowledge bg-knowledge-dim'
                : 'border-border text-text-muted hover:border-knowledge/40 hover:text-knowledge/70'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-knowledge opacity-60" />
            KNOWLEDGE DB
          </button>
          <span className="font-mono text-sm text-text-muted">
            Data source — 80+ ingredients with flavor compounds
          </span>
          <span className="font-mono text-sm text-text-muted">
            feeds into ↓
          </span>
        </div>

        {/* Pipeline steps — full width, centered */}
        <div className="flex items-stretch gap-3">
          {steps.map((step, i) => {
            const isActive = activeStep === step.id
            const isReached = stepsReached.has(step.id)
            const isLast = i === steps.length - 1

            return (
              <div key={step.id} className="flex items-stretch flex-1 min-w-0">
                <button
                  onClick={() => onStepClick(step.id)}
                  disabled={!isReached && step.id !== 'designer'}
                  className={`relative flex-1 min-w-0 px-6 py-4 rounded-lg border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-current'
                      : isReached
                      ? 'border-border hover:border-current'
                      : 'border-border/50 opacity-40 cursor-not-allowed'
                  }`}
                  style={{
                    color: isActive ? step.color : undefined,
                    backgroundColor: isActive ? step.dimColor : undefined,
                    borderColor: isActive ? step.color : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className={`font-mono text-base font-bold ${
                        isActive ? '' : isReached ? 'text-text-dim' : 'text-text-muted'
                      }`}
                      style={{ color: isActive ? step.color : undefined }}
                    >
                      {step.number}
                    </span>
                    {isReached && !isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: step.color, opacity: 0.5 }}
                      />
                    )}
                  </div>

                  <div
                    className={`font-mono text-lg tracking-wider font-medium ${
                      isActive ? '' : isReached ? 'text-text-dim' : 'text-text-muted'
                    }`}
                    style={{ color: isActive ? step.color : undefined }}
                  >
                    {step.label}
                  </div>
                  <div className="font-mono text-sm text-text-muted mt-1">
                    {step.sublabel}
                  </div>

                  {step.id === 'output' && hasGenerated && selectedCandidate && !isActive && (
                    <div
                      className="font-mono text-sm truncate mt-1.5"
                      style={{ color: step.color, opacity: 0.7 }}
                    >
                      → {selectedCandidate.name}
                    </div>
                  )}
                </button>

                {!isLast && (
                  <div className="flex items-center px-1 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M6 4 L17 12 L6 20"
                        fill="none"
                        stroke={isReached ? 'var(--color-text-muted)' : 'var(--color-border)'}
                        strokeWidth="2"
                        opacity={isReached ? 0.5 : 0.3}
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
