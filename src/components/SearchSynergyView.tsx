import React, { useState } from 'react';
import { SearchSynergyRow } from '../types';
import { MOCK_SEARCH_SYNERGY_DATA } from '../data/marketingFrameworkData';
import { 
  GitMerge, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp,
  Percent
} from 'lucide-react';

export const SearchSynergyView: React.FC = () => {
  const [data, setData] = useState<SearchSynergyRow[]>(MOCK_SEARCH_SYNERGY_DATA);

  // 匯總計算
  const totalVolume = data.reduce((acc, r) => acc + r.searchVolume, 0);
  const totalPaidClicks = data.reduce((acc, r) => acc + r.paidClicks, 0);
  const totalOrganicClicks = data.reduce((acc, r) => acc + r.organicClicks, 0);
  const overallSearchShare = totalVolume > 0 ? ((totalPaidClicks + totalOrganicClicks) / totalVolume) * 100 : 0;

  const totalPaidSpend = data.reduce((acc, r) => acc + r.paidSpend, 0);
  const totalSeoCost = data.reduce((acc, r) => acc + r.seoAllocatedCost, 0);
  const totalConversions = data.reduce((acc, r) => acc + r.totalConversions, 0);
  const blendedSearchCpa = totalConversions > 0 ? Math.round((totalPaidSpend + totalSeoCost) / totalConversions) : 0;

  // SEO 接手率
  const takeoverCount = data.filter(r => r.isSeoTakeover).length;
  const takeoverRate = Math.round((takeoverCount / data.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">SEO 與付費搜尋協同效應 (Search Synergy & Cannibalization)</h2>
            <span className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded border border-cyan-200 font-semibold">
              Sheet 7 搜尋協同
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            避免「左手打右手」為已拿得到的自然點擊重複付費。追蹤<strong>SEO 接手率</strong>、<strong>搜尋總佔比</strong>與<strong>搜尋總 CPA</strong>，指引雙佔暫停測試。
          </p>
        </div>
      </div>

      {/* 4 Synergy Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SEO Takeover Rate */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">SEO 接手率 (Takeover Rate)</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            {takeoverRate}%
          </div>
          <div className="text-[10px] text-emerald-600 mt-1 font-semibold">
            {takeoverCount}/{data.length} 主力字自然已挺進前 3 名
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            可逐步調降付費預算轉往新詞測試
          </div>
        </div>

        {/* Search SERP Dominance */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">搜尋結果頁總佔比 (SERP Share)</div>
          <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
            {overallSearchShare.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            付費 {totalPaidClicks.toLocaleString()} + 自然 {totalOrganicClicks.toLocaleString()} 點擊
          </div>
          <div className="text-[10px] text-blue-600 mt-1 font-semibold">
            霸佔首頁上方位與首位自然連結
          </div>
        </div>

        {/* Blended Search CPA */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">搜尋總 CPA (Blended Search CPA)</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            ${blendedSearchCpa}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            付費 ${totalPaidSpend.toLocaleString()} + SEO投入 ${totalSeoCost.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-600 mt-1 font-semibold">
            全渠道獲客總轉換: {totalConversions} 筆
          </div>
        </div>

        {/* Action Strategy */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1.5">
          <div className="text-[11px] text-slate-500 font-medium">雙佔暫停測試準則</div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            若同一個字付費與自然皆在前 3 名，暫停付費廣告 14 天進行 A/B 測試。若總點擊未明顯下滑，代表為虛增流量，可省下廣告費。
          </p>
        </div>
      </div>

      {/* Synergy Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                <th className="p-3">關鍵字</th>
                <th className="p-3 text-right">月搜尋量</th>
                <th className="p-3 text-center">付費排名 / 自然排名</th>
                <th className="p-3 text-center">雙佔前 3 名</th>
                <th className="p-3 text-center">SEO已接手</th>
                <th className="p-3 text-right">付費點擊</th>
                <th className="p-3 text-right">自然點擊</th>
                <th className="p-3 text-right">搜尋總佔比</th>
                <th className="p-3 text-right">綜合搜尋 CPA</th>
                <th className="p-3 min-w-[220px]">協同決策行動</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    {row.keyword}
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums">
                    {row.searchVolume.toLocaleString()}
                  </td>
                  <td className="p-3 text-center font-mono">
                    <span className="font-bold text-blue-700">Ad #{row.paidRank}</span>
                    <span className="text-slate-400 mx-1.5">/</span>
                    <span className="font-bold text-emerald-700">Org #{row.organicRank}</span>
                  </td>
                  <td className="p-3 text-center">
                    {row.isDualTop3 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        雙佔前3名
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.isSeoTakeover ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ 已接手
                      </span>
                    ) : (
                      <span className="text-slate-400">培育中</span>
                    )}
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums text-blue-600 font-semibold">
                    {row.paidClicks.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums text-emerald-600 font-semibold">
                    {row.organicClicks.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {row.totalSearchShare.toFixed(1)}%
                  </td>
                  <td className="p-3 text-right font-mono tabular-nums font-bold">
                    ${row.blendedSearchCpa}
                  </td>
                  <td className="p-3 text-[11px] text-slate-600">
                    {row.suggestedAction}
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
