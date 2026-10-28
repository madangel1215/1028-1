import React, { useState } from 'react';
import { BaselineSettings } from '../types';
import { 
  ATTRIBUTION_MODELS_COMPARISON, 
  DEDUPLICATION_AUDIT_DATA 
} from '../data/marketingFrameworkData';
import { 
  Calculator, 
  Layers, 
  ShieldAlert, 
  PieChart, 
  Sliders, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface RoiAttributionAnalyzerProps {
  settings: BaselineSettings;
}

export const RoiAttributionAnalyzer: React.FC<RoiAttributionAnalyzerProps> = ({ settings }) => {
  // 單一活動 ROI 試算器狀態
  const [campaignRevenue, setCampaignRevenue] = useState<number>(350000); // 歸因營收
  const [campaignCost, setCampaignCost] = useState<number>(85000); // 活動全成本 (含製作與代理)
  const [attributionWindow, setAttributionWindow] = useState<'7d_click' | '1d_view' | '30d_b2b'>('7d_click');

  // 計算活動 ROI = (活動歸因營收 × 毛利率 − 活動全成本) ÷ 活動全成本
  const gmDecimal = settings.grossMarginPct / 100;
  const campaignGrossProfit = campaignRevenue * gmDecimal;
  const singleCampaignRoi = campaignCost > 0 ? ((campaignGrossProfit - campaignCost) / campaignCost) * 100 : 0;
  const campaignRoas = campaignCost > 0 ? (campaignRevenue / campaignCost) : 0;

  // 增量測試模擬 (iROAS)
  const [testSpend, setTestSpend] = useState<number>(50000);
  const [testGroupRev, setTestGroupRev] = useState<number>(420000);
  const [controlGroupRev, setControlGroupRev] = useState<number>(295000);
  const iRoas = testSpend > 0 ? (testGroupRev - controlGroupRev) / testSpend : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">單一活動 ROI 與綜合 ROI 交叉驗證中心</h2>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-semibold">
                第八節 & 第九節 規範
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              單一活動強調固定 UTM 與完整銷售週期；綜合 ROI 透過<strong>歸因模型</strong>、<strong>增量測試 (iROAS)</strong>與<strong>行銷組合模型 (MMM)</strong>三重校準，並剔除跨平台重複歸因水分。
            </p>
          </div>
        </div>

        {/* Section 1: Single Campaign ROI Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  單一活動 ROI 試算器 (Single Campaign ROI)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">
                公式: (歸因營收 × 毛利率 {settings.grossMarginPct}% − 全成本) ÷ 全成本
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  活動歸因營收 (NT$)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={campaignRevenue}
                  onChange={(e) => setCampaignRevenue(Number(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 text-xs font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  活動全成本 (NT$)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={campaignCost}
                  onChange={(e) => setCampaignCost(Number(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 text-xs font-bold bg-white"
                />
                <span className="text-[10px] text-slate-400">廣告 + 製作 + 人力 + 工具</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  歸因窗口與週期
                </label>
                <select
                  value={attributionWindow}
                  onChange={(e) => setAttributionWindow(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-slate-900 text-xs font-medium bg-white"
                >
                  <option value="7d_click">點擊後 7 天 (電商標準)</option>
                  <option value="1d_view">瀏覽後 1 天 (展示型廣告)</option>
                  <option value="30d_b2b">完整銷售週期 30~60 天 (B2B)</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
              <strong>執行規範：</strong> 一定要用 UTM 加活動代碼獨立追蹤；B2B 活動必須將評估期拉長到一個完整銷售週期（30–90天），否則初期的品牌與白皮書活動會被嚴重低估。
            </div>
          </div>

          {/* Single Campaign Result Card */}
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">單一活動淨投資回報率</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`text-3xl font-extrabold font-mono tabular-nums ${singleCampaignRoi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {singleCampaignRoi > 0 ? `+${singleCampaignRoi.toFixed(1)}%` : `${singleCampaignRoi.toFixed(1)}%`}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                貢獻實質毛利: <strong className="font-mono text-white">${Math.round(campaignGrossProfit).toLocaleString()}</strong>
              </p>
              <p className="text-xs text-slate-400">
                對應表面 ROAS: <strong className="font-mono text-slate-200">{campaignRoas.toFixed(2)}x</strong>
              </p>
            </div>

            <div className={`p-2.5 rounded-lg text-xs font-semibold ${
              singleCampaignRoi > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {singleCampaignRoi > 0 ? '該專案扣除銷貨成本與全費用後實質為正利潤' : '警示：扣除商品成本後淨虧損，立即檢討出價或停止投放'}
            </div>
          </div>
        </div>

        {/* Section 2: Deduplication Audit (Platform Inflation Checker) */}
        <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  重複歸因檢查機制 (Deduplication Audit)
                </h3>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                  重複歸因比值: {DEDUPLICATION_AUDIT_DATA.dedupRatio}x (灌水 45%)
                </span>
              </div>
              <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                {DEDUPLICATION_AUDIT_DATA.auditWarning}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-amber-200">
                  <span className="text-slate-500 text-[10px] block">Meta 回報轉換數</span>
                  <span className="text-base font-bold text-slate-900">{DEDUPLICATION_AUDIT_DATA.metaReportedConversions.toLocaleString()} 筆</span>
                </div>
                <div className="p-2.5 rounded bg-white border border-amber-200">
                  <span className="text-slate-500 text-[10px] block">Google Ads 回報轉換數</span>
                  <span className="text-base font-bold text-slate-900">{DEDUPLICATION_AUDIT_DATA.googleReportedConversions.toLocaleString()} 筆</span>
                </div>
                <div className="p-2.5 rounded bg-white border border-amber-200">
                  <span className="text-slate-500 text-[10px] block">各平台報表合計</span>
                  <span className="text-base font-bold text-rose-600">{DEDUPLICATION_AUDIT_DATA.totalPlatformReported.toLocaleString()} 筆</span>
                </div>
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300">
                  <span className="text-emerald-700 text-[10px] block font-bold">CRM 實際唯一定單 (去重)</span>
                  <span className="text-base font-bold text-emerald-800">{DEDUPLICATION_AUDIT_DATA.actualCrmUniqueConversions.toLocaleString()} 筆</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 3 Comprehensive ROI Cross-validation Methods */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            綜合 ROI 三重交叉驗證方法 (Cross-Validation Framework)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Method 1: Attribution Models */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[11px]">1</span>
                <span>歸因模型 (Attribution Models)</span>
              </div>
              <p className="text-xs text-slate-500">
                用於<strong>日常營運優化</strong>。上漏斗活動採用首次點擊或位置型 (40/20/40)，才不會被最終點擊殺死。
              </p>

              <div className="space-y-2 text-xs">
                {ATTRIBUTION_MODELS_COMPARISON.map((m) => (
                  <div key={m.model} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>{m.model}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        認知{m.awarenessRevPct}% / 互動{m.engagementRevPct}% / 轉換{m.conversionRevPct}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {m.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Method 2: Incrementality Test (iROAS) */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-mono text-[11px]">2</span>
                <span>增量測試 (iROAS / Geo Holdout)</span>
              </div>
              <p className="text-xs text-slate-500">
                每季執行一次。排除「不投廣告本來就會買」的自然客，取得真正增量 iROAS。
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 block text-[11px]">模擬增量實驗</span>
                  <div>
                    <label className="text-slate-500 text-[10px]">實驗廣告投入: NT$ {testSpend.toLocaleString()}</label>
                    <input
                      type="range"
                      min="10000"
                      max="150000"
                      step="5000"
                      value={testSpend}
                      onChange={(e) => setTestSpend(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 text-[10px]">實驗組營收: NT$ {testGroupRev.toLocaleString()} | 對照組: NT$ {controlGroupRev.toLocaleString()}</label>
                    <div className="flex items-center justify-between text-xs font-mono font-bold pt-1">
                      <span>純增量營收:</span>
                      <span className="text-emerald-700">+NT$ {(testGroupRev - controlGroupRev).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-900 font-bold flex items-center justify-between">
                    <span>真實增量 iROAS:</span>
                    <span className="text-lg font-mono font-extrabold text-emerald-800">{iRoas.toFixed(2)}x</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-1">
                    {iRoas >= (1 / (settings.grossMarginPct / 100))
                      ? '✓ iROAS 高於損益平衡線，確認廣告具實質增量價值'
                      : '⚠ iROAS 低於損益平衡，代表花錢在買原本就會下單的客戶'}
                  </div>
                </div>
              </div>
            </div>

            {/* Method 3: Marketing Mix Modeling (MMM) & 70/20/10 Budget */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-mono text-[11px]">3</span>
                <span>行銷組合模型 (MMM) 與 70/20/10 預算</span>
              </div>
              <p className="text-xs text-slate-500">
                每半年或每年透過歷史數據迴歸，找出邊際報酬遞減拐點，建立年度預算配置。
              </p>

              {/* 70/20/10 Budget Structure Box */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800">建議年度預算結構</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">70% 已驗證有效管道 (Core)</span>
                    <span className="font-mono font-bold text-blue-600">${Math.round(settings.mediaCost * 0.7).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">20% 擴量與受眾測試 (Scale)</span>
                    <span className="font-mono font-bold text-purple-600">${Math.round(settings.mediaCost * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">10% 新興管道實驗 (Explore)</span>
                    <span className="font-mono font-bold text-amber-600">${Math.round(settings.mediaCost * 0.1).toLocaleString()}</span>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="w-full h-2 rounded-full flex overflow-hidden mt-2">
                  <div style={{ width: '70%' }} className="bg-blue-600" title="70% Core" />
                  <div style={{ width: '20%' }} className="bg-purple-600" title="20% Scale" />
                  <div style={{ width: '10%' }} className="bg-amber-500" title="10% Explore" />
                </div>
              </div>

              <div className="text-[11px] text-slate-600 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                <strong>決策洞察：</strong> 永遠維持 10% 於新管道實驗（如 AIO 語意搜尋、TikTok、短影音 Podcast），即使短期 ROAS 低也能確保未來 2 年的新增長引擎。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
