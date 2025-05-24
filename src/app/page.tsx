'use client';

import { useState } from 'react';
import InputSection from '@/components/InputSection';
import ResultSection from '@/components/ResultSection';
import HistorySection from '@/components/HistorySection';
import { generateResponses } from '@/lib/ai-client';
import { addRecord, generateId } from '@/lib/storage';
import { IntensityLevel, AIResponse, QuarrelRecord, UserInput } from '@/types';

export default function HomePage() {
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (message: string, intensity: IntensityLevel) => {
    setIsLoading(true);
    setError(null);
    setShowResults(false);
    
    try {
      // 调用AI生成回复
      const result = await generateResponses({ message, intensity });
      
      if (!result.success || !result.responses) {
        throw new Error(result.error || 'AI生成失败');
      }

      // 创建AI回复对象
      const aiResponses: AIResponse[] = result.responses.map(content => ({
        id: generateId(),
        content,
        timestamp: Date.now(),
      }));

      // 创建用户输入对象
      const userInput: UserInput = {
        opponentMessage: message,
        intensity,
      };

      // 创建记录
      const record: QuarrelRecord = {
        id: generateId(),
        input: userInput,
        responses: aiResponses,
        timestamp: Date.now(),
        createdAt: new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // 保存到本地存储
      addRecord(record);

      // 更新状态
      setResponses(aiResponses);
      setShowResults(true);
      
    } catch (err) {
      console.error('生成回复失败:', err);
      setError(err instanceof Error ? err.message : '未知错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部标题 */}
        <header className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-responsive-lg font-bold gradient-text text-shadow mb-4">
              🔥 吵架包赢神器 🔥
            </h1>
            <div className="h-1 w-32 bg-gradient-gold rounded-full mx-auto mb-4"></div>
          </div>
          
          <p className="text-text-muted text-responsive max-w-2xl mx-auto leading-relaxed">
            专为王者荣耀玩家打造的AI智能回怼助手
            <br />
            <span className="text-primary-gold">输入对方的话 → 调节语气强度 → 获得完美回击</span>
          </p>
          
          {/* 功能亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 p-3 bg-background-card/50 rounded-xl border border-primary-gold/20">
              <span className="text-primary-gold text-lg">⚡</span>
              <span className="text-text-light text-sm font-medium">AI智能生成</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-background-card/50 rounded-xl border border-secondary-blue/20">
              <span className="text-secondary-blue-light text-lg">🎯</span>
              <span className="text-text-light text-sm font-medium">强度可调节</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-background-card/50 rounded-xl border border-secondary-red/20">
              <span className="text-secondary-red-light text-lg">🔥</span>
              <span className="text-text-light text-sm font-medium">一键复制使用</span>
            </div>
          </div>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="mb-8 p-4 bg-secondary-red/10 border border-secondary-red/30 rounded-xl text-center">
            <p className="text-secondary-red-light">⚠️ {error}</p>
          </div>
        )}

        {/* 输入区域 */}
        <div className="mb-8">
          <InputSection onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* 结果区域 */}
        {showResults && (
          <div className="mb-8">
            <ResultSection responses={responses} isVisible={showResults} />
          </div>
        )}

        {/* 历史记录区域 */}
        <div className="mb-8">
          <HistorySection />
        </div>

        {/* 使用说明 */}
        <section className="bg-background-card rounded-2xl p-6 shadow-glow border border-text-muted/20">
          <h2 className="text-xl font-bold text-text-light mb-4 text-center">
            📚 使用说明
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-gold font-bold">1</span>
              </div>
              <h3 className="font-medium text-text-light mb-2">输入内容</h3>
              <p className="text-text-muted text-sm">输入对方说的话或挑衅内容</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary-blue-light font-bold">2</span>
              </div>
              <h3 className="font-medium text-text-light mb-2">调节强度</h3>
              <p className="text-text-muted text-sm">拖动滑块调节回击的激烈程度</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-secondary-red-light font-bold">3</span>
              </div>
              <h3 className="font-medium text-text-light mb-2">AI生成</h3>
              <p className="text-text-muted text-sm">获得3条不同风格的回击内容</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-gold font-bold">4</span>
              </div>
              <h3 className="font-medium text-text-light mb-2">复制使用</h3>
              <p className="text-text-muted text-sm">选择合适的回复复制到游戏中</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-background-dark rounded-xl border border-primary-gold/20">
            <h3 className="text-text-light font-medium mb-2 flex items-center gap-2">
              <span className="text-primary-gold">💡</span>
              温馨提示
            </h3>
            <ul className="text-text-muted text-sm space-y-1">
              <li>• 语气强度1-3：温和回应，以理服人</li>
              <li>• 语气强度4-7：中等强度，据理力争</li>
              <li>• 语气强度8-10：激烈反击，气势压人</li>
              <li>• 历史记录会自动保存，最多保留50条</li>
              <li>• 请理性使用，营造良好的游戏环境</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
} 