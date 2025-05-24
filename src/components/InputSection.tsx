'use client';

import { useState } from 'react';
import { IntensityLevel } from '@/types';

interface InputSectionProps {
  onSubmit: (message: string, intensity: IntensityLevel) => void;
  isLoading: boolean;
}

export default function InputSection({ onSubmit, isLoading }: InputSectionProps) {
  const [message, setMessage] = useState('');
  const [intensity, setIntensity] = useState<IntensityLevel>(5);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSubmit(message.trim(), intensity);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-background-card rounded-2xl p-6 shadow-glow border border-primary-gold/20">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
          输入对方的话
        </h2>
        <p className="text-text-muted text-sm mt-2">
          让AI帮你生成完美的回击！
        </p>
      </div>

      {/* 消息输入框 */}
      <div className="mb-6">
        <label className="block text-text-light text-sm font-medium mb-3">
          对方说了什么？
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入对方的话，比如：你太菜了，还是卸载游戏吧..."
          className="w-full h-32 px-4 py-3 bg-background-dark border border-primary-gold/30 rounded-xl 
                     text-text-light placeholder-text-muted resize-none
                     focus:outline-none focus:border-primary-gold focus:shadow-glow
                     transition-all duration-300"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <span>Ctrl + Enter 快速提交</span>
          <span>{message.length}/500</span>
        </div>
      </div>

      {/* 语气强度滑动条 */}
      <div className="mb-6">
        <label className="block text-text-light text-sm font-medium mb-3">
          语气强烈程度: <span className="text-primary-gold">{intensity}/10</span>
        </label>
        
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value) as IntensityLevel)}
            className="w-full h-3 bg-background-dark rounded-lg appearance-none cursor-pointer
                       slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 
                       slider-thumb:bg-gradient-gold slider-thumb:rounded-full 
                       slider-thumb:shadow-glow slider-thumb:cursor-pointer"
            disabled={isLoading}
          />
          
          {/* 刻度标签 */}
          <div className="flex justify-between text-xs text-text-muted mt-2 px-1">
            <span>温和</span>
            <span>中等</span>
            <span>激烈</span>
          </div>
        </div>

        {/* 强度描述 */}
        <div className="mt-3 p-3 bg-background-dark-light rounded-lg">
          <p className="text-sm text-text-muted">
            {intensity <= 3 && '🤝 温和回应，以理服人'}
            {intensity > 3 && intensity <= 7 && '⚡ 中等强度，据理力争'}
            {intensity > 7 && '🔥 激烈反击，气势压人'}
          </p>
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        onClick={handleSubmit}
        disabled={!message.trim() || isLoading}
        className="w-full py-4 bg-gradient-gold text-background-dark font-bold text-lg rounded-xl
                   shadow-glow hover:shadow-glow-blue hover:scale-105 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-300 ease-out"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin" />
            AI正在思考中...
          </div>
        ) : (
          '🔥 开始吵架'
        )}
      </button>

      {/* 提示信息 */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-muted">
          💡 提示：语气强度越高，回复越犀利哦！
        </p>
      </div>
    </div>
  );
} 