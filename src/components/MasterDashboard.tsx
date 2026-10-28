import React from 'react';
import {
  METRIC_DEFINITIONS,
  MOCK_TIME_SERIES,
  MOCK_CHANNEL_BREAKDOWN
} from '../data/mockData';
import { MetricCard } from './MetricCard';
import { FunnelOverview } from './FunnelOverview';
import { MetricDefinition, StageKey } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck, Briefcase, ArrowRight } from 'lucide-react';

interface MasterDashboardProps {
  onOpenDetail: (definition: MetricDefinition) => void;
  onSelectStage: (stage: StageKey) => void;
}

export const MasterDashboard: React.FC<MasterDashboardProps> = ({
  onOpenDetail,
  onSelectStage
}) => {
  // Summary KPIs across the 4 stages
  const kpis = [
    {
      def: METRIC_DEFINITIONS.impressions,
      val: '1,285,000',
      change: 12.4,
      prev: '1,143,000',
      status: 'good' as const
    },
    {
      def: METRIC_DEFINITIONS.cpc,
      val: '$11.5',
      change: -4.2,
      prev: '$12.0',
      status: 'good' as const,
      isInverse: true
    },
    {
      def: METRIC_DEFINITIONS.ctr,
      val: '3.82%',
      change: 8.5,
      prev: '3.52%',
      status: 'good' as const
    },
    {
      def: METRIC_DEFINITIONS.engagement_rate,
      val: '66.0%',
      change: 5.1,
      prev: '62.8%',
      status: 'good' as const
    },
    {
      def: METRIC_DEFINITIONS.cvr,
      val: '3.40%',
      change: 6.2,
      prev: '3.20%',
      status: 'good' as const
    },
    {
      def: METRIC_DEFINITIONS.roas,
      val: '462%',
      change: 15.8,
      prev: '399%',
      status: 'good' as const
    },
    {
      def: METRIC_DEFINITIONS.cac,
      val: '$4,120',
      change: -6.5,
      prev: '$4,406',
      status: 'good' as const,
      isInverse: true
    },
    {
      def: METRIC_DEFINITIONS.ltv,
      val: '$18,500',
      change: 3.5,
      prev: '$17,870',
      status: 'good' as const
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* B2B Consulting Special Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-lg p-4 border border-slate-800 text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center shrink-0 mt-0.5">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/40 uppercase tracking-wide">
                B2B 企管顧問服務專題
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                涵蓋策略管理 • 數據分析 • 系統變革管理
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              獨家收錄 <strong>MQL to SQL 轉換率</strong>、<strong>深度互動指標</strong>、<strong>Cost Per SQL & Win Rate</strong>、<strong>銷售週期天數</strong>與 <strong>ToFu/MoFu/BoFu 三層次 Conversion Goals 模擬器</strong>。
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectStage('b2b_consulting')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>企管顧問專題</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelectStage('strategy_pivot')}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>策略調整與優化 (Pivot)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Marketing Funnel */}
      <FunnelOverview onSelectStage={onSelectStage} />

      {/* Key Metric Snapshot Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">四大階段關鍵指標快照 (Key Metrics Snapshot)</h2>
            <p className="text-xs text-slate-500">點擊任一指標卡片查看官方定義、計算公式與優化建議</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>行銷健康度: 優秀 (Health Index 92/100)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <MetricCard
              key={kpi.def.id}
              definition={kpi.def}
              value={kpi.val}
              change={kpi.change}
              previousValue={kpi.prev}
              status={kpi.status}
              isInverseMetric={kpi.isInverse}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </div>

      {/* Charts Section: Dual Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Traffic & Clicks Trend */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">一、曝光集客與二、點擊參與趨勢</h3>
              <p className="text-[11px] text-slate-500">每日工作階段 (Sessions) 與 點擊數 (Clicks) 走向</p>
            </div>
            <button
              onClick={() => onSelectStage('awareness')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              一階段深鑽 ➔
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TIME_SERIES}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', color: '#fff', fontSize: '11px', border: 'none' }}
                />
                <Area type="monotone" dataKey="sessions" name="工作階段 (Sessions)" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                <Area type="monotone" dataKey="clicks" name="點擊數 (Clicks)" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue & ROAS Performance */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">三、轉換成效：廣告營收與 ROAS 趨勢</h3>
              <p className="text-[11px] text-slate-500">每日廣告帶來的營收 (NT$) 與 ROAS (%)</p>
            </div>
            <button
              onClick={() => onSelectStage('conversion')}
              className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1"
            >
              三階段深鑽 ➔
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="left" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', color: '#fff', fontSize: '11px', border: 'none' }}
                />
                <Bar yAxisId="left" dataKey="adRevenue" name="廣告營收 (NT$)" fill="#2563eb" radius={[2, 2, 0, 0]} />
                <Bar yAxisId="right" dataKey="roas" name="ROAS (%)" fill="#d97706" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Source Breakdown Table */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">流量管道全成效比對表 (Traffic Sources Breakdown)</h3>
            <p className="text-[11px] text-slate-500">剖析各來源之 CPC、CTR、CVR、轉換數與 ROAS</p>
          </div>
          <span className="text-[10px] font-semibold tracking-wide text-slate-600 uppercase bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            UTM 歸因模型：Last Non-Direct Click
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-y border-slate-200 uppercase tracking-wide text-[10px]">
                <th className="p-3">流量管道 (Source / Medium)</th>
                <th className="p-3">工作階段</th>
                <th className="p-3">流量佔比</th>
                <th className="p-3">CPC (點擊成本)</th>
                <th className="p-3">CTR (點擊率)</th>
                <th className="p-3">CVR (轉換率)</th>
                <th className="p-3">成功轉換數</th>
                <th className="p-3">ROAS (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {MOCK_CHANNEL_BREAKDOWN.map((ch) => (
                <tr key={ch.channel} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                    <span>{ch.channelName}</span>
                  </td>
                  <td className="p-3">{ch.sessions.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${ch.percentage}%`, backgroundColor: ch.color }}
                        />
                      </div>
                      <span className="text-[11px]">{ch.percentage}%</span>
                    </div>
                  </td>
                  <td className="p-3">{ch.cpc > 0 ? `NT$ ${ch.cpc}` : '免費'}</td>
                  <td className="p-3">{ch.ctr}%</td>
                  <td className="p-3 text-blue-600 font-bold">{ch.cvr}%</td>
                  <td className="p-3 font-bold text-slate-900">{ch.conversions.toLocaleString()}</td>
                  <td className="p-3">
                    {ch.roas > 0 ? (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        ch.roas >= 400 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {ch.roas}%
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
