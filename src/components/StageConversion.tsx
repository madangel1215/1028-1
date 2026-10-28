import React from 'react';
import { METRIC_DEFINITIONS, MOCK_TIME_SERIES } from '../data/mockData';
import { MetricCard } from './MetricCard';
import { MetricDefinition } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, DollarSign, Scale, Percent, AlertCircle } from 'lucide-react';

interface StageConversionProps {
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const StageConversion: React.FC<StageConversionProps> = ({ onOpenDetail }) => {
  const kpis = [
    { def: METRIC_DEFINITIONS.cvr, val: '3.40%', change: 6.2, prev: '3.20%' },
    { def: METRIC_DEFINITIONS.cac, val: 'NT$ 4,120', change: -6.5, prev: 'NT$ 4,406', isInverse: true },
    { def: METRIC_DEFINITIONS.cpa, val: 'NT$ 335', change: -4.8, prev: 'NT$ 352', isInverse: true },
    { def: METRIC_DEFINITIONS.roas, val: '462%', change: 15.8, prev: '399%' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Stage Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold mb-3">
            三、 轉換與成效 (Conversion & Performance)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">商業營運核心：獲客成本與投資報酬率</h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-2 leading-relaxed">
            檢視行銷活動能否帶來實質業務結果（留單、下載、結帳）。涵蓋轉換率 CVR、獲客成本 CAC、每次行動成本 CPA、廣告報酬率 ROAS 及真實淨利潤率 ROI。
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <MetricCard
            key={kpi.def.id}
            definition={kpi.def}
            value={kpi.val}
            change={kpi.change}
            previousValue={kpi.prev}
            isInverseMetric={kpi.isInverse}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

      {/* ROAS vs ROI Special Concept Comparison Card */}
      <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-white rounded-2xl p-6 border border-amber-200/80 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">核心營運差異：ROAS vs. ROI 的商業本質比較</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-800 text-sm">ROAS (廣告投資報酬率)</span>
              <span className="text-xs font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">462%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              公式：<code className="bg-slate-100 px-1 rounded text-slate-800">(廣告總營收 ÷ 廣告總花費) × 100%</code>
            </p>
            <div className="text-xs text-slate-500 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
              💡 商業意義：衡量<strong>前端媒體投放效率</strong>。只計入廣告費，未考慮商品成本 (COGS)、物流及營運人力。
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200/60 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-800 text-sm">ROI (整體淨利投資報酬率)</span>
              <span className="text-xs font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">185%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              公式：<code className="bg-slate-100 px-1 rounded text-slate-800">[(總營收 - 包含產品與營運總成本) ÷ 總成本] × 100%</code>
            </p>
            <div className="text-xs text-slate-500 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
              💡 商業意義：反映<strong>企業真實淨利潤</strong>。扣除廣告費、產品製造成本與物流銷售花費後的真正回報。
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: CAC & CPA Cost Trend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <span>客戶獲取成本 (CAC) 與 每次行動成本 (CPA) 趨勢</span>
            </h3>
            <p className="text-xs text-slate-500">
              獲取全套新客戶成本 (CAC) vs 前段留單/下載單次行動成本 (CPA)
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="left" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="cac" name="獲客成本 CAC (NT$)" stroke="#f59e0b" strokeWidth={3} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="cpa" name="行動成本 CPA (NT$)" stroke="#ec4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Daily Conversions & CVR */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>每日成功轉換數與轉換率 CVR (%)</span>
            </h3>
            <p className="text-xs text-slate-500">
              完成付款/留單的總筆數與轉換率 CVR 變化
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="left" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar yAxisId="left" dataKey="conversions" name="轉換筆數" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="cvr" name="轉換率 CVR (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
