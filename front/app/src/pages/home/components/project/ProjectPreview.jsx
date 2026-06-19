import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProjectPreview({ project }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const previewImages = project?.previewImages ?? [];

  const hasPreviewImages = previewImages.length > 0;
  const currentPreview = hasPreviewImages
    ? previewImages[selectedImageIndex]
    : null;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project]);

  if (!hasPreviewImages) {
    return null;
  }

  function handleSelectImage(index) {
    setSelectedImageIndex(index);
  }

  return (
    <PreviewSection>
      <PreviewHeader>
        <div>
          <SectionTitle>PREVIEW</SectionTitle>
          <PreviewDescription>
            프로젝트의 주요 화면을 이미지로 확인할 수 있습니다.
          </PreviewDescription>
        </div>

        <PreviewCount>
          {selectedImageIndex + 1} / {previewImages.length}
        </PreviewCount>
      </PreviewHeader>

      <PreviewLayout>
        <MainImageArea>
          <MainImage
            src={currentPreview.src}
            alt={`${project.title} ${currentPreview.label}`}
          />

          {currentPreview.label && (
            <MainImageLabel>{currentPreview.label}</MainImageLabel>
          )}
        </MainImageArea>

        {previewImages.length > 1 && (
          <ThumbnailScrollArea>
            {previewImages.map((image, index) => (
              <ThumbnailButton
                key={`${project.id}-preview-${index}`}
                type="button"
                onClick={() => handleSelectImage(index)}
                $active={selectedImageIndex === index}
                aria-label={`${project.title} ${image.label} 보기`}
              >
                <ThumbnailImage
                  src={image.src}
                  alt={`${project.title} ${image.label}`}
                />

                <ThumbnailLabel>{image.label}</ThumbnailLabel>
              </ThumbnailButton>
            ))}
          </ThumbnailScrollArea>
        )}
      </PreviewLayout>
    </PreviewSection>
  );
}

const PreviewSection = styled.section`
  margin-top: 46px;
  padding: clamp(18px, 2.4vw, 28px);

  border-radius: 28px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  background:
    radial-gradient(
      circle at 16% 8%,
      rgba(116, 130, 189, 0.13),
      transparent 30%
    ),
    rgba(229, 224, 223, 0.03);
`;

const PreviewHeader = styled.div`
  margin-bottom: 20px;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 8px;

  color: var(--portfolio-rose-beige);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.12em;
`;

const PreviewDescription = styled.p`
  margin: 0;

  color: var(--portfolio-text-muted);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.03em;
`;

const PreviewCount = styled.div`
  flex-shrink: 0;

  height: 32px;
  padding: 0 13px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  background-color: rgba(229, 224, 223, 0.07);
  border: 1px solid rgba(229, 224, 223, 0.08);

  color: var(--portfolio-text-sub);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.02em;
`;

const PreviewLayout = styled.div`
  height: 440px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 18px;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr) 200px;
  }

  @media (max-width: 860px) {
    height: auto;
    grid-template-columns: 1fr;
  }
`;

const MainImageArea = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  overflow: hidden;

  border-radius: 16px;
  border: 1px solid rgba(229, 224, 223, 0.1);
  background-color: rgba(9, 10, 16, 0.72);

  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025);

  @media (max-width: 860px) {
    height: 390px;
  }

  @media (max-width: 560px) {
    height: 280px;
    border-radius: 12px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;
  object-fit: cover;
  object-position: top center;
`;

const MainImageLabel = styled.div`
  position: absolute;
  left: 14px;
  top: 14px;
  z-index: 2;

  max-width: calc(100% - 28px);
  min-height: 31px;
  padding: 7px 12px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);

  color: #fff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;

  @media (max-width: 560px) {
    left: 10px;
    top: 10px;
    min-height: 28px;
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const ThumbnailScrollArea = styled.div`
  height: 100%;
  padding: 0 8px 0 0;

  display: flex;
  flex-direction: column;
  gap: 14px;

  overflow-y: auto;
  overscroll-behavior-y: contain;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.24);
  }

  &::-webkit-scrollbar-track {
    border-radius: 999px;
    background-color: rgba(229, 224, 223, 0.045);
  }

  @media (max-width: 860px) {
    height: auto;
    padding: 0 0 6px;

    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const ThumbnailButton = styled.button`
  position: relative;
  flex: 0 0 118px;

  width: 100%;
  height: 118px;
  overflow: hidden;

  border-radius: 8px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(202, 178, 168, 0.95)" : "rgba(229, 224, 223, 0.12)"};

  background-color: rgba(229, 224, 223, 0.045);
  opacity: ${({ $active }) => ($active ? 1 : 0.52)};

  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    border-color: rgba(202, 178, 168, 0.68);
  }

  ${({ $active }) =>
    $active &&
    `
      box-shadow:
        inset 0 0 0 1px rgba(202, 178, 168, 0.38),
        0 10px 22px rgba(0, 0, 0, 0.22);
    `}

  @media (max-width: 860px) {
    flex: 0 0 160px;
    width: 160px;
    height: 90px;
  }

  @media (max-width: 560px) {
    flex-basis: 128px;
    width: 128px;
    height: 72px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;
  object-fit: cover;
  object-position: top center;

  transform: scale(1.08);
  transform-origin: top center;
`;

const ThumbnailLabel = styled.span`
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 2;

  max-width: calc(100% - 16px);
  min-height: 24px;
  padding: 5px 9px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);

  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.035em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
