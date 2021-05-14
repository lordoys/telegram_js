const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
    .goto('https://www.appointfix.com/sunnyCourt')
    .wait(2000)
    .wait('.business-info-screen-container-left-booking-button')
    .click('.business-info-screen-container-left-booking-button')
    .wait(2000)
    .wait('.appointment-booking-services-select-details')
    .click('.appointment-booking-services-list .appointment-booking-services-select.ng-star-inserted')
    .wait(2000)
    .click('.appointment-booking-services-select-submit-button')
    .wait(2000)
    .wait('.cal-days')
    .click('.cal-days > .ng-star-inserted:nth-of-type(4) > .cal-cell-row > .cal-cell:nth-child(7)')
    .wait(2000)
    .click('.appointment-booking-timeslot-column:nth-child(2) .appointment-booking-timeslot-slot.ng-star-inserted:nth-child(7)')
    .wait('input[name="name"]')
    .wait(2000)
    .insert('input[name="name"]', 'Maxim')
    .insert('input[id="phone"]', '95756779')
    .insert('input[name="email"]', 'lordoys@gmail.com')
    .wait(1000)
    .click('.appointment-booking-details-submit-button-container')
    .wait(5000)
    .end()
    .then(console.log)
    .catch(error => {
        console.error('Search failed:', error)
    })