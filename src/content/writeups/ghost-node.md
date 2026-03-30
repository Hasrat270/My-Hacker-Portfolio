---
title: "Ghost Node"
date: "2026-03-22"
tags:
  - Linux
  - Pwn
  - Privilege Escalation
excerpt: "Deep dive into the Ghost Node compromise and root escalation chain."
---

## Target overview

Ghost Node is a hardened Linux host with a custom kernel module and a network-facing service. The initial foothold comes from a weak service binary and local privilege escalation is achieved through an unsafe setuid helper.

## Exploitation chain

1. Recon: discovered open SSH and internal web service.
2. Service abuse: crafted input to trigger buffer overflow in the monitoring daemon.
3. Shell: obtained low-privilege shell through remote command execution.
4. Privilege escalation: abused a setuid helper and kernel module interface.

## Notes

- Keep payloads stealthy.
- Monitor userland commands and environment variables.
- Remove artifact files after post-exploitation.

> This writeup is built with Astro and renders as markdown content inside a hacker-style portfolio.
