
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Search, Zap, X, Keyboard, Maximize2 } from 'lucide-react';
import { explainCangjie } from './services/geminiService';
import { CangjieData } from './types';
import { COMMON_CHARACTERS, CANGJIE_KEYMAP, SYMBOL_CODES, SYMBOL_CODES_LIST } from './constants';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<CangjieData | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自動對焦與快捷鍵監聽
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // 按 Esc 鍵
      if (e.key === 'Escape') {
        if (searchTerm) {
          setSearchTerm('');
          setSearchResult(null);
        } else {
          setIsOpen(false);
        }
      }
      // 按 / 鍵聚焦搜尋
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchTerm]);

  const handleSearch = useCallback(async (char: string) => {
    if (!char || char.trim().length === 0) {
      setSearchResult(null);
      return;
    }
    const targetChar = char.trim().charAt(0);
    
    setLoading(true);
    
    if (SYMBOL_CODES[targetChar]) {
      const sym = SYMBOL_CODES[targetChar];
      setSearchResult({
        char: targetChar,
        code: sym.code,
        radicals: sym.code.split('').map(k => CANGJIE_KEYMAP[k]?.radical || k)
      });
      setLoading(false);
      setSearchTerm('');
      return;
    }

    if (COMMON_CHARACTERS[targetChar]) {
      const localCode = COMMON_CHARACTERS[targetChar];
      setSearchResult({
        char: targetChar,
        code: localCode,
        radicals: localCode.split('').map(k => CANGJIE_KEYMAP[k]?.radical || k)
      });
      setLoading(false);
      setSearchTerm('');
      return;
    }

    try {
      const data = await explainCangjie(targetChar);
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearchTerm('');
    }
  }, []);

  // 如果是關閉狀態，顯示懸浮球
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all animate-bounce"
        title="開啟倉頡助手 (快捷鍵: /)"
      >
        <Zap className="w-8 h-8 fill-white" />
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 懸浮視窗主體 */}
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* 頂部 Header */}
        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-600 rounded-lg shadow-sm">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <h1 className="font-black text-slate-800 text-base tracking-tight">倉頡碼清單</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {/* 快捷鍵提示按鈕 */}
            <div className="group relative">
              <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                <Keyboard className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-10 w-32 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                <p>Esc: 清除 / 縮小</p>
                <p>/: 開啟助手</p>
              </div>
            </div>
            
            {/* 關閉按鈕 */}
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 搜尋輸入框 */}
        <div className="p-4 pb-1">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-lg py-2.5 pl-10 pr-4 text-lg font-bold outline-none transition-all placeholder:text-slate-200 shadow-sm"
              placeholder="快速查詢..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length === 1) handleSearch(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* 符號對照清單 */}
        <div className="px-6 py-4 flex-1 overflow-y-auto max-h-[50vh]">
          <div className="flex flex-col items-center space-y-1">
            
            {/* 查詢結果顯示 */}
            {searchResult && (
              <div className="flex items-center gap-4 animate-in slide-in-from-top-1 duration-200 border-b border-slate-100 pb-4 mb-2 w-full justify-center">
                <span className="text-3xl font-serif font-black text-red-600 leading-none">{searchResult.char}</span>
                <span className="text-xl font-black text-slate-200 leading-none">:</span>
                <span className="text-3xl font-mono font-black text-blue-950 leading-none tracking-tighter">{searchResult.code}</span>
              </div>
            )}

            {/* 靜態符號對照清單 */}
            {SYMBOL_CODES_LIST.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 w-full justify-center py-1 group hover:bg-slate-50 rounded transition-colors">
                <div className="text-2xl md:text-3xl font-serif font-black text-red-600 leading-none min-w-[1ch] text-center">
                  {item.char}
                </div>
                <div className="text-lg font-black text-slate-100 leading-none">
                  :
                </div>
                <div className="text-2xl md:text-3xl font-mono font-black text-blue-950 leading-none tracking-tight min-w-[4ch]">
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部裝飾 */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-red-600" />
          <div className="flex-[4] bg-blue-950" />
        </div>
      </div>
    </div>
  );
};

export default App;
