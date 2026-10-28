import React, { useState } from 'react';
import { SEVEN_LAYERS_DEFINITIONS } from '../data/marketingFrameworkData';
import { MetricDefinition, BaselineSettings } from '../types';
import { 
  Eye, 
  MousePointerClick, 
  Globe, 
  Users, 
  DollarSign, 
  HeartHandshake, 
  BriefcaseBusiness,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface SevenLayersMonitorProps {
  settings: BaselineSettings;
  onOpenDetail: (definition: MetricDefinition) => void;
}

export const SevenLayersMonitor: React.FC<SevenLayersMonitorProps> = ({ settings, onOpenDetail }) => {
  const [activeLayer, setActiveLayer] = useState<string>('layer1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);

  const layerTabs = [
    { id: 'layer1', title: '一、曝光與觸及層', subtitle: '上漏斗：品牌知名度', icon: Eye },
    { id: 'layer2', title: '二、互動層', subtitle: '素材與訊息共鳴度', icon: MousePointerClick },
    { id: 'layer3', title: '三、流量與網站層', subtitle: 'GA4 與流量實質品質', icon: Globe },
    { id: 'layer4', title: '四、名單與轉換層', subtitle: 'B2B/電商轉化效率', icon: Users },
    { id: 'layer5', title: '五、營收層', subtitle: 'ROAS 與商機規模', icon: DollarSign },
    { id: 'layer6', title: '六、客戶價值層', subtitle: 'LTV/CAC 與留存續約', icon: HeartHandshake },
    { id: 'layer7', title: '七、財務 ROI 層', subtitle: '老闆真正要看的指標', icon: BriefcaseBusiness }
  ];

  const currentMetrics = SEVEN_LAYERS_DEFINITIONS[activeLayer] || [];

  const filteredMetrics = currentMetrics.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">七大層級行銷監控指標體系 (7 Marketing Performance Layers)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            從頂部曝光、素材互動、網站質量、商機轉換、營收到財務最終利潤，定義清晰的計算公式、高低意義與具體行動。
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋層級指標名稱或公式..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Layer Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {layerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeLayer === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{tab.title.slice(0, 7)}</span>
              </div>
              <div className={`text-[10px] truncate ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                {tab.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Layer Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((metric) => {
          const isActionOpen = expandedActionId === metric.id;
          return (
            <div
              key={metric.id}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {metric.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{metric.dataSource || 'GA4 / Ads'}</span>
                      <span>·</span>
                      <span>監控頻率: {metric.frequency || '每週'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenDetail(metric)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="查看官方定義詳情"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Definition */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {metric.definition}
                </p>

                {/* Formula Box */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-800 mb-3 space-y-1">
                  <div className="text-[10px] uppercase font-sans font-semibold text-slate-400 tracking-wider">
                    計算定義 / 公式
                  </div>
                  <div className="font-semibold text-slate-900 break-words text-[11px]">
                    {metric.formula}
                  </div>
                </div>

                {/* High/Low Meaning */}
                {metric.highLowMeaning && (
                  <div className="text-xs text-slate-600 mb-3 space-y-0.5">
                    <span className="font-bold text-slate-800">高／低代表：</span>
                    <span className="text-slate-600">{metric.highLowMeaning}</span>
                  </div>
                )}
              </div>

              {/* Action Toggle Strip */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setExpandedActionId(isActionOpen ? null : metric.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>具體行動指引 (Action Item)</span>
                  </span>
                  {isActionOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isActionOpen && (
                  <div className="mt-2 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-slate-700 animate-in fade-in duration-150">
                    <div className="font-semibold text-blue-900 mb-1">對應決策行動：</div>
                    <p className="leading-relaxed text-[11px] text-slate-700">
                      {metric.concreteAction || metric.tips.join('；')}
                    </p>
                    <div className="mt-2 text-[10px] text-blue-700 font-mono">
                      標準基準線: {metric.benchmark}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
