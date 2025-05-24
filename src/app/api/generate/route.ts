import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPENROUTER_API_KEY || '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';
const API_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'deepseek/deepseek-chat';

function generatePrompt(message: string, intensity: number): string {
  const intensityDescriptions: { [key: number]: string } = {
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

export async function POST(request: NextRequest) {
  try {
    const { message, intensity } = await request.json();

    // 验证输入
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: '请输入有效的消息内容' },
        { status: 400 }
      );
    }

    if (!intensity || intensity < 1 || intensity > 10) {
      return NextResponse.json(
        { success: false, error: '语气强度必须在1-10之间' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API密钥未配置，请联系管理员' },
        { status: 500 }
      );
    }

    console.log('开始调用AI API...');

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://quarrel-master.vercel.app',
        'X-Title': 'Quarrel Master Tool',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: generatePrompt(message, intensity)
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API错误:', response.status, errorText);
      throw new Error(`AI API请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('AI API返回数据格式错误');
    }

    const content = data.choices[0].message.content;
    console.log('AI返回内容:', content);
    
    // 解析AI返回的内容，分割成3条回复
    const responses = content
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .slice(0, 3);

    // 确保有3条回复
    if (responses.length < 3) {
      const backupResponses = [
        '你这话说得，让我想到了一个词：无知者无畏',
        '哦，原来是这样啊，那我算是长见识了',
        '说得好！下次记得带上脑子一起说'
      ];
      
      while (responses.length < 3) {
        responses.push(backupResponses[responses.length] || '你说得对，我无话可说');
      }
    }

    console.log('成功生成回复:', responses);

    return NextResponse.json({
      success: true,
      responses: responses
    });

  } catch (error) {
    console.error('API路由错误:', error);
    
    // 返回备用回复
    const fallbackResponses = [
      '你这话说得很有道理，让我重新思考一下',
      '哇，这个角度我还真没想过',
      '说得好，不过我还是有不同看法'
    ];

    return NextResponse.json({
      success: false,
      responses: fallbackResponses,
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 