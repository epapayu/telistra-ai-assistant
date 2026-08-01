#!/usr/bin/env bash
set -e

PROJECT_ID="gecx-485707"
SERVICE_NAME="telistra-web"
REGION="us-central1"

echo "=========================================================================="
echo "          TELISTRA — GOOGLE CLOUD RUN DEPLOYMENT SCRIPT"
echo "=========================================================================="
echo "Project ID : ${PROJECT_ID}"
echo "Service    : ${SERVICE_NAME}"
echo "Region     : ${REGION}"
echo "--------------------------------------------------------------------------"

# Ensure required APIs are enabled
echo "[1/3] Verifying Cloud Run, Cloud Build, and Artifact Registry APIs on project ${PROJECT_ID}..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project="${PROJECT_ID}" --quiet

# Deploy container directly from source using Buildpacks or Dockerfile
echo "[2/3] Deploying ${SERVICE_NAME} to Google Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --allow-unauthenticated \
  --quiet

echo "--------------------------------------------------------------------------"
echo "[3/3] Deployment complete! Retrieving live URL..."
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" --project="${PROJECT_ID}" --region="${REGION}" --format="value(status.url)")
echo "SUCCESS: Telistra is live at: ${SERVICE_URL}"
echo "=========================================================================="
