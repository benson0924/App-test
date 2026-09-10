import type { TranslationTree, TranslationValue } from './types';

export function createTranslator(dictionary: TranslationTree) {
  return function t(key: string, params?: Record<string, string | number>): string {
    const parts = key.split('.');
    let node: TranslationValue | undefined = dictionary;
    for (const part of parts) {
      if (typeof node === 'string' || node === undefined || Array.isArray(node)) break;
      node = node[part];
    }
    if (typeof node !== 'string') return key;
    if (!params) return node;
    return node.replace(/\{\{(\w+)\}\}/g, (_, name: string) => String(params[name] ?? ''));
  };
}

export function mergeTrees(...trees: TranslationTree[]): TranslationTree {
  const out: TranslationTree = {};
  for (const tree of trees) {
    for (const [key, value] of Object.entries(tree)) {
      if (value && typeof value === 'object' && !Array.isArray(value) && typeof out[key] === 'object') {
        out[key] = mergeTrees(out[key] as TranslationTree, value as TranslationTree);
      } else {
        out[key] = value;
      }
    }
  }
  return out;
}
