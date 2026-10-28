import React, { useState } from 'react';
import { Calculator, RefreshCw, Sparkles, ShieldCheck, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { DEFAULT_CALCULATOR_STATE } from '../data/mockData';

export const FormulaCalculator: React.FC = () => {
  const [inputs, setInputs] = useState(DEFAULT_CALCULATOR_STATE);

  const handleReset = () => {
    setInputs(DEFAULT_CALCULATOR_STATE);
  };

  // Dynamic calculations derived from user inputs
  const calculatedClicks = Math.round(inputs.clicks);
  const calculatedCpc = inputs.clicks > 0 ? (inputs.adSpend / inputs.clicks).toFixed(1) : '0';
  const calculatedCtr = inputs.impressions > 0 ? ((inputs.clicks / inputs.impressions) * 100).toFixed(2) : '0';
  const calculatedCvr = inputs.clicks > 0 ? ((inputs.conversions / inputs.clicks) * 100).toFixed(2) : '0';
  
  const calculatedCac = inputs.conversions > 0 ? Math.round(inputs.adSpend / inputs.conversions) : 0;
  const calculatedAdRevenue = Math.round(inputs.conversions * inputs.avgOrderValue);
  const calculatedGrossProfit = Math.round(calculatedAdRevenue * (inputs.grossMarginPct / 100));
  const totalOperationalCost = Math.round(inputs.conversions * inputs.operationalCostPerOrder);
  const calculatedNetProfit = Math.round(calculatedGrossProfit - inputs.adSpend - totalOperationalCost);

  const calculatedRoas = inputs.adSpend > 0 ? Math.round((calculatedAdRevenue / inputs.adSpend) * 100) : 0;
  const totalCost = inputs.adSpend + totalOperationalCost + (calculatedAdRevenue - calculatedGrossProfit);
  const calculatedRoi = totalCost > 0 ? Math.round((calculatedNetProfit / totalCost) * 100) : 0;

  // LTV calculation = (AOV * Yearly Repurchase Freq * (LifespanMonths / 12)) * Gross Margin %
  const yearlyRepurchase = inputs.repurchaseFrequencyYearly;
  const lifespanYears = inputs.customerLifespanMonths / 12;
  const calculatedLtv = Math.round(inputs.avgOrderValue * yearlyRepurchase * lifespanYears * (inputs.grossMarginPct / 100));

  const ltvCacRatio = calculatedCac > 0 ? (calculatedLtv / calculatedCac).toFixed(1) : '0';
  const isHealthyLtvCac = Number(ltvCacRatio) >= 3.0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-2">
            🧮 行銷四階段指標動態試算工具 (Interactive Formula Simulator)
          </div>
          <h2 className="text-2xl font-bold tracking-tight">即時指標模擬與預算效益檢測</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            調整下方廣告預算、轉換率與客單價，系統將自動連動計算 CPC、CAC、ROAS、ROI 及 LTV : CAC 健康度！
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>重設為預設預估值</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>1. 行銷預算與轉化參數設定</span>
            <span className="text-xs text-blue-600 font-semibold">即時試算</span>
          </h3>

          {/* Ad Spend */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <label>廣告投放總預算 (NT$)</label>
              <span className="text-blue-600 font-mono">NT$ {inputs.adSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={inputs.adSpend}
              onChange={(e) => setInputs({ ...inputs, adSpend: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Clicks & Impressions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">總預期曝光數</label>
              <input
                type="number"
                value={inputs.impressions}
                onChange={(e) => setInputs({ ...inputs, impressions: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">總預期點擊數</label>
              <input
                type="number"
                value={inputs.clicks}
                onChange={(e) => setInputs({ ...inputs, clicks: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversions & AOV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">預期成功轉換數 (筆)</label>
              <input
                type="number"
                value={inputs.conversions}
                onChange={(e) => setInputs({ ...inputs, conversions: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">平均客單價 AOV (NT$)</label>
              <input
                type="number"
                value={inputs.avgOrderValue}
                onChange={(e) => setInputs({ ...inputs, avgOrderValue: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Gross Margin % */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <label>產品平均毛利率 (%)</label>
              <span className="text-emerald-600 font-mono font-bold">{inputs.grossMarginPct}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={inputs.grossMarginPct}
              onChange={(e) => setInputs({ ...inputs, grossMarginPct: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Customer Lifespan & Repurchase */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">顧客壽命 (月)</label>
              <input
                type="number"
                value={inputs.customerLifespanMonths}
                onChange={(e) => setInputs({ ...inputs, customerLifespanMonths: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">年平均回購次數</label>
              <input
                type="number"
                step="0.1"
                value={inputs.repurchaseFrequencyYearly}
                onChange={(e) => setInputs({ ...inputs, repurchaseFrequencyYearly: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Result Banner */}
          <div className={`p-6 rounded-2xl border shadow-sm ${
            isHealthyLtvCac
              ? 'bg-gradient-to-br from-emerald-900 to-slate-900 text-white border-emerald-500/40'
              : 'bg-gradient-to-br from-amber-900 to-slate-900 text-white border-amber-500/40'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>四階段連動模擬試算總結</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isHealthyLtvCac ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
              }`}>
                {isHealthyLtvCac ? '商業模式極佳 ✅' : '需調優獲客成本 ⚠️'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
              <div>
                <div className="text-[11px] text-slate-300 font-medium">預期總營收</div>
                <div className="text-xl font-extrabold text-white mt-0.5">NT$ {calculatedAdRevenue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-300 font-medium">預估 ROAS</div>
                <div className="text-xl font-extrabold text-amber-300 mt-0.5">{calculatedRoas}%</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-300 font-medium">客戶獲取成本 (CAC)</div>
                <div className="text-xl font-extrabold text-white mt-0.5">NT$ {calculatedCac.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-300 font-medium">LTV : CAC 健康比</div>
                <div className="text-xl font-extrabold text-emerald-300 mt-0.5">{ltvCacRatio} : 1</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 border-t border-slate-700/80 pt-3 leading-relaxed">
              {isHealthyLtvCac
                ? `目前 LTV : CAC 比率為 ${ltvCacRatio}:1，超過 3:1 標準，代表每一元獲得的客戶可在其生命週期內創造可觀的毛利貢獻！`
                : `目前 LTV : CAC 比率為 ${ltvCacRatio}:1，低於 3:1 建議門檻。建議嘗試調高客單價、優化 CVR 降低 CAC，或強化留存增加回購。`}
            </p>
          </div>

          {/* Four Stages Grid Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stage 1 Results */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-xs font-bold text-blue-600 mb-2">一、 曝光與集客 (Awareness)</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">曝光點擊率 (CTR)</span>
                  <span className="font-bold text-slate-900">{calculatedCtr}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">每次點擊成本 (CPC)</span>
                  <span className="font-bold text-slate-900">NT$ {calculatedCpc}</span>
                </div>
              </div>
            </div>

            {/* Stage 2 Results */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-xs font-bold text-emerald-600 mb-2">二、 參與與互動 (Engagement)</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">總點擊訪客數</span>
                  <span className="font-bold text-slate-900">{calculatedClicks.toLocaleString()} 人</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">轉換率 (CVR)</span>
                  <span className="font-bold text-slate-900">{calculatedCvr}%</span>
                </div>
              </div>
            </div>

            {/* Stage 3 Results */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-xs font-bold text-amber-600 mb-2">三、 轉換與成效 (Conversion)</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">客戶獲取成本 (CAC)</span>
                  <span className="font-bold text-slate-900">NT$ {calculatedCac.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">廣告回報率 (ROAS)</span>
                  <span className="font-bold text-amber-600">{calculatedRoas}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">整體淨利 ROI</span>
                  <span className="font-bold text-emerald-600">{calculatedRoi}%</span>
                </div>
              </div>
            </div>

            {/* Stage 4 Results */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-xs font-bold text-purple-600 mb-2">四、 顧客留存與價值 (Retention)</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">顧客終身價值 (LTV)</span>
                  <span className="font-bold text-purple-700">NT$ {calculatedLtv.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">LTV : CAC 比率</span>
                  <span className="font-bold text-emerald-700">{ltvCacRatio} : 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
