import React from 'react';
import { Eye, MousePointerClick, Zap, TrendingUp, HeartHandshake, ArrowRight } from 'lucide-react';
import { MOCK_FUNNEL_SUMMARY } from '../data/mockData';
import { StageKey } from '../types';

interface FunnelOverviewProps {
  onSelectStage: (stage: StageKey) => void;
}

export const FunnelOverview: React.FC<FunnelOverviewProps> = ({ onSelectStage }) => {
  const icons = [
    <Eye className="w-4 h-4 text-blue-600" />,
    <MousePointerClick className="w-4 h-4 text-cyan-600" />,
    <Zap className="w-4 h-4 text-emerald-600" />,
    <TrendingUp className="w-4 h-4 text-amber-600" />,
    <HeartHandshake className="w-4 h-4 text-purple-600" />
  ];

  const stageKeys: StageKey[] = ['awareness', 'awareness', 'engagement', 'conversion', 'retention'];

  return (
    <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            全流程漏斗監測 (Marketing Funnel)
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            行銷四階段全景流轉漏斗
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            從「曝光集客」到「顧客終身價值」，即時掌握潛在客戶流失點與轉換效率
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectStage('calculator')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>開啟指標模擬試算機</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Funnel Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {MOCK_FUNNEL_SUMMARY.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectStage(stageKeys[index])}
            className="group cursor-pointer bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-lg p-3.5 transition-all flex flex-col justify-between relative overflow-hidden shadow-2xs"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: item.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-2 pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {item.stage}
                </span>
                <div className="p-1 bg-white rounded border border-slate-200 shadow-2xs">
                  {icons[index]}
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-900 mb-0.5">{item.label}</h3>

              <div className="text-lg font-bold text-slate-900 tracking-tight my-1">
                {item.value.toLocaleString()}
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                {item.subText}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">階段轉換率</span>
              <span className="font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">
                {item.rate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
