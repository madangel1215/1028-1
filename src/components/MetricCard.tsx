import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info, Target, Sparkles } from 'lucide-react';
import { MetricDefinition } from '../types';

interface MetricCardProps {
  definition: MetricDefinition;
  value: string | number;
  unit?: string;
  change: number; // percentage change e.g. +12.5 or -3.2
  previousValue?: string | number;
  target?: string;
  status?: 'good' | 'warning' | 'alert';
  isInverseMetric?: boolean; // For metrics like Bounce Rate or CAC where LOWER is better
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  definition,
  value,
  unit,
  change,
  previousValue,
  target,
  status = 'good',
  isInverseMetric = false,
  onOpenDetail
}) => {
  // Determine if positive change is good or bad
  const isPositive = change >= 0;
  const isGood = isInverseMetric ? !isPositive : isPositive;

  const statusBg =
    status === 'good'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : status === 'warning'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  const stageBadgeColor =
    definition.stage === 'awareness'
      ? 'bg-blue-100 text-blue-800'
      : definition.stage === 'engagement'
      ? 'bg-emerald-100 text-emerald-800'
      : definition.stage === 'conversion'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-purple-100 text-purple-800';

  const stageName =
    definition.stage === 'awareness'
      ? '一、曝光與集客'
      : definition.stage === 'engagement'
      ? '二、參與與互動'
      : definition.stage === 'conversion'
      ? '三、轉換與成效'
      : '四、顧客留存價值';

  return (
    <div
      id={`metric-card-${definition.id}`}
      className="group relative bg-white rounded-lg p-4 border border-slate-200 shadow-2xs hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Stage & Info Button */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${stageBadgeColor}`}>
            {stageName}
          </span>
          <button
            id={`btn-info-${definition.id}`}
            onClick={() => onOpenDetail(definition)}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors flex items-center gap-1 text-[11px]"
            title="查看指標公式與營運說明"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium">公式說明</span>
          </button>
        </div>

        {/* Title & Abbr */}
        <div className="mb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            {definition.name}
            {definition.abbr && (
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                {definition.abbr}
              </span>
            )}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5" title={definition.definition}>
            {definition.definition}
          </p>
        </div>

        {/* Value & Change Badge */}
        <div className="flex items-baseline justify-between gap-2 my-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
          </div>

          <div
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold border ${
              isGood
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
      </div>

      {/* Footer Benchmark / Target / Previous */}
      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        {target ? (
          <div className="flex items-center gap-1 text-slate-600" title="產業基準或目標設定">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            <span>目標: <strong className="text-slate-800 font-semibold">{target}</strong></span>
          </div>
        ) : previousValue ? (
          <span className="text-slate-500">前期: {previousValue}</span>
        ) : (
          <span className="text-slate-500 truncate max-w-[160px]">{definition.benchmark}</span>
        )}

        <button
          onClick={() => onOpenDetail(definition)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1 group-hover:underline"
        >
          <span>分析診斷</span>
          <Sparkles className="w-3 h-3 text-blue-500" />
        </button>
      </div>
    </div>
  );
};
