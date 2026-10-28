import React, { useState } from 'react';
import { MetricDefinition } from '../types';
import { METRIC_DEFINITIONS } from '../data/mockData';
import { MetricCard } from './MetricCard';
import {
  Briefcase,
  Users,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Video,
  CalendarCheck,
  Award,
  TrendingUp,
  BarChart2,
  HelpCircle,
  Building2,
  Layers,
  Compass,
  PieChart,
  Flame,
  Snowflake,
  Mic,
  Copy,
  Check,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StageB2BConsultingProps {
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const StageB2BConsulting: React.FC<StageB2BConsultingProps> = ({ onOpenDetail }) => {
  // Calculator Interactive State for B2B Consulting Pipeline
  const [mqlCount, setMqlCount] = useState<number>(240);
  const [mqlToSqlRate, setMqlToSqlRate] = useState<number>(28.5);
  const [sqlToProposalRate, setSqlToProposalRate] = useState<number>(65.0);
  const [winRate, setWinRate] = useState<number>(38.5);
  const [avgDealValue, setAvgDealValue] = useState<number>(850000); // NT$ 850,000
  const [marketingBudget, setMarketingBudget] = useState<number>(180000); // NT$ 180,000

  // State for Copying Script
  const [copied, setCopied] = useState<boolean>(false);

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

  // Derived B2B Pipeline Metrics
  const calculatedSqlCount = Math.round(mqlCount * (mqlToSqlRate / 100));
  const calculatedProposals = Math.round(calculatedSqlCount * (sqlToProposalRate / 100));
  const calculatedWonDeals = Math.round(calculatedProposals * (winRate / 100));
  const totalPipelineRevenue = calculatedWonDeals * avgDealValue;
  const costPerSql = calculatedSqlCount > 0 ? Math.round(marketingBudget / calculatedSqlCount) : 0;
  const roasRatio = marketingBudget > 0 ? Math.round((totalPipelineRevenue / marketingBudget) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>企管顧問服務專題 • 策略管理 / 數據分析 / 變革管理</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              B2B 企管顧問服務：核心指標與三層次轉換目標體系
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              高單價 B2B 顧問服務重在「高決策質與專業信任」。針對企業高階管理層，依據『曝光集客 ➔ 信任深化 ➔ 商機確立』建構精準監測指標與階層式 Conversion Goals。
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 shrink-0 text-right hidden lg:block">
            <div className="text-[11px] text-slate-300 font-medium">預估月度顧問 Pipeline 簽約額</div>
            <div className="text-2xl font-bold text-emerald-400 tracking-tight my-0.5">
              NT$ {totalPipelineRevenue.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">
              成約案數：<strong className="text-white">{calculatedWonDeals} 案</strong> | 提案勝率：{winRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Four Core B2B Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>一、 B2B 顧問服務最核心的 4 個監測指標</span>
            </h2>
            <p className="text-xs text-slate-500">
              質 (Quality) 遠大於量 (Quantity)。精準衡量高階決策者的信任與商機轉換。
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            點擊「公式說明」可看營運建議
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: MQL to SQL */}
          <MetricCard
            definition={METRIC_DEFINITIONS.mql_to_sql}
            value="28.5%"
            unit=""
            change={4.2}
            isGood={true}
            target="20% ~ 35%"
            previousValue="24.3%"
            onOpenDetail={onOpenDetail}
          />

          {/* Card 2: Depth of Engagement */}
          <MetricCard
            definition={METRIC_DEFINITIONS.depth_of_engagement}
            value="3m 42s"
            unit="停留/滾動78%"
            change={8.5}
            isGood={true}
            target="文章>3min, 研討會出席>65%"
            previousValue="3m 20s"
            onOpenDetail={onOpenDetail}
          />

          {/* Card 3: Cost per SQL & Win Rate */}
          <MetricCard
            definition={METRIC_DEFINITIONS.cost_per_sql}
            value="NT$ 4,800"
            unit="勝率 38.5%"
            change={-12.4}
            isGood={true}
            target="NT$ 3,500 ~ 6,000"
            previousValue="NT$ 5,480"
            onOpenDetail={onOpenDetail}
          />

          {/* Card 4: Sales Cycle Length */}
          <MetricCard
            definition={METRIC_DEFINITIONS.sales_cycle_length}
            value="42 天"
            unit=""
            change={-27.5}
            isGood={true}
            target="30 ~ 60 天"
            previousValue="58 天"
            onOpenDetail={onOpenDetail}
          />
        </div>
      </div>

      {/* Section 2: Three Tiered Conversion Goals Framework */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <Layers className="w-3 h-3" />
            <span> Conversion Goals Architecture</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            二、 企管顧問服務「三層次轉換目標（Conversion Goals）」設定架構
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            B2B 決策是一個漸進流程，不能只設定「聯絡我們」。必須區分微型轉換 (Micro-conversions) 與宏觀轉換 (Macro-conversions)。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ToFu Tier */}
          <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200 flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">漏斗頂端 (ToFu)</h3>
                    <span className="text-[10px] text-blue-600 font-semibold uppercase">建立認知與名單獲取 (微型轉換)</span>
                  </div>
                </div>
                <FileText className="w-4 h-4 text-blue-600" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">🎯 轉換目標設定：</span>
                  <p className="text-slate-600 bg-white p-2 rounded border border-slate-200 text-[11px]">
                    獲取企業 Email 與基本職稱資訊（初步確認來自具規模之企業）。
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1">💡 具體作法與 Lead Magnets：</span>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>專業白皮書 / 指南下載：</strong> 例如《2026 企業資料治理與系統轉型檢核表》、《降低系統上線陣痛期的 ADKAR 變革管理應用指南》。</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>深度電子報訂閱：</strong> 提供高階策略洞察與產業趨勢前瞻分析。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] flex justify-between items-center">
              <span className="text-slate-500">單月名單獲得 (MQL)</span>
              <span className="font-bold text-slate-900 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                1,240 份下載
              </span>
            </div>
          </div>

          {/* MoFu Tier */}
          <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200 flex flex-col justify-between hover:border-indigo-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">漏斗中段 (MoFu)</h3>
                    <span className="text-[10px] text-indigo-600 font-semibold uppercase">信任深化與需求激發 (微/中型轉換)</span>
                  </div>
                </div>
                <Video className="w-4 h-4 text-indigo-600" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">🎯 轉換目標設定：</span>
                  <p className="text-slate-600 bg-white p-2 rounded border border-slate-200 text-[11px]">
                    辨識對方是否為決策者 (C-Level/VP)，篩選具備潛在專案需求的企業。
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1">💡 具體作法與實例：</span>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>專業研討會 (Webinar) 註冊與出席：</strong> 舉辦專屬高階主管線上分享（如《解析知名企業導入流程自動化的成功與失敗案例》）。</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>互動式自我評估工具：</strong> 提供「組織變革準備度評估」表單，填寫完獲得簡要檢測報告，並讓顧問掌握內部情報。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] flex justify-between items-center">
              <span className="text-slate-500">研討會出席率 / 試算完成</span>
              <span className="font-bold text-slate-900 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                出席 72% (145 份評估)
              </span>
            </div>
          </div>

          {/* BoFu Tier */}
          <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">漏斗底端 (BoFu)</h3>
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase">商機確立 (宏觀轉換 Macro)</span>
                  </div>
                </div>
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">🎯 轉換目標設定：</span>
                  <p className="text-slate-600 bg-white p-2 rounded border border-slate-200 text-[11px]">
                    獲取完整專案背景資訊，安排探詢會議 (Discovery Call) 或送出 Formal Proposal。
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1">💡 具體作法與實例：</span>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>預約專屬諮詢會議 (Discovery Call)：</strong> 設置行事曆預約功能，要求填寫「營運痛點」與「預計導入時程」。</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>索取解決方案提案 / 報價詢問：</strong> 針對模組（如：企業高階策略共識營、數據架構健檢）直接送出諮詢表單。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] flex justify-between items-center">
              <span className="text-slate-500">探詢會議 (Discovery) / 簽約</span>
              <span className="font-bold text-slate-900 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                42 場會議 / 16 專案成交
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: B2B Consulting Pipeline & Revenue Simulator */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <span>三、 B2B 企管顧問專案 Pipeline 效益動態模擬器</span>
            </h2>
            <p className="text-xs text-slate-500">
              調整名單數、MQL-SQL 轉換率與提案勝率，即時評估顧問服務月度預期簽約金額與成本收益比。
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
            <span>企管專案基準值：高單價與長決策鏈</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slider Inputs Column */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            {/* Input 1: MQL Count */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-800">
                  1. 單月獲得白皮書/指南名單數 (MQL)
                </label>
                <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[11px]">
                  {mqlCount} 份
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={mqlCount}
                onChange={(e) => setMqlCount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>50 份 (精準小眾)</span>
                <span>1,000 份 (廣泛宣傳)</span>
              </div>
            </div>

            {/* Input 2: MQL to SQL Conversion Rate */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-800">
                  2. MQL 轉 SQL 合格商機比率 (MQL to SQL Rate)
                </label>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded text-[11px]">
                  {mqlToSqlRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="0.5"
                value={mqlToSqlRate}
                onChange={(e) => setMqlToSqlRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10% (內容較廣泛)</span>
                <span>標竿: 20%~35%</span>
                <span>60% (精準審核)</span>
              </div>
            </div>

            {/* Input 3: Win Rate */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-800">
                  3. 正式提案勝率 (Proposal Win Rate)
                </label>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                  {winRate}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="70"
                step="0.5"
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>15% (競爭激烈)</span>
                <span>標竿: 30%~45%</span>
                <span>70% (口碑強大)</span>
              </div>
            </div>

            {/* Input 4: Avg Deal Value */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-800">
                  4. 平均企管顧問專案合約金額 (NT$)
                </label>
                <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-[11px]">
                  NT$ {avgDealValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="3000000"
                step="50000"
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>NT$ 20萬 (短評估/健檢)</span>
                <span>NT$ 300萬 (大型變革管理)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-slate-900 rounded-lg p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Pipeline 模擬運算結果
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                  極佳高價值 B2B 結構
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-400 mb-1">預估單月合約簽約總額 (Revenue)</div>
                  <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                    NT$ {totalPipelineRevenue.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">獲得合格商機 (SQL)</span>
                    <span className="text-base font-bold text-blue-300 font-mono">
                      {calculatedSqlCount} 筆
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">預估成功簽約案數</span>
                    <span className="text-base font-bold text-emerald-300 font-mono">
                      {calculatedWonDeals} 案
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">每筆 SQL 成本 (Cost/SQL)</span>
                    <span className="text-base font-bold text-amber-300 font-mono">
                      NT$ {costPerSql.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">顧問行銷 ROAS 比率</span>
                    <span className="text-base font-bold text-purple-300 font-mono">
                      {roasRatio}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-300 bg-slate-800/40 p-3 rounded">
              <div className="font-bold text-white mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>顧問專案最佳化建議：</span>
              </div>
              <p className="leading-snug text-slate-300">
                若欲提升簽約金額，重點在於<strong>提升 MQL to SQL 比率</strong>與<strong>縮短銷售週期</strong>。建議提供具體的專案成功案例 (Case Study) 與高階 Discovery Call 行事曆直接預約。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Strategy Pivot Dashboard (行銷策略與商機優化儀表板) */}
      <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-lg space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider">
                Strategy Pivot Dashboard
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Notion / Dynamics 365 / Power BI 整合架構
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-400" />
              <span>📊 衡策匯域企管顧問：行銷策略與商機優化儀表板</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              針對 B2B 顧問服務特性，當行銷策略從「廣泛曝光」轉型為「精準獲取高階決策者名單」時，本儀表板專為「診斷與對比 (Before vs. After)」設計，幫助團隊隨時檢視新策略是否奏效。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>策略轉軸 (Pivot Mode) 監測中</span>
            </span>
          </div>
        </div>

        {/* Module 1: North Star Metrics Tracking */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>🎯 模組一：北極星指標追蹤 (策略調整核心目標)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                聚焦本次策略調整最看重的核心數據，直接顯示變動率與含金量對比。
              </p>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
              對比基準：策略調整前 (VS. 上月)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">高階名單佔比</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-mono">
                    Director-Level+
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight my-1">
                  35%
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+15% vs. 上月</span>
                </div>
                <span className="text-slate-400 text-[11px]">（檢視名單含金量是否提升）</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">每筆合格商機獲取成本</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-mono">
                    Cost Per SQL
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight my-1">
                  NT$ 4,200
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>-12% vs. 上月</span>
                </div>
                <span className="text-slate-400 text-[11px]">（檢視預算運用效率）</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">MQL 轉 SQL 轉換率</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    MQL to SQL Rate
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight my-1">
                  22%
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+5% vs. 上月</span>
                </div>
                <span className="text-slate-400 text-[11px]">（檢視內容引發實質需求）</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: Channel Pivot Analysis */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                <span>🔍 模組二：新舊行銷管道成效對比 (Channel Pivot Analysis)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                追蹤資源轉移後的成效對比（例如：將預算從廣泛關鍵字廣告轉移至閉門研討會與 LinkedIn 高階白皮書）。
              </p>
            </div>
            <span className="text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded font-mono">
              資源動態重新分配模型
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/90 text-slate-200 font-bold border-b border-slate-700">
                  <th className="p-3.5">獲客管道 (Channel)</th>
                  <th className="p-3.5">資源投入佔比 (新策略)</th>
                  <th className="p-3.5">帶入 SQL 數</th>
                  <th className="p-3.5">提案勝率 (Win Rate)</th>
                  <th className="p-3.5">策略動作與狀態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>深度主題研討會 (如 ERP 變革管理)</span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400">40%</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        ⬆️ 增加
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-white">12 筆</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400">30%</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      🟢 擴大投入
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>高階實務白皮書 (如 ADKAR 應用指南)</span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400">35%</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        ⬆️ 增加
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-white">8 筆</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400">25%</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      🟢 持續優化
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span>一般搜尋引擎廣告 (廣泛關鍵字)</span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-300">15%</span>
                      <span className="text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                        ⬇️ 減少
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-300">3 筆</td>
                  <td className="p-3.5 font-mono font-bold text-amber-300">10%</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      🟡 縮編/精準化
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-slate-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500 shrink-0" />
                    <span>外部公關與一般社群曝光</span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-400">10%</span>
                      <span className="text-[10px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
                        ⬇️ 減少
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-400">1 筆</td>
                  <td className="p-3.5 font-mono font-bold text-slate-400">5%</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-slate-700/80 text-slate-300 border border-slate-600">
                      ⚪ 維持基本盤
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Module 3: Solution Heatmap */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>📑 模組三：專業資產與顧問服務模組熱度 (Solution Heatmap)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                監測潛在企業客戶對特定顧問服務模組的需求轉變，作為後續服務主推方向的依據。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* High Heatmap */}
            <div className="bg-gradient-to-b from-rose-950/40 to-slate-800/80 rounded-lg p-4 border border-rose-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-rose-800/40 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs">
                    <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span>🔥 高熱度 (High Engagement)</span>
                  </div>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono border border-rose-500/30">
                    最優順位
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>大型系統 (ERP / CRM) 導入前期變革管理：</strong> 解決組織陣痛與員工排斥抗性。</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>企業高階組織架構重整規劃：</strong> 為高階決策層提供客製化戰略路線圖。</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-rose-900/40 text-[11px] text-rose-300/80 font-medium">
                策略建議：加開閉門高階工作坊與專屬 Case Study 研討。
              </div>
            </div>

            {/* Rising Trend */}
            <div className="bg-gradient-to-b from-amber-950/40 to-slate-800/80 rounded-lg p-4 border border-amber-800/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-amber-800/40 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>📈 成長中 (Rising Trend)</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                    潛力模組
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>企業數據治理策略 (Data Governance)：</strong> 建立數據驅動決策架構。</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>低程式碼 (Low-Code) 工具內部推廣培訓：</strong> 加速組織敏捷轉型。</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-amber-900/40 text-[11px] text-amber-300/80 font-medium">
                策略建議：搭配自我評估工具（Assessment Tool）進行育客。
              </div>
            </div>

            {/* Low Heatmap */}
            <div className="bg-gradient-to-b from-slate-800/60 to-slate-800/80 rounded-lg p-4 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-400 text-xs">
                    <Snowflake className="w-4 h-4 text-slate-400" />
                    <span>❄️ 低熱度 (Low Engagement)</span>
                  </div>
                  <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded font-mono">
                    縮減資源
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                    <span><strong>一般性基礎員工訓練：</strong> 需求量低且利潤邊際薄。</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                    <span><strong>泛通用的通識管理演講：</strong> 無法吸引具決策權的 CXO。</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-700 text-[11px] text-slate-400 font-medium">
                策略建議：將相關素材模組化打包，改為自動化免費 Lead Magnet。
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Strategy Alignment Script (內部對齊 / 營運檢視文稿) */}
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Executive Briefing & Presentation Script
                </span>
              </div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-4.5 h-4.5 text-purple-400" />
                <span>🎤 內部對齊 / 營運檢視文稿 (Strategy Alignment Script)</span>
              </h3>
              <p className="text-xs text-slate-400">
                適合於季度檢討、策略會議或審視公司下一階段營運方針時使用。語氣設定為客觀、數據導向且具備高度專業性。
              </p>
            </div>

            <button
              onClick={handleCopyScript}
              className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已複製完整對齊講稿！</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製演講稿全文</span>
                </>
              )}
            </button>
          </div>

          {/* Script Content Cards */}
          <div className="space-y-4 text-xs leading-relaxed text-slate-300">
            {/* Opening Block */}
            <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold border-b border-slate-800 pb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>【開場：點出痛點與策略調整的背景】</span>
              </div>
              <p className="text-slate-300 text-[11.5px]">
                「各位好。今天會議的主要目的，是針對我們目前的數位行銷與商機獲取策略，進行深度的檢視與方向調整。從過去幾季的 CRM 數據中，我們觀察到一個現象：網站的整體流量與廣泛名單（MQL）維持穩定，但這些名單真正轉化為高階商機（SQL）的比例卻遭遇了瓶頸。這意味著我們花費了資源，卻吸引了較多來『找資料』的基層執行者，而非真正握有預算、面臨組織痛點的決策高層。對於我們這類高客單價、決策週期長的企管顧問服務來說，這會拉長銷售週期，並消耗顧問前端探詢的量能。」
              </p>
            </div>

            {/* Core Action Block */}
            <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold border-b border-slate-800 pb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>【核心：提出調整方向與具體作法】</span>
              </div>
              <p className="text-slate-300 text-[11.5px]">
                「因此，我決定在下半年度進行行銷策略的轉軸（Pivot）。我們的核心策略將從『擴大漏斗頂端的廣泛曝光』，轉移到『深化漏斗中底段的專家信任與精準打擊』。具體來說，我們將採取三個關鍵行動：
              </p>

              <div className="space-y-2 pl-2 border-l-2 border-indigo-500/40 my-2">
                <p className="text-slate-200 text-[11.5px]">
                  <strong className="text-indigo-300">第一，內容資產的升級與收斂：</strong> 我們將減少泛泛而談的管理文章，轉而發布針對性強的深度內容。例如，聚焦在企業導入大型系統（如 Dynamics 365 級別的 ERP）時所面臨的組織抗性，並結合 Prosci ADKAR 等變革管理框架，提供具體的解方與檢核表。這類內容能直接篩選出正處於系統轉型陣痛期的企業客戶。
                </p>
                <p className="text-slate-200 text-[11.5px]">
                  <strong className="text-indigo-300">第二，獲客管道的精準化：</strong> 我們將把原本投入在廣泛關鍵字的預算，重新分配到 LinkedIn 等專業社群，或是舉辦針對高階經理人的閉門線上研討會（Webinar）。我們要接觸的是那些正在尋求策略落地的總監與 CXO 們。
                </p>
                <p className="text-slate-200 text-[11.5px]">
                  <strong className="text-indigo-300">第三，導入自動化與更嚴格的名單評分機制 (Lead Scoring)：</strong> 我們將優化行銷端與 CRM 系統的資料對接，利用系統自動追蹤客戶的互動深度（例如：是否下載了白皮書且閱讀超過一定時間）。只有達到特定分數的名單，才會進入業務與顧問的接洽排程，以極大化我們的時間投資報酬率。」
                </p>
              </div>
            </div>

            {/* Conclusion Block */}
            <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold border-b border-slate-800 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>【結語：預期效益與下一步】</span>
              </div>
              <p className="text-slate-300 text-[11.5px]">
                「透過剛才展示的『策略調整儀表板』，我們可以在接下來的幾個月內，嚴密監控這些調整帶來的變化。我們的短期目標，是在兩個月內將 MQL 到 SQL 的轉換率提升 10%，並有效降低每筆合格商機的獲取成本。行銷不僅僅是曝光，更是我們專業服務的延伸。確保我們每一次的發聲，都能精準對接企業客戶的最深層痛點，是我們邁向下一階段成長的關鍵。以上是本季的策略調整方針，看看大家對於具體的內容產出方向有沒有初步的想法？」
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
