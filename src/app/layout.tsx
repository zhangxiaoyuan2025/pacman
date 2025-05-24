import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://quarrel-master.vercel.app'),
  title: '吵架包赢神器 - AI智能回怼助手',
  description: '王者荣耀专属回怼神器，AI帮你生成完美回击！语气强度任你调节，让对手无话可说。',
  keywords: '吵架, 回怼, AI助手, 王者荣耀, 游戏聊天, 智能回复',
  authors: [{ name: '吵架包赢神器' }],
  openGraph: {
    title: '吵架包赢神器 - AI智能回怼助手',
    description: '王者荣耀专属回怼神器，AI帮你生成完美回击！',
    type: 'website',
    locale: 'zh_CN',
    siteName: '吵架包赢神器',
  },
  twitter: {
    card: 'summary_large_image',
    title: '吵架包赢神器 - AI智能回怼助手',
    description: '王者荣耀专属回怼神器，AI帮你生成完美回击！',
  },
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD700',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} bg-gradient-dark min-h-screen text-text-light antialiased`}>
        {/* 背景装饰 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 顶部光效 */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-gold/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-secondary-blue/10 rounded-full blur-3xl" />
          
          {/* 底部光效 */}
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-red/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary-gold/10 rounded-full blur-3xl" />
          
          {/* 中间装饰 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />
        </div>

        {/* 主要内容 */}
        <div className="relative z-10">
          {children}
        </div>

        {/* 底部版权信息 */}
        <footer className="relative z-10 mt-16 py-8 border-t border-text-muted/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-text-muted text-sm">
              © 2024 吵架包赢神器 | 
              <span className="mx-2">|</span>
              AI助力，智慧回击
              <span className="mx-2">|</span>
              专为王者荣耀玩家设计
            </p>
            <p className="text-text-muted text-xs mt-2">
              本工具仅供娱乐使用，请文明游戏，理性交流
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
