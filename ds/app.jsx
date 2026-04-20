/* global React, ReactDOM */
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "theme": "indigo",
  "density": "standard"
}/*EDITMODE-END*/;

function Tweaks({ theme, setTheme, density, setDensity, visible }) {
  if (!visible) return null;
  return (
    <div className="tweaks-panel">
      <div className="tweaks-panel__title">
        <span>Tweaks</span>
        <span className="t-xs t-4">live preview</span>
      </div>
      <div className="tweaks-panel__row">
        <span className="tweaks-panel__label">主题色</span>
        <div className="theme-swatches">
          {["indigo","teal","graphite","plum"].map(t => (
            <span key={t}
              className={`theme-swatch${t===theme ? " is-active" : ""}`}
              data-t={t}
              onClick={() => setTheme(t)}
              title={t}/>
          ))}
        </div>
      </div>
      <div className="tweaks-panel__row">
        <span className="tweaks-panel__label">密度</span>
        <div className="segmented">
          <button className={`segmented__item${density==="standard" ? " is-active" : ""}`} onClick={() => setDensity("standard")}>标准</button>
          <button className={`segmented__item${density==="compact" ? " is-active" : ""}`} onClick={() => setDensity("compact")}>紧凑</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme]     = useStateA(TWEAK_DEFAULS.theme);
  const [density, setDensity] = useStateA(TWEAK_DEFAULS.density);
  const [tweaksOn, setTweaksOn] = useStateA(false);

  useEffectA(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.parent?.postMessage({type:'__edit_mode_set_keys', edits:{theme}}, '*');
  }, [theme]);
  useEffectA(() => {
    document.documentElement.setAttribute("data-density", density);
    window.parent?.postMessage({type:'__edit_mode_set_keys', edits:{density}}, '*');
  }, [density]);

  useEffectA(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent?.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <div className="doc">
      <div className="toolbar">
        <span className="fw-6">DeepRare · Design System</span>
        <span className="t-3">v1.0</span>
        <span className="t-4 mono t-xs">2026-04-20</span>
        <span className="toolbar__spacer"/>
        <span className="t-3">Theme</span>
        <div className="theme-swatches">
          {["indigo","teal","graphite","plum"].map(t => (
            <span key={t} className={`theme-swatch${t===theme ? " is-active" : ""}`} data-t={t} onClick={() => setTheme(t)} title={t}/>
          ))}
        </div>
        <span className="t-3" style={{marginLeft:12}}>Density</span>
        <div className="segmented">
          <button className={`segmented__item${density==="standard" ? " is-active" : ""}`} onClick={() => setDensity("standard")}>标准</button>
          <button className={`segmented__item${density==="compact" ? " is-active" : ""}`} onClick={() => setDensity("compact")}>紧凑</button>
        </div>
      </div>

      <header className="doc__head">
        <div className="doc__brand">
          <div className="doc__logo"><IconDna/></div>
          <div>
            <h1 className="doc__title">DeepRare · 设计系统</h1>
            <div className="doc__subtitle">罕见病辅助诊断平台 · Clinical Precision · Indigo 基调</div>
          </div>
        </div>
        <div className="doc__meta">
          <div><b>3</b> 家族 · <b>28</b> 组件<br/>v1.0 · 2026-04-20</div>
          <div><b>100%</b> 中文优先<br/>HPO · ACMG · OMIM 术语保留</div>
          <div><b>1440 / 1920</b> 桌面优先<br/>最小 32px 点击区</div>
        </div>
      </header>

      <nav className="doc__toc">
        <a href="#color"><small>01</small>色彩</a>
        <a href="#type"><small>02</small>字体排印</a>
        <a href="#spacing"><small>03</small>间距阴影</a>
        <a href="#buttons"><small>04</small>按钮</a>
        <a href="#forms"><small>05</small>表单</a>
        <a href="#badges"><small>06</small>标签</a>
        <a href="#progress"><small>07</small>进度</a>
        <a href="#communicate"><small>08</small>Tabs · 对话</a>
        <a href="#tables"><small>09</small>表格</a>
        <a href="#containers"><small>10</small>容器</a>
        <a href="#scene-list"><small>11</small>场景 · 列表</a>
        <a href="#scene-hpo"><small>12</small>场景 · HPO</a>
      </nav>

      <SectionColors/>
      <SectionType/>
      <SectionSpacing/>
      <SectionButtons/>
      <SectionForms/>
      <SectionBadges/>
      <SectionProgress/>
      <SectionCommunicate/>
      <SectionTables/>
      <SectionContainers/>
      <ScenePatientList/>
      <SceneHpo/>
      <SceneVcf/>

      <footer className="ds-foot">
        <div>DeepRare Design System · v1.0</div>
        <div>© 2026 · For clinical internal use only</div>
      </footer>

      <Tweaks theme={theme} setTheme={setTheme} density={density} setDensity={setDensity} visible={tweaksOn}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
