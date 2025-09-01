<template>
  <main class="px-wrap">
    <div class="px-card">
      <h1 class="px-404" aria-label="404 Not Found">
        <span>4</span><span>0</span><span>4</span>
      </h1>

      <p class="px-sub">迷路了嗎？這個關卡不存在。</p>

      <div class="px-actions">
        <router-link to="/" class="px-btn">↩ 返回首頁</router-link>
      </div>
    </div>

    <!-- CRT 掃描線效果 -->
    <div class="px-crt" aria-hidden="true"></div>
  </main>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
.px-wrap{
  min-height: 100vh;
  display: grid;
  place-items: center;
  background:
    repeating-linear-gradient(0deg, transparent 0 8px, #202327 8px 9px),
    repeating-linear-gradient(90deg, transparent 0 8px, #202327 8px 9px),
    linear-gradient(180deg, #191b1f, #1b1d21);
  image-rendering: pixelated;
  padding: 24px;
  font-family: "Press Start 2P", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--px-text);
}

.px-card{
  width: min(720px, 92vw);
  background: var(--px-surface);
  outline: 2px solid var(--px-line);
  box-shadow: var(--px-shadow);
  padding: 28px 24px 20px;
  text-align: center;
  position: relative;
}

.px-404{
  font-size: clamp(42px, 9vw, 96px);
  letter-spacing: 6px;
  margin: 6px 0 10px;
  text-shadow: 0 3px 0 #000, 0 0 18px #7b5cff66;
  display: inline-flex;
  gap: .25em;
}
.px-404 span{
  display:inline-block;
  transform: translateY(0);
  animation: bounce 1.2s steps(2, end) infinite;
}
.px-404 span:nth-child(2){ animation-delay: .12s; }
.px-404 span:nth-child(3){ animation-delay: .24s; }

.px-sub{
  font-size: clamp(10px, 2.3vw, 14px);
  color: var(--px-text-dim);
  line-height: 1.8;
  margin-bottom: 18px;
}

.px-actions{
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.px-btn{
  text-decoration: none;
  color: #0b0b0b;
  background: linear-gradient(90deg, var(--px-accent), var(--px-accent-2));
  padding: 10px 14px;
  outline: 2px solid var(--px-line);
  box-shadow: var(--px-shadow);
  border-radius: 0;
  font-size: 12px;
  letter-spacing: .5px;
}
.px-btn:hover{ filter: saturate(1.2) brightness(1.05); }

.px-btn-sec{
  color: var(--px-text);
  background: var(--px-surface-2);
}
/* CRT 掃描線 */
.px-crt{
  pointer-events:none;
  position: fixed; inset: 0;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 4px);
  mix-blend-mode: overlay;
  opacity: .35;
  animation: flicker 3s infinite;
}
/* keyframes */
@keyframes bounce{
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes flicker{
  0%,19%,21%,23%,80%,100%{ opacity:.35; }
  20%,22%{ opacity:.15; }
}
@keyframes float{
  0%,100%{ transform: translateY(0) scaleX(.8); }
  50%{ transform: translateY(2px) scaleX(.85); }
}
</style>
