//Define Global Variables
let menuList = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
let fragment = document.createDocumentFragment();
//End Global Variables

//A function to creata navbar list items dynamically
//START
let selectingSections = () => {
    for(let section of sections) {
        let ListItems = document.createElement("li");
        let listLinks = document.createElement("a");
        ListItems.append(listLinks);
        fragment.append(ListItems);
        listLinks.setAttribute("href",`#${section.id}`);
        listLinks.setAttribute("data-nav",`${section.dataset.nav}`);
        listLinks.classList.add("menu__link");
        listLinks.insertAdjacentText("afterBegin",`${section.dataset.nav}`);
    };
    menuList.appendChild(fragment);
};
selectingSections();
//END

//creating the intersection observation for each section in the document
///START
let options = {
    root: null,
    threshold: 0.7
};

//selectin all navbar list anchor tags
let activeListLinks = document.querySelectorAll("a");

/*observation function to detect if the sections is in the viewport or not &
add the proper classe to the nav link related to the highlighted section*/
//START
let sectionObserver = new IntersectionObserver((sections) => {
    sections.forEach(section => {
        activeListLinks.forEach(link => {
            if (section.isIntersecting && `${section.target.dataset.nav}` === `${link.dataset.nav}` || link.classList.contains(!"active-link")) {
                link.classList.add("active-link");
                section.target.classList.add("your-active-class");
            }else if (!section.isIntersecting  && `${section.target.dataset.nav}` !== `${link.dataset.nav}` || link.classList.contains("active-link")) {
                link.classList.remove("active-link");
                section.target.classList.remove("your-active-class");
            }
        });
    });
},options);

for (let section of sections) {
    sectionObserver.observe(section);
};
//END

/*scrolling smoothly to the appropriate section;
when clicking on the realted nav link in the navbar list*/
///START
for (let link of activeListLinks) {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        for (let section of sections) {
            if (`${section.dataset.nav}` === `${link.dataset.nav}`) {
                section.scrollIntoView({behavior: "smooth"});
            }
        };
    });
};
//END

//creating a scroll to top button
//START
let createScrollToTopBtn = () => {
    //creating button structure
    let btn = document.createElement("button");
    let btnFragment = document.createDocumentFragment();
    btnFragment.append(btn);
    btn.setAttribute("id", "toTopBtn");
    btn.insertAdjacentText("afterbegin", "Up");
    document.body.append(btn);
    //add a scroll to top functionality
    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    //add a dynmic styling functionality to the button
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 350) {
            btn.style.cssText = "display: block;"
        }else if (window.scrollY <= 100) {
            btn.style.cssText = "display: none;"
        }
    });
};
createScrollToTopBtn();
//END