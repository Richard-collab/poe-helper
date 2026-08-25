import { EmbersCanvas } from "./EmbersCanvas";

export function Hero() {
  return (
    <div className="hero" id="top">
      <EmbersCanvas />
      <div className="hero-rays" />
      <div className="hero-inner">
        <div className="hero-kicker">Path of Exile · International Server</div>
        <h1 className="hero-title">
          流放之路
          <br />
          <em>国际服助手</em>
        </h1>
        <div className="hero-sub">
          下载<span>·</span>中文化<span>·</span>交易<span>·</span>查价<span>·</span>BD 一站直达
        </div>
        <div className="hero-line" />
      </div>
    </div>
  );
}
