import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import CodeViewer from "./CodeViewer";

const TABS = [
  { id: "overview", label: "개요" },
  { id: "build", label: "구현" },
  { id: "solve", label: "문제 해결" },
  { id: "reflect", label: "회고" },
];

const STACK_CATS = {
  frontend: {
    color: "#4c6ab0",
    bg: "rgba(76,106,176,0.08)",
    border: "rgba(76,106,176,0.2)",
    keys: new Set([
      "React",
      "JavaScript",
      "styled-components",
      "HTML",
      "CSS",
      "Axios",
    ]),
  },
  backend: {
    color: "#326b50",
    bg: "rgba(50,107,80,0.08)",
    border: "rgba(50,107,80,0.2)",
    keys: new Set([
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "JWT",
      "Java",
      "JSP & Servlet",
      "MyBatis",
    ]),
  },
  infra: {
    color: "#7a5c2e",
    bg: "rgba(122,92,46,0.08)",
    border: "rgba(122,92,46,0.2)",
    keys: new Set(["PostgreSQL", "Oracle", "AWS EC2", "AWS RDS", "AWS S3"]),
  },
  payment: {
    color: "#7a5c00",
    bg: "rgba(122,92,0,0.07)",
    border: "rgba(122,92,0,0.2)",
    keys: new Set(["KakaoPay"]),
  },
};
function getStackStyle(name) {
  for (const cat of Object.values(STACK_CATS)) {
    if (cat.keys.has(name)) return cat;
  }
  return STACK_CATS.frontend;
}

const REFLECT_CATS = {
  DEPLOYMENT: { color: "#8a5a1a" },
  ARCHITECTURE: { color: "#4c6ab0" },
  FRONTEND: { color: "#2a7060" },
  COLLABORATION: { color: "#8a3c30" },
  SPA: { color: "#5a3a88" },
  PERFORMANCE: { color: "#8a3c1a" },
  FEATURE: { color: "#2a6040" },
  INFRA: { color: "#7a5a00" },
  DOMAIN: { color: "#7a3060" },
  DEFAULT: { color: "#7a5a50" },
};

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openChallenges, setOpenChallenges] = useState(new Set());
  const [openCodes, setOpenCodes] = useState(new Set());
  const [openBuildCodes, setOpenBuildCodes] = useState(new Set());
  const [selectedBuild, setSelectedBuild] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    lightboxRef.current = lightboxImg;
  }, [lightboxImg]);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxRef.current) {
        setLightboxImg(null);
      } else {
        onClose();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [project, onClose]);

  if (!project) return null;

  const d = project.detail ?? {};
  const features = d.serviceFeatures ?? [];
  const showcase = d.showcase ?? [];
  const troubles = d.troubles ?? [];
  const stats = d.stats ?? [];
  const domains = d.serviceDomains ?? [];
  const roles = d.roleHighlights ?? [];
  const reflect = d.reflect ?? {};
  const leadership = reflect.leadership ?? null;
  const stackList = project.stack ?? [];
  const periodDuration = stats.find((s) => s.label === "개발 기간")?.value;

  function toggleChallenge(idx) {
    setOpenChallenges((p) => {
      const n = new Set(p);
      n.has(idx) ? n.delete(idx) : n.add(idx);
      return n;
    });
  }
  function toggleCode(idx) {
    setOpenCodes((p) => {
      const n = new Set(p);
      n.has(idx) ? n.delete(idx) : n.add(idx);
      return n;
    });
  }
  function toggleBuildCode(idx) {
    setOpenBuildCodes((p) => {
      const n = new Set(p);
      n.has(idx) ? n.delete(idx) : n.add(idx);
      return n;
    });
  }

  return (
    <>
      {lightboxImg && (
        <Lightbox onClick={() => setLightboxImg(null)}>
          <LightboxImg
            src={lightboxImg}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
          />
          <LightboxClose onClick={() => setLightboxImg(null)}>×</LightboxClose>
        </Lightbox>
      )}

      <Overlay onClick={onClose}>
        <Content onClick={(e) => e.stopPropagation()}>
          {/* ── 고정 헤더 + 탭 ── */}
          <StickyTop>
            <ModalHeader>
              <HeaderLeft>
                <ProjectTypeBadge>{project.type}</ProjectTypeBadge>
                <HeaderTitle>{project.title}</HeaderTitle>
              </HeaderLeft>
              <HeaderRight>
                {project.links
                  ?.filter((l) => l.href && l.href !== "#")
                  .map((link) => (
                    <LinkBtn
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      $primary={link.label === "Service"}
                    >
                      {link.label === "Service" ? "Site" : "GitHub"}
                      <LinkArrow>↗</LinkArrow>
                    </LinkBtn>
                  ))}
                <CloseButton type="button" onClick={onClose} aria-label="닫기">
                  ×
                </CloseButton>
              </HeaderRight>
            </ModalHeader>

            <TabNav>
              {TABS.map((tab) => (
                <TabBtn
                  key={tab.id}
                  type="button"
                  $active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabBtn>
              ))}
            </TabNav>
          </StickyTop>

          {/* ── 탭 바디 ── */}
          <TabBody key={activeTab}>
            {/* ═══════ OVERVIEW ═══════ */}
            {activeTab === "overview" && (
              <>
                {/* ① 전폭 히어로 이미지 */}
                <HeroBleed $image={project.thumbnail}>
                  {!project.thumbnail && (
                    <HeroBleedFallback>
                      <HeroBleedType>{project.type}</HeroBleedType>
                      <HeroBleedText>{project.colorText}</HeroBleedText>
                    </HeroBleedFallback>
                  )}
                  <HeroBleedGradient />
                </HeroBleed>

                {/* ② 수치 스트립 */}
                {stats.length > 0 && (
                  <StatsStrip>
                    {stats.map((s, i) => (
                      <StatItem key={i}>
                        <StatValue>{s.value}</StatValue>
                        <StatLabel>{s.label}</StatLabel>
                      </StatItem>
                    ))}
                  </StatsStrip>
                )}

                {/* ③ 한 줄 선언문 */}
                {d.statement && (
                  <StatementBlock>
                    <StatementText>{d.statement}</StatementText>
                    {features.length > 0 && (
                      <FeatureRow>
                        <FlowLabel>구현 기능</FlowLabel>
                        <FeatureChips>
                          {features.map((f) => (
                            <FeatureChip key={f}>{f}</FeatureChip>
                          ))}
                        </FeatureChips>
                      </FeatureRow>
                    )}
                    <PeriodLine>
                      <PeriodKey>기간</PeriodKey>
                      <PeriodValue>{project.period}</PeriodValue>
                      {periodDuration && (
                        <PeriodDuration>({periodDuration})</PeriodDuration>
                      )}
                    </PeriodLine>
                  </StatementBlock>
                )}

                <SectionDivider />

                {/* ④ 개요 + 도메인 */}
                {domains.length > 0 && (
                  <DomainBlock>
                    <DomainLabel>전체 서비스</DomainLabel>
                    <DomainList>
                      {domains.map((dom) => (
                        <DomainChip key={dom.name} $mine={dom.mine}>
                          {dom.mine && <DomainDot />}
                          {dom.name}
                        </DomainChip>
                      ))}
                    </DomainList>
                    <DomainHint>
                      <DomainDot /> 표시된 항목이 제가 직접 담당·구현한
                      영역입니다
                    </DomainHint>
                  </DomainBlock>
                )}

                {d.overview && <OverviewBody>{d.overview}</OverviewBody>}

                {/* ⑤ 역할 카드 */}
                {roles.length > 0 && (
                  <RoleSection>
                    <RoleSectionLabel>역할 · 담당 업무</RoleSectionLabel>
                    <RoleGrid>
                      {roles.map((role, i) => (
                        <RoleCard key={role.title}>
                          <RoleCardNum>0{i + 1}</RoleCardNum>
                          <RoleTitle>{role.title}</RoleTitle>
                          <RoleBody>{role.body}</RoleBody>
                        </RoleCard>
                      ))}
                    </RoleGrid>
                  </RoleSection>
                )}

                {/* ⑥ 스택 */}
                {stackList.length > 0 && (
                  <StackBlock>
                    <StackLabel>기술 스택</StackLabel>
                    <StackTags>
                      {stackList.map((s) => {
                        const st = getStackStyle(s);
                        return (
                          <StackTag
                            key={s}
                            $color={st.color}
                            $bg={st.bg}
                            $border={st.border}
                          >
                            {s}
                          </StackTag>
                        );
                      })}
                    </StackTags>
                  </StackBlock>
                )}
              </>
            )}

            {/* ═══════ BUILD ═══════ */}
            {activeTab === "build" && (
              <>
                <TabHeading>
                  <TabHeadTitle>주요 구현</TabHeadTitle>
                  <TabHeadSub>직접 설계하고 구현한 핵심 기능들</TabHeadSub>
                </TabHeading>

                {showcase.length > 0 && (
                  <BuildLayout>
                    {/* 좌측 메뉴 */}
                    <BuildMenu>
                      {showcase.map((item, idx) => (
                        <BuildMenuItem
                          key={item.tag}
                          type="button"
                          $active={selectedBuild === idx}
                          onClick={() => setSelectedBuild(idx)}
                        >
                          <BuildMenuNum $active={selectedBuild === idx}>
                            {item.tag}
                          </BuildMenuNum>
                          <BuildMenuTitle $active={selectedBuild === idx}>
                            {item.title}
                          </BuildMenuTitle>
                        </BuildMenuItem>
                      ))}
                    </BuildMenu>

                    {/* 우측 상세 */}
                    <BuildDetail>
                      {/* ① 헤더: 태그 + 제목 */}
                      <BDHeader>
                        <BuildDetailTag>
                          {showcase[selectedBuild].tag}
                        </BuildDetailTag>
                        <BuildDetailTitle>
                          {showcase[selectedBuild].title}
                        </BuildDetailTitle>
                      </BDHeader>

                      {/* ② 컨텍스트: 항상 전폭 */}
                      <BDContext>
                        <BuildDetailContext>
                          {showcase[selectedBuild].context}
                        </BuildDetailContext>
                      </BDContext>

                      {/* ③ 포인트(좌) + 이미지 고정 오른쪽 */}
                      <BDMid $hasImg={!!showcase[selectedBuild].image}>
                        <BuildPointList>
                          {showcase[selectedBuild].points?.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </BuildPointList>

                        {showcase[selectedBuild].image && (
                          <BDImgBtn
                            onClick={() =>
                              setLightboxImg(showcase[selectedBuild].image)
                            }
                          >
                            <BuildImg
                              src={showcase[selectedBuild].image}
                              alt={
                                showcase[selectedBuild].imageLabel ||
                                showcase[selectedBuild].title
                              }
                            />
                            <BDImgHover>확대 보기 ↗</BDImgHover>
                            {showcase[selectedBuild].imageLabel && (
                              <BDImgLabel>
                                {showcase[selectedBuild].imageLabel}
                              </BDImgLabel>
                            )}
                          </BDImgBtn>
                        )}
                      </BDMid>

                      {/* ④ 고민 + 판단 카드: 2열 */}
                      {(showcase[selectedBuild].consideration ||
                        showcase[selectedBuild].decision) && (
                        <BDCards>
                          {showcase[selectedBuild].consideration && (
                            <ConsiderationCard>
                              <ConsiderationCardLabel>
                                고민한 점
                              </ConsiderationCardLabel>
                              <ConsiderationCardText>
                                {showcase[selectedBuild].consideration}
                              </ConsiderationCardText>
                            </ConsiderationCard>
                          )}
                          {showcase[selectedBuild].decision && (
                            <DecisionCard>
                              <DecisionCardLabel>판단 이유</DecisionCardLabel>
                              <DecisionCardText>
                                {showcase[selectedBuild].decision}
                              </DecisionCardText>
                            </DecisionCard>
                          )}
                        </BDCards>
                      )}

                      {/* ⑤ 코드 */}
                      {showcase[selectedBuild].codeSnippet && (
                        <BDCode>
                          <CodeToggleArea>
                            <CodeToggleBtn
                              type="button"
                              onClick={() => toggleBuildCode(selectedBuild)}
                              $open={openBuildCodes.has(selectedBuild)}
                            >
                              <CodeToggleIcon
                                $open={openBuildCodes.has(selectedBuild)}
                              >
                                ›
                              </CodeToggleIcon>
                              {openBuildCodes.has(selectedBuild)
                                ? "코드 닫기"
                                : "핵심 코드 보기"}
                            </CodeToggleBtn>

                            <AccordionWrap
                              $open={openBuildCodes.has(selectedBuild)}
                            >
                              <AccordionInner>
                                <CodeViewer
                                  code={showcase[selectedBuild].codeSnippet}
                                  title={showcase[selectedBuild].codeTitle}
                                  language={
                                    showcase[selectedBuild].codeLanguage
                                  }
                                />
                              </AccordionInner>
                            </AccordionWrap>
                          </CodeToggleArea>
                        </BDCode>
                      )}
                    </BuildDetail>
                  </BuildLayout>
                )}
              </>
            )}

            {/* ═══════ SOLVE ═══════ */}
            {activeTab === "solve" && (
              <>
                <TabHeading>
                  <TabHeadTitle>문제 해결</TabHeadTitle>
                  <TabHeadSub>마주친 문제, 고민, 그리고 선택한 방법</TabHeadSub>
                </TabHeading>

                <ChallengeList>
                  {troubles.map((t, idx) => {
                    const isOpen = openChallenges.has(idx);
                    const codeOpen = openCodes.has(idx);
                    return (
                      <ChallengeItem key={idx} $open={isOpen}>
                        <ChallengeBtn
                          type="button"
                          onClick={() => toggleChallenge(idx)}
                          $open={isOpen}
                        >
                          <ChallengeBtnLeft>
                            <ChallengeNum $open={isOpen}>
                              0{idx + 1}
                            </ChallengeNum>
                            <ChallengeBtnText>
                              <ChallengeTitle>{t.title}</ChallengeTitle>
                              {t.keyTerm && (
                                <KeyTermChip>{t.keyTerm}</KeyTermChip>
                              )}
                            </ChallengeBtnText>
                          </ChallengeBtnLeft>
                          <ChevronIcon $open={isOpen}>›</ChevronIcon>
                        </ChallengeBtn>

                        <AccordionWrap $open={isOpen}>
                          <AccordionInner>
                            <ChallengeBody>
                              {/* 서사 흐름: 문제 → 고민 → 해결 */}
                              <NarrativeTrack>
                                <NarrativeStep $type="problem">
                                  <NarrativeStepLabel $type="problem">
                                    문제
                                  </NarrativeStepLabel>
                                  {t.problemTitle && (
                                    <NarrativeStepTitle>
                                      {t.problemTitle}
                                    </NarrativeStepTitle>
                                  )}
                                  <NarrativeStepBody>
                                    {t.problem}
                                  </NarrativeStepBody>
                                </NarrativeStep>

                                {t.consideration && (
                                  <NarrativeStep $type="consideration">
                                    <NarrativeStepLabel $type="consideration">
                                      고민
                                    </NarrativeStepLabel>
                                    {t.considerationTitle && (
                                      <NarrativeStepTitle>
                                        {t.considerationTitle}
                                      </NarrativeStepTitle>
                                    )}
                                    <NarrativeStepBody>
                                      {t.consideration}
                                    </NarrativeStepBody>
                                  </NarrativeStep>
                                )}

                                <NarrativeStep $type="solution">
                                  <NarrativeStepLabel $type="solution">
                                    해결
                                  </NarrativeStepLabel>
                                  {t.solutionTitle && (
                                    <NarrativeStepTitle>
                                      {t.solutionTitle}
                                    </NarrativeStepTitle>
                                  )}
                                  <NarrativeStepBody $bright>
                                    {t.solution}
                                  </NarrativeStepBody>
                                </NarrativeStep>
                              </NarrativeTrack>

                              {/* 수치 비교 */}
                              {t.metrics && (
                                <MetricsCard>
                                  <MetricsCardLabel>
                                    {t.metrics.label}
                                  </MetricsCardLabel>
                                  <MetricsCompare>
                                    <MetricBox>
                                      <MetricBig>
                                        {t.metrics.before.value}
                                      </MetricBig>
                                      <MetricSub>
                                        {t.metrics.before.sub}
                                      </MetricSub>
                                    </MetricBox>
                                    <MetricsArrowWrap>→</MetricsArrowWrap>
                                    <MetricBox $after>
                                      <MetricBig $after>
                                        {t.metrics.after.value}
                                      </MetricBig>
                                      <MetricSub $after>
                                        {t.metrics.after.sub}
                                      </MetricSub>
                                    </MetricBox>
                                  </MetricsCompare>
                                  {t.metrics.note && (
                                    <MetricsNote>{t.metrics.note}</MetricsNote>
                                  )}
                                </MetricsCard>
                              )}

                              {/* 코드 */}
                              {t.codeSnippet && (
                                <CodeToggleArea>
                                  <CodeToggleBtn
                                    type="button"
                                    onClick={() => toggleCode(idx)}
                                    $open={codeOpen}
                                  >
                                    <CodeToggleIcon $open={codeOpen}>
                                      ›
                                    </CodeToggleIcon>
                                    {codeOpen ? "코드 닫기" : "코드 보기"}
                                  </CodeToggleBtn>
                                  <AccordionWrap $open={codeOpen}>
                                    <AccordionInner>
                                      <CodeViewer code={t.codeSnippet} />
                                    </AccordionInner>
                                  </AccordionWrap>
                                </CodeToggleArea>
                              )}
                            </ChallengeBody>
                          </AccordionInner>
                        </AccordionWrap>
                      </ChallengeItem>
                    );
                  })}
                </ChallengeList>
              </>
            )}

            {/* ═══════ REFLECT ═══════ */}
            {activeTab === "reflect" && (
              <ReflectWrap>
                {/* 팀 리더십 */}
                {leadership && (
                  <LeaderCard>
                    <LeaderCardHead>
                      <LeaderLabel>TEAM LEAD</LeaderLabel>
                      <LeaderTitle>{leadership.title}</LeaderTitle>
                      <LeaderStatement>{leadership.statement}</LeaderStatement>
                    </LeaderCardHead>
                    <LeaderGrid>
                      {leadership.items?.map((item, i) => (
                        <LeaderItem key={item.title}>
                          <LeaderItemNum>0{i + 1}</LeaderItemNum>
                          <LeaderItemTitle>{item.title}</LeaderItemTitle>
                          <LeaderItemBody>{item.body}</LeaderItemBody>
                        </LeaderItem>
                      ))}
                    </LeaderGrid>
                  </LeaderCard>
                )}

                {/* 배운 점 */}
                {reflect.learned?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionTitle>
                      기능을 만들며 배운 점
                    </ReflectSectionTitle>
                    <LearnedGrid>
                      {reflect.learned.map((item, i) => {
                        const cat =
                          REFLECT_CATS[item.tag] ?? REFLECT_CATS.DEFAULT;
                        return (
                          <LearnedCard key={i} $color={cat.color}>
                            <LearnedNum $color={cat.color}>0{i + 1}</LearnedNum>
                            <LearnedContent>
                              <LearnedTitle>{item.title}</LearnedTitle>
                              <LearnedBody>{item.body}</LearnedBody>
                            </LearnedContent>
                          </LearnedCard>
                        );
                      })}
                    </LearnedGrid>
                  </ReflectSection>
                )}

                {/* 다시 만든다면 */}
                {reflect.wouldDoDifferently?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionTitle>다시 만든다면</ReflectSectionTitle>
                    <WouldDoGrid>
                      {reflect.wouldDoDifferently.map((item, i) => (
                        <WouldDoCard key={i}>
                          {typeof item !== "string" && (
                            <WouldDoTitle>{item.title}</WouldDoTitle>
                          )}
                          <WouldDoBody>
                            {typeof item === "string" ? item : item.body}
                          </WouldDoBody>
                        </WouldDoCard>
                      ))}
                    </WouldDoGrid>
                  </ReflectSection>
                )}

                {/* 마치며 */}
                {reflect.closing && (
                  <ClosingBlock>
                    <ClosingDeco aria-hidden="true">"</ClosingDeco>
                    <ClosingLabel>프로젝트를 마치며</ClosingLabel>
                    <ClosingText>{reflect.closing}</ClosingText>
                  </ClosingBlock>
                )}
              </ReflectWrap>
            )}
          </TabBody>
        </Content>
      </Overlay>
    </>
  );
}

/* ══════════════════════════════════
   ANIMATIONS
══════════════════════════════════ */

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const slideIn = keyframes`
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}`;

/* ══════════════════════════════════
   LIGHTBOX
══════════════════════════════════ */

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(3, 5, 12, 0.94);
  backdrop-filter: blur(28px);
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease;
`;
const LightboxImg = styled.img`
  max-width: min(1100px, 100%);
  max-height: 88vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 48px 120px rgba(0, 0, 0, 0.7);
  cursor: default;
`;
const LightboxClose = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 22px;
  font-weight: 300;
  cursor: pointer;
  transition:
    background 0.18s,
    transform 0.22s;
  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: rotate(90deg);
  }
`;

/* ══════════════════════════════════
   OVERLAY & MODAL
══════════════════════════════════ */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(10px, 2vw, 32px);
  background: rgba(4, 7, 16, 0.78);
  backdrop-filter: blur(14px);
  animation: ${fadeIn} 0.2s ease;
`;

const Content = styled.article`
  position: relative;
  width: min(1200px, 100%);
  height: min(920px, 95vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 20px;
  background: #f4f2ef;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 40px 100px rgba(0, 0, 0, 0.4),
    0 80px 160px rgba(0, 0, 0, 0.2);
`;

/* ══════════════════════════════════
   STICKY TOP (dark)
══════════════════════════════════ */

const StickyTop = styled.div`
  flex-shrink: 0;
  background: #111927;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const ModalHeader = styled.div`
  min-height: 84px;
  padding: 20px 30px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 720px) {
    align-items: flex-start;
    padding: 18px 20px 14px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

const ProjectTypeBadge = styled.span`
  color: rgba(202, 178, 168, 0.6);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  color: #f0ede8;
  font-size: clamp(22px, 2vw, 32px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.06em;
`;

const HeaderRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 720px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const LinkArrow = styled.span`
  color: inherit;
  font-size: 12px;
  opacity: 0.8;
  display: inline-block;
  transition: transform 0.18s;
`;

const LinkBtn = styled.a`
  height: 38px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ $primary }) =>
    $primary
      ? css`
          background: #cbb2a8;
          border: 1px solid #cbb2a8;
          color: #1a1410;
          box-shadow: 0 6px 18px rgba(203, 178, 168, 0.32);
          &:hover {
            background: #d8c2b9;
            border-color: #d8c2b9;
            transform: translateY(-2px);
          }
        `
      : css`
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.13);
          color: rgba(240, 237, 232, 0.85);
          &:hover {
            background: rgba(255, 255, 255, 0.13);
            border-color: rgba(255, 255, 255, 0.22);
            transform: translateY(-2px);
          }
        `}

  &:hover ${LinkArrow} {
    transform: translate(2px, -2px);
  }
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 22px;
  font-weight: 300;
  cursor: pointer;
  transition:
    background 0.18s,
    transform 0.24s,
    color 0.18s;
  &:hover {
    background: rgba(202, 178, 168, 0.18);
    color: #f0ede8;
    transform: rotate(90deg);
  }
`;

const TabNav = styled.nav`
  display: flex;
  align-items: stretch;
  padding: 0 30px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 560px) {
    padding: 0 16px;
  }
`;

const TabBtn = styled.button`
  position: relative;
  min-width: 84px;
  height: 50px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  letter-spacing: -0.02em;
  color: ${({ $active }) =>
    $active ? "rgba(240,237,232,0.96)" : "rgba(240,237,232,0.38)"};
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    width: calc(100% - 24px);
    height: 2px;
    border-radius: 1px;
    background: linear-gradient(
      90deg,
      rgba(202, 178, 168, 0.3),
      #cbb2a8,
      rgba(202, 178, 168, 0.3)
    );
    box-shadow: 0 0 8px rgba(202, 178, 168, 0.45);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  &:hover {
    color: rgba(240, 237, 232, 0.75);
  }
  @media (max-width: 560px) {
    min-width: 72px;
    padding: 0 12px;
    font-size: 13px;
  }
`;

/* ══════════════════════════════════
   TAB BODY
══════════════════════════════════ */

const TabBody = styled.div`
  flex: 1;
  overflow-y: auto;
  color: #1a2232;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.12);
  }
`;

/* ══════════════════════════════════
   OVERVIEW — 전폭 히어로
══════════════════════════════════ */

const HeroBleed = styled.div`
  position: relative;
  width: 100%;
  height: clamp(200px, 32vh, 340px);
  overflow: hidden;
  background: ${({ $image }) =>
    $image
      ? `url(${$image}) center top/cover no-repeat`
      : `linear-gradient(140deg,rgba(37,64,122,0.88),rgba(116,130,189,0.38))`};
`;

const HeroBleedGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 30%,
    rgba(244, 242, 239, 0.72) 88%,
    #f4f2ef 100%
  );
`;

const HeroBleedFallback = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
`;
const HeroBleedType = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin-bottom: 6px;
`;
const HeroBleedText = styled.strong`
  color: rgba(255, 255, 255, 0.85);
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(52px, 8vw, 110px);
  font-weight: normal;
  line-height: 0.9;
  letter-spacing: -0.08em;
`;

/* ── Stats ── */

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  padding: 22px 24px 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  &:last-child {
    border-right: none;
  }
`;

const StatValue = styled.strong`
  display: block;
  color: #141c2e;
  font-size: clamp(26px, 2.5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  margin-bottom: 6px;
`;

const StatLabel = styled.span`
  color: #8892a4;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

/* ── Statement ── */

const StatementBlock = styled.div`
  padding: 36px clamp(24px, 4vw, 52px) 0;
  display: grid;
  gap: 18px;
  max-width: 900px;
  animation: ${slideIn} 0.3s ease;
`;

const StatementText = styled.p`
  margin: 0;
  color: #141c2e;
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.055em;
  word-break: keep-all;
`;

const FeatureRow = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px 10px;
`;

const FlowLabel = styled.span`
  flex-shrink: 0;
  padding-top: 5px;
  color: #8892a4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FeatureChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

const FeatureChip = styled.span`
  padding: 5px 11px;
  border-radius: 8px;
  background: #edf0f7;
  border: 1px solid #d5daea;
  color: #3f568f;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const PeriodLine = styled.p`
  margin: 2px 0 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  color: #4b566e;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.02em;
`;

const PeriodKey = styled.span`
  color: #8892a4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  &::after {
    content: ":";
    margin-left: 6px;
  }
`;

const PeriodValue = styled.strong`
  color: #141c2e;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const PeriodDuration = styled.span`
  color: #8a7268;
  font-size: 13px;
  font-weight: 600;
`;

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin: 28px clamp(24px, 4vw, 52px) 0;
`;

/* ── Domain ── */

const DomainBlock = styled.div`
  padding: 22px clamp(24px, 4vw, 52px) 0;
  display: grid;
  gap: 12px;
`;

const DomainLabel = styled.p`
  margin: 0;
  color: #8892a4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const DomainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const DomainChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: ${({ $mine }) => ($mine ? "700" : "400")};
  ${({ $mine }) =>
    $mine
      ? css`
          background: #f1e9e5;
          border: 1px solid #d0b0a6;
          color: #7a4a42;
        `
      : css`
          background: #f3f4f6;
          border: 1px solid #e0e2e6;
          color: #8a909b;
        `}
`;

const DomainDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a47369;
  flex-shrink: 0;
`;

const DomainHint = styled.p`
  margin: 2px 0 0;
  display: flex;
  align-items: center;
  gap: 7px;
  color: #9298a6;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

/* ── Overview body ── */

const OverviewBody = styled.p`
  padding: 22px clamp(24px, 4vw, 52px) 0;
  margin: 0;
  max-width: 860px;
  color: #4b566e;
  font-size: clamp(15px, 1.1vw, 17px);
  font-weight: 400;
  line-height: 1.88;
  letter-spacing: -0.022em;
`;

/* ── Role cards ── */

const RoleSection = styled.section`
  padding: 28px clamp(24px, 4vw, 52px) 0;
  display: grid;
  gap: 14px;
`;

const RoleSectionLabel = styled.p`
  margin: 0;
  color: #141c2e;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.article`
  padding: 18px 20px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

const RoleCardNum = styled.span`
  position: absolute;
  right: 14px;
  top: 12px;
  color: rgba(0, 0, 0, 0.06);
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
`;

const RoleTitle = styled.h4`
  margin: 0 0 8px;
  color: #7a4a42;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const RoleBody = styled.p`
  margin: 0;
  color: #4b566e;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: -0.02em;
`;

/* ── Stack ── */

const StackBlock = styled.div`
  padding: 24px clamp(24px, 4vw, 52px) 48px;
  display: grid;
  gap: 12px;
`;

const StackLabel = styled.p`
  margin: 0;
  color: #8892a4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StackTag = styled.span`
  height: 27px;
  padding: 0 11px;
  display: inline-flex;
  align-items: center;
  border-radius: 7px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 600;
`;

/* ══════════════════════════════════
   BUILD TAB
══════════════════════════════════ */

const TabHeading = styled.div`
  padding: 32px clamp(24px, 4vw, 52px) 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
`;

const TabHeadTitle = styled.h3`
  margin: 0 0 6px;
  color: #141c2e;
  font-size: clamp(22px, 1.8vw, 28px);
  font-weight: 700;
  letter-spacing: -0.06em;
`;

const TabHeadSub = styled.p`
  margin: 0;
  color: #8892a4;
  font-size: 13.5px;
  font-weight: 400;
  letter-spacing: -0.02em;
`;

const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 0;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const BuildMenu = styled.div`
  padding: 16px 12px;
  border-right: 1px solid rgba(0, 0, 0, 0.07);
  background: #faf9f7;
  display: grid;
  gap: 4px;
  align-content: start;
`;

const BuildMenuItem = styled.button`
  width: 100%;
  min-height: 58px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? "#d0b5ac" : "transparent")};
  border-left: ${({ $active }) =>
    $active ? "3px solid #a47369" : "3px solid transparent"};
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  box-shadow: ${({ $active }) =>
    $active ? "0 2px 8px rgba(0,0,0,0.08)" : "none"};
  transition: all 0.2s;
  &:hover {
    background: #fff;
    border-color: rgba(0, 0, 0, 0.08);
  }
`;

const BuildMenuNum = styled.span`
  color: ${({ $active }) => ($active ? "#a47369" : "#b0b8c8")};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const BuildMenuTitle = styled.span`
  color: ${({ $active }) => ($active ? "#141c2e" : "#6b7693")};
  font-size: 13.5px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  line-height: 1.4;
  letter-spacing: -0.025em;
`;

const BuildDetail = styled.section`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

/* ══════════════════════════════════
   BUILD TAB — 새 레이아웃 컴포넌트
══════════════════════════════════ */

/* ① 헤더 */
const BDHeader = styled.div`
  padding: 24px 28px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

/* ② 컨텍스트 전폭 */
const BDContext = styled.div`
  padding: 18px 28px 0;
`;

/* ③ 포인트(좌) + 이미지(우) */
const BDMid = styled.div`
  margin-top: 16px;
  padding: 0 28px;
  display: grid;
  gap: 20px;
  align-items: start;

  grid-template-columns: ${({ $hasImg }) =>
    $hasImg ? "1fr 280px" : "1fr"};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

/* 이미지 버튼 — 항상 오른쪽 열 */
const BDImgBtn = styled.button`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: zoom-in;
  line-height: 0;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.06),
    0 6px 20px rgba(0, 0, 0, 0.08);
  align-self: start;
  transition:
    box-shadow 0.28s ease,
    transform 0.28s ease;

  &:hover {
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.12),
      0 14px 36px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

/* 이미지 — 세로 240px 고정 */
const BuildImg = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);

  ${BDImgBtn}:hover & {
    transform: scale(1.04);
  }
`;

/* hover 텍스트 — 버튼 없이 심플하게 */
const BDImgHover = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 16, 30, 0.36);
  color: rgba(255, 255, 255, 0.88);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 0;
  transition: opacity 0.2s;

  ${BDImgBtn}:hover & {
    opacity: 1;
  }
`;

const BDImgLabel = styled.span`
  position: absolute;
  bottom: 8px;
  left: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

/* ④ 고민 + 판단 2열 */
const BDCards = styled.div`
  margin-top: 16px;
  padding: 0 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

/* ⑤ 코드 */
const BDCode = styled.div`
  padding: 0 28px 48px;
  margin-top: 20px;
`;

const BuildDetailInner = styled.div`
  padding: 26px 28px 48px;
`;

const BuildDetailTag = styled.span`
  display: block;
  margin-bottom: 10px;
  color: #a47369;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
`;

const BuildDetailTitle = styled.h4`
  margin: 0 0 14px;
  color: #141c2e;
  font-size: clamp(20px, 1.6vw, 26px);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.22;
`;

const BuildDetailContext = styled.p`
  margin: 0;
  color: #4b566e;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.85;
  letter-spacing: -0.022em;
`;

const BuildPointList = styled.ul`
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
  li {
    position: relative;
    padding-left: 16px;
    color: #596173;
    font-size: 14.5px;
    font-weight: 400;
    line-height: 1.7;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 7px;
      height: 1.5px;
      background: #a47369;
      border-radius: 1px;
    }
  }
`;

const ConsiderationCard = styled.div`
  padding: 16px 18px;
  border-radius: 10px;
  background: #f6f8fd;
  border: 1px solid #d2daea;
  border-left: 3px solid #7090c0;
`;

const ConsiderationCardLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  color: #4c6ab0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ConsiderationCardText = styled.p`
  margin: 0;
  color: #3a4e6e;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: -0.02em;
`;

const DecisionCard = styled.div`
  padding: 16px 18px;
  border-radius: 10px;
  background: #fdf8f6;
  border: 1px solid #e8d8d2;
  border-left: 3px solid #b08078;
`;

const DecisionCardLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  color: #a47369;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const DecisionCardText = styled.p`
  margin: 0;
  color: #5a4a46;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: -0.02em;
`;

/* ── Code toggle ── */

const CodeToggleArea = styled.div`
  margin-top: 16px;
  display: grid;
  gap: 8px;
`;

const CodeToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border-radius: 8px;
  background: #f0ede8;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #4b566e;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition:
    background 0.18s,
    color 0.18s,
    border-color 0.18s;
  &:hover {
    background: #e8e4dd;
    border-color: rgba(0, 0, 0, 0.15);
    color: #141c2e;
  }
`;

const CodeToggleIcon = styled.span`
  font-size: 16px;
  font-weight: 300;
  display: inline-block;
  line-height: 1;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.22s;
`;

/* ── Accordion ── */

const AccordionWrap = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AccordionInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

/* ══════════════════════════════════
   SOLVE TAB
══════════════════════════════════ */

const ChallengeList = styled.div`
  padding: 20px clamp(24px, 4vw, 52px) 48px;
  display: grid;
  gap: 10px;
`;

const ChallengeItem = styled.div`
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${({ $open }) => ($open ? "#d0b5ac" : "rgba(0,0,0,0.08)")};
  background: ${({ $open }) => ($open ? "#fff" : "#faf9f7")};
  box-shadow: ${({ $open }) =>
    $open ? "0 4px 20px rgba(0,0,0,0.08)" : "none"};
  transition:
    border-color 0.28s,
    background 0.28s,
    box-shadow 0.28s;
  &:hover {
    border-color: ${({ $open }) => ($open ? "#d0b5ac" : "rgba(0,0,0,0.13)")};
  }
`;

const ChallengeBtn = styled.button`
  width: 100%;
  min-height: 78px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const ChallengeBtnLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
`;

const ChallengeNum = styled.span`
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ $open }) => ($open ? "#f1e8e5" : "#f0ede8")};
  border: 1px solid ${({ $open }) => ($open ? "#ccada4" : "rgba(0,0,0,0.08)")};
  color: ${({ $open }) => ($open ? "#7a4a42" : "#8892a4")};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
`;

const ChallengeBtnText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

const ChallengeTitle = styled.h4`
  margin: 0;
  color: #141c2e;
  font-size: clamp(15px, 1.2vw, 19px);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.04em;
`;

const KeyTermChip = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: 2px 9px;
  border-radius: 5px;
  background: #eef0f8;
  border: 1px solid #d0d5e8;
  color: #4c6ab0;
  font-size: 11.5px;
  font-weight: 700;
  font-family: "SFMono-Regular", "Consolas", monospace;
  letter-spacing: 0.01em;
`;

const ChevronIcon = styled.span`
  flex-shrink: 0;
  color: #b0b8c8;
  font-size: 22px;
  line-height: 1;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s;
  ${ChallengeItem}:hover & {
    color: #7a8498;
  }
`;

/* ── Narrative (수직 타임라인) ── */

const ChallengeBody = styled.div`
  padding: 4px 22px 28px;
  display: grid;
  gap: 16px;
  @media (max-width: 640px) {
    padding: 4px 14px 22px;
  }
`;

const NarrativeTrack = styled.div`
  position: relative;
  display: grid;
  gap: 0;
  padding-left: 40px;

  /* 수직 레일 */
  &::before {
    content: "";
    position: absolute;
    left: 12px;
    top: 22px;
    bottom: 8px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(
      180deg,
      rgba(195, 80, 70, 0.5) 0%,
      rgba(100, 130, 210, 0.4) 50%,
      rgba(50, 150, 85, 0.55) 100%
    );
  }
`;

const NarrativeStep = styled.div`
  position: relative;
  display: grid;
  gap: 7px;
  padding: 0 0 26px;
  &:last-child {
    padding-bottom: 0;
  }

  /* 컬러 원형 도트 */
  &::before {
    content: "";
    position: absolute;
    left: -37px;
    top: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ $type }) =>
      $type === "problem"
        ? "#c85050"
        : $type === "consideration"
          ? "#4e6dc0"
          : "#3a9d62"};
    border: 3px solid #f4f2ef;
    box-shadow: 0 0 0 1.5px
      ${({ $type }) =>
        $type === "problem"
          ? "rgba(200,80,80,0.38)"
          : $type === "consideration"
            ? "rgba(78,109,192,0.38)"
            : "rgba(58,157,98,0.38)"};
  }
`;

const NarrativeStepLabel = styled.span`
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  line-height: 1;
  color: ${({ $type }) =>
    $type === "problem"
      ? "#b03838"
      : $type === "consideration"
        ? "#3d5aaa"
        : "#278048"};
`;

const NarrativeStepTitle = styled.h5`
  margin: 0;
  color: #1a2232;
  font-size: clamp(15px, 1.15vw, 17.5px);
  font-weight: 700;
  line-height: 1.38;
  letter-spacing: -0.04em;
`;

const NarrativeStepBody = styled.p`
  margin: 0;
  color: ${({ $bright }) => ($bright ? "#1e2e44" : "#596070")};
  font-size: 14.5px;
  font-weight: ${({ $bright }) => ($bright ? "500" : "400")};
  line-height: 1.78;
  letter-spacing: -0.022em;
`;

/* ── Metrics ── */

const MetricsCard = styled.div`
  padding: 20px 22px;
  border-radius: 14px;
  background: #f7f8fc;
  border: 1px solid #dde1ee;
  display: grid;
  gap: 14px;
`;

const MetricsCardLabel = styled.p`
  margin: 0;
  color: #6070a0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MetricsCompare = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 32px);
  flex-wrap: wrap;
`;

const MetricBox = styled.div`
  display: grid;
  gap: 4px;
  opacity: ${({ $after }) => ($after ? 1 : 0.55)};
`;

const MetricBig = styled.strong`
  font-size: clamp(24px, 2.2vw, 36px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: ${({ $after }) => ($after ? "#4c6ab0" : "#1a2232")};
`;

const MetricSub = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ $after }) => ($after ? "#5a6fa0" : "#8892a4")};
`;

const MetricsArrowWrap = styled.span`
  font-size: 20px;
  color: #c0c7d6;
  flex-shrink: 0;
`;

const MetricsNote = styled.p`
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid #dde1ee;
  color: #8892a4;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
`;

/* ══════════════════════════════════
   REFLECT TAB
══════════════════════════════════ */

const ReflectWrap = styled.div`
  padding: 32px clamp(24px, 4vw, 52px) 64px;
  display: grid;
  gap: 36px;
  animation: ${slideIn} 0.3s ease;
`;

/* ── Leadership ── */

const LeaderCard = styled.section`
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const LeaderCardHead = styled.div`
  padding: clamp(22px, 3.5vw, 36px);
  background: linear-gradient(135deg, #141c2e 0%, #1e2b3e 100%);
`;

const LeaderLabel = styled.span`
  display: block;
  margin-bottom: 10px;
  color: rgba(202, 178, 168, 0.65);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const LeaderTitle = styled.h3`
  margin: 0;
  color: #f0ede8;
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 700;
  letter-spacing: -0.055em;
`;

const LeaderStatement = styled.p`
  margin: 12px 0 0;
  color: rgba(240, 237, 232, 0.58);
  font-size: clamp(14px, 1.05vw, 15.5px);
  font-weight: 300;
  line-height: 1.78;
  letter-spacing: -0.025em;
`;

const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  background: #fff;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const LeaderItem = styled.article`
  padding: 22px;
  border-right: 1px solid rgba(0, 0, 0, 0.07);
  &:last-child {
    border-right: none;
  }
  @media (max-width: 760px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    &:last-child {
      border-bottom: none;
    }
  }
`;

const LeaderItemNum = styled.span`
  display: block;
  margin-bottom: 14px;
  color: #c4a89e;
  font-size: 11px;
  font-weight: 800;
`;

const LeaderItemTitle = styled.h4`
  margin: 0 0 8px;
  color: #141c2e;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const LeaderItemBody = styled.p`
  margin: 0;
  color: #4b566e;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.76;
  letter-spacing: -0.02em;
`;

/* ── Reflect sections ── */

const ReflectSection = styled.div`
  display: grid;
  gap: 16px;
`;

const ReflectSectionTitle = styled.h3`
  margin: 0;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  color: #141c2e;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.045em;
`;

/* ── Learned ── */

const LearnedGrid = styled.div`
  display: grid;
  gap: 9px;
`;

const LearnedCard = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  align-items: start;
  padding: 18px 20px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 3px solid ${({ $color }) => $color};
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  }
`;

const LearnedNum = styled.span`
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  opacity: 0.6;
  padding-top: 3px;
`;

const LearnedContent = styled.div`
  display: grid;
  gap: 8px;
  min-width: 0;
`;

const LearnedTitle = styled.h5`
  margin: 0;
  color: #141c2e;
  font-size: clamp(15.5px, 1.15vw, 18px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.04em;
`;

const LearnedBody = styled.p`
  margin: 0;
  color: #4b566e;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.78;
  letter-spacing: -0.022em;
`;

/* ── Would Do ── */

const WouldDoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const WouldDoCard = styled.div`
  padding: 18px;
  border-radius: 13px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 8px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
  }
`;

const WouldDoTitle = styled.h5`
  margin: 0;
  color: #141c2e;
  font-size: clamp(15px, 1.05vw, 16.5px);
  font-weight: 700;
  line-height: 1.32;
  letter-spacing: -0.038em;
`;

const WouldDoBody = styled.p`
  margin: 0;
  color: #5a6475;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: -0.018em;
`;

/* ── Closing ── */

const ClosingBlock = styled.div`
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 4vw, 44px);
  border-radius: 18px;
  background: linear-gradient(135deg, #f0ebe7 0%, #ebe8e3 100%);
  border: 1px solid #ddd4cf;
  border-left: 4px solid #b08078;
`;

const ClosingDeco = styled.span`
  position: absolute;
  right: 20px;
  top: -20px;
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(100px, 14vw, 180px);
  font-weight: normal;
  color: rgba(160, 120, 110, 0.1);
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const ClosingLabel = styled.span`
  display: block;
  margin-bottom: 14px;
  color: #a07068;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ClosingText = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 880px;
  color: #3a2e2c;
  font-size: clamp(17px, 1.5vw, 22px);
  font-weight: 600;
  line-height: 1.68;
  letter-spacing: -0.04em;
`;
