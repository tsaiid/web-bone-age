# Web Bone Age Reference

這是一個現代化的骨齡參考應用程式，旨在提供快速且便捷的骨齡圖像查詢功能。本專案已從舊有的 jQuery/Bootstrap 架構全面重構為使用 React、TypeScript 與 Material UI 的現代化網頁應用。

## ✨ 主要功能

- **骨齡圖像查詢**：依據性別（男性/女性）與年齡快速查找對應的骨齡 X 光參考圖。
- **回應式設計 (RWD)**：完美適配桌上型電腦、平板與手機等各種裝置尺寸。
- **全螢幕瀏覽**：優化的滿版介面設計，去除不必要的捲軸，提供沉浸式的瀏覽體驗。
- **鍵盤導航**：支援鍵盤方向鍵操作，方便快速切換性別與年齡。
- **關於頁面**：內建資訊視窗，提供專案說明與原始碼連結。

## 🛠️ 技術棧

本專案採用以下現代化前端技術構建：

- **核心框架**：[React](https://react.dev/) 18
- **開發語言**：[TypeScript](https://www.typescriptlang.org/)
- **建置工具**：[Vite](https://vitejs.dev/) - 極速的開發與建置體驗
- **UI 框架**：[Material UI (MUI)](https://mui.com/) - 採用 Google Material Design 設計語言
- **測試框架**：[Vitest](https://vitest.dev/) 與 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 快速開始

### 前置需求

請確保您的環境中已安裝 [Node.js](https://nodejs.org/) (建議使用 LTS 版本)。

### 安裝依賴

複製專案到本地端並進入目錄：

```bash
git clone https://github.com/tsaiid/web-bone-age.git
cd web-bone-age
```

安裝專案所需的套件：

```bash
npm install
```

### 開發模式

啟動本地開發伺服器：

```bash
npm run dev
```

瀏覽器將自動開啟 http://localhost:5173 (或終端機顯示的其他埠號)。

### 建置專案

編譯用於生產環境的程式碼：

```bash
npm run build
```

建置後的檔案將位於 `dist` 目錄中。

### 預覽建置結果

在本地預覽建置後的應用程式：

```bash
npm run preview
```

## 🧪 執行測試

本專案包含單元測試以確保功能正常。執行以下指令來跑測試：

```bash
npm test
```

## ⌨️ 鍵盤操作指南

- **← (左箭頭)**：切換至「女性」標籤
- **→ (右箭頭)**：切換至「男性」標籤
- **↑ (上箭頭)**：選擇上一個年齡層
- **↓ (下箭頭)**：選擇下一個年齡層

## 📄 授權

此專案採用 MIT 授權條款。詳細資訊請參閱 LICENSE 文件（如果有的話）。

## 👤 作者

- **I-Ta Tsai** - [GitHub](https://github.com/tsaiid)

---
*本專案由 [GitHub Copilot Workspace](https://copilot.github.com/) 協助重構與現代化。*
