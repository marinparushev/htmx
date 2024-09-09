const createHomepageTemplate = () => /*html*/`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Localhost</title>
      <script 
        src="https://unpkg.com/htmx.org@2.0.2"
        integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
        crossorigin="anonymous">
        </script>
        <meta name="htmx-config" content='{"selfRequestsOnly":false}'>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <ol hx-target="#demo-content" hx-swap="innerHTML">
        <li hx-get="/demo/1">Demo (Hello World)</li>
        <li hx-get="/demo/2">Demo request params</li>
        <li hx-get="/demo/3">Demo loading indicator
            <img id="indicator" class="htmx-indicator" src="/spinner.webp" width="16" height="16"/>
        </li>
        <li hx-get="/demo/4">Demo CSS transitions</li>
        <li hx-get="/error404">Demo errors</li>
      </ol>
      <div id="demo-content"></div>
      <div id="error-container"></div>
    </body>
    <script>
        document.body.addEventListener('htmx:afterRequest', function (evt) {
            const errorTarget = document.getElementById("error-container")
            if (evt.detail.successful) {
                // Successful request, clear out alert
                errorTarget.setAttribute("hidden", "true")
                errorTarget.innerText = "";
            } else if (evt.detail.failed && evt.detail.xhr) {
                // Server error with response contents, equivalent to htmx:responseError
                console.warn("Server error", evt.detail)
                const xhr = evt.detail.xhr;
                errorTarget.innerText = 'Unexpected server error: ' + xhr.status + ' - ' + xhr.statusText;
                errorTarget.removeAttribute("hidden");
            } else {
                // Unspecified failure, usually caused by network error
                console.error("Unexpected htmx error", evt.detail)
                errorTarget.innerText = "Unexpected error, check your connection and try to refresh the page.";
                errorTarget.removeAttribute("hidden");
            }
        });
    </script>
  </html>
`;

export default createHomepageTemplate;