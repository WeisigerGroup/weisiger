import { AppProps } from "next/app"
import { ReactRuntimeProvider } from "@makeswift/runtime/next"
import { runtime } from "../lib/makeswift/runtime"

import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactRuntimeProvider runtime={runtime}>
      <Component {...pageProps} />
    </ReactRuntimeProvider>
  )
}

export default MyApp
