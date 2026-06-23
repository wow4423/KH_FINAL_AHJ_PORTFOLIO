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
    subtitle:
      "한 사람의 근태·결재·급여가 어긋나지 않게 이어지도록, 스키마부터 흐름까지 설계한 인적자원관리 모듈",
    period: "2026.02 - 2026.03",
    role: "DB 관리자 · 인적자원관리(HR) 도메인 풀스택",
    thumbnail: null,
    colorText: "ERP",
    stack: ["Java", "Spring Boot", "MyBatis", "Oracle", "JSP & Servlet", "Spring Security"],
    links: [
      { label: "Service", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    detail: {
      stats: [
        { value: "6주", label: "개발 기간" },
        { value: "팀 프로젝트", label: "주제별 분담" },
        { value: "DB 관리자", label: "스키마 설계·관리" },
        { value: "7개 도메인", label: "인적자원관리 전담" },
        { value: "3개 모듈", label: "근태·결재·급여·재무 연동" },
      ],

      serviceDomains: [
        { name: "인적자원관리", mine: true },
        { name: "재무관리", mine: false },
        { name: "품질·재고관리", mine: false },
        { name: "전자결재", mine: false },
      ],

      flowLine: ["직원·조직", "근태", "전자결재", "급여", "재무 전표"],

      statement:
        "DB 관리자이자 인적자원관리(HR) 도메인 담당으로 참여했습니다. MEMBER를 중심으로 근태·급여·조직 테이블의 관계를 먼저 설계하고, 그 스키마 위에서 근태·전자결재·급여·재무가 어긋나지 않게 이어지도록 흐름을 구현했습니다.",

      overview:
        "사내 ERP는 인적자원관리·재무관리·품질(재고)관리를 한 시스템으로 묶은 사내 업무 프로그램입니다. 저는 프로젝트의 DB 설계·관리를 맡으면서, 인적자원관리 모듈의 근태·급여·부서·매장·직급·직원·인적현황 7개 도메인을 풀스택으로 담당했습니다. 단순 CRUD를 넘어, 직원 한 명의 데이터가 근태·전자결재·급여·재무 전표로 끊김 없이 이어지도록 테이블 관계와 모듈 간 정합성을 설계하는 데 집중했습니다.",

      roleHighlights: [
        {
          title: "DB 설계·관리",
          body: "MEMBER를 중심으로 부서·직급·매장·근태·급여 테이블의 관계와 시퀀스·상태 코드 테이블을 설계하고, 소프트 삭제 규칙을 일관되게 적용했습니다.",
        },
        {
          title: "근태 관리",
          body: "출퇴근 처리, 09시 기준 지각 자동 판정, 매일 정오 근태 row 자동 생성 스케줄러, 결근 마감까지 구현했습니다.",
        },
        {
          title: "급여 ↔ 재무 연동",
          body: "마스터-디테일 구조의 급여 등록·수정과 확정/취소, 그리고 확정 시 재무 전표가 자동 생성되는 모듈 간 연동을 구현했습니다.",
        },
        {
          title: "조직·인적현황",
          body: "부서·매장·직급 마스터를 관리하고, 전일 근태·당월 급여·승인 결재 요약을 한 번에 조합한 인적현황 대시보드를 구현했습니다.",
        },
      ],

      info: [
        { label: "개발 기간", value: "2026.02.09 - 2026.03.24" },
        { label: "구성원", value: "팀 프로젝트 (주제별 분담)" },
        { label: "담당 영역", value: "DB 설계 · 인적자원관리 7개 도메인" },
        { label: "담당 역할", value: "DB 관리자 · HR 풀스택" },
      ],

      showcase: [
        {
          tag: "01",
          title: "조직·직원 데이터 모델 설계",
          context:
            "DB 관리자로서 MEMBER 테이블을 중심에 두고 부서·직급·매장·재직상태를 연결했습니다. 직급(POSITION)이 기본급·상여율을 보유하게 해 기대급여가 직급에서 파생되도록 했고, 매장 점주는 STORE가 직원을 참조하게 설계했습니다. 조회 한 번으로 한 사람의 소속·직급·기대급여·재직상태가 함께 나오도록 관계를 잡았습니다.",
          points: [
            "MEMBER 중심 + 부서·직급·매장·재직상태 참조 관계 설계",
            "직급이 기본급·상여율 보유 → 기대급여를 쿼리에서 파생",
            "QUIT_YN 소프트 삭제로 퇴사자 이력 보존",
          ],
          consideration:
            "급여 기준값(기본급·상여율)을 직원 테이블에 두면 같은 직급인데도 직원마다 값이 달라질 수 있습니다. 또 부서 직원과 매장 점주를 별도 테이블로 나누면 근태·급여 로직이 두 갈래가 됩니다. 일관성과 단순한 구조를 동시에 잡는 방법을 고민했습니다.",
          decision:
            "급여의 기준값을 직원이 아닌 직급에 두어, 직급 정책이 바뀌면 한 곳만 고쳐도 전 직원의 기대급여가 따라오게 했습니다. 데이터의 '기준'을 어디에 둘지를 먼저 정한 설계입니다.",
          codeTitle: "한 직원의 소속·직급·기대급여를 한 번에 조회",
          codeLanguage: "SQL · Oracle",
          codeSnippet: `SELECT M.EMP_NO, M.EMP_NAME,
       P.POS_NAME, P.BASE_SALARY, P.BONUS_RATE,
       (P.BASE_SALARY + P.BASE_SALARY * P.BONUS_RATE) AS EXPECTED_SALARY,
       CASE WHEN S.STORE_NAME IS NOT NULL
            THEN S.STORE_NAME ELSE D.DEPT_NAME END AS ORG_NAME,
       CS.STATUS_NAME
  FROM MEMBER M
  LEFT JOIN DEPT D            ON M.DEPT_CODE = D.DEPT_CODE
  LEFT JOIN POSITION P        ON M.POS_CODE  = P.POS_CODE
  LEFT JOIN STORE S           ON S.OWNER_EMP_NO = M.EMP_NO  -- 점주면 매장 소속
  LEFT JOIN CURRENT_STATUS CS ON M.EMP_STATUS_NO = CS.EMP_STATUS_NO
 WHERE M.QUIT_YN = 'N'  -- 소프트 삭제: 퇴사자 제외`,
          image: null,
          imageLabel: null,
          flip: false,
        },
        {
          tag: "02",
          title: "근태 자동 생성 · 출퇴근 처리",
          context:
            "근태를 집계하려면 그날 직원별 근태 row가 먼저 존재해야 합니다. 사용자가 출근을 눌러야만 생기는 구조면 결근자가 통째로 누락되므로, 매일 정오 스케줄러로 재직자 전원의 근태 row를 선생성하고 출근 시점에 없으면 즉석에서 만드는 이중 안전장치를 뒀습니다.",
          points: [
            "@Scheduled 기반 매일 정오 근태 row 자동 생성 (주말 제외)",
            "출근 시 09:00 기준 정상(1)·지각(2) 자동 판정",
            "휴가일 출근 차단, 중복 출·퇴근 차단 등 상태 검증",
          ],
          consideration:
            "출근 시에만 row를 만들면 결근자 데이터가 생기지 않고, 스케줄러 단독으로 생성하면 서버 장애 시 공백이 생깁니다. 어느 한 쪽에만 책임을 맡기는 것이 안전한지, 두 방법을 어떻게 조합할지 고민했습니다.",
          decision:
            "근태 데이터의 존재 여부를 사용자 행동에 의존시키지 않기로 했습니다. 스케줄러로 데이터를 선보장하되, 스케줄러 누락에 대비해 출근 시점에도 보강 생성하도록 책임을 이중화했습니다.",
          codeTitle: "스케줄러로 선생성하고, 출근 시점에 보강 생성",
          codeLanguage: "Java · Spring Boot",
          codeSnippet: `// 매일 정오 — 재직자 전원의 그날 근태 row를 선생성
@Scheduled(cron = "0 0 12 * * *")
public void initTodayAttendance() {
    LocalDate today = LocalDate.now();
    if (today.getDayOfWeek() == SATURDAY
            || today.getDayOfWeek() == SUNDAY) return; // 주말 방어
    attService.initDailyAttendance(today.toString());
}

// 출근 시점에 row가 없으면 즉석 생성 (이중 안전장치)
public void checkIn(String empNo) {
    String today = LocalDate.now().toString();
    AttVo vo = attMapper.selectAttendanceByEmpNoAndDate(empNo, today);
    if (vo == null) {
        attMapper.insertTodayAttendanceRow(empNo, today);
    }
    // 09:00 기준 정상(1) / 지각(2) 자동 판정
    int statusCode = LocalTime.now().isAfter(LocalTime.of(9, 0)) ? 2 : 1;
    attMapper.updateCheckIn(empNo, today, statusCode);
}`,
          image: null,
          imageLabel: null,
          flip: true,
        },
        {
          tag: "03",
          title: "전자결재 → 근태 반영",
          context:
            "휴가·연장근무 결재가 승인되면 그 내용이 근태에 반영되어야 합니다. 다른 팀원이 담당한 결재 테이블(APPROVAL_DOC·VACATION_DOC·OVERTIME_DOC)을 조인해 승인(STATUS_CODE=2) 문서만 끌어오고, 휴가건은 기간을 일자 단위로 순회하며 반영했습니다. 같은 결재가 다시 들어와도 데이터가 깨지지 않도록 멱등하게 처리했습니다.",
          points: [
            "결재 테이블 크로스 조인 — 승인 문서만 카테고리별 분기",
            "휴가 기간을 일자 단위로 순회하며 근태 반영",
            "존재 여부 확인 후 insert/update — 중복 반영 방지",
          ],
          consideration:
            "결재 반영이 두 번 실행될 경우, 무조건 insert 하면 중복 row가 쌓이고 무조건 update 하면 최초 생성 시 실패합니다. 어느 쪽도 선택하기 어려운 상황에서 멱등하게 처리하는 방법을 고민했습니다.",
          decision:
            "결재 반영은 재실행될 수 있다고 가정했습니다. 무조건 insert 하면 중복 row가 쌓이므로, 해당일 근태 존재 여부를 먼저 확인해 있으면 update, 없으면 insert 하도록 멱등성을 확보했습니다.",
          codeTitle: "존재 여부로 분기해 중복 반영 방지",
          codeLanguage: "Java · Spring Boot",
          codeSnippet: `// 휴가 기간을 하루씩 순회하며 근태에 반영
for (LocalDate date = startDate;
        !date.isAfter(endDate); date = date.plusDays(1)) {
    String workDate = date.toString();
    int cnt = attMapper.checkAttendanceExists(vo.getWriterNo(), workDate);

    if (cnt == 0) {
        attMapper.insertVacationAttendance(vo.getWriterNo(), workDate);
    } else {
        attMapper.updateVacationAttendance(vo.getWriterNo(), workDate);
    }
}`,
          image: null,
          imageLabel: null,
          flip: false,
        },
        {
          tag: "04",
          title: "급여 마스터-디테일 & 재무 전표 연동",
          context:
            "급여를 합계 한 줄(마스터)과 지급·공제 항목(디테일)으로 나눠 저장했습니다. 마스터를 먼저 등록하고 시퀀스 CURRVAL로 방금 만든 급여번호를 받아 상세 항목을 연결합니다. 급여를 확정하면 같은 트랜잭션 안에서 재무 전표가 자동 생성되고, 확정을 취소하면 역전표가 생성되도록 인사와 재무를 묶었습니다.",
          points: [
            "PAYROLL_MASTER / PAYROLL_DETAIL 마스터-디테일 구조",
            "동일 사원·동일 월 급여 중복 등록 차단",
            "확정 시 전표 자동 생성, 확정된 급여는 수정·삭제 차단",
          ],
          consideration:
            "급여 확정과 전표 생성 중 하나만 성공하면 인사와 재무 데이터가 어긋납니다. 두 작업의 처리 단위를 어떻게 묶어야 정합성을 보장할 수 있는지, 확정된 급여가 이후에 수정·삭제될 경우 어떻게 막을지 고민했습니다.",
          decision:
            "급여 합계와 항목 내역의 책임을 분리하고, 급여 상태 변경과 전표 생성은 한 트랜잭션으로 묶었습니다. 한쪽만 반영되어 인사와 재무가 어긋나는 일을 코드로 막았습니다.",
          codeTitle: "마스터 등록 후 시퀀스로 상세를 연결",
          codeLanguage: "Java · MyBatis",
          codeSnippet: `// 마스터 1건 등록
payMapper.insertMaster(vo);

// 방금 만든 급여번호 회수 (SEQ_PAYROLL_MASTER.CURRVAL)
String payNo = payMapper.selectCurrentPayNo();

// 상세 항목 N건을 같은 급여번호로 연결
for (PayDetailVo detail : vo.getDetailList()) {
    detail.setPayNo(payNo);
    payMapper.insertDetail(detail);
}`,
          image: null,
          imageLabel: null,
          flip: true,
        },
        {
          tag: "05",
          title: "인적현황 대시보드 (HR 홈)",
          context:
            "인사담당자가 한 화면에서 조직 현황을 파악할 수 있도록, 전일 기준 근태·당월 급여·승인 결재 요약을 한 번의 요청으로 조합해 내려주는 대시보드를 만들었습니다. 단순 합계가 아니라 정상출근율·급여 확정률 같은 파생 지표를 서버에서 계산해 제공했습니다.",
          points: [
            "프로필·결재·근태·급여·이슈를 단일 응답으로 조합",
            "정상출근율, 급여 확정률 등 파생 지표 서버 계산",
            "데이터가 없는 날을 대비한 0 기본값 방어 처리",
          ],
          consideration:
            "여러 도메인 데이터를 한 화면에 보여줄 때 요청을 여러 번 보내면 네트워크 비용이 늘고, 비율 계산을 화면에서 하면 표시 로직에 계산 책임이 섞입니다. 어느 레이어에서 조합하고 계산할지 고민했습니다.",
          decision:
            "여러 번의 요청 대신 화면이 필요로 하는 형태를 서버에서 한 번에 조립했습니다. 비율 계산도 화면이 아닌 서버에서 처리해, 표시 로직과 계산 책임을 분리했습니다.",
          codeTitle: "여러 도메인 요약을 한 응답으로 조합 · 비율 계산",
          codeLanguage: "Java · Spring Boot",
          codeSnippet: `public HrHomeResponseVo selectHrHome(String loginEmpNo) {
    HrHomeResponseVo res = new HrHomeResponseVo();
    res.setProfileVo(selectProfile(loginEmpNo));
    res.setApprovalSummaryVo(selectApprovalSummary());
    res.setAttSummaryVo(selectDayAttSummary());   // 정상출근율 계산
    res.setPaySummaryVo(selectPaySummary());       // 확정률 계산
    res.setIssueVoList(selectRecentIssueList());
    return res;
}

// 정상출근율 = 정상출근 인원 / 전체 인원
double rate = (double) vo.getNormalCount() * 100 / vo.getTotalEmpCount();
vo.setNormalRate(Math.round(rate * 10) / 10.0);`,
          image: null,
          imageLabel: null,
          flip: false,
        },
      ],

      troubles: [
        {
          title: "승인된 연장근무를 그대로 급여에 넣어도 되는가",
          keyTerm: "승인 vs 인정 컬럼 분리",
          problemTitle: "승인 시간을 그대로 인정하면 안 일해도 수당이 잡힙니다",
          problem:
            "연장근무 결재가 승인되면 그 시간이 급여 수당으로 이어집니다. 그런데 승인된 시간을 실제 근무와 무관하게 인정하면, 일찍 퇴근해도 OT 수당이 그대로 잡히는 문제가 있었습니다. 근태 테이블에 '연장 시간' 한 칸만 두면 승인과 실측을 구분할 수가 없었습니다.",
          considerationTitle: "결재로 승인된 권한과 실제 근무는 다른 데이터입니다",
          consideration:
            "'몇 시간까지 연장해도 된다'는 승인과 '실제로 그만큼 일했다'는 사실은 책임지는 의미가 다릅니다. 급여로 직결되는 값이므로, 둘을 한 컬럼에 섞지 말고 데이터 단계에서 분리해야 한다고 판단했습니다.",
          solutionTitle: "컬럼을 둘로 나누고, 실측을 채웠을 때만 인정",
          solution:
            "ATTENDANCE 테이블에 OT_APPROVED_HOURS(승인)와 OT_CONFIRMED_HOURS(인정)를 분리해 설계했습니다. 퇴근 처리 시 정규 퇴근시간(18:00)에 승인 시간을 더한 목표 시각을 계산하고, 현재 시각이 그 시각을 넘겼을 때에만 인정 시간을 확정했습니다. 급여 집계와 근태 요약은 모두 '인정' 컬럼만 합산하므로, 신청만 하고 일하지 않은 시간은 수당에 반영되지 않습니다.",
          metrics: {
            label: "연장근무 데이터 표현",
            before: { value: "1개 컬럼", sub: "승인·실측 구분 불가" },
            after: { value: "2개 컬럼", sub: "승인 / 인정 분리" },
            note: "승인(OT_APPROVED)과 인정(OT_CONFIRMED)을 분리하고, 급여는 인정값만 합산하도록 한 설계입니다.",
          },
          codeSnippet: `int approvedHours = vo.getOtApprovedHours() == null
        ? 0 : vo.getOtApprovedHours();
int confirmedHours = 0;

if (approvedHours > 0) {
    LocalTime targetEnd = LocalTime.of(18, 0).plusHours(approvedHours);
    if (!LocalTime.now().isBefore(targetEnd)) {
        confirmedHours = approvedHours; // 채웠을 때만 인정
    }
}
attMapper.updateCheckOut(empNo, workDate, confirmedHours);`,
        },
        {
          title: "출근하지 않은 직원의 근태는 누가 만드는가",
          keyTerm: "스케줄러 + 보강 생성",
          problemTitle: "출근을 눌러야만 근태가 생기면 결근자가 누락됩니다",
          problem:
            "월별 근태를 집계하려면 그날 직원별 근태 row가 존재해야 했습니다. 그런데 출근 버튼을 눌러야만 row가 생기는 구조라, 출근하지 않은 직원은 집계 대상에서 통째로 빠졌습니다. 결근·미출근을 파악할 방법이 없었습니다.",
          considerationTitle: "데이터 존재 자체를 사용자 행동에 맡길 수 없었습니다",
          consideration:
            "근태 데이터가 '있어야 한다'는 사실을 사용자의 출근 행동에 의존시키면 공백이 생깁니다. 데이터 생성 책임을 시스템이 보장하되, 자동 처리가 누락될 경우까지 대비해야 했습니다.",
          solutionTitle: "스케줄러로 선생성하고 출근 시점에 보강했습니다",
          solution:
            "매일 정오 @Scheduled 스케줄러로 재직자 전원의 근태 row를 선생성하고(주말 제외), 출근 처리 시 row가 없으면 그 자리에서 생성하도록 이중 안전장치를 뒀습니다. 이후 별도 결근 마감 처리로 미출근자를 결근(3)으로 일괄 전환할 수 있게 했습니다.",
          metrics: {
            label: "근태 데이터 보장 시점",
            before: { value: "출근 시", sub: "출근한 사람만 생성" },
            after: { value: "정오 + 출근", sub: "재직자 전원 보장" },
            note: "스케줄러 선생성과 출근 시점 보강으로 생성 책임을 이중화한 구조입니다.",
          },
          codeSnippet: `@Scheduled(cron = "0 0 12 * * *")
public void initTodayAttendance() {
    LocalDate today = LocalDate.now();
    if (today.getDayOfWeek() == SATURDAY
            || today.getDayOfWeek() == SUNDAY) return;
    attService.initDailyAttendance(today.toString());
}

// initDailyAttendance: 그날 row가 없는 재직자만 생성
List<String> empNoList =
        attMapper.selectEmpNoListForDailyInit(workDate);
for (String empNo : empNoList) {
    attMapper.insertDailyAttendanceRow(empNo, workDate);
}`,
        },
        {
          title: "인사 데이터와 재무 데이터가 따로 노는 문제",
          keyTerm: "모듈 간 트랜잭션",
          problemTitle: "급여 확정을 회계에 수기로 반영하면 어긋납니다",
          problem:
            "급여를 확정하면 회계 전표가 생성되어야 하고, 확정을 취소하면 그 전표를 되돌려야 합니다. 이 연동을 사람이 수기로 맞추면 한쪽만 반영되는 순간 인사와 재무의 데이터가 서로 어긋나게 됩니다.",
          considerationTitle: "두 모듈의 상태 변경은 함께 일어나야 합니다",
          consideration:
            "급여 확정과 전표 생성은 '같이 성공하거나 같이 실패해야' 하는 한 단위의 작업이라고 보았습니다. 둘을 분리된 수작업으로 두면 정합성을 보장할 수 없었습니다.",
          solutionTitle: "확정/취소 트랜잭션 안에서 전표 생성을 직접 호출",
          solution:
            "급여 확정 트랜잭션 안에서 재무 모듈의 전표 생성(autoPayrollYInsert)을 호출하고, 확정 취소 시에는 역전표(autoPayrollNInsert)를 생성하도록 묶었습니다. 또한 확정된 급여는 수정·삭제를 차단하는 상태 가드를 둬, 확정 이후 데이터가 임의로 바뀌지 않게 했습니다.",
          metrics: {
            label: "정합성 처리 단위",
            before: { value: "수기 반영", sub: "인사·재무 따로 처리" },
            after: { value: "1 트랜잭션", sub: "급여 확정 + 전표 생성" },
            note: "급여 상태 변경과 전표 생성을 하나의 트랜잭션으로 묶은 범위입니다.",
          },
          codeSnippet: `@Transactional
public int confirmY(String payNo) {
    PayMasterVo origin = payMapper.selectOne(payNo);
    if ("Y".equals(origin.getConfirmYn())) return 1;

    int result = payMapper.confirmY(payNo);
    if (result != 1) throw new IllegalStateException("급여 확정 실패");

    journalService.autoPayrollYInsert(origin); // 전표 자동 생성
    return result;
}`,
        },
        {
          title: "한 사람의 '소속'을 부서로만 표현할 수 있는가",
          keyTerm: "소속 다형성 설계",
          problemTitle: "부서 직원과 매장 점주가 한 테이블에 섞입니다",
          problem:
            "직원 대부분은 부서에 속하지만, 일부는 매장을 운영하는 점주였습니다. 소속을 DEPT_CODE 하나로만 표현하면 점주가 어떤 매장을 책임지는지 드러나지 않았고, 매장 운영자를 별도 테이블로 떼면 같은 사람이 두 곳에 중복되는 문제가 있었습니다.",
          considerationTitle: "사람은 하나인데 소속의 종류가 다릅니다",
          consideration:
            "직원을 두 테이블로 나누면 인사·근태·급여가 모두 두 갈래가 됩니다. 사람은 MEMBER 한 곳에 두되, '소속의 종류'만 관계로 표현하는 것이 일관성을 지키는 길이라고 판단했습니다.",
          solutionTitle: "STORE가 직원을 참조하고, 조회에서 소속을 도출",
          solution:
            "직원은 MEMBER 한 테이블로 유지하고, STORE가 OWNER_EMP_NO로 직원을 참조하도록 설계했습니다. 조회 시 매장 점주이면 매장명을, 아니면 부서명을 소속으로 보여주도록 CASE 식으로 ORG_NAME을 도출했습니다. 덕분에 점주든 부서원이든 근태·급여 로직은 동일한 한 갈래로 동작합니다.",
          metrics: {
            label: "직원 데이터 구조",
            before: { value: "소속 1종", sub: "부서로만 표현" },
            after: { value: "소속 2종", sub: "부서 / 매장 점주" },
            note: "MEMBER 단일 테이블을 유지하면서 매장 소속을 관계로 표현한 설계입니다.",
          },
          codeSnippet: `-- 점주면 매장명을, 아니면 부서명을 '소속'으로
CASE WHEN S.STORE_NAME IS NOT NULL
     THEN S.STORE_NAME
     ELSE D.DEPT_NAME
END AS ORG_NAME
...
LEFT JOIN STORE S ON S.OWNER_EMP_NO = M.EMP_NO  -- 매장이 직원을 참조`,
        },
      ],

      reflect: {
        closing:
          "스키마를 먼저 잡고 그 위에서 흐름을 구현하니, 근태·결재·급여·재무가 한 직원을 두고 어긋나지 않게 맞물렸습니다. 데이터가 어디에서 만들어지고 어떻게 이어지는지를 설계 단계에서 정하는 일이 곧 기능의 안정성이라는 걸 체감했고, 이때의 감각이 파이널 프로젝트의 주문·결제 설계로 그대로 이어졌습니다.",

        learned: [
          {
            tag: "ARCHITECTURE",
            title: "스키마 설계가 곧 기능 설계였다",
            body: "급여 기준값을 직급에 두고, 근태를 (직원·날짜) 단위로 잡는 등 테이블 관계를 먼저 정하니 기능이 자연스럽게 따라왔습니다. DB를 먼저 설계한 경험이 이후 흐름 전체를 보는 눈으로 이어졌습니다.",
          },
          {
            tag: "DOMAIN",
            title: "승인된 값과 실제 값은 다른 컬럼으로",
            body: "연장근무의 '승인'과 '인정'을 컬럼으로 분리하면서, 비즈니스 데이터는 무엇을 기준으로 확정할지가 핵심이라는 걸 알게 됐습니다. 급여처럼 민감한 값일수록 실측을 기준으로 삼아야 했습니다.",
          },
          {
            tag: "INFRA",
            title: "데이터 존재는 시스템이 보장한다",
            body: "근태 데이터가 출근 버튼에 의존하면 결근자가 누락됩니다. 스케줄러로 데이터를 선보장하고 진입 시점에 보강하는 이중 구조로, 시스템이 데이터 존재를 책임지게 만들었습니다.",
          },
        ],

        wouldDoDifferently: [
          {
            title: "권한 체크를 하드코딩에서 분리",
            body: "HR 화면 접근 권한을 부서코드(\"310100\", \"310101\")로 직접 비교하는 코드가 모든 ViewController에 반복됩니다. 다시 만든다면 Spring Security의 역할(Role) 기반 권한으로 옮겨, 조직이 바뀌어도 코드를 고치지 않게 하겠습니다.",
          },
          {
            title: "월 단위 키 컬럼 타입 재검토",
            body: "PAY_MONTH을 DATE로 저장해 거의 모든 쿼리에서 TO_CHAR(.., 'YYYY-MM') 변환이 반복됩니다. 월 단위 키는 인덱스 활용과 가독성을 위해 VARCHAR(7)나 연·월 분리 컬럼으로 설계했을 것입니다.",
          },
          {
            title: "조회 응답을 전용 DTO로",
            body: "조회 결과를 Map<String,Object>로 묶어 던지다 보니 응답 스펙이 코드로 강제되지 않았습니다. 응답 전용 DTO를 정의해 어떤 데이터가 내려가는지 타입으로 드러나게 하겠습니다.",
          },
          {
            title: "상태코드를 Enum으로",
            body: "근태 상태(1=정상, 2=지각, 3=결근, 4=휴가)와 매장 상태가 매직 넘버로 흩어져 있습니다. Enum/상수로 묶어 의미를 코드에 드러내고 잘못된 값을 컴파일 단계에서 막겠습니다.",
          },
        ],
      },

      serviceFeatures: [
        "직원·부서·매장·직급 정보 관리 및 인사이력",
        "출퇴근 처리 및 월별 근태 집계",
        "전자결재(휴가·연장) 근태 자동 반영",
        "급여 등록·확정 및 재무 전표 연동",
        "인적현황 대시보드(근태·급여·결재 요약)",
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
      "AWS EC2",
      "AWS RDS",
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
        { value: "풀스택", label: "스토어 · 포인트" },
        { value: "클라우드 배포", label: "AWS EC2 · RDS 운영" },
      ],

      serviceDomains: [
        { name: "건강관리", mine: false },
        { name: "커뮤니티", mine: false },
        { name: "스토어 · 포인트 · 리뷰", mine: true },
      ],

      flowLine: ["상품", "장바구니", "주문", "결제", "리뷰"],

      statement:
        "프로젝트 흐름을 조율하고, 스토어와 포인트의 풀스택을 담당했습니다.",

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
          consideration:
            "최근 본 상품을 서버에 저장하면 비로그인 사용자는 이용 못하고 API 요청도 늘어납니다. 반면 브라우저에 저장하면 다른 기기에서는 볼 수 없습니다. 이 서비스 성격에 어느 방식이 더 맞는지 고민했습니다.",
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
          consideration:
            "회원이 등록한 반려동물 종류가 상품 카테고리(강아지·고양이)와 맞지 않을 수 있고, 체중·나이 구간에 해당하는 급여 가이드 데이터가 없는 경우도 있습니다. 어떤 기준으로 반려동물과 상품을 매칭하고 예외를 처리할지 고민했습니다.",
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
          consideration:
            "장바구니 주문과 바로구매는 데이터 출처가 달라 주문 화면을 하나로 통합하기 까다롭습니다. 또 카카오페이 승인 응답을 프론트가 직접 받으면 서버가 완료 여부를 직접 확인하지 못합니다. 두 문제를 어떻게 해결할지 고민했습니다.",
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
          consideration:
            "외래키 연결을 유지하면 상품이 변경될 때 주문 내역도 같이 바뀌고, 연결을 끊으면 어떤 상품을 주문했는지 알 수 없게 됩니다. 연결을 유지하면서도 거래 당시 값을 보존할 수 있는지 고민했습니다.",
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
          consideration:
            "리뷰 자격을 회원·상품만으로 검증하면 실제 구매 여부 확인이 복잡해집니다. 어떤 데이터를 출발점으로 삼아야 구매자 검증·결제 완료 확인·중복 방지를 한 흐름에서 처리할 수 있는지 고민했습니다.",
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
          considerationTitle:
            "결제 완료보다 어떤 경로의 주문인지가 중요했습니다",
          consideration:
            "결제 화면은 공통으로 사용해도 되지만, 결제 이후의 후처리까지 같아서는 안 된다고 판단했습니다. 장바구니 주문은 결제한 장바구니를 비워야 하지만, 바로구매는 기존 장바구니와 무관하므로 그대로 보존해야 했습니다.",
          solutionTitle:
            "주문에 CART와 DIRECT 유형을 남겨 후처리를 분리했습니다",
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
            "세미 프로젝트에서 더 주체적으로 이끌어보고 싶다는 마음으로 파이널에서 조장을 자원했습니다. 처음에는 많이 결정하고 지시해야 한다고 생각했지만, 실제로는 각 도메인 담당자와 계속 소통하면서 전체 흐름을 함께 맞추는 일이 더 중요했습니다.",
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
            title: "진입 경로가 달라지면 처리 범위도 달라진다",
            body: "장바구니 결제와 바로구매는 같은 주문 화면으로 이어지지만, 결제 완료 후 어떤 장바구니 항목을 정리해야 하는지가 달랐습니다. 비슷해 보이는 기능이라도 사용자의 진입 경로와 의도에 따라 데이터 처리 범위가 달라진다는 것을 체감했습니다.",
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
