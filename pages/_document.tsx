import Document, { Html, Head, Main, FlareactScript } from "flareact/document";
import React from "react";

class MyDocument extends Document {
  static async getEdgeProps(ctx: any) {
    const props = await Document.getEdgeProps(ctx);
    return { ...props };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <FlareactScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;