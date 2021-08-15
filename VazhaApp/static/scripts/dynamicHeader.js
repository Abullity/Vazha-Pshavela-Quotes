let header = document.querySelector('header');
let prevScrollpos = window.pageYOffset;

document.addEventListener('scroll', function(){
	let currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		header.style.top = "0";
	} 
	else {
		header.style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
});
