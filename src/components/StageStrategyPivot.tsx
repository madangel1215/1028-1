import React, { useState } from 'react';
import {
  Compass,
  Target,
  PieChart,
  Flame,
  Snowflake,
  Mic,
  Copy,
  Check,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BarChart2,
  Sliders,
  HelpCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { MetricDefinition } from '../types';

interface StageStrategyPivotProps {
  onOpenDetail?: (definition: MetricDefinition) => void;
}

export const StageStrategyPivot: React.FC<StageStrategyPivotProps> = ({ onOpenDetail }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [mqlCount, setMqlCount] = useState<number>(200);
  const [pivotMqlToSqlRate, setPivotMqlToSqlRate] = useState<number>(22); // 22%
  const [oldMqlToSqlRate] = useState<number>(17); // 17% (old baseline)

  // Alignment Script text
  const fullAlignmentScript = `【開場：點出痛點與策略調整的背景】
「各位好。今天會議的主要目的，是針對我們目前的數位行銷與商機獲取策略，進行深度的檢視與方向調整。從過去幾季的 CRM 數據中，我們觀察到一個現象：網站的整體流量與廣泛名單（MQL）維持穩定，但這些名單真正轉化為高階商機（SQL）的比例卻遭遇了瓶頸。這意味著我們花費了資源，卻吸引了較多來『找資料』的基層執行者，而非真正握有預算、面臨組織痛點的決策高層。對於我們這類高客單價、決策週期長的企管顧問服務來說，這會拉長銷售週期，並消耗顧問前端探詢的量能。」

【核心：提出調整方向與具體作法】
「因此，我決定在下半年度進行行銷策略的轉軸（Pivot）。我們的核心策略將從『擴大漏斗頂端的廣泛曝光』，轉移到『深化漏斗中底段的專家信任與精準打擊』。具體來說，我們將採取三個關鍵行動：

第一，內容資產的升級與收斂。我們將減少泛泛而談的管理文章，轉而發布針對性強的深度內容。例如，聚焦在企業導入大型系統（如 Dynamics 365 級別的 ERP）時所面臨的組織抗性，並結合 Prosci ADKAR 等變革管理框架，提供具體的解方與檢核表。這類內容能直接篩選出正處於系統轉型陣痛期的企業客戶。

第二，獲客管道的精準化。我們將把原本投入在廣泛關鍵字的預算，重新分配到 LinkedIn 等專業社群，或是舉辦針對高階經理人的閉門線上研討會（Webinar）。我們要接觸的是那些正在尋求策略落地的總監與 CXO 們。

第三，導入自動化與更嚴格的名單評分機制（Lead Scoring）。我們將優化行銷端與 CRM 系統的資料對接，利用系統自動追蹤客戶的互動深度（例如：是否下載了白皮書且閱讀超過一定時間）。只有達到特定分數的名單，才會進入業務與顧問的接洽排程，以極大化我們的時間投資報酬率。」

【結語：預期效益與下一步】
「透過剛才展示的『策略調整儀表板』，我們可以在接下來的幾個月內，嚴密監控這些調整帶來的變化。我們的短期目標，是在兩個月內將 MQL 到 SQL 的轉換率提升 10%，並有效降低每筆合格商機的獲取成本。行銷不僅僅是曝光，更是我們專業服務的延伸。確保我們每一次的發聲，都能精準對接企業客戶的最深層痛點，是我們邁向下一階段成長的關鍵。以上是本季的策略調整方針，看看大家對於具體的內容產出方向有沒有初步的想法？」`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullAlignmentScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Recharts Channel Comparison Data
  const channelData = [
    {
      name: '深度主題研討會 (ERP變革)',
      oldBudget: 15,
      newBudget: 40,
      sqlCount: 12,
      winRate: 30
    },
    {
      name: '高階白皮書 (ADKAR應用)',
      oldBudget: 15,
      newBudget: 35,
      sqlCount: 8,
      winRate: 25
    },
    {
      name: '廣泛搜尋關鍵字廣告',
      oldBudget: 45,
      newBudget: 15,
      sqlCount: 3,
      winRate: 10
    },
    {
      name: '公關與一般社群曝光',
      oldBudget: 25,
      newBudget: 10,
      sqlCount: 1,
      winRate: 5
    }
  ];

  // Calculated metrics for simulator
  const oldSqls = Math.round(mqlCount * (oldMqlToSqlRate / 100));
  const newSqls = Math.round(mqlCount * (pivotMqlToSqlRate / 100));
  const sqlGrowth = newSqls - oldSqls;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider">
                Strategy Pivot Dashboard
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Notion / Dynamics 365 / Power BI 呈現架構
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <Compass className="w-7 h-7 text-blue-400 shrink-0" />
              <span>📊 衡策匯域企管顧問：行銷策略與商機優化儀表板</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              針對 B2B 顧問服務特性，當行銷策略需要「調整」或「轉型」時（例如：從廣泛曝光轉向精準獲取高階決策者名單），本儀表板能清楚對比<strong>「調整前 vs. 調整後」</strong>的成效差異，協助內部對齊與向利害關係人進行策略簡報。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>轉軸模式 (Pivot Mode) 運作中</span>
            </span>
          </div>
        </div>
      </div>

      {/* Module 1: North Star Metrics Tracking */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-xs">
                🎯
              </div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>模組一：北極星指標追蹤 (策略調整核心目標)</span>
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              聚焦本次策略調整最看重的核心數據，直接顯示變動率與含金量變化。
            </p>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
            對比基準：策略調整前 (VS. 上月)
          </span>
        </div>

        {/* 3 Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Director-Level+ Leads */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">高階名單佔比</span>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Director-Level+
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight my-1">
                35%
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+15% vs. 上月</span>
              </div>
              <span className="text-slate-500 text-[11px]">（名單含金量提升）</span>
            </div>
          </div>

          {/* Card 2: Cost Per SQL */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">每筆合格商機獲取成本</span>
                <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                  Cost Per SQL
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight my-1">
                NT$ 4,200
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-12% vs. 上月</span>
              </div>
              <span className="text-slate-500 text-[11px]">（預算運用效率大幅優化）</span>
            </div>
          </div>

          {/* Card 3: MQL to SQL Rate */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">MQL 轉 SQL 轉換率</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  MQL to SQL Rate
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight my-1">
                22%
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+5% vs. 上月</span>
              </div>
              <span className="text-slate-500 text-[11px]">（內容引發實質需求）</span>
            </div>
          </div>
        </div>

        {/* Interactive Pivot Metric Simulator */}
        <div className="bg-slate-900 rounded-lg p-5 text-white border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">MQL to SQL 轉換率調整即時模擬器</h3>
            </div>
            <span className="text-[11px] text-slate-400">拉動下方數值體驗策略轉軸效果</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>每月 MQL 行銷名單數:</span>
                <span className="font-mono font-bold text-blue-400">{mqlCount} 筆</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={mqlCount}
                onChange={(e) => setMqlCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>轉軸後 MQL ➔ SQL 轉換率:</span>
                <span className="font-mono font-bold text-emerald-400">{pivotMqlToSqlRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={pivotMqlToSqlRate}
                onChange={(e) => setPivotMqlToSqlRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="bg-slate-800 rounded p-3 border border-slate-700 text-xs space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>調整前 (基期 17%):</span>
                <span className="font-mono text-slate-400">{oldSqls} 筆 SQL</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>調整後 ({pivotMqlToSqlRate}%):</span>
                <span className="font-mono text-emerald-400">{newSqls} 筆 SQL</span>
              </div>
              <div className="pt-1.5 border-t border-slate-700 flex justify-between font-bold text-emerald-300">
                <span>商機淨增加:</span>
                <span className="font-mono">+{sqlGrowth} 筆高階 SQL ({sqlGrowth >= 0 ? '🟢 成長' : '🔻'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module 2: Channel Pivot Analysis */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-xs">
                🔍
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                模組二：新舊行銷管道成效對比 (Channel Pivot Analysis)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              追蹤資源轉移後的成效（將預算從一般搜尋廣告轉移至深度主題研討會與高階白皮書）。
            </p>
          </div>

          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded">
            預算重新分配與商機轉換對比
          </span>
        </div>

        {/* Recharts Bar Chart: Budget Reallocation */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              <span>資源投入佔比變化 (調整前 vs. 調整後 %)</span>
            </h3>
            <span className="text-[11px] text-slate-500">單位: 百分比 (%)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                <YAxis unit="%" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === 'oldBudget' ? '舊策略投入' : '新策略投入'
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend formatter={(value) => value === 'oldBudget' ? '調整前資源佔比 (%)' : '調整後資源佔比 (%)'} />
                <Bar dataKey="oldBudget" fill="#94a3b8" radius={[4, 4, 0, 0]} name="oldBudget" />
                <Bar dataKey="newBudget" fill="#4f46e5" radius={[4, 4, 0, 0]} name="newBudget" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-3.5">獲客管道 (Channel)</th>
                <th className="p-3.5">資源投入佔比 (新策略)</th>
                <th className="p-3.5">帶入 SQL 數</th>
                <th className="p-3.5">提案勝率 (Win Rate)</th>
                <th className="p-3.5">策略狀態 (Strategy Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-700 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>深度主題研討會 (如 ERP 變革管理)</span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-700">40%</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                      ⬆️ 增加
                    </span>
                  </div>
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-900">12 筆</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">30%</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    🟢 擴大投入
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>高階實務白皮書 (如 ADKAR 應用指南)</span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-700">35%</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                      ⬆️ 增加
                    </span>
                  </div>
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-900">8 筆</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">25%</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    🟢 持續優化
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3.5 font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>一般搜尋引擎廣告 (廣泛關鍵字)</span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-700">15%</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                      ⬇️ 減少
                    </span>
                  </div>
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-700">3 筆</td>
                <td className="p-3.5 font-mono font-bold text-amber-700">10%</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    🟡 縮編/精準化
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3.5 font-bold text-slate-500 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                  <span>外部公關與一般社群曝光</span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-600">10%</span>
                    <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      ⬇️ 減少
                    </span>
                  </div>
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-600">1 筆</td>
                <td className="p-3.5 font-mono font-bold text-slate-600">5%</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                    ⚪ 維持基本盤
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Module 3: Solution Heatmap */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold text-xs">
                📑
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                模組三：專業資產與顧問服務模組熱度 (Solution Heatmap)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              監測潛在客戶對於特定顧問服務的需求轉變，作為後續服務主推方向的依據。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* High Engagement */}
          <div className="bg-rose-50/60 rounded-xl p-5 border border-rose-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                <div className="flex items-center gap-1.5 font-extrabold text-rose-900 text-sm">
                  <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span>🔥 高熱度 (High Engagement)</span>
                </div>
                <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-mono font-bold">
                  優先主推
                </span>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-800 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>大型系統 (ERP / CRM) 導入前期之變革管理：</strong> 解決組織抗性與對接痛點。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>高階組織架構重整規劃：</strong> 協助決策高層擬定全面轉型藍圖。</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-rose-200 text-[11px] text-rose-800 font-bold">
              👉 策略作法：加開高階閉門研討會，發布獨立 ADKAR 實務白皮書。
            </div>
          </div>

          {/* Rising Trend */}
          <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-900 text-sm">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>📈 成長中 (Rising Trend)</span>
                </div>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
                  潛力儲備
                </span>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-800 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>企業數據治理策略 (Data Governance)：</strong> 建立高階數據架構。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>低程式碼 (Low-Code) 工具內部推廣培訓：</strong> 組織敏捷開發部署。</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-amber-200 text-[11px] text-amber-800 font-bold">
              👉 策略作法：製作自測 Assessment Checklist 進行育客與名單評分。
            </div>
          </div>

          {/* Low Engagement */}
          <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-1.5 font-extrabold text-slate-700 text-sm">
                  <Snowflake className="w-4 h-4 text-slate-500" />
                  <span>❄️ 低熱度 (Low Engagement)</span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                  精簡收退
                </span>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  <span><strong>一般性基礎員工訓練：</strong> 利潤較低且吸引不到高階決策人。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  <span><strong>泛通用管理概念宣導：</strong> 轉換率極低，宜改為自動化內容。</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-600 font-semibold">
              👉 策略作法：包裝為常態性 Lead Magnet，不佔用高階顧問預算。
            </div>
          </div>
        </div>
      </div>

      {/* Module 4: Strategy Alignment Script Card */}
      <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                Internal Strategy Alignment Script
              </span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-purple-400" />
              <span>🎤 內部對齊 / 營運檢視文稿 (Strategy Alignment Script)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              這份文稿適合在季度檢討、策略會議或審視公司下一階段營運方針時使用。語氣設定為客觀、數據導向且具備高度專業性。
            </p>
          </div>

          <button
            id="btn-copy-strategy-script"
            onClick={handleCopyScript}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md ${
              copied
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>已複製完整對齊講稿！</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>一鍵複製演講稿全文</span>
              </>
            )}
          </button>
        </div>

        {/* Script Section Cards */}
        <div className="space-y-4 text-xs leading-relaxed">
          {/* Section 1 */}
          <div className="bg-slate-950/80 rounded-lg p-5 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-bold border-b border-slate-800 pb-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>【開場：點出痛點與策略調整的背景】</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
              「各位好。今天會議的主要目的，是針對我們目前的數位行銷與商機獲取策略，進行深度的檢視與方向調整。從過去幾季的 CRM 數據中，我們觀察到一個現象：網站的整體流量與廣泛名單（MQL）維持穩定，但這些名單真正轉化為高階商機（SQL）的比例卻遭遇了瓶頸。這意味著我們花費了資源，卻吸引了較多來『找資料』的基層執行者，而非真正握有預算、面臨組織痛點的決策高層。對於我們這類高客單價、決策週期長的企管顧問服務來說，這會拉長銷售週期，並消耗顧問前端探詢的量能。」
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-950/80 rounded-lg p-5 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold border-b border-slate-800 pb-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>【核心：提出調整方向與具體作法】</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-[13px]">
              「因此，我決定在下半年度進行行銷策略的轉軸（Pivot）。我們的核心策略將從『擴大漏斗頂端的廣泛曝光』，轉移到『深化漏斗中底段的專家信任與精準打擊』。具體來說，我們將採取三個關鍵行動：
            </p>

            <div className="space-y-2.5 pl-3 border-l-2 border-indigo-500/50 my-2">
              <p className="text-slate-200 text-xs sm:text-[13px]">
                <strong className="text-indigo-300 font-bold">第一，內容資產的升級與收斂：</strong> 我們將減少泛泛而談的管理文章，轉而發布針對性強的深度內容。例如，聚焦在企業導入大型系統（如 Dynamics 365 級別的 ERP）時所面臨的組織抗性，並結合 Prosci ADKAR 等變革管理框架，提供具體的解方與檢核表。這類內容能直接篩選出正處於系統轉型陣痛期的企業客戶。
              </p>
              <p className="text-slate-200 text-xs sm:text-[13px]">
                <strong className="text-indigo-300 font-bold">第二，獲客管道的精準化：</strong> 我們將把原本投入在廣泛關鍵字的預算，重新分配到 LinkedIn 等專業社群，或是舉辦針對高階經理人的閉門線上研討會（Webinar）。我們要接觸的是那些正在尋求策略落地的總監與 CXO 們。
              </p>
              <p className="text-slate-200 text-xs sm:text-[13px]">
                <strong className="text-indigo-300 font-bold">第三，導入自動化與更嚴格的名單評分機制 (Lead Scoring)：</strong> 我們將優化行銷端與 CRM 系統的資料對接，利用系統自動追蹤客戶的互動深度（例如：是否下載了白皮書且閱讀超過一定時間）。只有達到特定分數的名單，才會進入業務與顧問的接洽排程，以極大化我們的時間投資報酬率。」
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-950/80 rounded-lg p-5 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold border-b border-slate-800 pb-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>【結語：預期效益與下一步】</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
              「透過剛才展示的『策略調整儀表板』，我們可以在接下來的幾個月內，嚴密監控這些調整帶來的變化。我們的短期目標，是在兩個月內將 MQL 到 SQL 的轉換率提升 10%，並有效降低每筆合格商機的獲取成本。行銷不僅僅是曝光，更是我們專業服務的延伸。確保我們每一次的發聲，都能精準對接企業客戶的最深層痛點，是我們邁向下一階段成長的關鍵。以上是本季的策略調整方針，看看大家對於具體的內容產出方向有沒有初步的想法？」
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
