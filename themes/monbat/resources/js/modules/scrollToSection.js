export const scrollToSection = () => {
    const headerHeight = document.querySelector("header.header").offsetHeight;

    document.addEventListener('click', e => {
        const href = e.target.getAttribute("href");

        if(href && href[0] === "#") {
            e.preventDefault();
            const target = document.getElementById(href.split('#')[1]);

            if(target) {
                const position = window.pageYOffset + target.getBoundingClientRect().top - headerHeight - 20;
                window.scroll({ top: position, behavior: "smooth" });
            }   
        } else {
            return;
        }
    });
}