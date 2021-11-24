import { SheetsRegistry } from 'jss';
import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document';
import React from 'react';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  static getInitialProps = (context: NextDocumentContext) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the sheetsRegistry of the page with collected side effects.
    let sheetsRegistry: SheetsRegistry | undefined;
    const renderPageResponse = context.renderPage(Component => props => {
      sheetsRegistry = props.sheetsRegistry;
      return <Component {...props} />;
    });

    // Temporary workaround for global styles not working on server side
    const globalCSSString = 'html, body, #__next {height: 100%;} ';

    const styles: React.ReactElement<any>[] = [
      (
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: `${globalCSSString} ${sheetsRegistry ? sheetsRegistry.toString() : ''}` }}
        />
      ), (
        <>
          {flush() || null}
        </>
      ),
    ];

    return {
      ...renderPageResponse,
      styles,
    };
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta property="og:title" content={'Boilerplate'} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="shortcut icon" type="image/x-icon" href={'/favicon.ico'} />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=no, initial-scale=1, ' +
              'minimum-scale=1, width=device-width'
            }
          />
          <script src="https://use.typekit.net/lzx8tio.js" />
          <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: false });}catch(e){}' }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.intercomSettings = {
                app_id: "x73klp2c",
                hide_default_launcher: true,
              };
            `}}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');
              ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};
              i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');
              s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/lzx8tio';
              var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
              }if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
