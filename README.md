## 関数コンポーネントの型は次のように書くのがお勧めです

[参考記事](https://teratail.com/questions/253756)

```js
// React.FC<P> は (props: P) => JSX.Element|その他いろいろ という型です。
const Btn: React.FC<Props> = (props) => { ... };

// props は使わずに、各要素を分割代入するのがお勧めです。
const Btn: React.FC<Props> = ({ x, y, z }) => { ... };

// Props が空の場合は、<Props> は省略できます。
const Btn: React.FC = () => { ... };
```

## Data Fetchingn

todo の初期表示には`getServerSideProps`を用いています。<br>
[CSR,SSG,SSR,ISR があやふやな人へざっくり解説する](https://zenn.dev/akino/articles/78479998efef55)
