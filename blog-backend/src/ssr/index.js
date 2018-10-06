// require("browser-env")();
const render = require("./render").default;
const manifest = require("../../../blog-frontend/build/asset-manifest.json");

function buildHtml({ html, preloadedState, helmet }) {
  // const { title, meta } = helmet;
  const title = JSON.parse(preloadedState).post.post.title;
  const body = JSON.parse(preloadedState).post.post.body.slice(0, 200);
  if (title === "") {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125829499-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-125829499-1');
          </script>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-3837511195694033",
              enable_page_level_ads: true
            });
          </script>
          <meta name="google-site-verification" content="lrW_VwcknA2sych6CyqtxHGRs41qV_kQXWHU_QcIry4" />
          <meta name="naver-site-verification" content="501f6a9dd6a1437fb23d8944a90ab7688e8a2fc9"/>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="manifest" href="/manifest.json">
          <link rel="shortcut icon" href="/favicon.ico">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <link href="/${manifest["app.css"]}" rel="stylesheet">
        </head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${preloadedState}
          </script>
          <script type="text/javascript" src="/${
            manifest["vendor.js"]
          }"></script>
          <script type="text/javascript" src="/${manifest["app.js"]}"></script>
        </body>

        </html>`;
  }

  return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta name="google-site-verification" content="lrW_VwcknA2sych6CyqtxHGRs41qV_kQXWHU_QcIry4" />
          <meta name="naver-site-verification" content="501f6a9dd6a1437fb23d8944a90ab7688e8a2fc9"/>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="manifest" href="/manifest.json">
          <link rel="shortcut icon" href="/favicon.ico">
          <title>${title}</title>
          <meta name="description" content="${body}" />
          <link href="/${manifest["app.css"]}" rel="stylesheet">
        </head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${preloadedState}
          </script>
          <script type="text/javascript" src="/${
            manifest["vendor.js"]
          }"></script>
          <script type="text/javascript" src="/${manifest["app.js"]}"></script>
        </body>

        </html>`;
}

module.exports = async ctx => {
  // const rendered = render(ctx);
  // ctx.body = buildHtml(rendered);
  try {
    const rendered = await render(ctx);
    ctx.body = buildHtml(rendered);
  } catch (e) {
    // 에러가 발생하면 일반 html 응답
    // console.log(e);
    console.log("error", e);
    ctx.body = buildHtml({});
  }
};
