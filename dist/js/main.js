"use strict";

import {pricingCostObj, pricingTimeObj} from './pricing.js'

const containerLoc = document.querySelector(".container")
const formPagesLoc = document.querySelector(".form-pages")
const formPageArrLoc = document.querySelectorAll(".form-page")
const buttonNextArrLoc = document.querySelectorAll(".button.move-next")
const buttonPrevArrLoc = document.querySelectorAll(".button.prev")

const carConditionLoc = document.querySelector(".summary-page .carCondition")
const carSizeLoc = document.querySelector(".summary-page .carSize")

const paintRenewalItemsLoc = document.querySelector(".summary-page .paintRenewalItems")
const foilItemsLoc = document.querySelector(".summary-page .foilItems")
const paintProtectItemsLoc = document.querySelector(".summary-page .paintProtectItems")
const stylingItemsLoc = document.querySelector(".summary-page .stylingItems")
const additionalServicesItemsLoc = document.querySelector(".summary-page .additionalServicesItems")

const stylingPriceLoc = document.querySelector(".stylingPrice")
const paintRenewalPriceLoc = document.querySelector(".paintRenewalPrice")
const foilPriceLoc = document.querySelector(".foilPrice")
const paintProtectPriceLoc = document.querySelector(".paintProtectPrice")       
const additionalServicesPriceLoc = document.querySelector(".additionalServicesPrice") 

const endTotalPriceLoc = document.querySelector(".summary-page .totalPrice")

const page1Loc = document.querySelector(".page1")
const page2Loc = document.querySelector(".page2")
const page3Loc = document.querySelector(".page3")
const page3_1Loc = document.querySelector(".page3_1")
const page3_2Loc = document.querySelector(".page3_2")
const page3_3Loc = document.querySelector(".page3_3")
const page3_5Loc = document.querySelector(".page3_5")
const pageSummaryLoc = document.querySelector(".summary-page")

// stan auta
let page1; // nowe 1, używane 2

// wielkość auta
let page2; // małe 1, średnie 2, duże i suv 3, duże suv i większe 4

// kategoria
let page3_1; // stylizacja
let page3_2; // renowacja i ochrona lakieru
let page3_3; // bezbarwne folie ochronne ppf
// let page3_4; // wnętrze
let page3_5; // dodatkowe
// let page3Array = [page3_1, page3_2, page3_3, page3_4, page3_5]
let page3Array = [page3_1, page3_2, page3_3, page3_5]

//stylizacja
let page3_1_1; // przyciemnianie szyb
let page3_1_2; // przyciemnianie lamp
let page3_1_3; // dechroming
let page3_1_4; // zmiana koloru całego auta
let page3_1_5; // zmiana koloru dachu
let page3_1_6; // zmiana koloru lusterek
let page3_1Array = [page3_1_1, page3_1_2, page3_1_3, page3_1_4, page3_1_5, page3_1_6]

//renowacja i ochrona lakieru
let page3_2_1; // stan lakieru: nowy 1, 1-6m 2, 6-12m 3, pow.6 4
let page3_2_2; // efekt: 1-etapowe odśw. lakieru 1, 2-etapowa korekcja lakieru
let page3_2_3; // poziom zabezpieczenia: woskowanie 1, roczna ceramika 2, 3-letnia ceramika 3, 4-letnia ceramika 4

//bezbarwne folie ochronne ppf
let page3_3_1; // pakiety: bikini 1, full front 2, full body 3

//wnętrze
// let page3_4_1; // podstawowe czyszcz.
// let page3_4_2; // tap. materiał.
// let page3_4_3; // tap. skórzana
// let page3_4_4; // czyszcz i zab. skór
// let page3_4_5; // pranie i impreg. tap. mater.
// let page3_4Array = [page3_4_1, page3_4_2, page3_4_3, page3_4_4, page3_4_5]

//dodatkowe
let page3_5_1; // reflekt. ceram
let page3_5_2; // reflekt. folia
let page3_5_3; // felgi ceram
let page3_5_4; // szyby ceram
let page3_5_5; // impreg. dachu
let page3_5_6; // wosk. lakieru
let page3_5Array = [page3_5_1, page3_5_2, page3_5_3, page3_5_4, page3_5_5, page3_5_6]

// przewijanie stron

const movePage = (factor, direction) => {

    const actualPosition = Number(getComputedStyle(formPagesLoc).left.slice(0, getComputedStyle(formPagesLoc).left.length-2))
    const containerWidth = Number(getComputedStyle(containerLoc).width.slice(0, getComputedStyle(containerLoc).width.length-2))
    const leftContainerBorder = Number(getComputedStyle(containerLoc).borderLeftWidth.slice(0, getComputedStyle(containerLoc).borderLeftWidth.length-2))
    const rightContainerBorder = Number(getComputedStyle(containerLoc).borderRightWidth.slice(0, getComputedStyle(containerLoc).borderRightWidth.length-2))

    const leftPagesBorder = Number(getComputedStyle(formPagesLoc).borderLeftWidth.slice(0, getComputedStyle(formPagesLoc).borderLeftWidth.length-2))
    const rightPagesBorder = Number(getComputedStyle(formPagesLoc).borderRightWidth.slice(0, getComputedStyle(formPagesLoc).borderRightWidth.length-2))

    const containerWidthWithoutBorder = containerWidth * factor - leftContainerBorder - rightContainerBorder - leftPagesBorder - rightPagesBorder
    const newLeftValue = actualPosition + direction * containerWidthWithoutBorder

    let animation_time = 0.5 
    let delay_time = 500
    
    formPagesLoc.style.transition = `left ${animation_time}s ease-out`; // animacja nadmiarowa w prawo
    formPagesLoc.style.left = newLeftValue + direction * 100 + "px"

    setTimeout(()=> {
        formPagesLoc.style.transition = `left 0.5s ease-out`; // animacja wyrównania z powrotem z nadmiaru
        formPagesLoc.style.left = newLeftValue + "px"
    }, delay_time)

    setTimeout(()=> {
        formPagesLoc.style.transition = `left ${animation_time}s ease-in`; // przywrócenie pierwotnego czasu animacji
    }, delay_time + 100)
        
}

// walidacje

const validateEmpty = (value) => {
    if (!value) return [false, "Błąd: Pole adres e-mail nie może być puste!"]
    return [true, ""]
}

const validateEmail = (value) => {
    if (!String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
       return [false, "Błąd: Adres e-mail jest nieprawidłowy!"]
    }
    return [true, ""]
}

const validateCheckbox = (value)=> {
    if (!value.checked) return [false, "Bład: Wymagane zaznaczenie zgody!"]
    return [true, ""]
}


const sendBtn = document.querySelector(".send-btn")
const errorLoc = document.querySelector(".error-box")
const rodoCheckboxLoc = document.querySelector("#rodo")
const successLoc = document.querySelector(".success-box")

sendBtn.addEventListener("click", ()=> {

    let validateAll = []

    console.log(validateAll)

    jump: {
    validateAll = validateEmpty(emailInput.value)
    if (!validateAll[0]) {break jump}
    validateAll = validateEmail(emailInput.value)
    if (!validateAll[0]) {break jump}
    validateAll = validateCheckbox(rodoCheckboxLoc)
  }

    if (validateAll[0]) {
        errorLoc.innerText = validateAll[1]
        buttonSendLoc.click()
    } else {
        errorLoc.innerText = validateAll[1]
    }

    
})

const formInputsArr = document.querySelectorAll("#hidden-summary-form input")
const emailInput = document.querySelector(".summary-page #email")

const readDataForEmail = () => {
    formInputsArr[0].value = carConditionLoc.innerText
    formInputsArr[1].value = carSizeLoc.innerText
    formInputsArr[2].value = stylingItemsLoc.innerText
    formInputsArr[3].value = paintRenewalItemsLoc.innerText
    formInputsArr[4].value = foilItemsLoc.innerText
    formInputsArr[5].value = paintProtectItemsLoc.innerText
    formInputsArr[6].value = additionalServicesItemsLoc.innerText

    formInputsArr[7].value = stylingPriceLoc.innerText
    formInputsArr[8].value = paintRenewalPriceLoc.innerText
    formInputsArr[9].value = foilPriceLoc.innerText
    formInputsArr[10].value = paintProtectPriceLoc.innerText
    formInputsArr[11].value = additionalServicesPriceLoc.innerText

    formInputsArr[12].value = endTotalPriceLoc.innerText.slice(0, -4)

    formInputsArr[13].value = emailInput.value
}

buttonNextArrLoc.forEach((elem) => {
    elem.addEventListener("click", (e)=> {

        const actualPage = e.target.closest(".form-page")

        formPageArrLoc.forEach((elem)=> {
            if (elem !== actualPage) {
                elem.scrollTop = 0
            }
        })

        if (actualPage.classList.contains("page1")) {
            if (page1 !== undefined) {
                movePage(1, -1)
                readDataForEmail()

                const pageheight = getComputedStyle(page2Loc).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            
            }
        }

        if (actualPage.classList.contains("page2")) {
            if (page2 !== undefined) {
                movePage(1, -1)
                readDataForEmail()

                const pageheight = getComputedStyle(page3Loc).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            }
        }

        if (actualPage.classList.contains("page3")) {
            if (page3Array.some((item)=>(item !== undefined && item !== false))) {
                movePage(1, -1)

                let selectedPage
                if (page3Array[0]) {
                    selectedPage = page3_1Loc
                } else if (page3Array[1]) {
                    selectedPage = page3_2Loc
                } else if (page3Array[2]) {
                    selectedPage = page3_3Loc
                } else if (page3Array[3]) {
                    selectedPage = page3_5Loc
                } else {
                    selectedPage = pageSummaryLoc
                }

                const pageheight = getComputedStyle(selectedPage).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            }
        }

        if (actualPage.classList.contains("page3_1")) {
            if (page3_1Array.some((item)=>(item !== undefined && item !== false))) {
                movePage(1, -1)
                readDataForEmail()

                let selectedPage
                if (page3Array[1]) {
                    selectedPage = page3_2Loc
                } else if (page3Array[2]) {
                    selectedPage = page3_3Loc
                } else if (page3Array[3]) {
                    selectedPage = page3_5Loc
                } else {
                    selectedPage = pageSummaryLoc
                }

                const pageheight = getComputedStyle(selectedPage).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            }
        }
        if (actualPage.classList.contains("page3_2")) {
            if (elem.classList.contains("skip")) {
                if (page3_2_1 !== undefined &&
                    page3_2_2 !== undefined) {
    
                    movePage(1, -1)
                    readDataForEmail()
    
                    let selectedPage
                    if (page3Array[2]) {
                        selectedPage = page3_3Loc
                    } else if (page3Array[3]) {
                        selectedPage = page3_5Loc
                    } else {
                        selectedPage = pageSummaryLoc
                    }
    
                    const pageheight = getComputedStyle(selectedPage).height
                    containerLoc.style.height = pageheight
                    window.top.postMessage(pageheight, '*')
                }
            }

            if (elem.classList.contains("next")) {
                if (page3_2_1 !== undefined &&
                    page3_2_2 !== undefined &&
                    page3_2_3 !== undefined) {
    
                    movePage(1, -1)
                    readDataForEmail()
    
                    let selectedPage
                    if (page3Array[2]) {
                        selectedPage = page3_3Loc
                    } else if (page3Array[3]) {
                        selectedPage = page3_5Loc
                    } else {
                        selectedPage = pageSummaryLoc
                    }
    
                    const pageheight = getComputedStyle(selectedPage).height
                    containerLoc.style.height = pageheight
                    window.top.postMessage(pageheight, '*')
                }
            }
        }
        if (actualPage.classList.contains("page3_3")) {
            if (page3_3_1 !== undefined ){
                movePage(1, -1)
                readDataForEmail()

                let selectedPage
                if (page3Array[3]) {
                    selectedPage = page3_5Loc
                } else {
                    selectedPage = pageSummaryLoc
                }

                const pageheight = getComputedStyle(selectedPage).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            }
        }
        // if (actualPage.classList.contains("page3_4")) {
        //     if (page3_4Array.some((item)=>(item !== undefined && item !== false))) {
        //         movePage(1, -1)
        //     }
        // }
        if (actualPage.classList.contains("page3_5")) {
            if (page3_5Array.some((item)=>(item !== undefined && item !== false))) {
                movePage(1, -1)
                readDataForEmail()

                const pageheight = getComputedStyle(pageSummaryLoc).height
                containerLoc.style.height = pageheight
                window.top.postMessage(pageheight, '*')
            }
        }
    })
})

buttonPrevArrLoc.forEach((elem) => {
    elem.addEventListener("click", (e)=> {

        const actualPage = e.target.closest(".form-page")

        formPageArrLoc.forEach((elem)=> {
            if (elem !== actualPage) {
                elem.scrollTop = 0
            }
        })

        if (actualPage.classList.contains("page2")) {
            movePage(1, 1)

            const pageheight = getComputedStyle(page1Loc).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
            
        }
        if (actualPage.classList.contains("page3")) {
            movePage(1, 1)

            const pageheight = getComputedStyle(page2Loc).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
        }
        if (actualPage.classList.contains("page3_1")) {
            movePage(1, 1)

            const pageheight = getComputedStyle(page3Loc).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
        }
        if (actualPage.classList.contains("page3_2")) {
            movePage(1, 1)

            let selectedPage
            if (page3Array[0]) {
                selectedPage = page3_1Loc
            } else {
                selectedPage = page3Loc
            }

            const pageheight = getComputedStyle(selectedPage).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
        }
        if (actualPage.classList.contains("page3_3")) {
            movePage(1, 1)

            let selectedPage
            if (page3Array[1]) {
                selectedPage = page3_2Loc
            } else if (page3Array[0]) {
                selectedPage = page3_1Loc
            } else {
                selectedPage = page3Loc
            }

            const pageheight = getComputedStyle(selectedPage).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
        }
        // if (actualPage.classList.contains("page3_4")) {
        //     movePage(1, 1)
        // }
        if (actualPage.classList.contains("page3_5")) {
            movePage(1, 1)

            let selectedPage
            if (page3Array[2]) {
                selectedPage = page3_3Loc
            } else if (page3Array[1]) {
                selectedPage = page3_2Loc
            } else if (page3Array[0]) {
                selectedPage = page3_1Loc
            } else {
                selectedPage = page3Loc
            }

            const pageheight = getComputedStyle(selectedPage).height
            containerLoc.style.height = pageheight
            window.top.postMessage(pageheight, '*')
        }
    })
})

// rozszerzenie działania checboxów

// const inputSelectBoxArrLoc = document.querySelectorAll(".select-box input")

// inputSelectBoxArrLoc.forEach((elem) => {
//     elem.closest(".select-box").addEventListener("click", ()=>{
//         elem.click()
//     })
// })



// włączanie klasy selected dla wybranej opcji (boxa) i ustawienie wartości dla odp. zmiennej

const changeVariableOnce = (varname, varvalue) => {
    if (varname === "page1") {page1 = varvalue}
    if (varname === "page2") {page2 = varvalue}
    if (varname === "page3_2_1") {page3_2_1 = varvalue}
    if (varname === "page3_2_2") {page3_2_2 = varvalue}
    if (varname === "page3_2_3") {page3_2_3 = varvalue}
    if (varname === "page3_3_1") {page3_3_1 = varvalue}
}

const changeVariableMulti = (varname, varvalue) => {
    if (varname === "page3_1") {page3_1 = varvalue}
    if (varname === "page3_2") {page3_2 = varvalue}
    if (varname === "page3_3") {page3_3 = varvalue}
    // if (varname === "page3_4") {page3_4 = varvalue}
    if (varname === "page3_5") {page3_5 = varvalue}

    // page3Array = [page3_1, page3_2, page3_3, page3_4, page3_5]
    page3Array = [page3_1, page3_2, page3_3, page3_5]

    if (varname === "page3_1_1") {page3_1_1 = varvalue}
    if (varname === "page3_1_2") {page3_1_2 = varvalue}
    if (varname === "page3_1_3") {page3_1_3 = varvalue}
    if (varname === "page3_1_4") {page3_1_4 = varvalue}
    if (varname === "page3_1_5") {page3_1_5 = varvalue}
    if (varname === "page3_1_6") {page3_1_6 = varvalue}

    page3_1Array = [page3_1_1, page3_1_2, page3_1_3, page3_1_4, page3_1_5, page3_1_6]

    // if (varname === "page3_4_1") {page3_4_1 = varvalue}
    // if (varname === "page3_4_2") {page3_4_2 = varvalue}
    // if (varname === "page3_4_3") {page3_4_3 = varvalue}
    // if (varname === "page3_4_4") {page3_4_4 = varvalue}
    // if (varname === "page3_4_5") {page3_4_5 = varvalue}

    // page3_4Array = [page3_4_1, page3_4_2, page3_4_3, page3_4_4, page3_4_5]

    if (varname === "page3_5_1") {page3_5_1 = varvalue}
    if (varname === "page3_5_2") {page3_5_2 = varvalue}
    if (varname === "page3_5_3") {page3_5_3 = varvalue}
    if (varname === "page3_5_4") {page3_5_4 = varvalue}
    if (varname === "page3_5_5") {page3_5_5 = varvalue}
    if (varname === "page3_5_6") {page3_5_6 = varvalue}

    page3_5Array = [page3_5_1, page3_5_2, page3_5_3, page3_5_4, page3_5_5, page3_5_6]
}

let carSize

let totalPrice = 0
let stylingPrice = 0
let paintRenewalPrice = 0
let foilPrice = 0
let paintProtectPrice = 0
let interiorProtectPrice = 0
let additionalServicesPrice = 0

let allSelectedOptionsPriceArr = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

const calculateCost = (item_name, item_no, state) => {

    if ( // na tych stronach nie ma kalkulacji
        item_name !== "page1" && 
        item_name !== "page3_1" && 
        item_name !== "page3_2" && 
        item_name !== "page3_3" && 
        // item_name !== "page3_4" && 
        item_name !== "page3_5" &&
        item_name !== "page3_2_1"
        // item_name !== "page3_4_1" &&
        // item_name !== "page3_4_2" &&
        // item_name !== "page3_4_3" &&
        // item_name !== "page3_4_4" &&
        // item_name !== "page3_4_5"
    ) {
        let pricingIndex

        if (item_name === "page2") {
            carSize = Number(item_no)
        } else {
            switch (item_name) {
                case "page3_1_1": pricingIndex = 0; break
                case "page3_1_2": pricingIndex = 1; break
                case "page3_1_3": pricingIndex = 2; break
                case "page3_1_4": pricingIndex = 3; break
                case "page3_1_5": pricingIndex = 4; break
                case "page3_1_6": pricingIndex = 5; break
                case "page3_2_2": 
                    if (item_no == 1) pricingIndex = 6
                    if (item_no == 2) pricingIndex = 7; break
                case "page3_2_3":
                    if (item_no == 1) pricingIndex = 8
                    if (item_no == 2) pricingIndex = 9
                    if (item_no == 3) pricingIndex = 10
                    if (item_no == 4) pricingIndex = 11; break
                case "page3_3_1": 
                    if (item_no == 1) pricingIndex = 12
                    if (item_no == 2) pricingIndex = 13
                    if (item_no == 3) pricingIndex = 14; break
                case "page3_5_1": pricingIndex = 15; break
                case "page3_5_2": pricingIndex = 16; break
                case "page3_5_3": pricingIndex = 17; break
                case "page3_5_4": pricingIndex = 18; break
                case "page3_5_5": pricingIndex = 19; break
                case "page3_5_6": pricingIndex = 20; break
            }
        
            let actualSelectedOptionValue = pricingCostObj[pricingIndex][carSize]
        
            if (state) {
                allSelectedOptionsPriceArr[pricingIndex] = actualSelectedOptionValue
            } else {
                allSelectedOptionsPriceArr[pricingIndex] = null
            }
    
            totalPrice = allSelectedOptionsPriceArr.reduce((acc, curr) => {
                return acc + curr
            },0)
    
            stylingPrice = 
            allSelectedOptionsPriceArr[0] + 
            allSelectedOptionsPriceArr[1] +
            allSelectedOptionsPriceArr[2] +
            allSelectedOptionsPriceArr[3] +
            allSelectedOptionsPriceArr[4] +
            allSelectedOptionsPriceArr[5]
    
            paintRenewalPrice = 
            allSelectedOptionsPriceArr[6] + 
            allSelectedOptionsPriceArr[7]

            foilPrice =
            allSelectedOptionsPriceArr[12] + 
            allSelectedOptionsPriceArr[13] +
            allSelectedOptionsPriceArr[14]

            paintProtectPrice = 
            allSelectedOptionsPriceArr[8] + 
            allSelectedOptionsPriceArr[9] +
            allSelectedOptionsPriceArr[10] +
            allSelectedOptionsPriceArr[11]

            // interiorProtectPrice = ???

            additionalServicesPrice =
            allSelectedOptionsPriceArr[15] + 
            allSelectedOptionsPriceArr[16] +
            allSelectedOptionsPriceArr[17] +
            allSelectedOptionsPriceArr[18] +
            allSelectedOptionsPriceArr[19] +
            allSelectedOptionsPriceArr[20]
    
            const totalPriceLoc = document.querySelectorAll(".totalPrice")
            totalPriceLoc.forEach((elem)=>{
                elem.innerText = "od " + totalPrice + " pln*"
            })
    
            stylingPriceLoc.innerText = stylingPrice
            paintRenewalPriceLoc.innerText = paintRenewalPrice
            foilPriceLoc.innerText = foilPrice
            paintProtectPriceLoc.innerText = paintProtectPrice
            additionalServicesPriceLoc.innerText = additionalServicesPrice

            // const interiorProtectPriceLoc = document.querySelector(".interiorProtectPrice")
            // interiorProtectPriceLoc.innerText = interiorProtectPrice
        }
    }
}

const removeFromCalculateCost = (item_name, item_no, state) => {
    // odejmowanie od sumy odklikniętych kategorii na str. 3_1 - 3_5 (usuwanie z tablicy)
    if (
        item_name === "page3_1" ||
        item_name === "page3_2" || 
        item_name === "page3_3" || 
        // item_name === "page3_4" || 
        item_name === "page3_5"
    ) {
        if (item_name === "page3_1") {
            allSelectedOptionsPriceArr[0] = null
            allSelectedOptionsPriceArr[1] = null
            allSelectedOptionsPriceArr[2] = null
            allSelectedOptionsPriceArr[3] = null
            allSelectedOptionsPriceArr[4] = null
            allSelectedOptionsPriceArr[5] = null

            allSelectedOptionsTimeArr[0] = null
            allSelectedOptionsTimeArr[1] = null
            allSelectedOptionsTimeArr[2] = null
            allSelectedOptionsTimeArr[3] = null
            allSelectedOptionsTimeArr[4] = null
            allSelectedOptionsTimeArr[5] = null

            const stylingItemsLoc = document.querySelector(".summary-page .stylingItems")
            stylingItemsLoc.innerHTML = "---"
            
        }
        if (item_name === "page3_2") {
            allSelectedOptionsPriceArr[6] = null
            allSelectedOptionsPriceArr[7] = null
            allSelectedOptionsPriceArr[8] = null
            allSelectedOptionsPriceArr[9] = null
            allSelectedOptionsPriceArr[10] = null
            allSelectedOptionsPriceArr[11] = null

            allSelectedOptionsTimeArr[6] = null
            allSelectedOptionsTimeArr[7] = null
            allSelectedOptionsTimeArr[8] = null
            allSelectedOptionsTimeArr[9] = null
            allSelectedOptionsTimeArr[10] = null
            allSelectedOptionsTimeArr[11] = null

            const paintRenewalItemsLoc = document.querySelector(".summary-page .paintRenewalItems")    
            paintRenewalItemsLoc.innerText = "---"
            const paintProtectItemsLoc = document.querySelector(".summary-page .paintProtectItems")
            paintProtectItemsLoc.innerText = "---"
        }
        if (item_name === "page3_3") {
            allSelectedOptionsPriceArr[12] = null
            allSelectedOptionsPriceArr[13] = null
            allSelectedOptionsPriceArr[14] = null

            allSelectedOptionsTimeArr[12] = null
            allSelectedOptionsTimeArr[13] = null
            allSelectedOptionsTimeArr[14] = null

            const foilItemsLoc = document.querySelector(".summary-page .foilItems")
            foilItemsLoc.innerText = "---"
        }
        if (item_name === "page3_5") {
            allSelectedOptionsPriceArr[15] = null
            allSelectedOptionsPriceArr[16] = null
            allSelectedOptionsPriceArr[17] = null
            allSelectedOptionsPriceArr[18] = null
            allSelectedOptionsPriceArr[19] = null
            allSelectedOptionsPriceArr[20] = null

            allSelectedOptionsTimeArr[15] = null
            allSelectedOptionsTimeArr[16] = null
            allSelectedOptionsTimeArr[17] = null
            allSelectedOptionsTimeArr[18] = null
            allSelectedOptionsTimeArr[19] = null
            allSelectedOptionsTimeArr[20] = null

            const additionalServicesItemsLoc = document.querySelector(".summary-page .additionalServicesItems")
            additionalServicesItemsLoc.innerHTML = "---"
        }

        totalPrice = allSelectedOptionsPriceArr.reduce((acc, curr) => {
            return acc + curr
        },0)

        totalTime = allSelectedOptionsTimeArr.reduce((acc, curr) => {
            return acc + curr
        },0)

        stylingPrice = 
            allSelectedOptionsPriceArr[0] + 
            allSelectedOptionsPriceArr[1] +
            allSelectedOptionsPriceArr[2] +
            allSelectedOptionsPriceArr[3] +
            allSelectedOptionsPriceArr[4] +
            allSelectedOptionsPriceArr[5]
    
        paintRenewalPrice = 
            allSelectedOptionsPriceArr[6] + 
            allSelectedOptionsPriceArr[7]

        foilPrice =
            allSelectedOptionsPriceArr[12] + 
            allSelectedOptionsPriceArr[13] +
            allSelectedOptionsPriceArr[14]

        paintProtectPrice = 
            allSelectedOptionsPriceArr[8] + 
            allSelectedOptionsPriceArr[9] +
            allSelectedOptionsPriceArr[10] +
            allSelectedOptionsPriceArr[11]

        // interiorProtectPrice = ???

        additionalServicesPrice =
            allSelectedOptionsPriceArr[15] + 
            allSelectedOptionsPriceArr[16] +
            allSelectedOptionsPriceArr[17] +
            allSelectedOptionsPriceArr[18] +
            allSelectedOptionsPriceArr[19] +
            allSelectedOptionsPriceArr[20]
    
        const totalPriceLoc = document.querySelectorAll(".totalPrice")
        totalPriceLoc.forEach((elem)=>{
            elem.innerText = "od " + totalPrice + " pln*"
        })

        // if (totalTime > 8) {
            workDay =  Math.ceil(totalTime / 8) + " dni"
            if (totalTime > 0 && totalTime <=8) {workDay = "1 dzień"}
        // }

        const totalTimeLoc = document.querySelectorAll(".totalTime")
        totalTimeLoc.forEach((elem)=>{
            elem.innerText = `${totalTime}h / ${workDay}`
        })

        const stylingPriceLoc = document.querySelector(".stylingPrice")
        stylingPriceLoc.innerText = stylingPrice

        const paintRenewalPriceLoc = document.querySelector(".paintRenewalPrice")
        paintRenewalPriceLoc.innerText = paintRenewalPrice

        const foilPriceLoc = document.querySelector(".foilPrice")
        foilPriceLoc.innerText = foilPrice

        const paintProtectPriceLoc = document.querySelector(".paintProtectPrice")
        paintProtectPriceLoc.innerText = paintProtectPrice

        // const interiorProtectPriceLoc = document.querySelector(".interiorProtectPrice")
        // interiorProtectPriceLoc.innerText = interiorProtectPrice

        const additionalServicesPriceLoc = document.querySelector(".additionalServicesPrice")
        additionalServicesPriceLoc.innerText = additionalServicesPrice
    }
}

let totalTime = 0
let workDay = 0
let allSelectedOptionsTimeArr = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

const calculateTime = (item_name, item_no, state) => {

    if ( // na tych stronach nie ma kalkulacji
        item_name !== "page1" && 
        item_name !== "page3_1" && 
        item_name !== "page3_2" && 
        item_name !== "page3_3" && 
        // item_name !== "page3_4" && 
        item_name !== "page3_5" &&
        item_name !== "page3_2_1"
    //     item_name !== "page3_4_1" &&
    //     item_name !== "page3_4_2" &&
    //     item_name !== "page3_4_3" &&
    //     item_name !== "page3_4_4" &&
    //     item_name !== "page3_4_5"
    ) {
        let pricingIndex

        if (item_name === "page2") {
            carSize = Number(item_no)
        } else {
            switch (item_name) {
                case "page3_1_1": pricingIndex = 0; break
                case "page3_1_2": pricingIndex = 1; break
                case "page3_1_3": pricingIndex = 2; break
                case "page3_1_4": pricingIndex = 3; break
                case "page3_1_5": pricingIndex = 4; break
                case "page3_1_6": pricingIndex = 5; break
                case "page3_2_2": 
                    if (item_no == 1) pricingIndex = 6
                    if (item_no == 2) pricingIndex = 7; break
                case "page3_2_3":
                    if (item_no == 1) pricingIndex = 8
                    if (item_no == 2) pricingIndex = 9
                    if (item_no == 3) pricingIndex = 10
                    if (item_no == 4) pricingIndex = 11; break
                case "page3_3_1": 
                    if (item_no == 1) pricingIndex = 12
                    if (item_no == 2) pricingIndex = 13
                    if (item_no == 3) pricingIndex = 14; break
                case "page3_5_1": pricingIndex = 15; break
                case "page3_5_2": pricingIndex = 16; break
                case "page3_5_3": pricingIndex = 17; break
                case "page3_5_4": pricingIndex = 18; break
                case "page3_5_5": pricingIndex = 19; break
                case "page3_5_6": pricingIndex = 20; break
            }
        
            let actualSelectedOptionValue = pricingTimeObj[pricingIndex][carSize]
        
            if (state) {
                allSelectedOptionsTimeArr[pricingIndex] = actualSelectedOptionValue
            } else {
                allSelectedOptionsTimeArr[pricingIndex] = null
            }
    
            totalTime = allSelectedOptionsTimeArr.reduce((acc, curr) => {
                return acc + curr
            },0)

            // if (totalTime > 8) {
            //     workDay =  Math.ceil(totalTime / 8)
            // }

            workDay =  Math.ceil(totalTime / 8) + " dni"
            if (totalTime > 0 && totalTime <=8) {workDay = "1 dzień"}
    
            const totalTimeLoc = document.querySelectorAll(".totalTime")
            totalTimeLoc.forEach((elem)=>{
                elem.innerText = `${totalTime}h / ${workDay}`
            })
        }
    }
}

// let interiorProtectItems = []
// let joinedInteriorProtectItems = ""
let stylingItems = []
let joinedStylingItems = ""
let additionalServicesItems = []
let joinedAdditionalServicesItems = ""

const contentArrLoc = document.querySelectorAll(".content")
contentArrLoc.forEach((elem)=>{
    const selectBoxArrLoc = elem.querySelectorAll(".select-box")
    selectBoxArrLoc.forEach((el)=>{
        el.addEventListener("click", (e)=>{

            let item_name = e.currentTarget.dataset.var_name
            let item_no = e.currentTarget.dataset.var_value
            let state
            
            if (elem.classList.contains("once")) {
                selectBoxArrLoc.forEach((element)=>{
                    element.classList.remove("selected")

                    state = false
                    item_name = element.dataset.var_name
                    item_no = element.dataset.var_value
                    calculateCost(item_name, item_no, state)
                    calculateTime(item_name, item_no, state)
                })
                el.classList.add("selected")

                state = true
                item_name = e.currentTarget.dataset.var_name
                item_no = e.currentTarget.dataset.var_value
                calculateCost(item_name, item_no, state)
                calculateTime(item_name, item_no, state)

                changeVariableOnce(el.dataset.var_name, el.dataset.var_value)

                
                if (item_name === "page1") {
                    if (item_no === "1") { carConditionLoc.innerText = "Nowe" }
                    if (item_no === "2") { carConditionLoc.innerText = "Używane" }
                }

                if (item_name === "page2") {
                    if (item_no === "0") { carSizeLoc.innerText = "Małe" }
                    if (item_no === "1") { carSizeLoc.innerText = "Średnie" }
                    if (item_no === "2") { carSizeLoc.innerText = "Duże i SUV" }
                    if (item_no === "3") { carSizeLoc.innerText = "Duże SUV i większe" }
                }
                
                if (item_name === "page3_2_2") {
                    let paintRenewalItem = ""
                    if (item_no === "1") { paintRenewalItem = "Odświeżanie lakieru" }
                    if (item_no === "2") { paintRenewalItem = "Korekta lakieru" }
                    paintRenewalItemsLoc.innerText = paintRenewalItem

                   
                }
                
                if (item_name === "page3_3_1") {
                    let foilItems = ""
                    if (item_no === "1") { foilItems = "Folia bikini" }
                    if (item_no === "2") { foilItems = "Folia full front" }
                    if (item_no === "3") { foilItems = "Folia full body" }
                    foilItemsLoc.innerText = foilItems
                }
                
                if (item_name === "page3_2_3") {
                    let paintProtectItems = ""
                    if (item_no === "1") { paintProtectItems = "Woskowanie" }
                    if (item_no === "2") { paintProtectItems = "Ceramika 1rok" }
                    if (item_no === "3") { paintProtectItems = "Ceramika 3lata" }
                    if (item_no === "4") { paintProtectItems = "Ceramika 4lata" }
                    paintProtectItemsLoc.innerText = paintProtectItems

                    const specbtn2Loc = document.querySelector(".page3_2 .next.move-next")
                    specbtn2Loc.classList.remove("hidden")
                    const specbtn1Loc = document.querySelector(".page3_2 .skip-long")
                    specbtn1Loc.classList.add("hidden")
                

                }
            }

            if (elem.classList.contains("multi")) {
                if (el.classList.contains("selected")) {
                    el.classList.remove("selected")
                    changeVariableMulti(el.dataset.var_name, false)

                    state = false
                    calculateCost(item_name, item_no, state)
                    calculateTime(item_name, item_no, state)
                } else {
                    el.classList.add("selected")
                    changeVariableMulti(el.dataset.var_name, true)

                    state = true
                    calculateCost(item_name, item_no, state)
                    calculateTime(item_name, item_no, state)
                }

                // const interiorProtectItemsLoc = document.querySelector(".summary-page .interiorProtectItems")
                // if (item_name === "page3_4_1" || item_name === "page3_4_2" || item_name === "page3_4_3" || item_name === "page3_4_4" || item_name === "page3_4_5") {

                //     let item = ""
                //     if (item_name === "page3_4_1") { item = "Podstawowe czyszczenie" }
                //     if (item_name === "page3_4_2") { item = "Detailing - tapicerka materiałowa" }
                //     if (item_name === "page3_4_3") { item = "Detailing - tapicerka skórzana" }
                //     if (item_name === "page3_4_4") { item = "Czyszczenie tapicerka skórzana" }
                //     if (item_name === "page3_4_5") { item = "Czyszczenie tapicerka materiałowa" }
                    
                //     if (state) {
                //         interiorProtectItems.push(item)
                //     } else {
                //         const index = interiorProtectItems.indexOf(item)
                //         interiorProtectItems.splice(index,1)
                //     }

                //     joinedInteriorProtectItems = interiorProtectItems.join(",<br>")
                //     interiorProtectItemsLoc.innerHTML = joinedInteriorProtectItems
                // }

                if (item_name === "page3_1_1" || item_name === "page3_1_2" || item_name === "page3_1_3" || item_name === "page3_1_4" || item_name === "page3_1_5" || item_name === "page3_1_6") {

                    let item = ""
                    if (item_name === "page3_1_1") { item = "Przyciemnianie&nbsp;szyb" }
                    if (item_name === "page3_1_2") { item = "Przyciemnianie&nbsp;lamp" }
                    if (item_name === "page3_1_3") { item = "Dechroming" }
                    if (item_name === "page3_1_4") { item = "Zmiana koloru&nbsp;całego&nbsp;auta" }
                    if (item_name === "page3_1_5") { item = "Oklejanie&nbsp;dachu" }
                    if (item_name === "page3_1_6") { item = "Oklejanie&nbsp;lusterek" }
                    
                    if (state) {
                        stylingItems.push(item)
                    } else {
                        const index = stylingItems.indexOf(item)
                        stylingItems.splice(index,1)
                    }

                    joinedStylingItems = stylingItems.join(", ")
                    stylingItemsLoc.innerHTML = joinedStylingItems
                }

                if (item_name === "page3_5_1" || item_name === "page3_5_2" || item_name === "page3_5_3" || item_name === "page3_5_4" || item_name === "page3_5_5" || item_name === "page3_5_6") {

                    let item = ""
                    if (item_name === "page3_5_1") { item = "Reflektory&nbsp;cermamika" }
                    if (item_name === "page3_5_2") { item = "Reflektory&nbsp;folia" }
                    if (item_name === "page3_5_3") { item = "Felgi&nbsp;ceramika" }
                    if (item_name === "page3_5_4") { item = "Szyby&nbsp;ceramika" }
                    if (item_name === "page3_5_5") { item = "Impregnacja&nbsp;dach&nbsp;cabrio" }
                    if (item_name === "page3_5_6") { item = "Woskowanie&nbsp;lakieru&nbsp;bez&nbsp;polerowania" }
                    
                    if (state) {
                        additionalServicesItems.push(item)
                    } else {
                        const index = additionalServicesItems.indexOf(item)
                        additionalServicesItems.splice(index,1)
                    }

                    joinedAdditionalServicesItems = additionalServicesItems.join(", ")
                    additionalServicesItemsLoc.innerHTML = joinedAdditionalServicesItems
                }
            }

            const actualPage = e.target.closest(".form-page")

            if (actualPage.classList.contains("page3")) {
                if (e.currentTarget.classList.contains("selected")) {
                    
                    document.querySelector(`.${e.currentTarget.dataset.var_name}`).classList.remove("hidden")
                } else {
                    document.querySelector(`.${e.currentTarget.dataset.var_name}`).classList.add("hidden")
                    document.querySelector(`.${e.currentTarget.dataset.var_name}`).querySelectorAll(`.select-box`).forEach((element)=>{
                        element.classList.remove("selected")
                    })
                    removeFromCalculateCost(item_name, item_no, state)
                }
            }
        })
    })
})

// wysyłanie formularza

const buttonSendLoc = document.querySelector(".send-form")
const form = document.querySelector("#hidden-summary-form")

const validateAll = (e) => {
    e.preventDefault()

    let validationPass = true;

    console.log("Wysyłam")

    if (validationPass) {
        grecaptcha.ready(function() {
            grecaptcha.execute("6Lf2hcIpAAAAAO1sgP7bkMbS_dHflAHZV8bG8eFO", {action: "contact"})
            .then(async function(token){
                let recaptchaResponse = document.getElementById("recaptchaResponse")
                recaptchaResponse.value = token
                let response
                // fetch("./php/send.php", {method: "POST", body: new FormData(form)})
                // .then((response)=>{
                response = await fetch("./php/send.php", {method: "POST", body: new FormData(form)})
                    if (response.ok) {
                        const indexEqual = response.url.indexOf("=")
                        const status = (response.url).substr(indexEqual + 1, response.url.length - indexEqual);

                        if (status === "sent") {
                            console.log("status === 'sent'. E-mail został wysłany")
                            // loadingWrapper.style.display = "none"
                            successLoc.innerText = "Dziękujemy. E-mail z wyceną przesłany na podany adres."
                            // thanksContainer.style.display = "flex"
                            // getPDFFormContainer.style.display = "flex"
                        } else {
                            console.log("status !== 'sent'. E-mail nie został wysłany")
                            // loadingWrapper.style.display = "none"
                            errorLoc.innerText = "E-mail nie został wysłany - spróbuj ponownie za chwilę."
                            // thanksContainer.style.display = "flex"
                            // getPDFFormContainer.style.display = "none"
                        }
                    } else {
                        console.log("response nie jest ok. E-mail nie został wysłany")
                        // loadingWrapper.style.display = "none"
                        errorLoc.innerText = "E-mail nie został wysłany."
                        // thanksContainer.style.display = "flex"
                        // getPDFFormContainer.style.display = "none"
                    }
                // }) 
            }) 
        })
        // page10file10_1Loc.value = ""
        // page16file16_1Loc.value = "" 
    } else {
        console.log("Walidacja nieprawidłowa!")
        // loadingWrapper.style.display = "none"
        // thanksContainer.innerText = "Walidacja nieprawidłowa!"
        // thanksContainer.style.display = "flex"
        // getPDFFormContainer.style.display = "none"
    }
}

buttonSendLoc.addEventListener("click", validateAll)

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        const page1height = getComputedStyle(page1Loc).height
        containerLoc.style.height = page1height
    }
})

const contactBtn = document.querySelector(".summary-page .contact-btn")
contactBtn.addEventListener("click", ()=>{
    

window.top.location.href = "https://dev.heartofdetailing.pl/kontakt/"; 

})
//# sourceMappingURL=main.js.map
