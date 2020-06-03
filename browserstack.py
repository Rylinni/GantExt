from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities



desired_cap = {
 'browser': 'Chrome',
 'browser_version': '62.0',
 'os': 'Windows',
 'os_version': '10',
 'resolution': '1024x768',
 'name': 'Bstack-[Python] Sample Test'
}

desired_cap['browserstack.local'] = True
desired_cap['browserstack.localIdentifier'] = 'Test123'



driver = webdriver.Remote(
    command_executor='http://ryanlinnihan1:NHsRDWUFGX8TtqUmRaxU@hub.browserstack.com:80/wd/hub',
    desired_capabilities=desired_cap)

# driver.get("http://www.google.com")
# if not "Google" in driver.title:
#     raise Exception("Unable to load google page!")
# elem = driver.find_element_by_name("q")
# elem.send_keys("BrowserStack")
# elem.submit()
# print (driver.title)
# driver.quit()

class CheckInOp:
    reason = "not used yet"

    # swa-content > div > div > div <-- that doesn't work for the maintenance error

    def southwest(conf, first, last):
        # Create a new instance of the Chrome driver
        # driver = webdriver.Chrome()

        def badInfoError():
            try:
                (driver.find_element_by_css_selector(
                    '#swa-content > div > div.container.container_standard.page-notifications '
                    '> div.page-error.page-error_results.notifications--item > div'))
                return True
            except:
                return False
        # Function does not have correct indicator in it.

        def maintenanceError():
            try:
                (driver.find_element_by_css_selector(
                    '#swa-content > div > div.container.container_standard.page-notifications '
                    '> div.page-error.page-error_results.notifications--item > div'))
                print("yikes")
                return True
            except:
                return False

        def tooEarlyError():
            try:
                (driver.find_element_by_link_text("You're requesting to check in and print your boarding pass outside our permitted 24 hour check-in window. Please check in within 24 hours of your flight's scheduled departure."))
                return True
            except:
                return False

        def checkedInPageFailed():
            try:
                (driver.find_element_by_xpath('//*[@id="swa-content"]/div/div[2]/div/section/div/div/div[1]/div/div[1]/table'))
                return False
            except:
                return True

        # go to the google home page
        driver.get("https://www.southwest.com/air/check-in/")
        # the page is ajaxy so the title is originally this:
        print(driver.title + '\n')
        # testing whether we're on the right page by seeing if the confirmationNumber box is here
        # If it's the maintenance page, the process will start over until the page is correct
        if maintenanceError():
            driver.quit()
            print('maintenance Error')
            return CheckInOp.southwest(conf, first, last)
        # THE STEPS FOR FIRST PAGE...............................................................................
        # finding confirmation input box
        inputConfirm = driver.find_element_by_id("confirmationNumber")
        # type confirmation code
        inputConfirm.send_keys(conf)
        # finding first name input box
        inputFirst = driver.find_element_by_id("passengerFirstName")
        # type first name
        inputFirst.send_keys(first)
        # find last name input box
        inputLast = driver.find_element_by_id("passengerLastName")
        # type last name
        inputLast.send_keys(last, Keys.ENTER)
        # Gives page time to load before checking for errors
        # If errors aren't catching, check this statement first
        driver.implicitly_wait(10)

        if checkedInPageFailed():
            print("Error")
            # # ERROR CHECK
            # if tooEarlyError():
            #     driver.quit()
            #     CheckInOp.reason = "Could not sign in due to too early of a check in"
            #     return False
            if badInfoError():
                driver.quit()
                CheckInOp.reason = "Could not sign in due to bad info or too early of a check in"
                return False
            if maintenanceError():
                driver.quit()
                print('maintenance Error')
                return CheckInOp.southwest(conf, first, last)
        driver.find_element_by_xpath('//*[@id="swa-content"]/div/div[2]/div/section/div/div/div[3]/button').click()
        time.sleep(round(5))
        driver.quit()
        CheckInOp.reason = "previous run worked properly"
        return True


print(str(CheckInOp.southwest('S77OZR', 'John', 'Lee')))