import finalThumb from "../../../../assets/images/펫앤아이포스토어캡쳐.png";
import finalPreview01 from "../../../../assets/images/finalPrj/storePreview1.png";
import finalPreview02 from "../../../../assets/images/finalPrj/storePreview2.png";
import finalPreview03 from "../../../../assets/images/finalPrj/storePreview3.png";
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
    stack: ["Java", "JSP & Servlet", "MyBatis", "Oracle"],
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
          codeSnippet: `-- 재설계 후: Attendance는 근태만, Salary는 급여만 책임진다
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
          codeSnippet: `// SalaryService.java — 급여 계산 책임을 Servlet으로 분리
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
    subtitle:
      "사용자의 구매 흐름과 거래 당시의 데이터를 함께 지킨 반려동물 통합 스토어",
    period: "2026.04.27 - 2026.06.24",
    role: "조장 · 스토어/포인트 Front-end & Back-end",
    thumbnail: finalThumb,
    colorText: "PET",
    stack: [
      "React",
      "styled-components",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "AWS S3",
      "KakaoPay",
    ],
    links: [
      { label: "Service", href: "https://www.petandifor.store/home" },
      { label: "GitHub", href: "https://github.com/LeeHJ0110/khFinal" },
    ],
    detail: {
      stats: [
        { value: "60일", label: "개발 기간" },
        { value: "조장", label: "프로젝트 역할" },
        { value: "5인", label: "팀 구성" },
        { value: "Front + Back", label: "스토어 · 포인트" },
        { value: "실배포", label: "petandifor.store" },
      ],

      serviceDomains: [
        { name: "건강관리", mine: false },
        { name: "커뮤니티", mine: false },
        { name: "스토어 · 포인트 · 리뷰", mine: true },
      ],

      flowLine: ["상품", "장바구니", "주문", "결제", "리뷰"],

      statement:
        "프로젝트의 흐름을 조율하고, 스토어와 포인트의 프론트엔드·백엔드를 구현했습니다.",

      overview:
        "PET&I FOR는 건강관리·커뮤니티·스토어를 연결한 반려동물 통합 서비스입니다. 스토어에서는 상품 탐색부터 주문·결제·리뷰까지 흐름을 자연스럽게 잇고, 변경되는 상품 정보와 보존해야 할 주문 기록을 구분하는 데 집중했습니다.",

      roleHighlights: [
        {
          title: "조장",
          body: "Trello·주간보고서·멘토링 일지로 일정과 이슈를 공유하고, 각 도메인의 진행 상황을 조율했습니다.",
        },
        {
          title: "UI 방향",
          body: "서비스 전체의 화면 톤앤매너와 공통 UI 방향을 정리했습니다.",
        },
        {
          title: "스토어 Full-stack",
          body: "상품·장바구니·주문·결제·리뷰의 프론트엔드와 백엔드를 구현했습니다.",
        },
        {
          title: "포인트",
          body: "스토어와 건강진단에 연결되는 적립·사용 정책과 검증 로직을 구현했습니다.",
        },
      ],

      info: [
        { label: "개발 기간", value: "2026.04.27 - 2026.06.24" },
        { label: "구성원", value: "5명" },
        { label: "담당 영역", value: "스토어 · 포인트 · 리뷰" },
        {
          label: "담당 역할",
          value: "조장",
        },
        {
          label: "담당 기능",
          value: "스토어/포인트 Front-end & Back-end",
        },
      ],

      showcase: [
        {
          tag: "01",
          title: "상품 탐색",
          context:
            "강아지와 고양이 상품을 사료·간식·보조제·위생용품으로 나누고, 사용자가 여러 목록을 오가더라도 이전에 본 상품을 다시 찾을 수 있도록 탐색 흐름을 구성했습니다. 큰 기능보다 사용 중 생기는 작은 단절을 줄이는 데 집중했습니다.",
          points: [
            "강아지·고양이 × 4개 카테고리의 상품 목록 구성",
            "S3 상품 이미지와 위시리스트 동작 연결",
            "localStorage 기반 최근 본 상품 사이드바 제공",
          ],
          decision:
            "최근 본 상품은 서버 계정 데이터보다 즉시성과 가벼운 탐색 보조가 중요하다고 판단해 브라우저 저장소로 관리했습니다.",
          codeTitle: "최근 본 상품을 중복 없이 최신순으로 유지",
          codeLanguage: "JavaScript",
          codeSnippet: `const MAX_RECENT_PRODUCT_COUNT = 5;

export function addRecentProduct(product) {
  const recentProduct = {
    productId: product.productId,
    productName: product.productName,
    productPrice: product.productPrice,
    mainImageUrl: product.mainImageUrl,
  };

  const filteredProducts = getRecentProducts().filter(
    (item) => Number(item.productId) !== Number(product.productId),
  );

  const nextProducts = [recentProduct, ...filteredProducts]
    .slice(0, MAX_RECENT_PRODUCT_COUNT);

  localStorage.setItem(
    "petStoreRecentProducts",
    JSON.stringify(nextProducts),
  );
}`,
          image: finalPreview04,
          imageLabel: "상품 목록",
          flip: false,
        },
        {
          tag: "02",
          title: "맞춤 급여량",
          context:
            "상품을 보여주는 데서 끝내지 않고, 반려동물의 체중과 나이를 입력하면 권장 급여량을 확인할 수 있도록 구성했습니다. 사용자가 구매 전에 필요한 판단 정보를 한 화면에서 얻도록 영양 성분과 리뷰 요약도 함께 배치했습니다.",
          points: [
            "체중·나이 입력 기반 권장 급여량 계산",
            "영양 성분과 급여 가이드를 독립된 정보 영역으로 구성",
            "평균 별점과 별점 분포를 포함한 리뷰 요약 제공",
          ],
          decision:
            "상품 카테고리와 회원의 반려동물 종류를 먼저 맞춘 뒤 체중 구간에 해당하는 급여 가이드를 찾아, 단순 상품 설명을 개인화된 구매 판단 정보로 바꿨습니다.",
          codeTitle: "등록된 반려동물과 상품 급여 기준을 매칭",
          codeLanguage: "Java · Spring Boot",
          codeSnippet: `List<PetEntity> matchedPetList = allPetList.stream()
    .filter(pet -> pet.getBreed() != null)
    .filter(pet -> pet.getBreed().getPetType() == targetPetType)
    .toList();

List<StorePetFeedingRecommendResDto> recommendPetList =
    matchedPetList.stream()
        .map(pet -> toPetFeedingRecommendDto(
            pet,
            feedingGuideList
        ))
        .toList();

result.setFeedingRecommendStatus("SUCCESS");
result.setRecommendPetList(recommendPetList);`,
          image: finalPreview01,
          imageLabel: "상품 상세",
          flip: true,
        },
        {
          tag: "03",
          title: "주문·결제",
          context:
            "장바구니 구매와 바로구매는 데이터가 만들어지는 방식이 달랐지만 사용자가 만나는 주문 화면은 같아야 했습니다. 두 흐름을 공통 주문 목록 형태로 맞추고 배송지·배송 요청·포인트·배송비 계산을 한 화면에서 처리했습니다. 카카오페이의 승인 콜백은 백엔드가 직접 받아 중요한 상태 변경이 서버에서 끝나도록 구성했습니다.",
          points: [
            "장바구니 주문과 바로구매를 동일한 주문 UI로 통합",
            "카카오페이 Ready·Approve API 및 백엔드 승인 콜백 구현",
            "보유 포인트 검증과 3만원 기준 배송비 계산",
          ],
          decision:
            "데이터의 출처보다 주문 화면이 필요로 하는 형태를 먼저 정의했습니다. 바로구매 상품을 공통 주문 항목으로 변환해 UI와 금액 계산 로직이 구매 방식에 의존하지 않도록 했습니다.",
          codeTitle: "바로구매 데이터를 공통 주문 항목으로 변환",
          codeLanguage: "React",
          codeSnippet: `const directCartItemList = useMemo(() => {
  if (!isDirectOrder || !directItem) return [];

  const qty = Number(directItem.qty || 1);
  const price = Number(directItem.productPrice || 0);

  return [{
    productId: directItem.productId,
    productName: directItem.productName,
    cartItemQty: qty,
    cartItemTotalPrice: price * qty,
  }];
}, [isDirectOrder, directItem]);

const cartItemList = isDirectOrder
  ? directCartItemList
  : (cart?.cartItemList ?? []);`,
          image: finalPreview05,
          imageLabel: "주문·결제",
          flip: false,
        },
        {
          tag: "04",
          title: "주문 데이터 보존",
          context:
            "관리자는 상품명과 가격을 수정하거나 판매를 중지할 수 있습니다. 그러나 그 변경이 과거 주문 내역까지 바꾸면 고객은 자신의 거래 기록을 신뢰할 수 없습니다. 주문 상세에 구매 당시 상품명·가격·수량·총액을 별도로 저장하고, 수령인과 주소도 주문 시점 값으로 보존했습니다.",
          points: [
            "관리자 상품 등록·수정·판매 중지·재활성화",
            "주문 당시 상품명·가격·수량·총액 스냅샷 저장",
            "수령인·연락처·주소·배송 요청사항을 주문 데이터로 보존",
          ],
          decision:
            "상품은 현재 상태를, 주문은 과거의 거래 사실을 책임진다고 구분했습니다. 외래키 연결을 유지하면서도 고객에게 보여줄 거래 값은 주문 상세에 별도로 보존했습니다.",
          codeTitle: "변경 가능한 상품 값을 주문 시점에 복사",
          codeLanguage: "Java · JPA",
          codeSnippet: `public static StoreOrderItemEntity from(
        StoreOrderEntity order,
        StoreProductEntity product,
        Integer qty
) {
    return StoreOrderItemEntity.builder()
        .order(order)
        .product(product)
        .orderItemProductName(product.getProductName())
        .orderItemProductPrice(product.getProductPrice())
        .orderItemQty(qty)
        .orderItemTotalPrice(product.getProductPrice() * qty)
        .build();
}`,
          image: finalPreview03,
          imageLabel: "상품관리",
          flip: true,
        },
        {
          tag: "05",
          title: "구매 리뷰",
          context:
            "결제가 끝난 뒤에도 사용자가 주문 상태를 확인하고 실제 구매 상품에 리뷰를 남길 수 있도록 흐름을 이어갔습니다. 주문 상품을 리뷰의 기준으로 사용해 구매자와 결제 상태를 확인하고, 중복 리뷰를 방지했습니다.",
          points: [
            "결제 완료 주문 상품을 기준으로 리뷰 작성 자격 검증",
            "중복 리뷰 방지 및 리뷰 이미지 S3 업로드",
            "마이페이지에서 주문·리뷰·관심상품 내역 제공",
          ],
          decision:
            "리뷰를 회원과 상품만으로 연결하지 않고 실제 주문 상품을 출발점으로 삼았습니다. 덕분에 구매자 여부, 결제 완료 상태와 중복 작성을 한 흐름에서 검증할 수 있었습니다.",
          codeTitle: "주문 상품을 기준으로 리뷰 작성 자격 검증",
          codeLanguage: "Java · Spring Boot",
          codeSnippet: `StoreOrderItemEntity orderItem =
    getOrderItemEntity(reqDto.getOrderItemId());

validateOrderItemOwner(orderItem, member);
validateOrderStatus(orderItem);
validateDuplicateReview(orderItem);

StoreReviewEntity review =
    reqDto.toEntity(orderItem, member);

storeReviewRepository.save(review);
saveReviewImages(review, fileList);`,
          image: finalPreview02,
          imageLabel: "리뷰·위시리스트",
          flip: false,
        },
      ],

      troubles: [
        {
          title: "바로구매 후 장바구니까지 비워지는 문제",
          keyTerm: "주문 유형 분리",
          problemTitle:
            "D만 바로구매했는데 A·B·C까지 장바구니에서 사라졌습니다",
          problem:
            "장바구니 주문과 결제를 먼저 구현한 뒤 바로구매 기능을 추가하며 발견했습니다. 장바구니에 A·B·C 상품을 담아둔 상태에서 D 상품만 바로구매했는데, 결제가 끝나자 기존 장바구니까지 모두 비워졌습니다. 두 구매 방식이 같은 결제 승인 로직을 사용하면서 구매 출처와 관계없이 장바구니를 삭제하고 있었습니다.",
          considerationTitle: "결제 완료보다 어떤 경로의 주문인지가 중요했습니다",
          consideration:
            "결제 화면은 공통으로 사용해도 되지만, 결제 이후의 후처리까지 같아서는 안 된다고 판단했습니다. 장바구니 주문은 결제한 장바구니를 비워야 하지만, 바로구매는 기존 장바구니와 무관하므로 그대로 보존해야 했습니다.",
          solutionTitle: "주문에 CART와 DIRECT 유형을 남겨 후처리를 분리했습니다",
          solution:
            "주문 생성 시 구매 출처를 CART와 DIRECT로 구분해 저장했습니다. 결제 승인 후에는 CART 주문일 때만 회원의 장바구니를 삭제하고, DIRECT 주문은 장바구니를 건드리지 않도록 후처리를 분리했습니다. 주문 화면은 공통으로 유지하되 데이터 변경 범위만 주문 유형에 따라 다르게 만들었습니다.",
          metrics: {
            label: "재현 시나리오 기준",
            before: { value: "0 / 3개", sub: "D 바로구매 후 A·B·C 보존" },
            after: { value: "3 / 3개", sub: "기존 장바구니 상품 보존" },
            note: "A·B·C를 장바구니에 담고 D를 바로구매한 시나리오로 확인한 데이터 보존 결과입니다.",
          },
          codeSnippet: `// 주문 생성 시 구매 출처를 함께 저장
StoreOrderEntity order = createOrder(
    member,
    StoreOrderType.DIRECT,
    deliveryAddress,
    reqDto.getDeliveryRequest(),
    deliveryFee,
    usedPoint,
    finalAmount
);

// 결제 승인 후 장바구니 주문일 때만 삭제
if (order.isCartOrder()) {
    storeCartItemRepository.deleteByMember(order.getMember());
}

public boolean isCartOrder() {
    return this.orderType == StoreOrderType.CART;
}`,
        },
        {
          title: "상품 변경이 과거 주문 기록까지 바꾸는 문제",
          keyTerm: "주문 시점 스냅샷",
          problemTitle: "현재 상품값을 쓰면 과거 주문도 바뀝니다",
          problem:
            "테이블 설계 막바지에 상품이 주문과 연결된 이후에도 관리자가 상품명과 가격을 수정하거나 판매를 중지할 수 있다는 점을 발견했습니다. 주문 내역이 현재 상품 값을 그대로 사용하면 20,000원에 구매한 상품이 나중에는 25,000원으로 표시되는 등 거래 당시의 사실이 달라질 수 있었습니다. 회원의 배송지 수정도 같은 문제를 만들 수 있었습니다.",
          considerationTitle: "상품과 주문은 책임지는 시간이 다릅니다",
          consideration:
            "상품은 현재 판매 상태를 보여주는 데이터지만, 주문은 고객과 서비스 사이에 이미 끝난 거래의 기록입니다. 두 데이터가 책임지는 시점이 다르다고 보았습니다.",
          solutionTitle: "거래 당시의 핵심 값을 주문에 복사했습니다",
          solution:
            "상품은 현재 상태를 보여주지만 주문은 거래 당시의 사실을 보존해야 한다고 구분했습니다. 주문 상품에 구매 당시 상품명·가격·수량·총액을 복사하고, 주문에는 당시 수령인·연락처·주소·배송 요청사항을 저장했습니다. 마이페이지 주문 내역도 현재 상품명이 아닌 주문 상품의 스냅샷 값을 사용하도록 했습니다.",
          metrics: {
            label: "보존 범위",
            before: { value: "0개", sub: "별도 보존 값" },
            after: { value: "8개", sub: "상품·배송 핵심 값 스냅샷" },
            note: "상품 4개 값과 배송 4개 값을 주문 시점 데이터로 보존했습니다.",
          },
          codeSnippet: `public static StoreOrderItemEntity from(
        StoreOrderEntity order,
        StoreProductEntity product,
        Integer qty
) {
    return StoreOrderItemEntity.builder()
            .order(order)
            .product(product)
            .orderItemProductName(product.getProductName())
            .orderItemProductPrice(product.getProductPrice())
            .orderItemQty(qty)
            .orderItemTotalPrice(product.getProductPrice() * qty)
            .build();
}`,
        },
        {
          title: "외부 결제를 거치는 동안 주문 상태를 안전하게 전환",
          keyTerm: "Ready → Approve 상태 관리",
          problemTitle: "결제 승인 중 일부 상태만 바뀔 수 있었습니다",
          problem:
            "카카오페이는 서비스 밖의 결제 화면을 거쳐 다시 돌아오는 흐름이므로 프론트 화면만으로 결제 완료를 판단할 수 없습니다. 주문, 결제, 배송과 포인트가 각각 다른 상태를 갖기 때문에 승인 도중 일부 처리만 끝나면 데이터가 서로 어긋날 수 있었습니다.",
          considerationTitle:
            "완료 기준을 화면이 아닌 서버 승인으로 잡았습니다",
          consideration:
            "결제 성공 화면이 보였는지가 아니라 PG사의 승인 응답을 서버가 확인했는지를 완료 기준으로 삼고, 관련 상태 변경을 하나의 트랜잭션으로 묶어야 했습니다.",
          solutionTitle: "네 가지 상태 변경을 승인 트랜잭션에 묶었습니다",
          solution:
            "결제 준비 단계에서 주문 상품과 결제 대기 데이터를 생성하고, approval_url을 백엔드로 지정해 카카오가 서버의 승인 API를 직접 호출하도록 했습니다. 승인 트랜잭션에서는 중복 결제와 취소 주문을 검증한 뒤 주문을 결제 완료로 변경하고, 배송 정보 생성·포인트 차감·결제 상태 갱신을 함께 처리했습니다. 프론트는 이 처리가 끝난 후 완료 화면으로 이동하는 역할만 담당합니다.",
          metrics: {
            label: "상태 변경 단위",
            before: { value: "4종", sub: "주문·배송·포인트·결제 상태" },
            after: { value: "1개", sub: "승인 트랜잭션으로 처리" },
            note: "처리 속도 수치가 아니라 코드에서 확인되는 원자적 처리 범위입니다.",
          },
          codeSnippet: `@Transactional
public void payApprove(Long orderId, String pgToken) {
    StoreOrderEntity order = getOrderEntity(orderId);
    StorePaymentEntity payment = getPaymentEntity(order);

    if (payment.isPaid()) {
        throw new StoreException(StoreErrorCode.ORDER_ALREADY_PAID);
    }

    StoreKakaoPayApproveResDto approveRes = storeKakaoPayService.approve(
        payment.getPaymentKakaoTid(),
        payment.getPartnerOrderId(),
        payment.getPartnerUserId(),
        pgToken,
        payment.getPaymentAmount()
    );

    order.paid();
    createOrderDeliveryIfNotExists(order);
    pointService.useOrderPoint(
        order.getMember(),
        order.getOrderUsedPoint(),
        order.getOrderId()
    );
    payment.approve(approveRes.getTid(), LocalDateTime.now());
}`,
        },
        {
          title: "건강진단 포인트를 언제 차감할 것인가",
          keyTerm: "진입 검증 · 제출 시 차감",
          problemTitle: "일찍 차감하면 환불, 늦게 검사하면 사용자 손해였습니다",
          problem:
            "건강진단은 여러 단계의 문진과 이미지 등록을 마친 뒤 제출하는 서비스입니다. 시작과 동시에 2,000P를 차감하면 사용자가 중간에 나갔을 때 포인트를 다시 돌려주는 취소 로직이 필요합니다. 반대로 마지막에만 확인하면 포인트가 부족한 사용자가 모든 문진을 마친 뒤 제출 단계에서 처음 차단되는 문제가 있었습니다.",
          considerationTitle: "진입 허용과 실제 사용 확정을 분리했습니다",
          consideration:
            "시작 시 차감하면 환불 로직이 생기고, 제출 시에만 검사하면 사용자 시간을 낭비합니다. 진입 가능 여부와 실제 사용 확정을 서로 다른 시점의 책임으로 나누었습니다.",
          solutionTitle: "시작 전 확인하고, 제출 시 다시 검증해 차감했습니다",
          solution:
            "진단 시작 전에는 현재 포인트가 2,000P 이상인지 확인해 진입 여부만 결정하고 실제 차감은 하지 않았습니다. 최종 제출 시 서버에서 잔액을 다시 검증하며 차감하도록 했습니다. 사용자가 문진 도중 다른 창에서 포인트를 사용해도 제출 시점의 서버 검증이 막아주며, 중간 이탈에는 환불 처리가 필요하지 않습니다.",
          metrics: {
            label: "불필요한 보상 로직",
            before: { value: "1개", sub: "시작 즉시 차감 시 환불 처리" },
            after: { value: "0개", sub: "중도 이탈 환불 불필요" },
            note: "대신 진입 전과 제출 시 총 2번 잔액을 검증해 사용자 경험과 정합성을 함께 지켰습니다.",
          },
          codeSnippet: `// 진단 시작 전: 잔액만 확인
const canStart = await checkPointBeforeStart(
  POINT_ACTION_TYPE.HEALTHCARE_USE,
);

if (!canStart) return;
navigate("/healthcare/request");

// 최종 제출 트랜잭션: 잔액 재검증 후 차감
@Transactional
public void requestDiagnosis(...) {
    MemberEntity member = getLoginMember(username);

    pointService.useHealthcarePoint(member, "건강진단");

    DiagnosisReqEntity diagnosisReq =
        diagnosisReqRepository.save(
            DiagnosisReqEntity.builder()
                .petEntity(pet)
                .build()
        );
}

// MemberEntity.usePoint()에서 제출 시점 잔액 검증
if (this.point < amount) {
    throw new CustomException(PointErrorCode.NOT_ENOUGH_POINT);
}
this.point -= amount;`,
        },
      ],

      reflect: {
        closing:
          "사용자에게 자연스러운 흐름과 팀이 끝까지 완성할 수 있는 흐름은 모두 저절로 생기지 않았습니다. 기능의 연결 지점과 사람 사이의 공유 지점을 함께 챙긴 것이 이번 프로젝트에서 가장 크게 달라진 점입니다.",

        leadership: {
          title: "조장으로서 배운 점",
          statement:
            "처음에는 조장이 더 많이 결정해야 한다고 생각했습니다. 실제로는 각자의 진행 상황과 막힌 지점을 계속 보이게 만드는 일이 더 중요했습니다.",
          items: [
            {
              title: "진행 상황을 보이게 만들기",
              body: "Trello, 주간보고서와 멘토링 일지로 각 도메인의 일정과 이슈를 함께 확인했습니다.",
            },
            {
              title: "먼저 기록하고 공유하기",
              body: "기록을 요청하기 전에 제 진행 내용부터 남겼고, 조원들이 자연스럽게 공유에 참여하도록 만들었습니다.",
            },
            {
              title: "내 기능 밖의 흐름까지 보기",
              body: "제 구현만 끝내는 것이 아니라 도메인 사이의 연결과 전체 진행률을 계속 확인했습니다.",
            },
          ],
        },

        learned: [
          {
            tag: "FRONTEND",
            title: "기능보다 사용자의 흐름을 먼저 보게 됐다",
            body: "사용자에게는 장바구니와 바로구매가 같은 주문 화면으로 이어지고 포인트와 배송비가 바로 반영되는 것이 당연합니다. 그 당연함은 개발자가 작은 조건을 하나씩 챙겨야 만들어진다는 것을 체감했습니다.",
          },
          {
            tag: "ARCHITECTURE",
            title: "데이터마다 지켜야 할 시간이 다르다",
            body: "상품은 계속 바뀌는 현재 정보이고 주문은 구매 당시의 사실입니다. 두 데이터를 연결하는 것에 그치지 않고, 무엇을 어느 시점의 값으로 보존해야 하는지 생각하게 됐습니다.",
          },
        ],

        wouldDoDifferently: [
          {
            category: "PERFORMANCE",
            title: "주문 내역 조회의 N+1 구조 개선",
            body: "주문 내역과 상품 이미지·리뷰를 항목별로 조회하는 구조가 남아 있습니다. 다음에는 fetch join, EntityGraph 또는 ID 배치 조회를 적용하고 실제 쿼리 수를 측정해 개선하겠습니다.",
          },
          {
            category: "FEATURE",
            title: "재고와 결제 실패 주문 정리",
            body: "재고 개념과 결제 대기 주문의 만료 처리가 없습니다. 다음에는 결제 준비 시 재고를 검증·예약하고, 일정 시간이 지난 미결제 주문을 정리하는 정책까지 함께 설계하겠습니다.",
          },
          {
            category: "ARCHITECTURE",
            title: "운영 정책을 코드 밖으로 분리",
            body: "포인트 사용 단위와 무료 배송 기준이 코드 상수로 관리됩니다. 정책 테이블과 관리자 설정 기능으로 옮겨 운영 정책이 바뀌어도 배포 없이 조정할 수 있도록 만들겠습니다.",
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
