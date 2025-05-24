'use client';

import { useState, useEffect } from 'react';
import { QuarrelRecord } from '@/types';
import { getRecords, clearRecords, deleteRecord } from '@/lib/storage';

export default function HistorySection() {
  const [records, setRecords] = useState<QuarrelRecord[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleClearAll = () => {
    if (window.confirm('确定要清空所有历史记录吗？')) {
      clearRecords();
      setRecords([]);
    }
  };

  const handleDeleteRecord = (recordId: string) => {
    deleteRecord(recordId);
    setRecords(getRecords());
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  if (records.length === 0) {
    return null;
  }

  const displayRecords = isExpanded ? records : records.slice(0, 3);

  return (
    <div className="bg-background-card rounded-2xl p-6 shadow-glow border border-secondary-red/20">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-light">
            历史记录
          </h2>
          <p className="text-text-muted text-sm mt-1">
            共 {records.length} 条记录
          </p>
        </div>
        
        <button
          onClick={handleClearAll}
          className="px-3 py-1 text-xs text-secondary-red border border-secondary-red/30 
                     rounded-lg hover:bg-secondary-red/10 transition-colors duration-300"
        >
          清空
        </button>
      </div>

      {/* 记录列表 */}
      <div className="space-y-3">
        {displayRecords.map((record) => (
          <div
            key={record.id}
            className="bg-background-dark-light border border-text-muted/20 rounded-xl p-4 
                       hover:border-primary-gold/30 transition-all duration-300"
          >
            {/* 记录头部 */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-text-muted text-xs mb-1">
                  {record.createdAt} • 强度 {record.input.intensity}/10
                </p>
                                <p className="text-text-light text-sm font-medium">                  &ldquo;{record.input.opponentMessage}&rdquo;                </p>
              </div>
              
              <button
                onClick={() => handleDeleteRecord(record.id)}
                className="p-1 text-text-muted hover:text-secondary-red transition-colors duration-300"
                title="删除记录"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 回复内容 */}
            <div className="space-y-2">
              {record.responses.slice(0, 2).map((response, index) => (
                <div
                  key={response.id}
                  className="group flex items-start gap-3 p-2 bg-background-dark rounded-lg 
                           hover:bg-background-dark-light transition-colors duration-300"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-primary-gold/20 text-primary-gold 
                                 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  
                  <p className="flex-1 text-text-light text-sm leading-relaxed">
                    {response.content}
                  </p>
                  
                  <button
                    onClick={() => copyToClipboard(response.content)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-primary-gold 
                             hover:bg-primary-gold/10 rounded transition-all duration-300"
                    title="复制"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {record.responses.length > 2 && (
                <p className="text-text-muted text-xs text-center py-1">
                  +{record.responses.length - 2} 条回复
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 展开/收起按钮 */}
      {records.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-sm text-primary-gold border border-primary-gold/30 
                       rounded-lg hover:bg-primary-gold/10 transition-all duration-300"
          >
            {isExpanded ? '收起' : `查看全部 (${records.length})`}
          </button>
        </div>
      )}

      {/* 说明 */}
      <div className="mt-4 p-3 bg-background-dark rounded-lg border border-text-muted/20">
        <p className="text-text-muted text-xs flex items-center gap-2">
          <span>💾</span>
          历史记录保存在本地，最多保留50条记录
        </p>
      </div>
    </div>
  );
} 