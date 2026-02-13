---
title: Homelab Infrastructure
description: Ansible-managed homelab running on Raspberry Pis with Docker services
---

# Homelab Infrastructure

Ansible-based infrastructure-as-code for my homelab setup, running on Raspberry Pis with Docker Compose services behind Traefik.

## Overview

This project manages my entire homelab declaratively — from base OS configuration to 20+ Docker services including media management, home automation, password management, and more.

## Key Features

- **Ansible Automation** — Full provisioning from bare metal to running services
- **Docker Compose** — All services templated as Jinja2 compose files
- **Traefik** — Reverse proxy with automatic Let's Encrypt certificates
- **Renovate** — Automated dependency updates for Docker images

## Links

- [GitHub Repository](https://github.com/PhyberApex/infra)
