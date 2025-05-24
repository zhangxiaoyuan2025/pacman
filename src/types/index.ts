// 语气强度等级类型
export type IntensityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// 用户输入接口
export interface UserInput {
  opponentMessage: string;
  intensity: IntensityLevel;
}

// AI回复接口
export interface AIResponse {
  id: string;
  content: string;
  timestamp: number;
}

// 吵架记录接口
export interface QuarrelRecord {
  id: string;
  input: UserInput;
  responses: AIResponse[];
  timestamp: number;
  createdAt: string;
}

// 本地存储数据接口
export interface StorageData {
  records: QuarrelRecord[];
  lastUsed: number;
}

// API请求接口
export interface APIRequest {
  message: string;
  intensity: IntensityLevel;
}

// API响应接口
export interface APIResponse {
  success: boolean;
  responses?: string[];
  error?: string;
} 