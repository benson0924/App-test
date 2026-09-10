import type { Locale, TranslationTree } from '../types';
import { mergeTrees } from '../translator';
import { common as enCommon } from './en/common';
import { navigation as enNavigation } from './en/navigation';
import { home as enHome } from './en/home';
import { curriculum as enCurriculum } from './en/curriculum';
import { labs as enLabs } from './en/labs';
import { reference as enReference } from './en/reference';
import { practice as enPractice } from './en/practice';
import { playground as enPlayground } from './en/playground';
import { classical as enClassical } from './en/learn/classical';
import { oneQubit as enOneQubit } from './en/learn/oneQubit';
import { linearAlgebra as enLinearAlgebra } from './en/learn/linearAlgebra';
import { multipleQubits as enMultipleQubits } from './en/learn/multipleQubits';
import { quantumCircuits as enQuantumCircuits } from './en/learn/quantumCircuits';
import { errorCorrection as enErrorCorrection } from './en/learn/errorCorrection';
import { entanglement as enEntanglement } from './en/learn/entanglement';
import { protocols as enProtocols } from './en/learn/protocols';
import { algorithms as enAlgorithms } from './en/learn/algorithms';
import { qft as enQft } from './en/learn/qft';
import { phaseEstimation as enPhaseEstimation } from './en/learn/phaseEstimation';
import { shor as enShor } from './en/learn/shor';
import { modern as enModern } from './en/learn/modern';
import { index as enLearnIndex } from './en/learn/index';
import { common as zhCommon } from './zh-TW/common';
import { navigation as zhNavigation } from './zh-TW/navigation';
import { home as zhHome } from './zh-TW/home';
import { curriculum as zhCurriculum } from './zh-TW/curriculum';
import { labs as zhLabs } from './zh-TW/labs';
import { reference as zhReference } from './zh-TW/reference';
import { practice as zhPractice } from './zh-TW/practice';
import { playground as zhPlayground } from './zh-TW/playground';
import { classical as zhClassical } from './zh-TW/learn/classical';
import { oneQubit as zhOneQubit } from './zh-TW/learn/oneQubit';
import { linearAlgebra as zhLinearAlgebra } from './zh-TW/learn/linearAlgebra';
import { multipleQubits as zhMultipleQubits } from './zh-TW/learn/multipleQubits';
import { quantumCircuits as zhQuantumCircuits } from './zh-TW/learn/quantumCircuits';
import { errorCorrection as zhErrorCorrection } from './zh-TW/learn/errorCorrection';
import { entanglement as zhEntanglement } from './zh-TW/learn/entanglement';
import { protocols as zhProtocols } from './zh-TW/learn/protocols';
import { algorithms as zhAlgorithms } from './zh-TW/learn/algorithms';
import { qft as zhQft } from './zh-TW/learn/qft';
import { phaseEstimation as zhPhaseEstimation } from './zh-TW/learn/phaseEstimation';
import { shor as zhShor } from './zh-TW/learn/shor';
import { modern as zhModern } from './zh-TW/learn/modern';
import { index as zhLearnIndex } from './zh-TW/learn/index';
import { common as jaCommon } from './ja/common';
import { navigation as jaNavigation } from './ja/navigation';
import { home as jaHome } from './ja/home';
import { curriculum as jaCurriculum } from './ja/curriculum';
import { labs as jaLabs } from './ja/labs';
import { reference as jaReference } from './ja/reference';
import { practice as jaPractice } from './ja/practice';
import { playground as jaPlayground } from './ja/playground';
import { classical as jaClassical } from './ja/learn/classical';
import { oneQubit as jaOneQubit } from './ja/learn/oneQubit';
import { linearAlgebra as jaLinearAlgebra } from './ja/learn/linearAlgebra';
import { multipleQubits as jaMultipleQubits } from './ja/learn/multipleQubits';
import { quantumCircuits as jaQuantumCircuits } from './ja/learn/quantumCircuits';
import { errorCorrection as jaErrorCorrection } from './ja/learn/errorCorrection';
import { entanglement as jaEntanglement } from './ja/learn/entanglement';
import { protocols as jaProtocols } from './ja/learn/protocols';
import { algorithms as jaAlgorithms } from './ja/learn/algorithms';
import { qft as jaQft } from './ja/learn/qft';
import { phaseEstimation as jaPhaseEstimation } from './ja/learn/phaseEstimation';
import { shor as jaShor } from './ja/learn/shor';
import { modern as jaModern } from './ja/learn/modern';
import { index as jaLearnIndex } from './ja/learn/index';

const enLearn = {
  classical: enClassical,
  oneQubit: enOneQubit,
  linearAlgebra: enLinearAlgebra,
  multipleQubits: enMultipleQubits,
  quantumCircuits: enQuantumCircuits,
  errorCorrection: enErrorCorrection,
  entanglement: enEntanglement,
  protocols: enProtocols,
  algorithms: enAlgorithms,
  qft: enQft,
  phaseEstimation: enPhaseEstimation,
  shor: enShor,
  modern: enModern,
  index: enLearnIndex,
};

const zhLearn = {
  classical: zhClassical,
  oneQubit: zhOneQubit,
  linearAlgebra: zhLinearAlgebra,
  multipleQubits: zhMultipleQubits,
  quantumCircuits: zhQuantumCircuits,
  errorCorrection: zhErrorCorrection,
  entanglement: zhEntanglement,
  protocols: zhProtocols,
  algorithms: zhAlgorithms,
  qft: zhQft,
  phaseEstimation: zhPhaseEstimation,
  shor: zhShor,
  modern: zhModern,
  index: zhLearnIndex,
};

const jaLearn = {
  classical: jaClassical,
  oneQubit: jaOneQubit,
  linearAlgebra: jaLinearAlgebra,
  multipleQubits: jaMultipleQubits,
  quantumCircuits: jaQuantumCircuits,
  errorCorrection: jaErrorCorrection,
  entanglement: jaEntanglement,
  protocols: jaProtocols,
  algorithms: jaAlgorithms,
  qft: jaQft,
  phaseEstimation: jaPhaseEstimation,
  shor: jaShor,
  modern: jaModern,
  index: jaLearnIndex,
};

const bundles: Record<Locale, TranslationTree> = {
  en: mergeTrees(
    { common: enCommon },
    { navigation: enNavigation },
    { home: enHome },
    { curriculum: enCurriculum },
    { labs: enLabs },
    { reference: enReference },
    { practice: enPractice },
    { playground: enPlayground },
    { learn: enLearn }
  ),
  'zh-TW': mergeTrees(
    { common: zhCommon },
    { navigation: zhNavigation },
    { home: zhHome },
    { curriculum: zhCurriculum },
    { labs: zhLabs },
    { reference: zhReference },
    { practice: zhPractice },
    { playground: zhPlayground },
    { learn: zhLearn }
  ),
  ja: mergeTrees(
    { common: jaCommon },
    { navigation: jaNavigation },
    { home: jaHome },
    { curriculum: jaCurriculum },
    { labs: jaLabs },
    { reference: jaReference },
    { practice: jaPractice },
    { playground: jaPlayground },
    { learn: jaLearn }
  ),
};

export function getLocaleBundle(locale: Locale): TranslationTree {
  return bundles[locale] ?? bundles.en;
}
