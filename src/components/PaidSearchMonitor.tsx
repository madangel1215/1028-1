import React, { useState } from 'react';
import { PaidKeywordRow } from '../types';
import { MOCK_PAID_KEYWORD_DATA } from '../data/marketingFrameworkData';
import { 
  DollarSign, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Ban, 
  TrendingUp, 
  Layers, 
  Sliders,
  Plus
} from 'lucide-react';

export const PaidSearchMonitor: React.FC = () => {
  const [data, setData] = useState<PaidKeywordRow[]>(MOCK_PAID_KEYWORD_DATA);
  const [negativeKeywords, setNegativeKeywords] = useState<string[]>([
    '免費', '破解', '下載', '教學ppt', '徵才職缺', '考古題', '論文範例', '開源代碼'
  ]);
  const [newNegative, setNewNegative] = useState('');

  // 總計指標
  const totalSpend = data.reduce((acc, r) => acc + r.spend, 0);
  const zeroConvSpend = data.reduce((acc, r) => acc + r.zeroConversionSpend, 0);
  const totalWasteRatio = totalSpend > 0 ? (zeroConvSpend / totalSpend) * 100 : 0;

  // 品牌 vs 非品牌
  const brandSpend = data.filter((r) => r.brandType === 'brand').reduce((acc, r) => acc + r.spend, 0);
  const nonBrandSpend = data.filter((r) => r.brandType === 'non_brand').reduce((acc, r) => acc + r.spend, 0);
  const brandConversions = data.filter((r) => r.brandType === 'brand').reduce((acc, r) => acc + r.conversions, 0);
  const nonBrandConversions = data.filter((r) => r.brandType === 'non_brand').reduce((acc, r) => acc + r.conversions, 0);

  const brandRoas = brandSpend > 0 ? Math.round((brandConversions * 2800 / brandSpend) * 100) : 0;
  const nonBrandRoas = nonBrandSpend > 0 ? Math.round((nonBrandConversions * 2800 / nonBrandSpend) * 100) : 0;

  const handleAddNegative = () => {
    if (!newNegative.trim()) return;
    setNegativeKeywords([...negativeKeywords, newNegative.trim()]);
    setNewNegative('');
  };

  const handleRemoveNegative = (kw: string) => {
    setNegativeKeywords(negativeKeywords.filter((k) => k !== kw));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">付費搜尋關鍵字監控 (Google Ads Intelligence)</h2>
            <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-200 font-semibold">
              Sheet 5 付費關鍵字
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            剖析 <strong>品質分數 (QS 1–10)</strong> 三大要素、嚴控<strong>浪費花費比 (Waste Spend Ratio)</strong>、拆解曝光流失原因並管理<strong>共用否定關鍵字庫</strong>。
          </p>
        </div>

        {/* Waste Spend Warning Pill */}
        <div className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
          totalWasteRatio > 15 ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <AlertTriangle className={`w-5 h-5 shrink-0 ${totalWasteRatio > 15 ? 'text-rose-600' : 'text-slate-500'}`} />
          <div>
            <div className="font-bold">
              全站浪費花費比: <span className="font-mono">{totalWasteRatio.toFixed(1)}%</span>
            </div>
            <div className="text-[10px] text-slate-500">
              {totalWasteRatio > 15 ? '⚠ 超過 15% 警示門檻！有大量零轉換搜尋詞' : '✓ 浪費花費比在 15% 安全區間'}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards: Brand vs Non-Brand & QS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand ROAS */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">品牌字廣告 ROAS</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            {brandRoas}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            花費: ${brandSpend.toLocaleString()} · 轉換: {brandConversions}
          </div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1">
            高ROAS為自然買氣，用低出價防守即可
          </div>
        </div>

        {/* Non-Brand ROAS */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">非品牌字廣告 ROAS (真實擴展)</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">
            {nonBrandRoas}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            花費: ${nonBrandSpend.toLocaleString()} · 轉換: {nonBrandConversions}
          </div>
          <div className="text-[10px] text-slate-500 font-semibold mt-1">
            公司主要成長預算所在，衡量拉新能耐
          </div>
        </div>

        {/* Waste Spend Sum */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">累積零轉換浪費花費</div>
          <div className="text-xl font-bold font-mono text-rose-600 mt-1">
            ${zeroConvSpend.toLocaleString()}
          </div>
          <div className="text-[10px] text-rose-700 font-semibold mt-1">
            累計花費超標但 0 成交之詞組
          </div>
        </div>

        {/* Match Type Breakdown */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">比對類型預算分配</div>
          <div className="flex items-center justify-between text-[11px]">
            <span>完全比對 (Exact):</span>
            <span className="font-mono font-bold text-slate-900">42% (ROAS 620%)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>詞組比對 (Phrase):</span>
            <span className="font-mono font-bold text-slate-900">38% (ROAS 485%)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>廣泛比對 (Broad):</span>
            <span className="font-mono font-bold text-rose-600">20% (ROAS 165%)</span>
          </div>
        </div>
      </div>

      {/* Paid Search Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                <th className="p-3">付費關鍵字</th>
                <th className="p-3 text-center">品質分數 (QS)</th>
                <th className="p-3 text-center">預期點閱 / 相關性 / 到達頁</th>
                <th className="p-3 text-right">當期花費</th>
                <th className="p-3 text-right">CPA</th>
                <th className="p-3 text-right">ROAS</th>
                <th className="p-3 text-center">曝光流失 (預算 / 排名)</th>
                <th className="p-3 text-center">浪費花費比</th>
                <th className="p-3 text-center">投放狀態判定</th>
                <th className="p-3 min-w-[200px]">具體行動</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {/* Keyword */}
                  <td className="p-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{row.keyword}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({row.matchType === 'exact' ? '完全' : row.matchType === 'phrase' ? '詞組' : '廣泛'})
                      </span>
                    </div>
                  </td>

                  {/* Quality Score */}
                  <td className="p-3 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      row.qualityScore >= 7
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.qualityScore >= 5
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {row.qualityScore}/10
                    </span>
                  </td>

                  {/* 3 Sub-ratings */}
                  <td className="p-3 text-center font-mono text-[10px]">
                    <div className="flex items-center justify-center gap-1">
                      <span className={row.expectedCtrRating === 'above' ? 'text-emerald-600 font-bold' : row.expectedCtrRating === 'below' ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                        {row.expectedCtrRating === 'above' ? '高' : row.expectedCtrRating === 'below' ? '低' : '均'}
                      </span>
                      <span>/</span>
                      <span className={row.adRelevanceRating === 'above' ? 'text-emerald-600 font-bold' : row.adRelevanceRating === 'below' ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                        {row.adRelevanceRating === 'above' ? '高' : row.adRelevanceRating === 'below' ? '低' : '均'}
                      </span>
                      <span>/</span>
                      <span className={row.lpExperienceRating === 'above' ? 'text-emerald-600 font-bold' : row.lpExperienceRating === 'below' ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                        {row.lpExperienceRating === 'above' ? '高' : row.lpExperienceRating === 'below' ? '低' : '均'}
                      </span>
                    </div>
                  </td>

                  {/* Spend */}
                  <td className="p-3 text-right font-mono tabular-nums">
                    ${row.spend.toLocaleString()}
                  </td>

                  {/* CPA */}
                  <td className="p-3 text-right font-mono tabular-nums text-slate-900 font-semibold">
                    {row.conversions > 0 ? `$${row.cpa.toLocaleString()}` : '-'}
                  </td>

                  {/* ROAS */}
                  <td className="p-3 text-right font-mono tabular-nums font-bold">
                    {row.roas > 0 ? (
                      <span className={row.roas >= 400 ? 'text-emerald-700' : 'text-amber-700'}>
                        {row.roas}%
                      </span>
                    ) : (
                      <span className="text-slate-400">0%</span>
                    )}
                  </td>

                  {/* Lost IS (Budget / Rank) */}
                  <td className="p-3 text-center font-mono text-[11px] text-slate-500">
                    <span className={row.lostIsBudget > 10 ? 'text-amber-600 font-bold' : ''}>
                      {row.lostIsBudget}%
                    </span>
                    <span> / </span>
                    <span className={row.lostIsRank > 20 ? 'text-rose-600 font-bold' : ''}>
                      {row.lostIsRank}%
                    </span>
                  </td>

                  {/* Waste Spend Ratio */}
                  <td className="p-3 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.wasteSpendRatio > 15
                        ? 'bg-rose-100 text-rose-800'
                        : 'text-slate-600'
                    }`}>
                      {row.wasteSpendRatio.toFixed(1)}%
                    </span>
                  </td>

                  {/* Action Status Pill */}
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === 'scale'
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.status === 'optimize'
                        ? 'bg-amber-100 text-amber-800'
                        : row.status === 'brand_defense'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {row.status === 'scale' && '加碼擴量'}
                      {row.status === 'optimize' && '著陸優化'}
                      {row.status === 'brand_defense' && '品牌防守'}
                      {row.status === 'negate' && '設否定詞'}
                      {row.status === 'pause' && '暫停廣告'}
                    </span>
                  </td>

                  {/* Action Note */}
                  <td className="p-3 text-[11px] text-slate-600">
                    {row.actionNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Negative Keyword Management Box */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              共用否定關鍵字清單庫 (Negative Keywords List)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="新增否定字 (如: 免費)..."
              value={newNegative}
              onChange={(e) => setNewNegative(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNegative()}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <button
              onClick={handleAddNegative}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs"
            >
              加入排除
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {negativeKeywords.map((neg) => (
            <span
              key={neg}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium"
            >
              <span>{neg}</span>
              <button
                onClick={() => handleRemoveNegative(neg)}
                className="text-slate-400 hover:text-rose-600 ml-1"
                title="移除"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="text-[11px] text-slate-500 mt-3">
          每週五清查搜尋字詞報表，累積花費超過「目標 CPA 的 1–2 倍」仍零轉換之字詞，一鍵導入此清單。
        </div>
      </div>
    </div>
  );
};
