export const HERO_PATIENT = {
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
  status: "diagnosed",
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
}

export const PATIENTS = [
  { id: "P-2024-0317", name: "吴建国", age: 14, gender: "男", summary: "构音障碍 · 震颤 · 肝酶升高 · K-F 环", hpoCount: 2, vcfCount: 1, createdAt: "2024-09-02", lastAt: "2025-01-14", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
      { id: "HP:0001260", label: "构音障碍" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
      { id: "HP:0200136", label: "Kayser-Fleischer 环" },
      { id: "HP:0002172", label: "伸展肢体僵硬" },
      { id: "HP:0000718", label: "攻击行为" },
    ]},
  { id: "P-2024-0298", name: "李雅琪", age: 6,  gender: "女", summary: "发育迟缓 · 特殊面容 · 房间隔缺损",    hpoCount: 1, vcfCount: 0, createdAt: "2024-08-21", lastAt: "2025-01-08", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001263", label: "全面性发育迟缓" },
      { id: "HP:0000271", label: "面部形态异常" },
      { id: "HP:0001631", label: "房间隔缺损" },
      { id: "HP:0000750", label: "语言发育迟缓" },
    ]},
  { id: "P-2025-0011", name: "陈思源", age: 3,  gender: "男", summary: "喂养困难 · 肌张力低下 · 新生儿筛查异常", hpoCount: 1, vcfCount: 1, createdAt: "2025-01-03", lastAt: "2025-01-15", status: "running",
    hpoTerms: [
      { id: "HP:0011968", label: "喂养困难" },
      { id: "HP:0001290", label: "肌张力低下" },
      { id: "HP:0003256", label: "新生儿代谢筛查异常" },
    ]},
  { id: "P-2024-0256", name: "张若彤", age: 22, gender: "女", summary: "高个长指 · 晶状体脱位 · 主动脉根部扩张", hpoCount: 2, vcfCount: 1, createdAt: "2024-07-11", lastAt: "2024-12-28", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001519", label: "蜘蛛指(趾)" },
      { id: "HP:0001083", label: "晶状体脱位" },
      { id: "HP:0004942", label: "主动脉根部扩张" },
      { id: "HP:0000768", label: "胸廓畸形" },
    ]},
  { id: "P-2024-0244", name: "王浩然", age: 9,  gender: "男", summary: "进行性肌无力 · 腓肠肌肥大 · CK 显著升高", hpoCount: 1, vcfCount: 0, createdAt: "2024-06-30", lastAt: "2024-12-02", status: "review",
    hpoTerms: [
      { id: "HP:0003323", label: "进行性肌无力" },
      { id: "HP:0003707", label: "腓肠肌假性肥大" },
      { id: "HP:0003236", label: "血清 CK 升高" },
    ]},
  { id: "P-2024-0211", name: "林婉清", age: 31, gender: "女", summary: "反复发作性腹痛 · 皮肤光敏感 · 尿液变红",  hpoCount: 2, vcfCount: 1, createdAt: "2024-05-18", lastAt: "2024-11-09", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0002027", label: "反复发作性腹痛" },
      { id: "HP:0000992", label: "皮肤光敏感" },
      { id: "HP:0040315", label: "尿液变色" },
      { id: "HP:0001929", label: "溶血性贫血" },
    ]},
  { id: "P-2025-0018", name: "赵敏捷", age: 5,  gender: "男", summary: "反复感染 · 湿疹 · 血小板减少",          hpoCount: 1, vcfCount: 0, createdAt: "2025-01-09", lastAt: "2025-01-15", status: "running",
    hpoTerms: [
      { id: "HP:0002719", label: "反复感染" },
      { id: "HP:0001047", label: "特应性皮炎 (湿疹)" },
      { id: "HP:0001873", label: "血小板减少" },
    ]},
  { id: "P-2024-0189", name: "黄铭宇", age: 17, gender: "男", summary: "夜盲 · 视野缩窄 · 视网膜色素沉着",      hpoCount: 1, vcfCount: 1, createdAt: "2024-04-22", lastAt: "2024-10-15", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0000662", label: "夜盲症" },
      { id: "HP:0001133", label: "视野缩窄" },
      { id: "HP:0000580", label: "视网膜色素变性" },
    ]},
  { id: "P-2024-0167", name: "刘欣怡", age: 28, gender: "女", summary: "反复骨折 · 蓝巩膜 · 听力下降",          hpoCount: 1, vcfCount: 0, createdAt: "2024-03-14", lastAt: "2024-09-21", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0002659", label: "反复病理性骨折" },
      { id: "HP:0000592", label: "蓝巩膜" },
      { id: "HP:0000365", label: "感音性听力下降" },
    ]},
  { id: "P-2024-0144", name: "周明哲", age: 42, gender: "男", summary: "进行性痉挛步态 · 下肢僵硬",              hpoCount: 2, vcfCount: 0, createdAt: "2024-02-26", lastAt: "2024-08-18", status: "failed",
    hpoTerms: [
      { id: "HP:0002493", label: "上运动神经元损害" },
      { id: "HP:0002061", label: "痉挛性截瘫" },
      { id: "HP:0007340", label: "下肢肌无力" },
    ]},
  { id: "P-2024-0128", name: "孙梦琳", age: 19, gender: "女", summary: "关节过度活动 · 皮肤弹性过强 · 反复脱臼", hpoCount: 1, vcfCount: 0, createdAt: "2024-01-15", lastAt: "2024-07-30", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001382", label: "关节过度活动" },
      { id: "HP:0000975", label: "皮肤过度伸展" },
      { id: "HP:0001373", label: "关节脱位" },
    ]},
  { id: "P-2023-0412", name: "钱伟博", age: 55, gender: "男", summary: "多发性神经病 · 心肌病 · 角膜混浊",       hpoCount: 2, vcfCount: 1, createdAt: "2023-11-08", lastAt: "2024-06-12", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001271", label: "多发性神经病" },
      { id: "HP:0001638", label: "心肌病" },
      { id: "HP:0007957", label: "角膜混浊" },
    ]},
  { id: "P-2023-0389", name: "何秀芳", age: 8,  gender: "女", summary: "智力障碍 · 癫痫 · 皮肤色素脱失",         hpoCount: 1, vcfCount: 0, createdAt: "2023-10-22", lastAt: "2024-05-18", status: "review",
    hpoTerms: [
      { id: "HP:0001249", label: "智力障碍" },
      { id: "HP:0001250", label: "癫痫发作" },
      { id: "HP:0001010", label: "皮肤色素减退" },
    ]},
  { id: "P-2023-0355", name: "徐志远", age: 33, gender: "男", summary: "进行性小脑性共济失调 · 眼球运动异常",    hpoCount: 1, vcfCount: 1, createdAt: "2023-09-05", lastAt: "2024-04-09", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001251", label: "小脑性共济失调" },
      { id: "HP:0000496", label: "眼球运动异常" },
      { id: "HP:0002072", label: "舞蹈样动作" },
    ]},
  { id: "P-2023-0301", name: "冯晓燕", age: 12, gender: "女", summary: "先天性心脏病 · 矮小症 · 蹼颈",           hpoCount: 0, vcfCount: 1, createdAt: "2023-07-19", lastAt: "2024-03-25", status: "diagnosed",
    hpoTerms: [
      { id: "HP:0001627", label: "先天性心脏病" },
      { id: "HP:0004322", label: "身材矮小" },
      { id: "HP:0000465", label: "蹼颈" },
    ]},
]

export const HPO_DIAG = {
  completedAt: "2024-11-21 16:42",
  duration: "4 分 12 秒",
  model: "DeepRare-R1 · 2024-10",
  conversation: [
    {
      from: "ai",
      text: "您好，我是 DeepRare 诊断助手。根据病历，患者存在构音障碍与震颤。请问这两个症状哪个先出现？",
      reason: "先发症状有助于区分原发神经受累与继发性损伤，对定位病因有重要意义。",
      choices: ["构音障碍先出现", "震颤先出现", "两者同时出现", "不确定"],
    },
    { from: "user", text: "构音障碍先出现，约 8 个月前；震颤是 5 个月后出现的。", chosen: "构音障碍先出现" },
    {
      from: "ai",
      text: "明白。震颤属于静止性还是动作性？持物或写字时是否加重？",
      reason: "静止性震颤提示锥体外系（帕金森样）受累；动作性震颤更多见于小脑病变，两者鉴别方向不同。",
      choices: ["静止时明显，动作时减轻", "动作时加重，静止时消失", "静止与动作时均明显", "不确定"],
    },
    { from: "user", text: "静止时可见，写字或拿筷子时更明显。", chosen: "静止时明显，动作时减轻" },
    {
      from: "ai",
      text: "请问患者是否接受过眼科裂隙灯检查？角膜周围是否存在棕色色素环（K-F 环）？",
      reason: "K-F 环是 Wilson Disease 神经型的标志性体征，特异性 > 95%，阳性可大幅提升诊断权重。",
      choices: ["已查，报告阳性 / 疑似阳性", "已查，报告阴性", "尚未检查", "不详"],
    },
    { from: "user", text: "眼科看过，报告写疑似 K-F 环。", chosen: "已查，报告阳性 / 疑似阳性" },
    {
      from: "ai",
      text: "患者家族中是否有不明原因肝病、早期肝硬化或神经系统疾病史？",
      reason: "Wilson Disease 为常染色体隐性遗传（AR），阳性家族史可进一步支持遗传背景，并指导家系筛查。",
      choices: ["有不明原因肝病 / 肝硬化史", "有神经系统病史", "两者均有", "无特殊家族史"],
    },
    { from: "user", text: "父方叔叔 42 岁因肝硬化去世，具体病因不详。外祖母有不明原因肝病史。", chosen: "有不明原因肝病 / 肝硬化史" },
    {
      from: "ai",
      text: "信息已收集完毕，共完成 4 轮追问，已提取 6 个 HPO 表型，正在进入推理阶段。",
      reason: null,
      choices: [],
    },
  ],
  hpoList: [
    { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
    { id: "HP:0001260", label: "构音障碍" },
    { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
    { id: "HP:0200136", label: "Kayser-Fleischer 环" },
    { id: "HP:0002172", label: "伸展肢体僵硬" },
    { id: "HP:0000718", label: "攻击行为" },
  ],
  top5: [
    { rank: 1, name: "Wilson Disease", nameCn: "肝豆状核变性", omim: "OMIM:277900", orpha: "ORPHA:905", match: 92.4, conf: "94%", level: "high", gene: "ATP7B", inherit: "AR", summary: "铜代谢障碍, 累及肝、脑、角膜。青少年起病, ATP7B 基因突变。" },
    { rank: 2, name: "Juvenile Huntington Disease", nameCn: "青少年亨廷顿病", omim: "OMIM:143100", match: 61.7, conf: "58%", level: "mid", gene: "HTT", inherit: "AD", summary: "CAG 重复扩张引起的神经退行性病变, 运动症状先于认知改变。" },
    { rank: 3, name: "PKAN (NBIA1)", nameCn: "泛酸激酶相关性神经变性", omim: "OMIM:234200", match: 48.2, conf: "52%", level: "mid", gene: "PANK2", inherit: "AR", summary: "基底节铁沉积, 肌张力障碍, 构音障碍, 眼底视网膜色素变性。" },
    { rank: 4, name: "Niemann-Pick Type C", nameCn: "尼曼匹克 C 型", omim: "OMIM:257220", match: 39.6, conf: "44%", level: "mid", gene: "NPC1", inherit: "AR", summary: "溶酶体储积症, 垂直核上性眼肌麻痹, 脾肿大, 构音障碍。" },
    { rank: 5, name: "Dopa-Responsive Dystonia", nameCn: "多巴反应性肌张力障碍", omim: "OMIM:128230", match: 27.3, conf: "31%", level: "low", gene: "暂无致病基因", inherit: "-", summary: "日间波动性肌张力障碍, 低剂量左旋多巴显著有效。" },
  ],
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
      { text: "肝酶反复升高 (ALT 90-186), 自免与病毒性肝炎筛查阴性, 排除常见鉴别。", cite: "[3]" },
    ],
    therapy: [
      { text: "患者当前未启用铜螯合治疗, 建议启动 D-青霉胺 或 曲恩汀 试验性治疗, 同时观察神经症状变化。", cite: "[6]" },
    ],
    molecular: [
      { text: "临床 Leipzig 评分 ≥ 4 分已可确诊; 推荐 ATP7B 基因测序确认突变类型, 为家族筛查与治疗方案选择提供依据。", cite: "[1,7]" },
    ],
    overall: "综合 K-F 环、铜蓝蛋白、尿铜、头颅 MRI 四项硬指标阳性, Leipzig 评分 ≥ 6 分, 诊断 Wilson Disease 证据充分, 建议立即启动去铜治疗并完善 ATP7B 分子诊断。",
  },
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
    ],
  },
  similarCases: [
    { id: "Case A · Lancet 2019",    brief: "14 岁男性, 构音障碍 + 肝酶升高, K-F 环阳性, ATP7B c.2333G>T / c.2975C>T 复合杂合。", match: 88 },
    { id: "Case B · Hepatology 2021", brief: "12 岁女性, 神经症状先发, 铜蓝蛋白 0.07, 对青霉胺治疗反应良好。", match: 82 },
    { id: "Case C · JIMD 2020",      brief: "16 岁男性, 大熊猫脸征典型, 家族中叔叔 40 岁死于肝硬化。", match: 79 },
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
  ],
}

export const HPO_RUNNING = {
  stage1: {
    messages: [
      {
        from: "ai",
        text: "您好，我是 DeepRare 诊断助手。根据病历，患者存在构音障碍与震颤。请问这两个症状哪个先出现？",
        reason: "先发症状有助于区分原发神经受累与继发性损伤，对定位病因有重要意义。",
        choices: ["构音障碍先出现", "震颤先出现", "两者同时出现", "不确定"],
        refs: [],
      },
      { from: "user", text: "构音障碍先出现，约 8 个月前；震颤是 5 个月后出现的。", chosen: "构音障碍先出现" },
      {
        from: "ai",
        text: "明白。震颤属于静止性还是动作性？持物或写字时是否加重？",
        reason: "静止性震颤提示锥体外系（帕金森样）受累；动作性震颤更多见于小脑病变，两者鉴别方向不同。",
        choices: ["静止时明显，动作时减轻", "动作时加重，静止时消失", "静止与动作时均明显", "不确定"],
        refs: [],
      },
      { from: "user", text: "静止时可见，写字或拿筷子时更明显。", chosen: "静止时明显，动作时减轻" },
      {
        from: "ai",
        text: "请问患者是否接受过眼科裂隙灯检查？角膜周围是否存在棕色色素环（K-F 环）？",
        reason: "K-F 环是 Wilson Disease 神经型的标志性体征，特异性 > 95%，阳性可大幅提升诊断权重。",
        choices: ["已查，报告阳性 / 疑似阳性", "已查，报告阴性", "尚未检查", "不详"],
        refs: [{ n: 1, label: "EASL Guidelines 2012" }],
      },
      { from: "user", text: "眼科看过，报告写疑似 K-F 环。", chosen: "已查，报告阳性 / 疑似阳性" },
    ],
    suggestions: [
      "是否伴有情绪或行为改变？",
      "家族中是否有不明原因肝病史？",
      "既往肝功能检查的具体数值？",
    ],
  },
  stage2: {
    extracted: [
      { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
      { id: "HP:0001260", label: "构音障碍",            source: "AI 提取" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
      { id: "HP:0200136", label: "Kayser-Fleischer 环",  source: "医生补充" },
      { id: "HP:0002172", label: "伸展肢体僵硬",        source: "AI 提取" },
      { id: "HP:0000718", label: "攻击行为" },
    ],
  },
  stage3: {
    startedAt: "2025-01-15 10:04:22",
    steps: [
      { key: "plan",     label: "构建方案",              status: "done",    meta: "已加载 3 项诊断策略",                      t: "00:03" },
      { key: "evidence", label: "证据检索",              status: "done",    meta: "命中 128 篇相关文献 · 92 条临床指南",      t: "00:21" },
      { key: "round1",   label: "第 1 轮诊断 · 初步 + 鉴别", status: "done", meta: "生成 12 个候选, 收敛至 7 个",           t: "00:58" },
      { key: "round2",   label: "第 2 轮诊断 · 初步 + 鉴别", status: "done", meta: "引入实验室线索, 收敛至 5 个",           t: "01:44" },
      { key: "round3",   label: "第 3 轮诊断 · 初步 + 鉴别", status: "running", meta: "正在比对 K-F 环 + 铜代谢证据 · 17 / 24 已处理", t: "02:36" },
      { key: "final",    label: "最终诊断",              status: "queue",   meta: "等待第 3 轮收敛",                          t: "—" },
    ],
    liveLog: [
      { t: "02:28", text: "匹配 OMIM:277900 Wilson Disease — Leipzig 评分 6/8" },
      { t: "02:30", text: "排除 OMIM:128230 Dopa-Responsive Dystonia — 无日间波动" },
      { t: "02:33", text: "调用 HPO 本体 v2024-10, 计算语义相似度 (Resnik)" },
      { t: "02:36", text: "K-F 环阳性 → Wilson Disease 权重 +0.18" },
    ],
  },
}

export const VCF_RUNNING = {
  startedAt: "2025-01-15 10:08",
  steps: [
    { key: "qc",        label: "质控筛查",     status: "done",    meta: "通过率 98.2%",                          t: "00:18" },
    { key: "anno",      label: "变异注释",      status: "done",    meta: "共注释 48,923 个变异位点",              t: "01:12" },
    { key: "filter",    label: "变异过滤",      status: "done",    meta: "已过滤出 214 条高质量数据",             t: "00:34" },
    { key: "interp",    label: "变异解读",      status: "running", meta: "正在解读候选变异 · 7 / 9 已处理",      t: "02:41" },
    { key: "acmg",      label: "ACMG 评分",     status: "queue",   meta: "基于 ACMG 评分体系分析",               t: "—" },
    { key: "predict",   label: "预测工具分析",  status: "queue",   meta: "外部预测工具分析",                      t: "—" },
    { key: "interpdone",label: "解读完成",      status: "queue",   meta: "变异解读完成",                          t: "—" },
    { key: "report",    label: "报告生成",      status: "queue",   meta: "报告生成中",                            t: "—" },
  ],
}

export const VCF_RESULT = {
  completedAt: "2025-01-14 21:18",
  summary: { total: 48923, filtered: 214, path: 2, likelyPath: 1, vus: 6 },
  steps: [
    { label: "测序深度 DP", value: "112×" },
    { label: "基因型质量(GQ)",  value: "99" },
    { label: "家系来源",    value:"新发" },
    { label: "变异导入",       value: "48,923"},
    { label: "过滤",           value: "214"},
    { label: "候选(AR/AD 匹配 HPO)",           value: "9"},
    { label: "致病 / 可能致病", value: "3"},
  ],
  primary: [
    {
      id: "v1", acmg: "P", gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,932,872",
      transcript: "NM_000053.4", cdna: "c.2333G>T", protein: "p.Arg778Leu",
      type: "missense", rsid: "rs28942074", zygosity: "het",
      ad: "48 / 92 (0.52)", sift: "0.00 D", polyphen: "1.00 D", cadd: "32",
      criteria: [
        { type: "可能致病", code: "PS1", hit: true,  text: "同一氨基酸变化已有致病报告 (c.2333G>A)", weight: 2, ref: "[1,2]" },
        { type: "可能致病", code: "PM1", hit: true,  text: "位于跨膜域 TM4 (功能关键区)", weight: 1,           ref: "[1]" },
        { type: "可能致病", code: "PM2", hit: true,  text: "gnomAD 频率 0.0008% (极罕见)", weight: 1,          ref: "gnomAD v3.1" },
        { type: "可能致病", code: "PM5", hit: true,  text: "同位点其他错义变异已致病 p.Arg778Gln", weight: 1,  ref: "[2]" },
        { type: "可能致病", code: "PP3", hit: true,  text: "多工具预测有害 (SIFT/PolyPhen/CADD)", weight: 1,   ref: "SIFT / PolyPhen-2 / CADD" },
        { type: "良性证据",  code: "BS1", hit: false, text: "等位基因频率未超过疾病预期阈值 (gnomAD AF 0.0002%, Wilson 病携带率约 1/90)", weight: -2, ref: "gnomAD v3.1" },
      ],
      predictions: [
        { tool: "SIFT",       score: "0.00",  label: "Deleterious" },
        { tool: "PolyPhen-2", score: "1.000", label: "Probably damaging" },
        { tool: "CADD",       score: "32",    label: "Top 0.1%" },
        { tool: "REVEL",      score: "0.89",  label: "High pathogenicity" },
        { tool: "SpliceAI",   score: "0.02",  label: "No splicing impact" },
      ],
      databases: [
        { name: "rsID",    value: "rs540",                      url: "https://www.ncbi.nlm.nih.gov/snp/rs540" },
        { name: "ClinVar", value: "NM_000053.4:c.4396T>C",      url: "https://www.ncbi.nlm.nih.gov/clinvar/" },
        { name: "ClinGen", value: "ATP7B",                      url: "https://clinicalgenome.org/gene/ATP7B/" },
        { name: "gnomAD",  value: "ATP7B",                      url: "https://gnomad.broadinstitute.org/gene/ATP7B" },
        { name: "GeneBe",  value: "NM_000053.4:c.4396T>C",      url: "https://genebe.net/" },
      ],
      literature: [
        { n: 1, text: "Thomas GR et al. The Wilson disease gene: spectrum of mutations. Nat Genet. 1995;9(2):210-217. (p.Arg778Leu 为东亚最常见突变, 频率 ~30%)" },
        { n: 2, text: "Gu YH et al. ATP7B gene mutations in 29 families with Wilson's disease. J Hum Genet. 2003;48(7):345-353." },
      ],
      geneInfo: "ATP7B 编码铜转运 P 型 ATP 酶, 主要在肝细胞表达, 负责将铜整合到铜蓝蛋白并排入胆汁。功能缺失导致肝、脑铜沉积。",
      synthesis: "ATP7B（13q14.3）编码铜转运 P 型 ATP 酶（Wilson 蛋白），是肝细胞铜稳态的核心调控蛋白。该蛋白含 8 个跨膜结构域与 6 个 CXXC 铜结合基序，在肝细胞反式高尔基网络中负责将铜整合至铜蓝蛋白前体并经胆汁途径排泄多余铜；任何功能缺失均导致铜在肝脏、基底节及角膜进行性蓄积，最终引发多器官损伤。\n\n本例检出 ATP7B 复合杂合突变：c.2333G>T (p.Arg778Leu) 位于跨膜域 TM4，为东亚人群最常见致病等位基因（文献报道携带频率约 30%），体外功能实验证实其铜转运 ATP 酶活性完全丧失；c.3443T>C (p.Ile1148Thr) 位于跨膜域 TM6，在 gnomAD 中极罕见（AF < 0.0001%），功能研究显示 ATP 酶活性较野生型显著下降（残余活性 < 15%）。两个等位基因均由 ACMG/AMP 指南独立评级为致病性变异。\n\n复合杂合模式符合常染色体隐性遗传（OMIM:277900）：患者分别自父母各继承一个失功能等位基因，导致肝脏铜清除能力全面丧失。结合患者临床三联征（构音障碍、肝酶升高、Kayser-Fleischer 环阳性）及本次 HPO 推理结果（Wilson Disease Top 1，匹配率 92.4%，置信度 94/100），基因诊断与临床表现高度吻合，可确诊 Wilson 病。\n\n综合 ACMG 积分 +6 分（PS1 + PM1 + PM2 + PM5 + PP3，达致病性阈值 ≥6），本变异组合综合评级为致病性（Pathogenic）。建议立即检测铜蓝蛋白（预期 < 0.1 g/L）及 24 小时尿铜（预期 > 100 μg/d），并进行肝活检铜定量以评估肝脏受累程度；随后启动 D-青霉胺或曲恩汀驱铜治疗方案。同时建议对患者一级亲属进行 ATP7B 基因携带者筛查。",
      disease: {
        nameCn: "肝豆状核变性",
        nameEn: "Wilson Disease",
        inherit: "AR",
        omim: "OMIM:277900",
        orpha: "ORPHA:905",
        description: "ATP7B 基因功能缺失突变导致铜转运 P 型 ATP 酶活性丧失，肝脏无法将铜排入胆汁，铜大量蓄积于肝、脑、角膜及肾脏。常染色体隐性遗传，全球发病率约 1/30,000，多于 5–35 岁起病，儿童期以肝脏受累为主，青少年期后神经精神症状渐显。",
        features: ["肝病变 / 肝硬化", "神经精神症状", "Kayser-Fleischer 环", "溶血性贫血", "肾小管功能障碍", "构音障碍 / 震颤", "骨质疏松"],
        refs: [
          { n: 1, text: "EASL Clinical Practice Guidelines: Wilson's Disease. J Hepatol. 2012;56(3):671-685." },
          { n: 2, text: "Roberts EA, Schilsky ML. Diagnosis and treatment of Wilson disease. Hepatology. 2008;47(6):2089-2111." },
        ],
      },
      popFreq: [
        { db: "gnomAD 全体",       af: "0.0002" },
        { db: "gnomAD Popmax",     af: "0.0002" },
        { db: "gnomAD 男性",        af: "0.0002" },
        { db: "gnomAD 女性",        af: "0.0003" },
        { db: "gnomAD Controls",   af: "0.0002" },
        { db: "gnomAD 非神经系统",  af: "0.0001" },
        { db: "gnomAD 非 TOPMed",  af: "0.0002" },
        { db: "千人基因组",          af: 0.000199681002413854 },
      ],
    },
    { id: "v2", acmg: "P",  gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,938,049", transcript: "NM_000053.4", cdna: "c.3443T>C", protein: "p.Ile1148Thr", type: "missense", rsid: "rs121907998", zygosity: "het", ad: "52 / 104 (0.50)", sift: "0.00 D", polyphen: "0.98 D", cadd: "29" },
    { id: "v3", acmg: "LP", gene: "ATP7B", chrom: "13q14.3", pos: "chr13:51,934,461", transcript: "NM_000053.4", cdna: "c.2621C>T", protein: "p.Ala874Val",  type: "missense", rsid: "rs201038679", zygosity: "het", ad: "41 / 82 (0.50)",  sift: "0.01 D", polyphen: "0.94 D", cadd: "26" },
    { id: "v4", acmg: "VUS",gene: "COMMD1",chrom: "2p15",    pos: "chr2:62,136,780",  transcript: "NM_152516.4", cdna: "c.158A>G",  protein: "p.Gln53Arg",   type: "missense", rsid: "rs773891",    zygosity: "het", ad: "30 / 71 (0.42)",  sift: "0.12 T", polyphen: "0.45 B", cadd: "18" },
  ],
  secondary: [
    { id: "s1", acmg: "LP",  gene: "MYBPC3", chrom: "11p11.2", pos: "chr11:47,354,220", transcript: "NM_000256.3", cdna: "c.1504C>T", protein: "p.Arg502Trp", type: "missense", rsid: "rs397515963", zygosity: "het", ad: "37 / 78 (0.47)", sift: "0.00 D", polyphen: "0.99 D", cadd: "28" },
    { id: "s2", acmg: "VUS", gene: "BRCA2",  chrom: "13q13.1", pos: "chr13:32,340,200", transcript: "NM_000059.4", cdna: "c.5909C>G", protein: "p.Ala1970Gly", type: "missense", rsid: "—", zygosity: "het", ad: "29 / 60 (0.48)", sift: "0.08 T", polyphen: "0.62 P", cadd: "22" },
  ],
  other: [
    { id: "o1", acmg: "LB", gene: "APOE",  chrom: "19q13.32", pos: "chr19:44,908,684", transcript: "NM_000041.4", cdna: "c.388T>C", protein: "p.Cys130Arg", type: "missense", rsid: "rs429358",  zygosity: "het", ad: "55 / 108 (0.51)", sift: "0.34 T", polyphen: "0.12 B", cadd: "14" },
    { id: "o2", acmg: "B",  gene: "MTHFR", chrom: "1p36.22",  pos: "chr1:11,856,378",  transcript: "NM_005957.5", cdna: "c.665C>T", protein: "p.Ala222Val",  type: "missense", rsid: "rs1801133", zygosity: "hom", ad: "86 / 88 (0.98)", sift: "0.52 T", polyphen: "0.08 B", cadd: "11" },
  ],
}

export const TASK_MAP = {
  'P-2024-0317': [
    { id:'H-007', type:'VCF', time:'2025-01-14 20:36', result:'ATP7B 复合杂合 (c.2333G>T / c.3443T>C)，确诊 Wilson Disease', status:'done' },
    { id:'H-006', type:'HPO', time:'2024-11-21 16:38', result:'Top 1 Wilson Disease 匹配 92.4%，置信度 94%', status:'done' },
    { id:'H-005', type:'HPO', time:'2024-10-08 11:02', result:'Top 1 Juvenile Huntington Disease 61%，建议补充 K-F 环检查', status:'done' },
    { id:'H-004', type:'VCF', time:'2024-09-12 14:22', result:'VCF 文件 chromosome 命名不匹配，已终止', status:'failed' },
    { id:'H-003', type:'HPO', time:'2024-09-02 09:18', result:'提示铜代谢障碍，建议完善铜蓝蛋白检查', status:'done' },
  ],
  'P-2024-0298': [
    { id:'H-021', type:'HPO', time:'2025-01-08 14:20', result:'Top 1 Down Syndrome 匹配 84.2%，置信度 89%', status:'done' },
  ],
  'P-2025-0011': [
    { id:'H-031', type:'HPO', time:'2025-01-15 10:05', result:'AI 推理进行中...', status:'running' },
    { id:'H-030', type:'VCF', time:'2025-01-10 09:22', result:'变异筛选完成，候选基因 3 个', status:'done' },
  ],
  'P-2024-0256': [
    { id:'H-042', type:'VCF', time:'2024-12-28 16:44', result:'FBN1 致病变异 (p.Cys1663Ser)，确诊 Marfan Syndrome', status:'done' },
    { id:'H-041', type:'HPO', time:'2024-11-15 11:30', result:'Top 1 Marfan Syndrome 匹配 88.6%', status:'done' },
  ],
  'P-2024-0244': [
    { id:'H-051', type:'HPO', time:'2024-12-02 09:15', result:'Top 1 Duchenne 肌营养不良 匹配 76.3%，待复核', status:'done' },
  ],
  'P-2024-0211': [
    { id:'H-062', type:'VCF', time:'2024-11-09 20:11', result:'HMBS 致病变异，确诊急性间歇性血卟啉病', status:'done' },
    { id:'H-061', type:'HPO', time:'2024-09-30 13:45', result:'Top 1 急性间歇性血卟啉病 匹配 81.5%', status:'done' },
  ],
  'P-2025-0018': [
    { id:'H-071', type:'HPO', time:'2025-01-15 08:30', result:'AI 推理进行中...', status:'running' },
  ],
  'P-2024-0189': [
    { id:'H-082', type:'VCF', time:'2024-10-15 17:22', result:'RPGR 致病变异，确诊 X 染色体连锁视网膜色素变性', status:'done' },
    { id:'H-081', type:'HPO', time:'2024-08-11 10:30', result:'Top 1 视网膜色素变性 匹配 91.2%', status:'done' },
  ],
  'P-2024-0167': [
    { id:'H-091', type:'HPO', time:'2024-09-21 14:05', result:'Top 1 成骨不全症 Type I 匹配 86.7%', status:'done' },
  ],
  'P-2024-0144': [
    { id:'H-101', type:'HPO', time:'2024-08-18 10:22', result:'HPO 表型信息不足，无法完成诊断', status:'failed' },
  ],
}

export const HISTORY = [
  { id: "H-007", type: "VCF", startedAt: "2025-01-14 20:36", duration: "42 分 18 秒", status: "done",    summary: "ATP7B 复合杂合 (c.2333G>T / c.3443T>C), 确诊 Wilson Disease" },
  { id: "H-006", type: "HPO", startedAt: "2024-11-21 16:38", duration: "4 分 12 秒",  status: "done",    summary: "Top 1 Wilson Disease 匹配度 92.4%, 置信度 94/100" },
  { id: "H-005", type: "HPO", startedAt: "2024-10-08 11:02", duration: "3 分 48 秒",  status: "done",    summary: "Top 1 Juvenile HD 61%, 建议补充 K-F 环检查" },
  { id: "H-004", type: "VCF", startedAt: "2024-09-12 14:22", duration: "—",           status: "failed",  summary: "VCF 文件 chromosome 命名不匹配, 已终止" },
  { id: "H-003", type: "HPO", startedAt: "2024-09-02 09:18", duration: "2 分 51 秒",  status: "done",    summary: "初诊提示铜代谢障碍, 建议完善铜蓝蛋白检查" },
  { id: "H-002", type: "HPO", startedAt: "2024-08-15 15:44", duration: "—",           status: "running", summary: "由医生手动终止" },
]

export const PATIENT_VERSIONS = [
  {
    v: 3,
    date: "2025-01-14",
    updatedBy: "主治医师 王磊",
    changeNote: "补充 K-F 环及实验室指标 HPO，发起 VCF 基因诊断",
    hpoTerms: [
      { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
      { id: "HP:0001260", label: "构音障碍" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
      { id: "HP:0200136", label: "Kayser-Fleischer 环" },
      { id: "HP:0002172", label: "伸展肢体僵硬" },
      { id: "HP:0000718", label: "攻击行为" },
    ],
    hpoAnalyses: [
      { id: "H-006", date: "2024-11-21 16:38", status: "done",   top1: "Wilson Disease",           match: 92.4, conf: 94 },
    ],
    vcfAnalyses: [
      { id: "H-007", date: "2025-01-14 20:36", status: "done",   result: "ATP7B 复合杂合 (c.2333G>T / c.3443T>C) · 确诊 Wilson Disease" },
      { id: "H-004", date: "2024-09-12 14:22", status: "failed", result: "VCF 文件 chromosome 命名不匹配，已终止" },
    ],
  },
  {
    v: 2,
    date: "2024-10-08",
    updatedBy: "主治医师 王磊",
    changeNote: "追加震颤、肢体僵硬等 HPO，补充眼科待查",
    hpoTerms: [
      { id: "HP:0001300", label: "锥体外系症状 (震颤)" },
      { id: "HP:0001260", label: "构音障碍" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
      { id: "HP:0002172", label: "伸展肢体僵硬" },
    ],
    hpoAnalyses: [
      { id: "H-005", date: "2024-10-08 11:02", status: "done",   top1: "Juvenile Huntington Disease", match: 61.0, conf: 58 },
    ],
    vcfAnalyses: [],
  },
  {
    v: 1,
    date: "2024-09-02",
    updatedBy: "主治医师 王磊",
    changeNote: "患者初次录入档案",
    hpoTerms: [
      { id: "HP:0001260", label: "构音障碍" },
      { id: "HP:0001397", label: "肝脂肪变性 / 肝酶升高" },
    ],
    hpoAnalyses: [
      { id: "H-003", date: "2024-09-02 09:18", status: "done",   top1: "铜代谢障碍相关疾病",             match: 74.0, conf: 68 },
      { id: "H-002", date: "2024-08-15 15:44", status: "failed", top1: "—",                              match: null,  conf: null },
    ],
    vcfAnalyses: [],
  },
]
