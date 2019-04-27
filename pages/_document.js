import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import pkg from '../package'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content={pkg.description} />
          <meta name="keywords" content={pkg.keywords} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@mvfsillva" />
          <meta name="twitter:creator" content="@mvfsillva" />
          <meta name="twitter:title" content={pkg.name} />
          <meta name="twitter:description" content={pkg.description} />

          <meta name="apple-mobile-web-app-title" content="wallet" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="application-name" content="wallet" />

          <meta name="msapplication-TileColor" content="#ffffff" />

          <link rel="apple-touch-icon" sizes="180x180" href="static/apple-touch-icon.png" />
          <link rel="apple-touch-startup-image" href="static/apple-touch-icon.png" />
          <link rel="mask-icon" href="static/safari-pinned-tab.svg" color="#0db14b" />

          <link rel="shortcut icon" href="static/favicon.ico" type="image/x-icon" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="static/manifest.json" />
          <title>personal wallet</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
