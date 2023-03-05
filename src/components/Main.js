import React from "react";
import { useGlobalContext } from "../Context";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export default function Main() {
  const contextData = useGlobalContext();
  return (
    <main className="main--item">
      <MathJaxContext>
        {contextData === "" ? "" :  <MathJax>{`${contextData}`}</MathJax>}
      </MathJaxContext>
    </main>
  );
}
