import React, { useState } from 'react';
import { Header } from './components/Header';
import { BaselineControls } from './components/BaselineControls';
import { MasterDashboard } from './components/MasterDashboard';
import { SevenLayersMonitor } from './components/SevenLayersMonitor';
import { RoasDiagnosticCalculator } from './components/RoasDiagnosticCalculator';
import { RoiAttributionAnalyzer } from './components/RoiAttributionAnalyzer';
import { KeywordMasterTable } from './components/KeywordMasterTable';
import { SeoPerformanceView } from './components/SeoPerformanceView';
import { PaidSearchMonitor } from './components/PaidSearchMonitor';
import { AioTrackingView } from './components/AioTrackingView';
import { SearchSynergyView } from './components/SearchSynergyView';
import { DecisionRulesAndSchedule } from './components/DecisionRulesAndSchedule';
import { StageB2BConsulting } from './components/StageB2BConsulting';
import { StageAwareness } from './components/StageAwareness';
import { StageEngagement } from './components/StageEngagement';
import { StageConversion } from './components/StageConversion';
import { StageRetention } from './components/StageRetention';
import { StageStrategyPivot } from './components/StageStrategyPivot';
import { FormulaCalculator } from './components/FormulaCalculator';
import { MetricDetailModal } from './components/MetricDetailModal';
import { ExportExcelModal } from './components/ExportExcelModal';
import { 
  StageKey, 
  TimeRange, 
  ChannelFilter, 
  MetricDefinition, 
  BaselineSettings 
} from './types';
import { 
  DEFAULT_BASELINE_SETTINGS, 
  SEVEN_LAYERS_DEFINITIONS 
} from './data/marketingFrameworkData';
import { 
  LayoutDashboard, 
  Layers, 
  Stethoscope, 
  TrendingUp, 
  KeyRound, 
  Globe, 
  DollarSign, 
  Bot, 
  GitMerge, 
  Scale, 
  Briefcase, 
  Calculator,
  Calendar,
  Filter,
  FileSpreadsheet,
  AlertTriangle,
  ShieldAlert,
  BellRing,
  X,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ReferenceLine, 
  Tooltip as RechartsTooltip 
} from 'recharts';

export type AlertTimeframe = '7d' | '30d' | 'quarter';

export interface AlertTrendPoint {
  day: string;
  value: number;
  threshold: number;
}

export interface MonitoringAlert {
  id: string;
  metric: string;
  currentValue: string;
  thresholdValue: string;
  severity: 'critical' | 'warning';
  title: string;
  message: string;
  actionText: string;
  targetStage: StageKey;
  thresholdNum: number;
  unit: string;
  distanceText: string;
  trendSeries: {
    '7d': AlertTrendPoint[];
    '30d': AlertTrendPoint[];
    'quarter': AlertTrendPoint[];
  };
}

export default function App() {
  const [activeStage, setActiveStage] = useState<StageKey>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [selectedMetric, setSelectedMetric] = useState<MetricDefinition | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [baselineSettings, setBaselineSettings] = useState<BaselineSettings>(DEFAULT_BASELINE_SETTINGS);

  // 即時監控數據狀態 (支援實時數據接收與測試模擬)
  const [liveMonitorMetrics, setLiveMonitorMetrics] = useState({
    roas: 1.48,           // 當前 ROAS (預設模擬低於損益平衡 1.67x)
    cpa: 4850,            // 當前 CPA (預設模擬超出 7 日均線 30%)
    frequency: 3.9,       // 當前每週頻次 (預設模擬超出 3.5 次疲勞線)
    wasteSpendRatio: 16.8,// 當前浪費花費比 (預設模擬超出 15% 警示線)
    avgCpa7d: 3400        // 7 日平均 CPA
  });

  // 控制警報通知橫幅與各警報微型圖表切換時間區間 (7天 / 30天 / 季累計)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [showSimControls, setShowSimControls] = useState<boolean>(false);
  const [alertTimeframes, setAlertTimeframes] = useState<Record<string, AlertTimeframe>>({});

  /**
   * 監控狀態處理函數 (Monitoring State Handler)
   * 依據即時監控指標 (如 ROAS、CPA、頻次、浪費花費比) 與當前財務基準閾值進行評估
   * 當指標超過預設臨界值時，產出對應之視覺警報物件，並提供 7天 / 30天 / 季累計 走勢數據
   */
  const handleEvaluateMonitoringStatus = (
    metrics: typeof liveMonitorMetrics,
    settings: BaselineSettings
  ): MonitoringAlert[] => {
    const alerts: MonitoringAlert[] = [];
    const gmDecimal = settings.grossMarginPct / 100;
    // 損益平衡 ROAS: 1 / GM% (例如毛利 60% 為 1.67x)
    const breakEvenRoas = gmDecimal > 0 ? (1 / gmDecimal) : 1.67;
    // 目標 CAC 上限: LTV / 3
    const targetCacCap = settings.targetLtv / 3;

    // 1. ROAS 閾值監控處理：低於損益平衡線即觸發重大虧損警報
    if (metrics.roas < breakEvenRoas) {
      const roasDiffPct = ((metrics.roas - breakEvenRoas) / breakEvenRoas) * 100;
      const roasThresholdVal = Number(breakEvenRoas.toFixed(2));
      const currentRoasVal = Number(metrics.roas.toFixed(2));

      alerts.push({
        id: 'alert-roas-breakeven',
        metric: 'ROAS (廣告投資報酬率)',
        currentValue: `${metrics.roas.toFixed(2)}x (${Math.round(metrics.roas * 100)}%)`,
        thresholdValue: `損益平衡線 ${breakEvenRoas.toFixed(2)}x`,
        severity: 'critical',
        title: 'ROAS 跌破損益平衡點 (Break-even Alert)',
        message: `當前 ROAS (${metrics.roas.toFixed(2)}x) 低於毛利率 ${settings.grossMarginPct}% 換算之損益平衡門檻 (${breakEvenRoas.toFixed(2)}x)，表示每投一塊錢廣告都在淨虧損！依第九節規則：連續 2 週低於損益平衡應立即減碼 30–50% 或暫停。`,
        actionText: '進入 ROAS 四因數拆解尋找瓶頸',
        targetStage: 'roas_diagnostic',
        thresholdNum: roasThresholdVal,
        unit: 'x',
        distanceText: `已跌破損益線 ${Math.abs(roasDiffPct).toFixed(1)}% (差距 ${(metrics.roas - roasThresholdVal).toFixed(2)}x)`,
        trendSeries: {
          '7d': [
            { day: '07/08', value: 1.88, threshold: roasThresholdVal },
            { day: '07/09', value: 1.82, threshold: roasThresholdVal },
            { day: '07/10', value: 1.74, threshold: roasThresholdVal },
            { day: '07/11', value: 1.68, threshold: roasThresholdVal },
            { day: '07/12', value: 1.58, threshold: roasThresholdVal },
            { day: '07/13', value: 1.52, threshold: roasThresholdVal },
            { day: '今天', value: currentRoasVal, threshold: roasThresholdVal }
          ],
          '30d': [
            { day: '06/15', value: 2.35, threshold: roasThresholdVal },
            { day: '06/19', value: 2.22, threshold: roasThresholdVal },
            { day: '06/23', value: 2.08, threshold: roasThresholdVal },
            { day: '06/27', value: 1.95, threshold: roasThresholdVal },
            { day: '07/01', value: 1.85, threshold: roasThresholdVal },
            { day: '07/05', value: 1.75, threshold: roasThresholdVal },
            { day: '07/09', value: 1.62, threshold: roasThresholdVal },
            { day: '07/12', value: 1.54, threshold: roasThresholdVal },
            { day: '今天', value: currentRoasVal, threshold: roasThresholdVal }
          ],
          'quarter': [
            { day: '4月初', value: 2.80, threshold: roasThresholdVal },
            { day: '4月中', value: 2.65, threshold: roasThresholdVal },
            { day: '5月初', value: 2.48, threshold: roasThresholdVal },
            { day: '5月中', value: 2.25, threshold: roasThresholdVal },
            { day: '6月初', value: 2.10, threshold: roasThresholdVal },
            { day: '6月中', value: 1.88, threshold: roasThresholdVal },
            { day: '7月初', value: 1.65, threshold: roasThresholdVal },
            { day: '今天', value: currentRoasVal, threshold: roasThresholdVal }
          ]
        }
      });
    }

    // 2. CPA 閾值監控處理：比 7 日均線高 30% 以上或突破目標 CAC 上限
    const cpaSurgeThreshold = metrics.avgCpa7d * 1.3;
    if (metrics.cpa > cpaSurgeThreshold || metrics.cpa > targetCacCap) {
      const cpaThresholdVal = Math.round(cpaSurgeThreshold);
      const cpaDiffPct = ((metrics.cpa - cpaThresholdVal) / cpaThresholdVal) * 100;
      alerts.push({
        id: 'alert-cpa-surge',
        metric: 'CPA (每次轉換成本)',
        currentValue: `NT$ ${metrics.cpa.toLocaleString()}`,
        thresholdValue: `7日均線+30% 警戒線 NT$ ${cpaThresholdVal.toLocaleString()}`,
        severity: 'critical',
        title: 'CPA 異常飆升超標 (CPA Surge Alert)',
        message: `當前 CPA (NT$ ${metrics.cpa.toLocaleString()}) 比 7 日平均成本高出 30% 以上，獲客效率嚴重惡化。請立即檢查廣告品質分數、排除無效版位或檢視著陸頁載入效能。`,
        actionText: '檢視付費關鍵字品質與否定字',
        targetStage: 'paid_search',
        thresholdNum: cpaThresholdVal,
        unit: '元',
        distanceText: `已超出警戒閥值 +${cpaDiffPct.toFixed(1)}% (超標 +$${(metrics.cpa - cpaThresholdVal).toLocaleString()})`,
        trendSeries: {
          '7d': [
            { day: '07/08', value: 3350, threshold: cpaThresholdVal },
            { day: '07/09', value: 3420, threshold: cpaThresholdVal },
            { day: '07/10', value: 3680, threshold: cpaThresholdVal },
            { day: '07/11', value: 3950, threshold: cpaThresholdVal },
            { day: '07/12', value: 4320, threshold: cpaThresholdVal },
            { day: '07/13', value: 4610, threshold: cpaThresholdVal },
            { day: '今天', value: metrics.cpa, threshold: cpaThresholdVal }
          ],
          '30d': [
            { day: '06/15', value: 2900, threshold: cpaThresholdVal },
            { day: '06/19', value: 3050, threshold: cpaThresholdVal },
            { day: '06/23', value: 3180, threshold: cpaThresholdVal },
            { day: '06/27', value: 3320, threshold: cpaThresholdVal },
            { day: '07/01', value: 3450, threshold: cpaThresholdVal },
            { day: '07/05', value: 3750, threshold: cpaThresholdVal },
            { day: '07/09', value: 4200, threshold: cpaThresholdVal },
            { day: '07/12', value: 4580, threshold: cpaThresholdVal },
            { day: '今天', value: metrics.cpa, threshold: cpaThresholdVal }
          ],
          'quarter': [
            { day: '4月初', value: 2400, threshold: cpaThresholdVal },
            { day: '4月中', value: 2550, threshold: cpaThresholdVal },
            { day: '5月初', value: 2700, threshold: cpaThresholdVal },
            { day: '5月中', value: 2950, threshold: cpaThresholdVal },
            { day: '6月初', value: 3200, threshold: cpaThresholdVal },
            { day: '6月中', value: 3600, threshold: cpaThresholdVal },
            { day: '7月初', value: 4300, threshold: cpaThresholdVal },
            { day: '今天', value: metrics.cpa, threshold: cpaThresholdVal }
          ]
        }
      });
    }

    // 3. 頻次 (Frequency) 閾值監控處理：每週頻次高於 3.5 次
    if (metrics.frequency >= 3.5) {
      const freqThresholdVal = 3.5;
      const freqDiffPct = ((metrics.frequency - freqThresholdVal) / freqThresholdVal) * 100;
      const currentFreqVal = Number(metrics.frequency.toFixed(1));
      alerts.push({
        id: 'alert-frequency-fatigue',
        metric: '頻次 (Frequency)',
        currentValue: `${metrics.frequency.toFixed(1)} 次/人`,
        thresholdValue: '每週警戒線 3.5 次/人',
        severity: 'warning',
        title: '頻次過高引發素材疲倦 (Ad Fatigue Alert)',
        message: `每位觸及使用者平均每週觀看超過 ${metrics.frequency.toFixed(1)} 次，點擊率 (CTR) 將加速下滑。依決策規則第 5 條：應立即輪替主視覺與更換前 3 秒 Hook，切勿盲目加預算。`,
        actionText: '前往七大層級互動層優化',
        targetStage: 'seven_layers',
        thresholdNum: freqThresholdVal,
        unit: '次',
        distanceText: `超出疲勞警戒線 +${freqDiffPct.toFixed(1)}% (+${(metrics.frequency - freqThresholdVal).toFixed(1)} 次)`,
        trendSeries: {
          '7d': [
            { day: '07/08', value: 2.6, threshold: freqThresholdVal },
            { day: '07/09', value: 2.8, threshold: freqThresholdVal },
            { day: '07/10', value: 3.0, threshold: freqThresholdVal },
            { day: '07/11', value: 3.2, threshold: freqThresholdVal },
            { day: '07/12', value: 3.5, threshold: freqThresholdVal },
            { day: '07/13', value: 3.7, threshold: freqThresholdVal },
            { day: '今天', value: currentFreqVal, threshold: freqThresholdVal }
          ],
          '30d': [
            { day: '06/15', value: 1.8, threshold: freqThresholdVal },
            { day: '06/19', value: 2.0, threshold: freqThresholdVal },
            { day: '06/23', value: 2.2, threshold: freqThresholdVal },
            { day: '06/27', value: 2.5, threshold: freqThresholdVal },
            { day: '07/01', value: 2.8, threshold: freqThresholdVal },
            { day: '07/05', value: 3.1, threshold: freqThresholdVal },
            { day: '07/09', value: 3.4, threshold: freqThresholdVal },
            { day: '07/12', value: 3.7, threshold: freqThresholdVal },
            { day: '今天', value: currentFreqVal, threshold: freqThresholdVal }
          ],
          'quarter': [
            { day: '4月初', value: 1.5, threshold: freqThresholdVal },
            { day: '4月中', value: 1.7, threshold: freqThresholdVal },
            { day: '5月初', value: 2.0, threshold: freqThresholdVal },
            { day: '5月中', value: 2.3, threshold: freqThresholdVal },
            { day: '6月初', value: 2.6, threshold: freqThresholdVal },
            { day: '6月中', value: 3.0, threshold: freqThresholdVal },
            { day: '7月初', value: 3.5, threshold: freqThresholdVal },
            { day: '今天', value: currentFreqVal, threshold: freqThresholdVal }
          ]
        }
      });
    }

    // 4. 浪費花費比 (Waste Spend Ratio) 閾值監控處理：超過 15%
    if (metrics.wasteSpendRatio >= 15) {
      const wasteThresholdVal = 15.0;
      const wasteDiffPct = ((metrics.wasteSpendRatio - wasteThresholdVal) / wasteThresholdVal) * 100;
      const currentWasteVal = Number(metrics.wasteSpendRatio.toFixed(1));
      alerts.push({
        id: 'alert-waste-spend',
        metric: '浪費花費比 (Waste Spend Ratio)',
        currentValue: `${metrics.wasteSpendRatio.toFixed(1)}%`,
        thresholdValue: '警示門檻 15.0%',
        severity: 'warning',
        title: '付費搜尋無效花費超標 (Waste Spend Alert)',
        message: `累積有花費但 0 轉換之無效搜尋詞花費佔比已達 ${metrics.wasteSpendRatio.toFixed(1)}%，大量預算遭無效關鍵字侵蝕。建議當週清理搜尋字詞並導入否定清單。`,
        actionText: '管理共用否定關鍵字清單',
        targetStage: 'paid_search',
        thresholdNum: wasteThresholdVal,
        unit: '%',
        distanceText: `超標無效支出門檻 +${wasteDiffPct.toFixed(1)}% (溢出 +${(metrics.wasteSpendRatio - wasteThresholdVal).toFixed(1)}%)`,
        trendSeries: {
          '7d': [
            { day: '07/08', value: 8.5, threshold: wasteThresholdVal },
            { day: '07/09', value: 10.2, threshold: wasteThresholdVal },
            { day: '07/10', value: 11.8, threshold: wasteThresholdVal },
            { day: '07/11', value: 13.2, threshold: wasteThresholdVal },
            { day: '07/12', value: 14.6, threshold: wasteThresholdVal },
            { day: '07/13', value: 15.9, threshold: wasteThresholdVal },
            { day: '今天', value: currentWasteVal, threshold: wasteThresholdVal }
          ],
          '30d': [
            { day: '06/15', value: 5.5, threshold: wasteThresholdVal },
            { day: '06/19', value: 6.8, threshold: wasteThresholdVal },
            { day: '06/23', value: 8.2, threshold: wasteThresholdVal },
            { day: '06/27', value: 9.8, threshold: wasteThresholdVal },
            { day: '07/01', value: 11.5, threshold: wasteThresholdVal },
            { day: '07/05', value: 13.0, threshold: wasteThresholdVal },
            { day: '07/09', value: 14.8, threshold: wasteThresholdVal },
            { day: '07/12', value: 16.0, threshold: wasteThresholdVal },
            { day: '今天', value: currentWasteVal, threshold: wasteThresholdVal }
          ],
          'quarter': [
            { day: '4月初', value: 4.2, threshold: wasteThresholdVal },
            { day: '4月中', value: 5.1, threshold: wasteThresholdVal },
            { day: '5月初', value: 6.5, threshold: wasteThresholdVal },
            { day: '5月中', value: 8.0, threshold: wasteThresholdVal },
            { day: '6月初', value: 10.2, threshold: wasteThresholdVal },
            { day: '6月中', value: 12.8, threshold: wasteThresholdVal },
            { day: '7月初', value: 15.2, threshold: wasteThresholdVal },
            { day: '今天', value: currentWasteVal, threshold: wasteThresholdVal }
          ]
        }
      });
    }

    return alerts;
  };

  // 即時計算當前觸發的警報清單
  const activeAlerts = handleEvaluateMonitoringStatus(liveMonitorMetrics, baselineSettings)
    .filter(alert => !dismissedAlerts.includes(alert.id));

  const handleOpenDetail = (definition: MetricDefinition) => {
    setSelectedMetric(definition);
  };

  const handleCloseDetail = () => {
    setSelectedMetric(null);
  };

  // 導覽標籤清單
  const navItems = [
    { id: 'overview' as StageKey, label: '全漏斗總覽', icon: LayoutDashboard, group: 'funnel' },
    { id: 'seven_layers' as StageKey, label: '七大層級指標', icon: Layers, group: 'funnel' },
    { id: 'roas_diagnostic' as StageKey, label: 'ROAS四因數拆解', icon: Stethoscope, group: 'funnel' },
    { id: 'financial_roi' as StageKey, label: '綜合ROI與歸因', icon: TrendingUp, group: 'funnel' },
    { id: 'b2b_consulting' as StageKey, label: 'B2B企管顧問', icon: Briefcase, group: 'funnel' },
    { id: 'calculator' as StageKey, label: '指標模擬器', icon: Calculator, group: 'funnel' },
    
    // 關鍵字與搜尋智慧群組
    { id: 'keyword_master' as StageKey, label: '關鍵字主表 (Sheet 3)', icon: KeyRound, group: 'search' },
    { id: 'seo_performance' as StageKey, label: 'SEO成效層 (Sheet 4)', icon: Globe, group: 'search' },
    { id: 'paid_search' as StageKey, label: '付費關鍵字 (Sheet 5)', icon: DollarSign, group: 'search' },
    { id: 'aio_tracking' as StageKey, label: 'AIO生成搜尋 (Sheet 6)', icon: Bot, group: 'search' },
    { id: 'search_synergy' as StageKey, label: '搜尋協同 (Sheet 7)', icon: GitMerge, group: 'search' },
    { id: 'decision_rules' as StageKey, label: '決策規則與頻率 (Sheet 8)', icon: Scale, group: 'search' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Header - Strict 3 Zone Top Bar */}
        <Header
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          onExport={() => setShowExportModal(true)}
        />

        {/* Workspace Toolbar / Sub-Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Horizontal Scroll Navigation Tabs */}
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 min-w-max">
                {/* Funnel Group Label */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mr-1 pl-1">
                  全漏斗與財務:
                </span>
                {navItems.filter(i => i.group === 'funnel').map((item) => {
                  const Icon = item.icon;
                  const isActive = activeStage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveStage(item.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <div className="h-4 w-[1px] bg-slate-200 mx-2" />

                {/* Search & Keywords Group Label */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mr-1">
                  關鍵字試算模組:
                </span>
                {navItems.filter(i => i.group === 'search').map((item) => {
                  const Icon = item.icon;
                  const isActive = activeStage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveStage(item.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-purple-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filter Controls */}
            <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto text-xs">
              {/* Time Range */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
                {(['7d', '30d', '90d', 'ytd'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                      timeRange === range
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {range === '7d' ? '近7天' : range === '30d' ? '近30天' : range === '90d' ? '近90天' : 'YTD'}
                  </button>
                ))}
              </div>

              {/* Channel */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value as ChannelFilter)}
                  className="bg-transparent text-slate-700 font-semibold border-0 focus:ring-0 py-0.5 pr-2 text-[11px] cursor-pointer"
                >
                  <option value="all">全渠道流量</option>
                  <option value="paid">付費搜尋廣告</option>
                  <option value="organic">自然搜尋SEO</option>
                  <option value="social">社群媒體廣告</option>
                  <option value="direct">直接造訪</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Prominent Visual Warning Alert Banner (當監控指標如 ROAS 或 CPA 超過閾值時即時警示) */}
          {activeAlerts.length > 0 && (
            <section
              aria-label="行銷指標即時警報"
              className="bg-white rounded-xl border-2 border-rose-500 shadow-md p-4 sm:p-5 mb-6 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-rose-600 text-white rounded-lg shrink-0 shadow-xs">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tracking-wider uppercase bg-rose-600 text-white px-2 py-0.5 rounded">
                        緊急監控警報
                      </span>
                      <h2 className="text-sm font-bold text-slate-900">
                        偵測到 {activeAlerts.length} 項核心指標突破警戒閾值 (Threshold Exceeded)
                      </h2>
                    </div>
                    <p className="text-xs text-rose-800 mt-0.5">
                      系統依據當前毛利率 ({baselineSettings.grossMarginPct}%) 與 7 日成本基準線即時監測，以下指標已進入風險區，請立即採取營運對策：
                    </p>
                  </div>
                </div>

                {/* Simulation & Action Controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setShowSimControls(!showSimControls)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    {showSimControls ? '收起測試面板' : '測試指標變數'}
                  </button>
                  <button
                    onClick={() => setDismissedAlerts(activeAlerts.map(a => a.id))}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    暫時忽略全部
                  </button>
                </div>
              </div>

              {/* Simulation Testing Control Strip */}
              {showSimControls && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-3 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-700">指標快速模擬測試：</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => setLiveMonitorMetrics({
                        roas: 1.35,
                        cpa: 5200,
                        frequency: 4.1,
                        wasteSpendRatio: 18.5,
                        avgCpa7d: 3400
                      })}
                      className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-bold hover:bg-rose-200"
                    >
                      模擬全面超標 (ROAS虧損+CPA暴漲)
                    </button>
                    <button
                      onClick={() => setLiveMonitorMetrics({
                        roas: 1.42,
                        cpa: 3100,
                        frequency: 2.8,
                        wasteSpendRatio: 8.2,
                        avgCpa7d: 3400
                      })}
                      className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200"
                    >
                      僅模擬 ROAS 跌破損益
                    </button>
                    <button
                      onClick={() => setLiveMonitorMetrics({
                        roas: 2.85,
                        cpa: 4950,
                        frequency: 2.5,
                        wasteSpendRatio: 9.0,
                        avgCpa7d: 3400
                      })}
                      className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200"
                    >
                      僅模擬 CPA 異常飆高
                    </button>
                    <button
                      onClick={() => {
                        setLiveMonitorMetrics({
                          roas: 3.20,
                          cpa: 3100,
                          frequency: 2.6,
                          wasteSpendRatio: 6.5,
                          avgCpa7d: 3400
                        });
                        setDismissedAlerts([]);
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
                    >
                      恢復健康數值 (解除警報)
                    </button>
                  </div>
                </div>
              )}

              {/* Alert List Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeAlerts.map((alert) => {
                  const isCritical = alert.severity === 'critical';
                  return (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                        isCritical
                          ? 'bg-rose-50/80 border-rose-300'
                          : 'bg-amber-50/80 border-amber-300'
                      }`}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              isCritical ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                            }`}>
                              {isCritical ? '重大虧損風險' : '運營警示'}
                            </span>
                            <h3 className="font-bold text-xs text-slate-900">
                              {alert.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
                            className="text-slate-400 hover:text-slate-700 text-xs p-1"
                            title="關閉此警報"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Metric vs Threshold comparison */}
                        <div className="flex items-center gap-3 my-2 text-xs font-mono bg-white/80 p-2 rounded-lg border border-slate-200/60">
                          <div>
                            <span className="text-[10px] text-slate-500 block font-sans">當前即時數值</span>
                            <span className={`font-extrabold text-sm ${isCritical ? 'text-rose-700' : 'text-amber-700'}`}>
                              {alert.currentValue}
                            </span>
                          </div>
                          <div className="h-6 w-[1px] bg-slate-200" />
                          <div>
                            <span className="text-[10px] text-slate-500 block font-sans">安全基準閥值</span>
                            <span className="text-slate-800 font-bold text-xs">
                              {alert.thresholdValue}
                            </span>
                          </div>
                        </div>

                        {/* Recharts Micro Trend Chart (支援切換 7天 / 30天 / 季累計 波動趨勢與閾值距離) */}
                        {(() => {
                          const currentTimeframe = alertTimeframes[alert.id] || '7d';
                          const currentTrendData = alert.trendSeries[currentTimeframe] || alert.trendSeries['7d'];
                          const timeframeLabels: Record<AlertTimeframe, string> = {
                            '7d': '7天',
                            '30d': '30天',
                            'quarter': '季累計'
                          };

                          return (
                            <div className="my-2.5 p-2.5 rounded-lg bg-white/95 border border-slate-200 shadow-2xs">
                              {/* Trend Header with Dropdown Menu */}
                              <div className="flex flex-wrap items-center justify-between text-[11px] mb-2 font-sans gap-2 border-b border-slate-100 pb-1.5">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-semibold text-slate-700">
                                    {timeframeLabels[currentTimeframe]}波動走向：
                                  </span>
                                  <span className={`font-mono font-bold ${isCritical ? 'text-rose-700' : 'text-amber-700'}`}>
                                    {alert.distanceText}
                                  </span>
                                </div>

                                {/* 下拉選單：切換『7天』、『30天』或『季累計』 */}
                                <div className="flex items-center gap-1.5 ml-auto">
                                  <label
                                    htmlFor={`timeframe-select-${alert.id}`}
                                    className="text-[10px] text-slate-500 font-medium whitespace-nowrap"
                                  >
                                    觀測區間:
                                  </label>
                                  <select
                                    id={`timeframe-select-${alert.id}`}
                                    value={currentTimeframe}
                                    onChange={(e) => {
                                      const selected = e.target.value as AlertTimeframe;
                                      setAlertTimeframes(prev => ({
                                        ...prev,
                                        [alert.id]: selected
                                      }));
                                    }}
                                    className="text-[11px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer shadow-2xs transition-all"
                                  >
                                    <option value="7d">7天</option>
                                    <option value="30d">30天</option>
                                    <option value="quarter">季累計</option>
                                  </select>
                                </div>
                              </div>

                              <div className="h-28 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart
                                    data={currentTrendData}
                                    margin={{ top: 12, right: 12, left: -22, bottom: 0 }}
                                  >
                                <defs>
                                  <linearGradient id={`grad-alert-${alert.id}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isCritical ? '#e11d48' : '#d97706'} stopOpacity={0.35} />
                                    <stop offset="95%" stopColor={isCritical ? '#e11d48' : '#d97706'} stopOpacity={0.02} />
                                  </linearGradient>
                                </defs>
                                <XAxis
                                  dataKey="day"
                                  tickLine={false}
                                  axisLine={{ stroke: '#e2e8f0' }}
                                  tick={{ fontSize: 9, fill: '#64748b' }}
                                />
                                <YAxis
                                  domain={['auto', 'auto']}
                                  tickLine={false}
                                  axisLine={false}
                                  tick={{ fontSize: 9, fill: '#94a3b8' }}
                                />
                                <RechartsTooltip
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      const pt = payload[0].payload as AlertTrendPoint;
                                      const delta = pt.value - alert.thresholdNum;
                                      return (
                                        <div className="bg-slate-900 text-white p-2 rounded-md shadow-lg text-[10px] font-mono border border-slate-700 space-y-0.5">
                                          <div className="font-sans font-semibold text-slate-300">{pt.day}</div>
                                          <div className="text-white font-bold text-xs">
                                            監控值: {pt.value}{alert.unit}
                                          </div>
                                          <div className="text-slate-400 text-[10px]">
                                            設定閾值: {alert.thresholdNum}{alert.unit}
                                          </div>
                                          <div className={`font-bold ${
                                            alert.unit === 'x'
                                              ? (delta < 0 ? 'text-rose-400' : 'text-emerald-400')
                                              : (delta > 0 ? 'text-rose-400' : 'text-emerald-400')
                                          }`}>
                                            距離閾值: {delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}{alert.unit}
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <ReferenceLine
                                  y={alert.thresholdNum}
                                  stroke={isCritical ? '#be123c' : '#b45309'}
                                  strokeDasharray="3 3"
                                  strokeWidth={1.5}
                                  label={{
                                    value: `閾值: ${alert.thresholdNum}${alert.unit}`,
                                    position: 'insideTopRight',
                                    fill: isCritical ? '#be123c' : '#b45309',
                                    fontSize: 9,
                                    fontWeight: 700
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="value"
                                  stroke={isCritical ? '#e11d48' : '#d97706'}
                                  strokeWidth={2}
                                  fillOpacity={1}
                                  fill={`url(#grad-alert-${alert.id})`}
                                  dot={{ r: 2.5, fill: isCritical ? '#e11d48' : '#d97706', strokeWidth: 1, stroke: '#fff' }}
                                  activeDot={{ r: 4.5, stroke: '#fff', strokeWidth: 1.5 }}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Message Description */}
                        <p className="text-[11px] text-slate-700 leading-relaxed mb-3">
                          {alert.message}
                        </p>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-medium">
                          對應處置模組：
                        </span>
                        <button
                          onClick={() => setActiveStage(alert.targetStage)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1 shadow-xs cursor-pointer ${
                            isCritical
                              ? 'bg-rose-700 hover:bg-rose-800'
                              : 'bg-amber-700 hover:bg-amber-800'
                          }`}
                        >
                          <span>{alert.actionText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* If all alerts are dismissed or none active, show quiet badge with restore trigger */}
          {activeAlerts.length === 0 && dismissedAlerts.length > 0 && (
            <div className="bg-slate-100 rounded-lg px-4 py-2 mb-4 text-xs text-slate-600 flex items-center justify-between">
              <span>已關閉 {dismissedAlerts.length} 項指標警報</span>
              <button
                onClick={() => setDismissedAlerts([])}
                className="text-blue-600 hover:underline font-bold"
              >
                重新展開所有警報
              </button>
            </div>
          )}

          {/* Global Baseline Controls Strip */}
          <BaselineControls
            settings={baselineSettings}
            onChange={setBaselineSettings}
          />

          {/* Dynamic Content Views */}
          {activeStage === 'overview' && (
            <MasterDashboard
              onOpenDetail={handleOpenDetail}
              onSelectStage={setActiveStage}
            />
          )}

          {activeStage === 'seven_layers' && (
            <SevenLayersMonitor
              settings={baselineSettings}
              onOpenDetail={handleOpenDetail}
            />
          )}

          {activeStage === 'roas_diagnostic' && (
            <RoasDiagnosticCalculator
              settings={baselineSettings}
            />
          )}

          {activeStage === 'financial_roi' && (
            <RoiAttributionAnalyzer
              settings={baselineSettings}
            />
          )}

          {activeStage === 'keyword_master' && (
            <KeywordMasterTable />
          )}

          {activeStage === 'seo_performance' && (
            <SeoPerformanceView />
          )}

          {activeStage === 'paid_search' && (
            <PaidSearchMonitor />
          )}

          {activeStage === 'aio_tracking' && (
            <AioTrackingView />
          )}

          {activeStage === 'search_synergy' && (
            <SearchSynergyView />
          )}

          {activeStage === 'decision_rules' && (
            <DecisionRulesAndSchedule />
          )}

          {activeStage === 'b2b_consulting' && (
            <StageB2BConsulting onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'strategy_pivot' && (
            <StageStrategyPivot onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'awareness' && (
            <StageAwareness onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'engagement' && (
            <StageEngagement onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'conversion' && (
            <StageConversion onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'retention' && (
            <StageRetention onOpenDetail={handleOpenDetail} />
          )}

          {activeStage === 'calculator' && (
            <FormulaCalculator />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">EnGuage 行銷指標監控儀表板</span>
            <span>· 全成本財務 ROI 模型 · 8 大工作表完整架構</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveStage('roas_diagnostic')}
              className="hover:text-slate-900 font-medium"
            >
              ROAS 拆解診斷
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveStage('keyword_master')}
              className="hover:text-slate-900 font-medium"
            >
              關鍵字主表
            </button>
            <span>·</span>
            <button
              onClick={() => setShowExportModal(true)}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>匯出 .xlsx 試算表</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Metric Detail Popup Modal */}
      <MetricDetailModal
        definition={selectedMetric}
        onClose={handleCloseDetail}
      />

      {/* Export Report / Excel Modal */}
      <ExportExcelModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
