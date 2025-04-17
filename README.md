This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 vNext Vision

A moon-shot architecture that treats every piece of fan media, every user interaction, and every community trend as signals in a single, self-evolving knowledge fabric—closer in spirit to Google's original Transformer leap or DeepSeek's efficiency breakthrough than to today's conventional recommender stacks.

### 1. Re-imagined Personalization / Recommendation System (codename "Constellation")

| Layer                         | Innovation Goal                                                | Core Techniques                                                                                                                                                                                                                                                          | Why It's Different                                                                                                      |
| :---------------------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| 1. Multimodal Knowledge Fabric (MKF) | Connect all media, fandom entities, tropes, moods, creators, and users in one vector space | • Graph-Transformer encoder that ingests:<br/>  - text (synopses, fanfic chapters) via a lightweight Distil-RoBERTa<br/>  - images/video key-frames via ViT CLIP embeddings<br/>  - audio snippets (OST, podfic) via wav2vec                                                       | Embeds any new asset in milliseconds—no "cold start." All modalities co-exist, letting a comic recommend a soundtrack and vice-versa. |
| 2. Self-Supervised Tag Genesis  | Generate and refine tags continuously without human bottlenecks | • Contrastive learning on MKF: cluster dense areas, auto-label with GPT-4o "tag suggestions"<br/>• Community voting integrates human creativity                                                                                                                        | Tags evolve with fandom slang (e.g., "Shadowheart angst") automatically; AO3 relies on wranglers, Constellation adapts in real time. |
| 3. Dual-Tower RetriRanker     | Millisecond retrieval plus fine-grained ranking                  | • Tower A: user intent vector (long-term + session RNN)<br/>• Tower B: item vector (MKF)<br/>• Approx-NN (FAISS/HNSW) retrieves 1 k candidates<br/>• Transformer cross-attention ranks top N (context-aware)                                                                   | Combines Spotify-style ANN speed with Netflix-grade ranking quality—yet each tower is only ~50 M params (mobile-friendly). |
| 4. Lightweight Reinforcement Bandit | Balance exploration / exploitation with almost zero extra training cost | • Thompson-Sampling contextual bandit on the ranker's uncertainty<br/>• Uses prediction entropy as exploration bonus                                                                                                                                               | No giant RL pipeline—just uncertainty-aware re-ordering. Learns in minutes from implicit feedback.                     |
| 5. Federated Fine-Tuning ("Star-Shards") | Personalize on-device without leaking raw behavior data       | • Tiny LoRA heads fine-tuned on-device against private embeddings<br/>• Periodic gradient sketches sent to server (FedAvg)                                                                                                                                                | Users get sharper recs after a single session; privacy stays intact (GDPR-friendly).                                 |
| 6. Explainability Layer ("Story Why") | Human-readable reasons for every suggestion                    | • Chain-of-thought distilled into templates (e.g., "Because you binged polyamory fix-it fics and ♥ Shadowheart art…")<br/>• At inference, selects top attention paths                                                                                             | Builds trust and sparks curiosity—turning AI outputs into shareable anecdotes.                                      |

### 2. Architectural Blueprint (High-Level)

```
┌──────────────┐    ingest    ┌─────────┐
│  Crawlers &  │─────────────▶│ MKF DB  │  (PG + PGVector)
│  Uploader    │             └─────────┘
└──────────────┘                    ▲
          ▲                         │
          │                         │ nightly self‑sup.
 new media│                 ┌──────────────────────┐
  & tags  │                 │ Self‑Supervised Tag  │
          │                 │     Genesis          │
┌─────────┴─────────┐       └──────────────────────┘
│  Supabase Events  │  user events      │
└─────────┬─────────┘                   │
          │   stream                    │
          ▼                             ▼
   ┌───────────────┐          ┌────────────────┐
   │ Event Bus     │─────────▶│  Dual‑Tower    │
   │  (Kafka)      │   cand.  │  RetriRanker   │
   └───────────────┘          └────────────────┘
                                   │  top‑N
                                   ▼
                         ┌─────────────────────┐
                         │  Bandit Re‑Ranker   │
                         └─────────────────────┘
                                   │
                                   ▼
                          ┌────────────────┐
                          │  API / UI      │
                          └────────────────┘
```

-   All heavy models (MKF encoder, ranker) run in a GPU micro-service cluster.
-   Dual-tower embeddings cached in PGVector; ANN queries < 5 ms.
-   User-level LoRA heads (Star-Shards) ~2 MB, stored in IndexedDB on device.

### 3. UX Re-Imagination (Breakout Features)

| Page / Surface | Innovative Twist                                                                                                        |
| :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Home           | Live "Fandom Constellation" backdrop—nodes glow as trends shift; clicking a star zooms to related media cluster.       |
| Explore        | Tunable diversity slider—users drag between "Comfort Zone" ↔ "Wild Discoveries," directly influencing bandit β.          |
| Work Detail    | Real-time "Readers also consumed" carousel sourced from Dual-Tower ANN; explainability chips hover ("90 % overlap in mood tags"). |
| Profile        | Taste DNA spiral—animated tag clusters sized by affinity; users toggle tags to refine recs (fed into user_tag_preferences). |
| Create         | AI-assist tagger: creators paste or upload; model proposes tags + hook blurb; creator accepts/edits, feeding Tag Genesis. |

### 4. MVP Cut (3-Month Build)

1.  **MKF v0**
    *   Text-only Transformer encoder (8-layer DistilRoBERTa)
    *   Tag embeddings stored in PGVector
    *   Simple ANN retrieval (FAISS)
2.  **Dual-Tower v0**
    *   User vector = mean of liked item vectors
    *   Cross-attention ranker deferred; use dot-product relevance
3.  **Bandit v0**
    *   ε-greedy (5 % exploration)
4.  **Federated fine-tuning = future toggle**

Budget: ~2 midsize engineers + 1 designer.

### 5. Beyond MVP – Moon-Shot Milestones

1.  Multimodal MKF (add image/audio encoders)
2.  Graph Transformer pre-training on whole tag graph
3.  Star-Shards federated LoRA for privacy-first on-device tuning
4.  Story Why natural-language rationales via small LLM distillation
5.  Real-time streaming bandit fed by WebSocket events (< 1 s adaptation)

### 6. Why This Pushes Boundaries

*   **One vector space for all fandom media.** AO3 can't cross-recommend comics; Netflix can't push novels. Constellation can.
*   **Self-evolving tags.** Eliminates the AO3 wrangler bottleneck and keeps pace with fandom slang.
*   **Federated personalization.** Users own their micro-model—a privacy approach even Spotify/Netflix haven't mainstreamed.
*   **Explainable AI.** Turns black-box recs into shareable mini-stories, boosting trust and social virality.
*   **Efficient by design.** Dual-Tower + ANN + LoRA fine-tuning keeps infra bills sane (DeepSeek-style efficiency).
