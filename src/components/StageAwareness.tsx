import React from 'react';
import { METRIC_DEFINITIONS, MOCK_TIME_SERIES, MOCK_CHANNEL_BREAKDOWN } from '../data/mockData';
import { MetricCard } from './MetricCard';
import { MetricDefinition } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Eye, Users, MousePointer, Search, DollarSign } from 'lucide-react';

interface StageAwarenessProps {
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const StageAwareness: React.FC<StageAwarenessProps> = ({ onOpenDetail }) => {
  const kpis = [
    { def: METRIC_DEFINITIONS.impressions, val: '1,285,000', change: 12.4, prev: '1,143,000' },
    { def: METRIC_DEFINITIONS.reach, val: '842,000', change: 10.8, prev: '760,000' },
    { def: METRIC_DEFINITIONS.traffic, val: '142,600', change: 14.2, prev: '124,800' },
    { def: METRIC_DEFINITIONS.cpc, val: 'NT$ 11.5', change: -4.2, prev: 'NT$ 12.0', isInverse: true }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Stage Header Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-3">
            一、 曝光與集客 (Awareness & Acquisition)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">品牌能見度與引流流量監測</h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
            本階段核心目標為「讓潛在客戶看到並進站」，主要檢視品牌在市場上的能見度、不重複觸及廣度、網站各來源流量品質與付費廣告引流的 CPC 成本控制。
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

      {/* Impression vs Reach & CPC Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Impression vs Reach */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>曝光數 (Impressions) 與 觸及人數 (Reach) 走向</span>
            </h3>
            <p className="text-xs text-slate-500">
              廣告總顯示次數 vs 不重複看過的人數（頻率 Frequency ＝ 曝光 ÷ 觸及 ≈ 1.52 次/人）
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TIME_SERIES}>
                <defs>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="impressions" name="曝光數 (Impressions)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" />
                <Area type="monotone" dataKey="reach" name="觸及人數 (Reach)" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Traffic Sources Share (Pie Chart) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" />
              <span>流量來源組合結構 (Traffic Sources Share)</span>
            </h3>
            <p className="text-xs text-slate-500">
              檢視是否過度依賴付費管道（付費廣告、自然搜尋、社群、直接、推薦）
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_CHANNEL_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="sessions"
                  nameKey="channelName"
                >
                  {MOCK_CHANNEL_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} Sessions`, '流量']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
            {MOCK_CHANNEL_BREAKDOWN.map((ch) => (
              <div key={ch.channel} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                <span className="truncate text-slate-600">{ch.channelName}: <strong className="text-slate-900">{ch.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
