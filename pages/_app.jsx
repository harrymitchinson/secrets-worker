import "../styles.css";

export default function MyApp({ Component, pageProps }) {
  return (<>
  <h1>Secrets</h1>
  <Component {...pageProps} />
  </>)
}
