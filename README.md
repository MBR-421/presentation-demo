# Presentation Dashboard

A scrollable, animated React dashboard built to present a personal year-ahead strategy. Built with Vite, React, Framer Motion, and Tailwind CSS, with Microsoft Azure AD single sign-on via MSAL.

This started as a practical problem — I wanted a more engaging way to present my work than slides. It ended up as a component library I actually enjoyed building.

## Features

- Azure AD SSO via @azure/msal-react
- Scroll-linked parallax background and shrinking header
- Snap scroll sections with spring entrance animations
- KPI cards, project cards with progress tracking, timeline and tag components
- Right-side dot navigation rail
- Fully responsive

## Setup

Copy `.env.example` to `.env` and add your own Azure app registration details.
```env
VITE_AZURE_CLIENT_ID=your_client_id_here
VITE_TENANT_ID=your_tenant_id_here
```

Then install and run:
```bash
npm install
npm run dev
```