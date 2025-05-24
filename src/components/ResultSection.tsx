'use client';

import { useState } from 'react';
import { AIResponse } from '@/types';

interface ResultSectionProps {
  responses: AIResponse[];
  isVisible: boolean;
}

export default function ResultSection({ responses, isVisible }: ResultSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  if (!isVisible || responses.length === 0) {
    return null;
  }

  return (
    <div className="animate-slide-up">
      <div className="bg-background-card rounded-2xl p-6 shadow-glow border border-secondary-blue/20">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-blue bg-clip-text text-transparent">
            AI回怼神器
          </h2>
          <p className="text-text-muted text-sm mt-2">
            选择一条最合适的回复，复制去怼他！
          </p>
        </div>

        {/* 回复列表 */}
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div
              key={response.id}
              className="group relative bg-background-dark-light border border-primary-gold/20 
                         rounded-xl p-4 hover:border-primary-gold hover:shadow-glow 
                         transition-all duration-300"
            >
              {/* 回复序号 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-gold rounded-full 
                               flex items-center justify-center text-background-dark font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* 回复内容 */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-light text-base leading-relaxed break-words">
                    {response.content}
                  </p>
                  
                  {/* 回复标签 */}
                  <div className="flex gap-2 mt-3">
                    {index === 0 && (
                      <span className="px-2 py-1 bg-secondary-blue/20 text-secondary-blue-light 
                                     text-xs rounded-md border border-secondary-blue/30">
                        🎯 精准回击
                      </span>
                    )}
                    {index === 1 && (
                      <span className="px-2 py-1 bg-primary-gold/20 text-primary-gold 
                                     text-xs rounded-md border border-primary-gold/30">
                        🧠 智慧型
                      </span>
                    )}
                    {index === 2 && (
                      <span className="px-2 py-1 bg-secondary-red/20 text-secondary-red-light 
                                     text-xs rounded-md border border-secondary-red/30">
                        🔥 气势型
                      </span>
                    )}
                  </div>
                </div>

                {/* 复制按钮 */}
                <button
                  onClick={() => copyToClipboard(response.content, response.id)}
                  className="flex-shrink-0 p-2 bg-primary-gold/10 hover:bg-primary-gold/20 
                           text-primary-gold rounded-lg border border-primary-gold/30
                           opacity-0 group-hover:opacity-100 transition-all duration-300
                           hover:scale-110"
                  title="复制这条回复"
                >
                  {copiedId === response.id ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 使用提示 */}
        <div className="mt-6 p-4 bg-background-dark rounded-xl border border-primary-gold/20">
          <div className="flex items-start gap-3">
            <div className="text-primary-gold text-lg">💡</div>
            <div>
              <h3 className="text-text-light font-medium text-sm mb-1">使用技巧</h3>
              <ul className="text-text-muted text-xs space-y-1">
                <li>• 点击右侧复制按钮，一键复制回复内容</li>
                <li>• 选择最适合当前情况的回复风格</li>
                <li>• 适当修改回复内容，让它更贴合你的语言风格</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3 bg-secondary-blue/10 hover:bg-secondary-blue/20 
                       text-secondary-blue-light border border-secondary-blue/30 
                       rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            🔄 重新生成
          </button>
          
          <button
            onClick={() => {
              const allText = responses.map((r, i) => `${i + 1}. ${r.content}`).join('\n\n');
              copyToClipboard(allText, 'all');
            }}
            className="flex-1 py-3 bg-primary-gold/10 hover:bg-primary-gold/20 
                       text-primary-gold border border-primary-gold/30 
                       rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            📋 复制全部
          </button>
        </div>
      </div>
    </div>
  );
} 