/* global React */
const { useState } = React;

const Btn = ({ variant = "secondary", size, icon, children, ...p }) => (
  <button className={`btn btn--${variant}${size ? " btn--" + size : ""}`} {...p}>
    {icon}{children}
  </button>
);

const Badge = ({ tone = "neutral", dot, pill, children }) => {
  const cls = ["badge"];
  if (pill) cls.push("badge--pill");
  if (dot) cls.push("badge--dot");
  const toneMap = { brand:"soft-brand", ok:"soft-ok", warn:"soft-warn", err:"soft-err", info:"soft-info", outline:"outline" };
  if (toneMap[tone]) cls.push(`badge--${toneMap[tone]}`);
  return <span className={cls.join(" ")}>{children}</span>;
};

const Acmg = ({ k }) => {
  const map = { P:["p","P"], LP:["lp","LP"], VUS:["vus","VUS"], LB:["lb","LB"], B:["b","B"] };
  const [cls, label] = map[k] || ["vus","VUS"];
  return <span className={`acmg acmg--${cls}`}>{label}</span>;
};

const Hpo = ({ id, label, neg, removable = true }) => (
  <span className={`hpo${neg ? " hpo--neg" : ""}`}>
    <span className="hpo__id">{id}</span>
    <span className="hpo__label">{label}</span>
    {removable && <span className="hpo__x"><IconX/></span>}
  </span>
);

const StatusDot = ({ kind = "queue", children }) => (
  <span className={`status status--${kind}`}>
    <span className="status__dot"/>{children}
  </span>
);

const Progress = ({ value = 40, tone, size, striped }) => {
  const cls = ["progress"];
  if (tone) cls.push(`progress--${tone}`);
  if (size) cls.push(`progress--${size}`);
  if (striped) cls.push("progress--striped");
  return <div className={cls.join(" ")}><div className="progress__fill" style={{width: `${value}%`}}/></div>;
};

const MatchBar = ({ value }) => (
  <div className="match-bar">
    <div className="match-bar__track"><div className="match-bar__fill" style={{width:`${value}%`}}/></div>
    <span className="match-bar__val">{value.toFixed(1)}%</span>
  </div>
);

const Conf = ({ value, level }) => (
  <span className={`conf conf--${level}`}>
    <span className="conf__bar"><span className="conf__fill" style={{width: `${value}%`}}/></span>
    {value}
  </span>
);

const Rank = ({ n }) => <span className={`rank rank--${n <= 3 ? n : 0}`}>{n}</span>;

const Alert = ({ tone = "info", title, children, icon }) => (
  <div className={`alert alert--${tone}`}>
    <div className="alert__icon">{icon || <IconInfo/>}</div>
    <div className="alert__body">
      {title && <div className="alert__title">{title}</div>}
      <div className="alert__desc">{children}</div>
    </div>
  </div>
);

const Tabs = ({ items, active, onChange }) => (
  <div className="tabs">
    {items.map(it => (
      <button key={it.key}
        className={`tabs__item${it.key === active ? " is-active" : ""}`}
        onClick={() => onChange && onChange(it.key)}>
        {it.icon}{it.label}
        {it.count != null && <span className="count">{it.count}</span>}
      </button>
    ))}
  </div>
);

const Segmented = ({ items, active, onChange }) => (
  <div className="segmented">
    {items.map(it => (
      <button key={it.key}
        className={`segmented__item${it.key === active ? " is-active" : ""}`}
        onClick={() => onChange && onChange(it.key)}>
        {it.label}
      </button>
    ))}
  </div>
);

const Field = ({ label, hint, error, required, children }) => (
  <label className="field">
    <span className="field__label">{label}{required && <span className="req">*</span>}</span>
    {children}
    {hint && !error && <span className="field__hint">{hint}</span>}
    {error && <span className="field__error">{error}</span>}
  </label>
);

Object.assign(window, { Btn, Badge, Acmg, Hpo, StatusDot, Progress, MatchBar, Conf, Rank, Alert, Tabs, Segmented, Field });
