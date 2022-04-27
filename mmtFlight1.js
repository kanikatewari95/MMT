import { ClientFunction,Selector } from "testcafe";

const URL= "https://www.makemytrip.com/";
const getURL = ClientFunction(()=> window.location.href);


fixture("Try MMT fixture")
        .page(URL)

//trip_type=OneWay, fare_type=Regular
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
                 .click("div[aria-label='Mon May 30 2022']")

                 .hover("div[data-cy='flightTraveller']",{speed:0.5})
                 .click("div[data-cy='flightTraveller']",{speed:0.5})
                 .click(Selector("ul[class^='guestCounter'] li").withText("2"))
                 .click(Selector("ul[class^='guestCounter'] li").withExactText("Premium Economy"),{speed:0.5})
                 .click(Selector("button").withText("APPLY"))

                 .click(Selector("a[class$='widgetSearchBtn ']"))   //search flights button

                 if(await Selector("div[class='commonOverlay ']").exists){
                     await t
                            .click("span[class$='overlayCrossIcon']")
                 }

                 const getLocation = ClientFunction(()=>window.location.href)
                 
                 await t
                        .expect(getLocation()).contains("flight")
                        .click(Selector("span[class='customCheckbox']").nth(0))
                        .expect(Selector("div[class='listingCardWrap ']").visible).ok()

                        .click(Selector("span").withText("View Flight Details").nth(2))
                        .expect(Selector("div[class='flightDetailsOuter']").visible).ok()

                        .click(Selector("button[class^='ViewFareBtn']").nth(2)) //click on "View Price button" of spicejet
                       
                        .click(Selector("button[id^='bookbutton']",{speed:0.7}).nth(3))
                        //.click(Selector("button").withText("Book Now").nth(0))

                        .expect(Selector("div[id='JOURNEY_SECTION']").visible).ok()
                        .wait(6000)

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