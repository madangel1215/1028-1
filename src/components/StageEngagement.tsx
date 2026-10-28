import React from 'react';
import { METRIC_DEFINITIONS, MOCK_TIME_SERIES } from '../data/mockData';
import { MetricCard } from './MetricCard';
import { MetricDefinition } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { MousePointerClick, Clock, Activity, Zap } from 'lucide-react';

interface StageEngagementProps {
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const StageEngagement: React.FC<StageEngagementProps> = ({ onOpenDetail }) => {
  const kpis = [
    { def: METRIC_DEFINITIONS.ctr, val: '3.82%', change: 8.5, prev: '3.52%' },
    { def: METRIC_DEFINITIONS.engagement_rate, val: '66.0%', change: 5.1, prev: '62.8%' },
    { def: METRIC_DEFINITIONS.bounce_rate, val: '34.0%', change: -5.1, prev: '37.2%', isInverse: true },
    { def: METRIC_DEFINITIONS.avg_time_on_page, val: '2分45秒', change: 12.0, prev: '2分27秒' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Stage Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-cyan-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold mb-3">
            二、 參與與互動 (Engagement)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">文案素材吸引力與站內內容興趣監測</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            檢視潛在客戶進站後是否產生興趣並留下足跡。包含點擊率 CTR（衡量素材吸引力）、跳出率與 GA4 實質參與度（衡量 Landing Page 內容契合度）及平均停留時間。
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: GA4 Engagement Rate vs Bounce Rate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>GA4 參與度 (Engagement Rate) vs 傳統跳出率 (Bounce Rate)</span>
            </h3>
            <p className="text-xs text-slate-500">
              GA4 更重視實質互動工作階段比例（停留超10秒或觸發事件）
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="engagementRate" name="GA4 參與度 (%)" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="bounceRate" name="跳出率 (%)" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CTR vs Average Time on Page */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MousePointerClick className="w-5 h-5 text-cyan-600" />
              <span>廣告點擊率 CTR (%) 與 站內平均停留時間 (秒)</span>
            </h3>
            <p className="text-xs text-slate-500">
              廣告吸引點擊進站後，訪客是否深度閱讀網頁內容
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="left" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <YAxis yAxisId="right" orientation="right" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit="秒" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar yAxisId="left" dataKey="ctr" name="點擊率 CTR (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="avgTimeOnPage" name="平均停留時間 (秒)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
