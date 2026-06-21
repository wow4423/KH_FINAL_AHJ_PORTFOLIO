import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

async function fetchComments() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/guestbook?select=*&order=created_at.desc&limit=50`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error("fetch failed");
  return res.json();
}

async function postComment(name, message) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
    method: "POST",
    headers: {
      ...HEADERS,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ name: name.trim(), message: message.trim() }),
  });
  if (!res.ok) throw new Error("post failed");
  return res.json();
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function GuestbookSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastSubmit = useRef(0);
  const configured = SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_URL";

  useEffect(() => {
    if (!configured) { setLoading(false); return; }
    fetchComments()
      .then(setComments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [configured]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!configured) return;
    const now = Date.now();
    if (now - lastSubmit.current < 15000) {
      setError("잠시 후 다시 시도해주세요.");
      return;
    }
    if (!name.trim() || !message.trim()) return;
    if (name.trim().length > 30) { setError("이름은 30자 이하로 입력해주세요."); return; }
    if (message.trim().length > 300) { setError("메시지는 300자 이하로 입력해주세요."); return; }

    setSubmitting(true);
    setError("");
    try {
      const [newComment] = await postComment(name, message);
      setComments((prev) => [newComment, ...prev]);
      setName("");
      setMessage("");
      setSuccess(true);
      lastSubmit.current = Date.now();
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Wrapper id="guestbook">
      <Inner>
        <SectionLabel>GUESTBOOK</SectionLabel>

        <HeadRow>
          <Headline>
            한 마디 남겨주세요.
          </Headline>
          <Sub>응원이든, 피드백이든, 안부든 — 남겨주신 말은 사라지지 않습니다.</Sub>
        </HeadRow>

        {!configured ? (
          <SetupNotice>
            방명록을 활성화하려면 <code>.env.local</code> 에 Supabase 환경변수를 설정해주세요.
          </SetupNotice>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormFields>
              <NameInput
                type="text"
                placeholder="이름 (30자 이하)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                required
                disabled={submitting}
              />
              <MessageTextarea
                placeholder="메시지를 남겨주세요 (300자 이하)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                required
                rows={3}
                disabled={submitting}
              />
            </FormFields>

            <FormFooter>
              <CharCount $warn={message.length > 250}>
                {message.length} / 300
              </CharCount>
              {error && <ErrorMsg>{error}</ErrorMsg>}
              {success && <SuccessMsg>전달됐습니다 :)</SuccessMsg>}
              <SubmitBtn type="submit" disabled={submitting}>
                {submitting ? "전송 중..." : "남기기"}
              </SubmitBtn>
            </FormFooter>
          </Form>
        )}

        <Divider />

        {loading ? (
          <EmptyMsg>불러오는 중...</EmptyMsg>
        ) : comments.length === 0 ? (
          <EmptyMsg>아직 메시지가 없습니다. 첫 번째로 남겨보세요.</EmptyMsg>
        ) : (
          <CommentList>
            {comments.map((c) => (
              <CommentCard key={c.id}>
                <CommentHeader>
                  <CommentName>{c.name}</CommentName>
                  <CommentDate>{formatDate(c.created_at)}</CommentDate>
                </CommentHeader>
                <CommentBody>{c.message}</CommentBody>
              </CommentCard>
            ))}
          </CommentList>
        )}
      </Inner>

      <DecoText aria-hidden="true">GUESTBOOK</DecoText>
    </Wrapper>
  );
}

/* ── Layout ── */
const Wrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 110px clamp(28px, 6vw, 110px) 120px;
  overflow: hidden;

  background:
    radial-gradient(circle at 80% 20%, rgba(116, 130, 189, 0.14), transparent 30%),
    radial-gradient(circle at 12% 78%, rgba(202, 178, 168, 0.08), transparent 28%),
    linear-gradient(145deg, #111827 0%, #0b1120 60%, #0e1628 100%);
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  margin: 0 0 36px;
  color: var(--portfolio-rose-beige, #cbb2a8);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2em;
`;

const HeadRow = styled.div`
  margin-bottom: 48px;
`;

const Headline = styled.h2`
  margin: 0 0 16px;
  color: var(--portfolio-white-soft, #e5e0df);
  font-family: "ChosunIlboMyungjo", "Noto Serif KR", serif;
  font-size: clamp(32px, 3.5vw, 60px);
  font-weight: normal;
  line-height: 1.28;
  letter-spacing: -0.06em;
`;

const Sub = styled.p`
  margin: 0;
  color: rgba(229, 224, 223, 0.45);
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 300;
  line-height: 1.8;
  letter-spacing: -0.02em;
`;

/* ── Form ── */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 760px;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const inputBase = `
  width: 100%;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(229, 224, 223, 0.1);
  color: rgba(229, 224, 223, 0.9);
  font-family: inherit;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.02em;
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(229, 224, 223, 0.25);
  }

  &:focus {
    border-color: rgba(229, 224, 223, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const NameInput = styled.input`${inputBase}`;
const MessageTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 90px;
  line-height: 1.7;
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const CharCount = styled.span`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: ${({ $warn }) => ($warn ? "rgba(255,160,130,0.7)" : "rgba(229,224,223,0.25)")};
  margin-right: auto;
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: rgba(255, 140, 120, 0.85);
  letter-spacing: -0.01em;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SuccessMsg = styled.span`
  font-size: 12px;
  color: rgba(160, 220, 160, 0.85);
  letter-spacing: -0.01em;
  animation: ${fadeIn} 0.25s ease;
`;

const SubmitBtn = styled.button`
  padding: 10px 28px;
  border-radius: 999px;
  border: 1px solid rgba(229, 224, 223, 0.22);
  background: transparent;
  color: rgba(229, 224, 223, 0.75);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;

  &:hover:not(:disabled) {
    background: rgba(229, 224, 223, 0.1);
    border-color: rgba(229, 224, 223, 0.4);
    color: rgba(229, 224, 223, 0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ── Comments ── */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(229, 224, 223, 0.08);
  margin: 52px 0 40px;
`;

const EmptyMsg = styled.p`
  color: rgba(229, 224, 223, 0.28);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.01em;
`;

const CommentList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
  max-width: 1100px;
`;

const CommentCard = styled.li`
  padding: 20px 22px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(229, 224, 223, 0.07);
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${fadeIn} 0.3s ease;
  transition: background 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.065);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const CommentName = styled.strong`
  color: rgba(229, 224, 223, 0.82);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const CommentDate = styled.span`
  color: rgba(229, 224, 223, 0.25);
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

const CommentBody = styled.p`
  margin: 0;
  color: rgba(229, 224, 223, 0.55);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.75;
  letter-spacing: -0.02em;
  white-space: pre-wrap;
  word-break: break-word;
`;

const SetupNotice = styled.p`
  color: rgba(229, 224, 223, 0.35);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.8;

  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    color: rgba(229, 224, 223, 0.55);
  }
`;

const DecoText = styled.span`
  position: absolute;
  right: clamp(24px, 6vw, 110px);
  bottom: 60px;
  z-index: 0;
  color: rgba(229, 224, 223, 0.025);
  font-size: clamp(60px, 10vw, 180px);
  font-weight: 700;
  letter-spacing: -0.08em;
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;
