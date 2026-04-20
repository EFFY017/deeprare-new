/* global React, Btn, Badge, Acmg, Hpo, StatusDot, Progress, MatchBar, Conf, Tabs, Segmented, Field, Alert */
const { useState: useStateC } = React;

/* ============== Buttons ============== */
function SectionButtons() {
  return (
    <section className="section" id="buttons">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">04 · Components</div>
          <h2 className="section__title">按钮 Buttons</h2>
          <p className="section__desc">每屏主按钮 ≤ 1 个。危险操作只在弹窗内用红色主按钮。图标按钮用于工具栏，28 × 28。</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="frame">
          <div className="cap">Variants · SM / MD / LG</div>
          <div className="flex wrap gap-2 items-center mb-4">
            <Btn variant="primary" icon={<IconPlus/>}>新建诊断</Btn>
            <Btn variant="secondary">取消</Btn>
            <Btn variant="ghost">查看历史</Btn>
            <Btn variant="danger" icon={<IconTrash/>}>删除患者</Btn>
            <Btn variant="link">查看文献 →</Btn>
          </div>
          <div className="flex wrap gap-2 items-center mb-4">
            <Btn variant="primary" size="sm">保存</Btn>
            <Btn variant="secondary" size="sm" icon={<IconDownload/>}>导出</Btn>
            <Btn variant="primary" size="lg">开始 AI 分析</Btn>
            <button className="btn btn--secondary btn--icon"><IconSettings/></button>
            <button className="btn btn--ghost btn--icon"><IconFilter/></button>
          </div>
          <div className="flex wrap gap-2 items-center">
            <Btn variant="primary" disabled>Disabled</Btn>
            <Btn variant="secondary"><span className="spinner"/> 处理中</Btn>
            <Btn variant="primary">确认<span className="btn__kbd">⏎</span></Btn>
            <Btn variant="secondary">取消<span className="btn__kbd">Esc</span></Btn>
          </div>
        </div>

        <div className="frame">
          <div className="cap">Usage · 按钮层级</div>
          <div style={{display:"grid", gridTemplateColumns:"100px 1fr", gap:"14px 20px", fontSize:13, lineHeight:1.6}}>
            <div className="fw-6">Primary</div>
            <div className="t-2">页面核心动作，每个容器最多 1 个。如「开始诊断」「保存结论」。</div>
            <div className="fw-6">Secondary</div>
            <div className="t-2">次要但常用的动作。如「取消」「导出」「查看历史」。</div>
            <div className="fw-6">Ghost</div>
            <div className="fw-6 t-2">低优先级、工具栏内联动作；不抢占视觉。</div>
            <div className="fw-6" style={{color:"var(--err-700)"}}>Danger</div>
            <div className="t-2">仅出现在破坏性操作的最后一步弹窗内，搭配二次确认。</div>
            <div className="fw-6">Link</div>
            <div className="t-2">纯文本跳转；用于引用、参考、外链。</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Form elements ============== */
function SectionForms() {
  const [seg, setSeg] = useStateC("hpo");
  const [sw, setSw] = useStateC(true);
  return (
    <section className="section" id="forms">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">05 · Components</div>
          <h2 className="section__title">表单元素 Inputs</h2>
          <p className="section__desc">控件高度 32px（标准）或 26px（紧凑）。聚焦使用 3px 柔和光晕。</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="frame">
          <div className="cap">Text / Select / Textarea</div>
          <div style={{display:"grid", gap:14}}>
            <Field label="患者姓名" required>
              <input className="input" defaultValue="张 ** "/>
            </Field>
            <Field label="病历号 / MRN" hint="由门诊系统自动同步">
              <div className="input-wrap">
                <span className="input-wrap__icon"><IconSearch/></span>
                <input className="input" placeholder="搜索 MRN / 姓名 / 电话"/>
              </div>
            </Field>
            <Field label="分诊医生">
              <select className="select">
                <option>李医生（遗传科）</option>
                <option>王医生（神经内科）</option>
              </select>
            </Field>
            <Field label="主诉" hint="用分号分隔多项">
              <textarea className="textarea" rows={3} defaultValue="反复发作性肌无力 3 年；晨轻暮重；咀嚼疲劳"/>
            </Field>
            <Field label="采样日期" error="日期不能晚于今天">
              <input className="input" aria-invalid="true" defaultValue="2026-04-22"/>
            </Field>
          </div>
        </div>

        <div className="frame">
          <div className="cap">Selection / Toggle</div>
          <div style={{display:"grid", gap:18}}>
            <div>
              <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>Checkbox</div>
              <label className="flex gap-2 items-center mb-2"><input type="checkbox" className="check" defaultChecked/> 仅显示 ACMG ≥ LP 的变异</label>
              <label className="flex gap-2 items-center mb-2"><input type="checkbox" className="check"/> 包含 Secondary Findings</label>
              <label className="flex gap-2 items-center"><input type="checkbox" className="check" defaultChecked/> 启用多组学联合推理</label>
            </div>
            <div>
              <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>Radio</div>
              <label className="flex gap-2 items-center mb-2"><input type="radio" className="radio" name="r" defaultChecked/> HPO 表型诊断</label>
              <label className="flex gap-2 items-center mb-2"><input type="radio" className="radio" name="r"/> VCF 基因诊断</label>
              <label className="flex gap-2 items-center"><input type="radio" className="radio" name="r"/> 联合诊断（HPO + VCF）</label>
            </div>
            <div>
              <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>Switch</div>
              <div className="flex items-center gap-3">
                <span className={`switch${sw ? " is-on" : ""}`} onClick={()=>setSw(!sw)}/>
                <span className="t-sm t-2">共享报告给转诊医生</span>
              </div>
            </div>
            <div>
              <div className="t-xs fw-6 t-3 mb-2" style={{textTransform:"uppercase", letterSpacing:".04em"}}>Segmented</div>
              <Segmented active={seg} onChange={setSeg} items={[
                { key:"hpo", label:"HPO 表型" },
                { key:"vcf", label:"VCF 基因" },
                { key:"both", label:"联合" },
              ]}/>
            </div>
          </div>
        </div>

        <div className="frame">
          <div className="cap">File upload / Search</div>
          <div style={{display:"grid", gap:14}}>
            <div className="upload">
              <div className="upload__icon"><IconUpload/></div>
              <div className="upload__title">拖拽 VCF / BAM 文件到此处</div>
              <div className="upload__hint">支持 .vcf · .vcf.gz · .bam（最大 8 GB）</div>
            </div>
            <div className="frame" style={{padding:10}}>
              <div className="flex items-center gap-2 mb-2">
                <IconFile/>
                <span className="fw-6 t-sm">sample_284.vcf.gz</span>
                <Badge tone="info">已上传</Badge>
                <span className="mono t-xs t-4" style={{marginLeft:"auto"}}>1.24 GB · 9m ago</span>
              </div>
              <Progress value={100} tone="ok"/>
            </div>
            <Field label="HPO 表型搜索" hint="输入中/英文或 HP:ID 自动匹配">
              <div className="input-wrap">
                <span className="input-wrap__icon"><IconSearch/></span>
                <input className="input" defaultValue="muscle weakness"/>
              </div>
            </Field>
            <div className="frame" style={{padding:6}}>
              {[
                ["HP:0001324","Muscle weakness","肌无力"],
                ["HP:0003199","Muscle fatigue","肌疲劳"],
                ["HP:0003391","Gowers sign","Gowers 征"],
              ].map(([id, en, cn]) => (
                <div key={id} className="flex items-center gap-3" style={{padding:"6px 8px", borderRadius:4, cursor:"pointer"}} onMouseOver={e=>e.currentTarget.style.background="var(--bg-hover)"} onMouseOut={e=>e.currentTarget.style.background=""}>
                  <span className="mono t-xs t-3">{id}</span>
                  <span className="t-sm fw-5">{en}</span>
                  <span className="t-xs t-3" style={{marginLeft:"auto"}}>{cn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Badges / Status / HPO / ACMG ============== */
function SectionBadges() {
  return (
    <section className="section" id="badges">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">06 · Components</div>
          <h2 className="section__title">标签 · 状态 · 徽章</h2>
          <p className="section__desc">语义徽章分色柔和，ACMG 使用专用色板（等宽字体以便表格对齐）。HPO 标签区分正向 / 否定表型。</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="frame">
          <div className="cap">通用 Badge</div>
          <div className="flex wrap gap-2 mb-4">
            <Badge tone="brand">Brand</Badge>
            <Badge tone="ok">已完成</Badge>
            <Badge tone="warn">需复核</Badge>
            <Badge tone="err">失败</Badge>
            <Badge tone="info">排队中</Badge>
            <Badge tone="outline">草稿</Badge>
          </div>
          <div className="flex wrap gap-2 mb-4">
            <Badge tone="ok" dot pill>在线</Badge>
            <Badge tone="warn" dot pill>部分缺失</Badge>
            <Badge tone="err" dot pill>超时</Badge>
            <Badge tone="info" dot pill>推理中</Badge>
          </div>
          <div className="cap mt-4">状态指示器 Status</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <StatusDot kind="queue">排队中 · Queued</StatusDot>
            <StatusDot kind="running">诊断中 · Running</StatusDot>
            <StatusDot kind="done">已完成 · 2 疾病</StatusDot>
            <StatusDot kind="warn">需人工复核</StatusDot>
            <StatusDot kind="err">推理失败</StatusDot>
            <span className="status"><span className="spinner"/> 上传中 48%</span>
          </div>
        </div>

        <div className="frame">
          <div className="cap">ACMG 变异分级 · 五级</div>
          <div className="flex wrap gap-2 mb-4">
            <Acmg k="P"/> <Acmg k="LP"/> <Acmg k="VUS"/> <Acmg k="LB"/> <Acmg k="B"/>
          </div>
          <div className="t-xs t-3 mb-4">Pathogenic · Likely Pathogenic · Uncertain · Likely Benign · Benign</div>

          <div className="cap mt-4">HPO 表型标签</div>
          <div className="flex wrap gap-2 mb-3">
            <Hpo id="HP:0001324" label="Muscle weakness"/>
            <Hpo id="HP:0003391" label="Gowers sign"/>
            <Hpo id="HP:0002094" label="Dyspnea"/>
            <Hpo id="HP:0001260" label="Dysarthria"/>
          </div>
          <div className="flex wrap gap-2">
            <Hpo id="HP:0001263" label="Developmental delay" neg/>
            <Hpo id="HP:0001250" label="Seizures" neg/>
          </div>
          <div className="t-xs t-4 mt-3">带 ¬ 标记的灰色标签表示「否定表型」— 明确排除。</div>
        </div>
      </div>
    </section>
  );
}

/* ============== Progress / Stepper / Confidence ============== */
function SectionProgress() {
  return (
    <section className="section" id="progress">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">07 · Components</div>
          <h2 className="section__title">进度条 · 步骤 · 置信度</h2>
          <p className="section__desc">置信度与匹配率使用同色系水平 bar，便于在表格中同列对齐；长时任务使用分步条纹动画。</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="frame">
          <div className="cap">Progress</div>
          <div style={{display:"grid", gap:14}}>
            <div>
              <div className="flex justify-between t-xs t-3 mb-2"><span>上传文件</span><span className="mono">48% · 剩余 4m 12s</span></div>
              <Progress value={48} striped/>
            </div>
            <div>
              <div className="flex justify-between t-xs t-3 mb-2"><span>变异注释</span><span className="mono">100%</span></div>
              <Progress value={100} tone="ok"/>
            </div>
            <div>
              <div className="flex justify-between t-xs t-3 mb-2"><span>推理超时</span><span className="mono">error</span></div>
              <Progress value={62} tone="err"/>
            </div>
            <div>
              <Progress value={30} size="lg" striped/>
              <div className="flex justify-between t-xs t-3 mt-2"><span>ACMG 自动评分</span><span className="mono">步骤 3 / 5</span></div>
            </div>
          </div>

          <div className="cap mt-4">Confidence & Match Bar</div>
          <div style={{display:"grid", gap:10}}>
            <div className="flex items-center gap-3"><span className="t-xs t-3" style={{width:100}}>匹配率 MG</span><MatchBar value={94.2}/></div>
            <div className="flex items-center gap-3"><span className="t-xs t-3" style={{width:100}}>匹配率 LEMS</span><MatchBar value={71.8}/></div>
            <div className="flex items-center gap-3"><span className="t-xs t-3" style={{width:100}}>匹配率 CMS</span><MatchBar value={38.0}/></div>
            <div className="flex gap-4 mt-2">
              <Conf value={92} level="high"/>
              <Conf value={66} level="mid"/>
              <Conf value={29} level="low"/>
            </div>
          </div>
        </div>

        <div className="frame">
          <div className="cap">Stepper · VCF 分析流程</div>
          <div className="stepper mt-2">
            {[
              { n:1, label:"文件校验",  state:"is-done", meta:"0:02" },
              { n:2, label:"比对 & 标准化", state:"is-done", meta:"4:12" },
              { n:3, label:"变异注释",  state:"is-done", meta:"12:30" },
              { n:4, label:"ACMG 评分", state:"is-active", meta:"运行中" },
              { n:5, label:"结果整合",  state:"", meta:"等待中" },
            ].map(s => (
              <div key={s.n} className={`stepper__item ${s.state}`}>
                <div className="stepper__bar"/>
                <div className="stepper__label">
                  <span className="stepper__num">{s.state==="is-done" ? "✓" : s.n}</span>
                  {s.label}
                </div>
                <div className="stepper__meta">{s.meta}</div>
              </div>
            ))}
          </div>

          <div className="cap mt-6">Multi-turn Reasoning</div>
          <div style={{display:"grid", gap:8}}>
            {[
              { r:"第 1 轮", desc:"HPO 归一 · 识别到 12 个表型", done:true },
              { r:"第 2 轮", desc:"排除 OXPHOS 相关疾病（无乳酸升高）", done:true },
              { r:"第 3 轮", desc:"聚焦于神经肌肉接头疾病", running:true },
              { r:"第 4 轮", desc:"鉴别 MG / LEMS / CMS", pending:true },
            ].map((x,i)=>(
              <div key={i} className="flex items-center gap-3" style={{padding:"8px 10px", border:"1px solid var(--border)", borderLeftWidth:3, borderLeftColor: x.running?"var(--accent)": x.done?"var(--ok-500)":"var(--border-strong)", borderRadius:4, background:"var(--bg-surface)"}}>
                <span className="mono t-xs t-3" style={{width:46}}>{x.r}</span>
                <span className="t-sm fw-5" style={{flex:1}}>{x.desc}</span>
                {x.done && <Badge tone="ok" dot>完成</Badge>}
                {x.running && <span className="status status--running"><span className="status__dot"/></span>}
                {x.pending && <span className="t-xs t-4">等待中</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Alerts / Tabs / Chat ============== */
function SectionCommunicate() {
  const [tab, setTab] = useStateC("rank");
  return (
    <section className="section" id="communicate">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">08 · Components</div>
          <h2 className="section__title">提示 · Tabs · 对话</h2>
          <p className="section__desc">AI 追问使用对话气泡，医生回复右对齐；文献引用通过上标 <sup style={{color:"var(--accent)"}}>[3]</sup> 访问。</p>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="frame mb-4">
            <div className="cap">Alerts</div>
            <div style={{display:"grid", gap:10}}>
              <Alert tone="info" title="系统提示">
                本次诊断使用模型 v2026.03。历史结论仅供参考，最终诊断应由医师确认。
              </Alert>
              <Alert tone="ok" title="诊断完成" icon={<IconCheck/>}>
                已找到 3 个高匹配候选疾病，Top 1 置信度 92%。
              </Alert>
              <Alert tone="warn" title="HPO 输入不足" icon={<IconWarning/>}>
                当前仅 3 个表型，建议补充至 ≥ 5 个以提升诊断可靠性。
              </Alert>
              <Alert tone="err" title="VCF 校验失败" icon={<IconWarning/>}>
                参考基因组版本不匹配：文件为 GRCh37，系统需 GRCh38。
              </Alert>
            </div>
          </div>

          <div className="frame">
            <div className="cap">Tabs</div>
            <Tabs active={tab} onChange={setTab} items={[
              { key:"rank", label:"疾病排名", count:5 },
              { key:"hpo",  label:"HPO 匹配", count:12 },
              { key:"diff", label:"鉴别对比" },
              { key:"exam", label:"推荐检查", count:4 },
              { key:"ref",  label:"文献引用", count:18 },
            ]}/>
            <div style={{padding:"16px 4px 4px"}} className="t-sm t-2">
              当前 tab：<b>{ {rank:"疾病排名", hpo:"HPO 匹配", diff:"鉴别对比", exam:"推荐检查", ref:"文献引用"}[tab] }</b>
            </div>
          </div>
        </div>

        <div className="frame">
          <div className="cap">Chat · AI 追问</div>
          <div className="chat">
            <div className="chat__msg chat__msg--ai">
              <div className="chat__avatar chat__avatar--ai">AI</div>
              <div className="chat__bubble">
                根据现有 HPO（肌无力、晨轻暮重、咀嚼疲劳），我初步倾向于<b>神经肌肉接头疾病</b><a className="cite-sup">[3]</a>。请补充以下信息以提高准确度：
                <div className="chat__choices">
                  <span className="chat__choice">是否有上睑下垂？</span>
                  <span className="chat__choice">症状是否对新斯的明有反应？</span>
                  <span className="chat__choice">家族中有类似病例？</span>
                </div>
              </div>
            </div>
            <div className="chat__msg chat__msg--user">
              <div className="chat__avatar chat__avatar--user">李</div>
              <div className="chat__bubble">双侧上睑下垂明确；新斯的明试验阳性；家族史阴性。</div>
            </div>
            <div className="chat__msg chat__msg--ai">
              <div className="chat__avatar chat__avatar--ai">AI</div>
              <div className="chat__bubble">
                已加入表型 <Hpo id="HP:0000508" label="Ptosis" removable={false}/> 和 <Hpo id="HP:0003473" label="Fatigable weakness" removable={false}/>。正在基于 4 项核心表型重新推理<span className="spinner" style={{marginLeft:6}}/>
              </div>
            </div>
          </div>
          <div className="composer mt-4">
            <div className="composer__chips">
              <Hpo id="HP:0000508" label="Ptosis"/>
              <Hpo id="HP:0003473" label="Fatigable weakness"/>
              <Hpo id="HP:0001263" label="Developmental delay" neg/>
            </div>
            <div className="composer__row">
              <textarea className="composer__input" placeholder="回复 AI，或 / 快速添加 HPO..."/>
              <Btn variant="ghost" size="sm"><IconBeaker/></Btn>
              <Btn variant="primary" size="sm" icon={<IconSend/>}>发送</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionButtons, SectionForms, SectionBadges, SectionProgress, SectionCommunicate });
