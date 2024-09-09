export const demo = () => /*html*/`
<div id="container">
    <div id="no-form-container">
        <p>No Form Tag</p>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname" value="" />
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value="" />
        <button
            value="Submit"
            hx-post="/demo3-post-response/"
            hx-include="#fname, #lname"
            hx-target="#result"
            hx-swap="innerHTML"
        >Submit</button>
    </div>
    <div id="form-container">
        <form hx-post="/demo3-post-response/" hx-target="#result">
            <p>Form Tag</p>
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="fname"/>
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="lname"/>
            <input type="submit" value="Submit" />
        </form>
    </div>
</div>
<div id="result"></div>`;