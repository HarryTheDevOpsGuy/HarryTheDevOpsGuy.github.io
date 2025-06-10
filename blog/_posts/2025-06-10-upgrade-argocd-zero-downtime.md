---
layout: post
title: "Zero-Downtime ArgoCD Upgrades: A Production-Ready Strategy"
date: 2024-01-16
author: Hari Prasad
tags: [ArgoCD, GitOps, DevOps, Kubernetes, CI/CD, HA, ZeroDowntime, Helm]
---

ArgoCD is the backbone of modern GitOps workflows — but how do you **upgrade it safely in production** without disrupting deployments or risking cluster stability?

In this post, I’ll walk you through a **battle-tested, zero-downtime ArgoCD upgrade strategy** using Helm, readiness probes, and HA best practices.

---

## ⚙️ Why Zero-Downtime Matters in GitOps

If ArgoCD goes down mid-deployment or loses sync state, it can cause:

- ❌ Blocked deployments
- ❌ Web UI/API inaccessibility
- ❌ Missed alerts or drift detection

In multi-team setups, **GitOps downtime is equivalent to CI/CD outage** — so we must upgrade it like we upgrade production apps: safely and gradually.

---

## 🛠️ Prerequisites

To follow this process, ensure:

- ArgoCD is deployed in **HA mode** (replicas for controller/server)
- You have access via `kubectl` and/or `argocd` CLI
- Backups and monitoring are in place
- Upgrades are planned during a **low-risk release window**

---

## 📋 Step-by-Step: Upgrade ArgoCD Without Downtime

### 1. 🧪 Check Latest Stable Version

```bash
VERSION="v2.10.5"  # Example: check https://github.com/argoproj/argo-cd/releases



### 2. 🧯 Backup CRDs and App State

kubectl get applications.argoproj.io -A -o yaml > apps-backup.yaml
kubectl get configmaps,secrets -n argocd -o yaml > config-backup.yaml


---

### 3. ⏸️ Pause Sync (Optional for Sensitive Apps)

argocd app list | awk '{print $1}' | tail -n +2 | xargs -I{} argocd app set {} --sync-policy none


---

### 4. 🚀 Upgrade ArgoCD via Helm (Rolling, Safe)

helm repo update

helm upgrade argocd argo/argo-cd \
  --namespace argocd \
  --version $VERSION \
  --reuse-values

Helm performs rolling upgrades respecting readinessProbe. HA mode ensures availability during restarts.


---

### 5. ✅ Verify Pod Health Post-Upgrade

kubectl rollout status deploy/argocd-repo-server -n argocd
kubectl rollout status deploy/argocd-application-controller -n argocd
kubectl rollout status deploy/argocd-server -n argocd

argocd version
argocd app list


---

### 6. 🔄 Resume Sync (If Paused)

argocd app list | awk '{print $1}' | tail -n +2 | xargs -I{} argocd app set {} --sync-policy automated


---

🔐 Optional: Upgrade Using Kustomize or Raw YAML

For GitOps-managed ArgoCD installs, use version-pinned manifests:

VERSION="v2.10.5"
curl -sSL -o argocd-install.yaml https://raw.githubusercontent.com/argoproj/argo-cd/$VERSION/manifests/install.yaml
kubectl apply -n argocd -f argocd-install.yaml


---

📊 Post-Upgrade Checks

[x] argocd version reflects target version

[x] All pods healthy with no CrashLoop

[x] Git sync working for all apps

[x] Dex/OIDC login still functional

[x] Audit & metrics still collected (Prometheus, Loki, etc.)



---

🧠 Best Practices for ArgoCD Upgrades

Practice	Why it Matters

HA mode enabled	Keeps API/UI available during upgrades
Helm-managed installation	Safer, idempotent, easy to rollback
Readiness/Liveness probes	Prevents premature cutover of restarted pods
Pause critical app syncs	Avoids race conditions during manifest drift
Monitor post-upgrade state	Watch drift, sync failures, login issues



---

🧭 GitOps-Based Upgrade (Advanced)

You can even upgrade ArgoCD using ArgoCD itself (self-managed GitOps), by:

1. Creating a new Application pointing to the ArgoCD manifest repo


2. Tagging a new VERSION in Git


3. Letting ArgoCD upgrade itself using the standard reconciliation loop




---

🚧 Bonus: Upgrade Without Helm (Non-Helm Users)

For manifests-based deployments:

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.10.5/manifests/install.yaml

Ensure rollout is smooth and no resources are deleted unintentionally.


---

🚀 Final Thoughts

ArgoCD upgrades don’t have to be risky. With proper rollout strategy, backups, and health probes, you can upgrade ArgoCD with zero user-facing downtime — even in large clusters with hundreds of apps.
