import React, { useState } from 'react';
import { BaselineSettings } from '../types';
import { SlidersHorizontal, Info, ShieldAlert, CheckCircle2, DollarSign } from 'lucide-react';

interface BaselineControlsProps {
  settings: BaselineSettings;
  onChange: (updated: BaselineSettings) => void;
}

export const BaselineControls: React.FC<BaselineControlsProps> = ({ settings, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 計算核心財務線
  const gmDecimal = settings.grossMarginPct / 100;
  const netDecimal = settings.targetNetMarginPct / 100;

  // 損益平衡 ROAS: 1 / GM%
  const breakEvenRoas = gmDecimal > 0 ? (1 / gmDecimal) : 0;

  // 目標 ROAS: 1 / (GM% - NetMargin%)
  const denominator = gmDecimal - netDecimal;
  const targetRoas = denominator > 0 ? (1 / denominator) : 0;

  // 目標 CAC 上限: LTV / 3
  const targetCacCap = settings.targetLtv / 3;

  // 全成本加總
  const totalMarketingCost = 
    settings.mediaCost + 
    settings.productionCost + 
    settings.laborCost + 
    settings.toolsCost + 
    settings.agencyCost;

  const currentSpend = settings.costScope === 'media' ? settings.mediaCost : totalMarketingCost;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 mb-6 transition-all">
      {/* Top Banner Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Brand/Scope Info */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 text-white rounded-lg shrink-0">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">核心財務基準控制台 (Baseline Financial Benchmarks)</h2>
              <span className="text-[11px] text-slate-500 font-normal">
                所有 ROI 均以「毛利」計算，杜絕純營收假象
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5">
              <span>當前評估成本口徑:</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => onChange({ ...settings, costScope: 'media' })}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    settings.costScope === 'media'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  媒體成本 (純廣告費)
                </button>
                <button
                  onClick={() => onChange({ ...settings, costScope: 'total' })}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    settings.costScope === 'total'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  全成本 (廣告＋製作＋人力＋工具＋代理)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Golden Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {/* 1. 毛利率 */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">毛利率 (GM%)</div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              {settings.grossMarginPct}%
            </div>
            <div className="text-[10px] text-slate-400 truncate">扣除銷貨成本</div>
          </div>

          {/* 2. 損益平衡 ROAS */}
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
            <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
              <span>損益平衡 ROAS</span>
              <Info className="w-3 h-3" />
            </div>
            <div className="text-lg font-bold text-rose-700 font-mono tabular-nums">
              {breakEvenRoas.toFixed(2)}x
            </div>
            <div className="text-[10px] text-rose-600 truncate">低於此每投1元都在虧</div>
          </div>

          {/* 3. 目標 ROAS */}
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-semibold">目標 ROAS</div>
            <div className="text-lg font-bold text-emerald-700 font-mono tabular-nums">
              {targetRoas.toFixed(2)}x
            </div>
            <div className="text-[10px] text-emerald-600 truncate">含目標淨利 {settings.targetNetMarginPct}%</div>
          </div>

          {/* 4. 目標 CAC 上限 */}
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-[11px] text-blue-800 font-semibold">目標 CAC 上限</div>
            <div className="text-lg font-bold text-blue-700 font-mono tabular-nums">
              ${Math.round(targetCacCap).toLocaleString()}
            </div>
            <div className="text-[10px] text-blue-600 truncate">LTV ÷ 3 基準線</div>
          </div>
        </div>

        {/* Toggle Customizer Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>{isOpen ? '收起基準參數' : '自訂毛利與成本參數'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible Parameter Editor */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              產品毛利率 (%)
            </label>
            <input
              type="number"
              min="5"
              max="95"
              value={settings.grossMarginPct}
              onChange={(e) => onChange({ ...settings, grossMarginPct: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 font-semibold focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">公式: (營收 - 銷貨成本) / 營收</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">
              目標淨利率 (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={settings.targetNetMarginPct}
              onChange={(e) => onChange({ ...settings, targetNetMarginPct: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 font-semibold focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">加碼或減碼的重要判斷線</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">
              客戶終身價值 LTV (NT$)
            </label>
            <input
              type="number"
              step="500"
              value={settings.targetLtv}
              onChange={(e) => onChange({ ...settings, targetLtv: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 font-semibold focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">決定取得一位客戶最多花多少錢</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">
              純廣告媒體費 (NT$)
            </label>
            <input
              type="number"
              step="5000"
              value={settings.mediaCost}
              onChange={(e) => onChange({ ...settings, mediaCost: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Google / Meta 直接支出</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">
              行銷人力與工具 (NT$)
            </label>
            <input
              type="number"
              step="2000"
              value={settings.laborCost + settings.toolsCost}
              onChange={(e) => {
                const combined = Number(e.target.value) || 0;
                onChange({ ...settings, laborCost: Math.round(combined * 0.78), toolsCost: Math.round(combined * 0.22) });
              }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">人力 ${settings.laborCost.toLocaleString()} + 工具 ${settings.toolsCost.toLocaleString()}</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">
              製作與代理商 (NT$)
            </label>
            <input
              type="number"
              step="2000"
              value={settings.productionCost + settings.agencyCost}
              onChange={(e) => {
                const combined = Number(e.target.value) || 0;
                onChange({ ...settings, productionCost: Math.round(combined * 0.58), agencyCost: Math.round(combined * 0.42) });
              }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono text-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">素材製作 + 代理商服務費</span>
          </div>
        </div>
      )}
    </div>
  );
};
