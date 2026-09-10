import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LearnIndex from './pages/learn/LearnIndex';
import PlaygroundIndex from './pages/playground/PlaygroundIndex';
import ReferenceIndex from './pages/reference/ReferenceIndex';
import PracticeIndex from './pages/practice/PracticeIndex';
import MisconceptionsPage from './pages/reference/MisconceptionsPage';
import GlossaryPage from './pages/reference/GlossaryPage';
import GateReferencePage from './pages/reference/GateReferencePage';
import FormulaSheetPage from './pages/reference/FormulaSheetPage';
import ComplexityPage from './pages/reference/ComplexityPage';

// Learn chapters
import ClassicalComputing from './pages/learn/ClassicalComputing';
import OneQubit from './pages/learn/OneQubit';
import LinearAlgebra from './pages/learn/LinearAlgebra';
import MultipleQubits from './pages/learn/MultipleQubits';
import QuantumCircuits from './pages/learn/QuantumCircuits';
import ErrorCorrection from './pages/learn/ErrorCorrection';
import Entanglement from './pages/learn/Entanglement';
import Protocols from './pages/learn/Protocols';
import Algorithms from './pages/learn/Algorithms';
import QFT from './pages/learn/QFT';
import PhaseEstimation from './pages/learn/PhaseEstimation';
import Shor from './pages/learn/Shor';
import ModernTopics from './pages/learn/ModernTopics';

// Labs
import LabPage from './pages/playground/LabPage';
import CircuitBuilderPage from './pages/playground/CircuitBuilderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnIndex />} />
        <Route path="learn/classical" element={<ClassicalComputing />} />
        <Route path="learn/one-qubit" element={<OneQubit />} />
        <Route path="learn/linear-algebra" element={<LinearAlgebra />} />
        <Route path="learn/multiple-qubits" element={<MultipleQubits />} />
        <Route path="learn/circuits" element={<QuantumCircuits />} />
        <Route path="learn/error-correction" element={<ErrorCorrection />} />
        <Route path="learn/entanglement" element={<Entanglement />} />
        <Route path="learn/protocols" element={<Protocols />} />
        <Route path="learn/algorithms" element={<Algorithms />} />
        <Route path="learn/qft" element={<QFT />} />
        <Route path="learn/phase-estimation" element={<PhaseEstimation />} />
        <Route path="learn/shor" element={<Shor />} />
        <Route path="learn/modern" element={<ModernTopics />} />
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
  );
}
