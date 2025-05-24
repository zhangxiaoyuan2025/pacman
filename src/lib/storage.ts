import { QuarrelRecord, StorageData } from '@/types';

const STORAGE_KEY = 'quarrel-master-data';
const MAX_RECORDS = 50; // 最多保存50条记录

// 获取存储数据
export function getStorageData(): StorageData {
  if (typeof window === 'undefined') {
    return { records: [], lastUsed: 0 };
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { records: [], lastUsed: 0 };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('读取本地存储失败:', error);
    return { records: [], lastUsed: 0 };
  }
}

// 保存存储数据
export function setStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('保存本地存储失败:', error);
  }
}

// 添加新记录
export function addRecord(record: QuarrelRecord): void {
  const data = getStorageData();
  
  // 添加新记录到开头
  data.records.unshift(record);
  
  // 限制记录数量
  if (data.records.length > MAX_RECORDS) {
    data.records = data.records.slice(0, MAX_RECORDS);
  }
  
  // 更新最后使用时间
  data.lastUsed = Date.now();
  
  setStorageData(data);
}

// 获取历史记录
export function getRecords(): QuarrelRecord[] {
  return getStorageData().records;
}

// 清空历史记录
export function clearRecords(): void {
  setStorageData({ records: [], lastUsed: Date.now() });
}

// 删除指定记录
export function deleteRecord(recordId: string): void {
  const data = getStorageData();
  data.records = data.records.filter(record => record.id !== recordId);
  setStorageData(data);
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
} 