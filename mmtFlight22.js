import { ClientFunction,Selector } from "testcafe";

const URL= "https://www.makemytrip.com/";
const getURL = ClientFunction(()=> window.location.href);


fixture("Try MMT fixture")
        .page(URL)

//trip_type=RoundWay, fare_type=Regular
 test("Test FlightField",async t=>{
            await t
                .maximizeWindow()

                 .expect(getURL()).eql(URL)            
                 
                 .expect(Selector("div[class='chHeaderContainer']").visible).ok() 
                 .doubleClick("div[class='makeFlex'] li:nth-of-type(2)",{timeout:3000})  //click on round trip
            
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

                 .click("div[aria-label='Wed May 18 2022']")
                 .click("div[aria-label='Thu May 19 2022']")

                 if(await Selector("div[class='langCard  fixedCard bounceAni']").visible) //for a language change pop-up
                 {
                     await t
                        .click("span[class='langCardClose']")
                        .expect(Selector("div[class='langCard  fixedCard bounceAni']").visible).notOk()
                 }

                 await t

                 .hover("div[data-cy='flightTraveller']",{speed:0.5})
                 .click("div[data-cy='flightTraveller']",{speed:0.5})
                 .click(Selector("ul[class^='guestCounter'] li").withText("2"))
                 .click(Selector("ul[class^='guestCounter'] li").withExactText("Premium Economy"),{speed:0.5})

                 //.click("button[data-cy='travellerApplyBtn']")
                 .click(Selector("button").withExactText("APPLY"))

                 .click(Selector("ul[class='specialFareNew'] li").nth(1))//click on Armed force Fare type

                 .click(Selector("a[class$='widgetSearchBtn ']"))   //search flights button

                 if(await Selector("div[class='commonOverlay ']").exists){
                     await t
                            .click("span[class$='overlayCrossIcon']")
                 }

                 const getLocation = ClientFunction(()=>window.location.href)
                 
                 await t
                        .expect(getLocation()).contains("flight")
                        .expect(Selector("div[class='filterWrapper']").exists).ok()

                        .expect(Selector("p[class='premEconomyTextSimple blackFont']").exists).ok()
                        
                        const message = Selector("p[class='premEconomyTextSimple blackFont']")
                        console.log("***" +await  message.innerText + "***")



                                     
 })
 