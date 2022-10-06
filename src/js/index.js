window.onload = () => {
    document.querySelector('.header__title').classList.add('header__title_loaded')

    if(!isTouchDevice()) {
        document.querySelector('.header').addEventListener('mousemove', event => { // Making a parallax effect
            document.querySelectorAll('.header-bg-layer').forEach(layer => {
                layer.style.transform = `translateX(${event.clientX / layer.dataset.slowdown}px) 
                    translateY(${event.clientY / layer.dataset.slowdown}px)`
            })
        })
    }

    const factsBlockObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                document.querySelector('.facts__statistics-scheme').classList.add('facts__statistics-scheme_loaded')
            }
        })
    }, { threshold: 0.6 })
    factsBlockObserver.observe(document.querySelector('.facts'))

    window.onscroll = () => {
        const navBar = document.querySelector('.header__nav-bar')

        if(window.scrollY > 200) {
            navBar.classList.add('header__nav-bar_sticky')
        }
        else if(window.scrollY == 0) {
            navBar.classList.remove('header__nav-bar_sticky')
        }
    }
}

function isTouchDevice() {
    try {
        document.createEvent('TouchEvent')
        return true;
    }
    catch (e) {
        return false;
    }
}

function goTo(sectionClassName) {
    document.querySelector(`.${sectionClassName}`).scrollIntoView({ behavior: 'smooth' })
}

function switchProject(direction) {
    const projects = Array.from(document.querySelectorAll('.project'))
    const currentProject = projects.filter(project => project.classList.contains('project_visible'))[0]
    const currentProjectIndex = projects.indexOf(currentProject)

    let targetProject

    if(direction == 'forward') {
        if(currentProjectIndex < projects.length - 1) {
            targetProject = projects[currentProjectIndex + 1]
        }
    }
    else if(direction == 'back') {
        if(currentProjectIndex != 0) {
            targetProject = projects[currentProjectIndex - 1]
        }
    }

    if(targetProject) {
        const targetProjectIndex = projects.indexOf(targetProject)
        currentProject.classList.remove('project_visible')
        targetProject.classList.add('project_visible')

        const projectsCounter = document.querySelector('.work__projects-counter')
        projectsCounter.classList.add('work__projects-counter_pulse')
        setTimeout(() => projectsCounter.classList.remove('work__projects-counter_pulse'), 300)
        projectsCounter.innerHTML = `
            0${targetProjectIndex + 1}/<sup class="work__projects-amount">04</sup>
        `
    }
}

function goToNextStep(event) {
    const steps = Array.from(document.querySelectorAll('.work-step'))
    const currentStep = event.target.parentElement
    const currentStepIndex = steps.indexOf(currentStep)

    event.target.classList.add('work-step-next_pressed')
    const nextStepIndex = currentStepIndex + 1
    const nextStep = steps[nextStepIndex]
    nextStep.querySelector('.work-step-description').classList.add('work-step-description_revealed')
    
    if(nextStepIndex < steps.length - 1) {
        nextStep.insertAdjacentHTML('beforeend', `
            <a class="work-step-next" onclick="goToNextStep(event)">
                NEXT STEP
                <span class="left-arrow">&gt;</span>
            </a>
        `)
    }
}