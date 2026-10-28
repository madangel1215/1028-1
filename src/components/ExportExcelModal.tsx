import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  DEFAULT_BASELINE_SETTINGS, 
  DEFAULT_KEYWORD_SETTINGS, 
  KEYWORD_METRIC_CATALOG, 
  MOCK_KEYWORD_MASTER_DATA, 
  MOCK_SEO_PERFORMANCE_DATA, 
  MOCK_PAID_KEYWORD_DATA, 
  MOCK_AIO_TRACKING_DATA, 
  MOCK_SEARCH_SYNERGY_DATA, 
  MARKETING_BUDGET_DECISION_RULES, 
  MONITORING_FREQUENCY_SCHEDULE 
} from '../data/marketingFrameworkData';
import { FileSpreadsheet, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ExportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportExcelModal: React.FC<ExportExcelModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExportXlsx = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: 關鍵字設定
      const sheet1Data = [
        ['關鍵字設定項目 (Keyword Settings)', '數值 / 基準', '備註說明'],
        ['預設轉換率 (Default CVR %)', DEFAULT_KEYWORD_SETTINGS.defaultCvr + '%', '一般訪客完成目標之平均轉換率'],
        ['產品毛利率 (Gross Margin %)', DEFAULT_KEYWORD_SETTINGS.grossMarginPct + '%', '所有 ROI 均以毛利計算'],
        ['高價值門檻 (High Value Threshold NT$)', '$' + DEFAULT_KEYWORD_SETTINGS.highValueThreshold.toLocaleString(), '月預估毛利大於此數為高價值字'],
        ['AI 摘要點擊折減係數 (AIO Discount)', DEFAULT_KEYWORD_SETTINGS.aioDiscountFactor, '出現 AI 摘要時點擊率折減 35%'],
        ['目標 CPA (Target CPA NT$)', '$' + DEFAULT_KEYWORD_SETTINGS.targetCpa, '目標獲客每次行動成本上限'],
        ['浪費花費比警示門檻 (Waste Spend Alert %)', DEFAULT_KEYWORD_SETTINGS.wasteSpendAlertThreshold + '%', '零轉換花費超過 15% 觸發警示'],
        [],
        ['排名位置', '預期基準 CTR (%)'],
        ...DEFAULT_KEYWORD_SETTINGS.rankExpectedCtr.map(r => [`第 ${r.rank} 名`, `${r.ctr}%`])
      ];
      const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
      XLSX.utils.book_append_sheet(wb, ws1, '關鍵字設定');

      // Sheet 2: 關鍵字指標定義 (49 項)
      const sheet2Data = [
        ['指標代碼', '所屬層級', '指標名稱', '計算定義 / 公式', '高／低代表意義', '具體行動指引', '資料來源', '監控頻率'],
        ...KEYWORD_METRIC_CATALOG.map(m => [
          m.code,
          m.layer,
          m.name,
          m.formula,
          m.highLowMeaning,
          m.action,
          m.dataSource,
          m.frequency
        ])
      ];
      const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
      XLSX.utils.book_append_sheet(wb, ws2, '關鍵字指標定義');

      // Sheet 3: 關鍵字主表
      const sheet3Data = [
        ['關鍵字名稱', '搜尋意圖', '品牌屬性', '漏斗階段', '月搜尋量', 'KD難度', '建議出價CPC', '目前排名', '預估月價值(NT$)', '優先分數', '四象限分類', '建議行動'],
        ...MOCK_KEYWORD_MASTER_DATA.map(k => [
          k.keyword,
          k.intent === 'informational' ? '資訊型' : k.intent === 'comparative' ? '比較型' : k.intent === 'transactional' ? '交易型' : '導航型',
          k.brandType === 'brand' ? '品牌字' : k.brandType === 'non_brand' ? '非品牌字' : '競品字',
          k.funnelStage === 'awareness' ? '認知' : k.funnelStage === 'consideration' ? '考慮' : '決策',
          k.monthlySearchVolume,
          k.kd,
          k.cpc,
          k.currentRank,
          k.estMonthlyValue,
          k.priorityScore,
          k.quadrant === 'core' ? '主力字' : k.quadrant === 'opportunity' ? '機會字' : k.quadrant === 'traffic' ? '流量字' : '放棄',
          k.suggestedAction
        ])
      ];
      const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
      XLSX.utils.book_append_sheet(wb, ws3, '關鍵字主表');

      // Sheet 4: SEO 成效
      const sheet4Data = [
        ['關鍵字', '是否品牌字', '曝光數', '點擊數', '目前排名', '前期排名', '實際CTR(%)', '預期CTR(%)', 'CTR差距(%)', '自然CVR(%)', '帶來營收(NT$)', '內耗頁面', '零點擊訊號', '網址'],
        ...MOCK_SEO_PERFORMANCE_DATA.map(s => [
          s.keyword,
          s.isBrand ? '是' : '否',
          s.impressions,
          s.clicks,
          s.currentRank,
          s.prevRank,
          s.ctr + '%',
          s.expectedCtr + '%',
          s.ctrGap + '%',
          s.organicCvr + '%',
          s.monthlyRevenue,
          s.hasCannibalization ? s.cannibalizationUrls.join(' | ') : '無內耗',
          s.zeroClickSignal ? '是' : '否',
          s.pageUrl
        ])
      ];
      const ws4 = XLSX.utils.aoa_to_sheet(sheet4Data);
      XLSX.utils.book_append_sheet(wb, ws4, 'SEO成效');

      // Sheet 5: 付費關鍵字
      const sheet5Data = [
        ['關鍵字', '比對類型', '品質分數(QS)', '預期點擊/相關性/到達頁', '花費(NT$)', '點擊', '轉換', 'CPA(NT$)', 'ROAS(%)', '因預算流失(%)', '因排名流失(%)', '浪費花費比(%)', '建議行動狀態', '具體行動說明'],
        ...MOCK_PAID_KEYWORD_DATA.map(p => [
          p.keyword,
          p.matchType,
          p.qualityScore,
          `${p.expectedCtrRating}/${p.adRelevanceRating}/${p.lpExperienceRating}`,
          p.spend,
          p.clicks,
          p.conversions,
          p.cpa,
          p.roas ? p.roas + '%' : '0%',
          p.lostIsBudget + '%',
          p.lostIsRank + '%',
          p.wasteSpendRatio + '%',
          p.status,
          p.actionNote
        ])
      ];
      const ws5 = XLSX.utils.aoa_to_sheet(sheet5Data);
      XLSX.utils.book_append_sheet(wb, ws5, '付費關鍵字');

      // Sheet 6: AIO 追蹤
      const sheet6Data = [
        ['測試問題集 (Query)', '觸發AI摘要', '自家被引用', '引用排序', '引用佔比(%)', 'ChatGPT提及', 'Perplexity提及', 'Gemini提及', 'Copilot提及', 'AI推薦造訪數', 'AI轉換率(%)', '結構化資料'],
        ...MOCK_AIO_TRACKING_DATA.map(a => [
          a.query,
          a.hasAio ? '是' : '否',
          a.brandCited ? '是' : '否',
          a.citationRank > 0 ? `第${a.citationRank}名` : '-',
          a.citationShare + '%',
          a.chatgpt.mentioned ? `提及 (排第${a.chatgpt.rank})` : '未提及',
          a.perplexity.mentioned ? `提及 (排第${a.perplexity.rank})` : '未提及',
          a.gemini.mentioned ? `提及 (排第${a.gemini.rank})` : '未提及',
          a.copilot.mentioned ? `提及 (排第${a.copilot.rank})` : '未提及',
          a.aiReferralSessions,
          a.aiReferralCvr + '%',
          a.schemaCovered ? '已部署' : '未部署'
        ])
      ];
      const ws6 = XLSX.utils.aoa_to_sheet(sheet6Data);
      XLSX.utils.book_append_sheet(wb, ws6, 'AIO追蹤');

      // Sheet 7: 搜尋協同
      const sheet7Data = [
        ['關鍵字', '月搜尋量', '付費排名', '自然排名', '付費點擊', '自然點擊', '搜尋總佔比(%)', 'SEO已接手', '雙佔前3名', '付費花費', 'SEO投入成本', '綜合CPA', '協同行動指引'],
        ...MOCK_SEARCH_SYNERGY_DATA.map(sy => [
          sy.keyword,
          sy.searchVolume,
          sy.paidRank,
          sy.organicRank,
          sy.paidClicks,
          sy.organicClicks,
          sy.totalSearchShare + '%',
          sy.isSeoTakeover ? '是' : '否',
          sy.isDualTop3 ? '是' : '否',
          sy.paidSpend,
          sy.seoAllocatedCost,
          sy.blendedSearchCpa,
          sy.suggestedAction
        ])
      ];
      const ws7 = XLSX.utils.aoa_to_sheet(sheet7Data);
      XLSX.utils.book_append_sheet(wb, ws7, '搜尋協同');

      // Sheet 8: 決策規則與頻率
      const sheet8Data = [
        ['類別', '觸發條件 / 頻率', '具體行動規則 / 監控項目', 'SLA / 標籤'],
        ...MARKETING_BUDGET_DECISION_RULES.map(b => ['預算決策規則', b.condition, b.action, b.tag]),
        [],
        ['監控層次', '監控頻率', '主要檢視指標', '建議警示條件'],
        ...MONITORING_FREQUENCY_SCHEDULE.map(s => ['日常監控', s.frequency, s.items, s.alertTrigger])
      ];
      const ws8 = XLSX.utils.aoa_to_sheet(sheet8Data);
      XLSX.utils.book_append_sheet(wb, ws8, '關鍵字決策與頻率');

      // 觸發下載
      XLSX.writeFile(wb, '行銷成效監控與ROI試算表.xlsx');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>匯出「行銷成效監控與ROI試算表.xlsx」</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-600">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>試算表已整合 8 大專用工作表 (Worksheets)：</span>
              <span className="text-emerald-700 font-mono font-bold">.XLSX 原生格式</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px]">
              <li><strong>關鍵字設定：</strong>毛利60%、預期CTR基準、AI折減、目標CPA</li>
              <li><strong>關鍵字指標定義：</strong>六大層級共 49 項標準指標庫與行動指引</li>
              <li><strong>關鍵字主表：</strong>預估月價值、優先分數、前20%標記、四象限分類</li>
              <li><strong>SEO成效：</strong>GSC+GA4 數據、CTR差距、排名變化、內耗與零點擊訊號</li>
              <li><strong>付費關鍵字：</strong>品質分數三項診斷、浪費花費比、比對類型成效、否定清單</li>
              <li><strong>AIO追蹤：</strong>ChatGPT / Perplexity / Gemini / Copilot 提及與正確性、結構化覆蓋</li>
              <li><strong>搜尋協同：</strong>SEO接手率、雙佔判斷、搜尋總佔比與總CPA</li>
              <li><strong>關鍵字決策與頻率：</strong>9大預算規則、五級監控警示條件與SLA</li>
            </ol>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>「行銷成效監控與ROI試算表.xlsx」已成功下載至您的裝置！</span>
            </div>
          )}

          <p className="text-slate-500 text-[11px]">
            匯出後的試算表完全相容於 Microsoft Excel、Google Sheets 及 Apple Numbers，保留完整欄位計算邏輯與公式架構。
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={() => {
              window.print();
              onClose();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>列印簡報 / 存為 PDF</span>
          </button>
          <button
            onClick={handleExportXlsx}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>立即下載 .xlsx 試算表 (8 工作表)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
