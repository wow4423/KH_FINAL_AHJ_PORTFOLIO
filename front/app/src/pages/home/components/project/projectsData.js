import finalThumb from "../../../../assets/images/펫앤아이포스토어캡쳐.png";
import finalPreview01 from "../../../../assets/images/finalPrj/storePreview1.png";
import finalPreview02 from "../../../../assets/images/finalPrj/storePreview2.png";
import finalPreview04 from "../../../../assets/images/finalPrj/storePreview4.png";
import finalPreview05 from "../../../../assets/images/finalPrj/storePreview5.png";

export const projects = [
  {
    id: "semi",
    type: "SEMI PROJECT",
    title: "사내 ERP 시스템",
    subtitle: "직원·부서관리, 근태, 급여, 인건비 흐름을 연결한 ERP 프로그램",
    period: "2026.02 - 2026.03",
    role: "DB 관리자 · 인적관리 도메인 풀스택 담당",
    thumbnail: null,
    colorText: "ERP",
    stack: ["Java", "JSP & Servlet", "MyBatis", "Oracle", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Service", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    detail: {
      stats: [
        { value: "1개월", label: "개발 기간" },
        { value: "팀 프로젝트", label: "구성" },
        { value: "1인 전담", label: "인적관리 도메인" },
        { value: "DB 설계", label: "전체 DB 담당" },
      ],

      serviceDomains: [
        { name: "인적관리", mine: true },
        { name: "회계·급여", mine: false },
        { name: "전자결재", mine: false },
        { name: "공지·기타", mine: false },
      ],

      flowLine: ["사원", "근태", "급여", "인건비"],

      statement:
        "인적관리 도메인을 전담했습니다. 사원 데이터, 근태 기록, 급여 계산이 끊기지 않고 하나의 흐름으로 연결되도록 구조를 설계했습니다.",

      overview:
        "ERP 인적관리 시스템은 사원 정보와 근태 데이터를 기반으로 급여와 인건비를 계산하는 관리 프로그램입니다. 단순 CRUD를 넘어 근태 데이터가 급여 계산으로 이어지고, 그 결과가 인건비 산정에 반영되는 흐름을 구현하는 데 집중했습니다.",

      info: [
        { label: "개발 기간", value: "2026.02 - 2026.03" },
        { label: "구성원", value: "팀 프로젝트" },
        { label: "담당 영역", value: "인적관리 도메인" },
        { label: "담당 역할", value: "DB 관리자 · 풀스택 담당" },
      ],

      showcase: [
        {
          tag: "01",
          title: "사원 정보 관리",
          context:
            "사원 등록부터 부서 배정까지 인적관리 도메인의 핵심 데이터를 설계했습니다. 인사 데이터가 이후 근태·급여와 연결되는 구조를 염두에 두고 테이블 관계를 먼저 잡았습니다.",
          points: [
            "사원 등록 / 수정 / 조회 / 비활성화 CRUD",
            "부서 배정 및 직급 관리",
            "인사 데이터 → 근태 · 급여 연결 구조 설계",
          ],
          image: null,
          imageLabel: null,
          flip: false,
        },
        {
          tag: "02",
          title: "근태 기반 급여 계산",
          context:
            "근태 데이터가 급여 계산에 자동 반영되는 흐름을 설계했습니다. 초기에는 계산 로직이 JSP 화면에 섞여 있었는데, 유지보수와 재사용을 위해 서버 로직으로 분리했습니다.",
          points: [
            "월간 근태 집계 및 조회 화면 구현",
            "출결 데이터 기반 급여 자동 계산 로직 (서버 분리)",
            "급여 계산 결과 → 인건비 산정까지 연결",
          ],
          image: null,
          imageLabel: null,
          flip: true,
        },
      ],

      troubles: [
        {
          title: "근태 → 급여 데이터 연결 기준 설계",
          keyTerm: "도메인 경계 재설계",
          problem:
            "근태와 급여를 연결하는 기준이 불명확해 어느 쪽에서 계산을 주도해야 하는지, 어떤 컬럼을 외래키로 참조해야 하는지 모호한 상태였습니다. 도메인 경계가 뒤섞이면서 조회 쿼리도 복잡해졌습니다.",
          solution:
            "연결 기준을 명확히 정의하고 각 도메인이 독립적인 경계를 갖도록 DB 테이블 관계를 재설계했습니다. 이후 JOIN 범위가 줄고 쿼리가 단순해졌습니다.",
          codeSnippet:
`-- 재설계 후: Attendance는 근태만, Salary는 급여만 책임진다
-- Salary가 Attendance를 참조할 때는 emp_no + year + month로만
SELECT a.work_days, a.late_count, a.absent_count
  FROM ATTENDANCE a
 WHERE a.emp_no = #{empNo}
   AND a.att_year = #{year}
   AND a.att_month = #{month}
-- Salary 계산은 이 결과를 받아서 별도로 처리`,
        },
        {
          title: "계산 로직이 화면에 종속된 문제",
          keyTerm: "Servlet 레이어 분리",
          problem:
            "급여 계산 로직이 JSP 화면 안에 직접 작성되어 있어 같은 로직이 여러 페이지에 중복됐고, 수정 시 누락이 생길 수밖에 없는 구조였습니다.",
          solution:
            "계산 로직을 Servlet 레이어로 분리해 화면은 결과만 받아 렌더링하도록 책임을 나눴습니다. 이후 로직 수정 시 화면을 건드리지 않아도 됐습니다.",
          codeSnippet:
`// SalaryService.java — 급여 계산 책임을 Servlet으로 분리
public SalaryVO calculateMonthlySalary(String empNo, int year, int month) {
    AttendanceVO att = attDAO.getMonthly(empNo, year, month);
    int basePay   = empDAO.getBasePay(empNo);
    int deduction = calculateDeduction(att.getLateCount(), att.getAbsentCount());
    return new SalaryVO(empNo, year, month, basePay - deduction);
}
// JSP는 request.getAttribute("salary")로 결과만 출력`,
        },
      ],

      reflect: {
        learned: [
          {
            title: "데이터 흐름이 먼저, 화면은 그 다음",
            body: "근태 → 급여 → 인건비 흐름을 DB 설계 단계에서 먼저 잡지 않으면 나중에 쿼리가 걷잡을 수 없이 복잡해진다는 걸 배웠습니다. 이후 프로젝트에서 ERD를 먼저 그리는 습관이 생겼습니다.",
          },
          {
            title: "계산 로직은 화면 밖으로",
            body: "JSP에 계산 로직을 작성하면 수정할 때 모든 페이지를 뒤져야 합니다. Servlet으로 분리하고 나서야 '책임 분리'의 이유를 체감했고, 이후 React에서 훅으로 로직을 분리하는 습관으로 이어졌습니다.",
          },
        ],
        wouldDoDifferently: [
          "도메인 경계를 팀 전체가 합의하고 시작했을 것. 이번엔 개발 중반에 재설계가 필요했습니다.",
          "공통 계산 유틸리티 클래스를 처음부터 설계했을 것. 비슷한 계산 로직이 여러 Servlet에 중복됐습니다.",
        ],
      },

      serviceFeatures: [
        "사원 및 부서 정보 관리",
        "근태 등록 및 조회",
        "근태 기반 급여 계산",
        "부서별 인건비 산정",
        "관리자용 데이터 조회",
      ],
    },
  },

  {
    id: "final",
    type: "KH FINAL PROJECT",
    title: "PET&I FOR",
    subtitle: "반려동물 건강관리 통합 서비스 — 스토어·포인트·리뷰 도메인 전담",
    period: "2026.04.27 - 2026.06.24",
    role: "스토어 · 포인트 · 리뷰 도메인 백엔드 / 프론트엔드 전담",
    thumbnail: finalThumb,
    colorText: "PET",
    stack: [
      "React", "JavaScript", "styled-components", "Axios",
      "Spring Boot", "Spring Security", "Spring Data JPA", "JWT",
      "PostgreSQL", "AWS EC2", "AWS RDS", "AWS S3", "KakaoPay",
    ],
    links: [
      { label: "Service", href: "https://www.petandifor.store/home" },
      { label: "GitHub", href: "#" },
    ],
    detail: {
      stats: [
        { value: "60일", label: "개발 기간" },
        { value: "5인 팀", label: "구성" },
        { value: "1인 전담", label: "스토어 도메인 전체" },
        { value: "실배포", label: "petandifor.store" },
      ],

      serviceDomains: [
        { name: "건강관리", mine: false },
        { name: "커뮤니티", mine: false },
        { name: "스토어 · 포인트 · 리뷰", mine: true },
        { name: "관리자", mine: false },
      ],

      flowLine: ["상품", "장바구니", "주문", "결제", "리뷰"],

      statement:
        "5인 팀 프로젝트에서 스토어 · 포인트 · 리뷰 도메인을 단독 설계·구현했습니다. 상품 조회부터 카카오페이 결제, 리뷰 작성까지 — 구매 흐름의 처음부터 끝.",

      overview:
        "PET&I FOR는 반려동물의 건강관리, 커뮤니티, 스토어 기능을 통합한 웹 서비스입니다. 저는 스토어 도메인 전체(상품/장바구니/주문/결제/리뷰/위시리스트/최근 본 상품)와 포인트 정책을 담당했습니다. 강아지·고양이 카테고리별 상품 목록 8개 페이지, 상품 상세(급여 가이드·영양 성분), 장바구니와 바로구매 두 흐름, 카카오페이 결제 연동, 리뷰 이미지 S3 업로드까지 구현했습니다.",

      info: [
        { label: "개발 기간", value: "2026.04.27 - 2026.06.24" },
        { label: "구성원", value: "5명" },
        { label: "담당 영역", value: "스토어 · 포인트 · 리뷰" },
        { label: "담당 역할", value: "백엔드 / 프론트엔드 전담" },
      ],

      showcase: [
        {
          tag: "01",
          title: "상품 목록",
          context:
            "강아지·고양이 각 4개 카테고리(사료/간식/보조제/위생용품) = 8개 목록 페이지를 구현했습니다. 카테고리별 상품 필터링, S3 이미지 연동, 최근 본 상품 사이드바까지 — 스토어의 첫 진입점을 담당합니다.",
          points: [
            "강아지·고양이 × 4카테고리 = 8개 목록 페이지",
            "S3 이미지 URL 처리 및 위시리스트 버튼 통합",
            "최근 본 상품 사이드바 — 로컬스토리지 기반",
          ],
          image: finalPreview04,
          imageLabel: "상품 목록",
          flip: false,
        },
        {
          tag: "02",
          title: "상품 상세 — 권장급여량 맞춤 추천",
          context:
            "단순 상품 정보 나열을 넘어, 반려동물의 체중·나이를 입력하면 이 상품의 권장 급여량을 계산해 보여줍니다. 메인 건강관리 서비스와 스토어를 연결하는 이 프로젝트만의 킥입니다. 리뷰 요약(평균 별점·분포)도 함께 확인할 수 있습니다.",
          points: [
            "체중·나이 입력 기반 권장 급여량 실시간 계산",
            "영양 성분(Nutrition) 섹션 별도 설계",
            "별점 분포·평균 포함 리뷰 요약 표시",
          ],
          image: finalPreview01,
          imageLabel: "상품 상세",
          flip: true,
        },
        {
          tag: "03",
          title: "결제 — 카카오페이 & 포인트",
          context:
            "approval_url을 백엔드 URL로 설정해 카카오가 직접 서버를 호출하도록 했습니다. 결제 승인과 주문 생성이 하나의 트랜잭션으로 처리되어 프론트 이탈 시에도 주문이 누락되지 않습니다. 포인트 값은 sessionStorage로 백업해 리다이렉트 후에도 복원됩니다.",
          points: [
            "카카오페이 Ready/Approve API — approval_url 백엔드 설정",
            "장바구니 주문 · 바로구매 — 같은 UI, 다른 흐름 통일",
            "포인트 사용 + 3만원 미만 배송비 실시간 계산",
          ],
          image: finalPreview05,
          imageLabel: "주문·결제",
          flip: false,
        },
        {
          tag: "04",
          title: "관리자 상품 관리",
          context:
            "관리자가 상품을 등록·수정하고 판매 중지와 재활성화를 할 수 있는 관리 페이지입니다. S3 이미지 업로드를 포함한 상품 등록 폼, 카테고리별 목록, 상태 변경 기능을 구현했습니다.",
          points: [
            "상품 등록 / 수정 / 판매중지 / 재활성화",
            "S3 이미지 업로드 연동 등록 폼",
            "카테고리·상태별 목록 필터링",
          ],
          image: null,
          imageLabel: null,
          flip: true,
        },
        {
          tag: "05",
          title: "리뷰 작성 · 내역 · 관심상품",
          context:
            "구매 확정 후 이미지 첨부 리뷰를 작성하고, 내 리뷰·주문·위시리스트를 한 화면에서 모아볼 수 있습니다. 마이페이지에서 스토어 관련 모든 내역을 정리해 탐색 경험을 완결했습니다.",
          points: [
            "리뷰 이미지 S3 업로드 · 작성 / 수정 / 삭제",
            "마이페이지 — 주문내역 · 리뷰 · 관심상품 통합",
            "위시리스트 등록 · 해제 · 목록 조회",
          ],
          image: finalPreview02,
          imageLabel: "리뷰·위시리스트",
          flip: false,
        },
      ],

      troubles: [
        {
          title: "장바구니 주문 vs 바로구매 — 같은 화면, 다른 흐름",
          keyTerm: "location.state + useMemo 가상 객체",
          problem:
            "장바구니 주문과 바로구매가 같은 주문 페이지를 공유해야 했는데, 데이터 소스가 완전히 달랐습니다. 장바구니는 API로 가져오는 실제 데이터, 바로구매는 상품 상세에서 넘어온 state 값이었습니다. 별도 페이지로 분리하면 UI가 중복되고, 하나로 합치면 조건 분기가 복잡해지는 문제였습니다.",
          solution:
            "location.state.orderType === 'DIRECT'로 분기하고, 바로구매는 useMemo로 cartItemList 형태의 가상 객체를 만들어 장바구니와 동일한 인터페이스로 처리했습니다. 덕분에 금액 계산, 포인트, 배송비 로직을 한 번만 작성하고 두 흐름에서 재사용할 수 있었습니다.",
          codeSnippet:
`// OrderPage.jsx — 두 흐름을 하나의 인터페이스로 통일
const orderType = location.state?.orderType; // 'DIRECT' | 'CART'

const cartItemList = useMemo(() => {
  if (orderType === 'DIRECT') {
    // 바로구매: state 값으로 가상 장바구니 객체 생성
    const { productNo, productName, price, quantity } = location.state;
    return [{ productNo, productName, price, quantity }];
  }
  return serverCartItems; // 장바구니: API로 가져온 실제 데이터
}, [orderType, serverCartItems, location.state]);

// 이후 금액 계산, 포인트 처리는 cartItemList만 바라본다`,
        },
        {
          title: "카카오페이 승인 후 주문 누락 문제",
          keyTerm: "approval_url → 백엔드 트랜잭션",
          problem:
            "카카오페이 결제창에서 승인이 완료된 뒤 주문 생성 로직이 프론트에만 있으면, 사용자가 브라우저를 닫거나 네트워크가 끊겼을 때 결제는 됐는데 주문이 없는 상황이 생길 수 있었습니다.",
          solution:
            "approval_url을 프론트 URL이 아닌 백엔드 URL(/api/store/order/pay/approve)로 설정했습니다. 카카오가 직접 서버에 승인을 호출하고, 서버에서 결제 승인 + 주문 생성을 하나의 @Transactional로 처리합니다. 프론트는 완료 응답을 받은 뒤 결제 완료 페이지로 이동만 담당합니다.",
          codeSnippet:
`// KakaoPayService.java — approval_url을 백엔드로 지정
KakaoPayReadyRequest request = KakaoPayReadyRequest.builder()
    .approval_url(backendBaseUrl + "/api/store/order/pay/approve")
    .fail_url(frontendBaseUrl + "/store/order/pay/fail")
    .cancel_url(frontendBaseUrl + "/store/order/pay/cancel")
    .build();

// OrderPayController.java — 승인 + 주문생성을 하나의 트랜잭션으로
@Transactional
public OrderResponseDto approveAndCreateOrder(String pgToken, ...) {
    kakaoPayService.approve(pgToken);   // 카카오페이 승인
    return orderService.createOrder(orderRequest); // 주문 생성
}`,
        },
        {
          title: "포인트 사용값 — 카카오페이 리다이렉트 후 초기화",
          keyTerm: "sessionStorage fallback 복원",
          problem:
            "주문서에서 포인트를 입력한 뒤 카카오페이 결제창으로 이동하면, 돌아왔을 때 SPA 상태가 초기화되어 usedPoint가 0으로 리셋됐습니다. 포인트를 다시 입력해야 하는 UX 문제였습니다.",
          solution:
            "결제 준비 직전에 usedPoint를 sessionStorage에 저장하고, getInitialUsedPoint() 함수에서 location.state → sessionStorage 순으로 폴백하도록 처리했습니다. 리다이렉트 후에도 입력했던 포인트 값이 자동 복원됩니다.",
          codeSnippet:
`// 결제 준비 직전 — 포인트 값 백업
const handleKakaoPay = () => {
  sessionStorage.setItem('usedPoint', String(usedPoint));
  initiateKakaoPayReady();
};

// 컴포넌트 마운트 시 — location.state 우선, 없으면 sessionStorage 복원
const getInitialUsedPoint = () => {
  const fromState   = location.state?.usedPoint;
  const fromStorage = sessionStorage.getItem('usedPoint');
  return fromState ?? (fromStorage ? Number(fromStorage) : 0);
};
const [usedPoint, setUsedPoint] = useState(getInitialUsedPoint);`,
        },
      ],

      reflect: {
        closing:
          "60일 동안 처음으로 설계부터 배포까지 혼자 책임졌습니다. 부족한 게 보인다는 건 그만큼 성장했다는 뜻이라고 생각합니다.",

        learned: [
          {
            tag: "DEPLOYMENT",
            title: "로컬과 배포 환경은 다른 세계다",
            body: "카카오페이 API가 로컬에선 잘 됐지만 실배포 후 URL 설정 문제로 작동하지 않았습니다. approval_url·fail_url을 환경변수로 분리하고 프로파일별 base URL을 관리하는 법을 배웠습니다. 첫 실배포가 가르쳐준 가장 큰 교훈이었습니다.",
          },
          {
            tag: "ARCHITECTURE",
            title: "클라이언트를 신뢰하지 않는 설계",
            body: "approval_url을 프론트가 아닌 백엔드로 설정해 '결제 됐는데 주문 없음'을 원천 차단했습니다. 중요한 상태 변경은 서버에서 끝내야 한다는 원칙 — 보안과 안정성을 함께 고려하는 설계 감각을 처음 체득한 경험입니다.",
          },
          {
            tag: "FRONTEND",
            title: "같은 UI로 다른 데이터를 — 추상화의 가치",
            body: "장바구니 주문과 바로구매는 데이터 소스가 달랐지만, useMemo로 인터페이스를 통일해 로직 중복 없이 해결했습니다. '두 가지 다른 것을 같아 보이게 만드는 것'이 컴포넌트 설계의 핵심임을 처음 느꼈습니다.",
          },
          {
            tag: "COLLABORATION",
            title: "남의 코드를 읽고 소통하는 것",
            body: "포인트 도메인이 다른 팀원의 코드와 연결되어 있었습니다. 내 코드만큼 남의 코드를 이해하는 것, 그리고 인터페이스를 미리 합의하는 것이 얼마나 중요한지 직접 경험했습니다. 소통이 곧 설계라는 걸 배웠습니다.",
          },
          {
            tag: "SPA",
            title: "브라우저 생명주기를 고려한 UX",
            body: "카카오페이 결제창으로 이동했다 돌아오면 React 상태가 초기화됩니다. sessionStorage fallback으로 이 문제를 해결하면서, SPA에서 '외부 이동 후 복귀'라는 상황을 항상 고려해야 한다는 설계 감각을 익혔습니다.",
          },
        ],

        wouldDoDifferently: [
          {
            category: "PERFORMANCE",
            title: "N+1 쿼리 구조 개선",
            body: "상품 목록 API에서 N+1 구조를 발견했지만 일정 안에서 처리하지 못했습니다. 상품 ID 배치 조회로 33쿼리 → 4쿼리로 줄일 수 있다는 걸 알고 있습니다.",
          },
          {
            category: "FEATURE",
            title: "재고 관리 구현",
            body: "재고 개념이 없어 진짜 스토어가 아니라는 게 아쉽습니다. 결제 준비 단계의 재고 검증까지 — 다음엔 재고 테이블 설계부터 시작할 것입니다.",
          },
          {
            category: "INFRA",
            title: "이미지 업로드 — Pre-signed URL",
            body: "현재는 서버 경유로 S3에 업로드합니다. Pre-signed URL이면 클라이언트가 직접 올려 서버 부하와 비용을 줄일 수 있습니다. 파일 크기·형식 방어 로직도 더 꼼꼼히 했을 것입니다.",
          },
          {
            category: "DOMAIN",
            title: "도메인 간 알림·쪽지 연결",
            body: "쪽지·알림 서비스는 다른 팀원이 설계했지만 결제 완료에만 연결했습니다. 주문 취소, 위시리스트 재입고 알림까지 연결했다면 훨씬 완성도 있는 서비스가 됐을 것입니다.",
          },
          {
            category: "ARCHITECTURE",
            title: "포인트 정책 DB 기반 관리",
            body: "원래 기획은 독립된 포인트샵이었지만 스토어가 커지면서 자연스럽게 흡수됐습니다. 현재 하드코딩된 적립 비율을 DB 설정으로 유연하게 관리했을 것입니다.",
          },
        ],
      },

      serviceFeatures: [
        "반려동물 건강진단 신청 및 결과 관리",
        "반려인 커뮤니티 게시글 / 댓글 / 신고",
        "스토어 상품 목록 및 상세 (강아지·고양이 카테고리)",
        "장바구니, 주문, 결제, 리뷰",
        "포인트 적립 및 사용",
        "관리자 권한별 관리 기능",
      ],
    },
  },
];
