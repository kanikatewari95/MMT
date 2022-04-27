import { ClientFunction,Selector } from "testcafe";

const URL= "https://www.makemytrip.com/";
const getURL = ClientFunction(()=> window.location.href);


fixture("Try MMT fixture")
        .page(URL)

//trip_type=OneWay, fare_type=Senior citizen
 test("Test FlightField",async t=>{
            await t
                .maximizeWindow()

                 .expect(getURL()).eql(URL)            
                 
                 .expect(Selector("div[class='chHeaderContainer']").visible).ok()   
            
                 .hover("input[id='fromCity']")
                 .doubleClick("input[id='fromCity']")
                 .typeText("input[class^='react-autosuggest__input']","Mumbai")
                 .hover(Selector("ul[role='listbox'] p").withText("Mumbai, India"))
                 .click(Selector("ul[role='listbox'] p").withText("Mumbai, India"))

                 .hover("input[id='toCity']")
                 .click("input[id='toCity']")
                 .typeText("input[placeholder='To']","Delhi")
                 .hover(Selector("ul[role='listbox'] p").withText("New Delhi, India"))
                 .click(Selector("ul[role='listbox'] p").withText("New Delhi, India"))

                // .hover("input[id='departure']")
                 //.click("input[id='departure']")
                 .click("div[aria-label='Thu May 19 2022']")

                 .hover("div[data-cy='flightTraveller']",{speed:0.5})
                 .click("div[data-cy='flightTraveller']",{speed:0.5})
                 .click(Selector("ul[class^='guestCounter'] li").withText("2"))
                
                 .click(Selector("button").withText("APPLY"))

                 .click(Selector("ul[class='specialFareNew'] li",{speed:0.5}).nth(4))//click on Double Fare type

                   
                 if(await Selector("div[class='langCard  fixedCard bounceAni']").visible)
                 {
                     await t
                        .click("span[class='langCardClose']")
                        .expect(Selector("div[class='langCard  fixedCard bounceAni']").visible).notOk()
                 }

                 await t

                 .click(Selector("a[class$='widgetSearchBtn ']"))   //search flights button

                 if(await Selector("div[class='commonOverlay ']").exists){
                     await t
                            .click("span[class$='overlayCrossIcon']")
                 }

                 const getLocation = ClientFunction(()=>window.location.href)
                 
                 await t
                        .expect(getLocation()).contains("flight")
                        .click(Selector("div[class='listingCard'] button[id*='bookbutton']").nth(0)) //click on Book Now button

                        .expect(Selector("div[id='JOURNEY_SECTION']").visible).ok()

                        if(await Selector("div[id='INSURANCE']").visible){
                            await t
                                   .click(Selector("span[class='customRadioBtn']").nth(0)) //click on Secure my travel
                 }
                 
                 await t

                 .expect(Selector("div[id='TRAVELLER_DETAIL']").exists).ok()
                 .click("button[class='addTravellerBtn']") //click on add  passenger
                 .typeText("input[placeholder='First & Middle Name']","Kanika")
                 .typeText("input[placeholder='Last Name']","Upreti")
                 .click(Selector("div[class='selectTab '] span").withText("FEMALE"))

                 .click("button[class='addTravellerBtn']") //click on add passenger
                 .typeText(Selector("input[placeholder='First & Middle Name']").nth(1),"Ashish")
                 .typeText(Selector("input[placeholder='Last Name']").nth(1),"Upreti")
                 .click(Selector("div[class='selectTab '] span").nth(2).withText("MALE"))       
                 //.click(Selector("input[value='MALE']").nth(1))

                 console.log("*****");
                 
                 await t
                 .typeText("input[placeholder='Mobile No']","8057345503")
                 .typeText("input[placeholder='Email']","123@gmail.com")
                 .click("div[class='emailId']")
                 

                 if(await Selector("div[class='baggageAddonWrapper']").visible){
                        await t
                            .click("span[class$='overlayCrossIcon']")
                 }

                 await t
                 

                 .click("button[class*='buttonPrimary']")
                 

                 .expect(Selector("div[class='commonOverlay ']").exists).ok()
                 .click(Selector("button").withText("CONFIRM"))
                                       
})