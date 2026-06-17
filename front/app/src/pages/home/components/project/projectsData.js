import finalThumb from "../../../../assets/images/펫앤아이포스토어캡쳐.png";

export const projects = [
  {
    id: "semi",
    type: "SEMI PROJECT",
    title: "사내 ERP 시스템",
    subtitle: "직원·부서관리, 근태, 급여, 인건비 흐름을 연결한 ERP 프로그램",
    period: "2026.02 - 2026.03",
    role: "DB 관리자 · 인적관리 도메인 풀스택 담당",
    summary:
      "사원 정보, 근태 기록, 급여 계산, 인건비 산정 흐름을 연결하여 관리자가 인사 데이터를 효율적으로 관리할 수 있도록 구현한 세미 프로젝트입니다.",
    thumbnail: null,
    colorText: "ERP",
    stack: [
      "Java",
      "JSP & Servlet",
      "MyBatis",
      "Oracle",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Notion", href: "#" },
    ],
    detail: {
      overview:
        "ERP 인적관리 시스템은 기업 내부의 사원 정보와 근태 데이터를 기반으로 급여와 인건비를 계산하는 관리 프로그램입니다. 단순한 CRUD를 넘어서 근태 데이터가 급여 계산으로 이어지고, 그 결과가 인건비 산정에 반영되는 흐름을 구현하는 데 집중했습니다.",
      roles: [
        "사원 정보 관리 기능 구현",
        "근태 등록 및 조회 기능 구현",
        "급여 계산 로직 구현",
        "DB 테이블 설계 및 관계 정리",
        "인적관리 도메인 화면 및 서버 로직 구현",
      ],
      features: [
        "사원 등록, 수정, 조회",
        "근태 기록 관리",
        "근태 기반 급여 계산",
        "부서별 인건비 산정",
        "관리자용 데이터 조회 화면",
      ],
      troubles: [
        "근태 데이터와 급여 데이터의 연결 기준을 명확히 분리",
        "계산 로직이 화면에 종속되지 않도록 서버 로직으로 분리",
        "여러 도메인과 연결되는 DB 관계를 정리하여 데이터 흐름 안정화",
      ],
    },
  },
  {
    id: "final",
    type: "FINAL PROJECT",
    title: "PET&I FOR",
    subtitle: "반려동물 건강관리 통합 서비스",
    period: "2026.06 - 2026.06",
    role: "스토어 도메인 백엔드/프론트엔드 전담",
    summary:
      "반려동물 건강진단, 커뮤니티, 스토어 기능을 하나의 서비스 흐름으로 구성한 파이널 프로젝트입니다. 저는 스토어 도메인의 상품, 장바구니, 주문, 결제, 리뷰 기능을 담당했습니다.",
    thumbnail: finalThumb,
    colorText: "PET",
    stack: [
      "React",
      "Spring Boot",
      "Spring Security",
      "JPA",
      "PostgreSQL",
      "AWS S3",
      "KakaoPay",
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Notion", href: "#" },
      { label: "Demo", href: "#" },
    ],
    detail: {
      overview:
        "PET&I FOR는 반려동물의 건강관리, 커뮤니티, 스토어 기능을 통합한 웹 서비스입니다. 사용자는 반려동물 정보를 등록하고, 건강진단을 신청하거나 커뮤니티에서 정보를 공유하고, 스토어에서 상품을 구매할 수 있습니다.",
      roles: [
        "스토어 상품 목록 및 상세 페이지 구현",
        "장바구니 등록, 수량 변경, 삭제 기능 구현",
        "주문서 작성 및 결제 흐름 구현",
        "카카오페이 결제 준비/승인 연동",
        "리뷰 작성, 수정, 삭제, 목록 조회 구현",
        "포인트 사용 결제 흐름 구현",
        "공통 Header/Nav/Footer UI 설계",
      ],
      features: [
        "상품 목록 및 카테고리 필터",
        "상품 상세 및 급여 기준 정보 표시",
        "장바구니 및 바로구매 흐름",
        "카카오페이 결제 승인",
        "포인트 사용 결제",
        "리뷰 작성/수정/삭제",
        "AWS S3 이미지 업로드 및 URL 처리",
      ],
      troubles: [
        "장바구니 주문과 바로구매 주문의 데이터 흐름 분리",
        "카카오페이 결제 승인 후 주문 생성 시점 정리",
        "배포 환경에서 이미지 URL이 정상 표시되지 않는 문제 해결",
        "undefined length 오류 방지를 위한 초기값 및 조건부 렌더링 처리",
        "프론트 라우팅과 배포 환경 새로고침 문제 점검",
      ],
    },
  },
];
