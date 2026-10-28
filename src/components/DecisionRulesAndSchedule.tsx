import React, { useState } from 'react';
import { 
  MARKETING_BUDGET_DECISION_RULES, 
  MONITORING_FREQUENCY_SCHEDULE, 
  KEYWORD_METRIC_CATALOG 
} from '../data/marketingFrameworkData';
import { 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Search, 
  Compass, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const DecisionRulesAndSchedule: React.FC = () => {
  const [subTab, setSubTab] = useState<'budget_rules' | 'monitoring_schedule' | 'metric_catalog'>('budget_rules');
  const [catalogSearch, setCatalogSearch] = useState('');

  const filteredCatalog = KEYWORD_METRIC_CATALOG.filter((item) =>
    item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    item.formula.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    item.layer.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    item.action.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">決策規則引擎、五級監控頻率與指標手冊</h2>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-semibold">
              Sheet 2 & Sheet 8
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            收錄行銷預算<strong>加減碼 9 大鐵律</strong>、關鍵字<strong>四象限決策</strong>、<strong>即時/每日/每週/每月/每季/每年監控警示條件</strong>以及全套 49 項關鍵字指標定義庫。
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
          <button
            onClick={() => setSubTab('budget_rules')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              subTab === 'budget_rules' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            預算決策 9 大規則
          </button>
          <button
            onClick={() => setSubTab('monitoring_schedule')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              subTab === 'monitoring_schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            五級監控頻率與警示
          </button>
          <button
            onClick={() => setSubTab('metric_catalog')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              subTab === 'metric_catalog' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            49 項指標定義庫 (Sheet 2)
          </button>
        </div>
      </div>

      {/* Subtab 1: Budget Decision Rules */}
      {subTab === 'budget_rules' && (
        <div className="space-y-6">
          {/* 9 Budget Rules */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
              <span>第九節：預算與投放決策規則 (Budget & Bidding Rules)</span>
              <span className="text-[10px] text-slate-500 font-normal">杜絕憑直覺盲目調價，依硬性財務指標執行</span>
            </div>

            <div className="divide-y divide-slate-100">
              {MARKETING_BUDGET_DECISION_RULES.map((rule, idx) => (
                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                        Rule 0{idx + 1}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{rule.condition}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-1">
                      {rule.action}
                    </p>
                  </div>

                  <span className={`self-start sm:self-center px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                    rule.tag === '加碼擴量'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : rule.tag === '減碼止血'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : rule.tag === '素材輪替'
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {rule.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword 4 Quadrant Rules Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <div className="font-bold text-xs text-emerald-900">主力字 (高價值、排名好/ROAS高)</div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                守住排名，定期更新內容；付費部分可以加碼到曝光比重上限。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
              <div className="font-bold text-xs text-blue-900">機會字 (高價值、排名差/ROAS低)</div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                付費先撐住流量，同時全力投入 SEO 內容；改善品質分數與著陸頁。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-xs text-slate-900">流量字 (低價值、排名好)</div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                不額外投入資源，在頁面加上轉換路徑與導購錨點，導向高價值內容。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5">
              <div className="font-bold text-xs text-rose-900">放棄字 (低價值、排名差)</div>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                停止付費投放，設為否定字，不再花費時間製作或更新無效內容。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Monitoring Schedule */}
      {subTab === 'monitoring_schedule' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
            <span>第十節：監控頻率與建議警示條件 (Monitoring Schedule & SLA)</span>
            <span className="text-[10px] text-slate-500 font-normal">分層管理，確保異常第一時間攔截</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                  <th className="p-3 w-28">監控頻率</th>
                  <th className="p-3">主要監控項目</th>
                  <th className="p-3">觸發警示條件</th>
                  <th className="p-3 w-44">處理 SLA 要求</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {MONITORING_FREQUENCY_SCHEDULE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs">
                        {item.frequency}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-slate-700 leading-relaxed">
                      {item.items}
                    </td>
                    <td className="p-3 text-[11px] font-semibold text-rose-700">
                      {item.alertTrigger}
                    </td>
                    <td className="p-3 text-[11px] text-slate-500 font-mono">
                      {item.sla}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: 49 Metric Catalog (Sheet 2) */}
      {subTab === 'metric_catalog' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="搜尋指標名稱、層級、公式或行動..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              />
            </div>
            <span className="text-xs text-slate-500">
              共 <strong>{KEYWORD_METRIC_CATALOG.length}</strong> 項完整指標，已收錄於 Excel Sheet 2
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                    <th className="p-3 w-16">代碼</th>
                    <th className="p-3 w-32">所屬層級</th>
                    <th className="p-3 w-36">指標名稱</th>
                    <th className="p-3">計算公式／定義</th>
                    <th className="p-3">高／低代表意義</th>
                    <th className="p-3">具體行動</th>
                    <th className="p-3 w-28">資料來源</th>
                    <th className="p-3 w-20">頻率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCatalog.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900 text-[11px]">
                        {item.code}
                      </td>
                      <td className="p-3 text-[11px] text-slate-500 font-semibold">
                        {item.layer}
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {item.name}
                      </td>
                      <td className="p-3 text-[11px] font-mono text-slate-800">
                        {item.formula}
                      </td>
                      <td className="p-3 text-[11px] text-slate-600">
                        {item.highLowMeaning}
                      </td>
                      <td className="p-3 text-[11px] text-blue-700 font-semibold">
                        {item.action}
                      </td>
                      <td className="p-3 text-[10px] text-slate-400">
                        {item.dataSource}
                      </td>
                      <td className="p-3 text-[10px] text-slate-500 font-mono">
                        {item.frequency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
