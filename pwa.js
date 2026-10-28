/* 홈 화면 앱 설치. 브라우저가 자체 설치창을 제공하지 않으면 메뉴 안내를 표시합니다. */
(() => {
  "use strict";
  const button = document.getElementById("installAppButton");
  const dialog = document.getElementById("installDialog");
  const steps = document.getElementById("installInstruction");
  const close = document.getElementById("installClose");
  if (!button || !dialog || !steps || !close) return;

  let pendingInstall = null;
  const isStandalone = () =>
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true;

  const updateButton = () => { button.hidden = !!isStandalone(); };
  updateButton();

  const instructions = () => {
    const agent = navigator.userAgent || "";
    if (/iPad|iPhone|iPod/i.test(agent)) {
      return "아이폰·아이패드: Safari에서 이 페이지를 열고 공유 버튼(□↑) → ‘홈 화면에 추가’를 선택해 주세요.";
    }
    if (/Android/i.test(agent)) {
      return "안드로이드: Chrome에서 이 페이지를 열고 오른쪽 위 ⋮ 메뉴 → ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요. 삼성 인터넷에서는 메뉴(☰) → ‘현재 페이지 추가’ → ‘홈 화면’을 이용할 수 있습니다.";
    }
    return "PC: Chrome 또는 Edge의 주소창 오른쪽 설치 아이콘을 누르거나, 브라우저 메뉴에서 ‘앱 설치’를 선택해 주세요.";
  };

  const showGuide = () => {
    steps.textContent = instructions();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else window.alert(steps.textContent);
  };

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    pendingInstall = event;
    updateButton();
  });

  button.addEventListener("click", async () => {
    if (isStandalone()) return;
    if (!pendingInstall) { showGuide(); return; }
    const choice = pendingInstall;
    pendingInstall = null;
    try {
      await choice.prompt();
      const result = await choice.userChoice;
      if (result && result.outcome === "accepted") button.hidden = true;
    } catch (error) {
      showGuide();
    }
  });

  window.addEventListener("appinstalled", () => {
    pendingInstall = null;
    button.hidden = true;
    if (dialog.open) dialog.close();
  });
  if (window.matchMedia) {
    const mode = window.matchMedia("(display-mode: standalone)");
    if (mode && mode.addEventListener) mode.addEventListener("change", updateButton);
  }
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" })
        .catch(error => console.warn("하루영어 오프라인 준비 실패:", error));
    });
  }
})();
