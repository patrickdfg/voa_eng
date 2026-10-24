/* Course title, translation and official VOA lesson paths from the course index. */
const COURSE_RAW = [
["Welcome!","환영해요!","lets-learn-english-lesson-one/3111026"],
["Hello, I'm Anna!","안녕, 나는 안나야!","lets-learn-english-lesson-2-hello/3113733"],
["I'm Here!","나 여기 있어요!","lets-learn-english-lesson-3-i-am-here/3126527"],
["What Is It?","그것은 무엇인가요?","lets-learn-english-lesson-4/3168920"],
["Where Are You?","어디에 있나요?","lets-learn-english-lesson-5-where-are-you/3168971"],
["Where Is the Gym?","체육관은 어디인가요?","lets-learn-english-lesson-6-where-is-the-gym/3225958"],
["What Are You Doing?","무엇을 하고 있나요?","lets-learn-english-lesson-7-what-are-you-doing/3240468"],
["Are You Busy?","바쁘세요?","lets-learn-english-lesson-8-are-you-busy/3253185"],
["Is It Cold?","날씨가 추운가요?","lets-learn-english-lesson-9-is-it-cold/3261789"],
["Come Over to My Place","우리 집에 놀러 오세요","lets-learn-english-lesson-10/3285228"],
["This Is My Neighborhood","여기가 우리 동네예요","lets-learn-english-lesson-11-this-is-my-neighborhood/3293986"],
["Meet My Family","우리 가족을 소개해요","lets-learn-english-lesson-12-meet-my-family/3301733"],
["Happy Birthday, William Shakespeare!","생일 축하해요, 윌리엄 셰익스피어!","lets-learn-english-lesson-13-happy-birthday-william-shakespeare/3312239"],
["How About This?","이건 어때요?","lets-learn-english-lesson-14-how-about-this/3323771"],
["I Love People-Watching!","사람들 구경하는 게 좋아요!","lets-learn-english-lesson-15-i-love-people-watching/3343720"],
["Where Are You From?","어디에서 왔나요?","lets-learn-english-lesson-16-where-are-you-from/3355849"],
["Are You Free on Friday?","금요일에 시간 있나요?","are-you-free-on-friday-lets-learn-english/3355785"],
["She Always Does That","그녀는 항상 그래요","lets-learn-english-lesson-18-she-always-does-that/3357748"],
["When Do I Start?","언제 시작하나요?","lets-learn-english-lesson-19-when-do-you-start/3357760"],
["What Can You Do?","무엇을 할 수 있나요?","lets-learn-english-lesson-20-what-can-you-do/3384429"],
["Can You Come to the Party?","파티에 올 수 있나요?","lets-learn-english-lesson-21-can-you-come-to-the-party/3406732"],
["Next Summer...","다음 여름에는…","lets-learn-english-lesson-22/3397314"],
["What Do You Want?","무엇을 원하나요?","lets-learn-english-lesson-23-what-do-you-want/3413753"],
["Yesterday Was Amazing!","어제는 정말 멋졌어요!","lets-learn-english-lesson-24-yesterday-was-amazing/3439164"],
["Watch Out!","조심하세요!","lets-learn-english-lesson-25-watch-out/3431138"],
["This Game Is Fun!","이 게임 재미있어요!","lets-learn-english-lesson-26-this-game-is-fun/3457248"],
["I Can't Come In","안으로 들어갈 수 없어요","lets-learn-english-lesson-27-i-cant-come-in/3457316"],
["I Passed It!","나 합격했어요!","lets-learn-english-lesson-28-i-passed-it/3487865"],
["A Long Time Ago","아주 오래전에","lets-learn-english-lesson-29-a-long-time-ago/3509519"],
["Rolling on the River","강을 따라 흘러가며","lets-learn-english-lesson-30-rolling-river/3522798"],
["Take Me Out to the Ball Game","야구장에 데려가 주세요","lets-learn-english-lesson-31-take-me-out-to-the-ball-game/3535235"],
["Welcome to the Treehouse!","나무 위 집에 오신 걸 환영해요!","lets-learn-english-lesson-32-welcome-treehouse/3547306"],
["Learning America's Sport","미국의 스포츠 배우기","lesson-33-learning-americas-sport/3555047"],
["What Will I Do?","나는 무엇을 하게 될까요?","lets-learn-english-lesson-34-what-will-i-do/3566043"],
["Let's Make Dinner!","저녁을 만들어요!","lets-learn-english-lesson-35-lets-make-dinner/3571922"],
["I Can Fix This!","이건 내가 고칠 수 있어요!","lets-learn-english-lesson-36-i-can-fix-this/3568962"],
["Let's Agree to Disagree","서로 의견이 다르다는 데 동의해요","lets-learn-english-lesson-37-lets-agree-to-disagree/3574029"],
["She's My Best Friend!","그녀는 내 가장 친한 친구예요!","lets-learn-english-lesson-38-shes-my-best-friend/3591967"],
["It's Unbelievable!","믿을 수 없어요!","lets-learn-english-lesson-39-its-unbelieveable/3598920"],
["The Woods Are Alive","숲이 살아 있어요","lets-learn-english-lesson-40-the-woods-are-alive/3630341"],
["Teamwork Works Best With a Team","팀이 함께할 때 협력이 빛나요","lets-learn-english-lesson-41-teamwork/3635015"],
["I Was Minding My Own Business","나는 내 일에만 신경 쓰고 있었어요","lets-learn-english-lesson-42-i-was-minding-my-own-business/3647264"],
["Time for Plan B","다른 계획을 세울 때예요","lets-learn-english-lesson-43-time-for-plan-b/3666458"],
["Making Healthy Choices","건강한 선택하기","lets-learn-english-lesson-44-making-healthy-choices/3688552"],
["This Land is Your Land","이 땅은 여러분의 땅이에요","lesson-45-this-land-is-your-land/3710209"],
["May I Borrow That?","그거 빌려도 될까요?","lets-learn-english-lesson-46-may-i-borrow-that/3723588"],
["How Can I Help?","제가 어떻게 도와드릴까요?","lets-learn-english-lesson-47-how-can-i-help/3737352"],
["Have You Ever ...?","…해 본 적 있나요?","lets-learn-english-lesson-48-have-you-ever/3753664"],
["Operation Spy!","스파이 작전!","lets-learn-english-lesson-49-operation-spy/3763537"],
["Back to School","다시 학교로","lets-learn-english-lesson-50-back-to-school/3771173"],
["A Good Habit","좋은 습관","lets-learn-english-lesson-51-a-good-habit/3773577"],
["Taking Chances","기회를 잡기","lets-learn-english-lesson-52-taking-chances/3805454"]
];

const TOPICS = ["인사와 소개","첫 만남","전화와 위치","물건과 이름","위치 묻기","길 찾기","현재 진행","일상 대화","날씨","초대하기","동네 소개","가족 이야기","축하 인사","선택과 제안","취미 표현","출신지","약속 잡기","습관 표현","시작과 일정","할 수 있는 일","초대와 약속","미래 계획","원하는 것","과거 경험","위험과 주의","놀이와 규칙","허락과 출입","결과와 성취","과거 이야기","이동과 여행","야구와 응원","장소 소개","스포츠","미래 선택","요리하기","문제 해결","의견 나누기","친구 관계","놀라움 표현","자연 이야기","팀워크","과거 진행","대안 세우기","건강한 생활","우리의 땅","빌리기와 허락","도움 요청","경험 묻기","비밀 작전","학교생활","좋은 습관","새로운 도전"];

const LESSONS = COURSE_RAW.map((row, i) => ({
  id:i+1,title:row[0],translation:row[1],url:"https://learningenglish.voanews.com/a/"+row[2]+".html",
  topic:TOPICS[i],unit:Math.floor(i/10)+1
}));

const RESOURCES = {
  index:"https://learningenglish.voanews.com/p/5644.html",
  teacher:"https://learningenglish.voanews.com/a/6220041.html",
  worksheets:["https://learningenglish.voanews.com/a/5273645.html","https://learningenglish.voanews.com/a/5273677.html"]
};
