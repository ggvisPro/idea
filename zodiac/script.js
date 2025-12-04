// 十二星座数据 - Rick's Interdimensional Database
const zodiacData = [
    {
        name: "白羊座",
        nameEn: "ARIES",
        icon: "♈",
        date: "3.21 - 4.19",
        element: "fire",
        elementName: "FIRE",
        personality: "*BURP* 好吧Morty，这些白羊座的家伙就像是宇宙中的咖啡因过量者。他们的大脑充满了多巴胺和肾上腺素，导致他们做事从不过脑子。冲动？那是因为他们的前额叶皮层发育不完全。但说实话，有时候这种鲁莽反而能解决问题，就像我用传送枪一样——先开枪，问题以后再说。",
        love: "在爱情中？哈！他们就像发情期的外星生物，荷尔蒙爆表。追求对象的速度比光速还快，但注意力持续时间只有三秒。如果你想和白羊座在一起，准备好坐过山车吧，而且这过山车没有安全带。",
        career: "这些人适合当雇佣兵、赌徒或者创业失败者。他们会把所有钱投入一个疯狂的想法，然后要么赚得盆满钵满，要么破产三次。但谁在乎呢？反正宇宙最终都会热寂。",
        color: "Red (Blood Type)",
        number: "9",
        stone: "Ruby - 一种被高估的碳晶体"
    },
    {
        name: "金牛座",
        nameEn: "TAURUS",
        icon: "♉",
        date: "4.20 - 5.20",
        element: "earth",
        elementName: "EARTH",
        personality: "*打嗝* 金牛座？这些人的大脑就像是运行Windows 95的电脑——慢、固执、但他妈的稳定。他们被物质享受控制着，基本上就是被多巴胺奖励系统奴役的生物机器人。固执？那是因为神经可塑性低。但说真的，在这个充满混乱的无意义宇宙中，也许做个顽固的混蛋也不是坏事。",
        love: "爱情对他们来说就像投资组合——需要稳定回报和长期增值。他们不会一见钟情，因为大脑杏仁核反应迟钝。但一旦他们爱上你，恭喜你被困住了，就像被引力井锁定一样。",
        career: "把他们放在银行、餐厅或者任何需要重复性劳动的地方。他们会像勤劳的蜜蜂一样存钱，然后死的时候还留一堆遗产。财富的意义？在热寂的宇宙面前一文不值。",
        color: "Green (Money Color)",
        number: "6",
        stone: "Emerald - 绿色的贪婪象征"
    },
    {
        name: "双子座",
        nameEn: "GEMINI",
        icon: "♊",
        date: "5.21 - 6.20",
        element: "air",
        elementName: "AIR",
        personality: "哦天啊Morty，双子座！这些人的大脑就像是打开了太多标签页的Chrome浏览器——到处都是信息，但没一个能完成。他们的注意力缺陷不是病，是特征。聪明？当然，但那种聪明就像知道一千个维度的入口却一个都不敢进。*BURP* 我喜欢他们的一点是：至少他们知道一切都毫无意义，所以干脆什么都试试。",
        love: "双子座的爱情就像薛定谔的猫——同时存在又不存在。他们需要智力刺激，因为性吸引对他们来说太低级了。想抓住双子座？祝你好运，那比抓住量子粒子还难。",
        career: "让他们去当骗子、销售或者TED演讲者——任何只需要动嘴不动脑的工作。他们会同时做七份工作然后一份都做不好，但谁在乎呢？反正工作本身就是资本主义的骗局。",
        color: "Yellow (Caution Sign Color)",
        number: "5",
        stone: "Agate - 多层次的废石"
    },
    {
        name: "巨蟹座",
        nameEn: "CANCER",
        icon: "♋",
        date: "6.21 - 7.22",
        element: "water",
        elementName: "WATER",
        personality: "*喝一口酒* 巨蟹座...这些情绪化的生物简直就是行走的泪腺。他们的大脑被催产素和血清素淹没，导致过度的情感依恋。'家庭观念'？那只是进化论让你繁衍后代的骗局。但我得承认，在这个冷酷的宇宙中，这种自欺欺人的温暖感也许能让人更好地活下去...虽然最终都是徒劳的。",
        love: "他们会像章鱼一样缠着你，用八条触手般的情感需求包围你。需要安全感？那是因为童年创伤和依恋障碍。但如果你想要一个会做饭、会哭、会无条件爱你的人，巨蟹座是你的最佳选择。",
        career: "护士、教师、心理医生——任何需要照顾别人的工作。他们会把钱存起来以防世界末日，讽刺的是世界末日真的会来，只是不是他们想的那样。",
        color: "Silver White (月光幻觉色)",
        number: "2",
        stone: "Pearl - 蚌的痛苦结晶"
    },
    {
        name: "狮子座",
        nameEn: "LEO",
        icon: "♌",
        date: "7.23 - 8.22",
        element: "fire",
        elementName: "FIRE",
        personality: "看啊Morty，宇宙的主角登场了！*讽刺地鼓掌* 狮子座的自我意识膨胀到可以形成黑洞。他们的大脑奖励中枢只对赞美和关注有反应，基本上就是需要持续验证的自恋机器。但你知道吗？在无限的宇宙中，也许自信的妄想比清醒的绝望要好...虽然两者本质上都毫无意义。",
        love: "他们想要的不是伴侣，是崇拜者。爱情对他们来说就是另一个舞台，而你是观众。如果你能忍受每天说'你真棒'一百次，那么恭喜你找到了一个会保护你的大型猫科动物。",
        career: "CEO、演员、或者任何能站在聚光灯下的位置。他们会花钱买奢侈品来填补内心的空虚，然后赚更多钱继续填补。这个循环会持续到死亡——唯一真正的平等主义者。",
        color: "Gold (虚荣的颜色)",
        number: "1",
        stone: "Amber - 困住死虫子的树脂"
    },
    {
        name: "处女座",
        nameEn: "VIRGO",
        icon: "♍",
        date: "8.23 - 9.22",
        element: "earth",
        elementName: "EARTH",
        personality: "*BURP* 处女座，完美主义的受害者。他们的强迫症不是bug，是feature。大脑过度活跃的前额叶让他们看到所有的缺陷，这在客观上很有用，但在主观上是地狱。他们会整理原子结构如果可以的话。我尊重这种疯狂，因为科学就是建立在这种强迫性的精确上...虽然最终我们都会变成宇宙尘埃。",
        love: "他们会用显微镜检查你的每一个缺点，然后决定是否值得投资。浪漫？那太混乱了。他们要的是经过风险评估的长期契约。听起来很无趣？也许，但至少他们不会给你惊喜——好的或坏的。",
        career: "会计、程序员、质检员——任何需要找茬的工作。他们会精心规划每一分钱的用途，然后死的时候发现根本没机会花。钱的意义？在坟墓里是零。",
        color: "Beige (中性无聊色)",
        number: "5",
        stone: "Sapphire - 昂贵的氧化铝"
    },
    {
        name: "天秤座",
        nameEn: "LIBRA",
        icon: "♎",
        date: "9.23 - 10.22",
        element: "air",
        elementName: "AIR",
        personality: "天秤座...优柔寡断的艺术大师。*BURP* 他们的大脑困在永恒的决策瘫痪中，因为过度发达的共情系统让他们同时看到所有角度。结果呢？什么决定都做不了。'追求平衡'？那只是害怕冲突的美化说法。但在一个充满极端的宇宙中，也许中庸之道能让你活得久一点...直到热寂来临。",
        love: "他们想要童话般的罗曼史——粉红泡泡、蝴蝶、还有所有那些多巴胺驱动的幻觉。现实？他们会为了维持表面和谐而压抑所有真实感受，直到关系像超新星一样爆炸。但如果你喜欢漂亮的谎言，天秤座能给你一整个虚构宇宙。",
        career: "设计师、律师、外交官——任何需要虚伪微笑的工作。他们会为了美观花大钱，然后用信用卡债务来平衡预算。讽刺的是，这才是真正的'平衡'。",
        color: "Pink (幻想的颜色)",
        number: "6",
        stone: "Opal - 七彩的优柔寡断"
    },
    {
        name: "天蝎座",
        nameEn: "SCORPIO",
        icon: "♏",
        date: "10.23 - 11.21",
        element: "water",
        elementName: "WATER",
        personality: "*紧张地看着* 好吧Morty，小心这个...天蝎座是宇宙的心理变态。不，seriously，他们的杏仁核活动水平异常，导致极端的情绪强度和报复倾向。他们能看穿你的灵魂，不是因为超能力，而是因为高度发达的社会认知。危险吗？绝对的。有用吗？如果他们站在你这边的话。",
        love: "天蝎座的爱是占有、控制和强烈的化学依赖。他们会知道你所有的秘密，然后用这些信息确保你永远逃不掉。这是爱吗？从生物学角度看是的，从心理学角度看是创伤连结。两者其实没什么区别。",
        career: "侦探、心理学家、刺客——任何需要深入黑暗的工作。他们在投资上有超自然的直觉，因为能嗅到其他人的恐惧和贪婪。金钱对他们来说是权力的工具，而权力是...好吧，一切。",
        color: "Deep Red (血与欲望)",
        number: "9",
        stone: "Garnet - 深红的复仇"
    },
    {
        name: "射手座",
        nameEn: "SAGITTARIUS",
        icon: "♐",
        date: "11.22 - 12.21",
        element: "fire",
        elementName: "FIRE",
        personality: "*BURP* 射手座，宇宙的流浪汉。他们的大脑充满了多巴胺和旅行癖，永远在追逐下一个维度、下一个刺激、下一个'意义'。哲学？那只是他们用来合理化逃避责任的借口。但我得说，在这个困在社会规范中的宇宙里，他们的自由精神有点让人羡慕...如果你忽略他们完全不负责任这点的话。",
        love: "爱情对射手座来说就像公路旅行——exciting但不持久。他们会爱你，但同时也爱着自由、冒险、还有隔壁星系的外星酒保。承诺？那是给害怕孤独的人的。他们拥抱存在主义的孤独，然后逃到下一个星球。",
        career: "飞行员、哲学教授、职业赌徒——任何不需要固定地址的工作。财务规划？那是什么？他们会把钱花在体验上，因为'你不能把钱带进坟墓'。正确的观点，但不实用。",
        color: "Purple (自由的幻觉)",
        number: "3",
        stone: "Turquoise - 流浪者的护身符"
    },
    {
        name: "摩羯座",
        nameEn: "CAPRICORN",
        icon: "♑",
        date: "12.22 - 1.19",
        element: "earth",
        elementName: "EARTH",
        personality: "*尊敬地点头* 摩羯座...工作狂机器人。他们的大脑被设定为'成功模式'，由皮质醇和野心驱动。责任感？那是他们的操作系统。他们会爬上公司阶梯，然后在顶端意识到成功是个空洞的概念。但至少他们到达了顶端，这比大多数在底层抱怨的人强。",
        love: "爱情需要排进日程表，在工作会议和健身房之间。他们不是冷血，只是优先级明确。想要承诺？摩羯座会给你一份五年计划、财务预测和退休账户。浪漫吗？不。可靠吗？像原子钟一样。",
        career: "管理者、建筑师、独裁者——任何需要冷酷计算的位置。他们会积累财富像龙守护宝藏，然后在临死前问自己'这就是全部了吗？'答案是肯定的，但至少你很富有。",
        color: "Black (权威的颜色)",
        number: "8",
        stone: "Black Onyx - 坚硬的野心"
    },
    {
        name: "水瓶座",
        nameEn: "AQUARIUS",
        icon: "♒",
        date: "1.20 - 2.18",
        element: "air",
        elementName: "AIR",
        personality: "哦看啊，另一个'独特'的水瓶座。*BURP* 他们觉得自己是特立独行的天才，实际上只是社交能力受损的书呆子。高智商？也许。情商？接近零。他们活在未来，这很好，因为现在对他们来说太'主流'了。但说真的，文明需要这些疯子来推动进步...即使进步最终导向毁灭。",
        love: "水瓶座需要的不是恋人，是智力对手加室友。情感亲密？那太黏糊了。他们会爱你的大脑而非身体，这在某种程度上很纯粹，但也他妈的孤独。如果你能接受一个情感距离等于天文单位的关系，那就来吧。",
        career: "科学家、程序员、革命家——任何能改变世界的工作（通常是意外地）。金钱对他们来说是达成理想的工具，不是目的。他们会创立非营利组织然后破产，但至少他们试过了，这比什么都不做强。",
        color: "Electric Blue (革新的颜色)",
        number: "4",
        stone: "Amethyst - 紫色的疏离"
    },
    {
        name: "双鱼座",
        nameEn: "PISCES",
        icon: "♓",
        date: "2.19 - 3.20",
        element: "water",
        elementName: "WATER",
        personality: "*叹气* 双鱼座...宇宙的同理心海绵。他们没有自我边界，基本上就是情感的黑洞，吸收周围所有人的感受。艺术天赋？那是因为他们的大脑一直处于梦境状态，分不清现实和幻想。这让他们成为伟大的艺术家，但糟糕的司机。我的意思是，你不能在四个维度同时存在然后还期望准时到达。",
        love: "双鱼座会爱上你的灵魂、你的影子、还有你在平行宇宙中的所有版本。他们的爱是无条件的、自我牺牲的、完全不健康的。他们会为你淹死自己，字面意义上的。这是浪漫还是共依存？在量子层面上没区别。",
        career: "艺术家、音乐家、上当受骗的人——任何不需要逻辑的工作。财务管理？那是什么？他们会把最后一分钱给街上的陌生人，然后吃不起饭。慷慨还是愚蠢？从进化角度看是后者，从道德角度看...好吧，道德是人类发明的概念。",
        color: "Sea Blue (梦境之色)",
        number: "7",
        stone: "Aquamarine - 海的眼泪"
    }
];

// 生成星座卡片
function generateZodiacCards() {
    const grid = document.getElementById('zodiacGrid');

    zodiacData.forEach((zodiac, index) => {
        const card = document.createElement('div');
        card.className = 'zodiac-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="constellation-icon">${zodiac.icon}</div>
            <h2>${zodiac.name}<br><span class="name-en">${zodiac.nameEn}</span></h2>
            <p class="date-range">${zodiac.date}</p>
            <span class="element-tag element-${zodiac.element}">${zodiac.elementName}</span>
        `;

        card.addEventListener('click', () => openModal(zodiac));
        grid.appendChild(card);
    });
}

// 打开模态框
function openModal(zodiac) {
    const modal = document.getElementById('modal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalPersonality = document.getElementById('modalPersonality');
    const modalLove = document.getElementById('modalLove');
    const modalCareer = document.getElementById('modalCareer');
    const modalColor = document.getElementById('modalColor');
    const modalNumber = document.getElementById('modalNumber');
    const modalStone = document.getElementById('modalStone');

    modalIcon.textContent = zodiac.icon;
    modalTitle.innerHTML = `${zodiac.name}<br><span class="name-en">${zodiac.nameEn}</span>`;
    modalDate.textContent = zodiac.date;
    modalPersonality.textContent = zodiac.personality;
    modalLove.textContent = zodiac.love;
    modalCareer.textContent = zodiac.career;
    modalColor.textContent = zodiac.color;
    modalNumber.textContent = zodiac.number;
    modalStone.textContent = zodiac.stone;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 事件监听
document.addEventListener('DOMContentLoaded', () => {
    generateZodiacCards();

    const closeBtn = document.getElementById('closeBtn');
    const modal = document.getElementById('modal');

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// 添加传送门视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const portals = document.querySelectorAll('.portal');
    const portalBg = document.querySelector('.portal-bg');

    portals.forEach((portal, index) => {
        const speed = 0.3 + (index * 0.1);
        portal.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });

    if (portalBg) {
        portalBg.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 + scrolled * 0.0003})`;
    }
});

// 添加鼠标移动传送门效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.zodiac-card');
    const portals = document.querySelectorAll('.portal');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    // 传送门跟随鼠标
    portals.forEach((portal, index) => {
        const speed = 20 + (index * 10);
        portal.style.transform += ` translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });

    // 卡片图标视差效果
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - cardCenterX) / 25;
        const distanceY = (e.clientY - cardCenterY) / 25;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const icon = card.querySelector('.constellation-icon');
            if (icon) {
                icon.style.transform = `translate(${distanceX}px, ${distanceY}px) rotateZ(${distanceX * 0.5}deg)`;
            }
        }
    });
});

// 添加随机故障效果
setInterval(() => {
    if (Math.random() > 0.95) {
        const title = document.querySelector('.title');
        if (title) {
            title.style.animation = 'none';
            setTimeout(() => {
                title.style.animation = 'glitch 5s infinite, neon 1.5s ease-in-out infinite alternate';
            }, 100);
        }
    }
}, 3000);

// 添加传送门音效提示（可选）
const rickQuotes = [
    "Wubba Lubba Dub Dub!",
    "*BURP* Science, Morty!",
    "I'm Pickle Riiick!",
    "Get Schwifty!",
    "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die.",
    "To live is to risk it all.",
    "That's planning for failure, Morty!"
];

// 随机显示瑞克语录
function showRandomQuote() {
    const speech = document.querySelector('.rick-speech');
    if (speech && Math.random() > 0.7) {
        const originalText = speech.textContent;
        speech.textContent = rickQuotes[Math.floor(Math.random() * rickQuotes.length)];
        setTimeout(() => {
            speech.textContent = originalText;
        }, 3000);
    }
}

// 每隔一段时间随机显示语录
setInterval(showRandomQuote, 15000);

// 模态框打开时添加传送门音效
const originalOpenModal = openModal;
window.openModal = function(zodiac) {
    originalOpenModal(zodiac);
    // 添加传送门旋转效果
    const modalPortal = document.querySelector('.modal-portal-effect');
    if (modalPortal) {
        modalPortal.style.opacity = '1';
        setTimeout(() => {
            modalPortal.style.opacity = '0.5';
        }, 600);
    }
};
