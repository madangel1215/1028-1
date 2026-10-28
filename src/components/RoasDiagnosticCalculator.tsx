import React, { useState } from 'react';
import { BaselineSettings } from '../types';
import { Stethoscope, ArrowRight, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, TrendingDown, Layers } from 'lucide-react';

interface RoasDiagnosticCalculatorProps {
  settings: BaselineSettings;
}

export const RoasDiagnosticCalculator: React.FC<RoasDiagnosticCalculatorProps> = ({ settings }) => {
  // 診斷四大變數
  const [cpm, setCpm] = useState<number>(180); // 千次曝光成本 NT$ 180
  const [ctrPct, setCtrPct] = useState<number>(3.8); // 點擊率 3.8%
  const [cvrPct, setCvrPct] = useState<number>(3.4); // 轉換率 3.4%
  const [aov, setAov] = useState<number>(2800); // 平均客單價 NT$ 2,800

  // 基準線
  const gmDecimal = settings.grossMarginPct / 100;
  const breakEvenRoas = gmDecimal > 0 ? (1 / gmDecimal) : 0;
  const denominator = gmDecimal - (settings.targetNetMarginPct / 100);
  const targetRoas = denominator > 0 ? (1 / denominator) : 0;

  // ROAS 拆解計算: ROAS = (CTR × CVR × AOV × 1000) ÷ CPM
  // 注意 CTR 與 CVR 為百分比 (小數點計算: (ctr/100) * (cvr/100) * aov * 1000 / cpm)
  const ctrDecimal = ctrPct / 100;
  const cvrDecimal = cvrPct / 100;
  const calculatedRoas = cpm > 0 ? (ctrDecimal * cvrDecimal * aov * 1000) / cpm : 0;
  const roasPercentage = calculatedRoas * 100;

  // 診斷瓶頸狀態
  const isBelowBreakEven = calculatedRoas < breakEvenRoas;
  const isBelowTarget = calculatedRoas < targetRoas;

  // 診斷哪一個變數是主要瓶頸
  const cpmSeverity = cpm > 250 ? 'high' : cpm > 190 ? 'medium' : 'normal';
  const ctrSeverity = ctrPct < 2.0 ? 'high' : ctrPct < 3.2 ? 'medium' : 'normal';
  const cvrSeverity = cvrPct < 2.0 ? 'high' : cvrPct < 3.0 ? 'medium' : 'normal';
  const aovSeverity = aov < 1500 ? 'high' : aov < 2200 ? 'medium' : 'normal';

  // 快速情境套用
  const applyPreset = (type: 'healthy' | 'cpm_spike' | 'creative_fatigue' | 'lp_broken' | 'low_aov') => {
    switch (type) {
      case 'healthy':
        setCpm(160);
        setCtrPct(4.2);
        setCvrPct(3.8);
        setAov(3200);
        break;
      case 'cpm_spike':
        setCpm(340); // 旺季 CPM 暴漲
        setCtrPct(3.6);
        setCvrPct(3.4);
        setAov(2800);
        break;
      case 'creative_fatigue':
        setCpm(175);
        setCtrPct(1.4); // 素材疲倦 CTR 崩跌
        setCvrPct(3.2);
        setAov(2800);
        break;
      case 'lp_broken':
        setCpm(170);
        setCtrPct(4.0);
        setCvrPct(1.1); // 著陸頁改版失敗 CVR 崩跌
        setAov(2800);
        break;
      case 'low_aov':
        setCpm(180);
        setCtrPct(3.8);
        setCvrPct(3.5);
        setAov(1100); // 缺乏組合包 客單過低
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">ROAS 四因數拆解與診斷工具 (Decomposition Engine)</h2>
                <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  公式：ROAS = (CTR × CVR × AOV × 1000) ÷ CPM
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                當 ROAS 下滑時，依序檢查是 <strong>CPM 變貴</strong>、<strong>CTR 下降</strong>、<strong>CVR 下降</strong> 還是 <strong>AOV 下降</strong>，直接鎖定根因並採取對應行動。
              </p>
            </div>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-1">模擬情境:</span>
            <button
              onClick={() => applyPreset('healthy')}
              className="px-2.5 py-1 text-xs rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium hover:bg-emerald-100 transition-colors"
            >
              健康標準
            </button>
            <button
              onClick={() => applyPreset('cpm_spike')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              大促競價暴增 (高CPM)
            </button>
            <button
              onClick={() => applyPreset('creative_fatigue')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              素材疲倦 (低CTR)
            </button>
            <button
              onClick={() => applyPreset('lp_broken')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              頁面阻力 (低CVR)
            </button>
            <button
              onClick={() => applyPreset('low_aov')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              單品過低 (低AOV)
            </button>
          </div>
        </div>

        {/* Calculation Interactive Tree & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Factor 1: CTR */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">1. 點擊率 CTR</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                ctrSeverity === 'high' ? 'bg-rose-100 text-rose-700' : ctrSeverity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {ctrPct}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="8.0"
              step="0.1"
              value={ctrPct}
              onChange={(e) => setCtrPct(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="text-[11px] text-slate-500">
              衡量：素材視覺、標題吸引力與痛點共鳴。
            </div>
          </div>

          {/* Factor 2: CVR */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">2. 轉換率 CVR</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                cvrSeverity === 'high' ? 'bg-rose-100 text-rose-700' : cvrSeverity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {cvrPct}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.1"
              value={cvrPct}
              onChange={(e) => setCvrPct(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="text-[11px] text-slate-500">
              衡量：著陸頁體驗、表單簡化度與結帳信任。
            </div>
          </div>

          {/* Factor 3: AOV */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">3. 平均客單價 AOV</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                aovSeverity === 'high' ? 'bg-rose-100 text-rose-700' : aovSeverity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                ${aov.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="100"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="text-[11px] text-slate-500">
              衡量：追加銷售、加價購與高階組合包。
            </div>
          </div>

          {/* Factor 4: CPM (Denominator) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">4. 千次曝光成本 CPM (分母)</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                cpmSeverity === 'high' ? 'bg-rose-100 text-rose-700' : cpmSeverity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                ${cpm}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={cpm}
              onChange={(e) => setCpm(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
            <div className="text-[11px] text-slate-500">
              衡量：受眾寬窄、競價競爭與素材品質分。
            </div>
          </div>
        </div>

        {/* Diagnostic Output Scoreboard */}
        <div className="mt-6 p-5 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">即時診斷 ROAS 結算結果</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
                {calculatedRoas.toFixed(2)}x
              </span>
              <span className="text-lg font-bold font-mono text-slate-300">
                ({roasPercentage.toFixed(0)}%)
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide ${
                calculatedRoas >= targetRoas
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : calculatedRoas >= breakEvenRoas
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {calculatedRoas >= targetRoas
                  ? '高於目標 (建議加碼 20%)'
                  : calculatedRoas >= breakEvenRoas
                  ? '介於損益與目標 (維持優化)'
                  : '低於損益平衡 (每投1元都在虧)'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
            <div>
              <div className="text-slate-400">毛利損益平衡線</div>
              <div className="text-base font-bold text-rose-400 font-mono">
                {breakEvenRoas.toFixed(2)}x
              </div>
              <div className="text-[10px] text-slate-500">1 ÷ {settings.grossMarginPct}% 毛利率</div>
            </div>
            <div>
              <div className="text-slate-400">目標淨利 ROAS 線</div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {targetRoas.toFixed(2)}x
              </div>
              <div className="text-[10px] text-slate-500">含 {settings.targetNetMarginPct}% 淨利要求</div>
            </div>
            <div>
              <div className="text-slate-400">當前邊際安全空間</div>
              <div className={`text-base font-bold font-mono ${calculatedRoas >= breakEvenRoas ? 'text-blue-400' : 'text-rose-400'}`}>
                {(calculatedRoas - breakEvenRoas).toFixed(2)}x
              </div>
              <div className="text-[10px] text-slate-500">大於 0 方具加碼資格</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Playbook Based on Diagnostic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CPM Action */}
        <div className={`p-4 rounded-xl border transition-all ${
          cpmSeverity === 'high' ? 'bg-rose-50/70 border-rose-300 shadow-xs' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">若 CPM 變貴</span>
            {cpmSeverity === 'high' && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                主要拖累因素
              </span>
            )}
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>可能根因：</strong>競價激烈、受眾太窄、素材互動品質分低、旺季搶標。</p>
            <p className="text-slate-800 font-semibold pt-1">具體對策：</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li>拓寬受眾標籤包 (Lookalike 3%–5%)</li>
              <li>改善素材吸引力提升平台品質分數</li>
              <li>在大促前 2 個月累積名單避開尖峰競價</li>
            </ul>
          </div>
        </div>

        {/* Card 2: CTR Action */}
        <div className={`p-4 rounded-xl border transition-all ${
          ctrSeverity === 'high' ? 'bg-rose-50/70 border-rose-300 shadow-xs' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">若 CTR 下降</span>
            {ctrSeverity === 'high' && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                主要拖累因素
              </span>
            )}
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>可能根因：</strong>素材疲乏、文案切角鈍化、受眾看膩。</p>
            <p className="text-slate-800 font-semibold pt-1">具體對策：</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li>每 2–4 週強制輪替視覺主圖與文案標題</li>
              <li>短影音重剪開頭 3 秒 Hook 衝突懸念</li>
              <li>A/B 測試「數字型利益」vs「痛點共鳴」</li>
            </ul>
          </div>
        </div>

        {/* Card 3: CVR Action */}
        <div className={`p-4 rounded-xl border transition-all ${
          cvrSeverity === 'high' ? 'bg-rose-50/70 border-rose-300 shadow-xs' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">若 CVR 下降</span>
            {cvrSeverity === 'high' && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                主要拖累因素
              </span>
            )}
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>可能根因：</strong>表單複雜、缺乏信任背書、價格突兀、著陸頁載入太慢。</p>
            <p className="text-slate-800 font-semibold pt-1">具體對策：</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li>減少表單欄位至最核心 3–4 項</li>
              <li>加入客戶真實評價、證言與商標背書</li>
              <li>提供無風險退款保證與免運門檻</li>
            </ul>
          </div>
        </div>

        {/* Card 4: AOV Action */}
        <div className={`p-4 rounded-xl border transition-all ${
          aovSeverity === 'high' ? 'bg-rose-50/70 border-rose-300 shadow-xs' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">若 AOV 下降</span>
            {aovSeverity === 'high' && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                主要拖累因素
              </span>
            )}
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>可能根因：</strong>只購買單一低價引流品，缺乏客單拉升階梯。</p>
            <p className="text-slate-800 font-semibold pt-1">具體對策：</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
              <li>設計組合包與買 2 送 1 配套方案</li>
              <li>在購物車與結帳頁加入「一鍵加購」模組</li>
              <li>設定滿額免運或滿額贈禮門檻</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
