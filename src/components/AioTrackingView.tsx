import React, { useState } from 'react';
import { AioTrackingRow } from '../types';
import { MOCK_AIO_TRACKING_DATA } from '../data/marketingFrameworkData';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Code,
  FileCheck2
} from 'lucide-react';

export const AioTrackingView: React.FC = () => {
  const [data, setData] = useState<AioTrackingRow[]>(MOCK_AIO_TRACKING_DATA);

  // 匯總跨模型提及率
  const chatgptMentionRate = Math.round((data.filter(r => r.chatgpt.mentioned).length / data.length) * 100);
  const perplexityMentionRate = Math.round((data.filter(r => r.perplexity.mentioned).length / data.length) * 100);
  const geminiMentionRate = Math.round((data.filter(r => r.gemini.mentioned).length / data.length) * 100);
  const copilotMentionRate = Math.round((data.filter(r => r.copilot.mentioned).length / data.length) * 100);

  const totalAiReferral = data.reduce((acc, r) => acc + r.aiReferralSessions, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">AIO 追蹤層 (AI Overviews & LLM Search Engine Optimization)</h2>
            <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200 font-semibold">
              Sheet 6 生成式搜尋追蹤
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            目標從單純爭取「搜尋排名」升級為<strong>「被 AI 引用與推薦」</strong>。橫向追蹤 ChatGPT、Perplexity、Gemini、Copilot 四大平台品牌提及、排序與描述正確性。
          </p>
        </div>

        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <div>
            <div className="font-bold">AI 推薦總進站流量: <span className="font-mono">{totalAiReferral.toLocaleString()}</span> 次</div>
            <div className="text-[10px] text-purple-700">GA4 自訂管道群組「AI 推薦」自動歸因</div>
          </div>
        </div>
      </div>

      {/* 4 Major LLM Platform Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ChatGPT */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>ChatGPT Search</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {chatgptMentionRate}% 提及率
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            首重第三方媒體深度評測、維基數據與產業報導背書。
          </p>
        </div>

        {/* Perplexity */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Perplexity.ai</span>
            </span>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {perplexityMentionRate}% 提及率
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            極度依賴繁體中文官方白皮書與結構化定義表格，引用首位率最高。
          </p>
        </div>

        {/* Gemini */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Google Gemini / AIO</span>
            </span>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {geminiMentionRate}% 提及率
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            與 Search Console AI Overviews 高度連動，開頭直接回答問題最容易入選。
          </p>
        </div>

        {/* Copilot */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Microsoft Copilot</span>
            </span>
            <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              {copilotMentionRate}% 提及率
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            結合 Bing 索引，在地化企業資訊需同步更新於 Bing Webmaster。
          </p>
        </div>
      </div>

      {/* Query Benchmark Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
          <span>固定測試問題集 (LLM Benchmark Queries) 橫向比對評測表</span>
          <span className="text-[10px] text-slate-500 font-normal">每月固定以相同 Prompt 測試並紀錄歷史趨勢</span>
        </div>

        <div className="divide-y divide-slate-100">
          {data.map((item) => (
            <div key={item.id} className="p-5 space-y-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-sm text-slate-900">「{item.query}」</span>
                  {item.hasAio && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      觸發 AI 摘要
                    </span>
                  )}
                  {item.brandCited ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ 自家被引用 (第{item.citationRank}來源)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      ✕ 未被列為來源
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span>AI引用佔比: <strong>{item.citationShare}%</strong></span>
                  <span>·</span>
                  <span>AI推薦流量: <strong>{item.aiReferralSessions}</strong> 造訪 (CVR {item.aiReferralCvr}%)</span>
                </div>
              </div>

              {/* 4 Models Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* ChatGPT */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">ChatGPT</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.chatgpt.mentioned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.chatgpt.mentioned ? `提及 (排第${item.chatgpt.rank})` : '未提及'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.chatgpt.note}
                  </p>
                  {item.chatgpt.mentioned && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      描述正確率: {item.chatgpt.accuracyScore}%
                    </div>
                  )}
                </div>

                {/* Perplexity */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Perplexity</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.perplexity.mentioned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.perplexity.mentioned ? `提及 (排第${item.perplexity.rank})` : '未提及'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.perplexity.note}
                  </p>
                  {item.perplexity.mentioned && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      描述正確率: {item.perplexity.accuracyScore}%
                    </div>
                  )}
                </div>

                {/* Gemini */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Gemini</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.gemini.mentioned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.gemini.mentioned ? `提及 (排第${item.gemini.rank})` : '未提及'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.gemini.note}
                  </p>
                  {item.gemini.mentioned && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      描述正確率: {item.gemini.accuracyScore}%
                    </div>
                  )}
                </div>

                {/* Copilot */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Copilot</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.copilot.mentioned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.copilot.mentioned ? `提及 (排第${item.copilot.rank})` : '未提及'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.copilot.note}
                  </p>
                  {item.copilot.mentioned && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      描述正確率: {item.copilot.accuracyScore}%
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar for this query */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2">
                  <FileCheck2 className={`w-4 h-4 ${item.schemaCovered ? 'text-emerald-600' : 'text-amber-500'}`} />
                  <span className="text-slate-600">
                    結構化資料覆蓋 (Schema.org): {item.schemaCovered ? '✓ 已完整部署 FAQPage 與 Article' : '⚠ 缺少結構化資料，AI 較難解析正確定義'}
                  </span>
                </div>
                {!item.schemaCovered && (
                  <span className="text-blue-600 font-semibold text-[11px]">
                    具體行動：於該主題頁優先部署 FAQ JSON-LD 結構化資料
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
