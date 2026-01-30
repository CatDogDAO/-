
import { RadicalMap } from './types';

export const CANGJIE_KEYMAP: RadicalMap = {
  'A': { radical: '日', category: '五行' },
  'B': { radical: '月', category: '五行' },
  'C': { radical: '金', category: '五行' },
  'D': { radical: '木', category: '五行' },
  'E': { radical: '水', category: '五行' },
  'F': { radical: '火', category: '五行' },
  'G': { radical: '土', category: '五行' },
  'H': { radical: '竹', category: '筆劃' },
  'I': { radical: '戈', category: '筆劃' },
  'J': { radical: '十', category: '筆劃' },
  'K': { radical: '大', category: '筆劃' },
  'L': { radical: '中', category: '筆劃' },
  'M': { radical: '一', category: '筆劃' },
  'N': { radical: '弓', category: '筆劃' },
  'O': { radical: '人', category: '人體' },
  'P': { radical: '心', category: '人體' },
  'Q': { radical: '手', category: '人體' },
  'R': { radical: '口', category: '人體' },
  'S': { radical: '尸', category: '字型' },
  'T': { radical: '廿', category: '字型' },
  'U': { radical: '山', category: '字型' },
  'V': { radical: '女', category: '字型' },
  'W': { radical: '田', category: '字型' },
  'X': { radical: '難', category: '特殊' },
  'Y': { radical: '卜', category: '特殊' },
  'Z': { radical: '重', category: '特殊' }
};

export const COMMON_CHARACTERS: Record<string, string> = {
  '我': 'HQI',
  '你': 'ONF',
  '他': 'OPD',
  '的': 'HAILM',
  '是': 'AMYO',
  '不': 'MF',
  '在': 'KLG',
  '有': 'KB',
  '一': 'M',
  '這': 'YPRX',
  '中': 'L',
  '國': 'WMGR',
  '人': 'O',
  '學': 'HBNID',
  '倉': 'OIR',
  '頡': 'GRHMC'
};

// 根據使用者提供的圖片順序與編碼進行更新
export const SYMBOL_CODES_LIST = [
  { char: '、', code: 'ZXAC' },
  { char: '：', code: 'ZXAH' },
  { char: '—', code: 'ZXAY' },
  { char: '「', code: 'ZXCD' },
  { char: '」', code: 'ZXCE' },
  { char: '！', code: 'ZXAJ' },
  { char: '《', code: 'ZXBU' },
  { char: '》', code: 'ZXBV' },
  { char: '（', code: 'ZXBE' },
  { char: '）', code: 'ZXBH' }
];

export const SYMBOL_CODES: Record<string, { code: string, label: string }> = {
  '、': { code: 'ZXAC', label: '頓號' },
  '：': { code: 'ZXAH', label: '冒號' },
  '—': { code: 'ZXAY', label: '破折號' },
  '「': { code: 'ZXCD', label: '左引號' },
  '」': { code: 'ZXCE', label: '右引號' },
  '！': { code: 'ZXAJ', label: '驚嘆號' },
  '《': { code: 'ZXBU', label: '左書名號' },
  '》': { code: 'ZXBV', label: '右書名號' },
  '（': { code: 'ZXBE', label: '左括號' },
  '）': { code: 'ZXBH', label: '右括號' }
};
