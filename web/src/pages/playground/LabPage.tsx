import { Link, useParams } from 'react-router-dom';
import type { ComponentType } from 'react';
import { useT } from '@/context/LocaleContext';
import { useLocalizedLabs } from '@/data/localizedNavigation';
import BinaryStateExplorer from '@/components/labs/BinaryStateExplorer';
import LogicGateSimulator from '@/components/labs/LogicGateSimulator';
import BinaryAdderLab from '@/components/labs/BinaryAdderLab';
import ComplexPlaneLab from '@/components/labs/ComplexPlaneLab';
import QubitStateLab from '@/components/labs/QubitStateLab';
import MeasurementLab from '@/components/labs/MeasurementLab';
import BlochSphereLab from '@/components/labs/BlochSphereLab';
import GateExplorerLab from '@/components/labs/GateExplorerLab';
import UnitaryCheckerLab from '@/components/labs/UnitaryCheckerLab';
import TensorProductLab from '@/components/labs/TensorProductLab';
import BellStateLab from '@/components/labs/BellStateLab';
import EntanglementLab from '@/components/labs/EntanglementLab';
import ErrorCorrectionLab from '@/components/labs/ErrorCorrectionLab';
import CHSHLab from '@/components/labs/CHSHLab';
import SuperdenseLab from '@/components/labs/SuperdenseLab';
import TeleportationLab from '@/components/labs/TeleportationLab';
import BB84Lab from '@/components/labs/BB84Lab';
import DeutschLab from '@/components/labs/DeutschLab';
import DeutschJozsaLab from '@/components/labs/DeutschJozsaLab';
import BernsteinVaziraniLab from '@/components/labs/BernsteinVaziraniLab';
import SimonLab from '@/components/labs/SimonLab';
import GroverLab from '@/components/labs/GroverLab';
import QFTLab from '@/components/labs/QFTLab';
import PhaseEstimationLab from '@/components/labs/PhaseEstimationLab';
import PeriodFindingLab from '@/components/labs/PeriodFindingLab';
import ShorLab from '@/components/labs/ShorLab';

const LAB_COMPONENTS: Record<string, ComponentType> = {
  'binary-states': BinaryStateExplorer,
  'logic-gates': LogicGateSimulator,
  'binary-adder': BinaryAdderLab,
  'complex-plane': ComplexPlaneLab,
  'qubit-state': QubitStateLab,
  'measurement': MeasurementLab,
  'bloch-sphere': BlochSphereLab,
  'gate-explorer': GateExplorerLab,
  'unitary-checker': UnitaryCheckerLab,
  'tensor-product': TensorProductLab,
  'bell-states': BellStateLab,
  'entanglement': EntanglementLab,
  'error-correction': ErrorCorrectionLab,
  'chsh': CHSHLab,
  'superdense': SuperdenseLab,
  'teleportation': TeleportationLab,
  'bb84': BB84Lab,
  'deutsch': DeutschLab,
  'deutsch-jozsa': DeutschJozsaLab,
  'bernstein-vazirani': BernsteinVaziraniLab,
  'simon': SimonLab,
  'grover': GroverLab,
  'qft': QFTLab,
  'phase-estimation': PhaseEstimationLab,
  'period-finding': PeriodFindingLab,
  'shor': ShorLab,
};

export default function LabPage() {
  const { labId } = useParams<{ labId: string }>();
  const t = useT();
  const labs = useLocalizedLabs();
  const lab = labs.find((l) => l.id === labId);
  const LabComponent = labId ? LAB_COMPONENTS[labId] : undefined;

  if (!lab) {
    return (
      <div>
        <h1>{t('playground.labPage.notFound')}</h1>
        <p>{t('playground.labPage.unknownId')} <code>{labId}</code></p>
        <Link to="/playground">{t('playground.labPage.backToPlayground')}</Link>
      </div>
    );
  }

  if (!LabComponent) {
    return (
      <div>
        <h1>{lab.title}</h1>
        <span className="tag">{lab.chapter}</span>
        <p style={{ marginTop: '1rem' }}>{t('playground.labPage.comingSoon')}</p>
        <Link to="/playground">{t('playground.labPage.backToPlayground')}</Link>
      </div>
    );
  }

  return (
    <div>
      <p><Link to="/playground">{t('playground.labPage.allLabs')}</Link> · <span className="tag">{lab.chapter}</span></p>
      <h1>{lab.title}</h1>
      <LabComponent />
    </div>
  );
}
