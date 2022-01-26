let api = `https://api.shrtco.de/v2/shorten?url=[]`

let mainContainer = document.querySelector(".container")

const urlEl = document.getElementById("url")
const generateBtn = document.querySelector(".generate-btn")
const domains = document.querySelectorAll(".domain")

let generatedUrl;

generateBtn.addEventListener("click" , getShortenURL)

window.addEventListener("keydown" , () => {
    if (event.keyCode === 13) {
        getShortenURL()
    }
})

async function getShortenURL() {
    let resultContainer = document.createElement("div")
    resultContainer.className = "result"
    let resultHeading = document.createElement("h2")
    resultHeading.className = "result-heading"
    resultHeading.innerText = "Link generated!!"
    let generatedURL = document.createElement("a")
    generatedURL.className = "generated-url"

    let socialsContainer = document.createElement("div")
    socialsContainer.classList.add("socials")

    let shareLinkFB = document.createElement("div")
    shareLinkFB.classList.add("share-link")
    shareLinkFB.classList.add("fb")
    let iconFB = document.createElement("i")
    iconFB.classList.add("fab")
    iconFB.classList.add("fa-facebook-f")

    let shareLinkTW = document.createElement("div")
    shareLinkTW.classList.add("share-link")
    shareLinkTW.classList.add("tw")
    let iconTW = document.createElement("i")
    iconTW.classList.add("fab")
    iconTW.classList.add("fa-twitter")

    let shareLinkMAIL = document.createElement("a")
    shareLinkMAIL.classList.add("share-link")
    shareLinkMAIL.classList.add("mail")
    let iconMAIL = document.createElement("i")
    iconMAIL.classList.add("fas")
    iconMAIL.classList.add("fa-envelope")

    let shareLinkWA = document.createElement("div")
    shareLinkWA.classList.add("share-link")
    shareLinkWA.classList.add("wa")
    let iconWA = document.createElement("i")
    iconWA.classList.add("fab")
    iconWA.classList.add("fa-whatsapp")

    let shareLinkTG = document.createElement("div")
    shareLinkTG.classList.add("share-link")
    shareLinkTG.classList.add("tg")
    let iconTG = document.createElement("i")
    iconTG.classList.add("fab")
    iconTG.classList.add("fa-telegram-plane")

    let copy = document.createElement("div")
    copy.classList.add("share-link")
    copy.classList.add("cp")
    let iconCP = document.createElement("i")
    iconCP.classList.add("fas")
    iconCP.classList.add("fa-clipboard")

    shareLinkFB.append(iconFB)
    shareLinkTW.append(iconTW)
    shareLinkMAIL.append(iconMAIL)
    shareLinkWA.append(iconWA)
    shareLinkTG.append(iconTG)
    copy.append(iconCP)
    
    socialsContainer.append(shareLinkFB,shareLinkTW,shareLinkMAIL,shareLinkWA,shareLinkTG,copy)

    let socialLinks = [shareLinkFB,shareLinkTW,shareLinkMAIL,shareLinkWA,shareLinkTG,copy]

    socialLinks.forEach(link => {
        link.addEventListener("click" , (e) => {
            let shortenURL = e.currentTarget.parentNode.parentNode.children[1].innerText

            let fb = `https://www.facebook.com/sharer.php?u=${shortenURL}`
            let tw = `https://twitter.com/share?url=${shortenURL}`
            let mail = `mailto:?subject=${shortenURL}`;
            let wa = `https://api.whatsapp.com/send?text=${shortenURL}`
            let tg = `https://telegram.me/share/url?url=${shortenURL}`

            if (link.classList.contains("fb")) {
                shareLink(fb)
            }else if (link.classList.contains("tw")) {
                shareLink(tw)
            }else if (link.classList.contains("mail")) {
                shareLinkMAIL.href = mail
            }else if (link.classList.contains("wa")) {
                shareLink(wa)
            }else if (link.classList.contains("tg")) {
                shareLink(tg)
            }else if (link.classList.contains("cp")) {
                    copyToClipBoard(shortenURL)
            }
        })
    })

    function copyToClipBoard(url) {
        const textarea = document.createElement("textarea")
        textarea.value = url
        document.body.append(textarea)
        textarea.select()
        document.execCommand("copy")
        textarea.remove()

        alert("shorten url copied")
    }

    function shareLink(link) {
        open(link)
    }

    generateURL(generatedUrl)

    async function generateURL(generatedUrl) {
        if(urlEl.value != "") {
            api = `https://api.shrtco.de/v2/shorten?url=${urlEl.value}`
            let selectedDomain = document.querySelector(".selected")
            let data = await fetch(api)
            let res = await data.json()
            if (selectedDomain.classList.contains("one")) {
                generatedUrl = res.result.short_link
            }else if (selectedDomain.classList.contains("two")) {
                generatedUrl = res.result.short_link2
            }else {
                generatedUrl = res.result.short_link3
            }
            appendURLToDOM(generatedUrl)
        }else {
            alert("Please enter url...")
        }
    }

    function appendURLToDOM(url) {
        let newUrl = urlEl.value;
        generatedURL.innerText = `${url}`
        generatedURL.href = newUrl.includes("https://") || newUrl.includes("http://")
        ?`${newUrl}` 
        :  `https://${newUrl}`
        generatedURL.setAttribute("target","_blank")
        resultContainer.append(resultHeading,generatedURL,socialsContainer)
        mainContainer.append(resultContainer)
        resetValue()
    }
}

function resetValue() {
    urlEl.value = ""
    urlEl.focus()
}

domains.forEach(domain => {
    getSelectedDomain(domain)
})

function getSelectedDomain(domain) {

    domain.addEventListener("click", (e) => {
        domains.forEach(domain => {
            domain.classList.remove("selected")
        })
        e.currentTarget.classList.add("selected")
    })

}


