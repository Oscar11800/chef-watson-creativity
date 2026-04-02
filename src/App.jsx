import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PipelineBar from './components/PipelineBar'
import KnowledgePanel from './components/KnowledgePanel'
import DesignerPanel from './components/DesignerPanel'
import AssessorPanel from './components/AssessorPanel'
import PlannerPanel from './components/PlannerPanel'
import OutputPanel from './components/OutputPanel'
import { generateCandidates, scoreCandidates } from './data/candidates'

const STEPS = ['designer', 'assessor', 'planner', 'output']

export default function App() {
  const [activeStep, setActiveStep] = useState(null)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [noveltyWeight, setNoveltyWeight] = useState(0.5)
  const [generatedCandidates, setGeneratedCandidates] = useState([])
  const [hasGenerated, setHasGenerated] = useState(false)

  const rankedCandidates = useMemo(
    () => scoreCandidates(generatedCandidates, noveltyWeight),
    [generatedCandidates, noveltyWeight]
  )

  const selectedCandidate = rankedCandidates[0] || null

  // Track which steps have been "reached"
  const stepsReached = useMemo(() => {
    const reached = new Set()
    reached.add('designer') // always available
    if (hasGenerated) {
      reached.add('assessor')
      reached.add('planner')
      reached.add('output')
    }
    return reached
  }, [hasGenerated])

  const handleGenerate = useCallback(() => {
    const count = 6 + Math.floor(Math.random() * 5)
    const candidates = generateCandidates(count)
    setGeneratedCandidates(candidates)
    setHasGenerated(true)
  }, [])

  const handleStepClick = useCallback((step) => {
    setKnowledgeOpen(false)
    setActiveStep(prev => prev === step ? null : step)
  }, [])

  const handleKnowledgeToggle = useCallback(() => {
    setActiveStep(null)
    setKnowledgeOpen(prev => !prev)
  }, [])

  const renderPanel = () => {
    if (knowledgeOpen) {
      return <KnowledgePanel key="knowledge" />
    }
    switch (activeStep) {
      case 'designer':
        return (
          <DesignerPanel
            key="designer"
            candidates={generatedCandidates}
            onGenerate={handleGenerate}
            hasGenerated={hasGenerated}
            selectedCandidate={selectedCandidate}
          />
        )
      case 'assessor':
        return (
          <AssessorPanel
            key="assessor"
            candidates={rankedCandidates}
            noveltyWeight={noveltyWeight}
            onNoveltyChange={setNoveltyWeight}
            hasGenerated={hasGenerated}
          />
        )
      case 'planner':
        return (
          <PlannerPanel
            key="planner"
            candidate={selectedCandidate}
            hasGenerated={hasGenerated}
          />
        )
      case 'output':
        return (
          <OutputPanel
            key="output"
            candidate={selectedCandidate}
            hasGenerated={hasGenerated}
            rankedCandidates={rankedCandidates}
            noveltyWeight={noveltyWeight}
          />
        )
      default:
        return null
    }
  }

  const showEmpty = !activeStep && !knowledgeOpen

  return (
    <div className="h-screen bg-bg overflow-hidden flex flex-col">
      {/* Pipeline bar */}
      <PipelineBar
        activeStep={activeStep}
        knowledgeOpen={knowledgeOpen}
        stepsReached={stepsReached}
        onStepClick={handleStepClick}
        onKnowledgeToggle={handleKnowledgeToggle}
        hasGenerated={hasGenerated}
        selectedCandidate={selectedCandidate}
      />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {showEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center px-8"
            >
              <div className="max-w-lg text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mb-4">
                  COMPUTATIONAL CREATIVITY PIPELINE
                </div>
                <p className="text-text-dim text-sm leading-relaxed mb-6">
                  Step through a computational creativity system. Start at
                  <span className="text-generator font-medium"> Designer</span> to
                  generate candidate artifacts from a database of 80+ real ingredients,
                  then evaluate, plan, and see the converged output.
                </p>
                <button
                  onClick={() => handleStepClick('designer')}
                  className="font-mono text-[11px] tracking-[0.2em] px-6 py-3 rounded border border-generator text-generator hover:bg-generator-dim transition-colors cursor-pointer"
                >
                  BEGIN WITH DESIGNER →
                </button>
                <div className="mt-6 font-mono text-[9px] text-text-muted">
                  Or click <button onClick={handleKnowledgeToggle} className="text-knowledge underline cursor-pointer">Knowledge DB</button> to browse the ingredient database first.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeStep || 'knowledge'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="min-h-full"
            >
              {renderPanel()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
