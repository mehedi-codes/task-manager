export const landingPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Task Manager</title>
    <style>
        html {
            height: 100%;
        }

        body {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fafafa;
            color: #171717;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            margin: 0;
        }

        main {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            text-align: center;
        }

        .emoji {
            font-size: 3.75rem;
            line-height: 1;
        }

        .heading-group > * + * {
            margin-top: 0.5rem;
        }

        h1 {
            font-size: 2.25rem;
            font-weight: 700;
            letter-spacing: -0.025em;
            margin: 0;
        }

        .version {
            font-size: 1.25rem;
            color: #737373;
            margin: 0;
        }

        .docs-link {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            border-radius: 0.75rem;
            background-color: #6b21a8;
            padding: 0.625rem 1.25rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
        }

        .docs-link:hover {
            background-color: #7e22ce;
        }

        .arrow {
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <main>
        <span class="emoji">📓</span>
        <div class="heading-group">
            <h1>Task Manager</h1>
            <p class="version">Version: 1.0.0</p>
        </div>
        <a href="/api/v1/docs" class="docs-link">
            API Documentation
            <span class="arrow">&rarr;</span>
        </a>
    </main>
</body>
</html>`;
