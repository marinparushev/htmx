export const demo = () => /*html*/`
    <div id="demo4">
        <div id="title">Original Content</div>
        <button hx-get='/demo4-1' hx-target="#demo4" hx-swap="outerHTML">Update</button>
    </div>`;