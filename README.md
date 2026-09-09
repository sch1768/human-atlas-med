# Human Atlas Med (3D Anatomy Studio)

[🇺🇸 English](#-english) | [🇰🇷 한국어](#-한국어)

---

## 🇺🇸 English

### Interactive 3D Anatomy & Clinical Medicine Explorer

**Human Atlas Med** is an advanced interactive 3D human anatomy platform built with **React 19**, **Three.js**, **TypeScript**, and **shadcn/ui**. Based on the BodyParts3D reference model, it extends beyond a standard 3D viewer into a clinical and educational anatomy platform featuring multi-dimensional exploration (Systemic, Regional, and Clinical Spaces), comprehensive bilingual anatomical terminology (English & Korean new/traditional terms), and spatial relationship networks.

---

### Key Features

#### 1. 3-Way Anatomical Exploration
- **Systemic Anatomy (계통해부학)**: Toggle, isolate, and inspect 15 biological systems (skeletal, muscular, circulatory, nervous, digestive, etc.).
- **Regional Anatomy (국소해부학)**: Structured hierarchical navigation across clinical body regions (Head & Neck, Thorax, Abdomen, Pelvis & Perineum, Upper & Lower Limbs).
- **Clinical Spaces & Landmarks (임상해부학 공간)**: Dedicated focus on high-yield clinical landmarks and compartments (e.g., Femoral Triangle, Inguinal Canal, Carotid Triangle, Retroperitoneal Space) with structural boundaries and contents.

#### 2. Bilingual Terminology & Intelligent Search
- **Standardized Medical Terms**: Full coverage of standardized modern Korean anatomical terms (신용어), traditional/hanja terms (구용어), and standard English nomenclature.
- **3-Way Real-time Search**: Search seamlessly using English, modern Korean, or traditional medical terms without configuration.

#### 3. Spatial & Functional Relationships
- **Structural Connectivity**: Explore adjacent organs, neurovascular supply, and spatial relationships directly from the inspection panel.
- **Composite Concepts**: Group discrete anatomical meshes into meaningful whole organs and functional units.

#### 4. High-Performance 3D Interaction
- **2,200+ Selectable Meshes**: Individual selection, multi-hide, undo, and single-structure isolation (`Isolate Mode`).
- **Exploded View (Inventory Mode)**: Spread visible components across space to examine complex assemblies and spatial topologies.
- **Optimized Rendering**: GPU-driven batch rendering, per-structure lookup textures, and low-latency interaction on desktop and mobile browsers.

---

### Getting Started

#### Prerequisites
- **Node.js**: `22.13.0` or higher
- **Package Manager**: `npm`

#### Installation & Run
```sh
# Clone the repository
git clone https://github.com/sch1768/human-atlas-med.git
cd human-atlas-med

# Install dependencies
npm ci

# Start the local development server
npm run dev
```

Open [http://localhost:3016](http://localhost:3016) in your browser.

#### Building for Production
```sh
npm run build
```
The optimized static build will be generated in the `dist/` directory.

---

### Project Structure

```text
├── app/
│   ├── page.tsx               # Main application controller & interactive layout
│   ├── scene.tsx              # Three.js 3D viewport & camera orbit management
│   ├── anatomy.ts             # Core anatomy definitions & state structures
│   ├── korean-anatomy.ts      # Korean-English medical dictionary (신용어/구용어)
│   ├── regional-anatomy.ts    # Regional hierarchy definitions
│   ├── spaces.ts              # Clinical anatomical spaces (boundaries & contents)
│   ├── relationships.ts       # Organ-to-organ spatial/functional relationships
│   └── composite-concepts.ts  # Complex organ/system grouping mappings
├── scripts/                   # Model validation, optimization & conversion scripts
├── public/                    # 3D assets, compressed geometry & attribution tables
└── web/                       # HTML entry point & web manifest
```

---

### Data & Attribution

- **Anatomical Geometry**: Based on **BodyParts3D 4.0** (Adult Male Reference Anatomy), licensed under **CC BY 4.0**.
- **Simplification & Packaging**: Meshes have been mathematically simplified (0.2% error threshold) and compressed for fast web streaming.
- Details regarding original creators and dataset adaptations can be found in [ATTRIBUTION.md](public/ATTRIBUTION.md).

*Disclaimer: This project is designed for educational and study purposes (e.g., medical students, anatomy education) and is not intended for direct clinical diagnosis or surgical planning.*

---

### License

- **Source Code**: Released under the [MIT License](LICENSE) (c) 2026 ashemag & sch1768.
- **Anatomy 3D Data**: Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (BodyParts3D, DBCLS).

---
---

## 🇰🇷 한국어

### 의학 학습 및 임상 해부학을 위한 인터랙티브 3D 아틀라스

**Human Atlas Med**는 **React 19**, **Three.js**, **TypeScript**, **shadcn/ui**를 기반으로 구축된 웹 기반 3D 인체 해부학 학습 플랫폼입니다. BodyParts3D 참조 데이터를 바탕으로 단순 3D 뷰어를 넘어, 의학도 및 의료계 종사자의 학습(KMLE, 임종평 등)에 최적화된 **다차원 해부학 탐색 체계(계통·국소·임상공간)**와 **의학 표준 신용어·구용어·영문 3-Way 통합 검색**을 지원합니다.

---

### 주요 기능

#### 1. 3가지 차원의 체계적인 해부학 탐색
- **계통해부학 (Systemic Anatomy)**: 골격계, 근육계, 순환기계, 신경계, 소화기계 등 15개 계통별 선택적 가시화, 투명도 조절 및 격리 뷰 지원.
- **국소해부학 (Regional Anatomy)**: 두경부(Head & Neck), 흉부(Thorax), 복부(Abdomen), 골반·회음(Pelvis & Perineum), 상·하지(Limbs) 등 실제 임상에서 쓰이는 부위별 계층 구조 탐색.
- **임상해부학 공간 (Clinical Spaces)**: 대퇴삼각(Femoral Triangle), 서혜관(Inguinal Canal), 목삼각, 후복막강 등 수술 및 국가시험 빈출 임상 구획의 경계(Boundaries)와 통과 구조물(Contents) 시각화.

#### 2. 의학 표준 신용어 / 구용어 / 영문 3-Way 검색
- **정밀한 한국어 의학 사전 탑재**: 대한의학회 권장 **신용어**(예: 넙다리뼈, 큰그물막), 임상 및 원서에서 널리 쓰이는 **구용어/한자어**(예: 대퇴골, 대망), **영문 공식 명칭**을 모두 매핑.
- **자유로운 실시간 검색**: 영문, 한글 신용어, 한글 구용어 중 어떤 단어를 입력해도 즉각 구조물을 탐색하고 포커싱.

#### 3. 해부학적 관계망 및 복합 장기 (Relationships & Concepts)
- **공간·기능적 연결망**: 특정 장기를 선택했을 때 인접한 주요 혈관, 신경, 장기와의 관계를 패널에서 한눈에 확인.
- **복합 구조물 그룹핑**: 수천 개의 단일 메쉬 조각들을 의미 있는 단일 장기 단위로 묶어 직관적으로 학습 가능.

#### 4. 고성능 3D 조작 및 분해(Explosion) 뷰
- **2,200개 이상의 개별 메쉬 제어**: 개별 선택, 숨기기(Hide), 실행 취소(Undo), 단일 구조물만 집중해서 보는 격리 모드(`Isolate`).
- **인벤토리 분해 뷰 (Explosion Mode)**: 조립된 상태의 신체 구조물을 3차원 공간으로 펼쳐 각 부품의 형태와 연결 상태를 입체적으로 관찰.
- **웹 최적화 GPU 렌더링**: 수천 개의 메쉬를 GPU 텍스처 인덱싱과 배치 렌더링으로 처리하여 모바일 및 저사양 환경에서도 부드러운 60FPS 조작 보장.

---

### 시작하기

#### 요구 사양
- **Node.js**: `22.13.0` 이상
- **패키지 관리자**: `npm`

#### 설치 및 실행
```sh
# 저장소 복제
git clone https://github.com/sch1768/human-atlas-med.git
cd human-atlas-med

# 의존성 패키지 설치
npm ci

# 로컬 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3016](http://localhost:3016)으로 접속합니다.

#### 프로덕션 빌드
```sh
npm run build
```
빌드 산출물은 `dist/` 폴더에 생성되며, 정적 호스팅 서비스(Vercel, GitHub Pages 등)에 바로 배포할 수 있습니다.

---

### 프로젝트 구조

```text
├── app/
│   ├── page.tsx               # 메인 인터페이스 및 상태 관리
│   ├── scene.tsx              # Three.js 3D 씬 및 카메라 조작 엔진
│   ├── anatomy.ts             # 해부학 코어 데이터 구조 정의
│   ├── korean-anatomy.ts      # 한국어 의학 용어 사전 (신용어/구용어/영문)
│   ├── regional-anatomy.ts    # 국소해부학 계층 분류 체계
│   ├── spaces.ts              # 임상해부학적 주요 공간 (경계 및 내용물)
│   ├── relationships.ts       # 구조물 간 인접/기능적 관계망
│   └── composite-concepts.ts  # 장기 복합체 그룹핑 매핑
├── scripts/                   # 3D 모델 검증, 압축 및 최적화 스크립트
├── public/                    # 3D 메쉬 바이너리, 압축 지오메트리 및 라이선스 고지
└── web/                       # HTML 엔트리포인트 및 PWA 매니페스트
```

---

### 데이터 및 저작권 안내

- **해부학 3D 지오메트리**: 일본 DBCLS의 **BodyParts3D 4.0** (성인 남성 표준 해부 모델)을 기반으로 하며, **CC BY 4.0** 라이선스를 따릅니다.
- **지오메트리 최적화**: 웹 환경에서의 초고속 로딩을 위해 0.2% 오차 한도 내에서 지오메트리 경량화 및 압축이 적용되어 있습니다.
- 상세한 출처 및 원작자 표기는 [ATTRIBUTION.md](public/ATTRIBUTION.md)에서 확인할 수 있습니다.

*주의: 본 프로젝트는 의학 교육 및 학습 보조 도구로 개발되었으며, 실제 환자의 임상 진단이나 수술 계획을 위한 의료기기가 아닙니다.*

---

### 라이선스 (License)

- **애플리케이션 코드**: [MIT License](LICENSE) (c) 2026 ashemag & sch1768.
- **해부학 3D 데이터**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (BodyParts3D, DBCLS).
