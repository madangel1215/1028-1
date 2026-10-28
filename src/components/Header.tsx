import React from 'react';
import { StageKey } from '../types';
import { Download } from 'lucide-react';

interface HeaderProps {
  activeStage: StageKey;
  onSelectStage: (stage: StageKey) => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeStage,
  onSelectStage,
  onExport
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectStage('overview')}
          className="text-base font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 text-left cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            EG
          </span>
          <span>EnGuage 行銷監控儀表板</span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onSelectStage('overview')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeStage === 'overview' ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : ''
            }`}
          >
            全漏斗總覽
          </button>
          <button
            onClick={() => onSelectStage('seven_layers')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeStage === 'seven_layers' ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : ''
            }`}
          >
            七大層級指標
          </button>
          <button
            onClick={() => onSelectStage('roas_diagnostic')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeStage === 'roas_diagnostic' ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : ''
            }`}
          >
            ROAS拆解診斷
          </button>
          <button
            onClick={() => onSelectStage('keyword_master')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              ['keyword_master', 'seo_performance', 'paid_search', 'aio_tracking', 'search_synergy'].includes(activeStage)
                ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5'
                : ''
            }`}
          >
            關鍵字矩陣
          </button>
          <button
            onClick={() => onSelectStage('financial_roi')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeStage === 'financial_roi' ? 'text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5' : ''
            }`}
          >
            財務ROI與歸因
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-export-excel"
            onClick={onExport}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>匯出 .xlsx 試算表</span>
          </button>
        </div>
      </div>
    </header>
  );
};
