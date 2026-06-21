import styled from "styled-components";

const contacts = [
  {
    label: "Phone",
    value: "010-3910-9787",
    href: "tel:01039109787",
  },
  {
    label: "Email",
    value: "wow4423@naver.com",
    href: "mailto:wow4423@naver.com",
  },
  {
    label: "Email",
    value: "wow4423@gmail.com",
    href: "mailto:wow4423@gmail.com",
  },
];

export default function ContactSection() {
  return (
    <Wrapper id="contact" className="portfolio-section">
      <Inner>
        <SectionLabel>CONTACT</SectionLabel>

        <Headline>
          함께 일할 기회가 있다면
          <br />
          언제든 연락 주세요.
        </Headline>

        <Sub>
          기능을 구현하는 개발자이기 전에, 서비스의 흐름을 함께 고민하고 싶은
          사람입니다.
        </Sub>

        <ContactList>
          {contacts.map((c) => (
            <ContactItem key={c.href}>
              <ContactLabel>{c.label}</ContactLabel>
              <ContactLink href={c.href}>{c.value}</ContactLink>
            </ContactItem>
          ))}
        </ContactList>
      </Inner>

      <Deco aria-hidden="true">CONTACT</Deco>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 60vh;
  padding: 110px clamp(28px, 6vw, 110px) 100px;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 72% 30%,
      rgba(202, 178, 168, 0.18),
      transparent 26%
    ),
    radial-gradient(
      circle at 14% 72%,
      rgba(116, 130, 189, 0.12),
      transparent 28%
    ),
    linear-gradient(145deg, #f0eae7 0%, #dddce8 100%);

  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  margin: 0 0 28px;
  color: #865f68;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2em;
`;

const Headline = styled.h2`
  margin: 0;
  color: #141b2b;
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(38px, 4.2vw, 70px);
  font-weight: normal;
  line-height: 1.28;
  letter-spacing: -0.06em;
`;

const Sub = styled.p`
  max-width: 600px;
  margin: 24px 0 0;
  color: rgba(20, 27, 43, 0.58);
  font-size: clamp(14px, 1vw, 17px);
  font-weight: 300;
  line-height: 1.85;
  letter-spacing: -0.03em;
`;

const ContactList = styled.ul`
  margin: 52px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;

  border-top: 1px solid rgba(20, 27, 43, 0.1);
`;

const ContactItem = styled.li`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(20, 27, 43, 0.07);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const ContactLabel = styled.span`
  color: rgba(20, 27, 43, 0.4);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ContactLink = styled.a`
  color: #172239;
  font-size: clamp(16px, 1.2vw, 22px);
  font-weight: 600;
  letter-spacing: -0.03em;
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover {
    color: #865f68;
  }
`;

const Deco = styled.span`
  position: absolute;
  right: clamp(24px, 6vw, 110px);
  bottom: 60px;
  z-index: 0;

  color: rgba(20, 27, 43, 0.04);
  font-size: clamp(80px, 13vw, 220px);
  font-weight: 700;
  letter-spacing: -0.08em;
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;
