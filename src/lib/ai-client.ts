import { APIRequest, APIResponse, IntensityLevel } from '@/types';

const API_KEY = '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';
const API_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'deepseek/deepseek-chat';

// 根据语气强度生成提示词
function generatePrompt(message: string, intensity: IntensityLevel): string {
  const intensityDescriptions = {
    1: '温和而礼貌',
    2: '稍微有些不满',
    3: '明确表达不同意见',
    4: '带有一定的反驳语气',
    5: '中等强度的反击',
    6: '比较强烈的反驳',
    7: '激烈的反击',
    8: '非常强烈的回怼',
    9: '极其激烈的反击',
    10: '最强烈的回怼'
  };

  const intensityDesc = intensityDescriptions[intensity];
  
  return `你是一个专业的辩论助手，擅长生成有力的回复。请根据以下要求生成回复：

对方说的话：${message}

要求：
1. 生成3条不同风格的回复内容
2. 语气强度：${intensity}/10 (${intensityDesc})
3. 回复要机智、有理有据，但不要使用脏话或人身攻击
4. 每条回复都要有不同的角度和风格
5. 回复要简洁有力，适合在游戏聊天中使用
6. 保持幽默感和智慧，让对方无话可说

请直接返回3条回复，用换行符分隔，不需要其他说明。`;
}

// 调用本地API路由生成回复
export async function generateResponses(request: APIRequest): Promise<APIResponse> {
  try {
    console.log('发送请求到本地API:', request);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        intensity: request.intensity
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('收到API响应:', data);

    return data;

  } catch (error) {
    console.error('客户端请求失败:', error);
    
    // 返回备用回复
    const fallbackResponses = [
      '网络似乎有点问题，不过我还是想说几句',
      '虽然AI暂时罢工了，但我的智慧依然在线',
      '技术故障不能阻挡我回击的决心'
    ];

    return {
      success: false,
      responses: fallbackResponses,
      error: error instanceof Error ? error.message : '网络连接失败'
    };
  }
}

// 测试API连接
export async function testConnection(): Promise<boolean> {
  try {
    const testRequest: APIRequest = {
      message: '测试消息',
      intensity: 5
    };
    
    const response = await generateResponses(testRequest);
    return response.success;
  } catch {
    return false;
  }
} 