import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to OG image size (1200x630 is standard)
  await page.setViewport({ width: 1200, height: 630 });

  // Create HTML content that matches the design
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #0a1628 0%, #0f1f2e 100%);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          width: 100%;
          max-width: 1200px;
          padding: 60px;
          align-items: center;
        }

        .left {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        h1 {
          font-size: 72px;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
          line-height: 1.1;
        }

        .tagline {
          font-size: 24px;
          color: #9ca3af;
          line-height: 1.4;
        }

        .install-block {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 8px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Monaco', monospace;
          font-size: 16px;
          backdrop-filter: blur(10px);
        }

        .prompt {
          color: #10b981;
        }

        .install-cmd {
          color: #e2e8f0;
        }

        .badges {
          display: flex;
          gap: 12px;
        }

        .badge {
          border: 1px solid rgba(59, 130, 246, 0.5);
          color: #3b82f6;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .right {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 8px;
          padding: 24px;
          font-family: 'Monaco', monospace;
          font-size: 12px;
          line-height: 1.6;
          backdrop-filter: blur(10px);
        }

        .code-line {
          margin: 8px 0;
        }

        .command {
          color: #10b981;
        }

        .label {
          color: #cbd5e1;
        }

        .value {
          color: #f1f5f9;
        }

        .risk {
          color: #f87171;
        }

        .alert {
          color: #fbbf24;
        }

        .footer {
          position: absolute;
          bottom: 20px;
          left: 60px;
          color: #64748b;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="left">
          <h1>gate</h1>
          <div class="tagline">PII redaction for AI agents</div>
          <div class="tagline" style="color: #6b7280; font-size: 18px;">
            Intercept · Detect · Redact — before data reaches the model
          </div>
          <div class="install-block">
            <span class="prompt">$</span>
            <span class="install-cmd">brew tap GaaraZhu/gate && brew install gate</span>
          </div>
          <div class="badges">
            <div class="badge">MIT</div>
            <div class="badge">v0.9.2</div>
            <div class="badge">Rust</div>
          </div>
        </div>

        <div class="right">
          <div class="code-line"><span class="command">$ psql</span> <span class="label">...</span> <span class="command">| gate scan</span></div>
          <div class="code-line"></div>
          <div class="code-line"><span class="label">PII exposure:</span> <span style="color: #64748b;">████████░░</span> <span class="value">71.9%</span></div>
          <div class="code-line"><span class="risk">Risk: CRITICAL</span></div>
          <div class="code-line"></div>
          <div class="code-line"><span class="label">Government IDs 14 cols</span></div>
          <div class="code-line"><span class="label">Financial 8 cols</span></div>
          <div class="code-line"><span class="label">Health & medical 7 cols</span></div>
          <div class="code-line"><span class="label">Contact 13 cols</span></div>
          <div class="code-line"><span class="label">Names 13 cols</span></div>
          <div class="code-line"></div>
          <div class="code-line"><span class="alert">→ [REDACTED:ird_number]</span></div>
          <div class="code-line"><span class="alert">→ [REDACTED:email]</span></div>
        </div>
      </div>

      <div class="footer">gate.gzhu.co.nz</div>
    </body>
    </html>
  `;

  await page.setContent(html);

  const outputPath = path.join(process.cwd(), 'public', 'og-default.png');
  await page.screenshot({ path: outputPath, type: 'png' });

  console.log('✓ OG image generated:', outputPath);

  await browser.close();
})();
