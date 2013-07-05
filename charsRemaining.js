/**
 * charsRemaining.js
 * A pure JavaScript (no dependencies) solution to make HTML
 *  form inputs and textareas display a count of characters remaining
 *
 * Copyright (c) 2013 Tyler Uebele
 * Released under the MIT license.  See included LICENSE.txt
 *  or http://opensource.org/licenses/MIT
 *
 * latest version available at https://github.com/tyleruebele/charsRemaining
 *
 *
 * To specify an input for inclusion add attribute maxlength=""
 *
 * Overlays will be span.js-charsRemaining, suggested styles in included css
 */

/**
 * Initialize charsRemaining on specified inputs
 */
function charsRemaining() {
	// Find all specified inputs
	var Inputs = document.querySelectorAll("input[maxlength],textarea[maxlength]");
	var Span, Input, Span2;
	for (var i = Inputs.length - 1; i >= 0; i--) {
		Input = Inputs[i];

		// Wrap the input in a span and overlay another span to house count
		Span = document.createElement('span');
		Span.style.position = 'relative';
		Span.style.display = 'inline-block';
		Input.parentNode.insertBefore(Span, Input);
		Input.parentNode.removeChild(Input);
		Span.appendChild(Input);
		Span2 = document.createElement('span');
		Span2.className = 'js-charsRemaining';
		Span2.style.display = 'none';
		Span2.style.position = 'absolute';
		Span.appendChild(Span2);

		Input.addEventListener('focus', charsRemaining.show);
		Input.addEventListener('keyup', charsRemaining.show);
		Input.addEventListener('blur', charsRemaining.hide);
		Input.addEventListener('change', charsRemaining.hide);
	}
}


/**
 * On Focus and KeyUp events display the overlay and update the count
 */
charsRemaining.show = function() {
	// Trim the value for browsers that don't enforce maxLength
	if (this.value.length > this.maxLength) {
		this.value = this.value.substr(0, this.maxLength);
	}

	// Update 'Characters Remaining' overlay
	var Span = this.nextSibling;
	Span.style.display = 'block';
	Span.innerHTML = (this.maxLength - this.value.length);
	Span.title = Span.innerHTML + ' Characters Remaining';
};

/**
 * On Blur and Change events, hide the overlay
 */
charsRemaining.hide = function() {
	// Trim the value for browsers that don't enforce maxLength
	this.value = this.value.substr(0, this.maxLength);

	// Hide 'Characters Remaining' overlay
	var Span = this.nextSibling;
	Span.style.display = 'none';
};


// Run charsRemaining() when the page loads
window.addEventListener
	? window.addEventListener('load', charsRemaining, false)
	: window.attachEvent && window.attachEvent('onload', charsRemaining)
;
