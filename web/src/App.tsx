import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LearnChapterLayout from './components/LearnChapterLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const LearnIndex = lazy(() => import('./pages/learn/LearnIndex'));
const PlaygroundIndex = lazy(() => import('./pages/playground/PlaygroundIndex'));
const ReferenceIndex = lazy(() => import('./pages/reference/ReferenceIndex'));
const PracticeIndex = lazy(() => import('./pages/practice/PracticeIndex'));
const MisconceptionsPage = lazy(() => import('./pages/reference/MisconceptionsPage'));
const GlossaryPage = lazy(() => import('./pages/reference/GlossaryPage'));
const GateReferencePage = lazy(() => import('./pages/reference/GateReferencePage'));
const FormulaSheetPage = lazy(() => import('./pages/reference/FormulaSheetPage'));
const ComplexityPage = lazy(() => import('./pages/reference/ComplexityPage'));

const ClassicalComputing = lazy(() => import('./pages/learn/ClassicalComputing'));
const OneQubit = lazy(() => import('./pages/learn/OneQubit'));
const LinearAlgebra = lazy(() => import('./pages/learn/LinearAlgebra'));
const MultipleQubits = lazy(() => import('./pages/learn/MultipleQubits'));
const QuantumCircuits = lazy(() => import('./pages/learn/QuantumCircuits'));
const ErrorCorrection = lazy(() => import('./pages/learn/ErrorCorrection'));
const Entanglement = lazy(() => import('./pages/learn/Entanglement'));
const Protocols = lazy(() => import('./pages/learn/Protocols'));
const Algorithms = lazy(() => import('./pages/learn/Algorithms'));
const QFT = lazy(() => import('./pages/learn/QFT'));
const PhaseEstimation = lazy(() => import('./pages/learn/PhaseEstimation'));
const Shor = lazy(() => import('./pages/learn/Shor'));
const ModernTopics = lazy(() => import('./pages/learn/ModernTopics'));

const LabPage = lazy(() => import('./pages/playground/LabPage'));
const CircuitBuilderPage = lazy(() => import('./pages/playground/CircuitBuilderPage'));

function PageLoader() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnChapterLayout />}>
            <Route index element={<LearnIndex />} />
            <Route path="classical" element={<ClassicalComputing />} />
            <Route path="one-qubit" element={<OneQubit />} />
            <Route path="linear-algebra" element={<LinearAlgebra />} />
            <Route path="multiple-qubits" element={<MultipleQubits />} />
            <Route path="circuits" element={<QuantumCircuits />} />
            <Route path="error-correction" element={<ErrorCorrection />} />
            <Route path="entanglement" element={<Entanglement />} />
            <Route path="protocols" element={<Protocols />} />
            <Route path="algorithms" element={<Algorithms />} />
            <Route path="qft" element={<QFT />} />
            <Route path="phase-estimation" element={<PhaseEstimation />} />
            <Route path="shor" element={<Shor />} />
            <Route path="modern" element={<ModernTopics />} />
          </Route>
          <Route path="playground" element={<PlaygroundIndex />} />
          <Route path="playground/circuit-builder" element={<CircuitBuilderPage />} />
          <Route path="playground/:labId" element={<LabPage />} />
          <Route path="reference" element={<ReferenceIndex />} />
          <Route path="reference/gates" element={<GateReferencePage />} />
          <Route path="reference/formulas" element={<FormulaSheetPage />} />
          <Route path="reference/complexity" element={<ComplexityPage />} />
          <Route path="reference/glossary" element={<GlossaryPage />} />
          <Route path="reference/misconceptions" element={<MisconceptionsPage />} />
          <Route path="practice" element={<PracticeIndex />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
