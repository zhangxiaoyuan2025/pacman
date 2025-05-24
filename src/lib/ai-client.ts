import { APIRequest, APIResponse, IntensityLevel } from '@/types';

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