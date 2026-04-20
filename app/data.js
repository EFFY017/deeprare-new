/* ============================================================
   DeepRare Prototype · mock data
   ============================================================ */

/* ---------- Hero patient · 吴建国, Wilson Disease ---------- */
const HERO_PATIENT = {
  id: "P-2024-0317",
  name: "吴建国",
  gender: "男",
  age: 14,
  dob: "2010-03-22",
  ethnicity: "汉族",
  familyHistory: "父母非近亲。叔叔 42 岁因肝硬化去世，外祖母肝病史不详。",
  consanguinity: "否",
  registeredAt: "2024-09-02",
  lastVisitAt: "2025-01-14",
  coreSymptoms: "构音障碍 · 震颤 · 肝酶升高 · K-F 环疑似",
  hpoCount: 2,
  vcfCount: 1,
  status: "diagnosed", // completed
  // timeline on profile
  history: [
    { date: "2023-11-08", title: "首次就诊 · 消化内科", meta: "肝酶异常 ALT 186, AST 122" },
    { date: "2024-02-17", title: "神经内科会诊",      meta: "构音不清 6 个月, 手部震颤" },
    { date: "2024-08-04", title: "眼科裂隙灯检查",   meta: "疑似 K-F 环 (双眼)" },
    { date: "2024-09-02", title: "录入 DeepRare",    meta: "本账号录入" },
    { date: "2024-11-21", title: "HPO 表型诊断",    meta: "Top 1 Wilson Disease 92.4%" },
    { date: "2025-01-14", title: "VCF 基因诊断",    meta: "ATP7B 复合杂合 · 确诊" },
  ],
  presentText:
`患者男性, 14 岁, 在校中学生。
主诉: 言语不清 8 个月, 双手不自主震颤 5 个月, 加重 2 周。

现病史:
患者 8 个月前无明显诱因出现言语含糊, 同学察觉其说话"不清楚", 无饮水呛咳。5 个月前出现双手静止性震颤, 持物时明显, 写字变慢且字迹潦草。近 2 周震颤加重, 伴情绪易激惹, 上课注意力下降。无发热、抽搐、意识障碍。

既往史:
2023-11 体检发现 ALT 186 U/L, AST 122 U/L, 当地医院诊断"肝酶异常"予保肝治疗 3 月, 复查仍波动 (ALT 90-150)。乙肝、丙肝筛查阴性, 自身免疫肝炎抗体阴性。

家族史:
父母体健, 非近亲婚配。叔叔 42 岁于 5 年前因"肝硬化"去世, 具体病因不详。外祖母有不明原因肝病史。一姐姐 18 岁, 体健。

体格检查:
神清, 构音障碍 (缓慢、含糊), 双上肢静止性震颤 (右侧著), 指鼻试验欠稳准, 肌张力略高 (齿轮样, 右上肢)。腹软, 肝肋下 2 cm, 质中。

辅助检查:
血清铜蓝蛋白 0.08 g/L (正常 0.20-0.60)
24h 尿铜 312 μg (正常 < 40)
肝功: ALT 142 U/L, AST 98 U/L, 白蛋白 38 g/L
眼科裂隙灯: 双眼角膜后弹力层铜色素沉积, 符合 K-F 环
头颅 MRI: 双侧豆状核、丘脑对称性长 T2 信号, "大熊猫脸征"可见`
};

/* ---------- Patient list (10 rows, hero included) ---------- */
const PATIENTS = [
  {
    id: "P-2024-0317", name: "吴建国", age: 14, gender: "男",
    summary: "构音障碍 · 震颤 · 肝酶升高 · K-F 环",
    hpoCount: 2, vcfCount: 1,
    createdAt: "2024-09-02", lastAt: "2025-01-14",
    status: "diagnosed"
  },
  {
    id: "P-2024-0298", name: "李雅琪", age: 6, gender: "女",
    summary: "发育迟缓 · 特殊面容 · 房间隔缺损",
    hpoCount: 1, vcfCount: 0,
    createdAt: "2024-08-21", lastAt: "2025-01-08",
    status: "diagnosed"
  },
  {
    id: "P-2025-0011", name: "陈思源", age: 3, gender: "男",
    summary: "喂养困难 · 肌张力低下 · 新生儿筛查异常",
    hpoCount: 1, vcfCount: 1,
    createdAt: "2025-01-03", lastAt: "2025-01-15",
    status: "running" // 正在诊断
  },
  {
    id: "P-2024-0256", name: "张若彤", age: 22, gender: "女",
    summary: "高个长指 · 晶状体脱位 · 主动脉根部扩张",
    hpoCount: 2, vcfCount: 1,
    createdAt: "2024-07-11", lastAt: "2024-12-28",
    status: "diagnosed"
  },
  {
    id: "P-2024-0244", name: "王浩然", age: 9, gender: "男",
    summary: "进行性肌无力 · 腓肠肌肥大 · CK 显著升高",
    hpoCount: 1, vcfCount: 0,
    createdAt: "2024-06-30", lastAt: "2024-12-02",
    status: "review"
  },
  {
    id: "P-2024-0211", name: "林婉清", age: 31, gender: "女",
    summary: "反复发作性腹痛 · 皮肤光敏感 · 尿液变红",
    hpoCount: 2, vcfCount: 1,
    createdAt: "2024-05-18", lastAt: "2024-11-09",
    status: "diagnosed"
  },
  {
    id: "P-2025-0018", name: "赵敏捷", age: 5, gender: "男",
    summary: "反复感染 · 湿疹 · 血小板减少",
    hpoCount: 1, vcfCount: 0,
    createdAt: "2025-01-09", lastAt: "2025-01-15",
    status: "running"
  },
  {
    id: "P-2024-0189", name: "黄铭宇", age: 17, gender: "男",
    summary: "夜盲 · 视野缩窄 · 视网膜色素沉着",
    hpoCount: 1, vcfCount: 1,
    createdAt: "2024-04-22", lastAt: "2024-10-15",
    status: "diagnosed"
  },
  {
    id: "P-2024-0167", name: "刘欣怡", age: 28, gender: "女",
    summary: "反复骨折 · 蓝巩膜 · 听力下降",
    hpoCount: 1, vcfCount: 0,
    createdAt: "2024-03-14", lastAt: "2024-09-21",
    status: "diagnosed"
  },
  {
    id: "P-2024-0144", name: "周明哲", age: 42, gender: "男",
    summary: "进行性痉挛步态 · 下肢僵硬",
    hpoCount: 2, vcfCount: 0,
    createdAt: "2024-02-26", lastAt: "2024-08-18",
    status: "failed"
  },
];

/* ---------- HPO diagnosis · Wilson Disease (完成) ---------- */
const HPO_DIAG = {
  completedAt: "2024-11-21 16:42",
  duration: "4 分 12 秒",
  model: "DeepRare-R1 · 2024-10",
  hpoList: [
    { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
    { id: "HP:0001260", label: "构音障碍" },
    { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
    { id: "HP:0200136", label: "Kayser-Fleischer 环" },
    { id: "HP:0002172", label: "伸展肢体僵硬" },
    { id: "HP:0000718", label: "攻击行为", neg: true },
  ],
  top5: [
    {
      rank: 1, name: "Wilson Disease", nameCn: "肝豆状核变性",
      omim: "OMIM:277900", orpha: "ORPHA:905",
      match: 92.4, conf: 94, level: "high",
      gene: "ATP7B", inherit: "AR",
      summary: "铜代谢障碍, 累及肝、脑、角膜。青少年起病, ATP7B 基因突变。"
    },
    {
      rank: 2, name: "Juvenile Huntington Disease", nameCn: "青少年亨廷顿病",
      omim: "OMIM:143100",
      match: 61.7, conf: 58, level: "mid",
      gene: "HTT", inherit: "AD",
      summary: "CAG 重复扩张引起的神经退行性病变, 运动症状先于认知改变。"
    },
    {
      rank: 3, name: "PKAN (NBIA1)", nameCn: "泛酸激酶相关性神经变性",
      omim: "OMIM:234200",
      match: 48.2, conf: 52, level: "mid",
      gene: "PANK2", inherit: "AR",
      summary: "基底节铁沉积, 肌张力障碍, 构音障碍, 眼底视网膜色素变性。"
    },
    {
      rank: 4, name: "Niemann-Pick Type C", nameCn: "尼曼匹克 C 型",
      omim: "OMIM:257220",
      match: 39.6, conf: 44, level: "mid",
      gene: "NPC1", inherit: "AR",
      summary: "溶酶体储积症, 垂直核上性眼肌麻痹, 脾肿大, 构音障碍。"
    },
    {
      rank: 5, name: "Dopa-Responsive Dystonia", nameCn: "多巴反应性肌张力障碍",
      omim: "OMIM:128230",
      match: 27.3, conf: 31, level: "low",
      gene: "GCH1", inherit: "AD",
      summary: "日间波动性肌张力障碍, 低剂量左旋多巴显著有效。"
    }
  ],
  // Top 1 match detail
  top1Match: [
    { criterion: "肝豆状核变性 Leipzig 标准 · K-F 环",      phenotype: "Kayser-Fleischer 环 (HP:0200136)", hit: true, patient: "眼科裂隙灯确认双眼 K-F 环",           ref: "[1]" },
    { criterion: "血清铜蓝蛋白 < 0.10 g/L",             phenotype: "低铜蓝蛋白血症 (HP:0004364)",       hit: true, patient: "0.08 g/L",                              ref: "[1,2]" },
    { criterion: "24 小时尿铜 > 100 μg",               phenotype: "尿铜增高 (HP:0003155)",             hit: true, patient: "312 μg / 24h",                          ref: "[1]" },
    { criterion: "肝脏受累: 转氨酶升高或肝硬化表现",    phenotype: "肝酶升高 (HP:0001397)",             hit: true, patient: "ALT 142, AST 98, 病程 > 12 月",          ref: "[3]" },
    { criterion: "神经系统症状: 锥体外系/构音障碍",      phenotype: "构音障碍 (HP:0001260) · 震颤 (HP:0001300)", hit: true, patient: "静止性震颤 + 构音障碍 5-8 月", ref: "[1,4]" },
    { criterion: "头颅 MRI: 豆状核对称病灶",            phenotype: "基底节异常信号 (HP:0002134)",       hit: true, patient: "双侧豆状核、丘脑对称长 T2, 大熊猫脸征",    ref: "[5]" },
    { criterion: "家族史提示常染色体隐性",              phenotype: "阳性家族史 (HP:0001425)",           hit: "partial", patient: "叔叔 42 岁肝硬化去世, 具体病因未明",   ref: "[1]" },
    { criterion: "血清铜 < 70 μg/dL",                  phenotype: "低血清铜",                           hit: "unknown", patient: "检查未完成",                          ref: "—" },
    { criterion: "溶血性贫血 (急性发作期)",             phenotype: "溶血性贫血 (HP:0001878)",           hit: false, patient: "Hb 128 g/L, 未见溶血",                   ref: "[1]" },
  ],
  evidence: {
    clinical: [
      { text: "8 个月病程的构音不清合并 5 个月的静止性震颤, 符合 Wilson Disease 典型青少年起病神经型表现。", cite: "[4]" },
      { text: "腹部查体肝脏肋下 2 cm, 结合长期肝酶升高, 提示肝脏亚临床受累。", cite: "[3]" },
    ],
    lab: [
      { text: "血清铜蓝蛋白 0.08 g/L, 显著低于诊断阈值 0.20 g/L。", cite: "[1]" },
      { text: "24 小时尿铜 312 μg, 超过 100 μg 诊断切点近 3 倍。", cite: "[1,2]" },
      { text: "肝酶反复升高 (ALT 90-186), 自免与病毒性肝炎筛查阴性, 排除常见鉴别。", cite: "[3]" }
    ],
    therapy: [
      { text: "患者当前未启用铜螯合治疗, 建议启动 D-青霉胺 或 曲恩汀 试验性治疗, 同时观察神经症状变化。", cite: "[6]" }
    ],
    molecular: [
      { text: "临床 Leipzig 评分 ≥ 4 分已可确诊; 推荐 ATP7B 基因测序确认突变类型, 为家族筛查与治疗方案选择提供依据。", cite: "[1,7]" }
    ],
    overall: "综合 K-F 环、铜蓝蛋白、尿铜、头颅 MRI 四项硬指标阳性, Leipzig 评分 ≥ 6 分, 诊断 Wilson Disease 证据充分, 建议立即启动去铜治疗并完善 ATP7B 分子诊断。"
  },
  // 鉴别诊断 (Top 1 ↔ 其他)
  diff: [
    { feature: "起病年龄", wilson: "5-35 岁 (典型青少年)", alt: "青少年 HD 多 < 20 岁; PKAN 10 岁前", note: "Wilson 与 PKAN 区间重叠" },
    { feature: "K-F 环",   wilson: "神经型 > 95% 阳性",     alt: "HD / PKAN / NPC 均阴性",            note: "强鉴别特征" },
    { feature: "铜蓝蛋白", wilson: "降低",                 alt: "其他疾病正常",                      note: "—" },
    { feature: "头颅 MRI", wilson: "豆状核、丘脑对称病灶, 大熊猫脸", alt: "HD: 尾状核萎缩; PKAN: 苍白球虎眼征", note: "影像差异明显" },
    { feature: "家族遗传", wilson: "AR",                   alt: "HD 为 AD; PKAN AR",                  note: "家族史倾向 AR" },
  ],
  recommendedTests: {
    confirm: [
      "ATP7B 基因全外显子 + CNV 检测 (确诊)",
      "24h 尿铜 + 青霉胺负荷试验",
      "肝活检 (肝铜定量, 必要时)",
    ],
    followup: [
      "肝功、血铜、尿铜 每 3 月",
      "头颅 MRI + 神经功能评分 每 6-12 月",
      "眼科裂隙灯 每 12 月",
    ]
  },
  similarCases: [
    { id: "Case A · Lancet 2019",    brief: "14 岁男性, 构音障碍 + 肝酶升高, K-F 环阳性, ATP7B c.2333G>T / c.2975C>T 复合杂合。", match: 88 },
    { id: "Case B · Hepatology 2021", brief: "12 岁女性, 神经症状先发, 铜蓝蛋白 0.07, 对青霉胺治疗反应良好。", match: 82 },
    { id: "Case C · JIMD 2020",      brief: "16 岁男性, 大熊猫脸征典型, 家族中叔叔 40 岁死于肝硬化。", match: 79 }
  ],
  mdt: [
    { dept: "神经内科", reason: "评估锥体外系症状严重程度及用药方案" },
    { dept: "消化/肝病科", reason: "肝功能分期, 肝纤维化评估" },
    { dept: "遗传咨询门诊", reason: "ATP7B 阳性后家系筛查与生育指导" },
    { dept: "眼科", reason: "随访 K-F 环消退情况作为治疗反应指标" },
  ],
  references: [
    { n: 1, text: "EASL Clinical Practice Guidelines: Wilson's Disease. J Hepatol. 2012;56(3):671-685." },
    { n: 2, text: "Roberts EA, Schilsky ML. Diagnosis and treatment of Wilson disease. Hepatology 2008;47(6):2089-2111." },
    { n: 3, text: "Schilsky ML. Liver transplantation for Wilson's disease. Ann N Y Acad Sci. 2014;1315:45-49." },
    { n: 4, text: "Lorincz MT. Neurologic Wilson's Disease. Ann N Y Acad Sci. 2010;1184:173-187." },
    { n: 5, text: "Prashanth LK et al. Wilson's disease: diagnostic errors and clinical implications. J Neurol Neurosurg Psychiatry. 2004;75(6):907-909." },
    { n: 6, text: "Weiss KH et al. Efficacy and safety of trientine in Wilson disease. Clin Gastroenterol Hepatol. 2013." },
    { n: 7, text: "Coffey AJ et al. A genetic study of Wilson's disease in the United Kingdom. Brain. 2013;136(Pt 5):1476-1487." },
  ]
};

/* ---------- HPO diagnosis · running (page D) ---------- */
const HPO_RUNNING = {
  stage1: {
    messages: [
      { from: "ai", text: "您好, 我是 DeepRare 诊断助手。根据您输入的病历, 患者主诉为构音障碍与震颤。能否告诉我症状出现的先后顺序?", refs: [] },
      { from: "user", text: "构音障碍先出现, 约 8 个月前; 震颤是 5 个月后出现的。" },
      { from: "ai", text: "明白。震颤属于静止性还是动作性?是否在握物时加重?", refs: [] },
      { from: "user", text: "静止时可见, 写字或拿筷子时更明显。" },
      { from: "ai", text: "请问患者是否接受过眼科裂隙灯检查?角膜周围是否存在棕色色素环 (K-F 环)?", refs: [{ n: 1, label: "EASL Guidelines 2012" }] },
      { from: "user", text: "眼科看过, 报告写疑似 K-F 环。" },
    ],
    suggestions: [
      "是否伴有情绪或行为改变?",
      "家族中是否有不明原因肝病史?",
      "既往肝功能检查的具体数值?",
    ]
  },
  stage2: {
    extracted: [
      { id: "HP:0001300", label: "锥体外系症状 (震颤)", source: "AI 提取" },
      { id: "HP:0001260", label: "构音障碍",            source: "AI 提取" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高", source: "AI 提取" },
      { id: "HP:0200136", label: "Kayser-Fleischer 环",  source: "医生补充" },
      { id: "HP:0002172", label: "伸展肢体僵硬",        source: "AI 提取" },
      { id: "HP:0000718", label: "攻击行为", neg: true, source: "医生否定" },
    ]
  },
  stage3: {
    startedAt: "2025-01-15 10:04:22",
    steps: [
      { key: "plan",     label: "构建方案",              status: "done", meta: "已加载 3 项诊断策略", t: "00:03" },
      { key: "evidence", label: "证据检索",              status: "done", meta: "命中 128 篇相关文献 · 92 条临床指南", t: "00:21" },
      { key: "round1",   label: "第 1 轮诊断 · 初步 + 鉴别", status: "done", meta: "生成 12 个候选, 收敛至 7 个", t: "00:58" },
      { key: "round2",   label: "第 2 轮诊断 · 初步 + 鉴别", status: "done", meta: "引入实验室线索, 收敛至 5 个", t: "01:44" },
      { key: "round3",   label: "第 3 轮诊断 · 初步 + 鉴别", status: "running", meta: "正在比对 K-F 环 + 铜代谢证据 · 17 / 24 已处理", t: "02:36" },
      { key: "final",    label: "最终诊断",              status: "queue", meta: "等待第 3 轮收敛", t: "—" },
    ],
    liveLog: [
      { t: "02:28", text: "匹配 OMIM:277900 Wilson Disease — Leipzig 评分 6/8" },
      { t: "02:30", text: "排除 OMIM:128230 Dopa-Responsive Dystonia — 无日间波动" },
      { t: "02:33", text: "调用 HPO 本体 v2024-10, 计算语义相似度 (Resnik)" },
      { t: "02:36", text: "K-F 环阳性 → Wilson Disease 权重 +0.18" },
    ]
  }
};

/* ---------- VCF results (Wilson Disease, ATP7B) ---------- */
const VCF_RESULT = {
  completedAt: "2025-01-14 21:18",
  summary: { total: 48923, filtered: 214, path: 2, likelyPath: 1, vus: 6 },
  steps: [
    { label: "变异导入",       value: "48,923", meta: "WES VCF · GRCh38" },
    { label: "过滤",           value: "214",    meta: "MAF<1% · 外显子/剪接区" },
    { label: "候选",           value: "9",      meta: "AR/AD 匹配 HPO" },
    { label: "致病 / 可能致病", value: "3",     meta: "ACMG P + LP" },
  ],
  primary: [
    {
      id: "v1",
      acmg: "P", gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,932,872",
      transcript: "NM_000053.4", cdna: "c.2333G>T", protein: "p.Arg778Leu",
      type: "missense", rsid: "rs28942074", zygosity: "het",
      ad: "48 / 92 (0.52)", sift: "0.00 D", polyphen: "1.00 D", cadd: "32",
      criteria: [
        { code: "PS1", hit: true,  text: "同一氨基酸变化已有致病报告 (c.2333G>A)" },
        { code: "PM1", hit: true,  text: "位于跨膜域 TM4 (功能关键区)" },
        { code: "PM2", hit: true,  text: "gnomAD 频率 0.0008% (极罕见)" },
        { code: "PM5", hit: true,  text: "同位点其他错义变异已致病 p.Arg778Gln" },
        { code: "PP3", hit: true,  text: "多工具预测有害 (SIFT/PolyPhen/CADD)" },
        { code: "PP5", hit: false, text: "ClinVar 报告, 但证据等级未达 PP5" },
        { code: "BS1", hit: false, text: "—" },
      ],
      predictions: [
        { tool: "SIFT",      score: "0.00",  label: "Deleterious" },
        { tool: "PolyPhen-2",score: "1.000", label: "Probably damaging" },
        { tool: "CADD",      score: "32",    label: "Top 0.1%" },
        { tool: "REVEL",     score: "0.89",  label: "High pathogenicity" },
        { tool: "SpliceAI",  score: "0.02",  label: "No splicing impact" },
      ],
      literature: [
        { n: 1, text: "Thomas GR et al. The Wilson disease gene: spectrum of mutations. Nat Genet. 1995;9(2):210-217. (p.Arg778Leu 为东亚最常见突变, 频率 ~30%)" },
        { n: 2, text: "Gu YH et al. ATP7B gene mutations in 29 families with Wilson's disease. J Hum Genet. 2003;48(7):345-353." },
      ],
      geneInfo: "ATP7B 编码铜转运 P 型 ATP 酶, 主要在肝细胞表达, 负责将铜整合到铜蓝蛋白并排入胆汁。功能缺失导致肝、脑铜沉积。",
      expanded: true
    },
    {
      id: "v2",
      acmg: "P", gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,938,049",
      transcript: "NM_000053.4", cdna: "c.3443T>C", protein: "p.Ile1148Thr",
      type: "missense", rsid: "rs121907998", zygosity: "het",
      ad: "52 / 104 (0.50)", sift: "0.00 D", polyphen: "0.98 D", cadd: "29"
    },
    {
      id: "v3",
      acmg: "LP", gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,934,461",
      transcript: "NM_000053.4", cdna: "c.2621C>T", protein: "p.Ala874Val",
      type: "missense", rsid: "rs201038679", zygosity: "het",
      ad: "41 / 82 (0.50)", sift: "0.01 D", polyphen: "0.94 D", cadd: "26"
    },
    {
      id: "v4",
      acmg: "VUS", gene: "COMMD1", chrom: "2p15", pos: "chr2:62,136,780",
      transcript: "NM_152516.4", cdna: "c.158A>G", protein: "p.Gln53Arg",
      type: "missense", rsid: "rs773891", zygosity: "het",
      ad: "30 / 71 (0.42)", sift: "0.12 T", polyphen: "0.45 B", cadd: "18"
    }
  ],
  secondary: [
    { id: "s1", acmg: "LP",  gene: "MYBPC3", chrom: "11p11.2", pos: "chr11:47,354,220", transcript: "NM_000256.3", cdna: "c.1504C>T", protein: "p.Arg502Trp", type: "missense",  rsid: "rs397515963", zygosity: "het",  ad: "37 / 78 (0.47)", sift: "0.00 D", polyphen: "0.99 D", cadd: "28" },
    { id: "s2", acmg: "VUS", gene: "BRCA2",  chrom: "13q13.1", pos: "chr13:32,340,200", transcript: "NM_000059.4", cdna: "c.5909C>G", protein: "p.Ala1970Gly", type: "missense", rsid: "—",          zygosity: "het",  ad: "29 / 60 (0.48)", sift: "0.08 T", polyphen: "0.62 P", cadd: "22" }
  ],
  other: [
    { id: "o1", acmg: "LB", gene: "APOE",   chrom: "19q13.32", pos: "chr19:44,908,684", transcript: "NM_000041.4", cdna: "c.388T>C", protein: "p.Cys130Arg", type: "missense", rsid: "rs429358", zygosity: "het",  ad: "55 / 108 (0.51)", sift: "0.34 T", polyphen: "0.12 B", cadd: "14" },
    { id: "o2", acmg: "B",  gene: "MTHFR",  chrom: "1p36.22",  pos: "chr1:11,856,378",  transcript: "NM_005957.5", cdna: "c.665C>T", protein: "p.Ala222Val", type: "missense", rsid: "rs1801133", zygosity: "hom", ad: "86 / 88 (0.98)", sift: "0.52 T", polyphen: "0.08 B", cadd: "11" }
  ]
};

/* ---------- History records (page F) ---------- */
const HISTORY = [
  { id: "H-007", type: "VCF", startedAt: "2025-01-14 20:36", duration: "42 分 18 秒", status: "done",    summary: "ATP7B 复合杂合 (c.2333G>T / c.3443T>C), 确诊 Wilson Disease" },
  { id: "H-006", type: "HPO", startedAt: "2024-11-21 16:38", duration: "4 分 12 秒",  status: "done",    summary: "Top 1 Wilson Disease 匹配度 92.4%, 置信度 94/100" },
  { id: "H-005", type: "HPO", startedAt: "2024-10-08 11:02", duration: "3 分 48 秒",  status: "done",    summary: "Top 1 Juvenile HD 61%, 建议补充 K-F 环检查" },
  { id: "H-004", type: "VCF", startedAt: "2024-09-12 14:22", duration: "—",           status: "failed",  summary: "VCF 文件 chromosome 命名不匹配, 已终止" },
  { id: "H-003", type: "HPO", startedAt: "2024-09-02 09:18", duration: "2 分 51 秒",  status: "done",    summary: "初诊提示铜代谢障碍, 建议完善铜蓝蛋白检查" },
  { id: "H-002", type: "HPO", startedAt: "2024-08-15 15:44", duration: "—",           status: "running", summary: "由医生手动终止" },
];

/* ---------- Expose ---------- */
Object.assign(window, {
  HERO_PATIENT, PATIENTS, HPO_DIAG, HPO_RUNNING, VCF_RESULT, HISTORY
});
