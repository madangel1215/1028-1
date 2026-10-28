import React, { useState, useMemo } from 'react';
import { 
  KeywordMasterRow, 
  KeywordSettingConfig, 
  SearchIntent, 
  BrandAttribute, 
  FunnelStage, 
  QuadrantType 
} from '../types';
import { 
  MOCK_KEYWORD_MASTER_DATA, 
  DEFAULT_KEYWORD_SETTINGS 
} from '../data/marketingFrameworkData';
import { 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  HelpCircle,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

interface KeywordMasterTableProps {
  onAddKeyword?: (newKw: KeywordMasterRow) => void;
}

export const KeywordMasterTable: React.FC<KeywordMasterTableProps> = () => {
  const [settings, setSettings] = useState<KeywordSettingConfig>(DEFAULT_KEYWORD_SETTINGS);
  const [showConfig, setShowConfig] = useState(false);
  const [keywords, setKeywords] = useState<KeywordMasterRow[]>(MOCK_KEYWORD_MASTER_DATA);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFunnel, setSelectedFunnel] = useState<string>('all');
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('all');
  const [sortField, setSortField] = useState<'priorityScore' | 'estMonthlyValue' | 'monthlySearchVolume'>('priorityScore');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Keyword Form
  const [newKwName, setNewKwName] = useState('');
  const [newKwVolume, setNewKwVolume] = useState(3000);
  const [newKwIntent, setNewKwIntent] = useState<SearchIntent>('comparative');
  const [newKwBrand, setNewKwBrand] = useState<BrandAttribute>('non_brand');
  const [newKwFunnel, setNewKwFunnel] = useState<FunnelStage>('consideration');
  const [newKwKd, setNewKwKd] = useState(35);
  const [newKwCpc, setNewKwCpc] = useState(45);
  const [newKwRank, setNewKwRank] = useState(14);
  const [newKwAio, setNewKwAio] = useState(true);

  // 計算每個關鍵字的預估月價值與優先分數
  const enrichedKeywords = useMemo(() => {
    return keywords.map((kw) => {
      // 找出該排名的基準預期 CTR
      const foundBenchmark = settings.rankExpectedCtr.find((r) => r.rank === kw.currentRank);
      let estCtr = foundBenchmark ? foundBenchmark.ctr : (kw.currentRank <= 3 ? 15 : kw.currentRank <= 10 ? 4 : 1.2);
      
      // 若出現 AI 摘要，進行折減係數
      if (kw.hasAio) {
        estCtr = estCtr * settings.aioDiscountFactor;
      }

      const cvr = (kw.paidValidatedCvr || settings.defaultCvr) / 100;
      const profitPerConversion = kw.cpc * 18 * (settings.grossMarginPct / 100); // 粗估毛利價值
      const estValue = Math.round(kw.monthlySearchVolume * (estCtr / 100) * cvr * profitPerConversion);
      const kdDivisor = Math.max(kw.kd, 5);
      const priority = Math.round((estValue * kw.intentMatchScore) / kdDivisor);

      // 四象限判斷
      const isHighValue = estValue >= settings.highValueThreshold;
      const isGoodRank = kw.currentRank > 0 && kw.currentRank <= 5;
      let quadrant: QuadrantType = 'abandon';

      if (isHighValue && isGoodRank) {
        quadrant = 'core'; // 主力字
      } else if (isHighValue && !isGoodRank) {
        quadrant = 'opportunity'; // 機會字
      } else if (!isHighValue && isGoodRank) {
        quadrant = 'traffic'; // 流量字
      } else {
        quadrant = 'abandon'; // 放棄
      }

      const isQuickWin = kw.currentRank >= 11 && kw.currentRank <= 20;

      return {
        ...kw,
        estMonthlyValue: estValue,
        priorityScore: priority,
        quadrant,
        isQuickWin
      };
    });
  }, [keywords, settings]);

  // 計算前 20% 門檻
  const sortedByPriority = useMemo(() => {
    return [...enrichedKeywords].sort((a, b) => b.priorityScore - a.priorityScore);
  }, [enrichedKeywords]);

  const top20ThresholdIndex = Math.ceil(sortedByPriority.length * 0.2);
  const top20ScoreCutoff = sortedByPriority[top20ThresholdIndex - 1]?.priorityScore || 0;

  // 篩選與排序
  const filteredKeywords = useMemo(() => {
    return enrichedKeywords
      .filter((kw) => {
        if (search && !kw.keyword.toLowerCase().includes(search.toLowerCase())) return false;
        if (selectedIntent !== 'all' && kw.intent !== selectedIntent) return false;
        if (selectedBrand !== 'all' && kw.brandType !== selectedBrand) return false;
        if (selectedFunnel !== 'all' && kw.funnelStage !== selectedFunnel) return false;
        if (selectedQuadrant !== 'all' && kw.quadrant !== selectedQuadrant) return false;
        return true;
      })
      .sort((a, b) => b[sortField] - a[sortField]);
  }, [enrichedKeywords, search, selectedIntent, selectedBrand, selectedFunnel, selectedQuadrant, sortField]);

  // 新增關鍵字處理
  const handleAddNewKeyword = () => {
    if (!newKwName.trim()) return;
    const newRow: KeywordMasterRow = {
      id: `kw-${Date.now()}`,
      keyword: newKwName.trim(),
      intent: newKwIntent,
      brandType: newKwBrand,
      funnelStage: newKwFunnel,
      monthlySearchVolume: Number(newKwVolume) || 1000,
      intentMatchScore: 4,
      bizRelevanceScore: 4,
      kd: Number(newKwKd) || 20,
      cpc: Number(newKwCpc) || 30,
      trendQuarterly: 10,
      hasAio: newKwAio,
      hasShopping: false,
      hasMap: false,
      currentRank: Number(newKwRank) || 15,
      currentCtr: 1.2,
      conversionsMonthly: 5,
      estMonthlyValue: 0,
      priorityScore: 0,
      isTop20Pct: false,
      quadrant: 'opportunity',
      suggestedAction: '新加入關鍵字：進行 SEO 結構排程與著陸頁對齊',
      isQuickWin: newKwRank >= 11 && newKwRank <= 20,
      isDualDominance: false
    };

    setKeywords([newRow, ...keywords]);
    setShowAddModal(false);
    setNewKwName('');
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">關鍵字主表與優先級決策矩陣 (Keyword Master & Matrix)</h2>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-semibold">
              Sheet 3 核心工作表
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            輸入搜尋量、CPC、難度 KD、意圖吻合度後，自動計算<strong>預估月價值</strong>、<strong>優先分數</strong>，並自動將前 20% 高優先級標綠色與歸類四象限。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>關鍵字參數設定</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增關鍵字</span>
          </button>
        </div>
      </div>

      {/* Collapsible Settings Config Strip (Sheet 1) */}
      {showConfig && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs animate-in fade-in duration-150">
          <div className="font-bold text-slate-800 mb-3 flex items-center justify-between">
            <span>關鍵字基準設定 (Sheet 1: Keyword Settings)</span>
            <span className="text-[10px] text-slate-500">動態影響預估月價值與四象限判定</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="text-slate-600 block mb-1">預設轉換率 (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.defaultCvr}
                onChange={(e) => setSettings({ ...settings, defaultCvr: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">毛利率 (%)</label>
              <input
                type="number"
                value={settings.grossMarginPct}
                onChange={(e) => setSettings({ ...settings, grossMarginPct: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">高價值門檻 (NT$/月)</label>
              <input
                type="number"
                step="5000"
                value={settings.highValueThreshold}
                onChange={(e) => setSettings({ ...settings, highValueThreshold: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">AI 摘要點擊折減率</label>
              <input
                type="number"
                step="0.05"
                value={settings.aioDiscountFactor}
                onChange={(e) => setSettings({ ...settings, aioDiscountFactor: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
              <span className="text-[10px] text-slate-400">目前折減 35% (留存 65%)</span>
            </div>
            <div>
              <label className="text-slate-600 block mb-1">目標 CPA (NT$)</label>
              <input
                type="number"
                value={settings.targetCpa}
                onChange={(e) => setSettings({ ...settings, targetCpa: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">浪費花費比警示 (%)</label>
              <input
                type="number"
                value={settings.wasteSpendAlertThreshold}
                onChange={(e) => setSettings({ ...settings, wasteSpendAlertThreshold: Number(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 border border-slate-300 rounded font-mono text-slate-900 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋關鍵字名稱..."
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Intent */}
          <select
            value={selectedIntent}
            onChange={(e) => setSelectedIntent(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">全部搜尋意圖</option>
            <option value="informational">資訊型</option>
            <option value="comparative">比較型</option>
            <option value="transactional">交易型</option>
            <option value="navigational">導航型</option>
          </select>

          {/* Brand */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">全部品牌屬性</option>
            <option value="brand">品牌字</option>
            <option value="non_brand">非品牌字</option>
            <option value="competitor">競品字</option>
          </select>

          {/* Quadrant */}
          <select
            value={selectedQuadrant}
            onChange={(e) => setSelectedQuadrant(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">全部四象限</option>
            <option value="core">主力字 (高價值/好排名)</option>
            <option value="opportunity">機會字 (高價值/差排名)</option>
            <option value="traffic">流量字 (低價值/好排名)</option>
            <option value="abandon">放棄 (低價值/差排名)</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setSortField('priorityScore')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                sortField === 'priorityScore' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              依優先分數
            </button>
            <button
              onClick={() => setSortField('estMonthlyValue')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                sortField === 'estMonthlyValue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              依預估月價值
            </button>
            <button
              onClick={() => setSortField('monthlySearchVolume')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                sortField === 'monthlySearchVolume' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              依月搜尋量
            </button>
          </div>
        </div>
      </div>

      {/* Master Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[10px] uppercase tracking-wider">
                <th className="p-3">關鍵字名稱</th>
                <th className="p-3">分類屬性 (意圖/品牌/漏斗)</th>
                <th className="p-3 text-right">月搜尋量</th>
                <th className="p-3 text-right">CPC</th>
                <th className="p-3 text-center">KD難度</th>
                <th className="p-3 text-center">目前排名</th>
                <th className="p-3 text-right">預估月價值</th>
                <th className="p-3 text-right">優先分數</th>
                <th className="p-3 text-center">四象限分類</th>
                <th className="p-3 min-w-[220px]">建議行動</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredKeywords.map((kw) => {
                const isTop20 = kw.priorityScore >= top20ScoreCutoff && kw.priorityScore > 0;
                return (
                  <tr
                    key={kw.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isTop20 ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Keyword Name */}
                    <td className="p-3 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        {isTop20 && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="前 20% 高優先級" />
                        )}
                        <span>{kw.keyword}</span>
                        {kw.hasAio && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200" title="觸發 AI Overviews">
                            AI摘要
                          </span>
                        )}
                        {kw.isQuickWin && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200" title="11-20名快速獲勝">
                            快速獲勝
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Metadata tags */}
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <span>
                          {kw.intent === 'informational' && '資訊型'}
                          {kw.intent === 'comparative' && '比較型'}
                          {kw.intent === 'transactional' && '交易型'}
                          {kw.intent === 'navigational' && '導航型'}
                        </span>
                        <span>·</span>
                        <span>
                          {kw.brandType === 'brand' && '品牌字'}
                          {kw.brandType === 'non_brand' && '非品牌'}
                          {kw.brandType === 'competitor' && '競品字'}
                        </span>
                        <span>·</span>
                        <span>
                          {kw.funnelStage === 'awareness' && '認知'}
                          {kw.funnelStage === 'consideration' && '考慮'}
                          {kw.funnelStage === 'decision' && '決策'}
                        </span>
                      </div>
                    </td>

                    {/* Volume */}
                    <td className="p-3 text-right font-mono tabular-nums">
                      {kw.monthlySearchVolume.toLocaleString()}
                    </td>

                    {/* CPC */}
                    <td className="p-3 text-right font-mono tabular-nums text-slate-600">
                      ${kw.cpc}
                    </td>

                    {/* KD */}
                    <td className="p-3 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        kw.kd > 40 ? 'bg-rose-50 text-rose-700' : kw.kd > 25 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {kw.kd}
                      </span>
                    </td>

                    {/* Rank */}
                    <td className="p-3 text-center font-mono font-bold">
                      {kw.currentRank > 0 ? (
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          kw.currentRank <= 3 ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : kw.currentRank <= 10 ? 'text-blue-700 bg-blue-50' : 'text-slate-600'
                        }`}>
                          #{kw.currentRank}
                        </span>
                      ) : (
                        <span className="text-slate-400">&gt;100</span>
                      )}
                    </td>

                    {/* Est Monthly Value */}
                    <td className="p-3 text-right font-mono tabular-nums font-bold text-slate-900">
                      ${kw.estMonthlyValue.toLocaleString()}
                    </td>

                    {/* Priority Score */}
                    <td className="p-3 text-right font-mono tabular-nums font-extrabold">
                      <span className={isTop20 ? 'text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded' : 'text-slate-700'}>
                        {kw.priorityScore.toLocaleString()}
                      </span>
                    </td>

                    {/* Quadrant */}
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        kw.quadrant === 'core'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : kw.quadrant === 'opportunity'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : kw.quadrant === 'traffic'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {kw.quadrant === 'core' && '主力字'}
                        {kw.quadrant === 'opportunity' && '機會字'}
                        {kw.quadrant === 'traffic' && '流量字'}
                        {kw.quadrant === 'abandon' && '放棄'}
                      </span>
                    </td>

                    {/* Suggested Action */}
                    <td className="p-3 text-[11px] text-slate-600 leading-snug">
                      {kw.suggestedAction}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Status */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>顯示 <strong>{filteredKeywords.length}</strong> 個關鍵字</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              前 20% 高優關鍵字已自動綠底標記 (優先分數 ≥ {top20ScoreCutoff.toLocaleString()})
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            預估公式：月搜尋量 × 預估CTR × 轉換率 × 每筆毛利
          </div>
        </div>
      </div>

      {/* Add Keyword Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>新增監控關鍵字</span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">關鍵字名稱</label>
                <input
                  type="text"
                  placeholder="例如: B2B CRM 推薦"
                  value={newKwName}
                  onChange={(e) => setNewKwName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">搜尋意圖</label>
                  <select
                    value={newKwIntent}
                    onChange={(e) => setNewKwIntent(e.target.value as SearchIntent)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg"
                  >
                    <option value="informational">資訊型</option>
                    <option value="comparative">比較型</option>
                    <option value="transactional">交易型</option>
                    <option value="navigational">導航型</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">品牌屬性</label>
                  <select
                    value={newKwBrand}
                    onChange={(e) => setNewKwBrand(e.target.value as BrandAttribute)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg"
                  >
                    <option value="brand">品牌字</option>
                    <option value="non_brand">非品牌字</option>
                    <option value="competitor">競品字</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">漏斗階段</label>
                  <select
                    value={newKwFunnel}
                    onChange={(e) => setNewKwFunnel(e.target.value as FunnelStage)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg"
                  >
                    <option value="awareness">認知 (Top)</option>
                    <option value="consideration">考慮 (Mid)</option>
                    <option value="decision">決策 (Bottom)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">月搜尋量</label>
                  <input
                    type="number"
                    value={newKwVolume}
                    onChange={(e) => setNewKwVolume(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">KD 難度 (0-100)</label>
                  <input
                    type="number"
                    value={newKwKd}
                    onChange={(e) => setNewKwKd(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">CPC (NT$)</label>
                  <input
                    type="number"
                    value={newKwCpc}
                    onChange={(e) => setNewKwCpc(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">目前自然排名</label>
                  <input
                    type="number"
                    value={newKwRank}
                    onChange={(e) => setNewKwRank(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="chk-aio"
                  checked={newKwAio}
                  onChange={(e) => setNewKwAio(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <label htmlFor="chk-aio" className="text-slate-700">該字詞在 Google 搜尋結果出現 AI 摘要 (AI Overviews)</label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                取消
              </button>
              <button
                onClick={handleAddNewKeyword}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                加入關鍵字主表
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
