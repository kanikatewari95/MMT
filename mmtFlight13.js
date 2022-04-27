import { ClientFunction,Selector } from "testcafe";

const URL= "https://www.makemytrip.com/";
const getURL = ClientFunction(()=> window.location.href);


fixture("Try MMT fixture")
        .page(URL)

//trip_type=OneWay, fare_type=Student
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
                 .click(Selector("ul[class^='guestCounter'] li").withExactText("Premium Economy"),{speed:0.5})
                 .click(Selector("button").withText("APPLY"))

                 .click(Selector("ul[class='specialFareNew'] li").nth(2))//click on Student Fare type

                 .click(Selector("a[class$='widgetSearchBtn ']"))   //search flights button

                 if(await Selector("div[class='commonOverlay ']").exists){
                     await t
                            .click("span[class$='overlayCrossIcon']")
                 }

                 const headerMsz = Selector("p[class^='premEconomyTextSimple']")
                 await t
                     .expect(headerMsz.exists).ok()
                     console.log("Message is : " + await headerMsz.innerText)

                 const getLocation = ClientFunction(()=>window.location.href)
                 
                 await t
                        .expect(getLocation()).contains("flight")
                                             

                        
                                      
 })