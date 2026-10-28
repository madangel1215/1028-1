import React, { useState } from 'react';
import { SeoPerformanceRow } from '../types';
import { MOCK_SEO_PERFORMANCE_DATA } from '../data/marketingFrameworkData';
import { 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Bot, 
  Layers, 
  FileWarning, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export const SeoPerformanceView: React.FC = () => {
  const [data, setData] = useState<SeoPerformanceRow[]>(MOCK_SEO_PERFORMANCE_DATA);
  const [filterBrand, setFilterBrand] = useState<'all' | 'brand' | 'non_brand'>('all');

  const filtered = data.filter((row) => {
    if (filterBrand === 'brand') return row.isBrand;
    if (filterBrand === 'non_brand') return !row.isBrand;
    return true;
  });

  // 匯總指標
  const totalClicks = data.reduce((acc, r) => acc + r.clicks, 0);
  const nonBrandClicks = data.filter((r) => !r.isBrand).reduce((acc, r) => acc + r.clicks, 0);
  const nonBrandRatio = totalClicks > 0 ? (nonBrandClicks / totalClicks) * 100 : 0;

  // 排名分佈
  const rank1to3 = data.filter((r) => r.currentRank >= 1 && r.currentRank <= 3).length;
  const rank4to10 = data.filter((r) => r.currentRank >= 4 && r.currentRank <= 10).length;
  const rank11to20 = data.filter((r) => r.currentRank >= 11 && r.currentRank <= 20).length;
  const rankOver20 = data.filter((r) => r.currentRank > 20 || r.currentRank === 0).length;

  // 內耗數量
  const cannibalizationCount = data.filter((r) => r.hasCannibalization).length;
  const zeroClickCount = data.filter((r) => r.zeroClickSignal).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">SEO 成效層儀表板 (Search Console + GA4)</h2>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
              Sheet 4 成效追蹤
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            自動計算 <strong>CTR 差距 (實際 vs 基準)</strong>、偵測<strong>關鍵字內耗 (Cannibalization)</strong>與<strong>零點擊訊號</strong>，並追蹤非品牌自然流量佔比與排名分佈。
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => setFilterBrand('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterBrand === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              全部字詞 ({data.length})
            </button>
            <button
              onClick={() => setFilterBrand('non_brand')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterBrand === 'non_brand' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              非品牌字 ({data.filter(r => !r.isBrand).length})
            </button>
            <button
              onClick={() => setFilterBrand('brand')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterBrand === 'brand' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              品牌字 ({data.filter(r => r.isBrand).length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Summary Strips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* 1. 非品牌佔比 */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">非品牌流量佔比</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
            {nonBrandRatio.toFixed(1)}%
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            {nonBrandRatio >= 40 ? '✓ 拓新體質健康 (>40%)' : '⚠ 偏低，SEO多為既有客'}
          </div>
        </div>

        {/* 2. 排名前 3 名 */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">前 1–3 名關鍵字</div>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">
            {rank1to3} 個
          </div>
          <div className="text-[10px] text-slate-400">搶佔大宗點擊版位</div>
        </div>

        {/* 3. 4-10 名首頁 */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">第 4–10 名首頁字</div>
          <div className="text-lg font-bold font-mono text-blue-700 mt-0.5">
            {rank4to10} 個
          </div>
          <div className="text-[10px] text-slate-400">衝刺前 3 名潛力股</div>
        </div>

        {/* 4. 11-20 名快速獲勝 */}
        <div className="p-3 bg-white rounded-xl border border-amber-200 bg-amber-50/40 shadow-2xs">
          <div className="text-[11px] text-amber-800 font-semibold">11–20 名快速獲勝</div>
          <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">
            {rank11to20} 個
          </div>
          <div className="text-[10px] text-amber-600">優化最快見效族群</div>
        </div>

        {/* 5. 關鍵字內耗警示 */}
        <div className={`p-3 rounded-xl border shadow-2xs ${
          cannibalizationCount > 0 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-white border-slate-200'
        }`}>
          <div className="text-[11px] font-semibold">關鍵字內耗偵測</div>
          <div className="text-lg font-bold font-mono text-rose-700 mt-0.5">
            {cannibalizationCount} 起
          </div>
          <div className="text-[10px] text-rose-600">多頁輪流排名互相拉扯</div>
        </div>

        {/* 6. 零點擊訊號 */}
        <div className="p-3 bg-white rounded-xl border border-purple-200 bg-purple-50/30 shadow-2xs">
          <div className="text-[11px] text-purple-900 font-semibold">零點擊訊號</div>
          <div className="text-lg font-bold font-mono text-purple-700 mt-0.5">
            {zeroClickCount} 個
          </div>
          <div className="text-[10px] text-purple-600">受 AI 摘要攔截點擊</div>
        </div>
      </div>

      {/* SEO Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                <th className="p-3">關鍵字與頁面 URL</th>
                <th className="p-3 text-right">搜尋曝光</th>
                <th className="p-3 text-right">點擊數</th>
                <th className="p-3 text-center">排名 (變化)</th>
                <th className="p-3 text-right">實際 CTR</th>
                <th className="p-3 text-right">預期 CTR</th>
                <th className="p-3 text-center">CTR 差距 (Gap)</th>
                <th className="p-3 text-right">自然 CVR</th>
                <th className="p-3 text-right">帶來營收</th>
                <th className="p-3">異常診斷與行動</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((row) => {
                const rankDelta = row.prevRank - row.currentRank; // 正數代表進步
                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {/* Keyword & URL */}
                    <td className="p-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{row.keyword}</span>
                        {row.isBrand && (
                          <span className="text-[9px] px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                            品牌
                          </span>
                        )}
                        {row.zeroClickSignal && (
                          <span className="text-[9px] px-1 py-0.2 bg-purple-50 text-purple-700 border border-purple-200 rounded" title="曝光增但點擊受AI摘要截流">
                            零點擊訊號
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-xs">
                        {row.pageUrl} · 更新於 {row.freshnessDays} 天前
                      </div>
                    </td>

                    {/* Impressions */}
                    <td className="p-3 text-right font-mono tabular-nums">
                      {row.impressions.toLocaleString()}
                    </td>

                    {/* Clicks */}
                    <td className="p-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {row.clicks.toLocaleString()}
                    </td>

                    {/* Rank */}
                    <td className="p-3 text-center font-mono">
                      <div className="inline-flex items-center gap-1">
                        <span className="font-bold text-slate-900">#{row.currentRank}</span>
                        {rankDelta > 0 ? (
                          <span className="text-[10px] text-emerald-600 font-bold">▲{rankDelta}</span>
                        ) : rankDelta < 0 ? (
                          <span className="text-[10px] text-rose-600 font-bold">▼{Math.abs(rankDelta)}</span>
                        ) : (
                          <span className="text-[10px] text-slate-400">-</span>
                        )}
                      </div>
                    </td>

                    {/* Actual CTR */}
                    <td className="p-3 text-right font-mono tabular-nums">
                      {row.ctr.toFixed(1)}%
                    </td>

                    {/* Expected CTR */}
                    <td className="p-3 text-right font-mono tabular-nums text-slate-400">
                      {row.expectedCtr.toFixed(1)}%
                    </td>

                    {/* CTR Gap */}
                    <td className="p-3 text-center font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        row.ctrGap < -1.5
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : row.ctrGap > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'text-slate-600'
                      }`}>
                        {row.ctrGap > 0 ? `+${row.ctrGap.toFixed(1)}%` : `${row.ctrGap.toFixed(1)}%`}
                      </span>
                    </td>

                    {/* Organic CVR */}
                    <td className="p-3 text-right font-mono tabular-nums text-blue-600 font-bold">
                      {row.organicCvr.toFixed(1)}%
                    </td>

                    {/* Revenue */}
                    <td className="p-3 text-right font-mono tabular-nums font-bold text-slate-900">
                      ${row.monthlyRevenue.toLocaleString()}
                    </td>

                    {/* Diagnostics */}
                    <td className="p-3 text-[11px] text-slate-600">
                      {row.hasCannibalization ? (
                        <div className="p-1.5 bg-rose-50 border border-rose-200 rounded text-rose-800">
                          <strong className="block text-[10px] font-bold">⚠ 關鍵字內耗嚴重：</strong>
                          <span>{row.cannibalizationUrls.join(' 與 ')} 互搶排名，建議合併頁面並設定 canonical</span>
                        </div>
                      ) : row.ctrGap < -2.0 ? (
                        <div className="text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                          <strong>CTR 顯著為負：</strong> 排名好但標題描述不吸引人，建議改寫 Title 加入數字與具體利益
                        </div>
                      ) : row.currentRank >= 11 && row.currentRank <= 20 ? (
                        <div className="text-blue-800 bg-blue-50 p-1.5 rounded border border-blue-200">
                          <strong>快速獲勝字：</strong> 補足最新段落與內部連結，預計 2 週內挺進首頁
                        </div>
                      ) : (
                        <span className="text-slate-500">成效表現穩定，持續保持內容新鮮度</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
