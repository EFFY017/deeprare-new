/* global React, Btn, IconChevron */
const { useState: useStateAQ } = React;

/* 追问脚本：3 题示例（单选 / 单选 / 单选）+ 第 4 题（多选）+ 第 5 题（问答），
   前 3 题作为"已回答"展示，第 4 题为"当前题"，第 5 题尚未触达 */
const AIQ2_SCRIPT = [
  {
    type: "single",
    text: "您好，我是 DeepRare 诊断助手。根据病历，患者存在构音障碍和震颤。请问这两个症状哪个先出现？",
    purpose: "先发症状有助于区分原发神经受累与继发性损伤，对定位病因有重要意义。",
    options: ["构音障碍先出现", "震颤先出现", "两者同时出现", "不确定"],
    answered: { kind: "single", idx: 0 },
    userText: "构音障碍先出现，约 8 个月前；震颤是 5 个月后出现的。",
  },
  {
    type: "single",
    text: "明白。震颤属于静止性还是动作性？持物或写字时是否加重？",
    purpose: "静止性震颤提示锥体外系（帕金森样）受累；动作性震颤更多于小脑病变，两者鉴别方向不同。",
    options: ["静止时明显，动作时减轻", "动作时加重，静止时消失", "与动作无关时时均显著", "不确定"],
    answered: { kind: "single", idx: 0 },
    userText: "静止时可见，写字或拿筷子时更明显。",
  },
  {
    type: "single",
    text: "请问患者是否接受过眼科裂隙灯检查？角膜周围是否存在棕色色素环（K-F 环）？",
    cite: "1",
    purpose: "K-F 环是 Wilson Disease 神经型的标志性体征，特异性 > 95%，阳性可大幅提升诊断权重。",
    options: ["已查，报告阳性 / 疑似阳性", "已查，报告阴性", "尚未检查", "不详"],
    answered: { kind: "single", idx: 0 },
    userText: "眼科看过，报告写疑似 K-F 环。",
  },
];

/* 当前题：多选 */
const AIQ2_CURRENT_MULTI = {
  type: "multi",
  text: "在过去半年内，患者还出现了以下哪些表现？（可多选）",
  purpose: "Wilson Disease 神经型常合并精神 / 行为及自主神经症状，多系统线索可显著提高诊断置信度。",
  options: [
    "情绪 / 行为改变（易怒、抑郁等）",
    "认知减退 / 学习能力下降",
    "流涎",
    "肌张力障碍 / 强直",
    "睡眠障碍",
  ],
};

/* 后续题：问答 */
const AIQ2_NEXT_TEXT = {
  type: "text",
  text: "家族中是否有类似肝病或不明原因神经症状的亲属？请补充关系与年龄。",
  purpose: "Wilson Disease 为常染色体隐性遗传，同胞与父母情况尤其重要。",
};

const QTYPE_LABEL = { single: "单选", multi: "多选", text: "问答" };

function AIQ2Demo() {
  // 当前题：多选状态
  const [multiPicked, setMultiPicked] = useStateAQ([]);
  const [multiSubmitted, setMultiSubmitted] = useStateAQ(null); // 提交后变成"已回答"
  const [skipPop, setSkipPop] = useStateAQ(false);
  // text 阶段
  const [textVal, setTextVal] = useStateAQ("");
  const [textSubmitted, setTextSubmitted] = useStateAQ(null);

  const lastIdx = AIQ2_CURRENT_MULTI.options.length; // "不确定"
  function toggleMulti(i) {
    if (multiSubmitted) return;
    setMultiPicked(prev => {
      const has = prev.indexOf(i) >= 0;
      if (i === lastIdx) return has ? [] : [lastIdx];
      const next = prev.filter(x => x !== lastIdx);
      return has ? next.filter(x => x !== i) : [...next, i];
    });
  }

  const multiAnswered = multiPicked.length > 0;
  const showText = !!multiSubmitted;
  const textAnswered = textVal.trim().length > 0;

  function submitMulti() {
    if (!multiAnswered) return;
    setMultiSubmitted({ kind: "multi", idxs: multiPicked.slice() });
  }
  function submitText() {
    if (!textAnswered) return;
    setTextSubmitted({ kind: "text", value: textVal });
  }

  const completed = AIQ2_SCRIPT.length + (multiSubmitted ? 1 : 0) + (textSubmitted ? 1 : 0);

  return (
    <div className="aiq2">
      {/* head */}
      <div className="aiq2__head">
        <div className="aiq2__head-num">1</div>
        <div className="aiq2__head-title">AI 追问症状</div>
        <span className={`aiq2__head-status${textSubmitted ? "" : " aiq2__head-status--running"}`}>
          {textSubmitted ? `已完成 · ${completed} 轮问答` : `进行中 · 已答 ${completed} 题`}
        </span>
        <span className="spacer"/>
        <span className="aiq2__head-link">查看完整对话 <IconChevron/></span>
      </div>

      {/* thread */}
      <div className="aiq2__thread">
        {/* 已回答的 3 道单选 */}
        {AIQ2_SCRIPT.map((q, qi) => (
          <React.Fragment key={qi}>
            <div className="aiq2__qrow">
              <div className="ava">AI</div>
              <div className="aiq2__qbubble">
                <div className="aiq2__qtext">
                  {q.text}
                  {q.cite && <a className="cite-sup">[{q.cite}]</a>}
                </div>
                <div className="aiq2__qpurpose"><b>询问目的</b>{q.purpose}</div>
                <div className="aiq2__chips">
                  {q.options.map((opt, i) => {
                    const selected = q.answered.idx === i;
                    const isUncertain = i === q.options.length - 1 && opt === "不确定";
                    return (
                      <span key={i} className={`aiq2__chip is-locked${selected ? " is-selected" : ""}${isUncertain ? " aiq2__chip--uncertain" : ""}`}>
                        {opt}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="aiq2__arow">
              <div className="ava">我</div>
              <div className="aiq2__abubble">{q.userText}</div>
            </div>
          </React.Fragment>
        ))}

        {/* 当前题：多选 */}
        <div className="aiq2__qrow">
          <div className="ava">AI</div>
          <div className="aiq2__qbubble">
            <div className="aiq2__qtext">{AIQ2_CURRENT_MULTI.text}</div>
            <div className="aiq2__qpurpose"><b>询问目的</b>{AIQ2_CURRENT_MULTI.purpose}</div>
            <div className="aiq2__chips">
              {AIQ2_CURRENT_MULTI.options.map((opt, i) => {
                const selected = multiPicked.indexOf(i) >= 0;
                return (
                  <span key={i}
                    className={`aiq2__chip${multiSubmitted ? " is-locked" : ""}${selected ? " is-selected" : ""}`}
                    onClick={() => toggleMulti(i)}>
                    {opt}
                  </span>
                );
              })}
              {(() => {
                const i = lastIdx;
                const selected = multiPicked.indexOf(i) >= 0;
                return (
                  <span className={`aiq2__chip aiq2__chip--uncertain${multiSubmitted ? " is-locked" : ""}${selected ? " is-selected" : ""}`}
                    onClick={() => toggleMulti(i)}>
                    不确定
                  </span>
                );
              })()}
            </div>
            {!multiSubmitted && (
              <div className="aiq2__next-row">
                <span className="aiq2__next-hint">回答后点击「下一题」继续</span>
                <Btn variant="primary" size="sm" onClick={submitMulti} disabled={!multiAnswered}>下一题</Btn>
              </div>
            )}
          </div>
        </div>

        {multiSubmitted && (
          <div className="aiq2__arow">
            <div className="ava">我</div>
            <div className="aiq2__abubble">
              {multiSubmitted.idxs.length === 1 && multiSubmitted.idxs[0] === lastIdx
                ? "不确定"
                : multiSubmitted.idxs.map(i => i === lastIdx ? "不确定" : AIQ2_CURRENT_MULTI.options[i]).join(" · ")}
            </div>
          </div>
        )}

        {/* 下一题：问答 */}
        {showText && (
          <div className="aiq2__qrow">
            <div className="ava">AI</div>
            <div className="aiq2__qbubble">
              <div className="aiq2__qtext">{AIQ2_NEXT_TEXT.text}</div>
              <div className="aiq2__qpurpose"><b>询问目的</b>{AIQ2_NEXT_TEXT.purpose}</div>
              {!textSubmitted ? (
                <React.Fragment>
                  <textarea
                    className="aiq2__textbox"
                    placeholder='如无答案可填写"不确定"'
                    value={textVal}
                    onChange={e => setTextVal(e.target.value)}
                  />
                  <div className="aiq2__next-row">
                    <span className="aiq2__next-hint"><kbd>⌘</kbd> + <kbd>Enter</kbd> 提交</span>
                    <Btn variant="primary" size="sm" onClick={submitText} disabled={!textAnswered}>下一题</Btn>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        )}
        {textSubmitted && (
          <div className="aiq2__arow">
            <div className="ava">我</div>
            <div className="aiq2__abubble">{textSubmitted.value}</div>
          </div>
        )}
      </div>

      {/* foot：跳过追问，提取 HPO（常驻） */}
      <div className="aiq2__foot">
        <div className="aiq2__foot-text">
          已回答 <b style={{color:"var(--text-1)"}}>{completed}</b> 题。AI 将根据回答自动抽取 HPO 表型并进入下一阶段。
        </div>
        <div className="aiq2__skip-pop">
          <button className="aiq2__skip-btn" onClick={() => setSkipPop(!skipPop)}>
            跳过追问，提取 HPO
          </button>
          {skipPop && (
            <div className="aiq2__skip-pop__bubble">
              将基于<b>已回答内容</b>提取 HPO（{completed} 题）。未回答题目不参与本次表型抽取。
              <div className="aiq2__skip-pop__actions">
                <Btn variant="ghost" size="sm" onClick={() => setSkipPop(false)}>取消</Btn>
                <Btn variant="primary" size="sm" onClick={() => setSkipPop(false)}>确认提取</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionAIQ() {
  return (
    <section className="section" id="aiq">
      <div className="section__head">
        <div>
          <div className="section__eyebrow">09 · Components</div>
          <h2 className="section__title">AI 追问 · 一题一答</h2>
          <p className="section__desc">
            AI 基于已输入主诉逐题追问以补全 HPO，对话流形式让医生纵览所有上下文。题型 <b>单选 / 多选 / 问答</b>；
            前两者末尾必含<b>「不确定」</b>选项（虚线弱化），问答题占位提示固定为
            <code className="t-3" style={{fontSize:12, marginLeft:4}}>'如无答案可填写"不确定"'</code>。
            每答完一题点「下一题」追加下一条 AI 提问；底部常驻「跳过追问，提取 HPO」按钮，点击弹出确认条说明将基于已回答内容继续。
          </p>
        </div>
      </div>

      <div className="frame">
        <div className="cap">交互示例 · 已答 3 题，当前为多选题</div>
        <AIQ2Demo/>
      </div>
    </section>
  );
}

Object.assign(window, { SectionAIQ });
