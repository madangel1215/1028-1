import { MetricDefinition, TimeSeriesPoint, ChannelMetrics, NPSBreakdown } from '../types';

export const METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  impressions: {
    id: 'impressions',
    name: '曝光數',
    abbr: 'Impressions',
    stage: 'awareness',
    definition: '廣告或行銷內容被顯示在使用者螢幕上的總次數。',
    businessImpact: '評估品牌宣傳活動的能見度與聲量範圍，為集客金字塔最頂層基礎。',
    formula: '累計內容顯示總次數',
    unit: '次',
    benchmark: '依廣告預算與投放通路而定',
    tips: [
      '提高優質關鍵字覆蓋率與媒體曝光版位',
      '搭配社群分享擴展二次擴散效果',
      '注意頻率 (Frequency) 避免廣告疲勞'
    ]
  },
  reach: {
    id: 'reach',
    name: '觸及人數',
    abbr: 'Reach',
    stage: 'awareness',
    definition: '實際看到廣告或內容的不重複使用者人數。',
    businessImpact: '反映品牌的真實受眾擴展能力，避免重複向同一群人投遞。',
    formula: '不重複使用者 (Unique Users) 數量',
    unit: '人',
    benchmark: '觸及率 > 60% 總目標受眾',
    tips: [
      '擴大受眾包 (Lookalike Audiences) 鎖定新客',
      '跨管道與跨平台聯播網佈局',
      '控制廣告出現頻率 (Frequency = 曝光數 / 觸及數)'
    ]
  },
  traffic: {
    id: 'traffic',
    name: '網站流量',
    abbr: 'Traffic (Sessions/PV/UV)',
    stage: 'awareness',
    definition: '包含工作階段 (Sessions)、總瀏覽量 (PV) 與不重複訪客 (UV)。',
    businessImpact: '衡量行銷活動將外圍聲量成功轉化為實質站內引流的能力。',
    formula: 'PV: 總頁面讀取數 | UV: 不重複 IP/Cookie 人數 | Sessions: 30分鐘內連續操作',
    unit: '次 / 人',
    benchmark: 'Session/UV 比例約 1.2~1.5 最佳',
    tips: [
      '優化網站載入速度 (Page Speed) 降低流失',
      '確保網址 URL 攜帶清晰 UTM 標籤',
      '改善搜尋引擎最佳化 (SEO) 增加自然流量'
    ]
  },
  traffic_sources: {
    id: 'traffic_sources',
    name: '流量來源',
    abbr: 'Traffic Sources',
    stage: 'awareness',
    definition: '追蹤訪客來源管道：自然搜尋 (Organic)、付費廣告 (Paid)、社群 (Social)、直接 (Direct)、推薦 (Referral)。',
    businessImpact: '評估行銷通路組合健康度，降低對單一付費管道的過度依賴。',
    formula: '各管道流量數 ÷ 總流量數 × 100%',
    unit: '%',
    benchmark: '多元化組合（付費 < 40%, 自然+直接 > 45%）',
    tips: [
      '持續經營 SEO 強化高意圖關鍵字排名',
      '建構 Content Marketing 與 EDM 社群護城河',
      '精準設置 Affiliate 與 KOC 推薦連結'
    ]
  },
  cpc: {
    id: 'cpc',
    name: '每次點擊成本',
    abbr: 'CPC (Cost Per Click)',
    stage: 'awareness',
    definition: '付費廣告中，每吸引一位訪客點擊廣告進入網站所需的平均花費。',
    businessImpact: '評估廣告競價效率與引流成本控制，直接影響前段獲客預算消耗。',
    formula: '廣告總花費 ÷ 總點擊次數',
    unit: 'NT$',
    benchmark: 'NT$ 8 ~ NT$ 25 (視產業競爭度差異)',
    tips: [
      '提升廣告品質分數 (Quality Score) 降競價成本',
      '排除無效否定關鍵字 (Negative Keywords)',
      '測試不同受眾群體與文案素材組合'
    ]
  },
  ctr: {
    id: 'ctr',
    name: '點擊率',
    abbr: 'CTR (Click-Through Rate)',
    stage: 'engagement',
    definition: '廣告或內容連結被點擊的次數佔總曝光數的百分比。',
    businessImpact: '衡量廣告文案、視覺素材與目標受眾匹配度最直接的吸引力指標。',
    formula: '(總點擊數 ÷ 總曝光數) × 100%',
    unit: '%',
    benchmark: '搜尋廣告 3%~5%, 展示/社群廣告 1%~2.5%',
    tips: [
      '使用具備高吸引力的 Call to Action (CTA) 按鈕',
      '運用 A/B 測試優化首頁主圖與標題文案',
      '強調切中目標受眾痛點的文案句型'
    ]
  },
  bounce_rate: {
    id: 'bounce_rate',
    name: '跳出率',
    abbr: 'Bounce Rate',
    stage: 'engagement',
    definition: '訪客進入網站後，未進行任何第二頁瀏覽或互動即離開的單頁工作階段比例。',
    businessImpact: '反映 Landing Page 內容是否符合訪客預期與體驗順暢度。',
    formula: '(無互動單頁工作階段數 ÷ 總工作階段數) × 100%',
    unit: '%',
    benchmark: '電商網站 30%~50%, 部落格/新聞 60%~80%',
    tips: [
      '保持 Landing Page 訴求與廣告文案高一致性',
      '提升行動端載入速度與視覺排版體驗',
      '提供清晰的內部連結與延伸導購模組'
    ]
  },
  engagement_rate: {
    id: 'engagement_rate',
    name: '參與度',
    abbr: 'Engagement Rate (GA4)',
    stage: 'engagement',
    definition: 'GA4 新版的核心指標：停留超過10秒、發生2個以上頁面瀏覽或觸發轉換事件的工作階段比例。',
    businessImpact: '比傳統跳出率更能準確衡量訪客在網站上的實質讀者品質與興趣深度。',
    formula: '(實質參與工作階段數 ÷ 總工作階段數) × 100%',
    unit: '%',
    benchmark: '> 55% ~ 65% 為優良指標',
    tips: [
      '加入互動元件如試算工具、影片或評測問卷',
      '優化首屏 (Above the Fold) 資訊層級與價值主張',
      '善用動態引導與目錄索引提高閱讀深度'
    ]
  },
  avg_time_on_page: {
    id: 'avg_time_on_page',
    name: '平均頁面停留時間',
    abbr: 'Avg Time on Page',
    stage: 'engagement',
    definition: '訪客在單一頁面或網站內持續停留閱讀的平均時間長度。',
    businessImpact: '評估內容深度與吸引力，時間越長通常代表訪客對產品興趣越高。',
    formula: '總停留時間 (秒) ÷ 總頁面瀏覽數',
    unit: '分:秒',
    benchmark: '2 分鐘 ~ 3 分鐘 (產品介紹頁/文章)',
    tips: [
      '導入圖文並茂與短影音內容說明',
      '使用好閱讀的排版字體與層級間距',
      '加入情境案例研究 (Case Study) 與客戶評價'
    ]
  },
  cvr: {
    id: 'cvr',
    name: '轉換率',
    abbr: 'CVR (Conversion Rate)',
    stage: 'conversion',
    definition: '完成目標行動（如結帳、留單、下載、註冊）的訪客佔總進站訪客或點擊數的比例。',
    businessImpact: '商業營運最核心指標之一，直接代表將流量轉化為實際商業價值的效率。',
    formula: '(完成轉換次數 ÷ 總點擊數或訪客數) × 100%',
    unit: '%',
    benchmark: '電商 1.5%~3.5%, B2B 留單 3%~8%',
    tips: [
      '簡化購物結帳與表單填寫流程步驟',
      '提供限時優惠、免運門檻與信任標章 (Trust Badges)',
      '運用購物車挽救 (Abandoned Cart) 提醒機制'
    ]
  },
  cac: {
    id: 'cac',
    name: '客戶獲取成本',
    abbr: 'CAC (Customer Acquisition Cost)',
    stage: 'conversion',
    definition: '獲取一名「成功付費轉換」客戶所需的總行銷廣告與銷售營運成本。',
    businessImpact: '決定商業模式能否獲利的命脈，需與顧客終身價值 (LTV) 互相比對。',
    formula: '(總行銷與銷售花費) ÷ (獲取的新客戶總數)',
    unit: 'NT$',
    benchmark: '需配合 LTV 計算（理想 LTV : CAC ≥ 3:1）',
    tips: [
      '優化轉換漏斗中期，提高 SQL/MQL 轉化品質',
      '提高舊客轉介紹 (Referral) 降低平均 CAC',
      '自動化行銷 (Marketing Automation) 降低人力營運成本'
    ]
  },
  cpa: {
    id: 'cpa',
    name: '每次行動成本',
    abbr: 'CPA (Cost Per Action)',
    stage: 'conversion',
    definition: '讓潛在客戶完成一次特定行銷目標動作（如下載白皮書、註冊會員、留單）的花費。',
    businessImpact: '精準控管前中段商業導流動作的費用預算支出。',
    formula: '廣告與行銷總花費 ÷ 完成指定行動總次數',
    unit: 'NT$',
    benchmark: 'NT$ 150 ~ NT$ 600 (依行動價值層級差異)',
    tips: [
      '降低特定行動的門檻（如僅需填寫 Email 即可獲得資料）',
      '運用漸進式表單 (Progressive Profiling)',
      '針對未完成行動者實施再行銷 (Remarketing)'
    ]
  },
  roas: {
    id: 'roas',
    name: '廣告投資報酬率',
    abbr: 'ROAS (Return on Ad Spend)',
    stage: 'conversion',
    definition: '每一元廣告費用直接帶來的商品銷售營運營收金額比率。',
    businessImpact: '衡量數位廣告活動即時獲利能力與預算配置效益的最常用指標。',
    formula: '(廣告帶來的總營收 ÷ 廣告總花費) × 100%',
    unit: '%',
    benchmark: '> 350% ~ 500% (視產品毛利率有所調升)',
    tips: [
      '加碼高 ROAS 的關鍵字與精準廣告受眾群',
      '提升平均客單價 (AOV) 放大廣告效益',
      '關閉或重新調優低於保本 ROAS 的廣告組'
    ]
  },
  roi: {
    id: 'roi',
    name: '整體投資報酬率',
    abbr: 'ROI (Return on Investment)',
    stage: 'conversion',
    definition: '扣除產品製作、營運物流與行銷等全部成本後的整體淨利潤比率。',
    businessImpact: '比 ROAS 更真切地反映企業營運實際淨利與健康度（包含毛利考量）。',
    formula: '[(總營收 - 包含產品與營運總成本) ÷ 總成本] × 100%',
    unit: '%',
    benchmark: '> 20% ~ 35% 淨利潤率',
    tips: [
      '降低產品銷貨成本 (COGS) 與物流消耗',
      '專注於高毛利產品組合的行銷推廣',
      '優化整體企業內部營運與人力效率'
    ]
  },
  ltv: {
    id: 'ltv',
    name: '顧客終身價值',
    abbr: 'LTV (Lifetime Value)',
    stage: 'retention',
    definition: '一名客戶在與企業維持關係的完整生命週期中，預計能帶來的總毛利或營收貢獻。',
    businessImpact: '決定企業能承受的獲客成本上限，是評估長期可持續擴展能力的關鍵。',
    formula: '平均客單價 × 年購買頻率 × 顧客平均生命週期 (年) × 毛利率',
    unit: 'NT$',
    benchmark: 'LTV 應至少為 CAC 的 3 倍以上 (3:1)',
    tips: [
      '建立訂閱制或 VIP 會員等級制度',
      '進行交叉銷售 (Cross-sell) 與向上銷售 (Up-sell)',
      '提升售後客服品質與顧客滿意度'
    ]
  },
  retention_churn: {
    id: 'retention_churn',
    name: '留存率與流失率',
    abbr: 'Retention & Churn Rate',
    stage: 'retention',
    definition: '既有客戶持續回購或續約的比例 (留存率)，以及終止消費的客戶比例 (流失率)。',
    businessImpact: '衡量顧客忠誠度與產品市場契合度 (PMF) 的護城河指標。',
    formula: '流失率 = 期間流失客戶 ÷ 期初客戶數 | 留存率 = 100% - 流失率',
    unit: '%',
    benchmark: '月流失率 < 3%~5% (SaaS/訂閱制), 留存率 > 40% (電商回購)',
    tips: [
      '設置流失預警機制（如超過 60 天未登入/購買）',
      '實施自動化流失挽救專案與關懷優惠點數',
      '蒐集流失原因做產品改進調查'
    ]
  },
  nps: {
    id: 'nps',
    name: '淨推薦值',
    abbr: 'NPS (Net Promoter Score)',
    stage: 'retention',
    definition: '以 0~10 分詢問客戶「有多大意願推薦給親友」，評估品牌的忠誠度質性轉化指標。',
    businessImpact: '預測口耳相傳 (Word-of-Mouth) 自然成長力與品牌口碑黏著度。',
    formula: '% 推薦者 (9-10分) - % 批評者 (0-6分)',
    unit: '分 (-100 ~ +100)',
    benchmark: '> +30 分（良好）, > +50 分（優秀）, > +70 分（世界級品牌）',
    tips: [
      '針對 0-6 分批評者進行 24 小時內快速客服關懷',
      '激勵 9-10 分推薦者撰寫開箱文或轉介紹親友',
      '將 NPS 關鍵意見定期回饋給產品與服務團隊'
    ]
  },
  mql_to_sql: {
    id: 'mql_to_sql',
    name: 'MQL 到 SQL 轉換率',
    abbr: 'MQL to SQL Rate',
    stage: 'conversion',
    definition: '行銷合格名單 (MQL，如下載白皮書或檢核表者) 轉化為業務/顧問合格商機 (SQL，具備企業預算、明確專案需求並同意進行 Discovery Call 會議) 的比例。',
    businessImpact: 'B2B 企管顧問業最核心的漏斗質量指標。若過低代表行銷素材吸引的是單純資料蒐集者而非高階決策者。',
    formula: '(SQL 業務合格商機數 ÷ MQL 行銷合格名單數) × 100%',
    unit: '%',
    benchmark: '20% ~ 35% (B2B 高階企管顧問服務標竿)',
    tips: [
      '在 Lead Magnet 表單中加入「企業規模」與「預計實施時程」欄位做初步自動資格過濾',
      '建立 Sales Enablement 內容（如專案實績案例研究）加速 MQL 信任培育',
      '顧問團隊與行銷團隊每週校準 SQL 定義與反饋機制'
    ]
  },
  depth_of_engagement: {
    id: 'depth_of_engagement',
    name: '深度互動指標',
    abbr: 'Depth of Engagement',
    stage: 'engagement',
    definition: '涵蓋策略觀點與專業文章平均停留時間 (Avg Time > 3 min)、案例研究滾動深度 (Scroll Depth > 75%)，以及研討會 (Webinar) 實際出席率與觀看時長。',
    businessImpact: '企管顧問賣的是大腦與專業經驗。潛在客戶在聯繫前會深度研讀觀點，停留超過 3 分鐘為極高簽約意向訊號。',
    formula: '核心文章平均停留時間 + 研討會出席率 (%) + 滾動深度 (%)',
    unit: '分:秒 / %',
    benchmark: '專業文章 > 3 分鐘, 研討會出席率 > 65%',
    tips: [
      '導入互動式「組織變革準備度」或「資料治理成熟度」自我評估工具',
      '針對閱讀深度達 80% 以上的訪客自動跳出高階諮詢預約門檻',
      '提供結構化的 PDF 策略白皮書與實務範本供高階主管下載'
    ]
  },
  cost_per_sql: {
    id: 'cost_per_sql',
    name: '每筆合格商機成本與勝率',
    abbr: 'Cost Per SQL & Win Rate',
    stage: 'conversion',
    definition: '獲得一個有實質洽談機會的企業客戶所需行銷花費 (Cost Per SQL)；以及進入正式提案 (RFP/Proposal) 後成功簽約的比例 (Win Rate)。',
    businessImpact: 'B2B 行銷不看低品質的 CPL，花 NT$ 5,000 獲得準備進行組織重整或系統移轉的企業總監名單極具價值。',
    formula: 'Cost Per SQL = 總行銷費用 ÷ SQL 數量 | Win Rate = (簽約成功數 ÷ 正式提案數) × 100%',
    unit: 'NT$ / %',
    benchmark: 'Cost Per SQL: NT$ 3,500~6,000, 提案勝率 Win Rate: 30%~45%',
    tips: [
      '將廣告預算聚焦投遞於 LinkedIn 與專屬產業高階論壇',
      '針對不同企管顧問模組（策略共識營 vs. 數據架構健檢）精準核算各模組投資報酬率',
      '對未即時簽約的提案建立階段性企管觀點關懷追蹤 (Nurturing)'
    ]
  },
  sales_cycle_length: {
    id: 'sales_cycle_length',
    name: '銷售週期長度',
    abbr: 'Sales Cycle Length',
    stage: 'conversion',
    definition: '從潛在客戶第一次接觸品牌（如參加 Webinar 或下載 ADKAR 變革管理指南），到最終簽署顧問服務合約所花費的天數或月數。',
    businessImpact: '評估行銷內容是否能有效提前消除客戶內部疑慮、建立專業權威，並縮短企業層級的決策流程。',
    formula: '累計成交專案總簽約天數 ÷ 總成交專案筆數',
    unit: '天',
    benchmark: '高階企管顧問專案: 30 天 ~ 60 天',
    tips: [
      '提供清晰的專案里程碑與客戶效益檢證標竿 (ROI Framework)',
      '針對潛在客戶內部多重決策者 (C-Level, IT, HR) 提供對應層級的決策懶人包',
      '運用 Discovery Call 預約系統讓客戶能直連首席顧問行事曆'
    ]
  }
};

export const MOCK_FUNNEL_SUMMARY = [
  { stage: '曝光階段', label: '曝光與觸及', value: 1285000, subText: 'Impressions: 1,285,000 | Reach: 842,000', rate: '100%', color: '#3b82f6', bg: 'bg-blue-500' },
  { stage: '集客與點擊', label: '網站流量', value: 142600, subText: 'Sessions: 142,600 | CTR: 3.82%', rate: '11.1%', color: '#06b6d4', bg: 'bg-cyan-500' },
  { stage: '參與互動', label: '實質參與訪客', value: 94100, subText: 'Engagement Rate: 66.0% | Avg 2m 45s', rate: '66.0%', color: '#10b981', bg: 'bg-emerald-500' },
  { stage: '轉換成效', label: '成功付費轉換', value: 4850, subText: 'CVR: 3.40% | ROAS: 462%', rate: '3.40%', color: '#f59e0b', bg: 'bg-amber-500' },
  { stage: '留存價值', label: '長期回購顧客', value: 1680, subText: 'LTV: $18,500 | LTV:CAC = 4.2:1', rate: '34.6%', color: '#8b5cf6', bg: 'bg-purple-500' }
];

export const MOCK_TIME_SERIES: TimeSeriesPoint[] = [
  { date: '07/01', impressions: 38200, reach: 28400, sessions: 4200, pv: 11200, uv: 3600, clicks: 1512, cost: 18144, ctr: 3.96, cpc: 12.0, bounceRate: 38.2, engagementRate: 61.8, avgTimeOnPage: 145, conversions: 138, cvr: 3.28, cac: 4420, cpa: 380, adRevenue: 83904, netProfit: 28100, roas: 462, roi: 154, ltv: 18500, retentionRate: 68.4, churnRate: 3.2, nps: 48 },
  { date: '07/02', impressions: 41000, reach: 30100, sessions: 4500, pv: 12100, uv: 3850, clicks: 1620, cost: 19440, ctr: 3.95, cpc: 12.0, bounceRate: 37.5, engagementRate: 62.5, avgTimeOnPage: 150, conversions: 152, cvr: 3.37, cac: 4350, cpa: 370, adRevenue: 91200, netProfit: 31200, roas: 469, roi: 160, ltv: 18500, retentionRate: 68.8, churnRate: 3.1, nps: 49 },
  { date: '07/03', impressions: 39500, reach: 29200, sessions: 4350, pv: 11800, uv: 3720, clicks: 1566, cost: 18792, ctr: 3.96, cpc: 12.0, bounceRate: 39.0, engagementRate: 61.0, avgTimeOnPage: 142, conversions: 142, cvr: 3.26, cac: 4480, cpa: 385, adRevenue: 85200, netProfit: 27900, roas: 453, roi: 148, ltv: 18500, retentionRate: 67.9, churnRate: 3.3, nps: 47 },
  { date: '07/04', impressions: 43200, reach: 31800, sessions: 4800, pv: 13200, uv: 4100, clicks: 1776, cost: 20424, ctr: 4.11, cpc: 11.5, bounceRate: 35.8, engagementRate: 64.2, avgTimeOnPage: 162, conversions: 172, cvr: 3.58, cac: 4180, cpa: 345, adRevenue: 104920, netProfit: 38400, roas: 513, roi: 188, ltv: 18600, retentionRate: 69.5, churnRate: 3.0, nps: 51 },
  { date: '07/05', impressions: 46800, reach: 34200, sessions: 5200, pv: 14500, uv: 4420, clicks: 1976, cost: 22724, ctr: 4.22, cpc: 11.5, bounceRate: 34.2, engagementRate: 65.8, avgTimeOnPage: 175, conversions: 198, cvr: 3.81, cac: 4020, cpa: 320, adRevenue: 122760, netProfit: 46800, roas: 540, roi: 205, ltv: 18700, retentionRate: 70.2, churnRate: 2.9, nps: 54 },
  { date: '07/06', impressions: 48500, reach: 35600, sessions: 5450, pv: 15200, uv: 4650, clicks: 2086, cost: 23989, ctr: 4.30, cpc: 11.5, bounceRate: 33.5, engagementRate: 66.5, avgTimeOnPage: 180, conversions: 215, cvr: 3.94, cac: 3910, cpa: 305, adRevenue: 135450, netProfit: 52100, roas: 564, roi: 217, ltv: 18800, retentionRate: 71.0, churnRate: 2.8, nps: 56 },
  { date: '07/07', impressions: 45100, reach: 33100, sessions: 5020, pv: 13900, uv: 4280, clicks: 1884, cost: 21666, ctr: 4.18, cpc: 11.5, bounceRate: 35.0, engagementRate: 65.0, avgTimeOnPage: 168, conversions: 184, cvr: 3.66, cac: 4120, cpa: 335, adRevenue: 112240, netProfit: 41500, roas: 518, roi: 191, ltv: 18600, retentionRate: 69.8, churnRate: 2.9, nps: 52 },
  { date: '07/08', impressions: 42000, reach: 31000, sessions: 4650, pv: 12600, uv: 3980, clicks: 1701, cost: 19561, ctr: 4.05, cpc: 11.5, bounceRate: 36.5, engagementRate: 63.5, avgTimeOnPage: 158, conversions: 160, cvr: 3.44, cac: 4280, cpa: 355, adRevenue: 96000, netProfit: 33800, roas: 490, roi: 172, ltv: 18500, retentionRate: 69.1, churnRate: 3.0, nps: 50 },
  { date: '07/09', impressions: 40500, reach: 29800, sessions: 4480, pv: 12000, uv: 3820, clicks: 1620, cost: 18630, ctr: 4.00, cpc: 11.5, bounceRate: 37.0, engagementRate: 63.0, avgTimeOnPage: 152, conversions: 150, cvr: 3.35, cac: 4350, cpa: 365, adRevenue: 88500, netProfit: 29800, roas: 475, roi: 159, ltv: 18500, retentionRate: 68.5, churnRate: 3.1, nps: 49 },
  { date: '07/10', impressions: 41800, reach: 30800, sessions: 4600, pv: 12400, uv: 3920, clicks: 1692, cost: 19458, ctr: 4.05, cpc: 11.5, bounceRate: 36.2, engagementRate: 63.8, avgTimeOnPage: 156, conversions: 158, cvr: 3.43, cac: 4310, cpa: 360, adRevenue: 94000, netProfit: 32600, roas: 483, roi: 167, ltv: 18500, retentionRate: 68.9, churnRate: 3.0, nps: 50 },
  { date: '07/11', impressions: 44500, reach: 32600, sessions: 4950, pv: 13600, uv: 4200, clicks: 1846, cost: 21229, ctr: 4.15, cpc: 11.5, bounceRate: 34.8, engagementRate: 65.2, avgTimeOnPage: 166, conversions: 180, cvr: 3.63, cac: 4130, cpa: 338, adRevenue: 109800, netProfit: 40200, roas: 517, roi: 189, ltv: 18600, retentionRate: 69.9, churnRate: 2.9, nps: 53 },
  { date: '07/12', impressions: 47200, reach: 34800, sessions: 5300, pv: 14800, uv: 4500, clicks: 2006, cost: 23069, ctr: 4.25, cpc: 11.5, bounceRate: 33.8, engagementRate: 66.2, avgTimeOnPage: 178, conversions: 205, cvr: 3.86, cac: 3950, cpa: 312, adRevenue: 127100, netProfit: 48900, roas: 551, roi: 212, ltv: 18700, retentionRate: 70.8, churnRate: 2.8, nps: 55 },
  { date: '07/13', impressions: 49000, reach: 36200, sessions: 5550, pv: 15600, uv: 4720, clicks: 2131, cost: 24506, ctr: 4.35, cpc: 11.5, bounceRate: 32.8, engagementRate: 67.2, avgTimeOnPage: 185, conversions: 226, cvr: 4.07, cac: 3800, cpa: 295, adRevenue: 142380, netProfit: 55800, roas: 581, roi: 227, ltv: 18900, retentionRate: 71.5, churnRate: 2.7, nps: 58 },
  { date: '07/14', impressions: 46200, reach: 33900, sessions: 5150, pv: 14200, uv: 4380, clicks: 1963, cost: 22574, ctr: 4.25, cpc: 11.5, bounceRate: 34.2, engagementRate: 65.8, avgTimeOnPage: 172, conversions: 195, cvr: 3.78, cac: 4050, cpa: 325, adRevenue: 120900, netProfit: 45600, roas: 535, roi: 202, ltv: 18700, retentionRate: 70.3, churnRate: 2.9, nps: 54 }
];

export const MOCK_CHANNEL_BREAKDOWN: ChannelMetrics[] = [
  { channel: 'paid', channelName: '付費搜尋廣告 (Paid Search)', sessions: 54200, percentage: 38.0, cpc: 11.2, ctr: 4.25, cvr: 3.85, conversions: 2086, roas: 485, color: '#3b82f6' },
  { channel: 'organic', channelName: '自然搜尋流量 (Organic SEO)', sessions: 39900, percentage: 28.0, cpc: 0, ctr: 5.10, cvr: 4.12, conversions: 1643, roas: 1250, color: '#10b981' },
  { channel: 'social', channelName: '社群媒體廣告 (Meta/IG/Line)', sessions: 28500, percentage: 20.0, cpc: 14.5, ctr: 2.85, cvr: 2.45, conversions: 698, roas: 310, color: '#ec4899' },
  { channel: 'direct', channelName: '直接造訪 (Direct Input)', sessions: 12800, percentage: 9.0, cpc: 0, ctr: 8.50, cvr: 5.20, conversions: 665, roas: 0, color: '#f59e0b' },
  { channel: 'referral', channelName: '推薦連結 (Referral & KOC)', sessions: 7200, percentage: 5.0, cpc: 8.0, ctr: 3.40, cvr: 3.10, conversions: 223, roas: 420, color: '#8b5cf6' }
];

export const MOCK_NPS_DATA: NPSBreakdown = {
  promoters: 62, // 9-10
  passives: 28,  // 7-8
  detractors: 10, // 0-6
  score: 52      // 62 - 10 = +52
};

export const MOCK_COHORT_RETENTION = [
  { period: '首月 (M0)', retention: 100, churn: 0, revenuePerUser: 4200 },
  { period: '第2個月 (M1)', retention: 68.5, churn: 31.5, revenuePerUser: 2850 },
  { period: '第3個月 (M2)', retention: 54.2, churn: 14.3, revenuePerUser: 2200 },
  { period: '第4個月 (M3)', retention: 46.8, churn: 7.4, revenuePerUser: 1950 },
  { period: '第5個月 (M4)', retention: 42.1, churn: 4.7, revenuePerUser: 1800 },
  { period: '第6個月 (M5)', retention: 39.5, churn: 2.6, revenuePerUser: 1720 },
  { period: '第12個月 (M11)', retention: 34.2, churn: 5.3, revenuePerUser: 1650 }
];

export const DEFAULT_CALCULATOR_STATE = {
  adSpend: 150000,           // 廣告總預算 (NT$)
  impressions: 1250000,      // 曝光數
  clicks: 48000,            // 點擊數
  conversions: 1680,         // 完成轉換筆數
  avgOrderValue: 2800,       // 平均客單價 (NT$)
  grossMarginPct: 65,        // 產品毛利率 (%)
  operationalCostPerOrder: 350, // 每筆訂單出貨與客服維運成本
  customerLifespanMonths: 24, // 顧客平均生命週期 (月)
  repurchaseFrequencyYearly: 2.5 // 每年回購次數
};
