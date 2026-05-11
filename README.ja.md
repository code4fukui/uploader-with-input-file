# uploader-with-input-file for Deno

ファイル選択拡張タグ [`<input-file>`](https://github.com/code4fukui/input-file) を使ったアップローダー。

ファイル選択に [`<input-file>`](https://github.com/code4fukui/input-file) Webコンポーネントを使用し、認証に [`PubkeyUser`](https://github.com/code4fukui/PubkeyUser) を使用する、Denoベースのシンプルなファイルアップローダーです。このプロジェクトは、これらのコンポーネントを組み合わせてセキュアなクライアントサイドのアップロードシステムを構築するための実践的な例として機能します。

## 機能

- **公開鍵認証:** `PubkeyUser` を使用してアップロードのエンドポイントを保護し、事前に承認されたユーザーのみがファイルをアップロードできるようにします。
- **カスタムファイル入力:** `<input-file>` Webコンポーネントを利用して、モダンなファイル選択エクスペリエンスを提供します。
- **サーバーサイドストレージ:** アップロードされたファイルは、サーバー上の `data/` ディレクトリ（`.gitignore` で除外設定済み）に保存されます。
- **一意のファイルID:** アップロードされた各ファイルには、ファイル名の衝突を防ぐためにタイムベースID（[TID](https://github.com/code4fukui/TID)）が割り当てられます。

## 仕組み

1. ブラウザでアプリケーションを開くと、`PubkeyUser` によって新しい公開鍵・秘密鍵のペアが生成され、ブラウザのローカルストレージに保存されます。公開鍵は上部の入力フィールドに表示されます。
2. アップロード権限を得るには、管理者がこの公開鍵をサーバー上の `allowedUsers.json` ファイルに追加する必要があります。
3. `<input-file>` コンポーネントを使用してファイルを選択すると、自動的にサーバーへアップロードされます。
4. サーバーはファイルを受け入れて保存する前に、`allowedUsers.json` のリストと照合して公開鍵を検証します。
5. アップロードに成功した各ファイルは、TIDと元の拡張子に基づいた一意のファイル名で `data/` ディレクトリに保存されます。

## はじめに

### 1. 前提条件

[Deno](https://deno.com/) がインストールされていることを確認してください。

### 2. サーバーの起動

リポジトリをクローンし、プロジェクトディレクトリで以下のコマンドを実行します。

```sh
deno serve -A --port 8010 server.js
```

サーバーは `http://localhost:8010` で起動します。

### 3. ユーザーの認可

1. Webブラウザで `http://localhost:8010` を開きます。
2. 最初の入力ボックスに表示される公開鍵の文字列をコピーします。
3. プロジェクトディレクトリ内の `allowedUsers.json` ファイルを開きます。
4. コピーした公開鍵を新しい文字列としてJSON配列に追加し、ファイルを保存します。

    ```json
    [
      "YOUR_COPIED_PUBLIC_KEY_HERE",
      "VN7R_CC8U_L4K9_RWMN_VRVJ_TZN5_CZ0F_3KQF_UQHP_QVNZ_2DF5_CGCM_65H0"
    ]
    ```

### 4. ファイルのアップロード

ブラウザのページを再読み込みします。ファイル入力コンポーネントを使用してファイルを選択できるようになり、選択したファイルはサーバー上の `data/` ディレクトリにアップロードされます。

## 参考資料

- [input-file](https://github.com/code4fukui/input-file)
- [PubkeyUser](https://github.com/code4fukui/PubkeyUser)
- [公開鍵を使った簡易ユーザー認証「PubkeyUser」で再来数カウンターと、ことひろ in つつじまつり](https://fukuno.jig.jp/4665)
