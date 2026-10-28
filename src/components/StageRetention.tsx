import React from 'react';
import { METRIC_DEFINITIONS, MOCK_NPS_DATA, MOCK_COHORT_RETENTION } from '../data/mockData';
import { MetricCard } from './MetricCard';
import { MetricDefinition } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { HeartHandshake, ShieldCheck, Smile, Frown, Meh, Award, Gauge } from 'lucide-react';

interface StageRetentionProps {
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const StageRetention: React.FC<StageRetentionProps> = ({ onOpenDetail }) => {
  const kpis = [
    { def: METRIC_DEFINITIONS.ltv, val: 'NT$ 18,500', change: 3.5, prev: 'NT$ 17,870' },
    { def: METRIC_DEFINITIONS.retention_churn, val: '68.5% / 3.1%', change: 2.1, prev: '66.4%' },
    { def: METRIC_DEFINITIONS.nps, val: '+52 分', change: 4.0, prev: '+48 分' }
  ];

  // LTV:CAC Ratio calculation
  const currentLtv = 18500;
  const currentCac = 4120;
  const ratio = (currentLtv / currentCac).toFixed(1);
  const isHealthyRatio = Number(ratio) >= 3.0;

  // NPS Pie Chart Data
  const npsChartData = [
    { name: '推薦者 (9-10分)', value: MOCK_NPS_DATA.promoters, color: '#10b981' },
    { name: '被動者 (7-8分)', value: MOCK_NPS_DATA.passives, color: '#f59e0b' },
    { name: '批評者 (0-6分)', value: MOCK_NPS_DATA.detractors, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Stage Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-semibold mb-3">
            四、 顧客留存與價值 (Retention & Value)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">顧客長期健康度與 CRM 終身價值監測</h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-2 leading-relaxed">
            評估既有客戶回購率、長期續約健康度與品牌忠誠度。包含顧客終身價值 LTV、LTV:CAC 黃金健康比率 (≥ 3:1)、佇列留存率/流失率及淨推薦值 NPS。
          </p>
        </div>
      </div>

      {/* LTV:CAC Golden Ratio Special Highlight Card */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-white rounded-2xl p-6 border border-purple-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
            <Gauge className="w-4 h-4" />
            <span>LTV : CAC 商業模式健康度指標</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            目前 LTV : CAC 比率為 <span className="text-purple-700 font-black">{ratio} : 1</span>
          </h3>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            業界建議黃金標準：<strong className="text-slate-900">LTV : CAC ≥ 3 : 1</strong> 代表商業模式極具持續擴展性，單位經濟效益 (Unit Economics) 非常健康！目前 4.2:1 遠優於業界基準。
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-purple-200/80 shadow-2xs shrink-0">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">健康度評等</div>
            <div className="text-base font-bold text-emerald-700">極佳 (Highly Scalable)</div>
            <div className="text-[11px] text-slate-400">LTV $18,500 / CAC $4,120</div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <MetricCard
            key={kpi.def.id}
            definition={kpi.def}
            value={kpi.val}
            change={kpi.change}
            previousValue={kpi.prev}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

      {/* Cohort Retention & NPS Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Cohort Retention Curve */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-purple-600" />
              <span>佇列顧客留存率 (Cohort Retention Curve)</span>
            </h3>
            <p className="text-xs text-slate-500">
              新客戶在第 1 個月至第 12 個月的持續回購與留存曲線 (%)
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_COHORT_RETENTION}>
                <defs>
                  <linearGradient id="colorRet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="period" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="retention" name="留存率 (%)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Net Promoter Score (NPS) Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>淨推薦值 NPS 結構 (Promoters vs. Detractors)</span>
            </h3>
            <p className="text-xs text-slate-500">
              淨推薦值 NPS = % 推薦者 (9-10分) - % 批評者 (0-6分) = <strong className="text-slate-900">+{MOCK_NPS_DATA.score} 分</strong>
            </p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={npsChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {npsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold mb-0.5">
                <Smile className="w-3.5 h-3.5" />
                <span>推薦者 (9-10分)</span>
              </div>
              <div className="text-base font-black text-emerald-800">{MOCK_NPS_DATA.promoters}%</div>
            </div>

            <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
              <div className="flex items-center justify-center gap-1 text-amber-700 font-bold mb-0.5">
                <Meh className="w-3.5 h-3.5" />
                <span>被動者 (7-8分)</span>
              </div>
              <div className="text-base font-black text-amber-800">{MOCK_NPS_DATA.passives}%</div>
            </div>

            <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
              <div className="flex items-center justify-center gap-1 text-rose-700 font-bold mb-0.5">
                <Frown className="w-3.5 h-3.5" />
                <span>批評者 (0-6分)</span>
              </div>
              <div className="text-base font-black text-rose-800">{MOCK_NPS_DATA.detractors}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
