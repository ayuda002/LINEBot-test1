"use client";

import Image from "next/image";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";

export default function Home() {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: "2004628834-4PW01o7G" })
          .then(() => {
            liff
              .sendMessages([
                {
                  type: "text",
                  text: "ユーザーからメッセージ送信したしん！",
                },
              ])
              .then(() => {
                console.log("Message sent");
              })
              .catch((error) => {
                console.log("Error sending message: " + error);
              });
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);
  return (
    <main>
      <h1>create-liff-app</h1>
      {liffObject && <p>LIFF init succeeded.</p>}
      {liffError && (
        <>
          <p>LIFF init failed.</p>
          <p>
            <code>{liffError}</code>
          </p>
        </>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </main>
  );
}
