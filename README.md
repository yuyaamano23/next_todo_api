## やりたいこと

- ~~記事編集機能~~
- ~~検索機能~~
- style の適応
- Redux(hooks 利用)
- ユーザ認証
- いいね機能
- ~~コメント機能~~
- 画像投稿機能
- テストちゃんと書く
- Vercel デプロイ
- useMemo によるチューニング
- firebase 認証

## 関数コンポーネントの型は次のように書くのがお勧めです

[React+TypeScript+eslint の Warning を解消したいのですが、無名関数コンポーネントの返り値が分かりません。](https://teratail.com/questions/253756)

```js
// React.FC<P> は (props: P) => JSX.Element|その他いろいろ という型です。
const Btn: React.FC<Props> = (props) => { ... };

// props は使わずに、各要素を分割代入するのがお勧めです。
const Btn: React.FC<Props> = ({ x, y, z }) => { ... };

// Props が空の場合は、<Props> は省略できます。
const Btn: React.FC = () => { ... };
```

## コードスニペット

<details>
<summary>Redirectの方法</summary>

```js
import Router from 'next/router

Router.push('/todos')
```

</details>

## Data Fetchingn

- getServerSideProps
- getStaticProps
- getStaticPaths<br>
  ができるのは page/配下の奴らのみ
  <br>

[CSR,SSG,SSR,ISR があやふやな人へざっくり解説する](https://zenn.dev/akino/articles/78479998efef55)

## React Hooks で外部 API の情報を表示したいときにはどうすればよいのか？

- [useEffect の中で axios を使う](https://terrblog.com/useeffect%E3%81%AE%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%A8%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%81%AE%E3%82%84%E3%82%8A%E6%96%B9/)<br>

- [https://qiita.com/ossan-engineer/items/c3853315f59dc20bc9dc](https://qiita.com/ossan-engineer/items/c3853315f59dc20bc9dc)<br>

## Dynamic Routing

- [Next.js のダイナミックルーティングを実装してみた](https://qiita.com/mt_816/items/d4e685953afa4906dd38)<br>
- [Next.js における SSG（静的サイト生成）と ISR について（自分の）限界まで丁寧に説明する](https://qiita.com/thesugar/items/47ec3d243d00ddd0b4ed)<br>

- [fallback:blocking について](https://qiita.com/thesugar/items/47ec3d243d00ddd0b4ed#fallback-blocking)
  Next.js 10（2020/10/27 リリース）にて追加された機能です。<br>

<details>
<summary>revalidateについて</summary>

[revalidate について](https://qiita.com/thesugar/items/47ec3d243d00ddd0b4ed#%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E9%9D%99%E7%9A%84%E5%86%8D%E7%94%9F%E6%88%90-incremental-static-regeneration-isr)<br>

revalidate を return することで ISR を実装実現できる

「Twitter のプロフィールページ」のように(ユーザーによって頻繁に編集が行われるページ)、編集が完了したにもかかわらず、編集前のデータが表示されてしまうことは厳に回避したい、という要求があるのであれば`revalidate`は適していない、と結論づけられています。

</details>

## ssr?ssg?迷ったら。。。

```txt
1️⃣ 結果整合性(Eventual Consistency)のみが求められる場合
→(incremental)静的生成で対応可能

2️⃣ 強整合性(Strong Consistency)が求められる場合

1. getServerSideProps を使う or
2. [SWR](https://swr.vercel.app/) 等でクライエント側で確実に更新する
```

## VScode 拡張機能

- Todo HighLight
  デフォルトだと`TODO:`,`FIXME:`をハイライト表示する。
  `command`+`shift`+`P`からの`>list`を選択すればコンソールにリストアップしてくれる。
