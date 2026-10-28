import React from 'react';
import { X, BookOpen, Calculator, Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import { MetricDefinition } from '../types';

interface MetricDetailModalProps {
  definition: MetricDefinition | null;
  onClose: () => void;
}

export const MetricDetailModal: React.FC<MetricDetailModalProps> = ({ definition, onClose }) => {
  if (!definition) return null;

  const stageTitle =
    definition.stage === 'awareness'
      ? '一、曝光與集客 (Awareness & Acquisition)'
      : definition.stage === 'engagement'
      ? '二、參與與互動 (Engagement)'
      : definition.stage === 'conversion'
      ? '三、轉換與成效 (Conversion & Performance)'
      : '四、顧客留存與價值 (Retention & Value)';

  return (
    <div
      id="metric-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            id="btn-close-modal"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            {stageTitle}
          </div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {definition.name}
            {definition.abbr && (
              <span className="text-sm font-normal text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                {definition.abbr}
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {definition.definition}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Formula Box */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold mb-2 text-sm">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>計算公式 (Calculation Formula)</span>
            </div>
            <div className="bg-white border border-blue-200/80 rounded-lg p-3 text-slate-800 font-mono text-sm shadow-inner">
              {definition.formula}
            </div>
          </div>

          {/* Business Impact & Benchmark */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold mb-2 text-sm">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>商業營運意義</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {definition.businessImpact}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold mb-2 text-sm">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>產業建議基準 (Benchmark)</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {definition.benchmark}
              </p>
            </div>
          </div>

          {/* Actionable Tips */}
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-3 text-sm">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>指標優化策略與行動建議</span>
            </div>
            <ul className="space-y-2.5">
              {definition.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            id="btn-modal-gotit"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            瞭解並關閉
          </button>
        </div>
      </div>
    </div>
  );
};
