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

// 调用AI生成回复
export async function generateResponses(request: APIRequest): Promise<APIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://quarrel-master.com',
        'X-Title': 'Quarrel Master Tool',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: generatePrompt(request.message, request.intensity)
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API返回数据格式错误');
    }

    const content = data.choices[0].message.content;
    
    // 解析AI返回的内容，分割成3条回复
    const responses = content
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .slice(0, 3); // 确保只取前3条

    if (responses.length < 3) {
      // 如果返回的回复少于3条，用备用回复补充
      const backupResponses = [
        '你这话说得，让我想到了一个词：无知者无畏',
        '哦，原来是这样啊，那我算是长见识了',
        '说得好！下次记得带上脑子一起说'
      ];
      
      while (responses.length < 3) {
        responses.push(backupResponses[responses.length] || '你说得对，我无话可说');
      }
    }

    return {
      success: true,
      responses: responses
    };

  } catch (error) {
    console.error('AI生成回复失败:', error);
    
    // 返回备用回复
    const fallbackResponses = [
      '你这话说得很有道理，让我重新思考一下',
      '哇，这个角度我还真没想过',
      '说得好，不过我还是有不同看法'
    ];

    return {
      success: false,
      responses: fallbackResponses,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

// 测试AI连接
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