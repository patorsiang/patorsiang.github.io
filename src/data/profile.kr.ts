import { Data } from "./profile.d";

export const data: Data = {
  name: "나팥촐 타이파닟",
  nickname: "팥",
  position: "Software Developer",
  subtitle: `저는 기술과 데이터에 깊은 관심을 갖고 있습니다. 나는 새로운 것을 배우고 코드를 통해 나의 열정을 공유하고 싶습니다. 내 좌우명은 '누구든지 할 수 있다면 나도 할 수 있다'이다. 나의 할아버지는 이 교훈을 어머니와 나에게 물려주셨고, 그 교훈은 그 이후로 계속해서 나에게 남아 있습니다. 나는 코딩 기술을 향상시키기 위해 매일 노력하는 것을 중요하게 생각합니다.
   <br/>
   <br/>
   저는 흥미로운 프로젝트를 찾고 있습니다. <b>"함께 놀라운 것을 만들어 보자!"</b>`,
  address:
    "432/38 Chapter One Midtown Condo Ladprao 24, Ladprao Road, Chomphon, 짜뚜짝, 방콕, 태국 10900",
  contact: {
    Tel: "(+66)0959390164",
    Email: {
      name: "napatchol.tha@gmail.com",
      opt: {
        link: "mailto:napatchol.tha@gmail.com?subject=%5Bpatorsiang%2Egithub%2Eio%5D 이력서의 정보를 보고 연락하세요.&body=성함%3D%3C당신의 성함을 입력하세요.%3E%0D%0A전화%3D%3C전화번호를 입력하세요.%3E%0D%0A세부 사항%3A%0D%0A",
        underline: true,
        color: 0x569cd6,
      },
    },
    LinkedIn: {
      name: "napatchol-thaipanich",
      opt: {
        link: "https://www.linkedin.com/in/napatchol-thaipanich",
        underline: true,
        color: 0x569cd6,
      },
    },
    Github: {
      name: "patorsiang",
      opt: {
        link: "https://github.com/patorsiang",
        underline: true,
        color: 0x569cd6,
      },
    },
  },
  info: {
    "교육 및 수상": [
      {
        date: "2015 - 2023",
        school: "법학부",
        university: "람캄행대학교",
        degree: "법학사(LL.B.)",
        // gpa: "2.8",
        favoriteSubjects: [
          // "KOR1001 - KOR2002 Fundamental Korean",
          // "LAW3003 Civil and Commercial Law: Family",
          // "LAW3009 Civil and Commercial Law: Succession",
          // "LAW4009 Law on Intellectual Property 1",
          // "LAW4010 International Trade Law",
          // "LAW4053 Law Related to Computer",
          "기초한국어",
          "민법 및 상법: 가족",
          "민법 및 상법: 승계",
          "지적재산권법 1",
          "국제무역법",
          "컴퓨터 관련 법률",
        ],
      },
      {
        date: "2022",
        name: "NCSA 및 HUAWEI가 선정한 2022년 태국 여성 사이버 최고 인재 • 상위 4위",
      },
      {
        date: "2020",
        name: "Botnoi Consulting의 CJE Hackathon 2020 1세대 • 상위 3위",
      },
      {
        date: "2015 - 2019",
        school: "정보통신기술학부",
        university: "마히돌대학교",
        degree: "과학 학사(B.Sc.)",
        major: "데이터베이스 및 지능형 시스템(DB)",
        gpa: "3.18",
        favoriteSubjects: [
          "웹 프로그래밍",
          "컴퓨터 조직 및 아키텍처",
          "데이터 구조 및 알고리즘 분석",
          "데이터베이스 관리 시스템",
          "정보 저장 및 검색",
          "데이터베이스 디자인",
          "인간-컴퓨터 인터페이스",
          "디지털 이미지 처리",
        ],
      },
      {
        date: "2013 - 2015",
        school: "카셋삳대학교 실험실 학교, 교육 연구 개발 센터",
        degree: "고등학교",
        major: "과학-수학",
      },
      {
        date: "2013",
        name: "왕립 호주 화학 연구소(Royal Australian Chemical Institute",
      },
    ],
    "업무 경험": [
      {
        date: "04/2023 - 현재의",
        title: "Frontend Developer",
        type: "Freelance",
        location: "방콕, 태국",
        description: [
          "클라이언트로부터 수집된 요구사항.",
          "클라이언트가 솔루션을 찾을 수 있도록 도왔습니다.",
          "분리된 작업과 각 작업에 대한 예상 시간.",
          "웹사이트를 코딩하고, 압축하고, 호스팅하고 유지관리했습니다.",
          "예: Pruxus: 웹사이트를 유지관리하고 있는 Data Wow Co., Ltd.: 클라이언트를 위한 대시보드를 구축했습니다.",
        ],
      },
      {
        date: "12/2021 - 04/2023",
        title: "Frontend Developer",
        type: "Full-time",
        company: "Data Wow Co., Ltd.",
        location: "방콕, 태국",
        description: [
          "PDPA(쿠키와우, PDPA Pro, PDPA Prokit, PDPA Learn 등) PDPA(개인정보보호법) 관련 웹사이트 개발",
          "기타 ((주)데이타와우 및 외부고객을 위한 대시보드, 보고서, 채팅스토리지(라인챗봇), 온라인 모의고사 플랫폼 등 홈페이지 개발)",
        ],
      },
      {
        date: "11/2019 - 11/2021",
        title: "System Analyst",
        type: "Full-time",
        company: "Bank of Thailand",
        location: "방콕, 태국",
        description: [
          "DLTBond: 우리는 블록체인(Hyperledger Fabric)을 사용하여 판매 대리인에게 은행에 할당량을 주지 않고 모든 사람에게 국채 구매 기회를 분배합니다. 나는 팀과 함께 시스템을 설계, 개발, 규제 및 감독합니다.",
          "ISO20022: 2025년 11월 결제 시스템의 핵심 핵심에 적용될 결제 메시징의 새로운 표준에는 태국도 포함되어 있으며, 이 표준도 변경되어야 합니다. 그래서 저는 BA의 요구 사항을 분석하고 계획을 개발하는 데 참여하고 있습니다. 팀과 함께 흐름을 테스트해 보세요.",
          "RPA: RPA는 로봇 프로세스 자동화를 의미합니다. 태국 은행도 RPA를 적용하여 일상적인 작업에 소요되는 시간을 줄이고 가치 작업에 사용할 시간을 갖습니다. 저는 프로세스 분석, 조정 및 개선에 참여하고 다음을 통해 흐름을 개발합니다. RPA 개발자로서의 UiPath.",
        ],
      },
      {
        date: "06/2019 - 08/2019",
        title: "Blockchain Developer, KBTG Develop Bootcamp 2019",
        type: "Internship",
        company: "Kasikorn Business Technology Group (KBTG)",
        location: "방콕, 태국",
        description: [
          "Time D(onation): 사회 문제를 해결하기 위해 블록체인을 사용하는 사례에 관한 것입니다. 이 프로젝트는 Stellar 블록체인을 사용하여 플랫폼에서 Time D 토큰을 생성하여 자원 봉사를 교환하고 자원 봉사를 추적하여 보상을 제공합니다. 팀과 함께 아이디어를 브레인스토밍하고, 디자인하고, 프로토타입을 개발하고 있습니다.",
        ],
      },
      {
        date: "06/2018 - 07/2018",
        title: "Frontend Developer",
        type: "Internship",
        company: "BeID Corporation Co., Ltd.",
        location: "방콕, 태국",
        description: ["React.JS의 대시보드 및 랜딩 페이지 개발 정보"],
      },
    ],
    "교과 외 활동": [
      {
        date: "2020 - 현재의",
        name: "Sec-Girl의 멤버이다",
        description: [
          "Sec-Girl은 지식을 공유하고 태국 여성이 사이버 보안 분야에서 일하도록 장려하기 위해 여성 사이버 보안 이해관계자가 포함된 커뮤니티입니다.",
          "공공 사이버 보안 워크숍 자원봉사에는 50~100명의 참가자가 참여하며 기본 지식이 있는 사람이라면 누구나 등록을 통해 참여할 수 있습니다.",
          "NCSA 및 HUAWEI가 주최하는 Women Thai Cyber Top Talent 2022 등 Sec-Girl을 대신하여 사이버 보안 대회에 참가했습니다.",
        ],
      },
      {
        date: "2023",
        name: "일반인 최종 8팀 중 1팀, Line Hack 2023 대회 참가로 선정",
      },
      {
        date: "2021",
        name: "제13회 일반국민 최종 30팀 중 '국왕 폐하께 최고의 통신·ICT 기술을 찾아드립니다' 대회 참가로 선정",
      },
      {
        date: "2018",
        name: 'Samut Sakhon Phatthana Mueang(사회적 기업) x MUICT의 "그룹 기업 웹사이트 디자인 공모전 활동" 참여',
      },
    ],
  },
  etc: {
    "Computer Skills": {
      Language:
        "Javascript, Python, HTML, Java, PHP, TypeScript, Go (Programming Language), CSS, Tailwind CSS, SQL",
      Framework:
        "React.js, Vue.js, Angular.js, TypeScript, Next.js, Node.js, Express.js, UiPath",
      Hosting:
        "AWS Amplify, IBM Cloud, Firebase, GCP (Google Cloud Platform), Microsoft Azure",
      Blockchain: "IBM Hyperledger Fabric, Stellar Blockchain",
      Database:
        "Redis, MongoDB, PostgreSQL, MSSQL, ER Diagram, Database Design",
      "Queue Management": "RabbitMQ",
    },
    언어: {
      영어: "IELTS: band 6; Listening: 6 Reading 5 Writing 6 Speaking 6",
      한국인: "TOPIK: level 1",
      태국어: "모국어",
    },
    Interests: [
      "법",
      "CTF(깃발 탈취)",
      "피아노",
      "촬영",
      "여행(마카오, 홍콩, 일본, 싱가포르 등의 경험)",
      "요리",
      "탁구",
      "배드민턴",
      "수영",
    ],
  },
  references: [
    {
      Title: "Asst. Prof. Dr.",
      Name: "Charnyote",
      Surname: "Pluempitiwiriyawej",
      Position: "ASSISTANT PROFESSOR",
      "Workplace Address": `Faculty of ICT, Mahidol University
999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
      "Contact Number": "+66 2 441 0909",
      "Email (Official)":
        "charnyote.plu@mahidol.ac.th; charnyote.plu@mahidol.edu",
    },

    {
      Title: "Dr.",
      Name: "Woraluck",
      Surname: "Wongse-ek",
      Position: "INSTRUCTOR",
      "Workplace Address": `Faculty of ICT, Mahidol University
999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
      "Contact Number": "+66 2 441 0909",
      "Email (Official)":
        "woraluck.won@mahidol.ac.th; woraluck.won@mahidol.edu",
    },
  ],
};
