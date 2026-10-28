export type StageKey = 
  | 'overview' 
  | 'seven_layers' 
  | 'roas_diagnostic' 
  | 'financial_roi' 
  | 'keyword_master' 
  | 'seo_performance' 
  | 'paid_search' 
  | 'aio_tracking' 
  | 'search_synergy' 
  | 'decision_rules' 
  | 'b2b_consulting' 
  | 'strategy_pivot'
  | 'awareness'
  | 'engagement'
  | 'conversion'
  | 'retention'
  | 'calculator';

export type TimeRange = '7d' | '30d' | '90d' | 'ytd';
export type ChannelFilter = 'all' | 'organic' | 'paid' | 'social' | 'direct' | 'referral';
export type CostScope = 'media' | 'total'; // 媒體成本 (純廣告) vs 全成本 (廣告+製作+人力+工具+代理費)

export interface BaselineSettings {
  grossMarginPct: number; // 毛利率 GM% (營收 - 銷貨成本) / 營收
  targetNetMarginPct: number; // 目標淨利率
  targetLtv: number; // LTV 客戶終身價值
  costScope: CostScope;
  mediaCost: number; // 廣告純媒體費用
  productionCost: number; // 製作
  laborCost: number; // 人力
  toolsCost: number; // 工具與軟體
  agencyCost: number; // 代理商服務費
  salesCost: number; // 業務成本
  totalRevenue: number;
}

export interface MetricDefinition {
  id: string;
  name: string;
  abbr?: string;
  stage: 'awareness' | 'engagement' | 'conversion' | 'retention' | 'financial' | 'b2b';
  layerNumber?: number; // 1-7
  layerTitle?: string;
  definition: string;
  businessImpact: string;
  formula: string;
  unit: string;
  benchmark: string;
  tips: string[];
  highLowMeaning?: string;
  concreteAction?: string;
  dataSource?: string;
  frequency?: string;
}

export interface MetricValue {
  id: string;
  current: number;
  previous: number;
  change: number; // %
  target?: number;
  status: 'good' | 'warning' | 'alert';
  formatted: string;
}

export interface TimeSeriesPoint {
  date: string;
  impressions: number;
  reach: number;
  sessions: number;
  pv: number;
  uv: number;
  clicks: number;
  cost: number;
  ctr: number;
  cpc: number;
  bounceRate: number;
  engagementRate: number;
  avgTimeOnPage: number;
  conversions: number;
  cvr: number;
  cac: number;
  cpa: number;
  adRevenue: number;
  netProfit: number;
  roas: number;
  roi: number;
  ltv: number;
  retentionRate: number;
  churnRate: number;
  nps: number;
}

export interface ChannelMetrics {
  channel: string;
  channelName: string;
  sessions: number;
  percentage: number;
  cpc: number;
  ctr: number;
  cvr: number;
  conversions: number;
  roas: number;
  color: string;
}

export interface NPSBreakdown {
  promoters: number;
  passives: number;
  detractors: number;
  score: number;
}

export interface CalculatorState {
  adSpend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  avgOrderValue: number;
  grossMarginPct: number;
  operationalCostPerOrder: number;
  customerLifespanMonths: number;
  repurchaseFrequencyYearly: number;
}

// ----------------------------------------------------
// 關鍵字模組 (Keyword Intelligence 8 Worksheets)
// ----------------------------------------------------

export type SearchIntent = 'informational' | 'comparative' | 'transactional' | 'navigational';
export type BrandAttribute = 'brand' | 'non_brand' | 'competitor';
export type FunnelStage = 'awareness' | 'consideration' | 'decision';
export type QuadrantType = 'core' | 'opportunity' | 'traffic' | 'abandon' | 'validate';

export interface KeywordSettingConfig {
  defaultCvr: number; // 預設轉換率 %
  grossMarginPct: number; // 毛利率 %
  highValueThreshold: number; // 高價值門檻 (NT$ 預估月價值)
  aioDiscountFactor: number; // AI摘要點擊折減係數 (e.g. 0.65)
  targetCpa: number; // 目標 CPA
  wasteSpendAlertThreshold: number; // 浪費花費比警示門檻 % (15%)
  rankExpectedCtr: { rank: number; ctr: number }[]; // 各排名預期 CTR 基準
}

export interface KeywordMetricDefinitionItem {
  layer: string;
  code: string;
  name: string;
  formula: string;
  highLowMeaning: string;
  action: string;
  dataSource: string;
  frequency: string;
}

export interface KeywordMasterRow {
  id: string;
  keyword: string;
  intent: SearchIntent;
  brandType: BrandAttribute;
  funnelStage: FunnelStage;
  monthlySearchVolume: number; // 月搜尋量
  intentMatchScore: number; // 意圖符合度 (1-5)
  bizRelevanceScore: number; // 業務相關度 (1-5)
  kd: number; // 關鍵字難度 (0-100)
  cpc: number; // 建議出價 CPC
  trendQuarterly: number; // 近季趨勢 %
  hasAio: boolean; // 是否出現 AI 摘要
  hasShopping: boolean; // 是否有購物廣告
  hasMap: boolean; // 是否有地圖
  paidValidatedCvr?: number; // 付費驗證轉換率
  currentRank: number; // 目前自然排名 (0 = 未進前100)
  currentCtr: number; // 目前 CTR %
  conversionsMonthly: number; // 月轉換數
  
  // 計算欄位
  estMonthlyValue: number; // 搜尋量 × 預估CTR × 轉換率 × 每筆毛利
  priorityScore: number; // 預估月價值 × 意圖符合度 ÷ KD
  isTop20Pct: boolean; // 前 20% 高優標籤
  quadrant: QuadrantType; // 主力字、機會字、流量字、放棄、待驗證
  suggestedAction: string;
  isQuickWin: boolean; // 11-20 名快速獲勝
  isDualDominance: boolean; // 雙佔 (付費與自然前3)
}

export interface SeoPerformanceRow {
  id: string;
  keyword: string;
  isBrand: boolean;
  impressions: number;
  clicks: number;
  ctr: number;
  currentRank: number;
  prevRank: number;
  expectedCtr: number;
  ctrGap: number; // 實際 CTR - 預期 CTR
  organicCvr: number;
  monthlyRevenue: number;
  cannibalizationUrls: string[]; // 內耗頁面網址
  hasCannibalization: boolean;
  zeroClickSignal: boolean; // 曝光持平或上升但點擊下降
  indexStatus: 'indexed' | 'pending' | 'error';
  freshnessDays: number; // 距上次更新天數
  pageUrl: string;
}

export interface PaidKeywordRow {
  id: string;
  keyword: string;
  brandType: BrandAttribute;
  qualityScore: number; // 1-10
  expectedCtrRating: 'above' | 'average' | 'below';
  adRelevanceRating: 'above' | 'average' | 'below';
  lpExperienceRating: 'above' | 'average' | 'below';
  matchType: 'exact' | 'phrase' | 'broad';
  spend: number;
  clicks: number;
  conversions: number;
  cpa: number;
  roas: number;
  lostIsBudget: number; // 因預算流失曝光比重 %
  lostIsRank: number; // 因排名流失曝光比重 %
  zeroConversionSpend: number; // 零轉換搜尋字詞花費
  wasteSpendRatio: number; // 浪費花費比 %
  status: 'scale' | 'optimize' | 'cut' | 'pause' | 'negate' | 'brand_defense';
  actionNote: string;
}

export interface AioTrackingRow {
  id: string;
  query: string;
  hasAio: boolean;
  brandCited: boolean;
  citationRank: number;
  citationShare: number; // 自家被引用 / (自家+競品)
  chatgpt: { mentioned: boolean; rank: number; accuracyScore: number; note: string };
  perplexity: { mentioned: boolean; rank: number; accuracyScore: number; note: string };
  gemini: { mentioned: boolean; rank: number; accuracyScore: number; note: string };
  copilot: { mentioned: boolean; rank: number; accuracyScore: number; note: string };
  aiReferralSessions: number;
  aiReferralCvr: number;
  schemaCovered: boolean;
}

export interface SearchSynergyRow {
  id: string;
  keyword: string;
  searchVolume: number;
  paidRank: number;
  organicRank: number;
  paidClicks: number;
  organicClicks: number;
  totalSearchShare: number; // (付費+自然) / 搜尋量
  isSeoTakeover: boolean; // 自然進前3，可測試逐步減少付費
  isDualTop3: boolean; // 雙佔
  paidSpend: number;
  seoAllocatedCost: number;
  totalConversions: number;
  blendedSearchCpa: number;
  suggestedAction: string;
}

export interface RoasDecompositionFactors {
  cpm: number;
  ctrPct: number;
  cvrPct: number;
  aov: number;
}
