import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

const TABS = [
  { id: "overview", label: "개요" },
  { id: "build",    label: "구현" },
  { id: "solve",    label: "문제 해결" },
  { id: "reflect",  label: "회고" },
];

const STACK_CATS = {
  frontend: {
    color: "#8fa0e0", bg: "rgba(116,130,189,0.12)", border: "rgba(116,130,189,0.24)",
    keys: new Set(["React","JavaScript","styled-components","HTML","CSS","Axios"]),
  },
  backend: {
    color: "#86c97a", bg: "rgba(134,201,122,0.1)", border: "rgba(134,201,122,0.22)",
    keys: new Set(["Spring Boot","Spring Security","Spring Data JPA","JWT","Java","JSP & Servlet","MyBatis"]),
  },
  infra: {
    color: "#c9b08a", bg: "rgba(201,176,138,0.1)", border: "rgba(201,176,138,0.22)",
    keys: new Set(["PostgreSQL","Oracle","AWS EC2","AWS RDS","AWS S3"]),
  },
  payment: {
    color: "#e8c060", bg: "rgba(232,192,96,0.1)", border: "rgba(232,192,96,0.22)",
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
  DEPLOYMENT:    { color: "#e8b86e", bg: "rgba(232,184,110,0.09)", border: "rgba(232,184,110,0.22)" },
  ARCHITECTURE:  { color: "#8fa0e0", bg: "rgba(143,160,224,0.09)", border: "rgba(143,160,224,0.22)" },
  FRONTEND:      { color: "#6fc9b8", bg: "rgba(111,201,184,0.09)", border: "rgba(111,201,184,0.22)" },
  COLLABORATION: { color: "#d4897a", bg: "rgba(212,137,122,0.09)", border: "rgba(212,137,122,0.22)" },
  SPA:           { color: "#a17ed8", bg: "rgba(161,126,216,0.09)", border: "rgba(161,126,216,0.22)" },
  PERFORMANCE:   { color: "#e07a5a", bg: "rgba(224,122,90,0.09)",  border: "rgba(224,122,90,0.22)"  },
  FEATURE:       { color: "#7ab87a", bg: "rgba(122,184,122,0.09)", border: "rgba(122,184,122,0.22)" },
  INFRA:         { color: "#c9a44a", bg: "rgba(201,164,74,0.09)",  border: "rgba(201,164,74,0.22)"  },
  DOMAIN:        { color: "#c97ab0", bg: "rgba(201,122,176,0.09)", border: "rgba(201,122,176,0.22)" },
  DEFAULT:       { color: "rgba(202,178,168,0.8)", bg: "rgba(202,178,168,0.08)", border: "rgba(202,178,168,0.2)" },
};

export default function ProjectModal({ project, onClose }) {
  const [activeTab,       setActiveTab]       = useState("overview");
  const [openChallenges,  setOpenChallenges]  = useState(new Set());
  const [openCodes,       setOpenCodes]       = useState(new Set());
  const [openBuildCodes,  setOpenBuildCodes]  = useState(new Set());
  const [selectedBuild,   setSelectedBuild]   = useState(0);
  const [lightboxImg,     setLightboxImg]     = useState(null);
  const lightboxRef = useRef(null);

  useEffect(() => { lightboxRef.current = lightboxImg; }, [lightboxImg]);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxRef.current) { setLightboxImg(null); }
      else { onClose(); }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [project, onClose]);

  if (!project) return null;

  const d         = project.detail ?? {};
  const flowLine  = d.flowLine       ?? [];
  const showcase  = d.showcase       ?? [];
  const troubles  = d.troubles       ?? [];
  const stats     = d.stats          ?? [];
  const domains   = d.serviceDomains ?? [];
  const roles     = d.roleHighlights ?? [];
  const reflect   = d.reflect        ?? {};
  const leadership = reflect.leadership ?? null;
  const stackList = project.stack    ?? [];

  function toggleChallenge(idx) {
    setOpenChallenges((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }
  function toggleCode(idx) {
    setOpenCodes((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }
  function toggleBuildCode(idx) {
    setOpenBuildCodes((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  return (
    <>
      {/* ── 이미지 라이트박스 ── */}
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
                  ?.filter((link) => link.href && link.href !== "#")
                  .map((link) => (
                  <LinkBtn key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label === "Service" ? "사이트 보기" : "GitHub"} <span>↗</span>
                  </LinkBtn>
                ))}
                <CloseButton type="button" onClick={onClose} aria-label="닫기">×</CloseButton>
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
          <TabBody>

            {/* ═══════════ OVERVIEW ═══════════ */}
            {activeTab === "overview" && (
              <>
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

                <Hero>
                  <Thumbnail $image={project.thumbnail}>
                    {!project.thumbnail && (
                      <ThumbnailFallback>
                        <span>{project.type}</span>
                        <strong>{project.colorText}</strong>
                      </ThumbnailFallback>
                    )}
                  </Thumbnail>
                  <HeroText>
                    <HeroStatement>{d.statement}</HeroStatement>
                    {flowLine.length > 0 && (
                      <FlowRow>
                        <FlowLabel>담당 흐름</FlowLabel>
                        <FlowSteps>
                          {flowLine.map((step, i) => (
                            <FlowGroup key={step}>
                              <FlowStep>{step}</FlowStep>
                              {i < flowLine.length - 1 && <FlowArrow>→</FlowArrow>}
                            </FlowGroup>
                          ))}
                        </FlowSteps>
                      </FlowRow>
                    )}
                    <HeroMeta>
                      <HeroPill>{project.period}</HeroPill>
                      <HeroPill>{project.role}</HeroPill>
                    </HeroMeta>
                  </HeroText>
                </Hero>

                {domains.length > 0 && (
                  <DomainBlock>
                    <DomainLabel>서비스 내 내 담당 영역</DomainLabel>
                    <DomainList>
                      {domains.map((dom) => (
                        <DomainChip key={dom.name} $mine={dom.mine}>
                          {dom.mine && <DomainDot />}
                          {dom.name}
                        </DomainChip>
                      ))}
                    </DomainList>
                  </DomainBlock>
                )}

                {d.overview && <OverviewBody>{d.overview}</OverviewBody>}

                {roles.length > 0 && (
                  <RoleSection>
                    <RoleSectionTitle>프로젝트에서 맡은 역할</RoleSectionTitle>
                    <RoleGrid>
                      {roles.map((role) => (
                        <RoleCard key={role.title}>
                          <RoleTitle>{role.title}</RoleTitle>
                          <RoleBody>{role.body}</RoleBody>
                        </RoleCard>
                      ))}
                    </RoleGrid>
                  </RoleSection>
                )}

                {stackList.length > 0 && (
                  <StackBlock>
                    <StackTags>
                      {stackList.map((s) => {
                        const st = getStackStyle(s);
                        return (
                          <StackTag key={s} $color={st.color} $bg={st.bg} $border={st.border}>{s}</StackTag>
                        );
                      })}
                    </StackTags>
                  </StackBlock>
                )}
              </>
            )}

            {/* ═══════════ BUILD ═══════════ */}
            {activeTab === "build" && (
              <>
                <TabIntro>
                  <TabIntroTitle>주요 구현</TabIntroTitle>
                </TabIntro>
                {showcase.length > 0 && (
                  <BuildLayout>
                    <BuildMenu>
                      {showcase.map((item, idx) => (
                        <BuildMenuButton
                          key={item.tag}
                          type="button"
                          $active={selectedBuild === idx}
                          onClick={() => setSelectedBuild(idx)}
                        >
                          <span>{item.tag}</span>
                          <strong>{item.title}</strong>
                        </BuildMenuButton>
                      ))}
                    </BuildMenu>

                    <BuildDetail>
                      {showcase[selectedBuild].image && (
                        <BuildPreview
                          type="button"
                          onClick={() => setLightboxImg(showcase[selectedBuild].image)}
                        >
                          <img
                            src={showcase[selectedBuild].image}
                            alt={showcase[selectedBuild].imageLabel || showcase[selectedBuild].title}
                          />
                        </BuildPreview>
                      )}

                      <ItemTitle>{showcase[selectedBuild].title}</ItemTitle>
                      <ItemContext>{showcase[selectedBuild].context}</ItemContext>

                      {showcase[selectedBuild].points?.length > 0 && (
                        <PointList>
                          {showcase[selectedBuild].points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </PointList>
                      )}

                      {showcase[selectedBuild].decision && (
                        <DecisionText>{showcase[selectedBuild].decision}</DecisionText>
                      )}

                      {showcase[selectedBuild].codeSnippet && (
                        <BuildCodeArea>
                          <BuildCodeButton
                            type="button"
                            onClick={() => toggleBuildCode(selectedBuild)}
                            $open={openBuildCodes.has(selectedBuild)}
                          >
                            <span>핵심 코드</span>
                            <BuildCodeIcon $open={openBuildCodes.has(selectedBuild)}>⌄</BuildCodeIcon>
                          </BuildCodeButton>

                          <AccordionWrap $open={openBuildCodes.has(selectedBuild)}>
                            <AccordionInner>
                              <BuildCodeBlock>
                                <BuildCodeTop>
                                  <span>{showcase[selectedBuild].codeTitle}</span>
                                  <i>{showcase[selectedBuild].codeLanguage}</i>
                                </BuildCodeTop>
                                <pre>{showcase[selectedBuild].codeSnippet}</pre>
                              </BuildCodeBlock>
                            </AccordionInner>
                          </AccordionWrap>
                        </BuildCodeArea>
                      )}
                    </BuildDetail>
                  </BuildLayout>
                )}
              </>
            )}

            {/* ═══════════ SOLVE ═══════════ */}
            {activeTab === "solve" && (
              <>
                <TabIntro>
                  <TabIntroTitle>문제 해결</TabIntroTitle>
                </TabIntro>

                <ChallengeCards>
                  {troubles.map((t, idx) => {
                    const isOpen   = openChallenges.has(idx);
                    const codeOpen = openCodes.has(idx);
                    return (
                      <ChallengeCard key={idx} $open={isOpen}>

                        {/* ── 헤더 ── */}
                        <ChallengeHeader
                          type="button"
                          onClick={() => toggleChallenge(idx)}
                          $open={isOpen}
                        >
                          <ChallengeHeaderLeft>
                            <CardIdx $open={isOpen}>0{idx + 1}</CardIdx>
                            <ChallengeHeaderText>
                              <CardTitle>{t.title}</CardTitle>
                              {t.keyTerm && <KeyTermBadge>{t.keyTerm}</KeyTermBadge>}
                            </ChallengeHeaderText>
                          </ChallengeHeaderLeft>
                          <ChevronIcon $open={isOpen}>›</ChevronIcon>
                        </ChallengeHeader>

                        {/* ── 아코디언 바디 ── */}
                        <AccordionWrap $open={isOpen}>
                          <AccordionInner>
                            <AccordionBody>

                              <NarrativeGrid>
                                <NarrativeBlock $type="problem">
                                  <NarrativeMarker $type="problem">1</NarrativeMarker>
                                  <NarrativeContent>
                                    <NarrativeTag $type="problem">문제</NarrativeTag>
                                    {t.problemTitle && <NarrativeTitle>{t.problemTitle}</NarrativeTitle>}
                                    <NarrativeText>{t.problem}</NarrativeText>
                                  </NarrativeContent>
                                </NarrativeBlock>

                                {t.consideration && (
                                  <NarrativeBlock $type="consideration">
                                    <NarrativeMarker $type="consideration">2</NarrativeMarker>
                                    <NarrativeContent>
                                      <NarrativeTag $type="consideration">고민</NarrativeTag>
                                      {t.considerationTitle && <NarrativeTitle>{t.considerationTitle}</NarrativeTitle>}
                                      <NarrativeText>{t.consideration}</NarrativeText>
                                    </NarrativeContent>
                                  </NarrativeBlock>
                                )}

                                <NarrativeBlock $type="solution">
                                  <NarrativeMarker $type="solution">3</NarrativeMarker>
                                  <NarrativeContent>
                                    <NarrativeTag $type="solution">선택</NarrativeTag>
                                    {t.solutionTitle && <NarrativeTitle>{t.solutionTitle}</NarrativeTitle>}
                                    <NarrativeText $bright>{t.solution}</NarrativeText>
                                  </NarrativeContent>
                                </NarrativeBlock>
                              </NarrativeGrid>

                              {t.metrics && (
                                <MetricsStrip>
                                  <MetricsLabel>{t.metrics.label}</MetricsLabel>
                                  <MetricsRow>
                                    <MetricsBefore>
                                      <MetricsValue>{t.metrics.before.value}</MetricsValue>
                                      <MetricsSub>{t.metrics.before.sub}</MetricsSub>
                                    </MetricsBefore>
                                    <MetricsArrow>→</MetricsArrow>
                                    <MetricsAfter>
                                      <MetricsValue $highlight>{t.metrics.after.value}</MetricsValue>
                                      <MetricsSub $highlight>{t.metrics.after.sub}</MetricsSub>
                                    </MetricsAfter>
                                  </MetricsRow>
                                  {t.metrics.note && (
                                    <MetricsNote>{t.metrics.note}</MetricsNote>
                                  )}
                                </MetricsStrip>
                              )}

                              {/* 코드 토글 */}
                              {t.codeSnippet && (
                                <CodeSection>
                                  <CodeToggleBtn
                                    type="button"
                                    onClick={() => toggleCode(idx)}
                                    $open={codeOpen}
                                  >
                                    <CodeToggleIcon $open={codeOpen}>›</CodeToggleIcon>
                                    {codeOpen ? "코드 닫기" : "코드 보기"}
                                  </CodeToggleBtn>
                                  <AccordionWrap $open={codeOpen}>
                                    <AccordionInner>
                                      <CodeBlock>
                                        <pre>{t.codeSnippet}</pre>
                                      </CodeBlock>
                                    </AccordionInner>
                                  </AccordionWrap>
                                </CodeSection>
                              )}

                            </AccordionBody>
                          </AccordionInner>
                        </AccordionWrap>
                      </ChallengeCard>
                    );
                  })}
                </ChallengeCards>
              </>
            )}

            {/* ═══════════ REFLECT ═══════════ */}
            {activeTab === "reflect" && (
              <ReflectWrap>
                {leadership && (
                  <LeadershipSection>
                    <LeadershipHead>
                      <LeadershipLabel>TEAM LEAD</LeadershipLabel>
                      <LeadershipTitle>{leadership.title}</LeadershipTitle>
                      <LeadershipStatement>{leadership.statement}</LeadershipStatement>
                    </LeadershipHead>
                    <LeadershipGrid>
                      {leadership.items?.map((item, i) => (
                        <LeadershipCard key={item.title}>
                          <LeadershipNum>0{i + 1}</LeadershipNum>
                          <LeadershipCardTitle>{item.title}</LeadershipCardTitle>
                          <LeadershipCardBody>{item.body}</LeadershipCardBody>
                        </LeadershipCard>
                      ))}
                    </LeadershipGrid>
                  </LeadershipSection>
                )}

                {/* ── LEARNED ── */}
                {reflect.learned?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionHead>
                      <ReflectSectionLabel>기능을 만들며 배운 점</ReflectSectionLabel>
                    </ReflectSectionHead>
                    <LearnedList>
                      {reflect.learned.map((item, i) => {
                        const cat = REFLECT_CATS[item.tag] ?? REFLECT_CATS.DEFAULT;
                        return (
                          <LearnedCard key={i} $color={cat.color}>
                            <LearnedLeft>
                              <LearnedNum $color={cat.color}>0{i + 1}</LearnedNum>
                            </LearnedLeft>
                            <LearnedContent>
                              <LearnedTitle>{item.title}</LearnedTitle>
                              <LearnedBody>{item.body}</LearnedBody>
                            </LearnedContent>
                          </LearnedCard>
                        );
                      })}
                    </LearnedList>
                  </ReflectSection>
                )}

                {/* ── WOULD DO DIFFERENTLY ── */}
                {reflect.wouldDoDifferently?.length > 0 && (
                  <ReflectSection>
                    <ReflectSectionHead>
                      <ReflectSectionLabel>다시 만든다면</ReflectSectionLabel>
                    </ReflectSectionHead>
                    <WouldDoGrid>
                      {reflect.wouldDoDifferently.map((item, i) => {
                        if (typeof item === "string") {
                          return (
                            <WouldDoCard key={i}>
                              <WouldDoBody>{item}</WouldDoBody>
                            </WouldDoCard>
                          );
                        }
                        return (
                          <WouldDoCard key={i}>
                            <WouldDoTitle>{item.title}</WouldDoTitle>
                            <WouldDoBody>{item.body}</WouldDoBody>
                          </WouldDoCard>
                        );
                      })}
                    </WouldDoGrid>
                  </ReflectSection>
                )}

                {reflect.closing && (
                  <ReflectClosing>
                    <ReflectClosingLabel>프로젝트를 마치며</ReflectClosingLabel>
                    <ReflectClosingText>{reflect.closing}</ReflectClosingText>
                  </ReflectClosing>
                )}

              </ReflectWrap>
            )}

          </TabBody>
        </Content>
      </Overlay>
    </>
  );
}

/* ═══════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════ */

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(5, 6, 10, 0.92);
  backdrop-filter: blur(24px);
  cursor: zoom-out;
  animation: ${fadeIn} 0.22s ease;
`;

const LightboxImg = styled.img`
  max-width: min(1100px, 100%);
  max-height: 88vh;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 40px 120px rgba(0,0,0,0.75);
  cursor: default;
  animation: ${scaleIn} 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  transition: background 0.18s, transform 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: rotate(90deg);
  }
`;

/* ═══════════════════════════════════════════
   OVERLAY / CONTENT
═══════════════════════════════════════════ */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  padding: clamp(12px, 2.5vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 12, 23, 0.82);
  backdrop-filter: blur(12px);
`;

const Content = styled.article`
  position: relative;
  width: min(1180px, 100%);
  height: min(900px, 94vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  background: #f6f5f2;
  border: 1px solid rgba(255,255,255,0.22);
  box-shadow: 0 48px 120px rgba(0,0,0,0.5);
`;

/* ═══════════════════════════════════════════
   STICKY TOP
═══════════════════════════════════════════ */

const StickyTop = styled.div`
  flex-shrink: 0;
  background: #111a2b;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const ModalHeader = styled.div`
  min-height: 86px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    align-items: flex-start;
    padding: 18px 20px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProjectTypeBadge = styled.span`
  color: #cdb7af;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  color: #f5f2f0;
  font-size: clamp(25px, 2.3vw, 36px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.06em;
`;

const HeaderRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 720px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const LinkBtn = styled.a`
  height: 42px;
  padding: 0 17px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  color: #f8f7f4;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s, transform 0.18s, border-color 0.18s;

  &:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.24);
    transform: translateY(-1px);
  }

  span {
    color: #d4b9b1;
  }

  @media (max-width: 560px) {
    height: 38px;
    padding: 0 12px;
    font-size: 12px;
  }
`;

const CloseButton = styled.button`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.76);
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  transition: background 0.18s, transform 0.2s, color 0.18s;

  &:hover {
    background: rgba(202,178,168,0.18);
    color: #f5f2f0;
    transform: rotate(90deg);
  }
`;

const TabNav = styled.nav`
  min-height: 64px;
  padding: 0 30px;
  display: flex;
  align-items: stretch;
  gap: 8px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 560px) {
    padding: 0 14px;
  }
`;

const TabBtn = styled.button`
  min-width: 104px;
  padding: 0 18px;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  letter-spacing: -0.025em;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,0.56)")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#d1b7af" : "transparent")};
  transition: color 0.18s, border-color 0.18s, background 0.18s;

  &:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.04);
  }

  @media (max-width: 560px) {
    min-width: 92px;
    padding: 0 12px;
    font-size: 14px;
    flex-shrink: 0;
  }
`;

/* ═══════════════════════════════════════════
   TAB BODY
═══════════════════════════════════════════ */

const TabBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 38px clamp(28px, 4.5vw, 64px) 64px;
  color: #1a2232;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
  }

  @media (max-width: 640px) {
    padding: 20px 20px 40px;
  }
`;

/* ═══════════════════════════════════════════
   OVERVIEW TAB
═══════════════════════════════════════════ */

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  margin-bottom: 24px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #dde0e6;
  background: #ffffff;

  @media (max-width: 560px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatItem = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-right: 1px solid #e3e5e9;
  &:last-child { border-right: none; }
`;

const StatValue = styled.strong`
  color: #172033;
  font-size: clamp(20px, 1.8vw, 26px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
`;

const StatLabel = styled.span`
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 0.82fr) minmax(280px, 1.18fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;

  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 16px;
  background: ${({ $image }) =>
    $image
      ? `url(${$image}) center top / cover no-repeat`
      : `linear-gradient(140deg, rgba(37,64,122,0.9), rgba(116,130,189,0.4))`};
  border: 1px solid #d9dce2;
  box-shadow: 0 16px 36px rgba(23,32,51,0.13);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 35%, rgba(10,14,22,0.72) 100%);
  }
`;

const ThumbnailFallback = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  span {
    color: var(--portfolio-rose-beige);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin-bottom: 4px;
    opacity: 0.8;
  }
  strong {
    color: rgba(245,242,240,0.85);
    font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
    font-size: clamp(38px, 5vw, 80px);
    font-weight: normal;
    line-height: 0.9;
    letter-spacing: -0.08em;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HeroStatement = styled.p`
  margin: 0;
  color: #182134;
  font-size: clamp(21px, 1.8vw, 29px);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.05em;
`;

const FlowRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const FlowLabel = styled.span`
  flex-shrink: 0;
  color: #687083;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FlowSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

const FlowGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const FlowStep = styled.span`
  padding: 3px 9px;
  border-radius: 6px;
  background: #eef0f7;
  border: 1px solid #d9dce9;
  color: #48557a;
  font-size: 12px;
  font-weight: 600;
`;

const FlowArrow = styled.span`
  color: #a1a6b0;
  font-size: 12px;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const HeroPill = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #dcdee4;
  color: #51596a;
  font-size: 12px;
  font-weight: 500;
`;

const CaseStudyBlock = styled.section`
  position: relative;
  margin-top: 34px;
  padding: clamp(26px, 4vw, 44px);
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(202,178,168,0.14);
  background:
    radial-gradient(
      circle at 92% 0%,
      rgba(202,178,168,0.13),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      rgba(202,178,168,0.055),
      rgba(116,130,189,0.035)
    );

  &::after {
    content: "WHY";
    position: absolute;
    right: -12px;
    top: -28px;
    color: rgba(245,242,240,0.025);
    font-size: clamp(100px, 16vw, 210px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.1em;
    pointer-events: none;
  }
`;

const CaseStudyEyebrow = styled.p`
  position: relative;
  z-index: 1;
  margin: 0 0 14px;
  color: var(--portfolio-rose-beige);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
`;

const CaseStudyQuestion = styled.h4`
  position: relative;
  z-index: 1;
  max-width: 850px;
  margin: 0;
  color: #f5f2f0;
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(24px, 2.8vw, 42px);
  font-weight: normal;
  line-height: 1.45;
  letter-spacing: -0.065em;
`;

const PrincipleGrid = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const PrincipleCard = styled.article`
  min-height: 170px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: rgba(8,12,20,0.32);
  border: 1px solid rgba(255,255,255,0.065);
`;

const PrincipleNumber = styled.span`
  color: rgba(202,178,168,0.55);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

const PrincipleTitle = styled.strong`
  margin-top: auto;
  color: #f5f2f0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.045em;
`;

const PrincipleBody = styled.p`
  margin: 9px 0 0;
  color: rgba(245,242,240,0.52);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.75;
  letter-spacing: -0.025em;
`;

const QuestionShelf = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,0.08);
`;

const QuestionShelfLabel = styled.span`
  display: block;
  margin-bottom: 12px;
  color: rgba(245,242,240,0.4);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const QuestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const QuestionChip = styled.span`
  padding: 9px 13px;
  border-radius: 9px;
  background: rgba(8,12,20,0.34);
  border: 1px solid rgba(202,178,168,0.18);
  color: rgba(245,242,240,0.72);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.02em;
`;

const DomainBlock = styled.div`
  margin-top: 24px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid #dfe1e6;
  background: #ffffff;
  display: grid;
  gap: 12px;
`;

const DomainLabel = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const DomainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DomainChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: ${({ $mine }) => ($mine ? "700" : "400")};

  ${({ $mine }) =>
    $mine
      ? css`
          background: #f1e9e6;
          border: 1px solid #d3b7ae;
          color: #754f48;
        `
      : css`
          background: #f3f4f6;
          border: 1px solid #e0e2e6;
          color: #8a909b;
        `}
`;

const DomainDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a47369;
  flex-shrink: 0;
`;

const OverviewBody = styled.p`
  margin: 20px 0 0;
  max-width: 860px;
  color: #495163;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: -0.022em;
`;

const RoleSection = styled.section`
  margin-top: 28px;
  display: grid;
  gap: 13px;
`;

const RoleSectionTitle = styled.h3`
  margin: 0;
  color: #172033;
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.045em;
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.article`
  min-height: 112px;
  padding: 18px 20px;
  border: 1px solid #dfe1e6;
  border-radius: 13px;
  background: #ffffff;
`;

const RoleTitle = styled.h4`
  margin: 0 0 8px;
  color: #744f48;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.035em;
`;

const RoleBody = styled.p`
  margin: 0;
  color: #555d6d;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: -0.022em;
`;

const StackBlock = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 12px;
`;

const StackBlockLabel = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.3);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const StackLegend = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.7;
`;

const LegendDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StackTag = styled.span`
  height: 27px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 7px;
  background: #ffffff;
  border: 1px solid #dfe1e6;
  color: #3e4658;
  font-size: 12px;
  font-weight: 600;
`;

/* ═══════════════════════════════════════════
   BUILD TAB
═══════════════════════════════════════════ */

const TabIntro = styled.div`
  margin-bottom: 24px;
`;

const TabIntroTitle = styled.h3`
  margin: 0;
  color: #172033;
  font-size: clamp(27px, 2.2vw, 36px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.07em;
`;

const TabIntroSub = styled.p`
  margin: 0;
  color: rgba(245,242,240,0.35);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

const BuildLayout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const BuildMenu = styled.div`
  display: grid;
  gap: 6px;
`;

const BuildMenuButton = styled.button`
  width: 100%;
  min-height: 64px;
  padding: 14px 16px;
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 8px;
  align-items: start;
  border-radius: 9px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "#aeb6d2" : "#dfe1e6"};
  background: ${({ $active }) =>
    $active ? "#e9ebf4" : "#ffffff"};
  text-align: left;

  span {
    color: #7580a8;
    font-size: 11px;
    font-weight: 700;
  }

  strong {
    color: ${({ $active }) =>
      $active ? "#172033" : "#555d6d"};
    font-size: 14px;
    font-weight: ${({ $active }) => ($active ? "700" : "600")};
    line-height: 1.45;
    letter-spacing: -0.03em;
  }
`;

const BuildDetail = styled.section`
  min-width: 0;
  padding: 26px;
  border-radius: 14px;
  border: 1px solid #dfe1e6;
  background: #ffffff;
`;

const BuildPreview = styled.button`
  width: 100%;
  height: min(250px, 29vh);
  margin-bottom: 22px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #d9dce2;
  background: #eef0f3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

const ShowcaseList = styled.div``;

const ShowcaseItem = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px;
  padding: 48px 0 56px;
  border-bottom: 1px solid rgba(255,255,255,0.075);

  &:first-child { padding-top: 0; }
  &:last-child  { border-bottom: none; padding-bottom: 0; }

  @media (max-width: 640px) {
    padding: 24px 0;
  }
`;

const ImgPanel = styled.div``;

const ImgBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 52px rgba(0,0,0,0.48);
  background: rgba(9,10,16,0.8);
  cursor: zoom-in;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(10,14,22,0.68) 100%);
    pointer-events: none;
    transition: opacity 0.22s;
  }
`;

const ImgEl = styled.img`
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${ImgBox}:hover & {
    transform: scale(1.04);
  }
`;

const ImgCaption = styled.span`
  position: absolute;
  bottom: 10px;
  left: 12px;
  z-index: 2;
  color: rgba(245,242,240,0.48);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
`;

const ImgZoomOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(10,14,22,0.55);
  backdrop-filter: blur(3px);
  opacity: 0;
  transition: opacity 0.22s;

  ${ImgBox}:hover & {
    opacity: 1;
  }
`;

const ImgZoomIcon = styled.span`
  color: #f5f2f0;
  font-size: 26px;
  line-height: 1;
`;

const ImgZoomText = styled.span`
  color: rgba(245,242,240,0.75);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
`;

const TextPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 920px;
`;

const ItemTag = styled.p`
  margin: 0 0 9px;
  color: var(--portfolio-rose-beige);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.26em;
  opacity: 0.55;
`;

const ItemTitle = styled.h5`
  margin: 0 0 13px;
  color: #172033;
  font-size: clamp(23px, 1.8vw, 31px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.055em;
`;

const ItemContext = styled.p`
  margin: 0 0 16px;
  color: #50586a;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.82;
  letter-spacing: -0.026em;
`;

const PointList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 7px;

  li {
    position: relative;
    padding-left: 15px;
    color: #5c6475;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.7;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 6px;
      height: 1px;
      background: #9b6d64;
    }
  }
`;

const DecisionCard = styled.div`
  margin-top: 22px;
  padding: 16px 18px;
  border-radius: 12px;
  border-left: 2px solid rgba(202,178,168,0.55);
  background: rgba(202,178,168,0.055);
`;

const DecisionLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  color: var(--portfolio-rose-beige);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const DecisionText = styled.p`
  margin: 20px 0 0;
  padding: 16px 18px;
  border-left: 3px solid #b58a81;
  background: #f4eeeb;
  color: #4f4a4a;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: -0.02em;
`;

const InterviewPrompt = styled.div`
  margin-top: 12px;
  padding: 15px 18px;
  border-radius: 12px;
  background: rgba(143,160,224,0.08);
  border: 1px solid rgba(143,160,224,0.17);

  p {
    margin: 6px 0 0;
    color: rgba(245,242,240,0.78);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -0.025em;
  }
`;

const InterviewPromptLabel = styled.span`
  color: rgba(143,160,224,0.8);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

const BuildCodeArea = styled.div`
  margin-top: 14px;
`;

const BuildCodeButton = styled.button`
  width: 100%;
  min-height: 50px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  border-radius: 12px;
  border: 1px solid
    ${({ $open }) =>
      $open ? "#9ca7cb" : "#d8dbe2"};
  background:
    ${({ $open }) =>
      $open
        ? "#e8eaf3"
        : "#f7f7f8"};
  color: #30394d;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: #9ca7cb;
    background: #eef0f7;
    transform: translateY(-1px);
  }
`;

const BuildCodeButtonText = styled.span`
  display: grid;
  gap: 4px;

  > span:last-child {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.03em;
  }
`;

const BuildCodeKicker = styled.span`
  color: rgba(143,160,224,0.72);
  font-family: "SFMono-Regular", "Consolas", monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const BuildCodeIcon = styled.span`
  flex-shrink: 0;
  color: #66739f;
  font-size: 19px;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.25s ease;
`;

const BuildCodeBlock = styled.div`
  margin-top: 9px;
  overflow: hidden;
  border-radius: 13px;
  border: 1px solid rgba(143,160,224,0.15);
  background: #080d16;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.025);

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
    color: rgba(222,229,255,0.76);
    font-family: "SFMono-Regular", "Consolas", "Liberation Mono", monospace;
    font-size: 11px;
    line-height: 1.75;
    tab-size: 2;
  }
`;

const BuildCodeTop = styled.div`
  min-height: 38px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.055);
  background: rgba(255,255,255,0.022);

  span {
    color: rgba(245,242,240,0.52);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }

  i {
    color: rgba(143,160,224,0.6);
    font-family: "SFMono-Regular", "Consolas", monospace;
    font-size: 9px;
    font-style: normal;
  }
`;

/* ═══════════════════════════════════════════
   SOLVE TAB
═══════════════════════════════════════════ */

const ChallengeCards = styled.div`
  display: grid;
  gap: 12px;
`;

const ChallengeCard = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ $open }) =>
    $open ? "#aeb6d2" : "#dfe1e6"};
  background: ${({ $open }) =>
    $open ? "#f3f4f8" : "#ffffff"};
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;

  &:hover {
    border-color: ${({ $open }) =>
      $open ? "#9ca7cb" : "#c9cdd5"};
  }
`;

const ChallengeHeader = styled.button`
  width: 100%;
  min-height: 82px;
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
    background: #f7f7f8;
  }
`;

const ChallengeHeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
`;

const CardIdx = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: ${({ $open }) => ($open ? "#eadfdb" : "#f1eeee")};
  border: 1px solid ${({ $open }) =>
    $open ? "#cbaaa1" : "#ddd3d0"};
  color: #835c54;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  transition: background 0.2s, border-color 0.2s;
`;

const ChallengeHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const CardTitle = styled.h4`
  margin: 0;
  color: #172033;
  font-size: clamp(16px, 1.25vw, 20px);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.045em;
`;

const KeyTermBadge = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 5px;
  background: #eceef5;
  border: 1px solid #d5d9e8;
  color: #5c678e;
  font-size: 12px;
  font-weight: 700;
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  letter-spacing: 0.02em;
`;

const ChevronIcon = styled.span`
  flex-shrink: 0;
  color: #7b8290;
  font-size: 24px;
  line-height: 1;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;

  ${ChallengeCard}:hover & { color: #313a4d; }
`;

/* ─── Accordion ─── */

const AccordionWrap = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AccordionInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

const AccordionBody = styled.div`
  padding: 4px 24px 26px 68px;
  display: grid;
  gap: 20px;

  @media (max-width: 640px) {
    padding: 4px 16px 20px;
  }
`;

/* ─── 수치 비교 스트립 ─── */

const MetricsStrip = styled.div`
  padding: 18px 20px;
  border-radius: 13px;
  background: #eef1f8;
  border: 1px solid #d6dceb;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 22px;
  row-gap: 10px;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetricsLabel = styled.p`
  margin: 0;
  color: #5c678e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const MetricsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(14px, 3vw, 34px);
`;

const MetricsBefore = styled.div`
  min-width: 145px;
  display: grid;
  gap: 4px;
`;

const MetricsAfter = styled.div`
  min-width: 145px;
  display: grid;
  gap: 4px;
`;

const MetricsValue = styled.strong`
  font-size: clamp(22px, 2.2vw, 32px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: ${({ $highlight }) =>
    $highlight ? "#4f608f" : "#7b8290"};
`;

const MetricsSub = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: ${({ $highlight }) =>
    $highlight ? "#59678f" : "#747b89"};
`;

const MetricsArrow = styled.span`
  font-size: 24px;
  color: #9ca6bf;
  flex-shrink: 0;
`;

const MetricsNote = styled.p`
  grid-column: 2;
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid #d8deea;
  color: #747b89;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.01em;

  @media (max-width: 640px) {
    grid-column: 1;
  }
`;

/* ─── 문제/해결 서사 블록 ─── */

const NarrativeGrid = styled.div`
  display: grid;
  gap: 0;
`;

const NarrativeBlock = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 16px;
  padding: 4px 0 24px;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 18px;
    top: 38px;
    bottom: 0;
    width: 1px;
    background: #d8dce5;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const NarrativeMarker = styled.span`
  position: relative;
  z-index: 1;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid
    ${({ $type }) =>
      $type === "problem"
        ? "#d9b6aa"
        : $type === "consideration"
          ? "#bdc6df"
          : "#b7d0c0"};
  background:
    ${({ $type }) =>
      $type === "problem"
        ? "#f8ebe7"
        : $type === "consideration"
          ? "#eef1f8"
          : "#eaf4ed"};
  color:
    ${({ $type }) =>
      $type === "problem"
        ? "#8d5b50"
        : $type === "consideration"
          ? "#59678f"
          : "#46705a"};
  font-size: 12px;
  font-weight: 800;
`;

const NarrativeContent = styled.div`
  min-width: 0;
  padding: 1px 0 0;
  display: grid;
  gap: 7px;
`;

const NarrativeTag = styled.span`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.02em;

  ${({ $type }) =>
    $type === "problem"
      ? css`
          color: #9a5e48;
        `
      : $type === "consideration"
        ? css`
          color: #59678f;
        `
        : css`
          color: #46705a;
        `}
`;

const NarrativeTitle = styled.h5`
  margin: 0;
  color: #20293b;
  font-size: clamp(16px, 1.2vw, 19px);
  font-weight: 750;
  line-height: 1.4;
  letter-spacing: -0.045em;
`;

const NarrativeText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.68;
  letter-spacing: -0.022em;
  color: ${({ $bright }) =>
    $bright ? "#30394c" : "#596173"};
`;

/* ─── 코드 토글 ─── */

const CodeSection = styled.div`
  display: grid;
  gap: 8px;
`;

const CodeToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: #f4f5f7;
  border: 1px solid #d9dce2;
  color: #4e5769;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.18s, color 0.18s, border-color 0.18s;

  &:hover {
    background: #eceef5;
    border-color: #afb7d1;
    color: #48557d;
  }
`;

const CodeToggleIcon = styled.span`
  font-size: 14px;
  font-weight: 300;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.22s;
  display: inline-block;
  line-height: 1;
`;

const CodeBlock = styled.div`
  border-radius: 11px;
  background: rgba(0,0,0,0.42);
  border: 1px solid rgba(255,255,255,0.06);
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 16px 18px;
    font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.75;
    color: rgba(245,242,240,0.65);
    white-space: pre;
    tab-size: 2;
  }

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
  }
`;

/* ═══════════════════════════════════════════
   REFLECT TAB
═══════════════════════════════════════════ */

const ReflectWrap = styled.div`
  display: grid;
  gap: 34px;
`;

const LeadershipSection = styled.section`
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid #d9d5df;
  background:
    radial-gradient(circle at 90% 0%, rgba(116, 130, 189, 0.12), transparent 34%),
    #ffffff;
`;

const LeadershipHead = styled.div`
  max-width: 900px;
  padding: clamp(24px, 4vw, 38px);
`;

const LeadershipLabel = styled.span`
  display: block;
  margin-bottom: 10px;
  color: #8b625a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
`;

const LeadershipTitle = styled.h3`
  margin: 0;
  color: #172033;
  font-size: clamp(25px, 2.3vw, 34px);
  font-weight: 750;
  letter-spacing: -0.06em;
`;

const LeadershipStatement = styled.p`
  margin: 13px 0 0;
  color: #51596a;
  font-size: clamp(15px, 1.25vw, 18px);
  font-weight: 500;
  line-height: 1.72;
  letter-spacing: -0.03em;
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid #e0e1e6;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const LeadershipCard = styled.article`
  min-height: 156px;
  padding: 22px;
  border-right: 1px solid #e0e1e6;

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 760px) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #e0e1e6;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const LeadershipNum = styled.span`
  color: #a17b73;
  font-size: 11px;
  font-weight: 800;
`;

const LeadershipCardTitle = styled.h4`
  margin: 18px 0 7px;
  color: #20293b;
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.04em;
`;

const LeadershipCardBody = styled.p`
  margin: 0;
  color: #5c6475;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.68;
  letter-spacing: -0.022em;
`;

const ReflectSection = styled.div`
  display: grid;
  gap: 16px;
`;

const ReflectSectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #d9dce2;
`;

const ReflectSectionLabel = styled.p`
  margin: 0;
  flex-shrink: 0;
  color: #172033;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.045em;
`;

const ReflectSectionSub = styled.span`
  color: rgba(245,242,240,0.2);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.02em;
`;

/* ─── Learned ─── */

const LearnedList = styled.div`
  display: grid;
  gap: 10px;
`;

const LearnedCard = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 15px;
  border: 1px solid #dfe1e6;
  border-left: 2px solid ${({ $color }) => $color};
  background: #ffffff;
  transition: background 0.2s;

  &:hover { background: #fafafa; }
`;

const LearnedLeft = styled.div`
  padding-top: 1px;
  display: flex;
  justify-content: center;
`;

const LearnedNum = styled.span`
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  opacity: 0.5;
`;

const LearnedContent = styled.div`
  display: grid;
  gap: 7px;
`;

const LearnedTopRow = styled.div`
  display: flex;
  align-items: center;
`;

const LearnedTitle = styled.h5`
  margin: 0;
  color: #172033;
  font-size: clamp(16px, 1.15vw, 19px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.045em;
`;

const LearnedBody = styled.p`
  margin: 0;
  color: #555d6d;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.72;
  letter-spacing: -0.025em;
`;

/* ─── Shared tag badge ─── */

const ReflectTagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 4px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  color: ${({ $color }) => $color};
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

/* ─── Would Do Differently ─── */

const WouldDoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const WouldDoCard = styled.div`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid #dfe1e6;
  background: #ffffff;
  display: grid;
  gap: 8px;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: #c9cdd5;
    background: #fafafa;
  }
`;

const WouldDoTitle = styled.h5`
  margin: 0;
  color: #172033;
  font-size: clamp(15px, 1.05vw, 17px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.04em;
`;

const WouldDoBody = styled.p`
  margin: 0;
  color: #596173;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: -0.02em;
`;

/* ─── Closing ─── */

const ReflectClosing = styled.div`
  padding: clamp(22px, 4vw, 34px);
  border-radius: 16px;
  border: 1px solid #dfd7d4;
  border-left: 3px solid #b58a81;
  background: #f4eeeb;
`;

const ReflectClosingLabel = styled.span`
  display: block;
  margin-bottom: 10px;
  color: #875e56;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const ReflectClosingText = styled.p`
  margin: 0;
  color: #554d4b;
  max-width: 900px;
  font-size: clamp(17px, 1.5vw, 21px);
  font-weight: 650;
  line-height: 1.65;
  letter-spacing: -0.04em;
`;
