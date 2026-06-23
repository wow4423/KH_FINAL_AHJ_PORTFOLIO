import { Highlight, Prism } from "prism-react-renderer";
import styled from "styled-components";

/* IntelliJ IDEA(Darcula) 풍 테마 */
const darcula = {
  plain: { color: "#a9b7c6", backgroundColor: "#2b2b2b" },
  styles: [
    { types: ["comment", "prolog", "cdata", "doctype"], style: { color: "#808080", fontStyle: "italic" } },
    { types: ["keyword", "boolean", "atrule"], style: { color: "#cc7832" } },
    { types: ["string", "char", "attr-value", "inserted"], style: { color: "#6a8759" } },
    { types: ["number", "constant", "symbol"], style: { color: "#6897bb" } },
    { types: ["function", "method"], style: { color: "#ffc66d" } },
    { types: ["class-name", "maybe-class-name", "builtin"], style: { color: "#a9b7c6" } },
    { types: ["annotation"], style: { color: "#bbb529" } },
    { types: ["property", "tag"], style: { color: "#e8bf6a" } },
    { types: ["attr-name"], style: { color: "#9876aa" } },
    { types: ["operator", "punctuation", "variable"], style: { color: "#a9b7c6" } },
    { types: ["regex", "deleted"], style: { color: "#cc7832" } },
  ],
};

/* "Java · Spring Boot" 같은 라벨 + 코드 내용으로 Prism 언어를 결정 */
function resolveLang(language, code) {
  const l = (language || "").toLowerCase();
  if (l.includes("sql")) return "sql";
  if (l.includes("react") || l.includes("javascript") || /\bjs\b/.test(l)) return "jsx";
  if (l.includes("java")) return "clike"; // clike가 Java 키워드/문자열/주석을 잘 처리
  if (/\bSELECT\b|\bFROM\b|\bINSERT\s+INTO\b|\bUPDATE\b/.test(code)) return "sql";
  if (/=>|\bconst\b|\bawait\b|use[A-Z]/.test(code)) return "jsx";
  return "clike";
}

export default function CodeViewer({ code = "", title, language }) {
  const source = code.replace(/\s+$/, "");
  const lang = resolveLang(language, source);

  return (
    <Frame>
      {(title || language) && (
        <TopBar>
          <Dots aria-hidden="true">
            <i />
            <i />
            <i />
          </Dots>
          {title && <FileTitle>{title}</FileTitle>}
          {language && <Lang>{language}</Lang>}
        </TopBar>
      )}

      <Highlight prism={Prism} code={source} language={lang} theme={darcula}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <Pre style={style}>
            <code>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <Line key={i} {...lineProps}>
                    <LineNo>{i + 1}</LineNo>
                    <LineCode>
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({ token });
                        return <span key={key} {...tokenProps} />;
                      })}
                    </LineCode>
                  </Line>
                );
              })}
            </code>
          </Pre>
        )}
      </Highlight>
    </Frame>
  );
}

const Frame = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
  background: #2b2b2b;
`;

const TopBar = styled.div`
  min-height: 36px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #3c3f41;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const Dots = styled.span`
  display: inline-flex;
  gap: 6px;
  flex-shrink: 0;

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #5c5f61;
  }
  i:nth-child(1) {
    background: #ff5f56;
  }
  i:nth-child(2) {
    background: #ffbd2e;
  }
  i:nth-child(3) {
    background: #27c93f;
  }
`;

const FileTitle = styled.span`
  color: rgba(220, 222, 224, 0.78);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Lang = styled.i`
  margin-left: auto;
  flex-shrink: 0;
  color: rgba(187, 181, 41, 0.85);
  font-family: "SFMono-Regular", "Consolas", monospace;
  font-size: 9.5px;
  font-style: normal;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Pre = styled.pre`
  margin: 0;
  padding: 14px 0;
  overflow-x: auto;
  background: #2b2b2b !important;
  font-family: "JetBrains Mono", "SFMono-Regular", "Consolas",
    "Liberation Mono", monospace;
  font-size: 12px;
  line-height: 1.7;
  tab-size: 4;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
  }

  code {
    display: inline-block;
    min-width: 100%;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 16px 0 0;
  white-space: pre;

  &:hover {
    background: rgba(255, 255, 255, 0.035);
  }
`;

const LineNo = styled.span`
  flex-shrink: 0;
  width: 42px;
  padding-right: 16px;
  text-align: right;
  color: #606366;
  user-select: none;
  font-variant-numeric: tabular-nums;
`;

const LineCode = styled.span`
  flex: 1;
`;
