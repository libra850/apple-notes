# Apple Notes MCP Server

MacのメモアプリをModel Context Protocol (MCP)で操作するためのサーバー実装です。シンプルなAPIを通じて、AppleScriptによるメモアプリの操作を可能にします。

## 機能

- メモの作成（create-note）
- メモの検索（search-notes）
- メモ内容の取得（get-note-content）

### メモ作成のデモ動画
<img src="src/assets/demo.gif">

## 必要要件

- macOS Ventura以降
- Node.js v16以上
- TypeScript 5.0以上
- Claude Desktop App（MCPクライアントとして使用）

## インストール

```bash
# リポジトリのクローン
git clone [repository-url]
cd apple-notes-mcp

# 依存パッケージのインストール
npm install
```

## セットアップ

1. プロジェクトのビルド
```bash
npm run build
```

2. Claude Desktop Appの設定
`~/Library/Application Support/Claude/claude_desktop_config.json` に以下を追加：

```json
{
  "mcpServers": {
    "apple-notes": {
      "command": "node",
      "args": ["/absolute/path/to/apple-notes/build/index.js"]
    }
  }
}
```

## 使用方法

1. サーバーの起動
```bash
npm start
```

2. Claude Desktop Appでの使用例
- メモの作成: "メモを作成して: タイトル「会議メモ」、内容「今日の打ち合わせ内容」"
- メモの検索: "「会議」というキーワードを含むメモを検索して"
- メモの取得: "「会議メモ」の内容を表示して"

## プロジェクト構成

```
apple-notes/
├── package.json        # プロジェクト設定
├── tsconfig.json      # TypeScript設定
├── src/
│   ├── index.ts       # エントリーポイント
│   ├── types.ts       # 型定義
│   ├── services/
│   │   └── AppleNotesManager.ts  # メモ操作の中核機能
│   └── utils/
│       └── applescript.ts        # AppleScript実行ユーティリティ
└── build/             # コンパイル済みファイル
```

## 注意事項

- iCloudアカウントが設定されている必要があります
- メモアプリへのアクセス権限が必要です
- システムの負荷を考慮し、リクエストの頻度にご注意ください

## 謝辞

- Anthropic社のClaude Desktop App チーム
- MCP（Model Context Protocol）の開発チーム
